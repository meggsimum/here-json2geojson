/*
here-json2geojson - Convert HERE JSON to GeoJSON object
Copyright 2017-present meggsimum
License: https://github.com/meggsimum/here-json2geojson/blob/master/LICENSE
*/

import {createCoords, createPoint, createFeature, createFeatureCollection} from './geojson';


/**
 * Reads places-response object delivered by the HERE API and converts it
 * to a GeoJSON FeatureCollection holding the places as point features.
 * @param  {Object} herePlacesResponse HERE JSON for a place
 * @return {Object}                    GeoJSON FeatureCollection
 */
function readPlaces(herePlacesResponse) {
  var placesItems = herePlacesResponse.results.items;

  var placeFeatures = [];
  if (placesItems) {
    placesItems.forEach(function(place){
      var placePointFeat =
        createFeature(createPoint([place.position[1], place.position[0]]), place);
      placeFeatures.push(placePointFeat);
    })
  }

  return createFeatureCollection(placeFeatures);
}

export {readPlaces};
