function downloadKML() {
    // Buat header KML
    let kml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    kml += '<kml xmlns="http://www.opengis.net/kml/2.2">\n';
    kml += '<Document>\n';

    // Ambil semua marker dari peta
    map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
            const latlng = layer.getLatLng();
            const color = layer.options.fillColor;                    
            
            // Tambahkan placemark untuk setiap titik
            kml += '<Placemark>\n';
            kml += `<Point><coordinates>${latlng.lng},${latlng.lat}</coordinates></Point>\n`;
            kml += `<Style><IconStyle><color>${color.replace('#', '')}</color></IconStyle></Style>\n`;
            kml += '</Placemark>\n';
        }
    });

    kml += '</Document>\n</kml>';

    // Buat dan download file
    const blob = new Blob([kml], {type: 'application/vnd.google-earth.kml+xml'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'koordinat.kml';
    link.click();
}

function downloadKMZ() {
    // Gunakan library JSZip
    const zip = new JSZip();
    
    // Buat file KML
    let kml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    kml += '<kml xmlns="http://www.opengis.net/kml/2.2">\n';
    kml += '<Document>\n';

    map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
            const latlng = layer.getLatLng();
            const color = layer.options.fillColor;
            
            kml += '<Placemark>\n';
            kml += `<Point><coordinates>${latlng.lng},${latlng.lat}</coordinates></Point>\n`;
            kml += `<Style><IconStyle><color>${color.replace('#', '')}</color></IconStyle></Style>\n`;
            kml += '</Placemark>\n';
        }
    });

    kml += '</Document>\n</kml>';

    // Tambahkan file KML ke dalam zip
    zip.file('doc.kml', kml);

    // Generate file KMZ dan download
    zip.generateAsync({type: 'blob'})
        .then(function(content) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'koordinat.kmz';
            link.click();
        });
}