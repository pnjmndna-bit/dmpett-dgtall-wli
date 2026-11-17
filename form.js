
// =========================
// ELEMENT
// =========================

const phoneInput = document.getElementById("phone");
const lanjutBtn = document.getElementById("lanjutBtn");
const loadingBox = document.getElementById("loadingBox");
const clearBtn = document.getElementById("clearBtn");
const errorBox = document.getElementById("errorBox");

let sedangProses = false;


// =========================
// FADE IN
// =========================

window.addEventListener("load", () => {
    document.body.classList.add("fade-in");
});


// =========================
// AUTO FOCUS
// =========================

window.addEventListener("load", () => {
    phoneInput.focus();
});


// =========================
// FORMAT NOMOR
// =========================

phoneInput.addEventListener("input", (e) => {

    // ANGKA SAJA
    let angka = e.target.value.replace(/\D/g, "");

    // MAX 13 ANGKA
    angka = angka.substring(0, 13);

    let hasil = "";

    // 812
    if (angka.length > 0) {
        hasil += angka.substring(0, 3);
    }

    // 812-3456
    if (angka.length > 3) {
        hasil += "-" + angka.substring(3, 7);
    }

    // 812-3456-7890
    if (angka.length > 7) {
        hasil += "-" + angka.substring(7, 13);
    }

    e.target.value = hasil;

    // SHOW / HIDE CLEAR BUTTON
    clearBtn.style.display = hasil.length > 0 ? "flex" : "none";

    // HIDE ERROR
    errorBox.classList.remove("show");

});


// =========================
// CLEAR INPUT
// =========================

clearBtn.addEventListener("click", () => {

    phoneInput.value = "";

    clearBtn.style.display = "none";

    errorBox.classList.remove("show");

    phoneInput.focus();

});


// =========================
// KEYBOARD ANGKA
// =========================

phoneInput.setAttribute("inputmode", "numeric");


// =========================
// ENTER
// =========================

phoneInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        e.preventDefault();
        lanjutBtn.click();
    }

});


// =========================
// LANJUT
// =========================

lanjutBtn.addEventListener("click", () => {

    // CEGAH KLIK BERULANG
    if (sedangProses) return;

    // AMBIL NOMOR
    const nomor = phoneInput.value.replace(/\D/g, "");

    // VALIDASI
    if (
        nomor.length < 9 ||
        nomor.charAt(0) !== "8"
    ) {

        if (navigator.vibrate) {
            navigator.vibrate([120, 80, 120]);
        }

        errorBox.classList.add("show");

        setTimeout(() => {
            errorBox.classList.remove("show");
        }, 2000);

        phoneInput.focus();

        return;
    }

    // KUNCI PROSES
    sedangProses = true;

    lanjutBtn.disabled = true;

    // SIMPAN NOMOR
    localStorage.setItem("nmrx", phoneInput.value);

    // TAMPILKAN LOADING
    loadingBox.style.display = "flex";

    // FADE OUT
    document.body.classList.add("fade-out");

    // PINDAH HALAMAN LANGSUNG
    window.location.href = "pix.html";

});


// =========================
// RESET LOADING
// =========================

window.addEventListener("pageshow", () => {

    loadingBox.style.display = "none";

    sedangProses = false;

    lanjutBtn.disabled = false;

});
