/*
here-json2geojson - Convert HERE JSON to GeoJSON object
Copyright 2017-present meggsimum, C. Mayer (https://meggsimum.de)
License: https://github.com/chrismayer/here-features2geojson/blob/master/README.md
*/

import {createCoords, createPolygon, createFeature, createFeatureCollection} from './geojson';

/**
 * [readIsoline description]
 * @param  {[type]} hereIsoline [description]
 * @return {[type]}             [description]
 */
function readIsolines(hereIsolineResponse) {
  var isolines = hereIsolineResponse.response.isoline;
  var isolineFeatures = [];
  isolines.forEach(function(isoline) {
    var isolineShape = isoline.component[0].shape;
    var vertices = [];
    isolineShape.forEach(function(ptStr) {
      vertices.push(createCoords(ptStr));
    });

    var isolineFeat =
      createFeature(createPolygon([vertices]), {"range": isoline.range});
    isolineFeatures.push(isolineFeat);
  });

  return createFeatureCollection(isolineFeatures);
}

export {readIsolines};
