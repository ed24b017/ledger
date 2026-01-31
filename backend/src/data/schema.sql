DROP TABLE IF EXISTS email_verifications;

DROP TABLE IF EXISTS users;

create table
    if not exists users (
        id integer primary key autoincrement,
        email text not null unique,
        passwordHash text not null,
        email_verified integer not null default 1,
        created_at datetime default current_timestamp
    );

create table
    if not exists email_verifications (
        id integer primary key autoincrement,
        email text not null,
        passwordHash text not null,
        otpHash text not null,
        created_at datetime default current_timestamp,
        expires_at datetime not null
    );

create index if not exists id_email_in_verification on email_verifications (email);