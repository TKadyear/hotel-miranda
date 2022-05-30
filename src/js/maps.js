import { MarkerClusterer } from "@googlemaps/markerclusterer";
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
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });
  //TODO Problem with the marker in Málaga because the marker is on the Mediterrean Sea
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


}

const locations = [
  { lat: 40.4286, lng: -3.715 },
  { lat: 40.45135, lng: -3.687 },
  { lat: 40.410, lng: -3.673 },
  { lat: 43.370, lng: -8.396 },
  { lat: 36.719, lng: -4.433 },
  { lat: 41.654, lng: -0.893 },
  { lat: 28.057, lng: -16.715 }
];

window.initMap = initMap;
