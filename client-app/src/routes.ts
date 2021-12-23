import { Application, Router } from 'express';
import RecipeController from './controllers/RecipeController';
import ReviewsController from './controllers/ReviewsController';
import UserController from './controllers/UserController';
import IngredientController from './controllers/IngredientController';
import TagController from './controllers/TagController';

const _routes: [string, Router][] = [
    ['/user', UserController],
    ['/recipe', RecipeController],
    ['/ingredient', IngredientController],
    ['/tag', TagController],
    ['/reviews', ReviewsController]
];

const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};

export default routes;
