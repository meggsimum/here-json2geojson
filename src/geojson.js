/*
here-json2geojson - Convert HERE JSON to GeoJSON object
Copyright 2017-present meggsimum
License: https://github.com/chrismayer/here-features2geojson/blob/master/README.md
*/

/**
 * Creates a GeoJSON Point geometry object
 * @param  {Array} coords The coordinates describing the point (e.g. [0,0])
 * @return {Object}       GeoJSON Point
 */
function createPoint(coords) {
  return {
    "type": "Point",
    "coordinates": coords || []
  };
}

/**
 * Creates a GeoJSON LineString geometry object
 * @param  {Array} coordArray The coordinates describing the point (e.g. [[0,0], [1,1]])
 * @return {Object}           GeoJSON LineString
 */
function createLineString(coordArray) {
  return {
    "type": "LineString",
    "coordinates": coordArray || []
  };
}

/**
 * Creates a GeoJSON Polygon geometry object
 * @param  {Array} coordArray The linestrings coordinate array describing the polygon (e.g. [[[0,0], [1,1], [2,2], [0,0]])
 * @return {Object}           GeoJSON Polygon
 */
function createPolygon(lineStringArray) {
  var polygon = {
    "type": "Polygon",
    "coordinates": lineStringArray
  };

  return polygon;
}

/**
 * Creates a GeoJSON Feature object.
 * @param  {Object} geometry   The GeoJSON geometry object
 * @param  {Object} properties Key-Value-Pairs added as feature attributes
 * @return {Object}            GeoJSON Feature
 */
function createFeature(geometry, properties) {
  return {
    "type": "Feature",
    "geometry": geometry,
    "properties": properties || {}
  };
}

/**
 * Creates a GeoJSON FeatureCollection object, which aggregates several features.
 * @param  {Array} features    Array of GeoJSON feature objects
 * @return {Object}            GeoJSON FeatureCollection
 */
function createFeatureCollection(features) {
  return {
    "type": "FeatureCollection",
    "features": features || []
  };
}

/**
 * Creates a GeoJSON compliant coordinates array from a string like "52.5132,13.3399".
 * @param  {String} coordString Coordinates string ("lat,lon")
 * @return {Array}             GeoJSON coordinate array ([lon,lat])
 */
function createCoords(coordString) {
  var rawPtArr = coordString.split(',');
  if (rawPtArr.length === 2 ) {
    return [parseFloat(rawPtArr[1], 10), parseFloat(rawPtArr[0], 10)];
  }
  return [];
}

export {createPoint, createLineString, createPolygon, createFeature,
  createFeatureCollection, createCoords};
