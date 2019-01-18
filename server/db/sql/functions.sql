/* START DROPS */

DROP FUNCTION IF EXISTS bp_alpha_numeric_code();
DROP FUNCTION IF EXISTS bp_sign_up(u_input text, p_input password, fn_input text, ln_input text, e_input text);
DROP FUNCTION IF EXISTS bp_sign_in(u_input text, p_input text);

/* END DROPS */

/* START CREATES */

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

/* END CREATES */
