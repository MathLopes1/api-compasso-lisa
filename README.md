![Inserir um título (2)](https://user-images.githubusercontent.com/70352508/151679574-e878d468-74d7-4b01-b709-422860c62972.png)


## Descrição do Projeto
A compasso entrou em um novo ramo de mercado, a compasso lisa um seguimento carros para alugar de luxo e semi luxo. Para isso, foi necessário o desenvolvilmento de uma API para ajudar com as atividades da empresa

### 🛠 Tecnologias
As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.postman.com/)
- [MongoDB](https://www.mongodb.com/)
- [Swagger](https://swagger.io/)

### Pré-requisitos
É importante a instalação das tecnologias utilizadas descritas acima. Além disso, é preciso um editor para trabalhar com o código. Utilizamos o [VSCode](https://code.visualstudio.com/)

#### Passos
Antes de testar as rotas, é importante seguir alguns passos:

```bash
# Clone este repositório
$ git clone https://github.com/MathLopes1/api-compasso-lisa.git

# Acesse a pasta do projeto no terminal/cmd
$ cd api-compass-lisa

# Instale as dependências
$ npm install

# Instale as dev dependências
$ npm install --save-dev

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# Execute a aplicação em modo de produção
$ npm run start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```
### Features

- [x] Criar um endpoint para cadastrar um carro.
- [x] Criar um endpoint para listar carros.
- [x] Criar um endpoint para atualizar um carro.
- [x] Criar um endpoint para deletar um carro.
- [x] Criar um endpoint para cadastrar uma pessoa.
- [x] Criar um endpoint para listar pessoas.
- [x] Criar um endpoint para atualizar uma pessoa.
- [x] Criar um endpoint para deletar uma pessoa.
- [x] Validações
- [x] Rota de autenticação de usúario. 
 
 # 🚗 Rotas de Carros

POST(Cadastrar carros) - `http://localhost:3000/api/v1/car`

 ```bash
  { 
    "modelo": "GM S10 2.8",
    "cor": "branco",
     "ano": "2021",
     "acessorios": [
                    { "descricao": "Ar-condicionado" },
                    { "descricao": "Dir. Hidráulica" },
                    { "descricao": "Cabine Dupla" },
                    { "descricao": "Tração 4x4" },
                    { "descricao": "4 portas" },
                    { "descricao": "Diesel" },
                    { "descricao": "Air bag" },
                    { "descricao": "ABS" }
                 ],
    "quantidadePassageiros": 5
}
 ```
 
GET(Listar carros) -  `http://localhost:3000/api/v1/car` <br>
GET(Listar por ID) - `http://localhost:3000/api/v1/car/{id}` <br>
GET(Listar por query) - `http://localhost:3000/api/v1/car/?cor=branco`

 ```bash
{  
  "Veiculos":[ 
     {
       "modelo": "GM S10 2.8",
       "cor": "branco",
       "ano": "2021",
       "acessorios": [
                       { "descricao": "Ar-condicionado" },
                       { "descricao": "Dir. Hidráulica" },
                       { "descricao": "Cabine Dupla" },
                       { "descricao": "Tração 4x4" },
                       { "descricao": "4 portas" },
                       { "descricao": "Diesel" },
                       { "descricao": "Air bag" },
                       { "descricao": "ABS" }
                   ],
      "quantidadePassageiros": 5
      },
   "total": 3464,
   "limit": 100,
   "offset": 1,
   "offsets": 35
}
 ```
PUT(Atualizar um carro) - `http://localhost:3000/api/v1/car/{id}`

```bash
{
  "modelo": "GM S10 2.8",
  "cor": "branco",
  "ano": "2021",
  "acessorios": [
                  { "descricao": "Ar-condicionado" },
                  { "descricao": "Dir. Hidráulica" },
                  { "descricao": "Cabine Dupla" },
                  { "descricao": "Tração 4x4" },
                  { "descricao": "4 portas" },
                  { "descricao": "Diesel" },
                  { "descricao": "Air bag" },
                  { "descricao": "ABS" }
                 ],
   "quantidadePassageiros": 5
}
```
DELETE(Deletar um carro) - `http://localhost:3000/api/v1/car/{id}`

# 😄 Rotas de Pessoas

POST(Cadastrar pessoas) - `http://localhost:3000/api/v1/car`

 ```bash
{
  "nome": "joaozinho ciclano",
  "cpf": "131.147.860-49",
  "data_nascimento": "03/03/2021",
  "email": "joazinho@email.com",
  "senha": "123456",
  "habilitado": "sim"
}
 ```
GET(Listar Pessoas) - `http://localhost:3000/api/v1/people` <br>
GET(Listar por ID) - `http://localhost:3000/api/v1/people/{id}` <br>
GET(Listar por query) - `http://localhost:3000/api/v1/people/?cor=branco`

```bash
{ 
 "Pessoas" : [
               "nome": "joaozinho ciclano",
               "cpf": "131.147.860-49",
               "data_nascimento": "03/03/2021",
               "email": "joazinho@email.com",
               "senha": "123456",
               "habilitado": "sim"
            ],
   "total": 3464,
   "limit": 100,
   "offset": 1,
   "offsets": 35
}
 ```
 PUT(Atualizar Pessoas) - `http://localhost:3000/api/v1/people/{id}`

 ```bash
   É Possível a buscar por Id e query params.

{ 
 "Pessoas" :{
               "nome": "joaozinho ciclano",
               "cpf": "131.147.860-49",
               "data_nascimento": "03/03/2021",
               "email": "joazinho@email.com",
               "senha": "123456",
               "habilitado": "sim"
             }
}
```
DELETE(Deletar um carro) - `http://localhost:3000/api/v1/car/{id}`

# 🔒 Rota de Autenticação
POST(Autenticar usuário) - `http://localhost:3000/api/v1/authenticate`
```bash
 Caso o email ou a senha não seja de uma pessoa cadastrada, a autenticação falhará.
{
  "email": "joazinho@email.com",
  "senha": "123456"
}
```
## Desenvolvedor :man_technologist::trophy:	
<b>Maheus Lopes da Silva</b> <br>
<p>Bolsista da Compass, desenvolvi essa API como resposta para o desafio final do programa. Agradeço muito pela oportunidade de evoluir nesse programa de bolsas. Foi uma etapa muito importante na minha vida, me mostrando um rumo de estudos a seguir.</p> #DreamBigger

## Agradecimentos
Sou extremamente grato aos nossos instrutores e líderes por todo suporte, conhecimento, incentivos e alertas.

* Felipe Silva
* Thais Nicodemus
* Diego Bueno
* Bruna Santos
* Giovanni Hoffmann
* Gabriel Missio 

# 📑 Licença

Repositório licenciado pelo MIT

```bash
MIT License

Copyright (c) 2022 Matheus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
