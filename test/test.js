import should from 'should/as-function';
import {createPoint, createLineString, createPolygon} from '../src/geojson';
import {readIsolines, readRoute} from '../src/';


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

  describe('readRoute', function() {
    it('reads a HERE route and and tranforms it to a GeoJSON FeatureCollection', function() {
      var route = {
        "response": {
          "metaInfo": {
            "timestamp": "2017-03-03T09:45:52Z",
            "mapVersion": "8.30.68.151",
            "moduleVersion": "7.2.201709-111134",
            "interfaceVersion": "2.6.29"
          },
          "route": [
            {
              "waypoint": [
                {
                  "linkId": "+119967772",
                  "mappedPosition": {
                    "latitude": 40.7481923,
                    "longitude": -73.9860613
                  },
                  "originalPosition": {
                    "latitude": 40.748,
                    "longitude": -73.9862001
                  },
                  "type": "stopOver",
                  "spot": 0.2248996,
                  "sideOfStreet": "left",
                  "mappedRoadName": "W 33rd St",
                  "label": "W 33rd St",
                  "shapeIndex": 0
                },
                {
                  "linkId": "+826940473",
                  "mappedPosition": {
                    "latitude": 40.7497166,
                    "longitude": -73.993502
                  },
                  "originalPosition": {
                    "latitude": 40.7499999,
                    "longitude": -73.9933
                  },
                  "type": "stopOver",
                  "spot": 0.0638298,
                  "sideOfStreet": "right",
                  "mappedRoadName": "W 31st St",
                  "label": "W 31st St",
                  "shapeIndex": 4
                },
                {
                  "linkId": "-21548636",
                  "mappedPosition": {
                    "latitude": 40.7558561,
                    "longitude": -73.9870295
                  },
                  "originalPosition": {
                    "latitude": 40.7557999,
                    "longitude": -73.9869
                  },
                  "type": "stopOver",
                  "spot": 0.75,
                  "sideOfStreet": "left",
                  "mappedRoadName": "7th Ave",
                  "label": "7th Ave",
                  "shapeIndex": 13
                }
              ],
              "mode": {
                "type": "fastest",
                "transportModes": [
                  "car"
                ],
                "trafficMode": "disabled",
                "feature": []
              },
              "leg": [
                {
                  "start": {
                    "linkId": "+119967772",
                    "mappedPosition": {
                      "latitude": 40.7481923,
                      "longitude": -73.9860613
                    },
                    "originalPosition": {
                      "latitude": 40.748,
                      "longitude": -73.9862001
                    },
                    "type": "stopOver",
                    "spot": 0.2248996,
                    "sideOfStreet": "left",
                    "mappedRoadName": "W 33rd St",
                    "label": "W 33rd St",
                    "shapeIndex": 0
                  },
                  "end": {
                    "linkId": "+826940473",
                    "mappedPosition": {
                      "latitude": 40.7497166,
                      "longitude": -73.993502
                    },
                    "originalPosition": {
                      "latitude": 40.7499999,
                      "longitude": -73.9933
                    },
                    "type": "stopOver",
                    "spot": 0.0638298,
                    "sideOfStreet": "right",
                    "mappedRoadName": "W 31st St",
                    "label": "W 31st St",
                    "shapeIndex": 4
                  },
                  "length": 860,
                  "travelTime": 184,
                  "maneuver": [
                    {
                      "position": {
                        "latitude": 40.7481923,
                        "longitude": -73.9860613
                      },
                      "instruction": "Head toward <span class=\"toward_street\">W 32nd St</span> on <span class=\"street\">W 33rd St</span>. <span class=\"distance-description\">Go for <span class=\"length\">192 m</span>.</span>",
                      "travelTime": 38,
                      "length": 192,
                      "id": "M1",
                      "_type": "PrivateTransportManeuverType"
                    },
                    {
                      "position": {
                        "latitude": 40.7490313,
                        "longitude": -73.9880383
                      },
                      "instruction": "Turn <span class=\"direction\">left</span> onto <span class=\"next-street\">Broadway</span>. <span class=\"distance-description\">Go for <span class=\"length\">168 m</span>.</span>",
                      "travelTime": 46,
                      "length": 168,
                      "id": "M2",
                      "_type": "PrivateTransportManeuverType"
                    },
                    {
                      "position": {
                        "latitude": 40.7475293,
                        "longitude": -73.9883065
                      },
                      "instruction": "Turn <span class=\"direction\">right</span> onto <span class=\"next-street\">W 31st St</span>. <span class=\"distance-description\">Go for <span class=\"length\">500 m</span>.</span>",
                      "travelTime": 100,
                      "length": 500,
                      "id": "M3",
                      "_type": "PrivateTransportManeuverType"
                    },
                    {
                      "position": {
                        "latitude": 40.7497166,
                        "longitude": -73.993502
                      },
                      "instruction": "Arrive at <span class=\"street\">W 31st St</span>. Your destination is on the right.",
                      "travelTime": 0,
                      "length": 0,
                      "id": "M4",
                      "_type": "PrivateTransportManeuverType"
                    }
                  ]
                },
                {
                  "start": {
                    "linkId": "+826940473",
                    "mappedPosition": {
                      "latitude": 40.7497166,
                      "longitude": -73.993502
                    },
                    "originalPosition": {
                      "latitude": 40.7499999,
                      "longitude": -73.9933
                    },
                    "type": "stopOver",
                    "spot": 0.0638298,
                    "sideOfStreet": "right",
                    "mappedRoadName": "W 31st St",
                    "label": "W 31st St",
                    "shapeIndex": 4
                  },
                  "end": {
                    "linkId": "-21548636",
                    "mappedPosition": {
                      "latitude": 40.7558561,
                      "longitude": -73.9870295
                    },
                    "originalPosition": {
                      "latitude": 40.7557999,
                      "longitude": -73.9869
                    },
                    "type": "stopOver",
                    "spot": 0.75,
                    "sideOfStreet": "left",
                    "mappedRoadName": "7th Ave",
                    "label": "7th Ave",
                    "shapeIndex": 13
                  },
                  "length": 1313,
                  "travelTime": 349,
                  "maneuver": [
                    {
                      "position": {
                        "latitude": 40.7497166,
                        "longitude": -73.993502
                      },
                      "instruction": "Head toward <span class=\"toward_street\">8th Ave</span> on <span class=\"street\">W 31st St</span>. <span class=\"distance-description\">Go for <span class=\"length\">132 m</span>.</span>",
                      "travelTime": 27,
                      "length": 132,
                      "id": "M5",
                      "_type": "PrivateTransportManeuverType"
                    },
                    {
                      "position": {
                        "latitude": 40.7502866,
                        "longitude": -73.9948618
                      },
                      "instruction": "Turn <span class=\"direction\">right</span> onto <span class=\"next-street\">8th Ave</span>. <span class=\"distance-description\">Go for <span class=\"length\">882 m</span>.</span>",
                      "travelTime": 228,
                      "length": 882,
                      "id": "M6",
                      "_type": "PrivateTransportManeuverType"
                    },
                    {
                      "position": {
                        "latitude": 40.7572174,
                        "longitude": -73.9897978
                      },
                      "instruction": "Turn <span class=\"direction\">right</span> onto <span class=\"next-street\">W 42nd St</span>. <span class=\"distance-description\">Go for <span class=\"length\">278 m</span>.</span>",
                      "travelTime": 89,
                      "length": 278,
                      "id": "M7",
                      "_type": "PrivateTransportManeuverType"
                    },
                    {
                      "position": {
                        "latitude": 40.7560158,
                        "longitude": -73.9869118
                      },
                      "instruction": "Turn <span class=\"direction\">right</span> onto <span class=\"next-street\">7th Ave</span>. <span class=\"distance-description\">Go for <span class=\"length\">21 m</span>.</span>",
                      "travelTime": 5,
                      "length": 21,
                      "id": "M8",
                      "_type": "PrivateTransportManeuverType"
                    },
                    {
                      "position": {
                        "latitude": 40.7558561,
                        "longitude": -73.9870295
                      },
                      "instruction": "Arrive at <span class=\"street\">7th Ave</span>. Your destination is on the left.",
                      "travelTime": 0,
                      "length": 0,
                      "id": "M9",
                      "_type": "PrivateTransportManeuverType"
                    }
                  ]
                }
              ],
              "summary": {
                "distance": 2173,
                "trafficTime": 664,
                "baseTime": 533,
                "text": "The trip takes <span class=\"length\">2.2 km</span> and <span class=\"time\">9 mins</span>.",
                "travelTime": 533,
                "_type": "RouteSummaryType"
              }
            }
          ],
          "language": "en-us"
        }
      };

      var routeFeatCollection = readRoute(route);

      should(routeFeatCollection).have.property('type', 'FeatureCollection');
      should(routeFeatCollection).have.property('features').with.lengthOf(2);
      should(routeFeatCollection.features[0]).have.property('geometry');
      should(routeFeatCollection.features[0].geometry).have.property('type', 'LineString');
      should(routeFeatCollection.features[0].geometry).have.property('coordinates').with.lengthOf(6);
      should(routeFeatCollection.features[0].properties).have.property('length', 860);
      should(routeFeatCollection.features[0].properties).have.property('travelTime', 184);
    });
  });

});
