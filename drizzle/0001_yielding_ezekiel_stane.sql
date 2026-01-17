CREATE TABLE `eiken_format_test_results` (
	`id` varchar(64) NOT NULL,
	`user_id` int NOT NULL,
	`question_set_id` varchar(64) NOT NULL,
	`score` int NOT NULL,
	`total_score` int NOT NULL,
	`accuracy` decimal(5,2) NOT NULL,
	`time_spent` int NOT NULL,
	`passed` boolean NOT NULL,
	`completed_date` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `eiken_format_test_results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grammar_topics` (
	`id` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`grade` enum('5','4','3','準2','2','準1','1') NOT NULL,
	`grammar_type` enum('infinitive','gerund','both') NOT NULL,
	`timeline_position` enum('past','present','future'),
	`explanation` text NOT NULL,
	`examples` json NOT NULL,
	`visual_explanation` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `grammar_topics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `learning_questions` (
	`id` varchar(64) NOT NULL,
	`topic_id` varchar(64) NOT NULL,
	`grade` enum('5','4','3','準2','2','準1','1') NOT NULL,
	`question_type` enum('multiple-choice','fill-blank','reorder','matching') NOT NULL,
	`question` text NOT NULL,
	`options` json,
	`correct_answer` text,
	`explanation` text NOT NULL,
	`difficulty` enum('easy','medium','hard') NOT NULL,
	`timeline_hint` enum('past','present','future'),
	`practice_type` enum('A','B','C','D','E','F','G'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learning_questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `learning_sessions` (
	`id` varchar(64) NOT NULL,
	`user_id` int NOT NULL,
	`grade` enum('5','4','3','準2','2','準1','1') NOT NULL,
	`mode` enum('seven-by-seven','eiken-format','review','diagnostic') NOT NULL,
	`start_time` timestamp NOT NULL DEFAULT (now()),
	`end_time` timestamp,
	`questions_answered` int NOT NULL DEFAULT 0,
	`correct_answers` int NOT NULL DEFAULT 0,
	`topics_studied` json NOT NULL,
	CONSTRAINT `learning_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recommended_learning_paths` (
	`id` varchar(64) NOT NULL,
	`grade` enum('5','4','3','準2','2','準1','1') NOT NULL,
	`topics` json NOT NULL,
	`description` text,
	`estimated_total_minutes` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `recommended_learning_paths_id` PRIMARY KEY(`id`),
	CONSTRAINT `recommended_learning_paths_grade_unique` UNIQUE(`grade`)
);
--> statement-breakpoint
CREATE TABLE `seven_by_seven_matrices` (
	`id` varchar(64) NOT NULL,
	`topic_id` varchar(64) NOT NULL,
	`grade` enum('5','4','3','準2','2','準1','1') NOT NULL,
	`variations` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seven_by_seven_matrices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `seven_by_seven_sessions` (
	`id` varchar(64) NOT NULL,
	`user_id` int NOT NULL,
	`matrix_id` varchar(64) NOT NULL,
	`start_time` timestamp NOT NULL DEFAULT (now()),
	`end_time` timestamp,
	`current_cell` json,
	`completed_cells` json NOT NULL,
	`score` int NOT NULL DEFAULT 0,
	CONSTRAINT `seven_by_seven_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `topic_progress` (
	`id` varchar(64) NOT NULL,
	`user_id` int NOT NULL,
	`topic_id` varchar(64) NOT NULL,
	`grade` enum('5','4','3','準2','2','準1','1') NOT NULL,
	`completed_practices` json NOT NULL,
	`total_attempts` int NOT NULL DEFAULT 0,
	`correct_attempts` int NOT NULL DEFAULT 0,
	`mastery_level` enum('0','1','2','3') NOT NULL DEFAULT '0',
	`last_attempt_date` timestamp,
	`next_review_date` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `topic_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_answers` (
	`id` varchar(64) NOT NULL,
	`user_id` int NOT NULL,
	`question_id` varchar(64) NOT NULL,
	`answer` text NOT NULL,
	`is_correct` boolean NOT NULL,
	`time_spent` int,
	`attempt_number` int NOT NULL DEFAULT 1,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_answers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_learning_stats` (
	`id` varchar(64) NOT NULL,
	`user_id` int NOT NULL,
	`total_questions_answered` int NOT NULL DEFAULT 0,
	`correct_answers` int NOT NULL DEFAULT 0,
	`accuracy_rate` decimal(5,2) NOT NULL DEFAULT '0.00',
	`current_streak` int NOT NULL DEFAULT 0,
	`longest_streak` int NOT NULL DEFAULT 0,
	`last_learning_date` timestamp,
	`total_learning_minutes` int NOT NULL DEFAULT 0,
	`grade_progress` json NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_learning_stats_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_learning_stats_user_id_unique` UNIQUE(`user_id`)
);
