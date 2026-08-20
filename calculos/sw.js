const CACHE_NAME = 'calculos-v2';
const ASSETS = [
  './',
  './index.html', // Agora este é a sua página principal com as ferramentas
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // As 14 ferramentas internas:
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

// Instalação do Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Força a ativação imediata
});

// Ativação e remoção de caches antigos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Assume o controle das páginas abertas
});

// Interceptação de requisições (Offline support)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
