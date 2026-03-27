import  * as db from '../utils/supabase/db';
describe('db helpers', () => {

  describe('db helpers', () => {
    it('healthCheck throws on error', async () => {
      jest
        .spyOn(db, 'healthCheck')
        .mockImplementation(() => Promise.reject(new Error('fail')));
      await expect(db.healthCheck()).rejects.toThrow('fail');
      jest.restoreAllMocks();
    });
  });
  beforeAll(() => {
    jest
      .spyOn(db, 'healthCheck')
      .mockImplementation(() => Promise.reject(new Error('fail')));
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('healthCheck throws on error', async () => {
    await expect(db.healthCheck()).rejects.toThrow('fail');
  });
});
