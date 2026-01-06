<?php
/**
 * PHP 5 Compatible File Upload Endpoint (up.php)
 * Removed PHP 7+ syntax like the null coalescing operator (??).
 */

// Buffering output to catch any accidental echos or warnings
ob_start();

error_reporting(0);
ini_set('display_errors', 0);
header('Content-Type: application/json');

function finish($success, $data_or_error) {
    ob_end_clean(); // Discard anything accidentally echoed
    if ($success) {
        $response = array('success' => true);
        if (is_array($data_or_error)) {
            foreach ($data_or_error as $key => $value) {
                $response[$key] = $value;
            }
        }
        echo json_encode($response);
    } else {
        echo json_encode(array('success' => false, 'error' => $data_or_error));
    }
    exit;
}

// Configuration
$base_dir = dirname(__FILE__) . '/';
$allowed_extensions = array('pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    finish(false, 'Invalid request method');
}

$type = isset($_POST['type']) ? $_POST['type'] : '';
$raw_number = isset($_POST['number']) ? $_POST['number'] : '';
$number = str_replace(array('/', '\\'), '-', strtoupper($raw_number));
$revision = isset($_POST['revision']) ? $_POST['revision'] : '';

if (!$type || !$number) {
    finish(false, 'Missing type or number');
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $err_code = isset($_FILES['file']['error']) ? $_FILES['file']['error'] : 'No file';
    finish(false, 'File upload error code: ' . $err_code);
}

// Check base dir permissions
if (!is_writable($base_dir)) {
    finish(false, 'Base directory is not writable. Check permissions for: ' . realpath($base_dir));
}

// Mapping logic
$mappings = array(
    'cer' => 'WES/DOA/Certificate/',
    'cmd' => 'WES/DOA/Command Media/',
    'man' => 'WES/DOA/Manual/',
    'pro' => 'WES/DOA/Procedure/',
    'wi' => 'WES/DOA/Work Instruction/',
    'doc' => 'WES/DOA/Document/',
    'AWO' => 'WES/DOA/Personnel Assignment/AWO/',
    'CVE' => 'WES/DOA/Personnel Assignment/CVE/',
    '41A' => 'WES/PART41/A/',
    '41B' => 'WES/PART41/B/',
    '41C-1' => 'WES/PART41/C_MARKLABEL/',
    '41C-2' => 'WES/PART41/C_PART/',
    '41C-3' => 'WES/PART41/C_PROFILE/',
    '41D' => 'WES/PART41/D/',
    '41E' => 'WES/PART41/E/',
    '41F' => 'WES/PART41/F/',
    '41G' => 'WES/PART41/G/',
    '41H' => 'WES/PART41/H/',
    '41I' => 'WES/PART41/I/',
    '41N' => 'WES/PART41/N/',
    'mtm' => 'WES/PART41/MTM/',
    'cer2' => 'WES/NON AIRCRAFT/Certificate/',
    'cp' => 'WES/NON AIRCRAFT/Certification Procedure/',
    'doc2' => 'WES/NON AIRCRAFT/Document/',
    'man2' => 'WES/NON AIRCRAFT/Manual/',
    'pro2' => 'WES/NON AIRCRAFT/Procedure/',
    'tm' => 'WES/NON AIRCRAFT/Test Method/',
    'wi2' => 'WES/NON AIRCRAFT/Work Instruction/',
    'lib' => 'WES/LIBRARY/',
    'standard' => 'WES/FORM/',
    'form2' => 'WES/FORM/Form NA/',
);

$target_subpath = isset($mappings[$type]) ? $mappings[$type] : 'WES/UNKNOWN/';
$target_dir = $base_dir . $target_subpath;

// Create directory if not exists
if (!is_dir($target_dir)) {
    if (!@mkdir($target_dir, 0777, true)) {
        finish(false, 'Failed to create directory: ' . $target_subpath . '. Check server permissions.');
    }
}

$original_name = basename($_FILES['file']['name']);
$file_ext = strtolower(pathinfo($original_name, PATHINFO_EXTENSION));

if (!in_array($file_ext, $allowed_extensions)) {
    finish(false, 'Extension not allowed: ' . $file_ext);
}

$file_name = $number . ($revision ? '_' . $revision : '') . '.' . $file_ext;
$target_file = $target_dir . $file_name;

if (@move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
    finish(true, array(
        'path' => $target_subpath . $file_name,
        'is_pdf' => ($file_ext === 'pdf')
    ));
} else {
    finish(false, 'Failed to move uploaded file. Check folder permissions for: ' . $target_subpath);
}
