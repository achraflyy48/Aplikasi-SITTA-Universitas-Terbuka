// DATA DUMMY (Initial Data dengan tambahan properti gambar)
const db_bahanAjar = [
  {
    kode: "ADPU4334",
    nama: "Kepemimpinan",
    edisi: 2,
    stok: 150,
    kategori: "Non-Pendas",
    gambar: "assets/kepemimpinan.jpg",
    deskripsi: "Buku ini membahas konsep dan praktik kepemimpinan yang efektif dalam konteks pendidikan."
  },
  {
    kode: "EKMA4213",
    nama: "Manajemen Keuangan",
    edisi: 2,
    stok: 50,
    kategori: "Non-Pendas",
    gambar: "assets/manajemen_keuangan.jpg",
    deskripsi: "Buku ini membahas tentang konsep dan teknik manajemen keuangan."
  },
];

const db_tracking = [
  {
    do: "DO-2023001",
    mhs: "Adi Permana",
    status: "Sudah Diterima",
    progress: 100,
    eks: "JNE Logistics",
    tgl: "15 Okt 2023",
    jen: "Kilat",
    tot: "Rp 55.000",
  },
  {
    do: "DO-2023002",
    mhs: "Dewi Kartika",
    status: "Sedang Dikirim",
    progress: 65,
    eks: "Pos Indonesia",
    tgl: "22 Okt 2023",
    jen: "Reguler",
    tot: "Rp 32.500",
  },
  {
    do: "DO-2023003",
    mhs: "Budi Cahyadi",
    status: "Proses Packing",
    progress: 25,
    eks: "SiCepat",
    tgl: "28 Okt 2023",
    jen: "Express",
    tot: "Rp 40.000",
  },
];

// FUNGSI NAVIGASI ANTAR HALAMAN
function navigateTo(page) {
  window.location.href = page;
}

// LOGIKA LOGIN (index.html)
function processLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;

  if (email === "admin@ut.ac.id" && pass === "password789") {
    navigateTo("dashboard.html");
  } else {
    alert("Email/password yang anda masukkan salah. Silakan coba lagi.");
  }
}

// LOGIKA LOGOUT
function processLogout() {
  if (confirm("Apakah Anda yakin ingin keluar sistem?")) {
    navigateTo("index.html");
  }
}

// LOGIKA DASHBOARD (Greeting)
function updateGreeting() {
  const greetElement = document.getElementById("user-greeting");
  if (!greetElement) return;

  const h = new Date().getHours();
  let msg = "Selamat Malam";
  if (h >= 5 && h < 11) msg = "Selamat Pagi";
  else if (h >= 11 && h < 15) msg = "Selamat Siang";
  else if (h >= 15 && h < 19) msg = "Selamat Sore";

  greetElement.innerText = `${msg}, Rekan UT-Daerah!`;
}

// LOGIKA TRACKING (tracking.html)
function handleTrackingSearch() {
  const input = document
    .getElementById("track-input")
    .value.trim()
    .toUpperCase();
  const result = document.getElementById("track-result");
  const error = document.getElementById("track-error");

  if (!input) return;

  const found = db_tracking.find((x) => x.do === input);

  if (found) {
    result.classList.remove("hidden");
    error.classList.add("hidden");

    document.getElementById("t-nama").innerText = found.mhs;
    document.getElementById("t-status").innerText = found.status;
    document.getElementById("t-eks").innerText = found.eks;
    document.getElementById("t-tgl").innerText = found.tgl;
    document.getElementById("t-jen").innerText = found.jen;
    document.getElementById("t-tot").innerText = found.tot;
    document.getElementById("t-progress").style.width = found.progress + "%";
  } else {
    result.classList.add("hidden");
    error.classList.remove("hidden");
  }
}

// LOGIKA STOK (stok.html)
function renderStok() {
  const tbody = document.getElementById("stok-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  db_bahanAjar.forEach((item) => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-gray-50 transition border-b border-gray-50";

    const stokBadge =
      item.stok < 20 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600";

    tr.innerHTML = `
            <td class="p-6 font-mono text-sm font-bold text-gray-400">${item.kode}</td>
            <td class="p-6 font-bold text-gray-800">${item.nama}</td>
            <td class="p-6 text-center font-medium">${item.edisi}</td>
            <td class="p-6 text-center">
                <span class="px-4 py-1 rounded-lg font-black ${stokBadge}">${item.stok}</span>
            </td>
            <td class="p-6">
                <span class="text-[10px] font-black px-2 py-1 bg-gray-100 rounded text-gray-500 uppercase tracking-widest">${item.kategori}</span>
            </td>
            <td class="p-6 text-center">
                <button onclick="showDetail('${item.kode}')" class="text-blue-600 hover:text-blue-900 font-bold text-sm">Lihat Detail</button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

// FUNGSI DETAIL STOK
function showDetail(kode) {
  const found = db_bahanAjar.find(x => x.kode === kode);
  if (!found) return;

  document.getElementById('det-gambar').src = found.gambar || 'https://via.placeholder.com/300x400?text=No+Image';
  document.getElementById('det-judul').innerText = found.nama;
  document.getElementById('det-kode').innerText = found.kode;
  document.getElementById('det-edisi').innerText = found.edisi;
  document.getElementById('det-kategori').innerText = found.kategori;
  document.getElementById('det-stok').innerText = found.stok;
  document.getElementById('det-deskripsi').innerText = found.deskripsi || "Tidak ada deskripsi tersedia.";

  toggleModal('modal-detail-stok');
}

function submitNewStok() {
  const kode = document.getElementById("add-kode").value;
  const nama = document.getElementById("add-nama").value;
  const edisi = document.getElementById("add-edisi").value;
  const stok = document.getElementById("add-stok").value;
  const kategori = document.getElementById("add-kategori").value;

  if (!kode || !nama || !stok) {
    alert("Harap lengkapi semua data bahan ajar!");
    return;
  }

  db_bahanAjar.push({
    kode: kode.toUpperCase(),
    nama: nama,
    edisi: parseInt(edisi) || 1,
    stok: parseInt(stok),
    kategori: kategori,
    gambar: "https://via.placeholder.com/300x400?text=Cover+Baru", // Default placeholder untuk input baru
    deskripsi: "Data bahan ajar baru yang ditambahkan sistem."
  });

  renderStok();
  toggleModal("modal-add-stok");
}

// MODAL UTILITY
function toggleModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

// LOGIKA TOGGLE LAPORAN
function toggleLaporanMenu() {
  const card = document.getElementById("laporan-card");
  const submenu = document.getElementById("laporan-submenu");
  if (!card || !submenu) return;
  submenu.classList.toggle("show");
  card.classList.toggle("active");
}

// INISIALISASI HALAMAN
window.addEventListener('load', function() {
    updateGreeting();
    renderStok();
});

// Penanganan klik modal (global)
window.addEventListener('click', function(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});