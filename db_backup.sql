-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: clone_db
-- ------------------------------------------------------
-- Server version	5.7.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bet_log`
--

DROP TABLE IF EXISTS `bet_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bet_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bet_log_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '暱稱',
  `game_id` int(11) NOT NULL COMMENT '遊戲類型',
  `openid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'openid',
  `uid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `is_trial` tinyint(1) NOT NULL DEFAULT '0',
  `bet_amount` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valid_bet_amount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `win_loss_amount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `payout_amount` decimal(18,2) DEFAULT '0.00',
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CYN',
  `odds` decimal(8,3) NOT NULL DEFAULT '0.000',
  `odds_type` int(11) DEFAULT '0' COMMENT '未指定 0, 歐美盤 1, 香港盤 2, 馬來盤 3',
  `balance` decimal(18,2) NOT NULL,
  `before_amount` decimal(18,2) NOT NULL DEFAULT '0.00',
  `play_type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `member_bonus` decimal(8,3) DEFAULT NULL COMMENT '賠率',
  `agent_bonus` decimal(8,3) DEFAULT NULL COMMENT '代理賠率',
  `message_id` int(11) DEFAULT NULL,
  `table_no` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `game_no` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `game_no_round` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `result` text COLLATE utf8mb4_unicode_ci,
  `note` longtext COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level_1_id` int(11) DEFAULT NULL,
  `level_2_id` int(11) DEFAULT NULL,
  `level_3_id` int(11) DEFAULT NULL,
  `parent_openid` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `bet_at` datetime DEFAULT NULL,
  `settled_at` timestamp NULL DEFAULT NULL,
  `agent_lv1_share` double(8,2) DEFAULT NULL,
  `agent_lv1_total` double(8,2) DEFAULT NULL,
  `agent_lv1_result` double(8,2) DEFAULT NULL,
  `agent_lv1_return_bonus` double(8,2) DEFAULT NULL,
  `agent_lv1_water_result` double(8,2) DEFAULT NULL,
  `agent_lv1_total_with_return_water` double(8,2) DEFAULT NULL,
  `agent_lv2_share` double(8,2) DEFAULT NULL,
  `agent_lv2_total` double(8,2) DEFAULT NULL,
  `agent_lv2_result` double(8,2) DEFAULT NULL,
  `agent_lv2_return_bonus` double(8,2) DEFAULT NULL,
  `agent_lv2_water_result` double(8,2) DEFAULT NULL,
  `agent_lv2_total_with_return_water` double(8,2) DEFAULT NULL,
  `agent_lv3_share` double(8,2) DEFAULT NULL,
  `agent_lv3_total` double(8,2) DEFAULT NULL,
  `agent_lv3_result` double(8,2) DEFAULT NULL,
  `agent_lv3_return_bonus` double(8,2) DEFAULT NULL,
  `agent_lv3_water_result` double(8,2) DEFAULT NULL,
  `agent_lv3_total_with_return_water` double(8,2) DEFAULT NULL,
  `member_total` double(8,2) DEFAULT NULL,
  `member_return_bonus` double(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bet_log_level_1_id_index` (`level_1_id`),
  KEY `bet_log_level_2_id_index` (`level_2_id`),
  KEY `bet_log_level_3_id_index` (`level_3_id`),
  KEY `bet_log_parent_openid_index` (`parent_openid`),
  KEY `amount_filter_index` (`openid`,`created_at`,`game_id`,`is_trial`,`status`,`deleted_at`),
  KEY `bet_rec_index` (`bet_log_id`,`game_id`,`deleted_at`),
  KEY `amount_check_index` (`game_id`,`settled_at`,`is_trial`,`status`,`created_at`,`deleted_at`),
  KEY `check_bet_index` (`settled_at`,`status`,`game_id`,`table_no`,`game_no`,`game_no_round`,`deleted_at`),
  KEY `check_same_round_bet` (`openid`,`table_no`,`game_no`,`game_no_round`,`status`),
  KEY `unsettle_bet` (`game_id`,`settled_at`,`is_trial`,`status`,`created_at`),
  KEY `find_same_round_bet` (`openid`,`game_id`,`table_no`,`game_no`,`game_no_round`,`is_trial`,`status`),
  KEY `find_unsettle_by_round` (`game_id`,`table_no`,`game_no`,`game_no_round`,`status`,`settled_at`),
  KEY `by_bet_log_id_game_id` (`bet_log_id`,`game_id`),
  KEY `by_message_id_game_id` (`message_id`,`game_id`),
  KEY `reset_game_index` (`game_id`,`game_no`,`game_no_round`)
) ENGINE=InnoDB AUTO_INCREMENT=10272 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bet_log`
--

LOCK TABLES `bet_log` WRITE;
/*!40000 ALTER TABLE `bet_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `bet_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cash_flow`
--

DROP TABLE IF EXISTS `cash_flow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cash_flow` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_id` int(11) DEFAULT NULL,
  `amount` decimal(18,2) NOT NULL,
  `before_amount` decimal(18,2) NOT NULL,
  `after_amount` decimal(18,2) NOT NULL,
  `remark` text COLLATE utf8mb4_unicode_ci,
  `memo` text COLLATE utf8mb4_unicode_ci,
  `operator` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abnormal_mark` text COLLATE utf8mb4_unicode_ci,
  `level_1_id` int(11) DEFAULT NULL,
  `level_2_id` int(11) DEFAULT NULL,
  `level_3_id` int(11) DEFAULT NULL,
  `parent_openid` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cash_flow_level_1_id_index` (`level_1_id`),
  KEY `cash_flow_level_2_id_index` (`level_2_id`),
  KEY `cash_flow_level_3_id_index` (`level_3_id`),
  KEY `cash_flow_parent_openid_index` (`parent_openid`),
  KEY `cash_flow_openid_created_at_index` (`openid`,`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=23156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash_flow`
--

LOCK TABLES `cash_flow` WRITE;
/*!40000 ALTER TABLE `cash_flow` DISABLE KEYS */;
/*!40000 ALTER TABLE `cash_flow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `check_rule11_rslt`
--

DROP TABLE IF EXISTS `check_rule11_rslt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `check_rule11_rslt` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hy_money` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sum_cash_amnt` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nick_name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126728 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `check_rule11_rslt`
--

LOCK TABLES `check_rule11_rslt` WRITE;
/*!40000 ALTER TABLE `check_rule11_rslt` DISABLE KEYS */;
/*!40000 ALTER TABLE `check_rule11_rslt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `check_rule12_rslt`
--

DROP TABLE IF EXISTS `check_rule12_rslt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `check_rule12_rslt` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hy_return_money` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sum_bonus_amnt` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nick_name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60794 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `check_rule12_rslt`
--

LOCK TABLES `check_rule12_rslt` WRITE;
/*!40000 ALTER TABLE `check_rule12_rslt` DISABLE KEYS */;
/*!40000 ALTER TABLE `check_rule12_rslt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `check_rule2_rslt`
--

DROP TABLE IF EXISTS `check_rule2_rslt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `check_rule2_rslt` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `bet_log_id` int(10) NOT NULL,
  `uid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bet_amount` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cash_flow_amount` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nick_name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `check_rule2_rslt`
--

LOCK TABLES `check_rule2_rslt` WRITE;
/*!40000 ALTER TABLE `check_rule2_rslt` DISABLE KEYS */;
/*!40000 ALTER TABLE `check_rule2_rslt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `check_rule3_rslt`
--

DROP TABLE IF EXISTS `check_rule3_rslt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `check_rule3_rslt` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `bet_log_id` int(10) NOT NULL,
  `uid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bet_amount` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cash_flow_amount` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nick_name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93797 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `check_rule3_rslt`
--

LOCK TABLES `check_rule3_rslt` WRITE;
/*!40000 ALTER TABLE `check_rule3_rslt` DISABLE KEYS */;
/*!40000 ALTER TABLE `check_rule3_rslt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hy`
--

DROP TABLE IF EXISTS `hy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` char(36) NOT NULL,
  `openid` varchar(64) CHARACTER SET utf8 NOT NULL,
  `account` varchar(32) DEFAULT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `remember_token` varchar(128) DEFAULT NULL,
  `lixin_username` varchar(128) DEFAULT NULL,
  `nickname` varchar(128) NOT NULL,
  `headimgurl` text CHARACTER SET utf8 NOT NULL,
  `sex` varchar(1) CHARACTER SET utf8 DEFAULT NULL,
  `country` varchar(128) DEFAULT NULL,
  `province` varchar(128) DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `regtime` datetime NOT NULL,
  `money` decimal(18,2) NOT NULL DEFAULT '0.00',
  `tg_money` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '推广所得总额',
  `tg_money_balance` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '佣金剩余（尚未转到余额的佣金）',
  `return_money` decimal(18,2) DEFAULT '0.00' COMMENT '返水總金額',
  `return_money_balance` decimal(18,2) DEFAULT '0.00' COMMENT '返水剩餘金額',
  `sklx` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `skzh` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `khh` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `skr` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT 'y',
  `parent_openid` varchar(64) CHARACTER SET utf8 DEFAULT NULL COMMENT '父级openid',
  `channel` varchar(50) DEFAULT '1000' COMMENT '渠道',
  `updatetime` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '最后金额变动时间',
  `relationship` varchar(128) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `auth_type` varchar(32) DEFAULT NULL,
  `login_at` datetime DEFAULT NULL,
  `note` text,
  `return_water` text,
  `bank_info_list` text,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hy_uid_index` (`uid`),
  KEY `hy_openid_index` (`openid`),
  KEY `hy_relationship_index` (`relationship`)
) ENGINE=InnoDB AUTO_INCREMENT=4199 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hy`
--

LOCK TABLES `hy` WRITE;
/*!40000 ALTER TABLE `hy` DISABLE KEYS */;
/*!40000 ALTER TABLE `hy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_bonus`
--

DROP TABLE IF EXISTS `member_bonus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_bonus` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(64) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `uid` char(36) DEFAULT NULL,
  `game_id` int(11) NOT NULL,
  `transaction_id` varchar(64) NOT NULL,
  `jc_id` int(11) NOT NULL,
  `jymx_id` int(11) NOT NULL,
  `bonus` int(2) DEFAULT '0',
  `money` decimal(18,2) DEFAULT NULL,
  `return_bonus` decimal(18,2) DEFAULT NULL,
  `content` varchar(64) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jc_id` (`jc_id`),
  KEY `openid` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=11892 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_bonus`
--

LOCK TABLES `member_bonus` WRITE;
/*!40000 ALTER TABLE `member_bonus` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_bonus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pwd` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'huskar357@outlook.com','hero'),(4,'abc@gmail.com','123456');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_request`
--

DROP TABLE IF EXISTS `wallet_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wallet_request` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `game_id` int(11) NOT NULL,
  `order_id` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '第三方注單ID',
  `bet_log_id` int(11) DEFAULT NULL,
  `donate_log_id` int(11) DEFAULT NULL,
  `third_party_bet_log_id` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `openid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `before_amount` decimal(18,2) NOT NULL COMMENT '加扣款前餘額',
  `after_amount` decimal(18,2) NOT NULL COMMENT '加扣款後餘額',
  `amount` decimal(18,2) NOT NULL COMMENT '加扣款金額',
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requested_at` timestamp NULL DEFAULT NULL COMMENT '第三方請求時間',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wallet_request_order_id_unique` (`order_id`),
  KEY `wallet_request_game_id_bet_log_id_openid_created_at_index` (`game_id`,`order_id`,`openid`,`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=839 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_request`
--

LOCK TABLES `wallet_request` WRITE;
/*!40000 ALTER TABLE `wallet_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `wallet_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-22  0:26:44
