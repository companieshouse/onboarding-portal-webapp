import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import app from '../../src/app'

describe('HealthcheckController', () => {

    it('should return 200', async () => {
        const response = await request(app).get("/healthcheck");

        expect(response.status).toEqual(StatusCodes.OK);
      });
});
