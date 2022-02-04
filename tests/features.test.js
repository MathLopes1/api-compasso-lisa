/* eslint-disable no-undef */
/*const supertest = require('supertest');
const App = require('../src/app.js');

describe('test-Feature', () => {
  //Tests peoples
  it('GET PEOPLE', async ()=>{
    const res = await supertest(App).get('/api/v1/people/');

    expect(res.statusCode).toBe(200);
  });

  it('POST PEOPLE', async ()=> {
    const res = await supertest(App)
      .post('/api/v1/people')
      .send({
        nome: 'Matheus Lopes da Silva',
        cpf: '13384049462',
        data_nascimento:'07/08/2000',
        email:'matheus.lopes@gmail.com',
        senha: '206439',
        habilitado: 'sim'
      });

    expect(res.statusCode).toBe(201);
  });

  it('DELETE PEOPLE', async () => {
    const res = await supertest(app)
      .delete('/api/v1/people/61f9af3b9cbbf2c251417b67');

    expect(res.statusCode).toBe(204);
  });

  it('UPDATED PEOPLE', async () => {
    const res = await supertest(app)
      .put('/api/v1/people/61f9af3b9cbbf2c251417b67')
      .send({
        namo: 'Maria Silva'
      });

    expect(res.statusCode).toBe(200);
  });

  //Tests cars
  it('GET CAR', async ()=>{
    const res = await supertest(App).get('/api/v1/car');

    expect(res.statusCode).toBe(200);
  });

  it('POST CAR', async ()=> {
    const res = await supertest(App)
      .post('/api/v1/car')
      .send({
        modelo: 'GM S10 2.8',
        cor:'amarela',
        ano:'2021',
        acessorios: [
          'descricao: quatro portas'
        ],
        quantidadePassageiros: 5,
      });
  
    it('DELETE CAR', async () => {
      const res = await supertest(app)
        .delete('/api/v1/car/61f9af3b9cbbf2c251417b67');
    
      expect(res.statusCode).toBe(204);
    });
    
    it('UPDATED CAR', async () => {
      const res = await supertest(app)
        .put('/api/v1/car/61f9af3b9cbbf2c251417b67')
        .send({
          modelo: 'Ford Car 2000'
        });
    
      expect(res.statusCode).toBe(200);
    });

    expect(res.statusCode).toBe(201);
  });



  //test authenticação
  it('AUTHENTICATE', async ()=> {
    const res = await supertest(App)
      .post('/api/v1/authenticate')
      .send({
        email: 'joazinhoobb@email.net',
        senha: '123456'
      });

    expect(res.statusCode).toBe(200);
  });

});*/