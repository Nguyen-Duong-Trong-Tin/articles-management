import { QueryTypes } from "sequelize";

import sequelize from "../../configs/database.config";

import { ITourSelect } from "../../interfaces/tour.interface";
import TourModel from "../../models/tour.model";

const findBySlugCategory = async (slugCategory: string) => {
  const tours: ITourSelect[] = await sequelize.query(`
    SELECT 
      tours.id,
      tours.slug,
      tours.images,
      tours.title,
      tours.price,
      tours.discount,
      ROUND(tours.price - ((tours.price * tours.discount) / 100), 0) as newPrice
    FROM tours_categories
    INNER JOIN tours ON tours_categories.tourId = tours.id
    INNER JOIN categories ON tours_categories.categoryId = categories.id
    WHERE
      categories.slug = '${slugCategory}' AND
      categories.status = 'active' AND
      tours.status = 'active'; 
  `, {
    type: QueryTypes.SELECT
  });

  tours.forEach(item => {
    if (item.images) {
      const array: string[] = JSON.parse(item.images as string);
      item.images = array;
    }
  });

  return tours;
}

const findById = async (id: number) => {
  const tour = (await TourModel.findOne({
    where: { id, status: "active" },
    raw: true
  })) as Partial<ITourSelect>;

  tour.images = JSON.parse(tour.images as string);
  
  if (tour.price && tour.discount) {
    tour.newPrice = tour.price - ((tour.price * tour.discount) / 100);
  }

  return tour;
}

const findBySlug = async (slug: string) => {
  const tour: Partial<ITourSelect> = (await sequelize.query(`
    SELECT 
      tours.id,
      tours.images,
      tours.title,
      tours.code,
      tours.timeStart,
      tours.stock,
      tours.price,
      tours.discount,
      tours.information,
      tours.schedule,
      ROUND(tours.price - ((tours.price * tours.discount) / 100), 0) as newPrice
    FROM tours
    WHERE
      tours.slug = '${slug}' AND
      tours.status = 'active'
    LIMIT 1
  `, { type: QueryTypes.SELECT }))[0];

  tour.images = JSON.parse(tour.images as string);
  return tour;
}

const tourService = {
  findBySlugCategory,
  findById,
  findBySlug
};
export default tourService;