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
COMMIT;
