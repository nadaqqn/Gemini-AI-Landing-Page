import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from 'markdown-it';
import { maybeShowApiKeyBanner } from './gemini-api-banner';
import './style.css';

const API_KEY = import.meta.env.VITE_API_KEY;

// --- Whatsapp ---
const waBtn = document.querySelector(".button-primary");
const phone = "6287810101212";

function updateWA(lang) {
  let waText = lang === "id" ? waBtn.dataset.waId : waBtn.dataset.waEn;
  waBtn.href = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(waText)}`;
  waBtn.textContent = lang === "id" ? waBtn.dataset.langId : waBtn.dataset.langEn;
}

// Contoh: toggle bahasa manual
document.getElementById("lang-toggle").addEventListener("click", () => {
  const current = document.body.getAttribute("data-lang") === "id" ? "en" : "id";
  document.body.setAttribute("data-lang", current);
  updateWA(current);
});

// Set default awal
updateWA("id");


// --- Toggle Button (Hamburger Menu) Logic ---
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('is-active');
        navToggle.classList.toggle('is-active');
    });
}

if (navLinks.length > 0 && navMenu && navToggle) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('is-active');
            navToggle.classList.remove('is-active');
        });
    });
}

// --- Tabs Logic ---
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            const targetContent = document.getElementById(tabId);

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}
// --- Gallery Carousel ---
var $galleryDiv = $('.img-gallery');
if ($galleryDiv.length && $.fn.owlCarousel) {
  $galleryDiv.owlCarousel({
    nav: false,
    center: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000, // ganti interval sesuai kebutuhan
    dots: true,
    navText: [
      '<span class="ti-arrow-left"></span>',
      '<span class="ti-arrow-right"></span>'
    ],
    responsive: {
      0: { items: 1 },
      768: { items: 3 }
    }
  });
}


// --- Language Toggle Logic ---
const langToggle = document.getElementById('lang-toggle');
const translatableElements = document.querySelectorAll('[data-lang-id]');

if (langToggle && translatableElements.length > 0) {
    let currentLang = 'id'; // Default language

    langToggle.addEventListener('click', () => {
        if (currentLang === 'id') {
            currentLang = 'en';
            langToggle.textContent = 'ID';
        } else {
            currentLang = 'id';
            langToggle.textContent = 'EN';
        }

        translatableElements.forEach(element => {
            const text = element.getAttribute(`data-lang-${currentLang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                    if (element.type === 'submit') {
                        element.value = text;
                    } else {
                        element.textContent = text;
                    }
                } else {
                    element.innerHTML = text;
                }
            }
        });
    });
}


// Customer Service
let form = document.querySelector('form');
let promptInput = document.querySelector('input[name="prompt"]');
let chatHistory = document.querySelector('.chat-history');

// Initialize the Google AI model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ],
});

// Start a chat session for multi-turn conversation
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: `🏠 Rumah Kos Aisyah – Setiabudi, Jakarta Selatan

📍 Alamat: Jl. Menteng Atas Selatan III No. 28, Setiabudi, Jakarta Selatan

Rumah Kos Aisyah menawarkan hunian yang nyaman dan strategis di kawasan Setiabudi, Jakarta Selatan. Tersedia tiga tipe kamar berperabotan lengkap yang siap dihuni, dilengkapi dengan fasilitas bersama untuk menunjang kenyamanan sehari-hari.

⸻

✨ Tipe Kamar

Kamar Executive – Rp 2.200.000/bulan
• Ukuran kamar: 3 x 4 m (belum termasuk listrik)
• Fasilitas kamar mandi: dalam, toilet duduk, ember, shower
• Fasilitas kamar tidur: AC, tempat tidur, meja belajar, lemari, ventilasi
• Catatan:
• Maks. 3 orang/kamar
• Tambahan orang: +Rp400.000
• Tidak diperuntukkan bagi pasangan menikah & anak-anak
• Deposit: Rp500.000 (dikembalikan di akhir masa sewa jika tidak ada kerusakan)
✅ Fully furnished, kamar mandi dalam, AC
✅ Dispenser air minum
✅ Dapur bersama

⸻

Kamar VVIP – Rp 2.400.000/bulan
• Ukuran kamar: 5 x 3 m (belum termasuk listrik)
• Fasilitas kamar mandi: dalam, toilet duduk, shower, water heater
• Fasilitas kamar tidur: AC, tempat tidur, meja belajar, lemari
• Catatan:
• Maks. 3 orang/kamar
• Tambahan orang: +Rp400.000
• Tidak diperuntukkan bagi pasangan menikah & anak-anak
• Deposit: Rp500.000 (dikembalikan di akhir masa sewa jika tidak ada kerusakan)
✅ Fully furnished, kamar mandi dalam, AC
✅ Water heater (air panas/dingin)
✅ Dispenser air minum
✅ Dapur bersama

⸻

Kamar Balkon – Rp 2.500.000/bulan
• Ukuran kamar: 3,5 x 3 m (belum termasuk listrik)
• Fasilitas kamar mandi: dalam, toilet duduk, shower
• Fasilitas kamar tidur: AC, tempat tidur, meja belajar, lemari, balkon pribadi
• Catatan:
• Maks. 3 orang/kamar
• Tambahan orang: +Rp400.000
• Tidak diperuntukkan bagi pasangan menikah & anak-anak
• Deposit: Rp500.000 (dikembalikan di akhir masa sewa jika tidak ada kerusakan)
✅ Fully furnished, kamar mandi dalam, AC
✅ Water heater (air panas/dingin)
✅ Balkon pribadi
✅ Dispenser air minum
✅ Dapur bersama

⸻

🌟 Fasilitas Bersama
• Lift & tangga
• Parkir motor
• Dapur bersama
• Dispenser air minum
• AC
• Penjaga kos 24 jam

⸻

📍 Lokasi Strategis

Dekat dengan berbagai fasilitas umum dan transportasi:
• Terminal Manggarai – 1,3 km
• Halte Bus Bendungan Hilir – 2,7 km
• Stasiun MRT Istora Mandiri – 3,4 km
• RS Mayapada Kuningan – 837 m
• Universitas Sahid – 2,1 km
• Bank DKI Tebet – 2,5 km
• Alfamart – 2,9 km
• Warteg Ahai Jaya – 1,4 km
• Masjid Jami Tangkubanperahu – 1,3 km

⸻

📞 Kontak Pengelola

Untuk informasi dan reservasi, hubungi:
0812-3456-7890` }],
    },
    {
      role: "model",
      parts: [{ text: `Halo, terima kasih sudah menghubungi kami 😊. Untuk Rumah Kos Aisyah, berikut beberapa informasi yang bisa saya bagikan:

📍 Lokasi – alamat lengkap dan akses sekitar kos.
🏠 Ketersediaan kamar – jumlah dan tipe kamar yang masih kosong.
🛏️ Tipe kamar – Kamar Executive, Kamar VVIP, Kamar Balkon.
✨ Fasilitas bersama – Wifi, Dapur, Dispenser Air, Area Parkir, Keamanan 24/7.
📲 Kontak pengelola – nomor WhatsApp manajer.

Dari poin-poin di atas, apakah ada yang ingin dijelaskan lebih dulu?` }],
    },
  ],
  generationConfig: {
    maxOutputTokens: 1000,
  }
});

async function sendMessage(prompt) {
  // Add user message to chat history
  addMessage(prompt, 'user');

  promptInput.disabled = true;
  promptInput.value = '';

  try {
    // Send the user's message to the chat and get a stream of results
    const result = await chat.sendMessageStream(prompt);

    // Read from the stream and interpret the output as markdown
    let buffer = [];
    let md = new MarkdownIt();
    let modelMessageDiv = addMessage('Generating...', 'model');

    for await (const response of result.stream) {
      buffer.push(response.text());
      // Render the buffer as it streams
      modelMessageDiv.innerHTML = md.render(buffer.join(''));
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  } catch (e) {
    addMessage('Error: ' + e, 'model');
  } finally {
    promptInput.disabled = false;
    promptInput.focus();
  }
}

function addMessage(text, role) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', `${role}-message`);
  messageDiv.textContent = text;
  chatHistory.appendChild(messageDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
  return messageDiv;
}

form.onsubmit = (ev) => {
  ev.preventDefault();
  const prompt = promptInput.value.trim();
  if (prompt) {
    sendMessage(prompt);
  }
};

// You can delete this once you've filled out an API key
maybeShowApiKeyBanner(API_KEY);
