<h1 align='center'>Projeto Blog IFPB</h1>

<p align="center"><i>O projeto contempla a nota da disciplina Linguagens de Programação 2</i></p>

<p align="center"><img alt="Static Badge" src="https://img.shields.io/badge/state-in_development-green"></p>
<br>

Esse repositório contém o trabalho de uma equipe de estudantes auxiliada por um professor experiente na área. Este é apenas um projeto amador e iniciante, futuras intenções com implementações ainda devem ser analizadas.

Se gostou, clique na ⭐

Para utilizar o projeto siga os passos abaixo.

## Configurações 

![Javascript](https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F)
![Nodejs](https://img.shields.io/badge/Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-f5f5f5?style=for-the-badge&logo=prisma&logoColor=black)

### Dependências de Desenvolvimento

- Nodemon
- Prisma
<br>

### Instalação das Dependências

Para instalar as dependências do projeto, você deve executar o seguinte comando no terminal:

    $ npm install

[Package.json]('https://github.com/JoaoVictorDevMeta/Blog-IFPB-ProjetoLP2-Server/blob/main/package.json') Para saber mais sobre as dependências.
<br>

### Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para credenciais sensíveis e valores que podem ser facilmente editados. Basta seguir o `.env.example` presente no repositório

```env
NODE_ENV = "development"

JWT_SECRET = your secret

BASE_URL = http://localhost:5173/

EMAIL_HOST = your host
EMAIL_SERVICE = your servie
EMAIL_PORT = your port
EMAIL_SECURE = true
EMAIL_USER = your email
EMAIL_SENHA = example

CLOUD_NAME = cloud name
CLOUD_API_KEY = example
CLOUD_SECRET = example
```

## Banco de Dados

Esse projeto utiliza o Prisma para facilitar o uso do banco de dados SQLite

Modelo Relacional do Banco de Dados disponível <a href="#">Aqui</a>

### No Projeto

Para que seja utilizado o banco de dados SQLite, primeiro, é preciso fazer sua migração.

Utilize o comando abaixo;

    $ npm run migrate

## Projeto Funcionando

Com o ambiente configurado basta utilizar o seguinte comandos em seu terminal, para que seu servidor funcione corretamente:

    $ npm run dev

caso tudo ocorra bem uma mesagem irá aparecer no console com o seguinte conteúdo:

    $ Server is running on port 3000

## 📝 Licença

Esse projeto ainda não possui uma licença

## 💬 Dúvidas

Em caso de dúvida, basta encaminhar um email para o endereço: joao.gouveia@academico.ifpb.edu.br