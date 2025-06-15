-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2025 at 06:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_retail`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--
create database e_retail;
use e_retail;
CREATE TABLE `article` (
  `article_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `image_1` varchar(50) DEFAULT NULL,
  `image_2` varchar(50) DEFAULT NULL,
  `promotion_at_homepage_level` varchar(1) NOT NULL,
  `promotion_at_department_level` varchar(1) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`article_id`, `name`, `description`, `price`, `image_1`, `image_2`, `promotion_at_homepage_level`, `promotion_at_department_level`, `deleted_at`) VALUES
(56, 'Top 10 Smartphones of 2024: Features and Reviews', '```html\r\n<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Top 10 Smartphones of 2024 (Price Only)</title>\r\n</head>\r\n<body>\r\n\r\n    <h1>Top 10 Smartphones of 2024: Ranked by Price</h1>\r\n\r\n    <p>Looking for a new smartphone but overwhelmed by endless specs? We\'ve simplified things for you! Below is a list of the top 10 smartphones of 2024, ranked <strong>solely by price</strong>, from least expensive to most expensive. This list is perfect if your budget is your primary concern.</p>\r\n\r\n    <p><strong>Please Note:</strong> Prices are approximate and may vary depending on retailer and location. Check current pricing before making a purchase.</p>\r\n\r\n    <h2>2024\'s Top Smartphones (Price-Focused)</h2>\r\n\r\n    <ul>\r\n        <li>Motorola Moto G Power (2024): $199</li>\r\n        <li>Samsung Galaxy A15: $229</li>\r\n        <li>Google Pixel 7a: $449</li>\r\n        <li>Samsung Galaxy S23 FE: $599</li>\r\n        <li>iPhone 13: $599</li>\r\n        <li>Google Pixel 8: $699</li>\r\n        <li>Samsung Galaxy S24: $799</li>\r\n        <li>iPhone 15: $799</li>\r\n        <li>Samsung Galaxy S24+: $999</li>\r\n        <li>iPhone 15 Pro: $999</li>\r\n    </ul>\r\n\r\n    <p>This list provides a quick overview of some of the leading smartphones and their relative price points. Happy shopping!</p>\r\n\r\n</body>\r\n</html>', 19.24, '1732807137337-964721728-1.png', '1732807137337-345654659-2.png', '1', '0', NULL),
(57, 'Best Laptops for Students: Affordable and Powerful', '```html\r\n<h1>Best Buy Laptops for Students in 2025: Your Guide to Top Models</h1>\r\n\r\n<p>Finding the perfect laptop for college can be overwhelming! This guide cuts through the noise and highlights the best laptops available at Best Buy in 2025, specifically chosen for student needs. We focus on providing you with the essential information: <strong>model names and estimated prices</strong> to help you quickly narrow down your options and stay within budget.</p>\r\n\r\n<h2>Laptop Recommendations (Model & Price Only)</h2>\r\n\r\n<p>Here\'s a curated list of top laptop models perfect for students, available at Best Buy, with estimated prices for 2025. <em>Note: Prices are estimates and subject to change. Please verify with Best Buy directly.</em></p>\r\n\r\n<ul>\r\n  <li><strong>Dell XPS 13:</strong> Estimated Price - $1,200</li>\r\n  <li><strong>Apple MacBook Air (M4 Chip):</strong> Estimated Price - $1,100</li>\r\n  <li><strong>HP Spectre x360 14:</strong> Estimated Price - $1,300</li>\r\n  <li><strong>Lenovo Yoga 7i 14:</strong> Estimated Price - $900</li>\r\n  <li><strong>Microsoft Surface Laptop 6:</strong> Estimated Price - $1,350</li>\r\n  <li><strong>ASUS Zenbook 14 OLED:</strong> Estimated Price - $1,000</li>\r\n</ul>\r\n\r\n<p><strong>Disclaimer:</strong> This list is based on projected specifications and pricing for laptops expected to be popular among students in 2025. Check Best Buy\'s website or visit a store for the most up-to-date information and availability.</p>\r\n```', 27.00, '1732807686614-470342021-3.png', '1732807686614-487583442-4.png', '0', '1', NULL),
(58, 'The Top 5 Electric Cars', '```html\r\n<h1>Top 5 Electric Cars You Need to Know About</h1>\r\n\r\n<p>Considering making the switch to electric? Navigating the ever-expanding EV market can feel overwhelming.  We\'ve compiled a list of the <strong>Top 5 Electric Cars</strong> currently making waves, focusing on popular brands and providing a quick overview of their price points. This isn\'t a ranking based on performance, features, or range, but rather a starting point to help you identify potential candidates for your next vehicle.</p>\r\n\r\n<h2>Electric Car Showcase: Brands and Prices</h2>\r\n\r\n<p>Below, you\'ll find a concise list of five popular electric cars, listed alphabetically by brand, along with their approximate starting prices.  Keep in mind that prices can vary based on trim levels, options, and incentives.</p>\r\n\r\n<ul>\r\n    <li><strong>Audi e-tron:</strong>  Starting around $75,000 </li>\r\n    <li><strong>Chevrolet Bolt EV:</strong> Starting around $25,000</li>\r\n    <li><strong>Ford Mustang Mach-E:</strong> Starting around $43,000</li>\r\n    <li><strong>Tesla Model 3:</strong> Starting around $40,000</li>\r\n    <li><strong>Volkswagen ID.4:</strong> Starting around $40,000</li>\r\n</ul>\r\n\r\n<p><em>Note:  These prices are estimates and may not reflect the most current offers or incentives. Always consult with a dealer for the most accurate pricing information.</em></p>\r\n\r\n<h2>Next Steps: Further Research</h2>\r\n\r\n<p>This list is just the beginning! We encourage you to delve deeper into researching these models and others that catch your eye.  Consider factors like:</p>\r\n<ul>\r\n    <li>Range and charging time</li>\r\n    <li>Available features and technology</li>\r\n    <li>Driving dynamics and performance</li>\r\n    <li>Incentives and tax credits available in your area</li>\r\n</ul>\r\n\r\n<p>Happy EV hunting!</p>\r\n```', 23.42, '1732812274112-465665101-4.png', '1732812274113-582937207-1.png', '0', '1', NULL),
(59, 'How to Choose the Perfect Tires and Wheels for You', '```html\r\n<h1>Choosing the Perfect Tires and Wheels: A Comprehensive Guide</h1>\r\n\r\n<p>Finding the right tires and wheels for your vehicle can dramatically impact its performance, safety, and even its appearance. This guide will walk you through the key considerations to help you make an informed decision and ensure you select the perfect fit for your needs and driving style.</p>\r\n\r\n<h2>Key Factors to Consider:</h2>\r\n\r\n<ul>\r\n  <li><strong>Vehicle Type and Usage:</strong> Are you driving a sedan, truck, SUV, or sports car? How will you primarily be using your vehicle (daily commute, off-roading, performance driving)?</li>\r\n  <li><strong>Tire Size and Load Rating:</strong> Understanding your vehicle\'s recommended tire size is crucial for safety and performance. We\'ll explain how to decipher tire codes and load ratings.</li>\r\n  <li><strong>Wheel Size and Offset:</strong> Learn about the impact of wheel size and offset on handling and aesthetics.</li>\r\n  <li><strong>Tire Type:</strong> Explore different tire types, including all-season, summer, winter, and all-terrain, and determine which is best suited for your climate and driving conditions.</li>\r\n  <li><strong>Budget:</strong>  We\'ll help you understand the cost differences between various tire and wheel options and find a balance between price and performance.</li>\r\n  <li><strong>Aesthetics:</strong> Discover how different wheel styles can enhance the look of your vehicle.</li>\r\n</ul>\r\n\r\n<h2>What You\'ll Learn:</h2>\r\n\r\n<p>In this comprehensive guide, you\'ll discover:</p>\r\n\r\n<ul>\r\n  <li>How to read and understand tire sidewall markings.</li>\r\n  <li>The importance of proper tire pressure and maintenance.</li>\r\n  <li>The pros and cons of different wheel materials (e.g., alloy vs. steel).</li>\r\n  <li>Tips for choosing the right tire and wheel combination for optimal performance and safety.</li>\r\n  <li><em>Where to find reliable resources and expert advice.</em></li>\r\n</ul>\r\n\r\n<p>Don\'t compromise on safety and performance!  Take control of your vehicle\'s handling and appearance.  Read on to find the perfect tires and wheels for <strong><em>you</em></strong>!</p>\r\n```', 12.44, '1732812438698-993007923-4.png', '1732812438699-560100139-2.png', '1', '0', NULL),
(60, 'Exploring the Best Contemporary Fiction Authors of', '```html\r\n<h1>Exploring the Landscape of Contemporary Fiction: Discover Your Next Read</h1>\r\n\r\n<h2>Delve into the World of Today\'s Most Compelling Storytellers</h2>\r\n\r\n<p>Are you looking for your next literary obsession?  Do you want to discover the voices shaping modern fiction? This exploration takes you on a journey through the works of the <strong>best contemporary fiction authors</strong>. We\'ll examine writers who are pushing boundaries, exploring diverse perspectives, and crafting unforgettable narratives that resonate with our times.</p>\r\n\r\n<p>In this article, you\'ll discover:</p>\r\n\r\n<ul>\r\n  <li><strong>Profiles of Acclaimed Authors:</strong>  Learn about the lives and inspirations of authors making waves in the literary world.</li>\r\n  <li><strong>Genre Spotlights:</strong> Explore popular genres like literary fiction, historical fiction, science fiction, and more, highlighting key authors in each.</li>\r\n  <li><strong>Must-Read Book Recommendations:</strong>  Get a curated list of highly-rated and critically acclaimed novels from these authors.</li>\r\n  <li><strong><em>Why</em> These Authors Matter:</strong>  Understand the impact these writers are having on contemporary literature and culture.</li>\r\n</ul>\r\n\r\n<p>From thought-provoking character studies to gripping plot-driven adventures, we\'ll help you navigate the vast landscape of contemporary fiction and find authors and books that will captivate and inspire you.  Prepare to expand your reading horizons and discover your next favorite author!</p>\r\n```', 16.40, '1732813307830-311826258-3.png', '1732813307832-615631743-1.png', '0', '0', NULL),
(61, '10 Must-Read Classics That Shaped Modern Literatur', 'ignissim risus AUTOBIOGRAPHY...', 7.25, '1734384110407-985289640-logo.png', '1734384110408-500992828-1.png', '1', '0', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `article_comments`
--

CREATE TABLE `article_comments` (
  `comment_id` int(10) UNSIGNED NOT NULL,
  `article_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `parent_comment_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'For reply comments, NULL if top-level',
  `comment_text` text NOT NULL,
  `rating` tinyint(1) UNSIGNED DEFAULT NULL COMMENT 'Rating 1-5 stars (NULL if no rating)',
  `is_approved` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=pending, 1=approved, 2=rejected',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT 'Soft delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='User comments and ratings for articles';

--
-- Dumping data for table `article_comments`
--

INSERT INTO `article_comments` (`comment_id`, `article_id`, `user_id`, `parent_comment_id`, `comment_text`, `rating`, `is_approved`, `created_at`, `updated_at`, `deleted_at`) VALUES
(109, 56, 15, NULL, 'I have bad experiaces with this article.', NULL, 1, '2025-04-24 18:21:07', '2025-04-24 18:30:01', NULL),
(110, 56, 15, NULL, 'I have good experiance with this article.', NULL, 1, '2025-04-24 18:21:40', '2025-04-24 18:30:02', NULL),
(111, 56, 15, NULL, 'I recomand it.', NULL, 1, '2025-04-24 18:21:51', '2025-04-24 18:30:02', NULL),
(112, 56, 15, NULL, 'I do not recomad it.', NULL, 1, '2025-04-24 18:22:01', '2025-04-24 18:30:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(10) UNSIGNED NOT NULL,
  `department_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `department_id`, `name`, `description`, `deleted_at`) VALUES
(12, 1, 'Mobile Phones', 'fermentum vehicula, ante tellus ultricies...', NULL),
(13, 5, 'Laptops & Computers', 'nec quam consequat faucibus vel quis ipsum...', NULL),
(14, 8, 'Car Parts & Accessories', 'dignissim. Nullam faucibus AUTO pulvinar...', NULL),
(15, 8, 'Tires & Wheels', 'dignissim risus sit amet, viverra sapien...', NULL),
(16, 5, 'Fiction & Literature', 'Nullam faucibus pulvinar finibus...', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category_article`
--

CREATE TABLE `category_article` (
  `category_id` int(10) UNSIGNED NOT NULL,
  `article_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category_article`
--

INSERT INTO `category_article` (`category_id`, `article_id`) VALUES
(12, 56),
(12, 57),
(13, 57),
(14, 58),
(15, 59),
(16, 58),
(16, 60),
(16, 61);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `description` text DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `name`, `description`, `deleted_at`) VALUES
(1, 'Electronics', 'Electronic gadgets and devices', NULL),
(2, 'Clothing & Apparel', 'Fashion and accessories for men and women', NULL),
(3, 'Home & Kitchen', 'Appliances and kitchenware for home use', NULL),
(4, 'Sports & Outdoors', 'Gear for sports and outdoor activities', NULL),
(5, 'Books', 'Books, magazines, and reading materials', NULL),
(6, 'Toys & Games', 'Toys for children and gaming consoles', NULL),
(7, 'Health & Beauty', 'Healthcare products and beauty essentials', NULL),
(8, 'Automotive', 'Car accessories and tools for vehicles', NULL),
(9, 'Groceries', 'Daily essentials and groceries', NULL),
(10, 'Furniture', 'Furniture for home and office use', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','paid','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `status`, `total_amount`, `deleted_at`) VALUES
(1, 1, '2025-02-16 22:27:10', 'paid', 59.99, NULL),
(2, 2, '2025-02-16 22:27:10', 'paid', 120.50, NULL),
(3, 3, '2025-02-16 22:27:10', 'paid', 89.25, NULL),
(4, 4, '2025-02-16 22:27:10', 'processing', 45.00, NULL),
(5, 5, '2025-02-16 22:27:10', 'shipped', 200.00, NULL),
(6, 14, '2025-02-24 15:53:00', 'pending', 19.28, NULL),
(7, 14, '2025-02-24 17:21:42', 'shipped', 19.28, NULL),
(8, 14, '2025-02-24 17:29:00', 'paid', 38.56, NULL),
(9, 14, '2025-02-24 19:53:16', 'delivered', 23.00, NULL),
(10, 14, '2025-02-26 21:58:41', 'pending', 19.28, NULL),
(11, 14, '2025-02-26 22:14:39', 'shipped', 19.28, NULL),
(12, 14, '2025-02-26 22:24:09', 'shipped', 38.56, NULL),
(13, 14, '2025-02-28 20:57:47', 'shipped', 0.00, NULL),
(14, 14, '2025-02-28 21:07:27', 'shipped', 23.65, NULL),
(15, 14, '2025-02-28 21:11:18', 'pending', 23.65, NULL),
(16, 14, '2025-02-28 22:46:59', 'shipped', 29.00, NULL),
(17, 14, '2025-03-02 20:39:31', 'delivered', 37.32, NULL),
(18, 14, '2025-03-02 21:09:15', 'pending', 0.00, NULL),
(19, 14, '2025-03-02 21:10:46', 'shipped', 29.00, NULL),
(20, 14, '2025-03-02 22:03:06', 'shipped', 7.25, NULL),
(21, 14, '2025-03-02 22:20:24', 'paid', 12.44, NULL),
(22, 14, '2025-03-02 22:22:52', 'paid', 7.25, NULL),
(23, 14, '2025-03-03 14:12:53', 'shipped', 19.28, NULL),
(24, 14, '2025-03-03 14:31:40', 'paid', 12.44, NULL),
(25, 14, '2025-03-03 14:43:10', 'pending', 19.28, NULL),
(26, 14, '2025-03-03 14:45:39', 'pending', 79.75, NULL),
(27, 14, '2025-03-03 14:49:05', 'pending', 23.00, NULL),
(28, 14, '2025-03-03 14:53:14', 'pending', 79.75, NULL),
(29, 14, '2025-03-03 14:59:21', 'pending', 65.25, NULL),
(30, 14, '2025-03-03 15:02:07', 'paid', 29.00, NULL),
(31, 14, '2025-03-03 15:07:23', 'paid', 16.40, NULL),
(32, 14, '2025-03-03 15:10:55', 'paid', 32.80, NULL),
(33, 14, '2025-03-03 15:15:37', 'paid', 16.40, NULL),
(34, 14, '2025-03-03 21:53:49', 'paid', 114.80, NULL),
(35, 14, '2025-03-03 21:58:54', 'paid', 147.60, NULL),
(36, 14, '2025-03-03 22:14:15', 'paid', 207.00, NULL),
(37, 14, '2025-03-03 22:17:45', 'paid', 74.64, NULL),
(38, 14, '2025-03-04 19:07:37', 'pending', 96.40, NULL),
(39, 14, '2025-03-04 19:30:07', 'pending', 404.88, NULL),
(40, 14, '2025-03-04 19:51:41', 'paid', 38.56, NULL),
(41, 14, '2025-03-04 19:53:01', 'pending', 520.56, NULL),
(42, 14, '2025-03-04 19:56:33', 'paid', 732.64, NULL),
(43, 14, '2025-03-04 19:59:03', 'pending', 19.28, NULL),
(44, 14, '2025-03-04 20:10:42', 'paid', 32.80, NULL),
(45, 14, '2025-03-04 20:12:27', 'pending', 12.44, NULL),
(46, 14, '2025-03-04 20:24:27', 'pending', 0.00, NULL),
(47, 14, '2025-03-04 20:28:53', 'pending', 19.28, NULL),
(48, 14, '2025-03-04 20:31:48', 'pending', 19.28, NULL),
(49, 14, '2025-03-04 20:40:48', 'pending', 19.28, NULL),
(50, 14, '2025-03-04 20:49:22', 'pending', 19.28, NULL),
(51, 14, '2025-03-04 20:58:19', 'pending', 19.28, NULL),
(52, 14, '2025-03-04 21:12:49', 'pending', 19.28, NULL),
(53, 14, '2025-03-05 19:46:11', 'paid', 19.28, NULL),
(54, 14, '2025-03-05 19:50:52', 'pending', 16.40, NULL),
(55, 14, '2025-03-05 19:59:40', 'paid', 7.25, NULL),
(56, 14, '2025-03-05 20:12:23', 'paid', 19.28, NULL),
(57, 14, '2025-03-05 20:28:10', 'paid', 19.28, NULL),
(58, 14, '2025-03-05 20:39:37', 'pending', 23.00, NULL),
(59, 14, '2025-03-05 21:01:19', 'paid', 38.56, NULL),
(60, 14, '2025-03-05 21:06:37', 'pending', 23.65, NULL),
(61, 14, '2025-03-06 16:44:08', 'paid', 23.65, NULL),
(62, 14, '2025-03-06 16:59:23', 'pending', 31.72, NULL),
(63, 14, '2025-03-06 17:02:11', 'pending', 16.40, NULL),
(64, 14, '2025-03-06 17:03:11', 'paid', 12.44, NULL),
(65, 14, '2025-03-06 17:13:57', 'pending', 16.40, NULL),
(66, 15, '2025-03-06 17:27:11', 'pending', 12.44, NULL),
(67, 16, '2025-03-06 17:48:16', 'pending', 12.44, NULL),
(68, 14, '2025-03-06 19:58:43', 'paid', 12.44, NULL),
(69, 16, '2025-03-06 20:01:40', 'pending', 12.44, NULL),
(70, 15, '2025-03-06 20:08:56', 'pending', 16.40, NULL),
(71, 14, '2025-03-06 20:14:11', 'paid', 12.44, NULL),
(72, 15, '2025-03-06 20:18:21', 'pending', 12.44, NULL),
(73, 15, '2025-03-06 20:23:20', 'pending', 19.28, NULL),
(74, 15, '2025-03-07 11:12:26', 'pending', 19.28, NULL),
(75, 15, '2025-03-07 11:28:23', 'paid', 19.28, NULL),
(76, 15, '2025-03-07 19:37:43', 'paid', 96.40, NULL),
(77, 15, '2025-03-07 19:51:42', 'paid', 16.40, NULL),
(78, 15, '2025-03-07 20:02:06', 'paid', 16.40, NULL),
(79, 15, '2025-03-07 20:18:21', 'paid', 16.40, NULL),
(80, 15, '2025-03-07 21:24:33', 'paid', 7.25, NULL),
(81, 15, '2025-03-07 21:38:11', 'paid', 16.40, NULL),
(82, 15, '2025-03-08 19:08:00', 'paid', 16.40, NULL),
(83, 15, '2025-03-08 19:35:45', 'paid', 19.28, NULL),
(84, 15, '2025-03-08 21:51:29', 'paid', 12.44, NULL),
(85, 14, '2025-03-09 16:07:50', 'paid', 57.84, NULL),
(86, 15, '2025-03-10 23:02:54', 'pending', 12.44, NULL),
(87, 15, '2025-03-10 23:07:32', 'pending', 12.44, NULL),
(88, 14, '2025-03-11 14:41:29', 'paid', 19.28, NULL),
(89, 14, '2025-03-11 14:47:20', 'pending', 16.40, NULL),
(90, 14, '2025-03-11 14:50:46', 'pending', 19.28, NULL),
(91, 14, '2025-03-11 14:54:14', 'paid', 19.28, NULL),
(92, 14, '2025-03-11 15:22:11', 'paid', 16.40, NULL),
(93, 15, '2025-03-25 22:11:05', 'pending', 19.24, NULL),
(94, 15, '2025-03-25 22:11:40', 'pending', 19.24, NULL),
(95, 15, '2025-04-20 19:37:15', 'pending', 93.44, NULL),
(96, 14, '2025-04-20 20:39:55', 'pending', 27.00, NULL),
(97, 14, '2025-04-20 20:45:31', 'paid', 46.24, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `article_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `article_id`, `quantity`, `price`) VALUES
(1, 6, 56, 1, 19.28),
(2, 7, 56, 1, 19.28),
(3, 8, 56, 2, 19.28),
(4, 9, 58, 1, 23.00),
(5, 10, 56, 1, 19.28),
(6, 10, 57, 1, 0.00),
(7, 11, 56, 1, 19.28),
(8, 12, 56, 2, 19.28),
(9, 13, 57, 1, 0.00),
(10, 14, 60, 1, 16.40),
(11, 14, 61, 1, 7.25),
(12, 15, 60, 1, 16.40),
(13, 15, 61, 1, 7.25),
(14, 16, 61, 4, 7.25),
(15, 17, 59, 3, 12.44),
(16, 18, 57, 4, 0.00),
(17, 19, 61, 4, 7.25),
(18, 20, 61, 1, 7.25),
(19, 21, 59, 1, 12.44),
(20, 22, 61, 1, 7.25),
(21, 23, 56, 1, 19.28),
(22, 24, 59, 1, 12.44),
(23, 25, 56, 1, 19.28),
(24, 26, 61, 11, 7.25),
(25, 27, 58, 1, 23.00),
(26, 28, 61, 11, 7.25),
(27, 29, 61, 9, 7.25),
(28, 30, 61, 4, 7.25),
(29, 31, 60, 1, 16.40),
(30, 32, 60, 2, 16.40),
(31, 33, 60, 1, 16.40),
(32, 34, 60, 7, 16.40),
(33, 35, 60, 9, 16.40),
(34, 36, 58, 9, 23.00),
(35, 37, 59, 6, 12.44),
(36, 38, 56, 5, 19.28),
(37, 39, 56, 21, 19.28),
(38, 40, 56, 2, 19.28),
(39, 41, 56, 27, 19.28),
(40, 42, 56, 38, 19.28),
(41, 43, 56, 1, 19.28),
(42, 44, 60, 2, 16.40),
(43, 45, 59, 1, 12.44),
(44, 46, 57, 1, 0.00),
(45, 47, 56, 1, 19.28),
(46, 48, 56, 1, 19.28),
(47, 49, 56, 1, 19.28),
(48, 50, 56, 1, 19.28),
(49, 51, 56, 1, 19.28),
(50, 52, 56, 1, 19.28),
(51, 53, 56, 1, 19.28),
(52, 54, 60, 1, 16.40),
(53, 55, 61, 1, 7.25),
(54, 56, 56, 1, 19.28),
(55, 57, 56, 1, 19.28),
(56, 58, 58, 1, 23.00),
(57, 59, 56, 2, 19.28),
(58, 60, 60, 1, 16.40),
(59, 60, 61, 1, 7.25),
(60, 61, 60, 1, 16.40),
(61, 61, 61, 1, 7.25),
(62, 62, 56, 1, 19.28),
(63, 62, 59, 1, 12.44),
(64, 63, 60, 1, 16.40),
(65, 64, 59, 1, 12.44),
(66, 65, 60, 1, 16.40),
(67, 66, 59, 1, 12.44),
(68, 67, 59, 1, 12.44),
(69, 68, 59, 1, 12.44),
(70, 69, 59, 1, 12.44),
(71, 70, 60, 1, 16.40),
(72, 71, 59, 1, 12.44),
(73, 72, 59, 1, 12.44),
(74, 73, 56, 1, 19.28),
(75, 74, 56, 1, 19.28),
(76, 75, 56, 1, 19.28),
(77, 76, 56, 5, 19.28),
(78, 77, 60, 1, 16.40),
(79, 78, 60, 1, 16.40),
(80, 79, 60, 1, 16.40),
(81, 80, 61, 1, 7.25),
(82, 81, 60, 1, 16.40),
(83, 82, 60, 1, 16.40),
(84, 83, 56, 1, 19.28),
(85, 84, 59, 1, 12.44),
(86, 85, 56, 3, 19.28),
(87, 86, 59, 1, 12.44),
(88, 87, 59, 1, 12.44),
(89, 88, 56, 1, 19.28),
(90, 89, 60, 1, 16.40),
(91, 90, 56, 1, 19.28),
(92, 91, 56, 1, 19.28),
(93, 92, 60, 1, 16.40),
(94, 93, 56, 1, 19.24),
(95, 94, 56, 1, 19.24),
(96, 95, 57, 3, 27.00),
(97, 95, 59, 1, 12.44),
(99, 97, 56, 1, 19.24),
(100, 97, 57, 1, 27.00);

-- --------------------------------------------------------

--
-- Table structure for table `owner_company`
--

CREATE TABLE `owner_company` (
  `company_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `website` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owner_company`
--

INSERT INTO `owner_company` (`company_id`, `name`, `address`, `email`, `phone`, `website`, `created_at`, `updated_at`) VALUES
(1, 'E-Retail Inc.', '123 Commerce St, Online City, EC 45678', 'contact@e-retail.com', '+1234567890', 'https://www.e-retail.com', '2025-03-19 18:56:15', '2025-03-19 18:56:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `delivery_name` varchar(100) DEFAULT NULL,
  `delivery_street` varchar(255) DEFAULT NULL,
  `delivery_city` varchar(100) DEFAULT NULL,
  `delivery_state` varchar(100) DEFAULT NULL,
  `delivery_country` varchar(100) DEFAULT NULL,
  `delivery_zip_code` varchar(20) DEFAULT NULL,
  `billing_name` varchar(100) DEFAULT NULL,
  `billing_street` varchar(255) DEFAULT NULL,
  `billing_city` varchar(100) DEFAULT NULL,
  `billing_state` varchar(100) DEFAULT NULL,
  `billing_country` varchar(100) DEFAULT NULL,
  `billing_zip_code` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `stripe_customer_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`, `delivery_name`, `delivery_street`, `delivery_city`, `delivery_state`, `delivery_country`, `delivery_zip_code`, `billing_name`, `billing_street`, `billing_city`, `billing_state`, `billing_country`, `billing_zip_code`, `created_at`, `deleted_at`, `stripe_customer_id`) VALUES
(1, 'Alice Johnson', 'alice@example.com', 'hashed_password_1', 'customer', 'Alice Johnson', '123 Main St', 'New York', 'NY', 'USA', '10001', 'Alice Johnson', '123 Main St', 'New York', 'NY', 'USA', '10001', '2025-02-16 22:27:10', NULL, NULL),
(2, 'Bob Smith', 'bob@example.com', 'hashed_password_2', 'customer', 'Bob Smith', '456 Elm St', 'Los Angeles', 'CA', 'USA', '90001', 'Bob Smith', '456 Elm St', 'Los Angeles', 'CA', 'USA', '90001', '2025-02-16 22:27:10', NULL, NULL),
(3, 'Charlie Brown', 'charlie@example.com', 'hashed_password_3', 'customer', 'Charlie Brown', '789 Pine St', 'Chicago', 'IL', 'USA', '60601', 'Charlie Brown', '789 Pine St', 'Chicago', 'IL', 'USA', '60601', '2025-02-16 22:27:10', NULL, NULL),
(4, 'Diana Prince', 'diana@example.com', 'hashed_password_4', 'admin', 'Diana Prince', '321 Oak St', 'Miami', 'FL', 'USA', '33101', 'Diana Prince', '321 Oak St', 'Miami', 'FL', 'USA', '33101', '2025-02-16 22:27:10', NULL, NULL),
(5, 'Edward Wilson', 'edward@example.com', 'hashed_password_5', 'customer', 'Edward Wilson', '555 Cedar St', 'Seattle', 'WA', 'USA', '98101', 'Edward Wilson', '555 Cedar St', 'Seattle', 'WA', 'USA', '98101', '2025-02-16 22:27:10', NULL, NULL),
(6, 'Iona Ionis', 'fiona@example.com', 'hashed_password_6', 'customer', 'Iona Ionis', '777 Birch St', 'Austin', 'TX', 'USA', '73301', 'Fiona Davis', '777 Birch St', 'Austin', 'TX', 'USA', '73301', '2025-02-16 22:27:10', NULL, NULL),
(7, 'George Harris', 'george@example.com', 'hashed_password_7', 'admin', 'George Harris', '888 Maple St', 'Denver', 'CO', 'USA', '80201', 'George Harris', '888 Maple St', 'Denver', 'CO', 'USA', '80201', '2025-02-16 22:27:10', NULL, NULL),
(8, 'Hannah Lee', 'hannah@example.com', 'hashed_password_8', 'customer', 'Hannah Lee', '999 Walnut St', 'Boston', 'MA', 'USA', '02108', 'Hannah Lee', '999 Walnut St', 'Boston', 'MA', 'USA', '02108', '2025-02-16 22:27:10', NULL, NULL),
(9, 'Isaac Turner', 'isaac@example.com', 'hashed_password_9', 'customer', 'Isaac Turner', '222 Spruce St', 'San Francisco', 'CA', 'USA', '94101', 'Isaac Turner', '222 Spruce St', 'San Francisco', 'CA', 'USA', '94101', '2025-02-16 22:27:10', NULL, NULL),
(10, 'Julia Roberts', 'julia@example.com', 'hashed_password_10', 'customer', 'Julia Roberts', '333 Willow St', 'Houston', 'TX', 'USA', '77001', 'Julia Roberts', '333 Willow St', 'Houston', 'TX', 'USA', '77001', '2025-02-16 22:27:10', NULL, NULL),
(11, 'a', 'feb@feb.com', '$2a$10$TtxCUZqlbrxpWw1hY2bykefmUGV2/3YEM7IreY1f2aD5iGvi2aKR6', 'admin', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', '2025-02-16 23:20:59', NULL, NULL),
(12, 'ca', 'ca@ca.com', '$2a$10$Kev4aVNpZnnpAvQYQ44SBeqnyrLcz.SIhOUXCu6T1Gqq6EBWZdQRO', 'customer', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', '2025-02-17 18:45:16', NULL, NULL),
(13, 'e', 'ee@ee.com', '$2a$10$.s6tbCCli4LNnGcLHr2UD.JUO2H1jyvienkol38Df6Q4NWK7ztoLC', 'customer', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', '2025-02-18 17:22:37', NULL, NULL),
(14, 'Fiona Davis', 'fiona@fiona.com', '$2a$10$yGiwUDBm5dZPJ/X9Q67iCuviC.JpfjvPm/N/d.Z1CVW8AlpR/pR0u', 'customer', 'Fiona Davis', '777 Birch St', 'Austin', 'TX', 'USA', '73301', 'Fiona Davis', '777 Birch St', 'Austin', 'TX', 'USA', '12345', '2025-02-18 17:49:00', NULL, 'cus_RtBRsLnGSFI7Jt'),
(15, 'Will Smith', 'will@will.com', '$2a$10$bcBMpZw2YOU50Y/4NioBw.mWGVbw.UrXZVQcsFGB/K5aglrKSp4IC', 'customer', 'Will Smith', '123 Main St', 'New York', 'NY', 'USA', '10001', 'Will Smith', '123 Main Str.', 'New York', 'NY', 'USA', '10001', '2025-03-06 17:26:08', NULL, 'cus_RtVFA1K57zOj8F'),
(16, 'Rob Robines', 'rob@rob.com', '$2a$10$6pwDOtk5aNFMJ2z2.mlL8.hveW4TtvkSaZREuScevuqPeBtk720sK', 'customer', 'Rob Robines', '456 Str.', 'New York', 'NY', 'USA', '10001', 'Rob Robines', '456 Str.', 'New York', 'NY', 'USA', '10001', '2025-03-06 17:47:27', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`article_id`);

--
-- Indexes for table `article_comments`
--
ALTER TABLE `article_comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `parent_comment_id` (`parent_comment_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `category_article`
--
ALTER TABLE `category_article`
  ADD PRIMARY KEY (`category_id`,`article_id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_orders_user` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `fk_order_items_order` (`order_id`),
  ADD KEY `fk_order_items_article` (`article_id`);

--
-- Indexes for table `owner_company`
--
ALTER TABLE `owner_company`
  ADD PRIMARY KEY (`company_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `article_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `article_comments`
--
ALTER TABLE `article_comments`
  MODIFY `comment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `owner_company`
--
ALTER TABLE `owner_company`
  MODIFY `company_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `article_comments`
--
ALTER TABLE `article_comments`
  ADD CONSTRAINT `fk_comment_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comment_parent` FOREIGN KEY (`parent_comment_id`) REFERENCES `article_comments` (`comment_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE CASCADE;

--
-- Constraints for table `category_article`
--
ALTER TABLE `category_article`
  ADD CONSTRAINT `category_article_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `category_article_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;