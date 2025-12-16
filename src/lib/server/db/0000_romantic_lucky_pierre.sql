-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `form` (
	`no` int AUTO_INCREMENT NOT NULL,
	`type` varchar(10) NOT NULL,
	`nmpath` varchar(50),
	`number` varchar(30),
	`pdf` varchar(40),
	`revision` varchar(2),
	`date` date,
	`title` varchar(500),
	`category` varchar(25),
	`control_sheet` varchar(25),
	`remark` varchar(50),
	CONSTRAINT `form_no` PRIMARY KEY(`no`)
);
--> statement-breakpoint
CREATE TABLE `history` (
	`no` int AUTO_INCREMENT NOT NULL,
	`Judul` varchar(100),
	`username` varchar(30),
	`nama` varchar(40),
	`nmdoc` varchar(50),
	`Tanggal` varchar(20),
	`remark` varchar(50),
	CONSTRAINT `history_no` PRIMARY KEY(`no`)
);
--> statement-breakpoint
CREATE TABLE `standard` (
	`no` int AUTO_INCREMENT NOT NULL,
	`type` varchar(10) NOT NULL,
	`nmpath` varchar(100),
	`number` varchar(100),
	`pdf` varchar(100),
	`revision` varchar(10),
	`date` date,
	`date2` date NOT NULL,
	`title` varchar(500),
	`category` varchar(25),
	`control_sheet` varchar(25),
	`remark` varchar(50),
	`panel` text NOT NULL,
	`nik` text NOT NULL,
	`nama` text NOT NULL,
	CONSTRAINT `standard_no` PRIMARY KEY(`no`)
);
--> statement-breakpoint
CREATE TABLE `standard091224` (
	`no` int AUTO_INCREMENT NOT NULL,
	`type` varchar(10) NOT NULL,
	`nmpath` varchar(100),
	`number` varchar(100),
	`pdf` varchar(100),
	`revision` varchar(10),
	`date` date,
	`date2` date NOT NULL,
	`title` varchar(500),
	`category` varchar(25),
	`control_sheet` varchar(25),
	`remark` varchar(50),
	`panel` text NOT NULL,
	`nik` text NOT NULL,
	`nama` text NOT NULL,
	CONSTRAINT `standard091224_no` PRIMARY KEY(`no`)
);
--> statement-breakpoint
CREATE TABLE `standard150425` (
	`no` int AUTO_INCREMENT NOT NULL,
	`type` varchar(10) NOT NULL,
	`nmpath` varchar(100),
	`number` varchar(100),
	`pdf` varchar(100),
	`revision` varchar(10),
	`date` date,
	`date2` date NOT NULL,
	`title` varchar(500),
	`category` varchar(25),
	`control_sheet` varchar(25),
	`remark` varchar(50),
	`panel` text NOT NULL,
	`nik` text NOT NULL,
	`nama` text NOT NULL,
	CONSTRAINT `standard150425_no` PRIMARY KEY(`no`)
);
--> statement-breakpoint
CREATE TABLE `standard210425` (
	`no` int AUTO_INCREMENT NOT NULL,
	`type` varchar(10) NOT NULL,
	`nmpath` varchar(100),
	`number` varchar(100),
	`pdf` varchar(100),
	`revision` varchar(10),
	`date` date,
	`date2` date NOT NULL,
	`title` varchar(500),
	`category` varchar(25),
	`control_sheet` varchar(25),
	`remark` varchar(50),
	`panel` text NOT NULL,
	`nik` text NOT NULL,
	`nama` text NOT NULL,
	CONSTRAINT `standard210425_no` PRIMARY KEY(`no`)
);
--> statement-breakpoint
CREATE TABLE `standard_061125` (
	`no` int AUTO_INCREMENT NOT NULL,
	`type` varchar(10) NOT NULL,
	`nmpath` varchar(100),
	`number` varchar(100),
	`pdf` varchar(100),
	`revision` varchar(10),
	`date` date,
	`date2` date NOT NULL,
	`title` varchar(500),
	`category` varchar(25),
	`control_sheet` varchar(25),
	`remark` varchar(50),
	`panel` text NOT NULL,
	`nik` text NOT NULL,
	`nama` text NOT NULL,
	CONSTRAINT `standard_061125_no` PRIMARY KEY(`no`)
);
--> statement-breakpoint
CREATE TABLE `standardbu` (
	`no` int AUTO_INCREMENT NOT NULL,
	`type` varchar(10) NOT NULL,
	`nmpath` varchar(100),
	`number` varchar(100),
	`pdf` varchar(100),
	`revision` varchar(10),
	`date` date,
	`date2` date NOT NULL,
	`title` varchar(500),
	`category` varchar(25),
	`control_sheet` varchar(25),
	`remark` varchar(50),
	`panel` text NOT NULL,
	`nik` text NOT NULL,
	`nama` text NOT NULL,
	CONSTRAINT `standardbu_no` PRIMARY KEY(`no`)
);
--> statement-breakpoint
CREATE TABLE `useraccounts` (
	`username` varchar(50) NOT NULL,
	`kuid` varchar(32) NOT NULL,
	`password` varchar(35) NOT NULL,
	`userlevel` int NOT NULL,
	`Provinsi` varchar(20) NOT NULL,
	`Config_penghasil` varchar(50) NOT NULL,
	`Activated` enum('Y','N') NOT NULL DEFAULT 'N',
	CONSTRAINT `useraccounts_username` PRIMARY KEY(`username`)
);
--> statement-breakpoint
CREATE TABLE `useraccounts170325` (
	`username` varchar(50) NOT NULL,
	`kuid` varchar(32) NOT NULL,
	`password` varchar(35) NOT NULL,
	`userlevel` int NOT NULL,
	`Provinsi` varchar(20) NOT NULL,
	`Config_penghasil` varchar(50) NOT NULL,
	`Activated` enum('Y','N') NOT NULL DEFAULT 'N',
	CONSTRAINT `useraccounts170325_username` PRIMARY KEY(`username`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`username` varchar(30) NOT NULL,
	`password` varchar(32),
	`userid` varchar(32),
	`userlevel` tinyint unsigned NOT NULL,
	`email` varchar(50),
	`timestamp` int unsigned NOT NULL,
	`parent_directory` varchar(30) NOT NULL,
	CONSTRAINT `users_username` PRIMARY KEY(`username`)
);

*/