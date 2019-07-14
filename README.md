Backend API for Github Comments [GET, POST, DELTE] & Members [GET, POST].
Developed in NodeJS (with Express) & MongoDB.
Default database configuration is set to remote URL.

To run on localhost:
- Run: "npm install" on local repository root folder
- If local DB is preferred, go to config/index.js and edit the following:
  1. Set 'local_db_url' value to your own mongoDB URL
  2. Set 'use_local_db' to 1.
  3. Change 'server_port' if needed. URL will be: http://localhost:{server_port}
  
