// Fungsi untuk mengunggah dan menampilkan file KML/KMZ di peta
function uploadKMLKMZ(event) {
    const file = event.target.files[0]; // Ambil file yang diunggah
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        if (file.name.endsWith('.kml')) {
            const kmlLayer = new L.KML(content);
            map.addLayer(kmlLayer);
        } else if (file.name.endsWith('.kmz')) {
            const kmzLayer = new L.KMZLayer(content);
            map.addLayer(kmzLayer);
        }
    };
    reader.readAsText(file);
}