import CategoryModel from "../../models/category.model";

const findAll = async () => {
  const categories = await CategoryModel.findAll({
    where: { status: "active" },
    raw: true
  });
  return categories;
}

const categoryService = {
  findAll
};
export default categoryService;