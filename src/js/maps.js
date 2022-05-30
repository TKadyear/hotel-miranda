
// Initialize and add the map
function initMap() {
  // The location of oxygen
  const oxygen = {
    lat: 40.428,
    lng: -3.715
  };
  // The map, centered at oxygen
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: oxygen,
  });
  // The marker, positioned at oxygen
  const marker = new google.maps.Marker({
    position: oxygen,
    map: map,
  });
}

window.initMap = initMap;
