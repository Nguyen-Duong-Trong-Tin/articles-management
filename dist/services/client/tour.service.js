"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../../configs/database.config"));
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const findBySlugCategory = (slugCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const tours = yield database_config_1.default.query(`
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
        type: sequelize_1.QueryTypes.SELECT
    });
    tours.forEach(item => {
        if (item.images) {
            const array = JSON.parse(item.images);
            item.images = array;
        }
    });
    return tours;
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = (yield tour_model_1.default.findOne({
        where: { id, status: "active" },
        raw: true
    }));
    tour.images = JSON.parse(tour.images);
    if (tour.price && tour.discount) {
        tour.newPrice = tour.price - ((tour.price * tour.discount) / 100);
    }
    return tour;
});
const findBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = (yield database_config_1.default.query(`
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
  `, { type: sequelize_1.QueryTypes.SELECT }))[0];
    tour.images = JSON.parse(tour.images);
    return tour;
});
const tourService = {
    findBySlugCategory,
    findById,
    findBySlug
};
exports.default = tourService;
