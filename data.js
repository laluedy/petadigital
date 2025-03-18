var map = L.map('map').setView([-8.63395, 119.6638], 7.3);
        var markers = []; // Array untuk menyimpan titik koordinat

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Fungsi untuk menambahkan titik koordinat ke peta
        function tambahTitik(lat, lng, warna, keterangan) {
            var marker = L.circleMarker([lat, lng], {
                radius: 6,
                fillColor: warna,
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);
            
            marker.bindPopup(keterangan);
            marker.keterangan = keterangan.toLowerCase();
            markers.push(marker);
        }

        // Fungsi pencarian lokasi berdasarkan keterangan atau koordinat
        function cariLokasi() {
            var searchText = document.getElementById('searchInput').value.toLowerCase().trim();
            var found = false;
            
            // Pencarian dalam marker yang sudah ada
            markers.forEach(marker => {
                if (marker.keterangan.includes(searchText)) {
                    map.setView(marker.getLatLng(), 13);
                    marker.openPopup();
                    found = true;
                }
            });
            
            // Jika tidak ditemukan dalam marker, coba cari di OpenStreetMap
            if (!found) {
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length > 0) {
                            var lat = parseFloat(data[0].lat);
                            var lon = parseFloat(data[0].lon);
                            map.setView([lat, lon], 13);
                            L.marker([lat, lon]).addTo(map).bindPopup(data[0].display_name).openPopup();
                        } else {
                            alert('Lokasi tidak ditemukan');
                        }
                    })
                    .catch(error => {
                        alert('Terjadi kesalahan dalam pencarian');
                    });
            }
        }

        // Tambahkan event listener untuk tombol pencarian
        document.getElementById('searchBtn').addEventListener('click', cariLokasi);

        // Update pemanggilan fungsi tambahTitik dengan keterangan

        // Pembalakan liar......
        tambahTitik( -8.5815, 115.1285, '#FF0000', 'Pembalakan Liar. Gudang Kayu Jl. Tanah Lot, Kec. Kediri, kab. Tabanan, Bali. Proses Sidik'); //1//
        tambahTitik(-10.149644, 123.927986, '#FF0000', 'Pembalakan Liar; Surat Kepala UPTD KPH Wilayah Kota Kupang, Kabupaten Kupang dan Kabupaten Sabu Raijua Nomor : 004/01/UDLHK.1.4/2024 Tanggal 22 Oktober 2024; Terlapor : FRANSISKUS M. A. SAEBESI, SH.; Kawasan Hutan Produksi Terbatas (HPT) Sisimeni Sanam RTK 185, Lokasi  Desa  Fatukanutu Kec.Amabi  Oefeto  Kab.Kupang NTT.; Pulbaket'); //2//
        tambahTitik(-8.691418, 120.423459, '#FF0000', 'Pembalakan Liar; Lokasi  Desa  Manggarai Barat.; Laporan Informasi'); //3//
        

        // Perambahan Hutan......
        tambahTitik(-8.5335, 118.3980, '#03d643', 'Perambahan Hutan. CV.Lancar Abadi. Proses Sidik'); //1//
        tambahTitik( -8.4004, 118.0183, '#03d643', 'Perambahan Hutan. TN.Tambora. Proses Lidik'); //2//
        tambahTitik(  -9.9526, 124.2977, '#03d643', 'Perambahan Hutan Surat dari DLHK Provinsi NTT No. 522/12/DLHK.3.1/2024 Tanggal 16 Januari 2024. Proses Lidik'); //3//
        tambahTitik(-10.0064, 123.8076, '#03d643', 'Perambahan Hutan. Surat dari BBKSDA NTT No S.01/K.5/BIDTEK/KSA/1/2024.TWA Bipolo. Proses Lidik'); //4//
        tambahTitik( -8.3501, 117.9483, '#03d643', 'Perambahan Hutan. Surat nomor 522/22/BKPH-Tambora/2024 tanggal 27 Mei 2024. Doropeti Dompu. Proses Sidik'); //5//
        tambahTitik(-10.2591, 123.6156, '#03d643', 'Perambahan Hutan; surat nomor : S.365/BSILHKK/II/PFP/6/2024 Tanggal 06 Juni 2024, KHDTK Oelsonbai, Kec Maulafa, Kota Kupang. Puldasi, Proses Sidik'); //6//
        tambahTitik(-9.4926, 124.5316, '#03d643', 'Perambahan Hutan; DLHK.UPTD.KPH/LK.03/XI/2024, Komang Arya Weda Asmara; Naen, Kelurahan Tubuhue Kec.Kota Kefamenanu Kab.Timur Tengah Utara. Pulbaket'); //7//
        tambahTitik(-9.577135, 124.169605, '#03d643', 'Perambahan Hutan; Nota Dinas Kabalai KSDA NTT,No.ND.142/K.5/BIDTEK/KSA.3.1/B/11/2024; 1 November 2024; TN.Mutis Timau Kabupaten TTS. Pulbaket'); //8//

        // Kejahatan TSL.....
        tambahTitik( -8.3282, 117.8920, '#eeff05', 'Kejahatan TSL. LK.36/T.41/TU/GKM/10/2024, Dorotabe Dompu. Sudah P-21, Kejaksaan Tinggi Nusa Tenggara Barat; B - 3868/N.2.4/Eku.1/12/2024'); //1//
        tambahTitik(-8.193300, 120.493000, '#eeff05', 'Kejahatan TSL; Lokasi;  Perairan Kawasan TN.Komodo, Desa Komodo Manggarai Barat.; Operasi Pengamanan'); //2//
        tambahTitik(-8.229955, 120.478906, '#eeff05', 'Kejahatan TSL; Lokasi;  Perairan Kawasan TN.Komodo, Desa Komodo Manggarai Barat.; Operasi Pengamanan'); //3//

        // Pencemaran Lingkungan.....
        tambahTitik(-8.33960, 116.03177, '#0000FF', 'Pencemaran Lingkungan. LK.15/BPPHLHK-II/SW-3/PPNS/GKM.5.4/09/2024, PT Tiara Cipta Nirwana dan I Made Gde Putra Yasa; Dusun Gili Trawangan Desa Gili Indah Kec.Pamenang Kab.Lombok Utara Prov.NTB'); //1//

        // Perusakan Lingkungan.....
        tambahTitik(-8.822023, 115.987961, '#ff00e1', 'Perusakan Lingkungan. LK.16/BPPHLHK-II/SW-3/PPNS/GKM.5.4/10/2024; Desa Buwun Mas Kec. Sekotong Kab. Lombok Barat Prov.NTB. Proses Sidik'); //1//

        // Kebakaran Hutan......
        tambahTitik(Lat, Long, '#800000', 'Kebakaran Hutan');
        // ****** 12 ******* total  //