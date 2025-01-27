"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_config_1 = __importDefault(require("../../configs/index.config"));
const admin_middleware_1 = __importDefault(require("../../middlewares/admin/admin.middleware"));
const dashboard_route_1 = __importDefault(require("./dashboard.route"));
const category_route_1 = __importDefault(require("./category.route"));
const adminRoutes = (app) => {
    const admin = index_config_1.default.admin;
    app.use(admin_middleware_1.default);
    app.use(`/${admin}/dashboards`, dashboard_route_1.default);
    app.use(`/${admin}/categories`, category_route_1.default);
};
exports.default = adminRoutes;
