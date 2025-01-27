import { Op } from "sequelize";

import sequelize from "../../configs/database.config";

import { ICategory } from "../../interfaces/category.interface";
import CategoryModel from "../../models/category.model"

const findAll = async ({ status }: { status?: string }) => {
  const find: {
    status?: string
  } = {};

  if (status) {
    find.status = status;
  }

  const categories = await CategoryModel.findAll({
    where: find,
    order: sequelize.literal("position ASC"),
    raw: true
  }) as unknown as ICategory[];
  return categories;
}

const findAllBySlug = async (slug: string) => {
  const categories = await CategoryModel.findAll({
    where: {
      slug: { [Op.like]: `${slug}%` }
    },
    raw: true
  });
  return categories;
}

const findById = async ({
  id,
  status
}: {
  id: number,
  status?: string
}) => {
  const find: {
    id: number,
    status?: string
  } = { id };

  if (status) {
    find.status = status;
  }

  const category = await CategoryModel.findOne({
    where: find,
    raw: true
  }) as Partial<ICategory>;
  return category;
}

const create = async ({ category }: { category: Partial<ICategory> }) => {
  const newCategory = (await CategoryModel.create(category)).dataValues as Partial<ICategory>;
  return newCategory;
}

const update = async ({
  id,
  category
}: {
  id: number,
  category: Partial<ICategory>
}) => {
  await CategoryModel.update(category, { where: { id } });
  const newCategory = await CategoryModel.findOne({
    where: { id },
    raw: true
  });
  return newCategory;
}

const del = async ({
  id,
  status
}: {
  id: number,
  status?: string
}) => {
  const find: {
    id: number;
    status?: string
  } = { id };

  if (status) {
    find.status = status;
  }

  const category = await CategoryModel.findOne({ where: find });
  if (!category) {
    return null;
  }
  category.destroy();
  return category.dataValues;
}

const categoryService = {
  findAll,
  findAllBySlug,
  findById,
  create,
  update,
  del
};
export default categoryService;