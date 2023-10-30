var map = L.map('map').setView([0, 0], 1.5);
L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BJcbhpubz593eeSPy48u', {attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}).addTo(map);
map.doubleClickZoom.disable(); 

var popup = L.popup();

var longi = 0;
var langi = 0;
var newMarker;


if (!navigator.geolocation) {
    throw new Error("No Geolocation available");
}

const getLocation = document.getElementById("getLocation");


getLocation.addEventListener("click", () =>  {
    function success (pos) {
        // getting positions
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        //creating the marker
        marker = L.marker([lat, lng], {draggable:true}).addTo(map);
    }

    function error(err) {

        if (err.code === 1) {
            alert("Please allow location access");
        } else {
            alert("Cannot get current location");
        }

    }

    navigator.geolocation.getCurrentPosition(success, error);
})

// store the markers to local storage
function storeMarker(marker) {
    var markers = localStorage.getItem("markers");
  if(!markers) {
    markers = new Array();
    console.log(marker);
    markers.push(JSON.stringify(marker));
  }
  else
  {
    markers = JSON.parse(markers);
    markers.push(JSON.stringify(marker));
  }
   console.log(JSON.stringify(markers));
  localStorage.setItem('markers', JSON.stringify(markers));
}

// storing into local storage for current location
let detailList = [];
const createDetails = (ev) => {
    ev.preventDefault();
    let details = {
        id: Date.now(),
        label: document.getElementById('label').value,
        features: document.getElementById('features').value
    }

    marker.bindPopup("<b>" + document.getElementById('label').value + "</b><br>" + document.getElementById('features').value + "</br>").openPopup();
    detailList.push(details);
    document.forms[0].reset();

    localStorage.setItem('Detailing', JSON.stringify(detailList));
}
document.getElementById('getDetail').addEventListener('click', createDetails);

//storing into local storage for on map click
const createDetailss = (ev) => {
    ev.preventDefault();
    let details = {
        ids: Date.now(),
        labels: document.getElementById('labels').value,
        featuress: document.getElementById('featuress').value,
        addresss: document.getElementById('addresss').value,
        zipcodes: document.getElementById('zipcodes').value
    }

    
    var nmarker;
    map.on('dblclick', onMapClick);
    function onMapClick(e) {
        nmarker = new L.Marker(e.latlng, {draggable:true});
        map.addLayer(nmarker);
        nmarker.bindPopup("<b>" + document.getElementById('labels').value + "</b><br>" + document.getElementById('featuress').value + "</br>").openPopup();
        storeMarker(nmarker);
    };

    detailList.push(details);
    document.forms[0].reset();

    localStorage.setItem('Detailing', JSON.stringify(detailList));
    
   

}
document.getElementById('createLocation').addEventListener('click', createDetailss);


