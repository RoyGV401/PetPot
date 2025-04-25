let latitud = 0;
let longitud = 0;

async function iniciarMap() {
    const so = await getUserLocation();
    const coord = { lat: so[0], lng: so[1] };
  
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: coord,
    });
  
    const marker = new google.maps.Marker({
      position: coord,
      map: map,
    });
  }
  
  window.onload = function () {
    iniciarMap();
  };
  
  function getUserLocation() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;
            resolve([latitud, longitud]);
          },
          (error) => {
            alert('Error al obtener la ubicación.');
            resolve([0, 0]); // Fallback if denied or failed
          }
        );
      } else {
        alert('ALERTA: Parece que su navegador no soporta geolocalización.');
        resolve([0, 0]);
      }
    });
  }
  
//Esta fución regresa un arreglo de dos valores, el primer corresponde a la latitud, y el segundo a la longitud

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
