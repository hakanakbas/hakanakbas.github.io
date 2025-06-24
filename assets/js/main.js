// File: assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Akordiyon Fonksiyonelliği ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- Footer'daki Yılı Otomatik Güncelleme ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    // --- Email Obfuscation (Botlara karşı koruma) ---
    const emailLink = document.getElementById('emailLink');
    if (emailLink) {
        emailLink.addEventListener('click', (event) => {
            event.preventDefault(); // Linkin varsayılan davranışını engelle

            const user = 'hakanakbas79';
            const domain = 'gmail.com';
            // Mailto linkini tıklandığı anda oluştur ve tarayıcının e-posta istemcisini aç
            window.location.href = `mailto:${user}@${domain}`;
        });
    }

});