import 'dotenv/config';
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';

import { roomController } from './controllers/roomController';
import { customerController } from './controllers/customerController';
import { bookingController } from './controllers/bookingController';
import { facilityController } from './controllers/facilityController';
import { paymentController } from './controllers/paymentController';
import { webhookController } from './controllers/webhookController';

const port = Number(process.env.PORT || 3000);

new Elysia()
  .use(cors())
  .use(swagger({
    path: '/swagger',
    documentation: {
      info: {
        title: 'Hotel Booking API',
        version: '1.0.0'
      }
    }
  }))
  .use(roomController)
  .use(customerController)
  .use(bookingController)
  .use(facilityController)
  .use(paymentController)
  .use(webhookController)
  .listen(port);

console.log(`Hotel Booking API running at http://localhost:${port}`);
console.log(`Swagger docs: http://localhost:${port}/swagger`);