-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Dec 01, 2019 at 02:37 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs361_deae`
--

-- --------------------------------------------------------

--
-- Table structure for table `fp_user`
--

CREATE TABLE `fp_user` (
  `id` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` char(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fp_user`
--

INSERT INTO `fp_user` (`id`, `username`, `password`) VALUES
(1, 'deae', '1'),
(2, 'judkiss', '1'),
(5, 'demo1', '11111111'),
(8, 'demo2', '22222222'),
(9, 'demo3', '11111111'),
(10, 'reitenbt', 'reitenbt'),
(11, 'testuser', '12345678'),
(12, 'demo4', '44444444'),
(13, 'test123', 'password'),
(14, 'nfehl', '12345678'),
(15, 'user1', 'password'),
(16, 'User99', 'password'),
(17, 'newUser', '11111111'),
(18, 'asd', '12345678'),
(19, 'TestUser3', '11111111'),
(20, 'demo5', '55555555'),
(21, 'demo6', '66666666'),
(23, 'nrg1', '12345678'),
(24, 'nrg2', '12345678');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fp_user`
--
ALTER TABLE `fp_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Id` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fp_user`
--
ALTER TABLE `fp_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
