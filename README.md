Aplikasi NodeJS Express + PostgreSQL yang berjalan di GitHub Codespaces, termasuk: autentikasi JWT, middleware RBAC sederhana, CRUD untuk resource users dan products, file Docker Compose untuk PostgreSQL, skrip inisialisasi DB, dan perintah untuk menjalankan di Codespace.

/project
├── docker-compose.yml
├── init-db.sql
├── .env.example
├── package.json
├── server.js
├── /config
│   └── db.js
├── /controllers
│   ├── auth.controller.js
│   ├── user.controller.js
│   └── product.controller.js
├── /middleware
│   ├── auth.middleware.js
│   └── rbac.middleware.js
├── /models
│   └── queries.js
├── /routes
│   ├── auth.routes.js
│   ├── user.routes.js
│   └── product.routes.js
└── /utils
    └── hash.js

