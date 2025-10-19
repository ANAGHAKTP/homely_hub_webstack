import a8a from 'express';
import {
    getProperties,
    getProperty
} from '../controllers/propertyController.js';
const propertyRouter = a8a['Router']();
propertyRouter['route']('/')['get'](getProperties), propertyRouter['route']('/:id')['get'](getProperty);
export {
    propertyRouter
};