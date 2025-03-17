# AZ Full Stack Test

Este é um projeto de teste para avaliar habilidades em desenvolvimento full stack.

<!--
> Este é um projeto de teste para avaliar habilidades em desenvolvimento full stack. -->

## Índice

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Observações](#observacoes)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Começando](#começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Executando a API (Backend)](#executando-a-api-backend)
  - [Executando o Front-end](#executando-o-front-end)
- [Documentação da API](#documentação-da-api)
- [Estrutura e Organização do Código](#estrutura-e-organização-do-código)
  - [Backend (API)](#backend-api)
  - [Frontend](#frontend)
- [Contato](#contato)

## Estrutura do Projeto

O projeto é composto por duas partes principais: o backend (API) em NodeJS e o frontend em ReactJS e TypeScript.

```plaintext
.gitignore
nodemon.json
package.json
README.md
front/ # Frontend ReactJS e TypeScript.
src/
    app.js
    routes.js
    server.js
    app/
        controllers/
            DashboardsController.js
            SessionsController.js
        middlewares/
            auth.js
            validator.js
        models/
    config/
        auth.js
        database.js
    database/
        index.js
    utils/
        utils.js
```

## Observações

### Backend

Algumas implementações e ajustes que precisei fazer para conseguir o resultado esperado:

- `SessionsController`: Eu verifiquei que no UserSchema existe o objeto `services.password.bcrypt` que é responsável por criptografar a senha de maneira segura para funcionar corretamente, porém precisei alterar o parâmetro de comparação para `services.password` pois `services.password.bcrypt` não era retornado.

Log do retorno do `user` no console:

```
{
  profile: {
    roles: [],
    name: 'Usuário Teste',
    perfil: 'Cliente',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2ZjRlOTZjOGZjODU4OGU2IiwiaWF0IjoxNjQ3NDUyMDYyLCJleHAiOjI1MTE0NTIwNjJ9.E429jtxB6DLvOpOHu0nNXwIdVPIPTJQmfF5uE_n3Lv4'
  },
  emails: [ { address: 'teste@azape.co', verified: true } ],
  _id: '76f4e96c8fc8588e6',
  services: {
    password: '$2b$10$kO2WZc66cQIOM40kp2eJIetwCvKcTUD8i74vA9TWp/rC4lwHEWVd6'
  },
  createdAt: 2022-03-16T17:34:22.290Z,
  updatedAt: 2025-03-11T19:23:49.635Z,
  __v: 1,
  seller_id: '76f4e96c8fc8588e6'
}
```

Modificação na condição de comparação

```sh
    //Valida se a senha está correta
      if (!(await bcrypt.compare(newPassword, user.services.password))) {
        return res.status(401).json({
          error: true,
          message: 'A senha digitada está incorreta. Tente novamente ou recupere a sua senha.'
        });
      }
```

- `middlewares/validator.js`: Implementei um padrão de validação para tratar as queries de requisição da API, isso pode ajudar no momento de escala e para melhorar a experiência do usuário.

- `controllets/DashboardsController.js`: é responsável por gerenciar as requisições relacionadas ao dashboard do usuário autenticado. A seguir, uma análise detalhada da estrutura do código e as razões por trás de suas implementações, com foco em escalabilidade e otimização. Utilizei alguns métodos do Mongoose para realizar consultas e manipulação de dados mais eficientes utilizando o método `aggregate` por exemplo. A ideia é que o usuário possa filtrar os dados de acordo com as suas necessidades sem sobrecargas no servidor com loopings e consultas desnecessárias.

### Frontend

Como conversei com a Larissa, justo essa semana eu estava de mudança para a casa nova, e com apenas 2 dias para concluir o teste o maior desafio seria o prazo diante da situação.

Por isso vou deixar alguns detalhes sobre pontos que poderiam estar melhores:

- Layout: O layout não está otimizado para dispositivos móveis, o que pode afetar a experiência do usuário em telas menores, embora, entendi no doc do teste que o foco era o web desktop.

- Tabela: A Tabela não está responsiva e faltam alguns detalhes de layout para ser fiel ao layout do Figma. Além disso preciso melhorar os componentes de Tabela para serem aproveitadas em outras situações com a mesma estrutura de layout e funcionalidades.

## Começando

### Pré-requisitos

- Node.js
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/digitalelvis/az-fullstack-test
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd az-fullstack-test
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

### Executando a API (Backend)

1. Ainda no diretório `az-fullstack-test`:
   ```sh
   cd az-fullstack-test
   ```
2. Inicie o servidor:
   ```sh
   npm start
   ```

### Executando o Front-end

1. Navegue até o diretório `front`:
   ```sh
   cd front
   ```
2. Inicie o servidor de desenvolvimento:
   ```sh
   npm start
   ```

## Documentação da API

### Endpoints

#### Sessão

- **POST /proof/session**

  Cria uma nova sessão de usuário (login).

  **Parâmetros:**

  - `email` (string): O e-mail do usuário.
  - `password` (string): A senha do usuário.

  **Resposta de Sucesso:**

  - `200 OK`: Retorna o perfil do usuário, e-mail, token e ID do usuário.

  **Resposta de Erro:**

  - `401 Unauthorized`: Usuário não encontrado ou senha incorreta.
  - `500 Internal Server Error`: Erro no servidor.

#### Dashboard

- **GET /proof/dashboard**

  Obtém os dados do dashboard para o usuário autenticado.

  **Parâmetros de Query:**

  - `page` (number, opcional): Número da página para paginação.
  - `limit` (number, opcional): Número de itens por página.
  - `start_date` (string, opcional): Data de início para filtro (formato ISO).
  - `end_date` (string, opcional): Data de término para filtro (formato ISO).

  **Resposta de Sucesso:**

  - `200 OK`: Retorna as estatísticas agregadas e a lista de pedidos.

  **Resposta de Erro:**

  - `500 Internal Server Error`: Erro no servidor.

### Exemplo de Requisição

#### POST /proof/session

```sh
curl -X POST http://localhost:3333/proof/session \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "teste@azape.com",
    "password": "123456"
  }'
```

## Estrutura e Organização do Código

### Backend (API)

O backend é responsável por fornecer a API para o frontend e gerenciar a lógica de negócios. A estrutura do backend é a seguinte:

- `app.js`: Arquivo principal que inicializa o servidor.
- `routes.js`: Define as rotas da aplicação.
- `server.js`: Configurações do servidor.
- `app/controllers/`: Contém os controladores que gerenciam as requisições.
- `app/middlewares/`: Contém os middlewares para autenticação e validação.
- `app/models/`: Contém os modelos de dados.
- `config/`: Contém as configurações de autenticação e banco de dados.
- `database/`: Contém a configuração e inicialização do banco de dados.
- `utils/`: Contém utilitários e funções auxiliares.
- `front/`: Applicativo Cliente para o Frontend utilizando ReactJS e TypeScript.

### Frontend

O frontend é responsável pela interface do usuário e comunicação com a API. Utilizei o framework React com TypeScript para desenvolver a interface do usuário e padronizei o uso de componentes e hooks para facilitar a manutenção e escalabilidade.

- `build/`: Contém os arquivos gerados após a construção do projeto.
- `src/`: Contém os arquivos fonte do frontend.
  - `apis/`: Estruturação de requisições e respostas da API.
  - `assets/`: Contém imagens e SVGs.
  - `components/`: Contém os componentes para facilitar o reuso na aplicação.
  - `config/`: Provisóriamente para definir algumas variáveis globais até que possam ser dinâmicas.
  - `interfaces/`: Tipagem de dados para garantir conssistência e simplificar o uso através de propriedades.
  - `layout/`: Estruturação de arquivos do tema
  - `pages/`: Conteúdo e lógica de cada página.
  - `routes/`: Rotas da aplicação e proteção de rotas.
  - `storage/`: Gerenciamento de estados globais de usuário autenticado e futuras implementações.

## Contato

Para mais informações, entre em contato com [elvislopesdigital@gmail.com](mailto:elvislopesdigital@gmail.com).
