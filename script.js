let shoppingList = [
  { id: 1, name: 'Alface', purchased: false, category: 'Hortifruti' },
  { id: 2, name: 'Sabão em pó', purchased: false, category: 'Limpeza' },
  { id: 3, name: 'Pão', purchased: false, category: 'Padaria' }
];

const inputItem = document.getElementById('itemInput');
const categoryInput = document.getElementById('categoryInput');
const addItemButton = document.getElementById('addItemButton');

function renderList() {
  const container = document.getElementById('shoppingListContainer');
  container.innerHTML = '';

  const grouped = {};
  shoppingList.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  for (const category in grouped) {
    const section = document.createElement('div');
    section.className = 'category-section';

    const title = document.createElement('h3');
    title.textContent = category;
    section.appendChild(title);

    const ul = document.createElement('ul');
    grouped[category].forEach(item => {
      const li = document.createElement('li');
      li.className = item.purchased ? 'purchased' : '';

      const span = document.createElement('span');
      span.textContent = item.name;
      span.className = 'itemName';
      span.onclick = () => togglePurchased(item.id);

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'x';
      removeBtn.className = 'remove';
      removeBtn.onclick = () => removeItem(item.id);

      li.appendChild(span);
      li.appendChild(removeBtn);
      ul.appendChild(li);
    });

    section.appendChild(ul);
    container.appendChild(section);
  }
}

function togglePurchased(id) {
  shoppingList = shoppingList.map(item =>
    item.id === id ? { ...item, purchased: !item.purchased } : item
  );
  renderList();
}

function removeItem(id) {
  shoppingList = shoppingList.filter(item => item.id !== id);
  renderList();
}

addItemButton.onclick = () => {
  const itemName = inputItem.value.trim();
  const category = categoryInput.value;
  if (itemName === '') return;

  const newItem = {
    id: Date.now(),
    name: itemName,
    purchased: false,
    category
  };

  shoppingList.push(newItem);
  renderList();
  inputItem.value = '';
};

renderList();
