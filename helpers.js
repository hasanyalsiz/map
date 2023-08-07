// tipi anlaiz edip ona göre fonksiyonun çağrıldığı yere
// tipe denk gelen açıklamayı gönderme
export const detectType = (type) => {
  switch (type) {
    case 'park':
      return 'Park Yeri';
    case 'home':
      return 'Ev';
    case 'job':
      return 'İş Yeri';
    case 'goto':
      return 'Ziyaret';
  }
};

export const setStorage = (data) => {
  // veriyi local'e göndermek için hazırlar
  const strData = JSON.stringify(data);

  // local stroage'ı günceller
  localStorage.setItem('notes', strData);
};

var carIcon = L.icon({
  iconUrl: 'https://static.thenounproject.com/png/331565-200.png',

  iconSize: [70, 85], // size of the icon
});

var homeIcon = L.icon({
  iconUrl:
    'https://www.pngkey.com/png/full/368-3683198_firstcall-home-home-map-marker-png.png',

  iconSize: [40, 65], // size of the icon
});

var companyIcon = L.icon({
  iconUrl:
    'https://www.shareicon.net/data/512x512/2017/05/22/886154_map_512x512.png',

  iconSize: [70, 85], // size of the icon
});

var vacationIcon = L.icon({
  iconUrl:
    'https://bacamak.com.tr/wp-content/uploads/2019/06/678111-map-marker-512.png',

  iconSize: [40, 55], // size of the icon
});

export function detectIcon(type) {
  switch (type) {
    case 'park':
      return carIcon;
    case 'home':
      return homeIcon;
    case 'job':
      return companyIcon;
    case 'goto':
      return vacationIcon;
  }
}
