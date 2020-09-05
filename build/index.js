//var socket = io();

let root = document.getElementById('root');
let GlobalCodUsuario = 100;
let GlobalCodSucursal = 'ME-PETEN';
let GlobalLoader  = `<div class="spinner-grow text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                      </div>
                      <div class="spinner-grow text-secondary" role="status">
                      <span class="sr-only">Loading...</span>
                      </div>
                      <div class="spinner-grow text-success" role="status">
                      <span class="sr-only">Loading...</span>
                      </div>
                      <div class="spinner-grow text-danger" role="status">
                      <span class="sr-only">Loading...</span>
                      </div>
                      <div class="spinner-grow text-warning" role="status">
                      <span class="sr-only">Loading...</span>
                      </div>
                      <div class="spinner-grow text-info" role="status">
                      <span class="sr-only">Loading...</span>
                      </div>`;

//inicializa la instalacion de la app
funciones.instalationHandlers('btnInstalarApp');




function InicializarServiceWorkerNotif(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
   navigator.serviceWorker.register('./sw.js')
    .then(registration => console.log('Service Worker registered'))
    .catch(err => 'SW registration failed'));
  };

  requestPermission();
};

if ('Notification' in window) {};

function requestPermission() {
  if (!('Notification' in window)) {
    //alert('Notification API not supported!');
    return;
  }
  
  Notification.requestPermission(function (result) {
    //$status.innerText = result;
  });
};

InicializarServiceWorkerNotif();




// inicializa la vista del censo
funciones.loadScript('./views/censo.js','root')
    .then(()=>{
        iniciarVistaVendedorCenso();
      });



