/*
here-json2geojson - Convert HERE JSON to GeoJSON object
Copyright 2017-present meggsimum
License: https://github.com/meggsimum/here-json2geojson/blob/master/LICENSE
*/

import {createPoint, createFeature, createFeatureCollection} from './geojson';

/**
 * Reads HERE traffic weather conditions and transforms them to a GeoJSON
 * FeatureCollection containing point features with weather info as attributes.
 * @param  {Object} weatherConditionsResponse HERE JSON for weather conditions
 * @return {Object}                           GeoJSON FeatureCollection
 */
function readWeatherConditions(weatherConditionsResponse) {
  var weatherCondPointFeatures = [];

  weatherConditionsResponse.observations.location.forEach(function(locItem){
    var observationItem = locItem.observation[0];
    if(observationItem) {
      var wcPointFeat =
        createFeature(createPoint([observationItem.longitude, observationItem.latitude]), observationItem);
      weatherCondPointFeatures.push(wcPointFeat);
    }
  });

  return createFeatureCollection(weatherCondPointFeatures);
}

export {readWeatherConditions};
