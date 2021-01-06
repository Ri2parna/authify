import { expect, server, BASE_URL } from './setup';

describe('Index test', () => {
  it('should return error as there is nothing to be sent on a get request', (done) => {
    server
      .get(`${BASE_URL}/`)
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});
