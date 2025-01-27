// Form Update Category Status
const formsUpdateCategoryStatus = document.querySelectorAll("[form-update-category-status]");
if (formsUpdateCategoryStatus.length) {
  formsUpdateCategoryStatus.forEach(form => {
    const action = form.action;
    const id = form.getAttribute("data-id");
    const selectUpdateCategoryStatus = form.querySelector("[select-update-category-status]");

    selectUpdateCategoryStatus.addEventListener("change", (e) => {
      const status = e.target.value;

      form.action = `${action}/${status}/${id}?_method=PATCH`;
      form.submit();
    });
  });
}
// End Form Update Category Status

// Form Update Category Position
const formUpdateCategoryPosition = document.querySelectorAll("[form-update-category-position]");
if (formUpdateCategoryPosition.length) {
  formUpdateCategoryPosition.forEach(form => {
    const action = form.action;
    const id = form.getAttribute("data-id");
    const inputPosition = form.querySelector("input[name=position]");

    inputPosition.addEventListener("change", (e) => {
      const position = e.target.value;

      form.action = `${action}/${position}/${id}?_method=PATCH`;
      form.submit();
    });
  });
}
// End Form Update Category Position

// Form Delete Category
const formsDeleteCategory = document.querySelectorAll("[form-delete-category]");
if (formsDeleteCategory.length) {
  formsDeleteCategory.forEach(form => {
    form.addEventListener("submit" , (e) => {
      e.preventDefault();

      if (confirm("Bạn chắc chắn muốn xóa?")) {
        form.submit();
      }
    });
  });
}
// End Form Delete Category