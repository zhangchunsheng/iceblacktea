/*
SQLyog Community v10.12 
MySQL - 5.5.24 : Database - seaking
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`seaking` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `seaking`;

/*Table structure for table `seaking_character` */

DROP TABLE IF EXISTS `seaking_character`;

CREATE TABLE `seaking_character` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uc_userId` varchar(60) NOT NULL DEFAULT '' COMMENT 'uc_userId',
  `mongoDbId` varchar(60) NOT NULL DEFAULT '' COMMENT 'mongoDbId',
  `registerType` varchar(60) NOT NULL DEFAULT '' COMMENT 'registerType',
  `loginName` varchar(60) NOT NULL DEFAULT '' COMMENT 'loginName',
  `characterId` int(10) NOT NULL DEFAULT '0' COMMENT 'redis中生成characterId',
  `cId` int(10) NOT NULL DEFAULT '0' COMMENT '選擇角色Id',
  `nickname` varchar(60) NOT NULL DEFAULT '' COMMENT '角色名称',
  `currentCity` int(10) NOT NULL DEFAULT '0' COMMENT '當前所在城市Id',
  `positionX` decimal(10,6) NOT NULL DEFAULT '0.000000' COMMENT '角色所在x軸坐標',
  `positionY` decimal(10,6) NOT NULL DEFAULT '0.000000' COMMENT '角色所在y軸坐標',
  `experience` int(10) NOT NULL DEFAULT '0' COMMENT '已获取的经验值',
  `pirateBoats` text COMMENT '角色擁有船隻信息',
  `equipments` text COMMENT '裝備',
  `package` text COMMENT '包裹',
  `skills` text COMMENT '技能',
  `formation` text COMMENT '陣型',
  `DATE` int(10) NOT NULL DEFAULT '0' COMMENT '日期',
  `bz` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 - 可用 2 - 不可用',
  `updateBz` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 - 新增 2 - 已更新到mysql',
  `baseAttribute` text COMMENT '基礎屬性',
  `money` int(10) NOT NULL DEFAULT '0' COMMENT '金幣',
  `buff` text COMMENT '增益效果',
  `induInfo` text NOT NULL COMMENT '用户副本数据',
  PRIMARY KEY (`id`),
  KEY `index_uc_userId` (`uc_userId`),
  KEY `index_mongoDbId` (`mongoDbId`),
  KEY `index_bz` (`bz`),
  KEY `index_updateBz` (`updateBz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色信息表';

/*Data for the table `seaking_character` */

/*Table structure for table `seaking_character_indu` */

DROP TABLE IF EXISTS `seaking_character_indu`;

CREATE TABLE `seaking_character_indu` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `cId` int(10) NOT NULL DEFAULT '0' COMMENT '角色Id',
  `induId` varchar(60) NOT NULL DEFAULT '' COMMENT '副本Id',
  `data` text NOT NULL COMMENT '敌船数据和宝箱数据{"enemy":[{"indexId":0,"bId":0,"x":0,"y":0,"disable":false,"type":"fence","fence":{"x":0,"y":0,"disable":false,"treasure":{"x":0,"y":0,"disable":false,"isOpened":0,"isCollected":0,"items":[]}}}]}',
  `DATE` int(10) NOT NULL DEFAULT '0' COMMENT '日期',
  `enterDate` int(10) NOT NULL DEFAULT '0' COMMENT '初次进入副本日期',
  `finishDate` int(10) NOT NULL DEFAULT '0' COMMENT '完成副本日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='玩家副本表';

/*Data for the table `seaking_character_indu` */

/*Table structure for table `seaking_indu_enemy` */

DROP TABLE IF EXISTS `seaking_indu_enemy`;

CREATE TABLE `seaking_indu_enemy` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `induId` int(10) NOT NULL DEFAULT '0' COMMENT '副本Id',
  `indexId` int(10) NOT NULL DEFAULT '0' COMMENT '副本位置Id',
  `formation` text NOT NULL COMMENT '敌船阵型数据{"formation":[{"cId":0},{"cId":0},{"cId":0}]}',
  `DATE` int(10) NOT NULL DEFAULT '0' COMMENT '日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='副本敌船数据';

/*Data for the table `seaking_indu_enemy` */

/*Table structure for table `seaking_instancedungeon` */

DROP TABLE IF EXISTS `seaking_instancedungeon`;

CREATE TABLE `seaking_instancedungeon` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `cityId` int(10) NOT NULL DEFAULT '0' COMMENT '城市Id',
  `maxIndex` tinyint(4) NOT NULL DEFAULT '0' COMMENT '副本位置Id',
  `enemyData` text NOT NULL COMMENT '敌船数据和宝箱数据[{"indexId":0,"bId":0,"x":0,"y":0,"disable":false,"type":"fence","fence":{"x":0,"y":0,"disable":false,"treasure":{"x":0,"y":0,"disable":false,"isOpened":0,"isCollected":0,"items":[]}}}]',
  `DATE` int(10) NOT NULL DEFAULT '0' COMMENT '日期',
  `bz` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 - 可用 2 - 不可用',
  `induId` varchar(60) NOT NULL DEFAULT '' COMMENT '副本Id',
  PRIMARY KEY (`id`),
  KEY `index_bz` (`bz`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='副本表';

/*Data for the table `seaking_instancedungeon` */

insert  into `seaking_instancedungeon`(`id`,`cityId`,`maxIndex`,`enemyData`,`DATE`,`bz`,`induId`) values (1,0,9,'{\"enemy\":[{\"indexId\":0,\"bId\":300,\"x\":1283,\"y\":582,\"disable\":false,\"type\":\"boat\"},{\"indexId\":1,\"bId\":300,\"x\":1604,\"y\":705,\"disable\":false,\"type\":\"boat\"},{\"indexId\":2,\"bId\":300,\"x\":1742,\"y\":1470,\"disable\":true,\"type\":\"boat\"},{\"indexId\":3,\"bId\":300,\"x\":976,\"y\":1260,\"disable\":false,\"type\":\"boat\"},{\"indexId\":4,\"bId\":300,\"x\":2233,\"y\":1097,\"disable\":true,\"type\":\"boat\"},{\"indexId\":5,\"bId\":300,\"x\":1485,\"y\":1300,\"disable\":true,\"type\":\"boat\"},{\"indexId\":6,\"bId\":300,\"x\":1776,\"y\":936,\"disable\":false,\"type\":\"boat\"},{\"indexId\":7,\"bId\":0,\"x\":0,\"y\":0,\"disable\":false,\"type\":\"fence\",\"fence\":{\"x\":3600,\"y\":1284,\"disable\":false,\"treasure\":{\"x\":3761,\"y\":1090,\"disable\":false,\"isOpened\":0,\"isCollected\":0,\"items\":[]}}},{\"indexId\":8,\"bId\":0,\"x\":0,\"y\":0,\"disable\":false,\"type\":\"fence\",\"fence\":{\"x\":1123,\"y\":2303,\"disable\":false,\"treasure\":{\"x\":1036,\"y\":2337,\"disable\":false,\"isOpened\":0,\"isCollected\":0,\"items\":[]}}}]}',1367659041,1,'10101');

/*Table structure for table `seaking_items` */

DROP TABLE IF EXISTS `seaking_items`;

CREATE TABLE `seaking_items` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `itemId` varchar(60) NOT NULL DEFAULT '' COMMENT 'itemId',
  `NAME` varchar(60) NOT NULL DEFAULT '' COMMENT '名称',
  `description` varchar(200) NOT NULL DEFAULT '' COMMENT '描述',
  `itemType` int(10) NOT NULL DEFAULT '0' COMMENT '100 - 无属性材料 201 - 可使用道具图纸 202 - 礼包 203 - 药品 301 - 装备 玩家移动速度 302 - 幸运 303 - 精力上限 304 - 经历恢复速度 305 - 耐久 306 - 物攻 307 - 技攻 308 - 防御',
  `price` int(10) NOT NULL DEFAULT '0' COMMENT '价格',
  `quality` int(10) NOT NULL DEFAULT '0' COMMENT '品质',
  `pileNum` int(10) NOT NULL DEFAULT '0' COMMENT '堆叠数量',
  `useEffectId` int(10) NOT NULL DEFAULT '0' COMMENT '使用效果ID',
  `isBinding` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否绑定',
  `canWarehouse` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否可放入仓库',
  `canDestroy` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否可摧毁',
  `destroyTime` int(10) NOT NULL DEFAULT '0' COMMENT '销毁时间',
  `level` int(10) NOT NULL DEFAULT '0' COMMENT '物品等级',
  `resId` int(10) NOT NULL DEFAULT '0' COMMENT '美术资源',
  `canUse` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否可使用',
  `needLevel` int(10) NOT NULL DEFAULT '0' COMMENT '使用等级限制',
  `compose` varchar(60) NOT NULL DEFAULT '' COMMENT '合成物品名',
  `useTip` varchar(60) NOT NULL DEFAULT '' COMMENT '使用成功提示',
  `needMaterial` varchar(1000) NOT NULL DEFAULT '' COMMENT '需要材料{"material":[{"itemId":1,"itemNum":10}]}',
  `DATE` int(10) NOT NULL DEFAULT '0' COMMENT '日期',
  `bz` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 - 可用 2 - 不可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='道具表';

/*Data for the table `seaking_items` */

/*Table structure for table `seaking_pk_log` */

DROP TABLE IF EXISTS `seaking_pk_log`;

CREATE TABLE `seaking_pk_log` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `characterInfo` text NOT NULL COMMENT '角色数据{"baseInfo":{},"equipment":{},"formation":{}}',
  `enemyInfo` text NOT NULL COMMENT '敌船数据{"baseInfo":{},"equipment":{},"formation":{}}',
  `fightData` text NOT NULL COMMENT '战斗数据',
  `DATE` int(10) NOT NULL DEFAULT '0' COMMENT '日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='玩家pk记录';

/*Data for the table `seaking_pk_log` */

/*Table structure for table `seaking_skills` */

DROP TABLE IF EXISTS `seaking_skills`;

CREATE TABLE `seaking_skills` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(60) NOT NULL DEFAULT '' COMMENT '技能名稱',
  `DATE` int(10) NOT NULL DEFAULT '0' COMMENT '日期',
  `bz` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 - 可用 2 - 不可用',
  PRIMARY KEY (`id`),
  KEY `index_bz` (`bz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='技能表';

/*Data for the table `seaking_skills` */

/*Table structure for table `seaking_task` */

DROP TABLE IF EXISTS `seaking_task`;

CREATE TABLE `seaking_task` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `taskId` int(10) NOT NULL DEFAULT '0',
  `TYPE` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 - 主线任务 2 - 支线任务 3 - 日常任务 4 - 活动任务',
  `taskName` varchar(60) NOT NULL DEFAULT '' COMMENT '任务名称',
  `taskBeginTime` int(10) NOT NULL DEFAULT '0' COMMENT '任务开启时间',
  `taskEndTime` int(10) NOT NULL DEFAULT '0' COMMENT '任务关闭时间',
  `taskExpireTime` int(10) NOT NULL DEFAULT '0' COMMENT '任务失效时间',
  `minLevel` int(10) NOT NULL DEFAULT '0' COMMENT '玩家等级下限',
  `maxLevel` int(10) NOT NULL DEFAULT '0' COMMENT '玩家等级上限',
  `needSociaty` tinyint(1) NOT NULL DEFAULT '0' COMMENT '加入公会限制 1 - 需要加入工会',
  `sociatyValue` int(10) NOT NULL DEFAULT '0' COMMENT '公会数值(待后期设定)',
  `questNpcId` int(10) NOT NULL DEFAULT '0' COMMENT '接取NPC编号',
  `completeNpcId` int(10) NOT NULL DEFAULT '0' COMMENT '交还NPC编号',
  `taskProp` varchar(100) NOT NULL DEFAULT '' COMMENT '接取获得任务道具',
  `taskGoal` varchar(600) NOT NULL DEFAULT '' COMMENT '{"type":1,"items":[{"id":1,"needNum":3}]}',
  `taskDescription` varchar(100) NOT NULL DEFAULT '' COMMENT '任务描述',
  `taskTalkNum` tinyint(2) NOT NULL DEFAULT '0' COMMENT '对话次数',
  `taskTalk` varchar(600) NOT NULL DEFAULT '' COMMENT '[{"npcId":0,"npcTalk":"","characterTalk":""}]',
  `notCompleteText` varchar(100) NOT NULL DEFAULT '' COMMENT '任务未完成文本',
  `completeText` varchar(100) NOT NULL DEFAULT '' COMMENT '任务完成文本',
  `getExp` int(10) NOT NULL DEFAULT '0' COMMENT '奖励经验',
  `getMoney` int(10) NOT NULL DEFAULT '0' COMMENT '奖励游戏币',
  `rewardName` varchar(100) NOT NULL DEFAULT '' COMMENT '奖励称号',
  `rewardItems` varchar(600) NOT NULL DEFAULT '' COMMENT '奖励物品 [{"itemId":1,"num":3}]',
  `isBroadcast` tinyint(1) NOT NULL DEFAULT '0' COMMENT '完成后公告 1 - 广播',
  `nextTaskId` int(10) NOT NULL DEFAULT '0' COMMENT '后续任务编号',
  `DATE` int(10) NOT NULL DEFAULT '0' COMMENT '日期',
  `bz` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 - 可用 2 - 不可用',
  `showNpcId` int(10) NOT NULL DEFAULT '0' COMMENT '显示Npc编号',
  `hideNpcId` int(10) NOT NULL DEFAULT '0' COMMENT '隐藏Npc编号',
  `imgId` int(10) NOT NULL DEFAULT '0' COMMENT '资源Id',
  PRIMARY KEY (`id`),
  KEY `index_needSociaty` (`needSociaty`),
  KEY `index_isBroadcast` (`isBroadcast`),
  KEY `index_bz` (`bz`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='任务表';

/*Data for the table `seaking_task` */

insert  into `seaking_task`(`id`,`taskId`,`TYPE`,`taskName`,`taskBeginTime`,`taskEndTime`,`taskExpireTime`,`minLevel`,`maxLevel`,`needSociaty`,`sociatyValue`,`questNpcId`,`completeNpcId`,`taskProp`,`taskGoal`,`taskDescription`,`taskTalkNum`,`taskTalk`,`notCompleteText`,`completeText`,`getExp`,`getMoney`,`rewardName`,`rewardItems`,`isBroadcast`,`nextTaskId`,`DATE`,`bz`,`showNpcId`,`hideNpcId`,`imgId`) values (1,10101,1,'杀杀怪',0,0,0,0,0,0,0,10101,10101,'','','杀杀怪',2,'{\"talks\":[{\"npcId\":10101,\"npc\":\"做个任务呗\",\"player\":\"啥啊\"},{\"npcId\":10102,\"npc\":\"杀杀怪\",\"player\":\"好嘞~\"}]}','还在磨刀啊，快去杀啊！','很迅速嘛~',50,50,'','',0,10002,0,1,10102,10101,21),(2,10102,1,'收集物品',0,0,0,0,0,0,0,10102,10102,'','','收集物品',2,'{\"talks\":[{\"npcId\":10102,\"npc\":\"来找我了？\",\"player\":\"恩\"},{\"npcId\":10101,\"npc\":\"小狗身上掉雪糕，弄几个去呗~\",\"player\":\"正好我也想吃\"}]}','好热的天啊，要有雪糕吃就好了','这么多啊，我吃个可爱多就好了。',50,50,'可爱多','',1,10003,0,1,10101,10102,21),(3,10201,1,'打打副本',0,0,0,0,0,0,0,10201,10201,'','','打副本',2,'{\"talks\":[{\"npcId\":10201,\"npc\":\"来第二个城市了啊？\",\"player\":\"其他地能去也行啊\"},{\"npcId\":10201,\"npc\":\"有个副本等着你打呢。\",\"player\":\"我就知道闲不着\"}]}','通关有奖励哦~','主线任务没了',50,50,'','',0,0,0,1,0,0,21),(4,20201,2,'穿装备',0,0,0,0,0,0,0,10201,10201,'','','穿上装备',1,'{\"talks\":[{\"npcId\":10201,\"npc\":\"穿上这个装备吧\",\"player\":\"终于不裸了\"}]}','穿了没？','下一个~',30,30,'','',0,20202,0,1,0,0,21),(5,20202,2,'升级',0,0,0,0,0,0,0,10201,10201,'','','升到5级',3,'{\"talks\":[{\"npcId\":10201,\"npc\":\"现在几级了？\",\"player\":\"你不会看啊\"},{\"npcId\":10201,\"npc\":\"懒得看\",\"player\":\"懒得说\"},{\"npcId\":10201,\"npc\":\"拿到你五级的时候来找我吧\",\"player\":\"好\"}]}','嗯哼？','其实我也没啥事。',50,50,'','',0,0,0,1,0,0,21),(6,30201,3,'升级装备',0,0,0,0,10,0,0,10202,10202,'','','升级一次装备',1,'{\"talks\":[{\"npcId\":10202,\"npc\":\"升级一下装备呗\",\"player\":\"行啊\"}]}','很简单的，速去速回。','很厉害呀',50,50,'','',0,30202,0,1,0,0,21),(7,30202,3,'排兵布阵',0,0,0,10,0,1,0,10202,10202,'','','更换一次阵型',2,'{\"talks\":[{\"npcId\":10202,\"npc\":\"阵型有点乱啊，\",\"player\":\"还好\"},{\"npcId\":10202,\"npc\":\"能换个不？\",\"player\":\"能\"}]}','那就换呗','这回顺眼了',50,50,'','',0,30203,0,1,0,0,21),(8,30203,3,'真金白银',0,0,0,0,0,0,0,10202,10202,'','','花费十个元宝',2,'{\"talks\":[{\"npcId\":10202,\"npc\":\"要养成乱花钱的好习惯\",\"player\":\"恩\"},{\"npcId\":10202,\"npc\":\"那去花十个吧\",\"player\":\"。。。\"}]}','养成习惯嘛~','又乱花钱，这可是日常啊！',50,50,'','',0,0,0,1,0,0,21),(9,40201,4,'',13,15,0,0,0,0,0,10203,10203,'','','通关节日副本',1,'{\"talks\":[{\"npcId\":10203,\"npc\":\"过节了，有个节日BOSS，去吧\",\"player\":\"去就去\"}]}','节日boss很给力的。','奖励很多吧~',50,50,'','',0,0,0,1,0,0,21),(10,40202,4,'节日小奢侈',13,20,20,0,0,0,0,10203,10203,'','','过节了，奢侈一把',2,'{\"talks\":[{\"npcId\":10203,\"npc\":\"过节了奢侈一把呗~\",\"player\":\"站着说话不腰疼\"},{\"npcId\":10203,\"npc\":\"去吧，回来我报销\",\"player\":\"早说~\"}]}','有发票才给报销呢','有发票才给报销呢',50,50,'','',0,0,0,1,0,0,21);

/*Table structure for table `seaking_user` */

DROP TABLE IF EXISTS `seaking_user`;

CREATE TABLE `seaking_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uc_userId` varchar(60) NOT NULL DEFAULT '' COMMENT 'uc_userId',
  `mongoDbId` varchar(60) NOT NULL DEFAULT '' COMMENT 'mongoDbId',
  `registerDate` int(10) NOT NULL DEFAULT '0' COMMENT 'registerDate',
  `lastLoginDate` int(10) NOT NULL DEFAULT '0' COMMENT 'lastLoginDate',
  `DATE` int(10) NOT NULL DEFAULT '0' COMMENT '日期',
  `bz` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 - 可用 2 - 不可用',
  `updateBz` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 - 新增 2 - 已更新到mysql',
  `characters` varchar(60) NOT NULL DEFAULT '' COMMENT '所創建的角色信息，如：1,2,3',
  `registerType` varchar(60) NOT NULL DEFAULT '' COMMENT 'registerType',
  `loginName` varchar(60) NOT NULL DEFAULT '' COMMENT 'loginName',
  `money` int(10) NOT NULL DEFAULT '0' COMMENT '金幣',
  `gameCurrency` int(10) NOT NULL DEFAULT '0' COMMENT '遊戲幣',
  `taskInfo` int(10) NOT NULL DEFAULT '0' COMMENT '當前任務信息',
  `currentMainTask` int(10) NOT NULL DEFAULT '0' COMMENT '當前主线任务',
  `currentBranchTask` int(10) NOT NULL DEFAULT '0' COMMENT '當前支线任务',
  `currentDayTask` int(10) NOT NULL DEFAULT '0' COMMENT '當前日常任务',
  `currentExerciseTask` int(10) NOT NULL DEFAULT '0' COMMENT '當前活动任务',
  PRIMARY KEY (`id`),
  KEY `index_uc_userId` (`uc_userId`),
  KEY `index_mongoDbId` (`mongoDbId`),
  KEY `index_bz` (`bz`),
  KEY `index_updateBz` (`updateBz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用戶表';

/*Data for the table `seaking_user` */

/*Table structure for table `sk_serverlist` */

DROP TABLE IF EXISTS `sk_serverlist`;

CREATE TABLE `sk_serverlist` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `mongoDbId` varchar(60) NOT NULL DEFAULT '' COMMENT 'mongoDbId',
  `name` varchar(60) NOT NULL DEFAULT '' COMMENT 'name',
  `ip` varchar(60) NOT NULL DEFAULT '' COMMENT 'ip',
  `port` int(4) NOT NULL DEFAULT '0' COMMENT 'port',
  `connectNumber` int(10) NOT NULL DEFAULT '0' COMMENT 'connectNumber',
  `date` int(10) NOT NULL DEFAULT '0' COMMENT '日期',
  `showName` varchar(60) NOT NULL DEFAULT '' COMMENT 'showName',
  `bz` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 - 可用 2 - 不可用',
  `updateBz` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 - 新增 2 - 已更新到mongoDB',
  PRIMARY KEY (`id`),
  KEY `index_mongoDbId` (`mongoDbId`),
  KEY `index_bz` (`bz`),
  KEY `index_updateBz` (`updateBz`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `sk_serverlist` */

insert  into `sk_serverlist`(`id`,`mongoDbId`,`name`,`ip`,`port`,`connectNumber`,`date`,`showName`,`bz`,`updateBz`) values (1,'','server1','project.wozlla.com',7002,0,1356686745,'华东区',1,1),(2,'','server2','project.wozlla.com',7002,0,1356767555,'华北区',1,1);

/*Table structure for table `uc_user` */

DROP TABLE IF EXISTS `uc_user`;

CREATE TABLE `uc_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `mongoDbId` varchar(60) NOT NULL DEFAULT '' COMMENT 'mongoDbId',
  `loginName` varchar(60) NOT NULL DEFAULT '' COMMENT 'loginName',
  `password` varchar(60) NOT NULL DEFAULT '' COMMENT 'password',
  `nickname` varchar(60) NOT NULL DEFAULT '' COMMENT 'nickname',
  `registerType` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 - 登录名 2 - email 3 - phoneNum',
  `email` varchar(100) NOT NULL DEFAULT '' COMMENT 'email',
  `phoneNum` bigint(11) NOT NULL DEFAULT '0' COMMENT 'phoneNum',
  `country` varchar(60) NOT NULL DEFAULT '' COMMENT 'country',
  `province` varchar(60) NOT NULL DEFAULT '' COMMENT 'province',
  `city` varchar(60) NOT NULL DEFAULT '' COMMENT 'city',
  `birthdate` int(10) NOT NULL DEFAULT '0' COMMENT 'birthdate',
  `registerDate` int(10) NOT NULL DEFAULT '0' COMMENT 'registerDate',
  `DATE` int(10) NOT NULL DEFAULT '0' COMMENT '日期',
  `bz` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 - 可用 2 - 不可用',
  `updateBz` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 - 新增 2 - 已更新到mysql',
  `userId` int(10) NOT NULL DEFAULT '0' COMMENT 'redis中userId',
  PRIMARY KEY (`id`),
  KEY `index_mongoDbId` (`mongoDbId`),
  KEY `index_login` (`loginName`,`password`),
  KEY `index_loginName` (`loginName`),
  KEY `index_bz` (`bz`),
  KEY `index_updateBz` (`updateBz`),
  KEY `index_userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `uc_user` */

insert  into `uc_user`(`id`,`mongoDbId`,`loginName`,`password`,`nickname`,`registerType`,`email`,`phoneNum`,`country`,`province`,`city`,`birthdate`,`registerDate`,`DATE`,`bz`,`updateBz`,`userId`) values (1,'','html5','65e232ed43477b2f5cb4413023548fce','html5',1,'',0,'','','',0,1356785206,1356785206,1,1,0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
