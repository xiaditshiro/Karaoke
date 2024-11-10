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

// Reservasi
const form = document.querySelector("#reservation-item-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Mengambil data dari form
    const tableName = document.querySelector("#table_name").value;
    const tableSize = document.querySelector("#table_capacity").value;
    const date = document.querySelector("#order_date").value;
    const order = document.querySelector("#order").value;

    // Membuat pesan untuk WhatsApp dengan encodeURIComponent
    const orderText = `Halo, saya ingin reservasi meja untuk ${tableSize} orang, atas nama ${tableName} pada tanggal/waktu ${date}

Order:
${order || "*Pesan ditempat"}`;

    // Mengencode pesan untuk URL
    const encodedText = encodeURIComponent(orderText);

    // Membuat URL WhatsApp dengan nomor dan pesan yang di-encode
    const whatsappURL = `https://wa.me/6287861716325?text=${encodedText}`;

    // Redirect ke WhatsApp
    window.location.href = whatsappURL;
});
