"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculateCartQuantity_middleware_1 = __importDefault(require("../../middlewares/client/calculateCartQuantity.middleware"));
const home_route_1 = __importDefault(require("./home.route"));
const category_route_1 = __importDefault(require("./category.route"));
const tour_route_1 = __importDefault(require("./tour.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const clientRoutes = (app) => {
    app.use(calculateCartQuantity_middleware_1.default);
    app.use("/", home_route_1.default);
    app.use("/categories", category_route_1.default);
    app.use("/tours", tour_route_1.default);
    app.use("/carts", cart_route_1.default);
};
exports.default = clientRoutes;
