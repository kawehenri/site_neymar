# Site Neymar Jr — NJR 10

Site tributo estático (HTML + CSS + JS). Estrutura de pastas:

```
site_neymar/
├── css/                 # Folhas de estilo
│   ├── styles.css       # Página principal (index)
│   ├── artigo.css       # Artigo longo
│   └── especial.css     # Página especial
├── js/
│   └── script.js        # Interações do index (navbar, modal marcas, etc.)
├── imgs/                # Imagens do projeto
├── video/               # Vídeos (página especial)
├── index.html           # Home
├── artigo.html
├── especial.html
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
