const CACHE_NAME = 'calculos-v1';
const ASSETS = [
  './',
  './index.html',
  './senha.html',
  './index-principal.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // Ferramentas internas mapeadas no seu grid:
  './ferramentas/reset-5-minutos.html',
  './ferramentas/declaracao-suficiente.html',
  './ferramentas/pergunta1.html',
  './ferramentas/pergunta2.html',
  './ferramentas/pergunta3.html',
  './ferramentas/desafio-7-dias.html',
  './ferramentas/auditoria-estilo-vida.html',
  './ferramentas/orcamento-mensal.html',
  './ferramentas/orcamento-semanal.html',
  './ferramentas/pratica-diaria.html',
  './ferramentas/conversor-vergonha.html',
  './ferramentas/secao-a.html',
  './ferramentas/secao-b.html',
  './ferramentas/secao-c.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});