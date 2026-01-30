import db from "../config/db.js";

const insertUserStmt = db.prepare(
	"insert into users (email, password_hash, email_verified) values (?, ?, 1)",
);

const findUserByEmailStmt = db.prepare(
	"select id, email, password_hash, email_verified, created_at from users where email = ?",
);

function createUser(email, password_hash) {
	return insertUserStmt.run(email, password_hash);
}

function findByEmail(email) {
	return findUserByEmailStmt.get(email) || null;
}

export default {
	createUser,
	findByEmail,
};
