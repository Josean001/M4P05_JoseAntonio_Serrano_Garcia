// Verificar si el navegador soporta la geolocalización
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Inicializar el mapa centrado en las coordenadas obtenidas
            const map = L.map('map').setView([lat, lon], 15);

            // Cargar la capa base de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Agregar un marcador en la ubicación del usuario
            L.marker([lat, lon]).addTo(map)
                .bindPopup("Tu ubicación actual")
                .openPopup();
        },
        function (error) {
            console.error("Error obteniendo la ubicación: ", error.message);
            alert("No se pudo obtener la ubicación.");
        }
    );
} else {
    alert("Tu navegador no soporta la geolocalización.");
}