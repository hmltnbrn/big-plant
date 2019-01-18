/* START CREATES */

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

/* END CREATES */
