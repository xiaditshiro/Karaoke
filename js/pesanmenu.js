// Toggle class active untuk navbar
const navbarNav = document.querySelector('.navbar-nav');

// Ketika hamburger menu diklik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// Klik diluar side bar untuk hilangkan nav
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});


function toggleInput() {
    const orderType = document.getElementById('order_type').value;
    const mejaInputContainer = document.getElementById('meja_input');
    const ruangInputContainer = document.getElementById('ruang_input');

    if (orderType === 'meja') {
        // Menampilkan input untuk meja, menyembunyikan input untuk ruangan
        mejaInputContainer.style.display = 'block';
        ruangInputContainer.style.display = 'none';
    } else if (orderType === 'ruang') {
        // Menampilkan input untuk ruang, menyembunyikan input untuk meja
        mejaInputContainer.style.display = 'none';
        ruangInputContainer.style.display = 'block';
    } else {
        // Menyembunyikan kedua input jika tidak ada pilihan
        mejaInputContainer.style.display = 'none';
        ruangInputContainer.style.display = 'none';
    }
}








// Ambil elemen tombol dan form
const sendDiscordButton = document.querySelector("#sendDiscord");
const form = document.querySelector("#pesanmenu-item-form");

function createOrderText() {
    const tableName = document.querySelector("#table_name")?.value || "--Nama tidak diisi--";
    const order = document.querySelector("#order")?.value || "--Pesan ditempat--";
    const orderType = document.querySelector("#order_type").value; // Ambil nilai jenis pesanan
    let tableDetail = ""; // Menampung detail meja atau ruangan

    if (orderType === "meja") {
        // Jika memilih meja
        tableDetail = document.querySelector("#table_meja")?.value || "--Nomor meja tidak diisi--";
    } else if (orderType === "ruang") {
        // Jika memilih ruang
        tableDetail = document.querySelector("#table_ruang")?.value || "--Nomor ruangan tidak diisi--";
    }

    return `##---------------------------------##
Halo, saya ingin Memesan Menu,
Atas Nama   : ${tableName} 
No ${orderType === 'meja' ? 'Meja' : 'Rom'} : ${tableDetail}

Order:
${order}`;
}


function validateForm() {
    const tableName = document.querySelector("#table_name").value.trim();
    const orderType = document.getElementById('order_type').value; // Ambil nilai jenis pesanan
    const tableMeja = document.querySelector("#table_meja").value.trim();
    const tableRuang = document.querySelector("#table_ruang").value.trim();

    // Validasi Nama
    if (!tableName) {
        alert("Nama harus diisi.");
        return false;
    }

    // Validasi Jenis Pesanan
    if (!orderType) {
        alert("Jenis Pesanan harus diisi.");
        return false;
    }

    // Validasi jika jenis pesanan adalah meja
    if (orderType === 'meja' && !tableMeja) {
        alert("No Meja harus diisi.");
        return false;
    }

    // Validasi jika jenis pesanan adalah ruang
    if (orderType === 'ruang' && !tableRuang) {
        alert("No Ruangan harus diisi.");
        return false;
    }

    return true; // Hanya dikembalikan setelah semua validasi lolos
}




// Event listener untuk tombol Discord
sendDiscordButton.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah form submit

    if (!validateForm()) return; // Validasi input

    const orderText = createOrderText();
    const discordWebhookURL = "https://discord.com/api/webhooks/1305728622723862569/_-MkpHSkNPHwfGHSmvLrnk_Zzpd1nMcU1qc2sJRmazTJdAUMFBeBR0iN5JOhFuBkwo6s"; // Ganti dengan URL webhook Discord Anda

    fetch(discordWebhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: orderText })
    }).then(response => {
        if (response.ok) {
            alert("Pesan berhasil dikirim ke Discord");
        } else {
            alert("Gagal mengirim pesan ke Discord");
        }
    }).catch(error => {
        console.error("Terjadi kesalahan saat mengirim pesan ke Discord:", error);
        alert("Terjadi kesalahan saat mengirim pesan ke Discord");
    });
});













// Ambil elemen-elemen dropdown dan textarea
const makananDropdown = document.querySelector("#menu-makanan");
const minumanDropdown = document.querySelector("#menu-minuman");
const promoDropdown = document.querySelector("#promo");
const orderTextarea = document.querySelector("#order");

// Fungsi untuk menambahkan pilihan ke order dan mereset dropdown
function addAndResetDropdown(category, dropdown) {
    const selectedMenu = dropdown.value;
    if (selectedMenu) {
        orderTextarea.value += `${category}: ${selectedMenu}\n`;
        dropdown.selectedIndex = 0; // Reset pilihan dropdown
    }
}

// Event listener untuk setiap dropdown
makananDropdown.addEventListener('change', function() {
    addAndResetDropdown('Makanan', makananDropdown);
});

minumanDropdown.addEventListener('change', function() {
    addAndResetDropdown('Minuman', minumanDropdown);
});

promoDropdown.addEventListener('change', function() {
    addAndResetDropdown('Paket Promo', promoDropdown);
});
