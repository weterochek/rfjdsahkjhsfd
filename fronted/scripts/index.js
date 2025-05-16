// Получаем tbody таблицы
const tbody = document.querySelector('#product-table tbody');

fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => {
    data.forEach(p => {
const row = `<tr>
  <td>${p.article}</td>
  <td>${p.type}</td>
  <td>${p.name}</td>
  <td>${p.minPrice.toFixed(2)}</td>
  <td>${p.material}</td>
  <td><a href="add_edit.html?id=${p._id}">Редактировать</a></td>
  <td><a href="workshops.html?id=${p._id}">Показать цеха</a></td>
<td><a href="raw_material_calc.html?id=${p._id}">Калькулятор</a></td>
</tr>`;
      tbody.innerHTML += row;
    });
  })
  .catch(err => {
    console.error('Ошибка при получении данных:', err);
    alert('Не удалось загрузить список продукции');
  });
