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


CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `full_description` varchar(10000) DEFAULT NULL,
  `price` decimal(18,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(36) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(36) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `products` (`id`, `name`, `description`, `full_description`, `price`, `created_at`, `created_by`, `updated_at`, `updated_by`, `is_deleted`) VALUES
('87959f54-a613-4282-b2d5-db20933001ff', 'Produkt usera', 'optional description', 'optional long description', 420.00, '2023-07-01 00:14:49', '13ccb720-d6c8-11ed-b3ec-47ad62198f81', NULL, NULL, 0),
('ad2b8aa5-49b6-4532-95b2-39fd81bd75e4', 'Product admina', 'optional description', 'optional long description', 69.00, '2023-07-01 00:09:56', '3813f800-d6b9-11ed-b59f-d3e88e0f455e', NULL, NULL, 0);


ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

COMMIT;
