let nextId = 3;
let items = [
  {
    id: 1,
    price: 100,
    name: 'Cola',
  },
  {
    id: 2,
    price: 300,
    name: 'Coca',
  },
];

const writeItem = (id, data) => {
  if (!id) {
    id = nextId;
    nextId++;
  }

  const newItem = { ...data, id };
  items.push(newItem);
  return newItem;
};
const getItems = () => {
  return items;
};
const deleteItem = id => {
  items = items.filter(item => item.id !== id);
};
const updateItem = (id, data) => {
  if (!id || !data) return null;

  const updatedItem = { id, ...data };
  items = items.map(item => (item.id === id ? updatedItem : item));

  return updatedItem;
};

module.exports = {
  getItems,
  writeItem,
  deleteItem,
  updateItem,
};
