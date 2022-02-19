const mongoose = require('mongoose');
const supertest = require('supertest');
const App = require('../app/app.js');
const rentalService = require('../../src/app/service/rentalService.js');

const rental = {};

describe('Test-Feature-Rental', () => {
  beforeAll(async () => {
    rental.r1 = await rentalService.create({
      nome: 'Banco',
      cnpj: '45308270000100',
      atividades: 'Guardar e emprestar Dinheiro',
      endereco: [
        {
          cep: '52031210',
          number: '20',
          complemento: 'Fé',
          isFilial: false
        }
      ]
    });

    rental.r2 = await rentalService.create({
      nome: 'Barra Matheus',
      cnpj: '73854811000123',
      atividades: 'Emprestar coisas',
      endereco: [
        {
          cep: '52031220',
          number: '17',
          complemento: 'Ao lado do quartel',
          isFilial: true
        }
      ]
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET - RENTAL', async () => {
    const res = await supertest(App).get('/api/v1/rental');
    expect(res.statusCode).toBe(200);
  });

  it('GET - RENTAL(INVALID)', async () => {
    const res = await supertest(App).get('/api/v1/rentals');
    expect(res.statusCode).toBe(404);
  });

  /*------------------------------------------------------------------------------------------------------------*/

  it('GET ID - RENTAL', async () => {
    const res = await supertest(App).get(`/api/v1/rental/${rental.r1._id}`);
    expect(res.statusCode).toBe(200);
  });

  it('GET ID - RENTAL(NOT FOUND)', async () => {
    const res = await supertest(App).get(`/api/v1/rental/620ebf227ce3f1fc44f00920`);
    expect(res.statusCode).toBe(404);
  });

  /*-------------------------------------------------------------------------------------------------------------*/

  it('POST RENTAL', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: 'Barra Lopes',
        cnpj: '88088301000160',
        atividades: 'Venda de Automóveis',
        endereco: [
          {
            cep: '51020970',
            number: '69',
            complemento: 'Capuceiro de dentro',
            isFilial: true
          }
        ]
      });

    expect(res.statusCode).toBe(201);
  });

  it('POST RENTAL - (BAD REQUEST)', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: '',
        cnpj: '',
        atividades: '',
        endereco: [
          {
            cep: '',
            number: '',
            complemento: '',
            isFilial: true
          }
        ]
      });

    expect(res.statusCode).toBe(400);
  });

  it('POST - RENTAL(CONFLICT CNPJ)', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: 'Casa de Rebeca',
        cnpj: '88088301000160',
        atividades: 'Igreja',
        endereco: [
          {
            cep: '52031210',
            number: '100',
            complemento: 'Perto da rua B',
            isFilial: true
          }
        ]
      });

    expect(res.statusCode).toBe(409);
  });

  it('POST - RENTAL(INVALID CEP)', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: 'Maria luiza',
        cnpj: '50988389000101',
        atividades: 'Casa própria',
        endereco: [
          {
            cep: '6076180',
            number: '10',
            isFilial: true
          }
        ]
      });
    expect(res.statusCode).toBe(400);
  });

  /*-------------------------------------------------------------------------------------------------------------*/

  it('PUT RENTAL', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/${rental.r1._id}`)
      .send({
        nome: 'Casa do Celson',
        cnpj: '50988389000101',
        atividades: 'Protético',
        endereco: [
          {
            cep: '52031210',
            number: '17',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(200);
  });

  it('PUT - RENTAL(NOT FOUND)', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/620ebf227ce3f1fc44f00920`)
      .send({
        nome: 'Casa do Celson',
        cnpj: '50988389000101',
        atividades: 'Protético',
        endereco: [
          {
            cep: '52031210',
            number: '17',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(200);
  });

  it('PUT - RENTAL(FORMAT ID)', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/620ebf227ce3f1fc4`)
      .send({
        nome: 'Casa do Celson',
        cnpj: '50988389000101',
        atividades: 'Protético',
        endereco: [
          {
            cep: '52031210',
            number: '17',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(400);
  });

  it('PUT -  RENTAL(BAD REQUEST)', async () => {
    const res = await supertest(App)
      .put(`/api/v1/people/${rental.r1._id}`)
      .send({
        nome: '',
        cnpj: '',
        atividades: '',
        endereco: [
          {
            cep: '',
            number: '',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(400);
  });

  /*------------------------------------------------------------------------------------------------------------*/

  it('DELETE RENTAL', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/${rental.r1._id}`);
    expect(res.statusCode).toBe(204);
  });

  it('DELETE - RENTAL(NOT FOUND)', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/620d685eb6e5201f85449ed8`);
    expect(res.statusCode).toBe(404);
  });

  it('DELETE - RENTAL(FORMAT ID)', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/620ebf227ce3f1fc44`);
    expect(res.statusCode).toBe(400);
  });
});
