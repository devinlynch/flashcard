CREATE TABLE `flashcard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` tinytext NOT NULL,
  `value` mediumtext NOT NULL,
  `type` tinytext NOT NULL,
  `user` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);