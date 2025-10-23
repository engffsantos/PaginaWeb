# EasyData360 — Landing Page e Blog (PT‑BR)

Landing page moderna e SPA com blog integrado, painel de gestão e backend conectado ao Turso (libSQL).

## Recursos

- UI moderna e responsiva (Tailwind) com navegação SPA (React + TypeScript).
- Blog público com lista, busca, categorias e página de detalhe.
- Painel de gestão do blog (login) para criar, editar, publicar e agendar posts.
- Preview Markdown → HTML em tempo real no painel (criação e edição).
- Backend Express com autenticação via JWT, banco Turso (libSQL) e rotas REST.

## Stack Técnica

- Frontend: React 19, TypeScript, Vite 6, Tailwind via CDN.
- Backend: Node/Express, JWT, cookie HTTP‑only, bcryptjs, zod.
- Banco: Turso (libSQL) via `@libsql/client`.

## Estrutura do Projeto

```
/
├─ api/                         # Backend (Express)
│  ├─ index.js                  # App Express (exportado p/ serverless)
│  ├─ server.js                 # Listener local (porta 3001)
│  ├─ db.js                     # Cliente Turso/libSQL e migrations
│  ├─ routes/
│  │  ├─ auth.js                # Login, refresh, logout, me
│  │  ├─ posts.js               # Listar, criar, atualizar, publicar, agendar, deletar
│  │  └─ categories.js          # CRUD de categorias
│  ├─ middlewares/
│  │  └─ auth.js                # requireAuth / optionalAuth
│  ├─ .env                      # Variáveis do backend (Turso, JWT, CORS)
│  └─ package.json              # Scripts do backend
├─ pages/                       # Páginas da SPA
│  ├─ BlogListPage.tsx          # Lista posts do backend
│  ├─ BlogDetailPage.tsx        # Carrega post por slug do backend
│  └─ BlogManagementPage.tsx    # Painel: criar/editar/publicar/agendar com preview
├─ components/                  # Header, Footer, Link, ícones etc.
├─ App.tsx                      # Roteador SPA (window.location)
├─ index.html                   # Entrada HTML (Tailwind via CDN + importmap)
└─ index.tsx                    # Bootstrap React
```

## Como Rodar Localmente

Pré‑requisitos:
- Node.js 20+ (o projeto inclui uma cópia portátil em `.tools/`, opcional)

1) Backend (API)
- Copie `api/.env.example` para `api/.env` e preencha:
  - `blog_TURSO_DATABASE_URL=libsql://<sua-instancia>.turso.io`
  - `blog_TURSO_AUTH_TOKEN=<seu-token>`
  - `JWT_SECRET=<uma-chave-segura>`
  - `CORS_ORIGINS=http://localhost:5173,http://localhost:3000`
- Instale deps e inicie:
```
cd api
npm install
npm run dev     # sobe em http://localhost:3001
```
- Healthcheck: `GET http://localhost:3001/health`

2) Frontend
```
npm install
npm run dev     # Vite em http://localhost:5173 (ou 3000)
```

Credenciais de demonstração (seed):
- Email: `admin@easydata360.com`
- Senha: `admin123`

## Variáveis de Ambiente (API)

- `blog_TURSO_DATABASE_URL` e `blog_TURSO_AUTH_TOKEN`: credenciais do Turso (preferenciais).
- `TURSO_DATABASE_URL` e `TURSO_AUTH_TOKEN`: alternativas lidas por `api/db.js`.
- `JWT_SECRET`: segredo para assinar tokens.
- `CORS_ORIGINS`: lista de origens permitidas, separadas por vírgula.
- `NODE_ENV`: `development` ou `production`.

## Endpoints Principais (API)

- Autenticação (`/auth`)
  - `POST /login` — faz login (cookies HTTP‑only)
  - `POST /logout` — encerra sessão
  - `GET /me` — retorna usuário autenticado
- Posts (`/posts`)
  - `GET /` — lista (filtros e paginação); anônimos veem “published”
  - `GET /:slug` — detalhe do post
  - `POST /` — criar (autor)
  - `PUT /:id` — atualizar (autor/editor/admin)
  - `PATCH /:id/publish` — publicar (editor/admin)
  - `PATCH /:id/schedule` — agendar publicação (editor/admin)
  - `DELETE /:id` — remover (regras por papel)
- Categorias (`/categories`) — listar e CRUD (regras por papel)

## Observações de Deploy (Vercel)

- Em `api/index.js` o app é exportado (não usar `app.listen`).
- A pasta `/api` da Vercel já fornece o prefixo `/api` nas rotas.
- Evite usar `file:` como storage em serverless; use Turso remoto.

## Licença e Contribuição

- Projeto interno da EasyData360. Contribuições via PR são bem‑vindas.
- Padronize commits (ex.: Conventional Commits) e descreva claramente mudanças no PR.
