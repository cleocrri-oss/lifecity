const mapa = L.map('mapa').setView([-21.245, -45.0], 15); // começa em Lavras
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);

let marcador = null;

document.getElementById('btn-localizar').addEventListener('click', () => {
  if (!('geolocation' in navigator)) {
    alert('Seu navegador não suporta geolocalização.');
    return;
  }
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude, accuracy } = pos.coords;
    const ponto = [latitude, longitude];
    if (marcador) marcador.setLatLng(ponto);
    else marcador = L.marker(ponto).addTo(mapa);
    mapa.setView(ponto, 17);
    console.log(`Precisão: ${Math.round(accuracy)} m`);
  }, erro => alert('Não foi possível obter sua localização: ' + erro.message),
  { enableHighAccuracy: true, timeout: 10000 });
});