// Form Update Cart Quantity
const formsUpdateCartQuantity = document.querySelectorAll("[form-update-cart-quantity]");
if (formsUpdateCartQuantity.length) {
  formsUpdateCartQuantity.forEach(form => {
    const inputQuantity = form.querySelector("input[name=quantity]");
    inputQuantity.addEventListener("change", () => {
      form.submit();
    });
  });
}
// End Form Update Cart Quantity