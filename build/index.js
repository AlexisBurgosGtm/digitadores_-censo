﻿var socket = io();

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
}

if ('Notification' in window) {};

function requestPermission() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!');
    return;
  }
  
  Notification.requestPermission(function (result) {
    //$status.innerText = result;
  });
}

InicializarServiceWorkerNotif();

// LISTENER DE LOS BOTONES DEL MENU
let btnMenuInicioSalir = document.getElementById('btnMenuInicioSalir');
btnMenuInicioSalir.addEventListener('click',()=>{
    classNavegar.login();
});


classNavegar.login();


//
// DESHABILITA EL PULL TO REFRESH

var lastTouchY = 0;
var preventPullToRefresh = false;

$('body').on('touchstart', function(e) {
    if (e.originalEvent.touches.length != 1) {
        return;
    }
    lastTouchY = e.originalEvent.touches[0].clientY;
    preventPullToRefresh = window.pageYOffset == 0;
});

$('body').on('touchmove', function(e) {
    var touchY = e.originalEvent.touches[0].clientY;
    var touchYDelta = touchY - lastTouchY;
    lastTouchY = touchY;
    if (preventPullToRefresh) {
        // To suppress pull-to-refresh it is sufficient to preventDefault the first overscrolling touchmove.
        preventPullToRefresh = false;
        if (touchYDelta > 0) {
            e.preventDefault();
            return;
        }
    }
});
