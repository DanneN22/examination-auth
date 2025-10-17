
# Examination Auth - Kort instruktion

Kortfattat: ett litet Node.js API för inlärning av autentisering med JWT och rollkontroll.

Krav
- Node.js >= 14
- Kör i projektmappen som innehåller `server.js` och `package.json`

Installera
1. Öppna PowerShell i projektmappen:
   cd "C:\Users\Danie\OneDrive\Dokument\Code map\egen\examination-auth"
2. Installera beroenden:
   npm install

Starta
- Starta servern:
  npm start
- Standardport: 3000 (kan sättas via PORT)

Miljövariabler
- JWT_SECRET — hemlig nyckel för token (standard används om ej satt)
- PORT — port att köra servern på

API (följ dokumentationen exakt)
- POST /api/auth/register
  Body: { "username": "...", "password": "...", "role": "user" | "admin" }
  Svar: status + meddelande

- POST /api/auth/login
  Body: { "username": "...", "password": "..." }
  Svar: { message: "...", authToken: "<JWT>" }

- GET /api/products
  Header: Authorization: Bearer <token>
  Svar: lista med produkter (kräver giltig token)

- POST /api/products
  Header: Authorization: Bearer <token>
  Body: { "name": "...", "price": 123 }
  Svar: skapat produkt (kräver inloggad admin)

Exempel (curl)
- Registrera:
  curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"username":"alice","password":"pwd","role":"admin"}'
- Logga in:
  curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"username":"alice","password":"pwd"}'
- Hämta produkter:
  curl -H "Authorization: Bearer <token>" http://localhost:3000/api/products

Noteringar
- Lagring är i minnet (reset vid omstart). För persistens, koppla till databas.
- Lösenord hashas med bcrypt.
- Kör git-kommandon i korrekt mapp om du pushar till GitHub.

Felsökning
- Error "Cannot find module './routes/auth'": kontrollera att `routes/auth.js` finns och att du kör från rätt mapp.
- Error vid push till remote: kör `git pull --rebase origin main` innan push om remote innehåller commits.

...existing code...
