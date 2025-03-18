// Fungsi untuk mengunduh file KML berisi titik koordinat dari peta
function downloadKML() {
    // Membuat struktur dasar file KML
    let kml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    kml += '<kml xmlns="http://www.opengis.net/kml/2.2">\n';
    kml += '<Document>\n';

    // Memeriksa apakah variabel 'map' sudah terdefinisi
    if (typeof map !== 'undefined') {
        // Mengiterasi semua layer pada peta untuk mencari titik koordinat
        map.eachLayer((layer) => {
            if (layer instanceof L.CircleMarker) {
                const latlng = layer.getLatLng(); // Mengambil koordinat titik
                const color = layer.options.fillColor; // Mengambil warna titik
                const name = layer.options.title || `titik koordinat`; // Menggunakan keterangan titik jika tersedia
                const description = layer.getPopup() ? layer.getPopup().getContent() : `Koordinat: ${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`; // Menggunakan keterangan popup jika ada

                // Menambahkan informasi titik dalam format KML
                kml += '<Placemark>\n';
                kml += `<name>${name}</name>\n`; // Menampilkan nama titik koordinat
                kml += `<description><![CDATA[${description}]]></description>\n`; // Popup keterangan saat diklik
                kml += `<Style><IconStyle><color>ff${color.replace('#', '')}</color><scale>1.2</scale></IconStyle></Style>\n`; // Menentukan warna titik di Google Earth
                kml += `<Point><coordinates>${latlng.lng},${latlng.lat}</coordinates></Point>\n`; // Menentukan posisi titik
                kml += '</Placemark>\n';
            }
        });
    }

    kml += '</Document>\n</kml>';

    // Membuat dan mengunduh file KML
    const blob = new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'koordinat.kml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Fungsi untuk mengunduh file KMZ (format terkompresi KML)
function downloadKMZ() {
    const zip = new JSZip(); // Membuat objek ZIP
    let kml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    kml += '<kml xmlns="http://www.opengis.net/kml/2.2">\n';
    kml += '<Document>\n';

    // Memeriksa apakah variabel 'map' sudah terdefinisi
    if (typeof map !== 'undefined') {
        // Mengiterasi semua layer pada peta untuk mencari titik koordinat
        map.eachLayer((layer) => {
            if (layer instanceof L.CircleMarker) {
                const latlng = layer.getLatLng(); // Mengambil koordinat titik
                const color = layer.options.fillColor; // Mengambil warna titik
                const name = layer.options.title || `point`; // Menggunakan keterangan titik jika tersedia
                const description = layer.getPopup() ? layer.getPopup().getContent() : `Koordinat: ${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`; // Menggunakan keterangan popup jika ada

                // Menambahkan informasi titik dalam format KML
                kml += '<Placemark>\n';
                kml += `<name>${name}</name>\n`; // Menampilkan nama titik koordinat
                kml += `<description><![CDATA[${description}]]></description>\n`; // Popup keterangan saat diklik
                kml += `<Style><IconStyle><color>ff${color.replace('#', '')}</color><scale>1.2</scale></IconStyle></Style>\n`; // Menentukan warna titik di Google Earth
                kml += `<Point><coordinates>${latlng.lng},${latlng.lat}</coordinates></Point>\n`; // Menentukan posisi titik
                kml += '</Placemark>\n';
            }
        });
    }

    kml += '</Document>\n</kml>';

    // Menyimpan file KML dalam ZIP (KMZ)
    zip.file('doc.kml', kml);
    zip.generateAsync({ type: 'blob' }).then(function (content) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'koordinat.kmz';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}



