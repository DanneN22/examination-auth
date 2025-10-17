const express = require('express');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));