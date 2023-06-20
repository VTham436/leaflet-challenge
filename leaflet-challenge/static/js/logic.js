 function createMap(earthquakes) {

    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
 
    let map = L.map("map", {
      center: [40.73, -74.0059],
      zoom: 2,
      layers: [streetmap, earthquakes]
    });
  
  
    streetmap.addTo(map);
  }

  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data){
    createMarkers(data)
  
  function createMarkers(response) {
  console.log(response);
    
    let stations = response.features;

    let Markers = [];
    let color = "";
    
    for (let index = 0; index < stations.length; index++) {
      let station = stations[index];

      let color = "";
    if (station.geometry.coordinates[2] >= 100) {
      color = "yellow";
    }
    else if (station.geometry.coordinates[2] >=50) {
      color = "blue";
    }
    else if (station.geometry.coordinates[2] >= 10) {
      color = "green";
    }
    else {
      color = 'gray';
    }
    let radius = "";
    if (station.properties.mag < 1) {
      radius = station.properties.mag + 1;
    }
    else {
      radius = station.properties.mag;
    }
      let Marker = L.circleMarker([station.geometry.coordinates[1],station.geometry.coordinates[0]],
       { fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        radius: radius*5})
        .bindPopup("<h3> Mag:" + station.properties.mag + "<h3><h3>Place: " + station.properties.place + "</h3>" + 
        "<h3><h3>Depth: " + station.geometry.coordinates[2] + "</h3>");
  
      Markers.push(Marker);
    }
  
    
    createMap(L.layerGroup(Markers));
  
  
  console.log(map);

    let legend = L.control({position: "bottomright"});
    
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      let grades = [-10,10,50,100];
      let colors = [
          "gray",
          "green",
          "blue",
          "yellow"
      ];

      for (let i = 0; i < grades.length; i++) {
          div.innerHTML += '<i style= "background: '
            + colors[i]
            + '";></i> '
            + grades[i]
            + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
    };
  legend.addTo(map);
}});


  


 