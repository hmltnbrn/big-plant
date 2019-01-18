/* START DROPS */

DROP TABLE IF EXISTS
  favorites
, comments
, plants
, user_details
, users;

/* END DROPS */

/* START CREATES */

CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL,
    username NETEXT NOT NULL,
    password NETEXT NOT NULL,
    salt TEXT NOT NULL,
    register_date BIGINT NOT NULL DEFAULT extract(epoch FROM now())
);

CREATE TABLE user_details (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL REFERENCES users (id),
    first_name NETEXT NOT NULL,
    last_name NETEXT NOT NULL,
    email EMAIL NOT NULL
);

CREATE TABLE plants (
    id SERIAL PRIMARY KEY NOT NULL,
    title NETEXT NOT NULL,
    description NETEXT NOT NULL,
    image_url NETEXT NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY NOT NULL,
    plant_id INTEGER NOT NULL REFERENCES plants (id),
    user_id TEXT NOT NULL REFERENCES users (id),
    comment_text NETEXT NOT NULL,
    comment_date BIGINT NOT NULL DEFAULT extract(epoch FROM now())
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY NOT NULL,
    plant_id INTEGER NOT NULL REFERENCES plants (id),
    user_id TEXT NOT NULL UNIQUE REFERENCES users (id),
    favorite_date BIGINT NOT NULL DEFAULT extract(epoch FROM now())
);

/* END CREATES */
