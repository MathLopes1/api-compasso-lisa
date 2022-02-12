/* eslint-disable no-undef */
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
      data_nascimento:'07/08/2000',
      email:'matheus@gmail.com',
      senha: '010203',
      habilitado: 'sim'
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET - PEOPLE', async ()=> {
    const res = await supertest(App)
      .get('/api/v1/people');

    expect(res.statusCode).toBe(200);
  });

  it('GET ID - PEOPLE', async ()=> {
    const res = await supertest(App)
      .get(`/api/v1/people/${people.p1._id}`);

    expect(res.statusCode).toBe(200);
  });

  it('POST - PEOPLE', async ()=> {
    const res = await supertest(App)
      .post('/api/v1/people')
      .send({
        nome: 'Maria Silva',
        cpf: '75494383660',
        data_nascimento:'19/04/1999',
        email:'mariasilva@gmail.com',
        senha: '050809',
        habilitado: 'sim'
      });

    expect(res.statusCode).toBe(201);
  });

  it('PUT - PEOPLE', async ()=>{
    const res = await supertest(App)
      .put(`/api/v1/people/${people.p1._id}`)
      .send({
        nome: 'Lucas',
        cpf: '15741811574',
        data_nascimento:'23/04/2003',
        email:'Lucas@gmail.com',
        senha: '123456',
        habilitado: 'sim'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Lucas');
  });

  it('DELETE - PEOPLE', async () => {
    const res = await supertest(App)
      .delete(`/api/v1/people/${people.p1._id}`);

    expect(res.statusCode).toBe(204);
  });

  it('POST - AUTHENTICATE A PEOPLE', async ()=> {
    const res = await supertest(App)
      .post('/api/v1/authenticate')
      .send({		
        email:'mariasilva@gmail.com',
        senha: '050809',
      });
    expect(res.statusCode).toBe(200);
  });
});