const form = document.getElementById('product-form');
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

async function loadSelectsAndProduct() {
  try {
    // Загружаем типы и материалы
    const [typesRes, matsRes] = await Promise.all([
      fetch('http://localhost:3000/api/meta/types'),
      fetch('http://localhost:3000/api/meta/materials')
    ]);

    const types = await typesRes.json();
    const materials = await matsRes.json();

    const typeSelect = document.getElementById('typeSelect');
    const matSelect = document.getElementById('materialSelect');

    types.forEach(t => {
      const option = document.createElement('option');
      option.value = t.typeName;
      option.textContent = t.typeName;
      typeSelect.appendChild(option);
    });

    materials.forEach(m => {
      const option = document.createElement('option');
      option.value = m.materialName;
      option.textContent = m.materialName;
      matSelect.appendChild(option);
    });

    // Если редактируем — загрузить данные продукта
    if (productId) {
      const res = await fetch(`http://localhost:3000/api/products/${productId}`);
      if (!res.ok) throw new Error('Продукт не найден');
      const product = await res.json();

      form.querySelector('[name="article"]').value = product.article;
      form.querySelector('[name="type"]').value = product.type;
      form.querySelector('[name="name"]').value = product.name;
      form.querySelector('[name="minPrice"]').value = product.minPrice;
      form.querySelector('[name="material"]').value = product.material;
    }
  } catch (err) {
    alert(err.message);
    window.location.href = 'index.html';
  }
}

window.addEventListener('DOMContentLoaded', loadSelectsAndProduct);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  data.minPrice = parseFloat(data.minPrice);

  try {
    const res = await fetch(`http://localhost:3000/api/products${productId ? '/' + productId : ''}`, {
      method: productId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Ошибка при сохранении');
    alert(productId ? 'Продукт обновлён!' : 'Продукт добавлен!');
    window.location.href = 'index.html';
  } catch (err) {
    alert('Ошибка: ' + err.message);
  }
});
