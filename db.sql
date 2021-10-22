SET NAMES utf8;

DROP DATABASE IF EXISTS Groupmania_db;

CREATE DATABASE Groupmania_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


GRANT ALL
ON Groupmania_db.*
TO 'nicolap7';

USE Groupmania_db;

CREATE TABLE User (
	userID SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	email VARCHAR(60) NOT NULL UNIQUE,
	firstName VARCHAR(30) NOT NULL,
	lastName VARCHAR(30) NOT NULL,
	pseudo VARCHAR(30),
	password VARCHAR(100) NOT NULL UNIQUE,
	bio VARCHAR(256),
	avatarUrl VARCHAR(150) NOT NULL DEFAULT 'http://localhost:3000/images/avatarDefault.jpg',
	dateCreation DATETIME NOT NULL,
	PRIMARY KEY (userID)
)
ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Post (
	postID MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
	userID SMALLINT UNSIGNED,
	legend VARCHAR(180),
	gifUrl VARCHAR(150),
	postIDComment MEDIUMINT UNSIGNED,
	body TEXT,
	dateCreation DATETIME NOT NULL,
	PRIMARY KEY (postID)
)
ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Reaction (
	userID SMALLINT UNSIGNED NOT NULL,
	postID MEDIUMINT UNSIGNED NOT NULL,
	reaction TINYINT,
	dateCreation DATETIME NOT NULL,
	PRIMARY KEY (userID, postID)
)
ENGINE=INNODB;

ALTER TABLE Post
ADD CONSTRAINT fk_post_userID FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE SET NULL,
ADD CONSTRAINT fk_commentID FOREIGN KEY (postIDComment) REFERENCES Post(postID) ON DELETE CASCADE;

ALTER TABLE Reaction
ADD CONSTRAINT fk_reaction_userID FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE,
ADD CONSTRAINT fk_postID FOREIGN KEY (postID) REFERENCES Post(postID) ON DELETE CASCADE;



//
CREATE TABLE `Post` (
  `postID` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `userID` smallint(5) unsigned DEFAULT NULL,
  `legend` varchar(180) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gifUrl` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postIDComment` mediumint(8) unsigned DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci,
  `dateCreation` datetime NOT NULL,
  PRIMARY KEY (`postID`),
  KEY `fk_post_userID` (`userID`),
  KEY `fk_commentID` (`postIDComment`),
  CONSTRAINT `fk_commentID` FOREIGN KEY (`postIDComment`) REFERENCES `Post` (`postID`) ON DELETE CASCADE,
  CONSTRAINT `fk_post_userID` FOREIGN KEY (`userID`) REFERENCES `User` (`userID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Reaction` (
  `userID` smallint(5) unsigned NOT NULL,
  `postID` mediumint(8) unsigned NOT NULL,
  `reaction` tinyint(4) DEFAULT NULL,
  `dateCreation` datetime NOT NULL,
  PRIMARY KEY (`userID`,`postID`),
  KEY `fk_postID` (`postID`),
  CONSTRAINT `fk_postID` FOREIGN KEY (`postID`) REFERENCES `Post` (`postID`) ON DELETE CASCADE,
  CONSTRAINT `fk_reaction_userID` FOREIGN KEY (`userID`) REFERENCES `User` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `User` (
  `userID` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pseudo` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatarUrl` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://localhost:3000/images/avatarDefault.jpg',
  `dateCreation` datetime NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;