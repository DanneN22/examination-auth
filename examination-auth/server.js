const express = require('express');
const bodyParser = require('body-parser');
const { router: authRouter } = require('./routes/auth');
const { router: productRouter } = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
