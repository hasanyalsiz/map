import { detectType, setStorage, detectIcon } from './helpers.js';

//! html'den gelenler
const form = document.querySelector('form');
const list = document.querySelector('ul');

//! olat izleyicileri
form.addEventListener('submit', handleSubmit);
list.addEventListener('click', handleClick);

//! ortak kullanımı alanı (global değiken tanımalama)

var map;
var notes = JSON.parse(localStorage.getItem('notes')) || [];
var coords = [];
var layerGroup = [];

//! kullanıcnın konumunu öğrenme
navigator.geolocation.getCurrentPosition(
  loadMap,
  console.log('Kullanıcı kabul etmedi')
);

// haritaya tıklanınca çalışan fonk.
function onMapClick(e) {
  form.style.display = 'flex';
  coords = [e.latlng.lat, e.latlng.lng];
  
  var marker2 = L.marker([e.latlng.lat, e.latlng.lng]).addTo(layerGroup);
  
  L.circleMarker(coords, { color: 'blue', radius: 5 })
    .addTo(layerGroup);
    
}


//! kullanıcnın konumuna göre ekrana haritayı basma
function loadMap(e) {
  // haritanın kurulumunu yapar
  map = L.map('map').setView(
    [e.coords.latitude, e.coords.longitude],
    14
  );

  // haritanın nasıl gözükeceğini belirler
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  // haritada ekran basılacak imleçleri tutucağımız katman
  layerGroup = L.layerGroup().addTo(map);

  // local'den noteları listeleme
  renderNoteList(notes);

  // haritada bir tıklanma olduğunda çalışıcak fonksiyon
  map.on('click', onMapClick);
}
// ekran imleç basar
function renderMarker(item) {
  // markerı oluşturur
  L.marker(item.coords, { icon: detectIcon(item.status) })
    // imleçlerin olduğu katamana ekler
    .addTo(layerGroup)
    // üzerine tıklanınca açılıcak popup ekleme
    .bindPopup(` ${item.desc}`);
    
}



// formun gönderilmesi olayında çalışır
function handleSubmit(e) {
  e.preventDefault();

  const desc = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;

  // notlar dizsine eleman ekleme
  notes.push({
    id: new Date().getTime(),
    desc,
    date,
    status,
    coords,
  });

  // local'storage'ı güncelleme
  setStorage(notes);

  // notları listeleme
  renderNoteList(notes);

  // formu kapatma
  form.style.display = 'none';
}

// erkana notları basma fonksiyonu
function renderNoteList(items) {
  // note'lar alanını temizler
  list.innerHTML = '';

  // imleçleri temizler
  layerGroup.clearLayers();

  // her bir note için fonk. çalıştırır
  items.forEach((item) => {
    // li elemanı oluşturur
    const listEle = document.createElement('li');

    // data 'sına sahip olduğu id 'yi ekleme
    listEle.dataset.id = item.id;

    // içeriği belirleme
    listEle.innerHTML = `
           <div style="gap:1px">
              <p>${item.desc}</p>
              <p><span>Tarih:</span> ${item.date}</p>
              <p><span>Durum:</span> ${detectType(item.status)}</p>
            </div>
            <i id="fly" class="bi bi-geo-fill"></i>
            <i id="delete" class="bi bi-trash3-fill"></i>
    `;

    // htmldeki listeye elemanı ekleme
    list.insertAdjacentElement('afterbegin', listEle);

    // ekrana bas
    renderMarker(item);
  });
}

// notelar alanında tıklanma olayını izler
function handleClick(e) {
  // güncellenecek elemanın id'sini öğrenme
  const id = e.target.parentElement.dataset.id;
  if (e.target.id === 'delete') {
    // id sini bildğimiz elemanı diziden kaldırma
    notes = notes.filter((note) => note.id != id);

    // local'i gücelle
    setStorage(notes);

    // ekranı güncelle
    renderNoteList(notes);
  }

  if (e.target.id === 'fly') {
    const note = notes.find((note) => note.id == id);

    map.flyTo(note.coords);
  }
}


const sidebar = document.querySelector(".sidebar");
const arrowIcon = document.querySelector(".arrow-icon");


function toggleSidebar() {
  sidebar.classList.toggle("sidebar-hidden");
  arrowIcon.classList.toggle("arrow-icon");
  if (arrowIcon.classList.contains("sidebar-hidden")) {
    arrowIcon.style.fontSize = "23px";
  } else {
    arrowIcon.style.fontSize = "32px";
  }
}




arrowIcon.addEventListener("click", toggleSidebar);


// sidebar.addEventListener("transitionend", () => {
//   if (sidebar.classList.contains("sidebar-hidden")) {
//     sidebar.style.transition = "transform 0.5s ease";
//     setTimeout(() => {
//       sidebar.style.transition = "none";
//     }, 0);
//   }
// });



arrowIcon.addEventListener("click", toggleSidebar);


sidebar.addEventListener("transitionend", () => {
  if (sidebar.classList.contains("sidebar-hidden")) {
    arrowIcon.style.transition = "font-size 0.5s ease"; // Added smooth transition
    arrowIcon.style.fontSize = "23px";
  } else {
    arrowIcon.style.transition = "font-size 0.5s ease"; // Added smooth transition
    arrowIcon.style.fontSize = "32px";
  }
});

var circle = L.circle([51.508, -0.11], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map);