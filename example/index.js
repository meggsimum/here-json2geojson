// Set your API keys
var hereAppId = 'Enter your HERE APP-ID';
var hereAppCode = 'Enter your HERE APP-Code';

var vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      lineDash: [4],
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  })
});

var map = new ol.Map({
  target: 'map',
  layers: [new ol.layer.Tile({
    visible: true,
    preload: Infinity,
    source: new ol.source.XYZ({
      url: 'https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/' +
            '{z}/{x}/{y}/256/png?app_id=' + hereAppId + '&app_code=' + hereAppCode,
      attributions: 'Map Tiles &copy; ' + new Date().getFullYear() + ' ' +
        '<a href="http://developer.here.com">HERE</a>'
    })
  }),
  vectorLayer],
  view: new ol.View({
    center: [925623,6347474],
    zoom: 12
  })
});

var client = new XMLHttpRequest();
client.open('GET', 'data/isolines.json');
client.onload = function() {
  var hereIsolinesResponse = JSON.parse(client.responseText);
  var isolineGeojson = hj2gj.readIsolines(hereIsolinesResponse);
  var olFeatures = new ol.format.GeoJSON({featureProjection: 'EPSG:3857'}).readFeatures(isolineGeojson);

  vectorLayer.getSource().addFeatures(olFeatures);
};
client.send();
