-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 10 juin 2024 à 09:40
-- Version du serveur : 8.0.31
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ticket_angular`
--

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `message_text` text COLLATE utf8mb4_general_ci NOT NULL,
  `message_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message_created_by_id` int NOT NULL,
  `message_ticket_id` int NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `ticket_ibfk_2` (`message_ticket_id`),
  KEY `utilisateur_ibfk_2` (`message_created_by_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'Etudiant'),
(2, 'Administrateur'),
(3, 'Intervenant');

-- --------------------------------------------------------

--
-- Structure de la table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `ticket_title` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ticket_date_created` date NOT NULL,
  `ticket_date_closed` date NOT NULL,
  `ticket_status` int NOT NULL,
  `ticket_created_by_id` int NOT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `utilisateur_idfk_1` (`ticket_created_by_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `utilisateur_id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `utilisateur_password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `utilisateur_firstname` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `utilisateur_lastname` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `utilisateur_role_id` int NOT NULL,
  PRIMARY KEY (`utilisateur_id`),
  KEY `utilisateur_ibfk_1` (`utilisateur_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`utilisateur_id`, `utilisateur_email`, `utilisateur_password`, `utilisateur_firstname`, `utilisateur_lastname`, `utilisateur_role_id`) VALUES
(1, 'admin@mns.fr', '$2y$10$8KYh.GR2hQfH5YYXhtQUUeFPKP50aMvJq4xR.Qu/IPtbuQomJijtS', 'Jahn', 'Doe', 2),
(2, 'demo1@mns.fr', '$2y$10$uznaYJC7M6CUMoXfrJqsvuLD28b9Fvc8iRN3L8DiFtI0nKQFSsNDq', 'Tom', 'Hanks', 1),
(3, 'demo2@mns.fr', '$2y$10$WUfUf7KdT.BF9QCpc9g8u.G/mOrE8w6zLwvWxfvu1jDba2rCMl27.', 'Jim', 'Carry', 3);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`message_ticket_id`) REFERENCES `ticket` (`ticket_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `utilisateur_ibfk_2` FOREIGN KEY (`message_created_by_id`) REFERENCES `utilisateur` (`utilisateur_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `utilisateur_idfk_1` FOREIGN KEY (`ticket_created_by_id`) REFERENCES `utilisateur` (`utilisateur_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`utilisateur_role_id`) REFERENCES `role` (`role_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
