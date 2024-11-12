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

// Mengambil elemen tombol dan form
const sendWhatsappButton = document.querySelector("#sendWhatsapp");
const sendDiscordButton = document.querySelector("#sendDiscord");
const form = document.querySelector("#reservation-item-form");

// Fungsi untuk membuat teks pesanan
function createOrderText() {
    const tableName = document.querySelector("#table_name")?.value || "Nama tidak diisi";
    const tableSize = document.querySelector("#table_capacity")?.value || "0";
    const date = document.querySelector("#order_date")?.value || "Tanggal tidak diisi";
    const order = document.querySelector("#order")?.value || "*Pesan ditempat";

    return `Halo, saya ingin reservasi,
Meja untuk ${tableSize} orang,
Atas nama ${tableName} 
Pada tanggal/waktu ${date}

Order:
${order}`;
}

// Fungsi untuk validasi input
function validateForm() {
    const tableName = document.querySelector("#table_name").value.trim();
    const date = document.querySelector("#order_date").value.trim();

    if (!tableName) {
        alert("Nama harus diisi.");
        return false;
    }
    if (!date) {
        alert("Tanggal dan waktu harus diisi.");
        return false;
    }
    return true;
}

// Event listener untuk tombol WhatsApp
sendWhatsappButton.addEventListener("click", function (event) {
    // Mencegah form untuk submit secara default
    event.preventDefault();

    // Validasi input
    if (!validateForm()) {
        return; // Jika validasi gagal, hentikan proses
    }

    // Membuat pesan untuk WhatsApp
    const orderText = createOrderText();
    const encodedText = encodeURIComponent(orderText);
    const whatsappURL = `https://wa.me/6287861716325?text=${encodedText}`;

    // Redirect ke WhatsApp
    window.location.href = whatsappURL;
});

// Event listener untuk tombol Discord
sendDiscordButton.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah form submit

    // Validasi input
    if (!validateForm()) {
        return; // Jika validasi gagal, hentikan proses
    }

    const orderText = createOrderText();
    const discordWebhookURL = "https://discord.com/api/webhooks/1305728622723862569/_-MkpHSkNPHwfGHSmvLrnk_Zzpd1nMcU1qc2sJRmazTJdAUMFBeBR0iN5JOhFuBkwo6s"; // Ganti dengan URL webhook Discord Anda

    fetch(discordWebhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: orderText // Pesan yang akan dikirim
        })
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








