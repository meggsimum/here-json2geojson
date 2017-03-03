/*
here-json2geojson - Convert HERE JSON to GeoJSON object
Copyright 2017-present meggsimum, C. Mayer (https://meggsimum.de)
License: https://github.com/chrismayer/here-features2geojson/blob/master/README.md
*/

import {createCoords, createLineString, createPolygon, createFeature, createFeatureCollection} from './geojson';

/**
 * Reads isolines-response object delivered by the HERE API and converts it
 * to a GeoJSON FeatureCollection.
 * @param  {Object} hereIsoline HERE JSON for isolines
 * @return {Object}             GeoJSON FeatureCollection
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

/**
 * Reads route-response object delivered by the HERE API and converts it
 * to a GeoJSON FeatureCollection holding the route legs as line features.
 * @param  {Object} hereIsoline HERE JSON for a route
 * @return {Object}             GeoJSON FeatureCollection
 */
function readRoute(hereRouteResponse) {
  var route = hereRouteResponse.response.route[0];

  var legFeatures = [];
  route.leg.forEach(function(routeLeg){
      legFeatures.push(readRouteLeg(routeLeg));
  });

  return createFeatureCollection(legFeatures);
}

/**
 * Converts a route leg JSON object to a GeoJSON feature.
 * @param  {Object} routeLeg HERE JSON for a route leg
 * @return {Object}          GeoJSON Feature
 * @private
 */
function readRouteLeg(routeLeg) {
    // initialize vertices array with route leg start point
    var vertices = [[
        routeLeg.start.mappedPosition.longitude,
        routeLeg.start.mappedPosition.latitude
    ]];

    // add all route points
    routeLeg.maneuver.forEach(function(waypoint) {
      vertices.push([waypoint.position.longitude, waypoint.position.latitude]);
    });

    // close route with end point
    vertices.push([
        routeLeg.end.mappedPosition.longitude,
        routeLeg.end.mappedPosition.latitude
    ]);

    // make GeoJSON Feature and apply the meta info as attributes
    return createFeature(createLineString(vertices), {
        length: routeLeg.length,
        travelTime: routeLeg.travelTime
    });
}

export {readIsolines, readRoute};
