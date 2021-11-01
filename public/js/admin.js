const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector('[name=productId]').value;
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

  const productElement = btn.closest('article');

  const url = 'product/' + prodId;
  console.log(url);

  fetch(url, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrf,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      productElement.parentNode.removeChild(productElement);
    })
    .catch((err) => {
      console.log(err);
    });
};
