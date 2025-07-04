# 📦 Nextbend Billing System — Backend

<Note>This file documents all steps taken in building the backend using Express.js, from scratch, with clarity and purpose.</Note>

---

## ✅ What’s Done So Far

1. Created `backend/` directory for all backend logic.
2. Initialized npm project using:

   ```bash
   npm init -y
   ```

3. Installed core packages:

   ```bash
   npm install express cors dotenv jsonwebtoken bcrypt @prisma/client stripe nodemailer
   npm install --save-dev nodemon
   ```

4. Created `.env` file with:

   ```env
   PORT=5000
   ```

5. Enabled ES Modules in `package.json`:

   ```json
   {
     "type": "module"
   }
   ```

6. Added script to `package.json`:

   ```json
   "scripts": {
     "start": "node src/server.js",
     "dev": "nodemon src/server.js"
   }
   ```

7. Created `server.js` file in `/src/` with:

   ```js
   import express from 'express';
   import dotenv from 'dotenv';

   dotenv.config();

   const app = express();
   const PORT = process.env.PORT || 3000;

   app.get('/', (req, res) => {
     res.send('Welcome to Nextbend Payment Gateway');
   });

   app.listen(PORT, () => {
     console.log(\`listening on port \${PORT}\`);
   });
   ```

8. Confirmed server runs successfully using:

   ```bash
   npm run dev
   ```

---

## 📁 Folder Structure

```
/backend
├── /prisma
├── /src
│   ├── /config
│   ├── /controllers
│   ├── /middlewares
│   ├── /routes
│   ├── /utils
│   └── server.js
├── .env
├── package.json
└── readme.mdx
```

---

## 🚀 Next Steps

- Scaffold routes
- Implement authentication (register/login)
- Build service listing API
- Integrate with Stripe (later)

Stay focused and go step-by-step 💪