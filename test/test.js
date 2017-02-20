import should from 'should/as-function';
import {createPoint, createLineString, createPolygon} from '../src/geojson';
import {readIsolines} from '../src/';


describe('here-features2geojson', function() {

  describe('createPoint', function() {
    it('creates a GeoJSON Point geometry object', function() {
      var geojson = createPoint([0,0]);
      should(geojson).be.eql({"type": "Point", "coordinates": [0, 0]});
    });
  });

  describe('createLineString', function() {
    it('creates a GeoJSON LineString geometry object', function() {
      var geojson = createLineString([[0,0], [1,1]]);
      should(geojson).be.eql({"type": "LineString", "coordinates": [[0,0], [1,1]]});
    });
  });

  describe('createPolygon', function() {
    it('creates a GeoJSON Polygon geometry object', function() {
      var geojson = createPolygon([[[0,0], [1,1], [2,2], [0,0]]]);
      should(geojson).be.eql({"type": "Polygon", "coordinates": [[[0,0], [1,1], [2,2], [0,0]]]});
    });
  });

  describe('readIsolines', function() {
    it('reads a HERE isolines and and tranforms them to a GeoJSON FeatureCollection', function() {
      var hereIsolineResponse = {
        "response": {
          "metaInfo": {
          },
          "center": {
            "latitude": 52.5159999,
            "longitude": 13.3777999
          },
          "isoline": [
            {
              "range": 300,
              "component": [
                {
                  "id": 0,
                  "shape": [
                    "52.5141335,13.3352566",
                    "52.5144768,13.3355141",
                    "52.5146484,13.3360291",
                    "52.5146484,13.3367157",
                    "52.5141335,13.3352566"
                  ]
                }
              ]
            },
            {
              "range": 400,
              "component": [
                {
                  "id": 0,
                  "shape": [
                    "52.5139618,13.3216953",
                    "52.5139618,13.3229828",
                    "52.5137901,13.3234978",
                    "52.5139618,13.3216953"
                  ]
                }
              ]
            }
          ],
          "start": {
            "linkId": "+1089845810",
            "mappedPosition": {
              "latitude": 52.5157642,
              "longitude": 13.377421
            },
            "originalPosition": {
              "latitude": 52.5159999,
              "longitude": 13.3777999
            }
          }
        }
      };
      var fcoll = readIsolines(hereIsolineResponse);
      should(fcoll).have.property('type', 'FeatureCollection');
      should(fcoll).have.property('features').with.lengthOf(2);
      should(fcoll.features[0]).have.property('geometry');
      should(fcoll.features[0].geometry).have.property('type', 'Polygon');
      should(fcoll.features[0].geometry).have.property('coordinates').with.lengthOf(1);
      should(fcoll.features[0].geometry.coordinates[0]).with.lengthOf(5);
      should(fcoll.features[0].properties).have.property('range', 300);
    });
  });

});
