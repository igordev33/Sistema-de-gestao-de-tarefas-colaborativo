# 📋 Sistema de Gestão de Tarefas Colaborativo

> Sistema completo para **gestão de tarefas em equipe**, desenvolvido para resolver problemas de organização, acompanhamento e priorização de atividades em times de TI — especialmente equipes de suporte técnico e desenvolvimento.

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?logo=fastapi)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)

---

## 📖 Sobre o Projeto

O **Sistema de Gestão de Tarefas Colaborativo** foi criado para centralizar e facilitar o controle de atividades dentro de equipes técnicas. A plataforma permite que os membros do time criem, acompanhem e priorizem tarefas em um ambiente compartilhado, com uma interface web moderna integrada a uma API RESTful segura.

A arquitetura é dividida em dois serviços independentes:

- **Backend (API REST):** desenvolvido em Python com FastAPI, responsável por toda a lógica de negócio, persistência de dados e autenticação.
- **Frontend (SPA):** desenvolvido em React com TypeScript e Vite, oferecendo uma interface responsiva e intuitiva para os usuários.

Toda a stack é orquestrada via **Docker Compose**, garantindo um ambiente de desenvolvimento e produção simples de configurar e executar.

---

## 🚀 Funcionalidades

- 📝 Criação de novas tarefas com título, descrição e prioridade
- ✅ Conclusão e atualização de status das tarefas (pendente / concluída)
- 📌 Definição de prioridade (baixa, média, alta)
- 📄 Listagem paginada de tarefas com filtros
- 🔐 Autenticação via credenciais na API (API_USER / API_PASSWORD)
- 🌐 Integração completa entre frontend e backend via variáveis de ambiente
- 🐳 Execução com Docker e Docker Compose com um único comando

---

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Descrição |
|---|---|
| **Python 3.11** | Linguagem principal do backend |
| **FastAPI** | Framework web moderno e de alto desempenho |
| **SQLAlchemy** | ORM para mapeamento objeto-relacional |
| **Uvicorn** | Servidor ASGI para execução da aplicação |
| **PostgreSQL** | Banco de dados relacional |

### Frontend
| Tecnologia | Descrição |
|---|---|
| **React 18** | Biblioteca para construção de interfaces |
| **TypeScript** | Superset tipado do JavaScript |
| **Vite** | Bundler e servidor de desenvolvimento rápido |

### Infraestrutura
| Tecnologia | Descrição |
|---|---|
| **Docker** | Containerização dos serviços |
| **Docker Compose** | Orquestração dos containers |

---

## ⚙️ Configuração das Variáveis de Ambiente

> ⚠️ **IMPORTANTE:** O projeto utiliza arquivos `.env` que **não são versionados**. É obrigatório criá-los antes de executar a aplicação.

### `frontend/.env`

```env
VITE_API_URL=http://localhost:8000
VITE_API_USER=seu_usuario
VITE_API_PASSWORD=sua_senha
```

### `backend/.env`

```env
# Banco de dados
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
DB_NAME=tarefas_db

# Credenciais da API
API_USER=seu_usuario
API_PASSWORD=sua_senha
```

---

## 🐳 Executando com Docker

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

### 1. Clone o repositório

```bash
git clone https://github.com/igordev33/Sistema-de-gestao-de-tarefas-colaborativo.git
cd Sistema-de-gestao-de-tarefas-colaborativo
```

### 2. Crie os arquivos `.env`

Crie o arquivo `backend/.env` e o `frontend/.env` conforme o exemplo da seção anterior.

### 3. Suba os containers

```bash
docker compose up --build
```

### 4. Acesse a aplicação

| Serviço | URL |
|---|---|
| **Frontend** | http://localhost:5173 |
| **Backend (API)** | http://localhost:8000 |
| **Documentação Swagger** | http://localhost:8000/docs |

---

## 🤝 Como Contribuir

1. Faça um **fork** do repositório
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Faça commit das suas alterações: `git commit -m 'feat: adiciona minha feature'`
4. Faça push para a branch: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto está licenciado sob os termos definidos no arquivo [LICENSE](./LICENSE).

---

## 🎥 Demonstração do Projeto

### 📌 Parte 1 – Apresentação do Sistema
[![Assistir Parte 1](https://img.youtube.com/vi/0LIAXsPIXvU/0.jpg)](https://youtu.be/0LIAXsPIXvU)

---

### 📌 Parte 2 – Fluxo Completo da Aplicação
[![Assistir Parte 2](https://img.youtube.com/vi/JZiY-feLg1k/0.jpg)](https://youtu.be/JZiY-feLg1k)

---

<p align="center">
  Desenvolvido por <a href="https://github.com/igordev33">Igor Ferreira Sampaio</a>
</p>