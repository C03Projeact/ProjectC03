-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2024 at 06:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rmuttcp_c03`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(5) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `prefix` varchar(10) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `faculty` varchar(50) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `section` int(2) DEFAULT NULL,
  `day` varchar(20) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `role` enum('1','2','3') NOT NULL,
  `position` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `user_id`, `password`, `prefix`, `first_name`, `last_name`, `faculty`, `department`, `section`, `day`, `start_time`, `end_time`, `role`, `position`) VALUES
(1, 'admin', '$2y$10$zGrObjCmzyK9aMm7JNpgNeL35v/P9jPe/Q8Po.jHo38dPx8lJF4nu', 'นาย', 'ชันชัยมี', 'ชัยนา', '', '', 0, '', '00:00:00', '00:00:00', '1', NULL),
(18, '1164304620232', '$2y$10$FkQq34lk1FYPypybOerSi.Y.JZs.2fxg9SfsWf6SbaWUD/yThy6Ka', 'นาย', 'มิรัน', 'ธินา', 'วิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 1, 'จันทร์', '08:00:00', '12:00:00', '3', NULL),
(25, '23123123', '$2y$10$gXyT74h0.nX8BXiRQc5rvewYUfKvpVcSVAnFXVHkN3/FhVrPL5AIO', 'ดร', 'ชันชัย', 'ชัยนา', NULL, 'วิศวกรรมคอมพิวเตอร์', 5, '', '00:00:00', '00:00:00', '2', 'หัวหน้าภาค'),
(26, 'admin2222', '$2y$10$/jl4KkY8zsxyQbJMu.jIc.qjVuBc31wKHPMhqB2reugSx2D2haQUC', 'นาย', 'วานาพน', 'สันติ', '', '', 0, '', '00:00:00', '00:00:00', '1', NULL),
(27, 'adminb', '$2y$10$.IiUoyy8bTwtUqqr4q8L9eD1mF/RS0hud1yE8eOfowrLyZ85ze3wi', 'นางสาว', 'บิทนา', 'คัง', 'วิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 0, NULL, NULL, NULL, '1', NULL),
(46, 'teacher22', '$2y$10$b8qMgVcnDCgdfV50RPGJIelHIphJTFSvj3xa2BGb3Z9/Khe6ydcjK', 'ดร', 'สุพันธ์', 'ธรรมสี', '', 'วิศวกรรมคอมพิวเตอร์', 1, '', '00:00:00', '00:00:00', '2', 'อาจารย์ผู้สอน'),
(51, '1164304620234', '$2y$10$N7UOXC5DtQVDPD4YJijkC.NV0YbOf/QeUIgTGmbtmoyZu5rqAyjlO', 'นาง', 'มาสี', 'สนธา', 'วิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 1, 'จันทร์', '08:00:00', '12:00:00', '3', NULL),
(60, 'admin44', '$2y$10$NvWwDG59qWrRRupnqWMiquqcqR0WJDck8gGKqPwhvUq87/bS2eCU.', 'นาย', 'สุวัน', 'ทันนา', '', '', 0, '', '00:00:00', '00:00:00', '1', NULL),
(62, 'admin55', '$2y$10$3D7pJy3XTahHcNY5YC.Cz.6Yv6qkGVwP6hBLd0zUGHZ51xfsEEzmW', 'นาย', 'วันนา', 'พิทัก', '', '', 0, '', '00:00:00', '00:00:00', '1', NULL),
(65, 'teacher55', '$2y$10$aMv1obP5Uh7tZhwmzVZam.i/BUxL/q3iZTfTiX37bHb5377emFVS2', 'นาย', 'มา', 'ไหน', '', 'วิศวกรรมคอมพิวเตอร์', 2, '', '00:00:00', '00:00:00', '2', 'อาจารย์ผู้สอน'),
(74, 'test_user', '$2y$10$Wgpya9eaGbfvccAeKdZ8POIgkT.V/jD5lxPfGctESs2N1vKRgGMCy', 'Mr.', 'John', 'Doe', 'Engineering', 'Computer Science', 0, 'Monday', '09:00:00', '17:00:00', '2', NULL),
(78, 'useruser', '$2y$10$lfmC1eGxYVJV6gfheGZvx.LmFG.CI5kZnIpJ7qWPilEAzfcDJB1Je', 'นาย', 'useruser', 'useruser', '', 'useruser', 12, NULL, NULL, NULL, '2', NULL),
(79, 'teacher77', '$2y$10$hIHlS5n2tQ1bQxalnzxjeOjC6nM.YuCgUiTxz7c33nZAbeYI1SbH2', 'นาย', 'วินทา', 'มาโน', '', 'วิศวกรรมคอมพิวเตอร์', 1, '', '00:00:00', '00:00:00', '2', 'อาจารย์ผู้สอน'),
(80, '1234567891011', '$2y$10$Qhcaf9zGUaeJq1s9EF6sHecO1dG02F74O6QdKQ.8IE2wRAN6c9wxy', 'นาย', 'วาธะ', 'ศรธนา', 'วิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 1, 'จันทร์', '08:00:00', '12:00:00', '3', ''),
(101, 'test', '$2y$10$F9HcIasVHXjt7qHJs1rm7O3ADJ0IKUj1Bb61/Pe9YXMW3Oh3P95L2', 'test', 'test', 'test', '', '', 0, '', '00:00:00', '00:00:00', '1', ''),
(103, 'testtesttestt', '$2y$10$F0p0QcCehW7nmvS8v7ZZ0uuEfiezTY7bhOuNl1ggQ3QAjimXSlYoC', 'test', 'test', 'test', 'test', 'test', 1, 'พฤหัสบดี', '10:42:00', '23:43:00', '3', ''),
(104, 'test2', '$2y$10$QugonycPHtWC5nHNih0lRujxJJ/r2hU9n00ysJW1xnbMNwCjdxt5e', 'test2', 'test2', 'test2', '', '', 0, '', '00:00:00', '00:00:00', '1', ''),
(105, 'test2', '$2y$10$DLgG2eGRpFMwDq0m4Fn3KelpC6dvXXAtF2mF58ioHKDLmes.5ubDq', 'test2', 'test2', 'test2', '', 'test2', 5, '', '00:00:00', '00:00:00', '2', 'test2'),
(106, 'test2test2te1', '$2y$10$EFCSBNqww1mBTDyG128oQO.WX.C4alIcac5gJOEfWWdu3Y1k3MA8G', 'test2', 'test2', 'test2', 'test2', 'test2', 2, 'อังคาร', '09:53:00', '09:53:00', '3', ''),
(110, '1111111111111', '$2y$10$R4R1UXYUn8lewKW0pM8.DuaJMDlryzvnDw2cgJVWonRJURt7HeLd6', 'นาย', 'หนึ่ง', 'เดียว', 'วิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 1, 'อังคาร', '13:16:00', '16:19:00', '3', ''),
(139, 'test3', '$2y$10$9ZupB.wL58qmQmFKgvalueGGijx4bJdgIrSTo4Lz9a6VH2hAzloVe', 'นาย', 'สอง', 'สาม', '', 'วิศวกรรมคอมพิวเตอร์', 3, '', '00:00:00', '00:00:00', '2', 'อาจารย์ผู้สอน'),
(173, '1594631654987', '$2y$10$cN7MyqGuYIyOM5khUq59oex3KbathzH52WozrzF/ZrsBvKWhvDNam', 'นาย', 'นาย', 'วัน', 'วิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 5, 'จันทร์', '00:22:00', '03:25:00', '3', ''),
(174, 'test4', '$2y$10$SJe/gURMh5VXDhmH9i490.2TBB/FmVKn3xgAPUQRFx2Hdze7lsx/K', 'นาย', 'ธรรม', 'มะ', '', 'วิศวกรรมคอมพิวเตอร์', 5, '', '00:00:00', '00:00:00', '2', 'อาจารย์ผู้สอน'),
(175, 'admin666', '$2y$10$Hf.36Ta1LHLtrIZ5oWxz/.1yovS/ZEhqKCjSSAbUeiPn8eD.5Uwg2', 'นาง', 'พทิทารา', 'ศิดา', '', '', 0, '', '00:00:00', '00:00:00', '1', ''),
(178, '1164304620027', '$2y$10$QmkdiKTmUmx4lPD32Ajt5uhIjtkzjfTKjqSGKgWzsrDEgAD4X8sTy', 'นางสาว', 'นิศากร', 'อาจวิชัย', 'วิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 1, 'อังคาร', '09:00:00', '12:00:00', '3', ''),
(188, '147258369123456', '$2y$10$zAIqtbKRC5597mCqF/Euh.4sQpIyEMVK.RApQGZ/ejBtDFv90M8CG', 'นาย', 'teast', 'สันสร้aseeาง', 'วิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 1, 'จันทร์', '09:00:00', '17:00:00', '3', ''),
(192, 'adminb', '$2y$10$Vr10EAdfQunW0YXV.sgIGuMtLxwEzNzz7plhbWyPIxqwfP6CsSTZi', 'นางสาว', 'นิศากร', 'อาจวิชัย', '', '', 0, '', '00:00:00', '00:00:00', '1', ''),
(194, '1164304620237', '$2y$10$uQIAJkik4swMJr4an19mB.oBpDxVh.ky5KtVkQHRf6Ut89IMjQH9e', 'นาย', 'อาทิตย์', 'ยื้มเจริญ', 'วิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 1, 'จันทร์', '09:00:00', '12:00:00', '3', ''),
(196, 'teacher223', '$2y$10$WjE.G7Q3.UtfvJrqLOfuW.OVFyu6RjDrYg2laIk3BRqxJgL4GSKge', 'นาย', 'นิศากร', 'วันด', '', 'วิศวกรรมคอมพิวเตอร์', 3, '', '00:00:00', '00:00:00', '2', 'ผู้สอน'),
(197, '1164304620234', '$2y$10$Ch9AecCkaC.NAMPz5QSKSuhEQPSYmXos13RdmyS2ez6AokOvWHWcu', 'นาง', 'มาสี', 'สนธา', 'วิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 1, 'จันทร์', '09:00:00', '17:00:00', '3', ''),
(198, '1164304620243a', '$2y$10$B9SJzidXPXdB0gI1soYuLeW14Y9zicVW60vP/UNAhUbfnJjv25gO.', 'นาย', 'อาทิ', 'สันสร้าง', 'วิศวกรรมศาสตร์', 'วิศวกรรมคอมพิวเตอร์', 1, 'จันทร์', '09:00:00', '17:00:00', '3', '');

-- --------------------------------------------------------

--
-- Table structure for table `course_content`
--

CREATE TABLE `course_content` (
  `id` int(11) NOT NULL,
  `content1` text DEFAULT NULL,
  `content2` text DEFAULT NULL,
  `goals` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`goals`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `course_content`
--

INSERT INTO `course_content` (`id`, `content1`, `content2`, `goals`, `created_at`) VALUES
(1, ' แนวคิดและองค์ประกอบของคอมพิวเตอร์\n            อันตรกิริยาระหว่างฮาร์ดแวร์และซอฟต์แวร์\n            การประมวลผลข้อมูลทางอิเล็กทรอนิกส์วิธีการออกแบบและพัฒนาโปรแกรมและการเขียนโปรแกรมภาษาระดับสูง', '  Concepts and components of computer, hardware and software\n            interaction, electronic data processing concepts, program design and\n            development methodology and high-level language programming\n', '[\"\\u0e23\\u0e39\\u0e49\\u0e41\\u0e19\\u0e27\\u0e04\\u0e34\\u0e14\\u0e41\\u0e25\\u0e30\\u0e2d\\u0e07\\u0e04\\u0e4c\\u0e1b\\u0e23\\u0e30\\u0e01\\u0e2d\\u0e1a\\u0e02\\u0e2d\\u0e07\\u0e23\\u0e30\\u0e1a\\u0e1a\\u0e04\\u0e2d\\u0e21\\u0e1e\\u0e34\\u0e27\\u0e40\\u0e15\\u0e2d\\u0e23\\u0e4c\\n\\n\",\"\\u0e40\\u0e02\\u0e49\\u0e32\\u0e43\\u0e08\\u0e2d\\u0e31\\u0e19\\u0e15\\u0e23\\u0e01\\u0e34\\u0e23\\u0e34\\u0e22\\u0e32\\u0e23\\u0e30\\u0e2b\\u0e27\\u0e48\\u0e32\\u0e07\\u0e2e\\u0e32\\u0e23\\u0e4c\\u0e14\\u0e41\\u0e27\\u0e23\\u0e4c\\u0e41\\u0e25\\u0e30\\u0e0b\\u0e2d\\u0e1f\\u0e15\\u0e4c\\u0e41\\u0e27\\u0e23\\u0e4c\\n\",\"\\u0e40\\u0e02\\u0e49\\u0e32\\u0e43\\u0e08\\u0e01\\u0e32\\u0e23\\u0e1b\\u0e23\\u0e30\\u0e21\\u0e27\\u0e25\\u0e1c\\u0e25\\u0e02\\u0e49\\u0e2d\\u0e21\\u0e39\\u0e25\\u0e17\\u0e32\\u0e07\\u0e2d\\u0e34\\u0e40\\u0e25\\u0e47\\u0e01\\u0e17\\u0e23\\u0e2d\\u0e19\\u0e34\\u0e01\\u0e2a\\u0e4c\\n\",\"\\u0e2d\\u0e2d\\u0e01\\u0e41\\u0e1a\\u0e1a\\u0e41\\u0e25\\u0e30\\u0e1e\\u0e31\\u0e12\\u0e19\\u0e32\\u0e42\\u0e1b\\u0e23\\u0e41\\u0e01\\u0e23\\u0e21\\u0e04\\u0e2d\\u0e21\\u0e1e\\u0e34\\u0e27\\u0e40\\u0e15\\u0e2d\\u0e23\\u0e4c\\n\",\"\\u0e21\\u0e35\\u0e17\\u0e31\\u0e01\\u0e29\\u0e30\\u0e43\\u0e19\\u0e01\\u0e32\\u0e23\\u0e40\\u0e02\\u0e35\\u0e22\\u0e19\\u0e42\\u0e1b\\u0e23\\u0e41\\u0e01\\u0e23\\u0e21\\u0e14\\u0e49\\u0e27\\u0e22\\u0e20\\u0e32\\u0e29\\u0e32\\u0e23\\u0e30\\u0e14\\u0e31\\u0e1a\\u0e2a\\u0e39\\u0e07\\n\",\"\\u0e21\\u0e35\\u0e17\\u0e31\\u0e01\\u0e29\\u0e30\\u0e43\\u0e19\\u0e01\\u0e32\\u0e23\\u0e1b\\u0e23\\u0e30\\u0e22\\u0e38\\u0e01\\u0e15\\u0e4c\\u0e43\\u0e0a\\u0e49\\u0e42\\u0e1b\\u0e23\\u0e41\\u0e01\\u0e23\\u0e21\\u0e2a\\u0e33\\u0e40\\u0e23\\u0e47\\u0e08\\u0e23\\u0e39\\u0e1b\\u0e17\\u0e32\\u0e07\\u0e27\\u0e34\\u0e28\\u0e27\\u0e01\\u0e23\\u0e23\\u0e21\\n\",\"\\u0e21\\u0e35\\u0e40\\u0e08\\u0e15\\u0e04\\u0e15\\u0e34\\u0e17\\u0e35\\u0e48\\u0e14\\u0e35\\u0e43\\u0e19\\u0e01\\u0e32\\u0e23\\u0e42\\u0e1b\\u0e23\\u0e41\\u0e01\\u0e23\\u0e21\\u0e04\\u0e2d\\u0e21\\u0e1e\\u0e34\\u0e27\\u0e40\\u0e15\\u0e2d\\u0e23\\u0e4c\"]', '2024-09-22 07:51:14');

-- --------------------------------------------------------

--
-- Table structure for table `lab`
--

CREATE TABLE `lab` (
  `lab_id` int(11) NOT NULL,
  `lab_name` varchar(255) NOT NULL,
  `content_file` varchar(255) NOT NULL,
  `upload_time` datetime NOT NULL DEFAULT current_timestamp(),
  `open_time` datetime NOT NULL,
  `close_time` datetime NOT NULL,
  `status` enum('0','1') CHARACTER SET ucs2 COLLATE ucs2_unicode_ci NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lab`
--

INSERT INTO `lab` (`lab_id`, `lab_name`, `content_file`, `upload_time`, `open_time`, `close_time`, `status`) VALUES
(7, 'Lab 3.1', '1729126324_lab3_1.docx', '2024-10-17 07:52:04', '2024-10-17 09:42:00', '2024-10-17 15:48:00', '0'),
(8, 'Lab 3.2', '1729126335_lab3_2.docx', '2024-10-17 07:52:15', '2024-10-13 09:50:00', '2024-10-13 09:55:00', '1'),
(9, 'Lab 3.3', '670292a7a99dc-lab3_3.pdf', '2024-10-06 20:37:43', '2024-10-22 12:14:00', '2024-10-22 13:14:00', '0'),
(10, 'Lab 3.4', '670292bef0032-lab3_4.pdf', '2024-10-06 20:38:06', '2024-10-17 10:51:00', '2024-10-18 16:57:00', '0'),
(11, 'Lab 3.5', '6702939e7027e-lab3_5.pdf', '2024-10-06 20:41:50', '2024-10-07 11:05:00', '2024-10-07 11:08:00', '0'),
(12, 'Lab 3.6', '670293a67765d-lab3_6.pdf', '2024-10-06 20:41:58', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(13, 'Lab 3.7', '670293afe96c6-lab3_7.pdf', '2024-10-06 20:42:07', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(14, 'Lab 3.8', '670293bbd0290-lab3_8.pdf', '2024-10-06 20:42:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(15, 'Lab 3.9', '670293c5557e0-lab3_9.pdf', '2024-10-06 20:42:29', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(16, 'Lab 4.1', '670293d42dcb3-lab4_1.pdf', '2024-10-06 20:42:44', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(17, 'Lab 4.2', '670293dd659d9-lab4_2.pdf', '2024-10-06 20:42:53', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(18, 'Lab 4.3', '670293e4bb433-lab4_3.pdf', '2024-10-06 20:43:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(19, 'Lab 4.4', '670293ec5b55f-lab4_4.pdf', '2024-10-06 20:43:08', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(20, 'Lab 5.1', '670293fd64d9b-lab5_1.pdf', '2024-10-06 20:43:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(21, 'Lab 5.2', '670294052c5f5-lab5_2.pdf', '2024-10-06 20:43:33', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(22, 'Lab 5.3', '6702940c4002c-lab5_3.pdf', '2024-10-06 20:43:40', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(23, 'Lab 6.1', '67029423eca6d-lab6_1.pdf', '2024-10-06 20:44:03', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(24, 'Lab 6.2', '6702942ec7b32-lab6_2.pdf', '2024-10-06 20:44:14', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(25, 'Lab 6.3', '6702943687816-lab6_3.pdf', '2024-10-06 20:44:22', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(26, 'Lab 7.1', '6702944254f68-lab7_1.pdf', '2024-10-06 20:44:34', '2024-10-17 06:35:00', '2024-10-17 06:41:00', '0'),
(27, 'Lab 7.2', '6702944ade765-lab7_2.pdf', '2024-10-06 20:44:42', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(28, 'Lab 7.3', '6702945319110-lab7_3.pdf', '2024-10-06 20:44:51', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(29, 'Lab 7.4', '6702945b779d2-lab7_4.pdf', '2024-10-06 20:44:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1'),
(30, 'Lab 8.1', '67029470c4bc1-lab8_1.pdf', '2024-10-06 20:45:20', '2024-10-18 19:38:00', '2024-10-18 20:40:00', '0'),
(31, 'Lab 8.2', '1729136937_lab9_1.docx', '2024-10-17 10:48:57', '2024-10-18 19:37:00', '2024-10-18 01:42:00', '0');

-- --------------------------------------------------------

--
-- Table structure for table `lab_allow`
--

CREATE TABLE `lab_allow` (
  `id` int(10) NOT NULL,
  `lab_id` int(10) NOT NULL,
  `account_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lab_allow`
--

INSERT INTO `lab_allow` (`id`, `lab_id`, `account_id`) VALUES
(6, 1, 110),
(8, 4, 110),
(27, 26, 92),
(70, 11, 92),
(77, 11, 92),
(84, 11, 92),
(91, 11, 92),
(109, 8, 18),
(110, 8, 51),
(111, 8, 80),
(112, 8, 92),
(113, 8, 103),
(114, 8, 110),
(115, 8, 178),
(122, 29, 18),
(123, 29, 51),
(124, 29, 80),
(125, 29, 103),
(126, 29, 110),
(127, 29, 178),
(128, 29, 106),
(129, 29, 173),
(130, 38, 18),
(131, 38, 51),
(132, 38, 80),
(133, 38, 103),
(134, 38, 110),
(135, 38, 178),
(136, 38, 188),
(137, 40, 18),
(138, 40, 51),
(139, 40, 80),
(140, 40, 103),
(141, 40, 110),
(142, 40, 178),
(143, 40, 188),
(151, 37, 18),
(152, 37, 51),
(153, 37, 80),
(154, 37, 103),
(155, 37, 110),
(156, 37, 178),
(157, 37, 188),
(158, 26, 18),
(159, 26, 51),
(160, 26, 80),
(161, 26, 103),
(162, 26, 110),
(163, 26, 178),
(164, 26, 188),
(175, 7, 18),
(176, 7, 51),
(178, 7, 103),
(179, 7, 110),
(180, 7, 178),
(181, 7, 188),
(182, 7, 194),
(183, 10, 18),
(184, 10, 51),
(185, 10, 80),
(186, 10, 103),
(187, 10, 110),
(188, 10, 178),
(189, 10, 188),
(190, 10, 194),
(191, 10, 197),
(192, 10, 198),
(223, 31, 18),
(224, 31, 51),
(225, 31, 80),
(226, 31, 103),
(227, 31, 110),
(228, 31, 178),
(229, 31, 188),
(230, 31, 194),
(231, 31, 197),
(232, 31, 198),
(233, 30, 18),
(234, 30, 51),
(235, 30, 80),
(236, 30, 103),
(237, 30, 110),
(238, 30, 178),
(239, 30, 188),
(240, 30, 194),
(241, 30, 197),
(242, 30, 198),
(243, 9, 18),
(244, 9, 51),
(245, 9, 80),
(246, 9, 103),
(247, 9, 110),
(248, 9, 178),
(249, 9, 188),
(250, 9, 194),
(251, 9, 197),
(252, 9, 198);

-- --------------------------------------------------------

--
-- Table structure for table `lab_submit`
--

CREATE TABLE `lab_submit` (
  `id` int(10) NOT NULL,
  `lab_id` int(10) NOT NULL,
  `account_id` int(10) NOT NULL,
  `file` varchar(50) NOT NULL,
  `score` int(10) NOT NULL DEFAULT 0,
  `submission_status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lab_submit`
--

INSERT INTO `lab_submit` (`id`, `lab_id`, `account_id`, `file`, `score`, `submission_status`) VALUES
(0, 1, 80, '1727800380-code (3).pdf', 8, 0),
(0, 1, 110, '1727839864-code.pdf', 8, 0),
(0, 1, 110, '1728022885-code (3).c', 8, 0),
(0, 8, 80, '1728221962-code (4).pdf', 8, 0),
(0, 9, 80, '1728221967-code.py', 7, 1),
(0, 9, 80, '1728221990-code (1).pdf', 7, 1),
(0, 7, 110, '1728230630-code (5).pdf', 6, 1),
(0, 7, 80, '1728230673-code (6).pdf', 4, 1),
(0, 26, 110, '1728231889-code (7).pdf', 8, 0),
(0, 26, 110, '1728231907-code (8).pdf', 8, 0),
(0, 7, 80, '1729125895-code (4).c', 4, 1),
(0, 7, 178, '1729126686-code (5).c', 0, 1),
(0, 10, 80, '1729137542-code.pdf', 3, 0),
(0, 10, 110, '1729138036-code (6).c', 7, 0),
(0, 10, 178, '1729138214-code.c', 8, 0),
(0, 9, 110, '1729574065-code (7).pdf', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE `lesson` (
  `lesson_id` int(11) NOT NULL,
  `lesson_name` varchar(255) NOT NULL,
  `content_file` varchar(255) NOT NULL,
  `upload_time` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lesson`
--

INSERT INTO `lesson` (`lesson_id`, `lesson_name`, `content_file`, `upload_time`, `status`) VALUES
(32, 'Testfile1', '1728223479_lab6.pdf', '2024-10-06 21:04:39', '1'),
(33, 'Kowew', '1729223836_Cyber-Security_0010.pdf', '2024-10-18 10:57:16', '1'),
(34, 'หลักการทำงาน', '66f2af2778015-Cyber-Security_0101.pdf', '2024-09-24 19:23:03', '1'),
(43, 'ทดสอบระบบ', '1729223771_0001.pdf', '2024-10-18 10:56:11', '1'),
(44, 'ทดสอบ', '6710880247362-Fields.pdf', '2024-10-17 10:44:02', '1'),
(45, 'ทดสอบ', '671088029a8a3-Fields.pdf', '2024-10-17 10:44:02', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_content`
--
ALTER TABLE `course_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lab`
--
ALTER TABLE `lab`
  ADD PRIMARY KEY (`lab_id`);

--
-- Indexes for table `lab_allow`
--
ALTER TABLE `lab_allow`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`lesson_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;

--
-- AUTO_INCREMENT for table `course_content`
--
ALTER TABLE `course_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `lab`
--
ALTER TABLE `lab`
  MODIFY `lab_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `lab_allow`
--
ALTER TABLE `lab_allow`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=253;

--
-- AUTO_INCREMENT for table `lesson`
--
ALTER TABLE `lesson`
  MODIFY `lesson_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
