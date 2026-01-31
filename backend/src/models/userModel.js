import db from "../config/db.js";

const insertUserStmt = db.prepare(
	"insert into users (email, passwordHash, email_verified) values (?, ?, 1)",
);

const findUserByEmailStmt = db.prepare(
	"select id, email, passwordHash, email_verified, created_at from users where email = ?",
);

function createUser(email, passwordHash) {
	return insertUserStmt.run(email, passwordHash);
}

function findByEmail(email) {
	return findUserByEmailStmt.get(email) || null;
}

export default {
	createUser,
	findByEmail,
};
