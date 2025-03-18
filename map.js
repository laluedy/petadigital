var map = L.map('map').setView([-8.63395, 119.6638], 7.3);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Tambahkan elemen input untuk koordinat
        var inputContainer = L.DomUtil.create('div', 'input-container');
        inputContainer.innerHTML = `
        <input type="number" id="lat" placeholder="Latitude" step="any">
        <input type="number" id="lng" placeholder="Longitude" step="any">
        <input type="color" id="warna" value="#FF0000">
        <button id="tambahTitikBtn">Tambah Titik</button>
        `;
        document.body.insertBefore(inputContainer, document.getElementById('map'));

        // Tambahkan event listener untuk tombol
        document.getElementById('tambahTitikBtn').addEventListener('click', function() {
        var lat = parseFloat(document.getElementById('lat').value);
        var lng = parseFloat(document.getElementById('lng').value);
        var warna = document.getElementById('warna').value;
        if (!isNaN(lat) && !isNaN(lng)) {
            tambahTitik(lat, lng, warna);
        } else {
            alert('Masukkan koordinat yang valid');
        }
        });

        // Tambahkan gaya CSS untuk input
        var style = document.createElement('style');
        style.textContent = `
        .input-container {
            margin-bottom: 10px;
        }
        .input-container input, .input-container button {
            margin-right: 5px;
        }
        `;
        document.head.appendChild(style);
        // Fungsi untuk menambahkan popup ke marker
        function tambahTitik(lat, lng, warna, keterangan) {
        var marker = L.circleMarker([lat, lng], {
            radius: 4,
            fillColor: warna,
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        
        // Tambahkan popup dengan keterangan
        marker.bindPopup(keterangan);
    }