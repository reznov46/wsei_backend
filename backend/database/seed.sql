SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

CREATE DATABASE cerber;
CREATE DATABASE athena;

USE cerber;

START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(60) NOT NULL,
  `level` varchar(16) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `username`, `password`, `level`, `created_at`, `updated_at`) VALUES
('13ccb720-d6c8-11ed-b3ec-47ad62198f81', 'user', '$2a$10$pVjfg4NDmRp2s1UWCOQ/9OjokrWJyA3bsB7eAo1scTdO8zJjUAAVC', 'user', '2023-04-09 11:17:13', '2023-04-09 11:17:13'),
('3813f800-d6b9-11ed-b59f-d3e88e0f455e', 'admin', '$2a$10$Sxw8YBH5DlALqjHMEdf3DOMuT/2LER562VN.mFpX/Cc9D3n6BcZOe', 'admin', '2023-04-09 09:30:51', '2023-04-09 09:30:51');

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`username`),
  ADD UNIQUE KEY `users_username` (`username`);

use athena;

--
-- Table structure for table `productsCategories`
--
CREATE TABLE `productCategories` (
  `id` varchar(36) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `created_by` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productCategories`
--
INSERT INTO `productCategories` (`id`, `name`, `description`, `created_by`, `created_at`, `is_deleted`) VALUES
('080809c8-c9c7-474b-83af-d62ed17b268b', 'Technology', 'Every kind of AGD products', '3813f800-d6b9-11ed-b59f-d3e88e0f455e', '2023-07-09 15:22:45', 1),
('80161f12-b600-493f-aeeb-66ac6bf955a1', 'Toys', 'Heaven for every children', '3813f800-d6b9-11ed-b59f-d3e88e0f455e', '2023-07-09 15:39:42', 0),
('80161f12-b600-493f-aeeb-66ac6bf955a2', 'Art', 'If you like painting it is something for you', '3813f800-d6b9-11ed-b59f-d3e88e0f455e', '2023-07-09 15:39:42', 0),
('80161f12-b600-493f-aeeb-66ac6bf955a3', 'Vegetables', 'If you want to be healthy', '3813f800-d6b9-11ed-b59f-d3e88e0f455e', '2023-07-09 15:39:42', 0),
('80161f12-b600-493f-aeeb-66ac6bf955a4', 'Alcohol', 'This category does not need any description', '3813f800-d6b9-11ed-b59f-d3e88e0f455e', '2023-07-09 15:39:42', 0);

--
-- Indexes for table `productCategories`
--
ALTER TABLE `productCategories`
  ADD PRIMARY KEY (`id`);

--
-- Table structure for table `products`
--
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `full_description` varchar(10000) DEFAULT NULL,
  `price` decimal(18,2) DEFAULT NULL,
  `product_category_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(36) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `full_description`, `price`, `product_category_id`, `created_at`, `created_by`, `is_deleted`) VALUES
('5b27e865-3ddc-4f04-b6ef-8d0f4276a41e', 'Nowy item', 'testowe description', 'optional long description', 60.00, '19866e87-83d4-4572-8a71-2c2e23d0b51f', '2023-07-09 17:41:58', '3813f800-d6b9-11ed-b59f-d3e88e0f455e', 0),
('87959f54-a613-4282-b2d5-db20933001ff', 'Produkt usera', 'optional description', 'optional long description', 420.00, '80161f12-b600-493f-aeeb-66ac6bf955a3', '2023-07-01 00:14:49', '13ccb720-d6c8-11ed-b3ec-47ad62198f81', 0),
('8ca35147-9093-4e8b-9970-a9f0ab585eb1', 'asdasdProdukt test use11231231r', 'opasdasdational description', 'optional long description', 120.00, '80161f12-b600-493f-aeeb-66ac6bf955a3', '2023-07-09 17:40:47', '3813f800-d6b9-11ed-b59f-d3e88e0f455e', 0),
('ad2b8aa5-49b6-4532-95b2-39fd81bd75e4', 'Product admina', 'optional description', 'optional long description', 69.00, '80161f12-b600-493f-aeeb-66ac6bf955a3', '2023-07-01 00:09:56', '3813f800-d6b9-11ed-b59f-d3e88e0f455e', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);




COMMIT;
