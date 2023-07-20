// ˏˋ°•*⁀➷ˏ import scss stylesheet
import "/sass/styles.scss";

// ˏˋ°•*⁀➷ˏ import leaflet to house map
import "leaflet/dist/leaflet.css";
import L, { marker } from "leaflet";

//leaflet map object
let map;

//filtered campground data from API
let cemeteryDataJson;

//html dom elements
let pageContent;

// muckle on to dom elements
function assignDOM() {
  pageContent = document.getElementById("p-page");
}

// display map on page using leaflet & openstreetmap
function initializeMapContainer() {

  //initialize the leaflet map object, set center coordinate and zoom
  map = L.map("map").setView([45.2, -63.1], 7);

  // display the map
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    // must attribute openstreetmap for use
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  
}

//getting cemetery data from provincial data set
function getCemeteryData() {
  //endpoint URL for NS campground-specific data
  let SOURCE_URL =
  "https://data.novascotia.ca/resource/ty4r-gcnk.json?feat_desc=CEMETERY polygon";
  
  fetch(SOURCE_URL)
  .then((response) => response.json())
  .then((data) => {
    cemeteryDataJson = data;
    dropCemeteryPins(cemeteryDataJson);
    console.log(cemeteryDataJson.length);
  })
  
  .catch((error) => {
    console.log(error);
  });
}

//display campgrounds on the map (WIP)
function dropCemeteryPins(cemeteryDataJson) {
  for (let cemetery in cemeteryDataJson) {
    //the coordinates below are just the first coordinate set in each polygon to trial marker
    let lat = cemeteryDataJson[cemetery].the_geom.coordinates[0][0][0][1];
    let long = cemeteryDataJson[cemetery].the_geom.coordinates[0][0][0][0];
    
    //drop a pin on the map
    let marker = L.marker([lat, long]).addTo(map);
    //give the marker a dialogue box to put info in
    marker.bindTooltip("cemetery");
  }
}

// rip it & ship it
function main() {
  assignDOM();
  initializeMapContainer();
  getCemeteryData();
}

main();
