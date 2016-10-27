CREATE TABLE Game_Users(
	User_ID SERIAL NOT NULL PRIMARY KEY,
	Username VARCHAR(32) NOT NULL,
	Password VARCHAR(60) NOT NULL,
	First_Name VARCHAR(60) NOT NULL,
	Last_Name VARCHAR(60) NOT NULL,
	Email VARCHAR(60) NOT NULL,
	Admin_Username VARCHAR(32) NOT NULL,
	Admin_Password VARCHAR(60) DEFAULT NULL,
	Admin_First_Name VARCHAR(60) DEFAULT 'Great' NOT NULL,
	Admin_Last_Name VARCHAR(60) DEFAULT 'Job' NOT NULL,
	Admin_Email VARCHAR(60) DEFAULT 'winner@ctf-game.xyz' NOT NULL
);

CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;