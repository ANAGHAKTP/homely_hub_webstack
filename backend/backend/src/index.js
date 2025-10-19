import a3a from 'express';
import a3b from 'cors';
import dotenv from 'dotenv';
import a3c from 'cookie-parser';
import a3d from './utils/db.js';
import { router } from './routes/userRoutes.js';
import { propertyRouter } from './routes/propertyRouter.js';
import { bookingRouter } from './routes/bookingRouter.js';
dotenv['config']();
const app = a3a();
app['use'](a3b({
    'origin': process['env']['ORIGIN_ACCESS_URL'],
    'credentials': !![]
})), app['use'](a3a['json']({ 'limit': '100mb' })), app['use'](a3a['urlencoded']({
    'limit': '100mb',
    'extended': !![]
})), app['use'](a3c());
const port = process['env']['PORT'] || 0x1f91;
a3d(), app['use']('/api/v1/rent/user', router), app['use']('/api/v1/rent/listing', propertyRouter), app['use']('/api/v1/rent/user/booking', bookingRouter), app['listen'](port, () => {
    console['log']('App\x20running\x20on\x20port:\x20' + port);
});