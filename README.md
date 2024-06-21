<h1 align='center'>Projeto Blog IFPB</h1>

<p align="center"><i>O projeto contempla a nota da disciplina Linguagens de Programação 2</i></p>

<p align="center"><img alt="Static Badge" src="https://img.shields.io/badge/state-in_development-green"></p>
<br>

Esse repositório contém o trabalho de uma equipe de estudantes auxiliada por um professor experiente na área. Este é apenas um projeto amador e iniciante, futuras intenções com implementações ainda devem ser analizadas.

Se gostou, clique na ⭐

Para utilizar o projeto siga os passos abaixo.


![Javascript](https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F)
![Nodejs](https://img.shields.io/badge/Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-f5f5f5?style=for-the-badge&logo=prisma&logoColor=black)
![PostGreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

# Configuração Necessária

### Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para credenciais sensíveis e valores que podem ser facilmente editados. Basta seguir o `.env.example` presente no repositório.

## Configuração Docker

![DOCKER](https://img.shields.io/badge/Docker-316192?style=for-the-badge&logo=docker&logoColor=white)

Caso não tenha o docker instalado na máquina, siga o [tutorial](https://medium.com/@carlosalbertors/basic%C3%A3o-de-docker-no-linux-bebc4b99ff54)

### Inicialização

Para utilizar o projeto basta utilizar utilizando um container docker basta seguir os seguintes passos.

    $   docker compose up --build

### PostgreSQL

Caso queira realizar consulta no banco de dados PostgreSQL basta entrar no bash do container executando os seguintes comandos.

    $  docker compose exec db bash
    $  psql -U root blog

## Projeto Funcionando

caso tudo ocorra bem uma mesagem irá aparecer no console com o seguinte conteúdo:

    $ Server is running on port 3000

## 📝 Licença

Esse projeto ainda não possui uma licença

## 💬 Dúvidas

Em caso de dúvida, basta encaminhar um email para o endereço: joao.gouveia@academico.ifpb.edu.br