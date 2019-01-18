-- DROP VIEWS



-- DROP TABLES

DROP TABLE IF EXISTS
  favorites
, comments
, plants
, user_details
, users;

-- DROP FUNCTIONS

DROP FUNCTION IF EXISTS bp_alpha_numeric_code();
DROP FUNCTION IF EXISTS bp_sign_up(u_input text, p_input password, fn_input text, ln_input text, e_input text);
DROP FUNCTION IF EXISTS bp_sign_in(u_input text, p_input text);

-- DROP DOMAINS

DROP DOMAIN IF EXISTS NETEXT;
DROP DOMAIN IF EXISTS PASSWORD;
DROP DOMAIN IF EXISTS EMAIL;

-- CREATE DOMAINS

CREATE DOMAIN NETEXT AS TEXT
CONSTRAINT not_empty CHECK (LENGTH(VALUE) > 0);
CREATE DOMAIN PASSWORD AS TEXT
CONSTRAINT valid_password CHECK (VALUE ~ '^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$');
CREATE DOMAIN EMAIL AS TEXT
CONSTRAINT valid_email CHECK (VALUE ~ '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$');

-- CREATE FUNCTIONS

CREATE OR REPLACE FUNCTION bp_alpha_numeric_code()
RETURNS char(6) AS $$
DECLARE
    code CHAR(6);
    i INTEGER;
    chars CHAR(36) = 'abcdefghijklmnopqrstuvwxyz0123456789';
BEGIN
    code = '';
    FOR i in 1 .. 6 LOOP
        code = code || substr(chars, int4(floor(random() * length(chars))) + 1, 1);
    END LOOP;
    RETURN UPPER(code);
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION bp_sign_up(u_input TEXT, p_input PASSWORD, fn_input TEXT, ln_input TEXT, e_input TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    gen_user_id TEXT;
    gen_detail_id TEXT;
    gen_user_salt TEXT;
    hashed_pass TEXT;
BEGIN
    IF EXISTS(SELECT u.username FROM users u, user_details d WHERE u.id = d.user_id AND (u.username = $1 OR d.email = $5)) THEN
        RETURN FALSE;
    END IF;
    SELECT * INTO gen_user_id FROM encode(gen_random_bytes(16), 'hex');
    SELECT * INTO gen_detail_id FROM encode(gen_random_bytes(16), 'hex');
    SELECT * INTO gen_user_salt FROM gen_salt('bf');
    SELECT * INTO hashed_pass FROM encode(digest($2 || gen_user_salt, 'sha256'), 'hex');
    INSERT INTO users (id, username, password, salt) VALUES (gen_user_id, $1, hashed_pass, gen_user_salt);
    INSERT INTO user_details (id, user_id, first_name, last_name, email) VALUES (gen_detail_id, gen_user_id, $3, $4, $5);
    RETURN TRUE;
END
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION bp_sign_in(u_input TEXT, p_input TEXT)
RETURNS TABLE(user_id TEXT, username NETEXT) AS $$
DECLARE
    user_salt TEXT;
    hashed_pass TEXT;
BEGIN
    SELECT u.salt INTO user_salt FROM users u WHERE u.username = $1;
    SELECT * INTO hashed_pass FROM encode(digest($2 || user_salt, 'sha256'), 'hex');
    RETURN QUERY SELECT u.id AS user_id, u.username FROM users u WHERE u.username = $1 AND u.password = hashed_pass;
END
$$ LANGUAGE plpgsql;

-- CREATE TABLES

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

-- CREATE DATA

INSERT INTO users (id, username, password, salt) VALUES
 ('317a22933f23e46593fbabe76ff82d1e','user','f8926cb3a8d7aa45a396d5d5f318b6711907d9c47714e0f34d4bc2a4c893c559','$2a$06$qiGav.GHV1Z3rljxUZcxye');
INSERT INTO user_details (id, user_id, first_name, last_name, email) VALUES
 ('9a237f7c6bbd539586f27b43d87183e5','317a22933f23e46593fbabe76ff82d1e','Brian','Hamilton','hmltnbrn@gmail.com');
INSERT INTO plants (title, description, image_url) VALUES
 ('Bunny Ear Cactus','Bunny ears cactus, Opuntis microdasys, originated in Mexico.','https://i.imgur.com/gHUOzFL.jpg')
,('Bismarck Palm','Bismarckia nobilis grows from solitary trunks.','https://i.imgur.com/9dStYzI.jpg')
,('Panda Plant','Kalanchoe tomentosa, also known as Panda Plant, is extra fuzzy.','https://i.imgur.com/BBfOaqO.jpg')
,('Kale Marx','Some dead guy made out of kale.','https://i.imgur.com/c1a7erI.jpg')
,('Zig Zag Cactus','Selenicereus anthonyanus is a cactus species native to southern Mexico.','https://i.imgur.com/0HPMACV.jpg')
,('Bird''s Nest Fern','The Bird''s Next Fern is characterized by ripple-edged fronds that grow out of a next like crown.','https://i.imgur.com/Y9t5rlO.jpg');
INSERT INTO comments (plant_id, user_id, comment_text) VALUES
 (1,'317a22933f23e46593fbabe76ff82d1e','This one is okay, I guess')
,(4,'317a22933f23e46593fbabe76ff82d1e','Now I like this');
INSERT INTO favorites (plant_id, user_id) VALUES
 (4,'317a22933f23e46593fbabe76ff82d1e');

-- CREATE VIEWS


