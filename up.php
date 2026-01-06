<?php
/**
 * PHP 5 Compatible File Upload Endpoint (up.php)
 * Fixed: in_array typo and absolute path concatenation logic.
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
// If your mappings are absolute paths (starting with /), leave this as empty string
// If they are relative to the script, use dirname(__FILE__) . '/'
$base_dir = ''; 

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

// Mapping logic
$mappings = array(
    'cer' => '/data/edm/aplikasi/catia/WES/DOA/Certificate/',
    'cmd' => '/data/edm/aplikasi/catia/WES/DOA/Command Media/',
    'man' => '/data/edm/aplikasi/catia/WES/DOA/Manual/',
    'pro' => '/data/edm/aplikasi/catia/WES/DOA/Procedure/',
    'wi' => '/data/edm/aplikasi/catia/WES/DOA/Work Instruction/',
    'doc' => '/data/edm/aplikasi/catia/WES/DOA/Document/',
    'AWO' => '/data/edm/aplikasi/catia/WES/DOA/Personnel Assignment/AWO/',
    'CVE' => '/data/edm/aplikasi/catia/WES/DOA/Personnel Assignment/CVE/',
    '41A' => '/data/edm/aplikasi/catia/WES/PART41/A/',
    '41B' => '/data/edm/aplikasi/catia/WES/PART41/B/',
    '41C-1' => '/data/edm/aplikasi/catia/WES/PART41/C_MARKLABEL/',
    '41C-2' => '/data/edm/aplikasi/catia/WES/PART41/C_PART/',
    '41C-3' => '/data/edm/aplikasi/catia/WES/PART41/C_PROFILE/',
    '41D' => '/data/edm/aplikasi/catia/WES/PART41/D/',
    '41E' => '/data/edm/aplikasi/catia/WES/PART41/E/',
    '41F' => '/data/edm/aplikasi/catia/WES/PART41/F/',
    '41G' => '/data/edm/aplikasi/catia/WES/PART41/G/',
    '41H' => '/data/edm/aplikasi/catia/WES/PART41/H/',
    '41I' => '/data/edm/aplikasi/catia/WES/PART41/I/',
    '41N' => '/data/edm/aplikasi/catia/WES/PART41/N/',
    'mtm' => '/data/edm/aplikasi/catia/WES/PART41/MTM/',
    'cer2' => '/data/edm/aplikasi/catia/WES/NON AIRCRAFT/Certificate/',
    'cp' => '/data/edm/aplikasi/catia/WES/NON AIRCRAFT/Certification Procedure/',
    'doc2' => '/data/edm/aplikasi/catia/WES/NON AIRCRAFT/Document/',
    'man2' => '/data/edm/aplikasi/catia/WES/NON AIRCRAFT/Manual/',
    'pro2' => '/data/edm/aplikasi/catia/WES/NON AIRCRAFT/Procedure/',
    'tm' => '/data/edm/aplikasi/catia/WES/NON AIRCRAFT/Test Method/',
    'wi2' => '/data/edm/aplikasi/catia/WES/NON AIRCRAFT/Work Instruction/',
    'lib' => '/data/edm/aplikasi/catia/WES/LIBRARY/',
    'standard' => '/data/edm/aplikasi/catia/WES/FORM/',
    'form2' => '/data/edm/aplikasi/catia/WES/FORM/Form NA/',
);

$target_subpath = isset($mappings[$type]) ? $mappings[$type] : '/data/edm/aplikasi/catia/WES/UNKNOWN/';
$target_dir = $base_dir . $target_subpath;

// Check directory writable
if (is_dir($target_dir)) {
    if (!is_writable($target_dir)) {
        finish(false, 'Target directory is not writable: ' . $target_dir);
    }
} else {
    // Attempt to create it
    if (!@mkdir($target_dir, 0777, true)) {
        finish(false, 'Failed to create directory: ' . $target_dir . '. Check server permissions.');
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
    // If the database expects a specific root (like "WES/..."), we should strip the prefix here.
    // However, I'll return the path as mapped for now.
    finish(true, array(
        'path' => $target_subpath . $file_name,
        'is_pdf' => ($file_ext === 'pdf')
    ));
} else {
    finish(false, 'Failed to move uploaded file. Check folder permissions for: ' . $target_dir);
}
