# CRUD para Posts de Blog

Este documento serve como um guia a configuração e execução do sistema CRUD de posts de um blog, elaborado como parte de uma atividade da disciplina de Engenharia de Software. O sistema é composto por uma aplicação servidor, uma interface cliente e um script seeder para a geração de dados fictícios.

![Screenshot de demonstração](images/shot.png "Screenshot de demonstração")

## Estrutura Tecnológica

- **Servidor**: Implementado em Node.js.
- **Cliente**: Desenvolvido utilizando React Next e a biblioteca de componentes SHADCN UI.
- **Dados Fictícios**: Geração realizada por meio de um script em Python utilizando a biblioteca Faker.

## Procedimentos de Configuração e Execução

### Configuração do Servidor

Para iniciar a aplicação do servidor, execute os seguintes passos:

1. Acesse o diretório do servidor:
   ```bash
   cd server

2. Instale as dependências (considerando a utilização do npm):
   ```bash
   npm install

3. Inicie a aplicação utilizando Node.js:
   ```bash
   node server.js

### Configuração do Cliente
Para execução do projeto `Next.js`:

1. Acesse o diretório do cliente:
   ```bash
   cd client

2. Instale as dependências:
   ```bash
   npm install

3. Inicie a aplicação React Next:
   ```bash
   npm run dev

### Seeder de Dados
Para popular o banco de dados com posts fictícios, siga as instruções abaixo:

1. Acesse o diretório do seeder:
   ```bash
   cd seeder

2. Execute o script de geração de dados:
    ```bash
    python -m venv venv
    python seeder.py
    source venv/bin/activate # Ou venv\Scripts\activate no Windows

3. Instale as dependências:
    ```bash
    pip install -r requirements.txt # ou apenas pip install Faker

4. Execute o script de geração de dados:
    ```bash
    python src.py


