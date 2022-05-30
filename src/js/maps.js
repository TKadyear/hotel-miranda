import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { polygonRequiredRegion as polygonRegion, listHotelLocations as locations } from "./spain_polygon_region";
let geocoder;
let map;
// Initialize and add the map
function initMap() {
  //initializeGeocoder
  geocoder = new google.maps.Geocoder();
  // The location of oxygen
  const oxygen = {
    lat: 40.428,
    lng: -3.715
  };
  // The map, centered at oxygen
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: oxygen,
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });


  //TODO Problem with the marker in Málaga because the marker is on the Mediterrean Sea
  // TODO Change the color of the clustered pins
  //Custom Marker
  const svgMarker = {
    path: "M30.623 0A30.624 30.624 0 0 0 0 30.623a30.624 30.624 0 0 0 2.898 12.842c.783 2.234 1.817 4.484 3.19 6.506 5.423 7.986 15.064 28.031 15.064 28.031l9.5 17.875L11.594 54.52a30.624 30.624 0 0 0 19.029 6.728 30.624 30.624 0 0 0 19.272-6.935L30.652 96.067l9.5-17.875s9.642-20.044 15.065-28.03c1.695-2.497 2.877-5.342 3.701-8.073a30.624 30.624 0 0 0 2.33-11.467A30.624 30.624 0 0 0 30.623 0zM15.33 11.873h26.25a1.875 1.875 0 0 1 1.875 1.875v9.375h3.75v18.75h1.875v3.75h-37.5v-3.75h1.875V13.748a1.877 1.877 0 0 1 1.875-1.875zm1.875 3.75v26.25h11.25v-18.75h11.25v-7.5h-22.5zm3.75 3.75h3.75v3.75h-3.75v-3.75zm0 7.5h3.75v3.75h-3.75v-3.75zm11.25 0v15h3.75v-11.25h3.75v11.25h3.75v-15h-11.25zm-11.25 7.5h3.75v3.75h-3.75v-3.75z",
    fillColor: "#ad9d82",
    fillOpacity: 1,
    strokeWeight: 0,
    strokeLinecap: "butt",
    strokeLinejoin: "miter",
    rotation: 0,
    scale: 0.5,
    anchor: new google.maps.Point(15, 30),
  };

  // Create an array of alphabetical characters used to label the markers.
  // Add some markers to the map.
  const markers = locations.map((position, i) => {
    const marker = new google.maps.Marker({
      position,
      icon: svgMarker
    });
    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
      toggleBounce(marker);
    });
    return marker;
  }
  );
  // Add a marker clusterer to manage the markers.
  const markerCluster = new MarkerClusterer({ map, markers });
  function toggleBounce(mark) {
    if (mark.getAnimation() !== null) {
      mark.setAnimation(null);
    } else {
      mark.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  const locationButton = document.createElement("button");
  let infoCurrentLocation = new google.maps.InfoWindow();
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  locationButton.classList.add("btn-primary");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoCurrentLocation.setPosition(pos);
          infoCurrentLocation.setContent("You're here.");
          infoCurrentLocation.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoCurrentLocation, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoCurrentLocation, map.getCenter());
    }
  });
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  // Define the LatLng coordinates for the polygon's path.
  const andaluciaCoords = [...polygonRegion[4].coordenates];

  // Construct the polygon.
  const bermudaTriangle = new google.maps.Polygon({
    paths: andaluciaCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  bermudaTriangle.setMap(map);

}


window.initMap = initMap;
function codeAddress() {
  let address = document.querySelector("#user-geocoding").value;
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == 'OK') {
      console.log(results);
      console.log(results[0].geometry.location);
      map.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

document.querySelector("#btn-geocoding").addEventListener("click", codeAddress)
