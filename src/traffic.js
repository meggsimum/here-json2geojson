
import {createPoint, createFeature, createFeatureCollection} from './geojson';

/**
 * Reads HERE traffic incidents and transforms them to a GeoJSON
 * FeatureCollection containing point features.
 * @param  {Object} trafficIncidentsResponse HERE JSON for traffic incidents
 * @param  {Boolean} addEndPoints            Should possible end points of incident be added to the FeatureCollection
 * @return {Object}                          GeoJSON FeatureCollection
 */
function readTrafficIncidents(trafficIncidentsResponse, addEndPoints) {
    var tiPointFeatures = [];

    trafficIncidentsResponse.TRAFFICITEMS.TRAFFICITEM.forEach(function(trItem){
      var originGeo = trItem.LOCATION.GEOLOC.ORIGIN;

      // get clone of the traffic item
      var attrs = JSON.parse(JSON.stringify(trItem));
      // remove the location section from the attributes since this
      // is modeled as geometry in GeoJSON
      delete attrs.LOCATION;
      var tiPointFeat =
        createFeature(createPoint([originGeo.LONGITUDE, originGeo.LATITUDE]), attrs);
      tiPointFeatures.push(tiPointFeat);

      if (addEndPoints) {
        // check if origin and end differ from each other => create end point
        var toGeo = trItem.LOCATION.GEOLOC.TO[0];
        if (originGeo.LONGITUDE !== toGeo.LONGITUDE || originGeo.LATITUDE !== toGeo.LATITUDE) {

          var tiEndPointFeat =
            createFeature(createPoint([originGeo.LONGITUDE, originGeo.LATITUDE]), attrs);
          tiPointFeatures.push(tiEndPointFeat);
        }
      }

    });

    return createFeatureCollection(tiPointFeatures);
}

export {readTrafficIncidents};
