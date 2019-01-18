# Big Plant

## Usage Notes

1. Requires the **pgcrypto** extension for PostgreSQL.

2. I use **.env** files for keeping track of the two environment variables. **.env.example** has what those variables are. The database URL requires "?ssl=true" appended to the end.

3. **server/db/generate/create.sql** has a full SQL file for generating the tables in the database.

4. Developer mode is run with **npm run start-dev**.

5. Default username and password are "user" and "password".
