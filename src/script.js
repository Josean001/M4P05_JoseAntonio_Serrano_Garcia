let map;
let userMarker;
let userLat, userLon;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      userLat = position.coords.latitude;
      userLon = position.coords.longitude;

      // Mostrar la ubicación en el párrafo
      document.getElementById(
        "location-info"
      ).textContent = `Tu ubicación: Latitud ${userLat.toFixed(
        6
      )}, Longitud ${userLon.toFixed(6)}`;

      // Habilitar el botón
      document.getElementById("center-button").disabled = false;

      // Inicializar el mapa
      map = L.map("map").setView([userLat, userLon], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Agregar un marcador en la ubicación del usuario
      userMarker = L.marker([userLat, userLon])
        .addTo(map)
        .bindPopup("Tu ubicación actual")
        .openPopup();
    },
    function (error) {
      console.error("Error obteniendo la ubicación: ", error.message);
      document.getElementById("location-info").textContent =
        "No se pudo obtener la ubicación.";
    }
  );
} else {
  document.getElementById("location-info").textContent =
    "Tu navegador no soporta la geolocalización.";
}

// Función para centrar el mapa en la ubicación del usuario
document.getElementById("center-button").addEventListener("click", function () {
  if (map && userLat && userLon) {
    map.setView([userLat, userLon], 15);
  }
});
