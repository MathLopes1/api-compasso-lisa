const mongoose = require('mongoose');
const supertest = require('supertest');
const App = require('../app/app.js');
const carService = require('../../src/app/service/carService.js');

const car = {};

describe('TEST - FEATURES THE CAR', () => {
  beforeAll(async () => {
    car.c1 = await carService.create({
      modelo: 'GM S10 2.8',
      cor: 'branco',
      ano: '2021',
      acessorios: [
        { descricao: 'Ar-condicionado' },
        { descricao: 'Dir. Hidráulica' },
        { descricao: 'Cabine Dupla' },
        { descricao: 'Tração 4x4' },
        { descricao: '4 portas' },
        { descricao: 'Diesel' },
        { descricao: 'Air bag' },
        { descricao: 'ABS' }
      ],
      quantidadePassageiros: 5
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET - CARS', async () => {
    const res = await supertest(App).get('/api/v1/car');

    expect(res.statusCode).toBe(200);
  });

  it('GET ID - CARS', async () => {
    const res = await supertest(App).get(`/api/v1/car/${car.c1._id}`);

    expect(res.statusCode).toBe(200);
  });

  it('POST - CARS', async () => {
    const res = await supertest(App)
      .post('/api/v1/car')
      .send({
        modelo: 'Ford Car',
        cor: 'amarelo',
        ano: '2005',
        acessorios: [
          { descricao: 'Ar-condicionado' },
          { descricao: 'Dir. Hidráulica' },
          { descricao: 'Cabine Dupla' },
          { descricao: 'Tração 4x4' },
          { descricao: '4 portas' },
          { descricao: 'Diesel' },
          { descricao: 'Air bag' },
          { descricao: 'ABS' }
        ],
        quantidadePassageiros: 5
      });

    expect(res.statusCode).toBe(201);
  });

  it('PUT - CARS', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.c1._id}`)
      .send({
        modelo: 'Fusquinha',
        cor: 'marrom',
        ano: '1976',
        acessorios: [{ descricao: 'Duas portas' }, { descricao: 'Fé' }],
        quantidadePassageiros: 5
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.modelo).toBe('Fusquinha');
  });

  it('DELETE - CARS', async () => {
    const res = await supertest(App).delete(`/api/v1/car/${car.c1._id}`);

    expect(res.statusCode).toBe(204);
  });
});
