
var CACHE = 'mercadosefectivoscenso';
const staticAssets = [  
  './css/vendors.bundle.css',
  './css/app.bundle.css',
  './css/.../styles.css',
  '././css/btn.css',
  './libs/leaflet/leaflet.css',
  './libs/noty/noty.min.css',
  './manifest.json',
  './js/vendors.bundle.js',
  './js/app.bundle.js',
  './js/../script.js',
  './libs/noty/noty.min.js',
  './libs/sweetalert.min.js',
  './libs/axios.min.js',
  './libs/leaflet/leaflet.js',
  //'./libs/JsStore.min.js',
  './libs/jsstore.js',
  './libs/jsstore.worker.js',
  './libs/funciones.js',
  './controllers/classNavegar.js',
  './controllers/GlobalVars.js',
  './controllers/classDb.js',
  './models/classEmpleados.js',
  './controllers/apicalls.js',
  './index.js',
  './favicon.png',
  './index.html',
   './sw.js',
   './views/vendedor/censo.js',
   './views/login/index.js'
];

self.addEventListener('install', function(evt) {
  console.log('Service worker instalado');
  evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll(staticAssets);
  }));
  
	
});


self.addEventListener('fetch', function(evt) {

  var req = evt.request.clone();
  if (navigator.onLine){
    if (req.clone().method == "GET") {
      //evt.respondWith(fromCache(evt.request));
      evt.waitUntil(update(evt.request));
    }
  }else{
    if (req.clone().method == "GET") {
      evt.respondWith(fromCache(evt.request));
      //evt.waitUntil(update(evt.request));
    }
  };

});


function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request);
  });
}

async function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request)
        .then(function (response) {
          return cache.put(request, response.clone())
                      .then(function () {
                        //console.log('Cache actualizado');
          return response;
      });
    });
  });
}
    

