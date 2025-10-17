let userId = 1;
let productId = 1;
const users = [
  // optional seed: { id: 0, username: 'admin', password: '<hashed>', role: 'admin' }
];
const products = [];

function addUser({ username, password, role }) {
  const user = { id: userId++, username, password, role };
  users.push(user);
  return user;
}

function addProduct({ name, price }) {
  const product = { id: productId++, name, price };
  products.push(product);
  return product;
}

module.exports = { users, products, addUser, addProduct };