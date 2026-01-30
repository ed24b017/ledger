import db from "../config/db.js";

const createVerificationStmt = db.prepare(
	"insert into email_verifications (email, password_hash, otp_hash, expires_at) values (?, ?, ?, ?)",
);

const findVerificationByEmailStmt = db.prepare(
	"select id, email, password_hash, otp_hash, created_at, expires_at from email_verifications where email = ?",
);

const deleteVerificationByEmailStmt = db.prepare(
	"delete from email_verifications where email = ?",
);

const deleteVerificationByIdStmt = db.prepare(
	"delete from email_verifications where id = ?",
);

function createVerification(email, password_hash, otp_hash, expires_at) {
	return createVerificationStmt.run(
		email,
		password_hash,
		otp_hash,
		expires_at,
	);
}

function findVerificationByEmail(email) {
	return findVerificationByEmailStmt.get(email) || null;
}

function deleteVerificationByEmail(email) {
	return deleteVerificationByEmailStmt.run(email);
}

function deleteVerificationById(id) {
	return deleteVerificationByIdStmt.run(id);
}

export default {
	createVerification,
	findVerificationByEmail,
	deleteVerificationByEmail,
};
