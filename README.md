# NJR 10 — Ousadia, alegria e legado

Experiência editorial independente em homenagem a Neymar Jr., construída com React, Vite, Tailwind CSS e Framer Motion.

```
site_neymar/
├── client/              # Aplicação React e pipeline de build
├── imgs/                # Masters e variantes de imagem
├── video/               # Conteúdo da página Especial
├── server/              # API SMTP opcional para desenvolvimento
├── CNAME                # ousadiayalegria.site
└── .github/workflows/   # Deploy automatizado no GitHub Pages
```

## Desenvolvimento

```bash
cd client
npm install
npm run images
npm run dev
```

O pipeline `npm run images` gera variantes AVIF, WebP e JPEG para os slots editoriais.

### Formulário de contato

Em produção, o formulário usa FormSubmit. Em desenvolvimento local, `/api/contact` é redirecionado ao servidor Express:

```bash
cd server
npm install
npm start
```

## Produção

Cada push em `main` executa o build de `client/` e publica `client/dist` no GitHub Pages, preservando o domínio `ousadiayalegria.site`.
