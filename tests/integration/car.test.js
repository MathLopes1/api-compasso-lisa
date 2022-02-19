const mongoose = require('mongoose');
const supertest = require('supertest');
const App = require('../app/app.js');
const peopleService = require('../../src/app/service/peopleService.js');
const carService = require('../../src/app/service/carService.js');
const authService = require('../../src/app/service/authService.js');

const car = {};
let token = '';

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

    car.c2 = await carService.create({
      modelo: 'FORD GT 6810 1.8',
      cor: 'Vermelho',
      ano: '2021',
      acessorios: [
        { descricao: '4 portas' },
        { descricao: 'Gasolina' },
        { descricao: 'Air bag' },
        { descricao: 'ABS' }
      ],
      quantidadePassageiros: 3
    });

    await peopleService.create({
      nome: 'Felipe Instrutor',
      cpf: '00760263450',
      data_nascimento: '20/10/1995',
      email: 'felipeInstrutor@gmail.com',
      senha: '123456',
      habilitado: 'sim'
    });

    const tokenBearer = await authService.findAuth({
      email: 'felipeInstrutor@gmail.com',
      senha: '123456'
    });
    token = `Bearer ${tokenBearer.token}`;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET - CARS', async () => {
    const res = await supertest(App).get('/api/v1/car').set('authorization', token);
    expect(res.statusCode).toBe(200);
  });

  it('GET - CARS (QUERY NOT FOUND)', async () => {
    const res = await supertest(App).get('/api/v1/car?ano=4').set('authorization', token);
    expect(res.statusCode).toBe(400);
  });

  it('GET - CARS (INVALID)', async () => {
    const res = await supertest(App).get('/api/v1/cars').set('authorization', token);
    expect(res.statusCode).toBe(404);
  });

  it('GET - CARS (UNAUTHORIZED)', async () => {
    const res = await supertest(App).get('/api/v1/car');
    expect(res.statusCode).toBe(401);
  });

  /*----------------------------------------------------------------------------------------------------*/

  it('GET ID - CARS', async () => {
    const res = await supertest(App).get(`/api/v1/car/${car.c1._id}`).set('authorization', token);
    expect(res.statusCode).toBe(200);
  });

  it('GET ID - CARS(NOT FOUND)', async () => {
    const res = await supertest(App).get(`/api/v1/car/61f328a531430eea88eb7742`).set('authorization', token);
    expect(res.statusCode).toBe(404);
  });

  it('GET ID- CARS(UNAUTHORIZED)', async () => {
    const res = await supertest(App).get(`/api/v1/car/${car.c1._id}`);
    expect(res.statusCode).toBe(401);
  });

  /*-----------------------------------------------------------------------------------------------------*/

  it('POST - CARS', async () => {
    const res = await supertest(App)
      .post('/api/v1/car')
      .set('authorization', token)
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

  it('POST - CARS(ENAUTHORIZED)', async () => {
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
    expect(res.statusCode).toBe(401);
  });

  it('POST - CARS(BAD REQUEST)', async () => {
    const res = await supertest(App)
      .post('/api/v1/car')
      .set('authorization', token)
      .send({
        modelo: '',
        cor: '',
        ano: '',
        acessorios: [
          { descricao: '' },
          { descricao: '' },
          { descricao: '' },
          { descricao: '' },
          { descricao: '' },
          { descricao: '' },
          { descricao: '' },
          { descricao: '' }
        ],
        quantidadePassageiros: 5
      });
    expect(res.statusCode).toBe(400);
  });

  /*--------------------------------------------------------------------------------------------------------------*/

  it('PUT - CARS', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.c1._id}`)
      .set('authorization', token)
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

  it('PUT - CARS(BAD REQUESTE)', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.c1._id}`)
      .set('authorization', token)
      .send({
        modelo: '',
        cor: '',
        ano: '',
        acessorios: [{ descricao: 'Duas portas' }, { descricao: 'Fé' }],
        quantidadePassageiros: 5
      });
    expect(res.statusCode).toBe(400);
  });

  it('PUT - CARS(UNAUTHORIZED)', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.c1._id}`)
      .send({
        modelo: 'Fusquinha',
        cor: 'verde',
        ano: '1986',
        acessorios: [{ descricao: 'Duas portas' }, { descricao: 'Fé' }],
        quantidadePassageiros: 5
      });
    expect(res.statusCode).toBe(401);
  });

  it('PUT - CARS(BAD REQUESTE)', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/620e58e3f5100a5868ddb2df`)
      .set('authorization', token)
      .send({
        modelo: 'Fusquinha',
        cor: 'vermelho',
        ano: '1980',
        acessorios: [{ descricao: 'Duas portas' }, { descricao: 'Fé' }],
        quantidadePassageiros: 5
      });
    expect(res.statusCode).toBe(404);
  });
  /*---------------------------------------------------------------------------------------------------------------*/

  it('DELETE - CARS', async () => {
    const res = await supertest(App).delete(`/api/v1/car/${car.c1._id}`).set('authorization', token);
    expect(res.statusCode).toBe(204);
  });

  it('DELETE - CARS(BAD REQUEST)', async () => {
    const res = await supertest(App).delete(`/api/v1/car/620ebf227ce3f1fc44f00920`).set('authorization', token);
    expect(res.statusCode).toBe(404);
  });

  it('DELETE - CARS(UNAUTHORIZED)', async () => {
    const res = await supertest(App).delete(`/api/v1/car/${car.c1._id}`);
    expect(res.statusCode).toBe(401);
  });
});
