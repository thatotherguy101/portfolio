const deleteButtons = document.querySelectorAll('.btn-bar button');

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
    method: 'DELETE'
  });

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.remove();
}

for (const button of deleteButtons) {
  button.addEventListener('click', deleteProduct);
}