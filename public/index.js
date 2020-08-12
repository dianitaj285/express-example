const form = document.getElementById('form');
const addForm = document.getElementById('addForm');
const input = document.getElementById('input');
const results = document.getElementById('results');

const name = document.getElementById('name');
const calories = document.getElementById('calories');
const message = document.getElementById('message');

form.addEventListener('submit', event => {
  event.preventDefault();
  const value = input.value;
  console.log(value);

  fetch(`/products?name=${value}`)
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(product => {
      console.log(product);
      const div = document.createElement('div');
      const span = document.createElement('span');
      span.innerText = product.name;
      const span2 = document.createElement('span');
      span2.innerText = product.calories;
      div.appendChild(span);
      div.appendChild(span2);
      results.appendChild(div);
      input.value = '';
    })
    .catch(err => {
      err.json().then(res => {
        console.log(res.error);
      });
    });
});

addForm.addEventListener('submit', event => {
  event.preventDefault();

  const nameValue = name.value;
  const caloriesValue = calories.value;
  const product = {name: nameValue, calories: caloriesValue};

  fetch('/products', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({product}),
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(res => {
      console.log(res);
      message.innerText = 'Product added successfully!';
    })
    .catch(err => {
      err.json().then(res => {
        console.log(res.error);
      });
    });
});
