# LIFO Lab

Aplicativo interativo para demonstrar a estrutura de dados **Pilha (LIFO — Last In, First Out)**.

Stack: **Node.js + Express + PostgreSQL** (backend) · **React + Vite** (frontend).

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- PostgreSQL (qualquer uma das opções abaixo)

## Banco de dados (escolha uma opção)

### Opção A — PostgreSQL instalado no Windows (sem Docker)

1. Baixe o instalador em [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. Instale (porta padrão `5432`, anote a senha do usuário `postgres`)
3. Abra **SQL Shell (psql)** ou **pgAdmin** e execute:

```sql
CREATE USER lifo WITH PASSWORD 'lifo123';
CREATE DATABASE lifolab OWNER lifo;
GRANT ALL PRIVILEGES ON DATABASE lifolab TO lifo;
```

4. No `backend/.env`, use:

```
DATABASE_URL=postgresql://lifo:lifo123@localhost:5432/lifolab
```

> As tabelas são criadas automaticamente quando o backend inicia — não precisa rodar migrations manualmente.

### Opção B — PostgreSQL na nuvem (grátis, sem instalar nada)

Serviços como [Neon](https://neon.tech), [Supabase](https://supabase.com) ou [ElephantSQL](https://www.elephantsql.com/) oferecem PostgreSQL gratuito.

1. Crie um projeto e copie a **connection string**
2. Cole no `backend/.env`:

```
DATABASE_URL=postgresql://usuario:senha@host:5432/nome_do_banco?sslmode=require
```

> Serviços na nuvem costumam exigir `?sslmode=require` no final da URL.

### Opção C — Docker (se tiver instalado)

```bash
docker compose up -d
```

Credenciais: usuário `lifo`, senha `lifo123`, banco `lifolab`, porta `5432`.

## Início rápido

### 1. Configure o banco

Escolha uma das opções acima e confirme que o `backend/.env` aponta para o PostgreSQL correto.

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API disponível em `http://localhost:3001`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador.

## API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/stack` | Lista todos os itens (base → topo) |
| `GET` | `/api/stack/peek` | Observa o topo sem remover |
| `POST` | `/api/stack/push` | Empilha `{ "value": "..." }` |
| `DELETE` | `/api/stack/pop` | Remove e retorna o topo |
| `DELETE` | `/api/stack/clear` | Esvazia a pilha |

## Conceito LIFO

```
Push A → Push B → Push C     Pilha: [A, B, C]  (C no topo)
Pop  → retorna C             Pilha: [A, B]
Pop  → retorna B             Pilha: [A]
```

O último elemento inserido é sempre o primeiro removido.
