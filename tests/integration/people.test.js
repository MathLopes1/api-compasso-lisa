const mongoose = require('mongoose');
const supertest = require('supertest');
const App = require('../app/app.js');
const peopleService = require('../../src/app/service/peopleService.js');

const people = {};

describe('TEST - FEATURES THE PEOPLE', () => {
  beforeAll(async () => {
    people.p1 = await peopleService.create({
      nome: 'Matheus',
      cpf: '86483681380',
      data_nascimento: '07/08/2000',
      email: 'matheus@gmail.com',
      senha: '010203',
      habilitado: 'sim'
    });
    people.p2 = await peopleService.create({
      nome: 'Lopes',
      cpf: '65367335250',
      data_nascimento: '07/08/2000',
      email: 'Lopes@gmail.com',
      senha: '010203',
      habilitado: 'sim'
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET - PEOPLE', async () => {
    const res = await supertest(App).get('/api/v1/people');
    expect(res.statusCode).toBe(200);
  });

  it('GET - PEOPLE(QUERY INVALID)', async () => {
    const res = await supertest(App).get('/api/v1/people?nome=rebeca');
    expect(res.statusCode).toBe(200);
  });

  it('GET - PEOPLE(BAD REQUEST)', async () => {
    const res = await supertest(App).get('/api/v1/peop');
    expect(res.statusCode).toBe(404);
  });

  /*---------------------------------------------------------------------------------------------------------------*/

  it('GET ID - PEOPLE', async () => {
    const res = await supertest(App).get(`/api/v1/people/${people.p1._id}`);
    expect(res.statusCode).toBe(200);
  });

  it('POST - PEOPLE', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'Maria Silva',
      cpf: '75494383660',
      data_nascimento: '19/04/1999',
      email: 'mariasilva@gmail.com',
      senha: '050809',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(201);
  });

  it('POST - PEOPLE(INVALID)', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: '',
      cpf: '',
      data_nascimento: '',
      email: '',
      senha: '',
      habilitado: ''
    });
    expect(res.statusCode).toBe(400);
  });

  it('POST - PEOPLE(CONFLCT EMAIL)', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'celson',
      cpf: '82172170410',
      data_nascimento: '28/07/1976',
      email: 'mariasilva@gmail.com',
      senha: '123456',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(409);
  });

  it('POST - PEOPLE(CONFLCT CPF)', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'Silva',
      cpf: '75494383660',
      data_nascimento: '06/07/2001',
      email: 'silva@gmail.com',
      senha: '123456',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(409);
  });

  /*---------------------------------------------------------------------------------------------------------------*/

  it('PUT - PEOPLE', async () => {
    const res = await supertest(App).put(`/api/v1/people/${people.p1._id}`).send({
      nome: 'Lucas',
      cpf: '15741811574',
      data_nascimento: '23/04/2003',
      email: 'Lucas@gmail.com',
      senha: '123456',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(200);
  });

  it('PUT - PEOPLE(NOT FOUND)', async () => {
    const res = await supertest(App).put(`/api/v1/people/620ebf227ce3f1fc44f00920`).send({
      nome: 'lazaro',
      cpf: '77606493049',
      data_nascimento: '05/07/2000',
      email: 'lazaro@gmail.com',
      senha: '123456',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(404);
  });

  it('PUT - PEOPLE(BAD-REQUEST)', async () => {
    const res = await supertest(App).put(`/api/v1/people/${people.p1._id}`).send({
      nome: '',
      cpf: '',
      data_nascimento: '',
      email: '',
      senha: '',
      habilitado: ''
    });
    expect(res.statusCode).toBe(400);
  });

  /*---------------------------------------------------------------------------------------------------------------*/

  it('DELETE - PEOPLE', async () => {
    const res = await supertest(App).delete(`/api/v1/people/${people.p1._id}`);

    expect(res.statusCode).toBe(204);
  });

  it('DELETE - PEOPLE(NOT FOUND)', async () => {
    const res = await supertest(App).delete(`/api/v1/people/620ebf227ce3f1fc44f00920`);
    expect(res.statusCode).toBe(404);
  });

  /*---------------------------------------------------------------------------------------------------------------*/

  it('POST - AUTHENTICATE A PEOPLE', async () => {
    const res = await supertest(App).post('/api/v1/authenticate').send({
      email: 'mariasilva@gmail.com',
      senha: '050809'
    });
    expect(res.statusCode).toBe(200);
  });

  it('POST - AUTHENTICATE A PEOPLE(BAD REQUEST)', async () => {
    const res = await supertest(App).post('/api/v1/authenticate').send({
      email: '',
      senha: '123456'
    });
    expect(res.statusCode).toBe(404);
  });
});
