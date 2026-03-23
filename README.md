# Site Neymar Jr — NJR 10

Site tributo estático (HTML + CSS + JS). Estrutura de pastas:

```
site_neymar/
├── css/                 # Folhas de estilo
│   ├── styles.css       # Página principal (index)
│   ├── artigo.css       # Artigo longo
│   ├── especial.css     # Página especial
│   └── paginas.css      # Sobre / Contato
├── js/
│   ├── script.js        # Interações do index (navbar, modal marcas, etc.)
│   └── contato-form.js  # Envio do formulário → POST /api/contact
├── server/              # Node.js: site estático + API de e-mail (ver server/README.md)
├── imgs/                # Imagens do projeto
├── video/               # Vídeos (página especial)
├── index.html           # Home
├── artigo.html
├── especial.html
├── sobre.html           # Sobre o autor (Kawê Henrique)
├── contato.html         # Formulário de contato (precisa do server/)
├── offline.html         # Fallback PWA sem rede
├── 404.html
├── manifest.webmanifest # PWA
├── sw.js                # Service Worker
├── sitemap.xml
└── robots.txt
```

## Caminhos importantes

- **CSS:** `css/nome.css` (referenciado a partir da raiz do site).
- **JS:** `js/script.js` (apenas o `index.html` carrega; artigo e especial usam scripts inline quando necessário).
- **Mídia:** `imgs/...` e `video/...` permanecem na raiz para não quebrar centenas de referências nas páginas.

## Desenvolvimento

Abra `index.html` no navegador ou sirva a pasta com um servidor HTTP local (recomendado para vídeos e PWA).

### Formulário de contato

O arquivo `contato.html` envia mensagens para `POST /api/contact`. Para funcionar:

1. Entre em `server/`, rode `npm install`, copie `.env.example` para `.env` e configure SMTP + `MAIL_TO`.
2. Rode `npm start` e acesse `http://localhost:3000/contato.html`.

Em hospedagem **somente estática** (sem Node), o formulário não envia e-mail até você hospedar o `server/` ou usar outro backend.
