function initMap() {
  // get the lat and long value from race.pug
  var raceLat = document.getElementById("lat").textContent;
  var raceLong = document.getElementById("long").textContent;
  // The location of race Location

  let raceLocation = {
    lat: Number(raceLat),
    lng: Number(raceLong),
  };
  //  map, centered at race Location
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: raceLocation,
  });
  // The marker, positioned at race Location
  let marker = new google.maps.Marker({
    position: raceLocation,
    map: map,
  });
}
