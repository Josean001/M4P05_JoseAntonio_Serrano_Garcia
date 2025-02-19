document.addEventListener("DOMContentLoaded", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Retrasamos la inicialización del mapa para evitar posibles errores de carga
                setTimeout(() => {
                    const map = L.map('map').setView([lat, lon], 15);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    L.marker([lat, lon]).addTo(map)
                        .bindPopup("Tu ubicación actual")
                        .openPopup();
                }, 500); // Espera 500ms antes de inicializar el mapa
            },
            (error) => {
                alert("No se pudo obtener la ubicación: " + error.message);
            }
        );
    } else {
        alert("Tu navegador no soporta la geolocalización.");
    }
});