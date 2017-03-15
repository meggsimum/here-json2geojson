import should from 'should/as-function';
import {createPoint, createLineString, createPolygon} from '../src/geojson';
import {readIsolines, readRoute, readTrafficIncidents, readWeatherConditions} from '../src/';


describe('here-json2geojson', function() {

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

describe('readTrafficIncidents', function() {
  var hti = {
    "TRAFFICITEMS": {
      "TRAFFICITEM": [
        {
          "TRAFFICITEMID": 2834976395553492500,
          "ORIGINALTRAFFICITEMID": 2621464759813014000,
          "TRAFFICITEMSTATUSSHORTDESC": "ACTIVE",
          "TRAFFICITEMTYPEDESC": "CONSTRUCTION",
          "STARTTIME": "02/28/2017 05:38:54",
          "ENDTIME": "02/28/2019 22:59:00",
          "ENTRYTIME": "02/28/2017 21:33:05",
          "CRITICALITY": {
            "ID": "2",
            "DESCRIPTION": "minor"
          },
          "VERIFIED": true,
          "ABBREVIATION": {
            "SHORTDESC": "CONST",
            "DESCRIPTION": "construction"
          },
          "COMMENTS": "L1065, Stadtgebiet Berlin, Spandauer Straße in beiden Richtungen, in Höhe Kreuzung Karl-Liebknecht-Straße, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 28.02.2019",
          "RDSTMCLOCATIONS": {
            "RDSTMC": [
              {
                "ORIGIN": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "26923",
                  "LOCATIONDESC": "Karl-Liebknecht-Straße",
                  "RDSDIRECTION": "+"
                },
                "DIRECTION": "-",
                "ALERTC": {
                  "TRAFFICCODE": 743,
                  "QUANTIFIERS": 0,
                  "DESCRIPTION": "Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
                  "ALERTCDURATION": "L",
                  "ALERTCDIRECTION": 1,
                  "UPDATECLASS": 5,
                  "PHRASECODE": "E1.D15",
                  "EXTENT": "1",
                  "DURATION": 0
                }
              }
            ]
          },
          "LOCATION": {
            "DEFINED": {
              "ORIGIN": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 9315
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Mühlendamm",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Mühlendamm",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Mühlendamm",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 26923
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "MITTE",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "MITTE",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "MITTE",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "AT",
                  "DESCRIPTION": "at"
                }
              },
              "TO": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 9315
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 26923
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "MITTE",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "MITTE",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "MITTE",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "AT",
                  "DESCRIPTION": "at"
                }
              }
            },
            "GEOLOC": {
              "ORIGIN": {
                "LATITUDE": 52.52003,
                "LONGITUDE": 13.40495
              },
              "TO": [
                {
                  "LATITUDE": 52.52013,
                  "LONGITUDE": 13.40481
                }
              ]
            },
            "NAVTECH": {
              "EDGE": {
                "EDGEID": [
                  "77301951"
                ]
              },
              "VERSIONID": "201701"
            }
          },
          "TRAFFICITEMDETAIL": {
            "ROADCLOSED": false,
            "EVENT": {
              "EVENTITEMCANCELLED": false,
              "SCHEDULEDCONSTRUCTIONEVENT": {
                "SCHEDULEDCONSTRUCTIONTYPEDESC": "CONSTRUCTION",
                "SCHEDULEDCONSTRUCTIONDETAIL": "construction"
              }
            }
          },
          "TRAFFICITEMDESCRIPTION": [
            {
              "content": "Bei Karl-Liebknecht-Straße - Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
              "TYPE": "short_desc"
            },
            {
              "content": "Bei Karl-Liebknecht-Straße - Baustelle; Fahrbahn von auf einen Fahrstreifen verengt. L1065, Stadtgebiet Berlin, Spandauer Straße in beiden Richtungen, in Höhe Kreuzung Karl-Liebknecht-Straße, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 28.02.2019",
              "TYPE": "desc"
            },
            {
              "content": "Baustelle; Fahrbahn von auf einen Fahrstreifen verengt. L1065, Stadtgebiet Berlin, Spandauer Straße in beiden Richtungen, in Höhe Kreuzung Karl-Liebknecht-Straße, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 28.02.2019",
              "TYPE": "no_exit_description"
            }
          ]
        },
        {
          "TRAFFICITEMID": 94004372274052830,
          "ORIGINALTRAFFICITEMID": 94004372274052830,
          "TRAFFICITEMSTATUSSHORTDESC": "ACTIVE",
          "TRAFFICITEMTYPEDESC": "CONSTRUCTION",
          "STARTTIME": "11/04/2016 23:02:27",
          "ENDTIME": "05/04/2017 22:29:00",
          "ENTRYTIME": "02/28/2017 21:35:16",
          "CRITICALITY": {
            "ID": "2",
            "DESCRIPTION": "minor"
          },
          "VERIFIED": true,
          "ABBREVIATION": {
            "SHORTDESC": "CONST",
            "DESCRIPTION": "construction"
          },
          "RDSTMCLOCATIONS": {
            "RDSTMC": [
              {
                "ORIGIN": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "21547",
                  "LOCATIONDESC": "Alexanderplatz",
                  "RDSDIRECTION": "+"
                },
                "TO": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "21546",
                  "LOCATIONDESC": "Wilhelmstraße",
                  "RDSDIRECTION": "+"
                },
                "DIRECTION": "-",
                "ALERTC": {
                  "TRAFFICCODE": 743,
                  "QUANTIFIERS": 0,
                  "DESCRIPTION": "Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
                  "ALERTCDURATION": "L",
                  "ALERTCDIRECTION": 1,
                  "UPDATECLASS": 5,
                  "PHRASECODE": "E1.D15",
                  "EXTENT": "2",
                  "DURATION": 0
                }
              }
            ]
          },
          "LOCATION": {
            "DEFINED": {
              "ORIGIN": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 50232
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Alexanderplatz",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Alexanderplatz",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Alexanderplatz",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 21547
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "TIERGARTEN",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "TIERGARTEN",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "TIERGARTEN",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "MID",
                  "DESCRIPTION": "midway between"
                }
              },
              "TO": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Unter den Linden",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Unter den Linden",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Unter den Linden",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 50232
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Wilhelmstraße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Wilhelmstraße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Wilhelmstraße",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Unter den Linden",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 21546
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "TIERGARTEN",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "TIERGARTEN",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "TIERGARTEN",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "MID",
                  "DESCRIPTION": "midway between"
                }
              }
            },
            "GEOLOC": {
              "ORIGIN": {
                "LATITUDE": 52.52013,
                "LONGITUDE": 13.40481
              },
              "TO": [
                {
                  "LATITUDE": 52.516606,
                  "LONGITUDE": 13.380753
                }
              ]
            },
            "NAVTECH": {
              "EDGE": {
                "EDGEID": [
                  "53500452",
                  "53500479",
                  "53507112",
                  "53507118",
                  "53507119",
                  "53516278",
                  "53516291",
                  "53516297",
                  "53516342",
                  "53517201",
                  "53517202",
                  "53523160",
                  "53594251",
                  "572679720",
                  "572706269",
                  "572706270",
                  "709936264",
                  "709936265",
                  "733069233",
                  "733069281",
                  "733069282",
                  "77269776",
                  "77269777",
                  "77301896",
                  "779384493",
                  "779384494",
                  "779384495",
                  "779395079",
                  "779395080",
                  "779461615",
                  "779461616"
                ]
              },
              "VERSIONID": "201701"
            }
          },
          "TRAFFICITEMDETAIL": {
            "ROADCLOSED": false,
            "EVENT": {
              "EVENTITEMCANCELLED": false,
              "SCHEDULEDCONSTRUCTIONEVENT": {
                "SCHEDULEDCONSTRUCTIONTYPEDESC": "CONSTRUCTION",
                "SCHEDULEDCONSTRUCTIONDETAIL": "construction"
              }
            }
          },
          "TRAFFICITEMDESCRIPTION": [
            {
              "content": "Zwischen Alexanderplatz und Wilhelmstraße - Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
              "TYPE": "short_desc"
            },
            {
              "content": "Zwischen Alexanderplatz und Wilhelmstraße - Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
              "TYPE": "desc"
            },
            {
              "content": "Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
              "TYPE": "no_exit_description"
            }
          ]
        },
        {
          "TRAFFICITEMID": 3731774066085456000,
          "ORIGINALTRAFFICITEMID": 3990353757600530000,
          "TRAFFICITEMSTATUSSHORTDESC": "ACTIVE",
          "TRAFFICITEMTYPEDESC": "CONSTRUCTION",
          "STARTTIME": "06/14/2016 08:48:30",
          "ENDTIME": "12/31/2017 22:59:00",
          "ENTRYTIME": "02/28/2017 21:33:11",
          "CRITICALITY": {
            "ID": "2",
            "DESCRIPTION": "minor"
          },
          "VERIFIED": true,
          "ABBREVIATION": {
            "SHORTDESC": "CONST",
            "DESCRIPTION": "construction"
          },
          "COMMENTS": "L33, Stadtgebiet Berlin, Torstraße, zwischen Kreuzung Friedrichstraße und Kreuzung Rosenthaler Platz, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 31.12.2017",
          "RDSTMCLOCATIONS": {
            "RDSTMC": [
              {
                "ORIGIN": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "26901",
                  "LOCATIONDESC": "Friedrichstraße",
                  "RDSDIRECTION": "-"
                },
                "TO": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "26902",
                  "LOCATIONDESC": "Rosenthaler Platz",
                  "RDSDIRECTION": "-"
                },
                "DIRECTION": "+",
                "ALERTC": {
                  "TRAFFICCODE": 743,
                  "QUANTIFIERS": 0,
                  "DESCRIPTION": "Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
                  "ALERTCDURATION": "L",
                  "ALERTCDIRECTION": 1,
                  "UPDATECLASS": 5,
                  "PHRASECODE": "E1.D15",
                  "EXTENT": "1",
                  "DURATION": 0
                }
              }
            ]
          },
          "LOCATION": {
            "DEFINED": {
              "ORIGIN": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Torstraße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Torstraße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Torstraße",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 50617
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Friedrichstraße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Friedrichstraße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Friedrichstraße",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Torstraße",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 26901
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "MARZAHN",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "MARZAHN",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "MARZAHN",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "AT",
                  "DESCRIPTION": "at"
                }
              },
              "TO": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Torstraße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Torstraße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Torstraße",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 50617
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Rosenthaler Platz",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Rosenthaler Platz",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Rosenthaler Platz",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Torstraße",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 26902
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "MARZAHN",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "MARZAHN",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "MARZAHN",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "AT",
                  "DESCRIPTION": "at"
                }
              }
            },
            "GEOLOC": {
              "ORIGIN": {
                "LATITUDE": 52.52714,
                "LONGITUDE": 13.38697
              },
              "TO": [
                {
                  "LATITUDE": 52.52961,
                  "LONGITUDE": 13.40141
                }
              ]
            },
            "NAVTECH": {
              "EDGE": {
                "EDGEID": [
                  "53499896",
                  "53499908",
                  "53499931",
                  "53499959",
                  "53499981",
                  "53499991",
                  "544596854",
                  "544596855",
                  "833290988",
                  "833290989",
                  "833290990",
                  "833333455",
                  "833333456"
                ]
              },
              "VERSIONID": "201701"
            }
          },
          "TRAFFICITEMDETAIL": {
            "ROADCLOSED": false,
            "EVENT": {
              "EVENTITEMCANCELLED": false,
              "SCHEDULEDCONSTRUCTIONEVENT": {
                "SCHEDULEDCONSTRUCTIONTYPEDESC": "CONSTRUCTION",
                "SCHEDULEDCONSTRUCTIONDETAIL": "construction"
              }
            }
          },
          "TRAFFICITEMDESCRIPTION": [
            {
              "content": "Zwischen Friedrichstraße und Rosenthaler Platz - Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
              "TYPE": "short_desc"
            },
            {
              "content": "Zwischen Friedrichstraße und Rosenthaler Platz - Baustelle; Fahrbahn von auf einen Fahrstreifen verengt. L33, Stadtgebiet Berlin, Torstraße, zwischen Kreuzung Friedrichstraße und Kreuzung Rosenthaler Platz, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 31.12.2017",
              "TYPE": "desc"
            },
            {
              "content": "Baustelle; Fahrbahn von auf einen Fahrstreifen verengt. L33, Stadtgebiet Berlin, Torstraße, zwischen Kreuzung Friedrichstraße und Kreuzung Rosenthaler Platz, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 31.12.2017",
              "TYPE": "no_exit_description"
            }
          ]
        },
        {
          "TRAFFICITEMID": 112849085003784080,
          "ORIGINALTRAFFICITEMID": 3195263269005403600,
          "TRAFFICITEMSTATUSSHORTDESC": "ACTIVE",
          "TRAFFICITEMTYPEDESC": "CONSTRUCTION",
          "STARTTIME": "02/28/2017 05:38:54",
          "ENDTIME": "02/28/2019 22:59:00",
          "ENTRYTIME": "02/28/2017 21:33:05",
          "CRITICALITY": {
            "ID": "2",
            "DESCRIPTION": "minor"
          },
          "VERIFIED": true,
          "ABBREVIATION": {
            "SHORTDESC": "CONST",
            "DESCRIPTION": "construction"
          },
          "COMMENTS": "L1065, Stadtgebiet Berlin, Spandauer Straße in beiden Richtungen, in Höhe Kreuzung Karl-Liebknecht-Straße, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 28.02.2019",
          "RDSTMCLOCATIONS": {
            "RDSTMC": [
              {
                "ORIGIN": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "26923",
                  "LOCATIONDESC": "Karl-Liebknecht-Straße",
                  "RDSDIRECTION": "-"
                },
                "DIRECTION": "+",
                "ALERTC": {
                  "TRAFFICCODE": 743,
                  "QUANTIFIERS": 0,
                  "DESCRIPTION": "Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
                  "ALERTCDURATION": "L",
                  "ALERTCDIRECTION": 1,
                  "UPDATECLASS": 5,
                  "PHRASECODE": "E1.D15",
                  "EXTENT": "1",
                  "DURATION": 0
                }
              }
            ]
          },
          "LOCATION": {
            "DEFINED": {
              "ORIGIN": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 9315
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 26923
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "TREPTOW",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "TREPTOW",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "TREPTOW",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "AT",
                  "DESCRIPTION": "at"
                }
              },
              "TO": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 9315
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 26923
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "TREPTOW",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "TREPTOW",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "TREPTOW",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "AT",
                  "DESCRIPTION": "at"
                }
              }
            },
            "GEOLOC": {
              "ORIGIN": {
                "LATITUDE": 52.52003,
                "LONGITUDE": 13.40464
              },
              "TO": [
                {
                  "LATITUDE": 52.51994,
                  "LONGITUDE": 13.40477
                }
              ]
            },
            "NAVTECH": {
              "EDGE": {
                "EDGEID": [
                  "77301949"
                ]
              },
              "VERSIONID": "201701"
            }
          },
          "TRAFFICITEMDETAIL": {
            "ROADCLOSED": false,
            "EVENT": {
              "EVENTITEMCANCELLED": false,
              "SCHEDULEDCONSTRUCTIONEVENT": {
                "SCHEDULEDCONSTRUCTIONTYPEDESC": "CONSTRUCTION",
                "SCHEDULEDCONSTRUCTIONDETAIL": "construction"
              }
            }
          },
          "TRAFFICITEMDESCRIPTION": [
            {
              "content": "Bei Karl-Liebknecht-Straße - Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
              "TYPE": "short_desc"
            },
            {
              "content": "Bei Karl-Liebknecht-Straße - Baustelle; Fahrbahn von auf einen Fahrstreifen verengt. L1065, Stadtgebiet Berlin, Spandauer Straße in beiden Richtungen, in Höhe Kreuzung Karl-Liebknecht-Straße, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 28.02.2019",
              "TYPE": "desc"
            },
            {
              "content": "Baustelle; Fahrbahn von auf einen Fahrstreifen verengt. L1065, Stadtgebiet Berlin, Spandauer Straße in beiden Richtungen, in Höhe Kreuzung Karl-Liebknecht-Straße, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 28.02.2019",
              "TYPE": "no_exit_description"
            }
          ]
        },
        {
          "TRAFFICITEMID": 2595743720826365400,
          "ORIGINALTRAFFICITEMID": 4572767395712543000,
          "TRAFFICITEMSTATUSSHORTDESC": "ACTIVE",
          "TRAFFICITEMTYPEDESC": "CONSTRUCTION",
          "STARTTIME": "01/02/2017 10:18:51",
          "ENDTIME": "03/08/2017 22:59:00",
          "ENTRYTIME": "02/28/2017 21:34:29",
          "CRITICALITY": {
            "ID": "2",
            "DESCRIPTION": "minor"
          },
          "VERIFIED": true,
          "ABBREVIATION": {
            "SHORTDESC": "CONST",
            "DESCRIPTION": "construction"
          },
          "COMMENTS": "B2, Stadtgebiet Berlin, Unter den Linden bis Karl-Liebknecht-Straße in beiden Richtungen, zwischen Kreuzung Friedrichstraße und Kreuzung Spandauer Straße, Fahrbahn auf einen Fahrstreifen verengt, geänderte Verkehrsführung im Baustellenbereich, bis 08.03.2017",
          "RDSTMCLOCATIONS": {
            "RDSTMC": [
              {
                "ORIGIN": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "32735",
                  "LOCATIONDESC": "Wilhelmstraße",
                  "RDSDIRECTION": "-"
                },
                "TO": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "21547",
                  "LOCATIONDESC": "Spandauer Straße",
                  "RDSDIRECTION": "-"
                },
                "DIRECTION": "+",
                "ALERTC": {
                  "TRAFFICCODE": 514,
                  "QUANTIFIERS": 0,
                  "DESCRIPTION": "Fahrbahn von auf einen Fahrstreifen verengt.",
                  "ALERTCDURATION": "L",
                  "ALERTCDIRECTION": 1,
                  "UPDATECLASS": 5,
                  "PHRASECODE": "D15",
                  "EXTENT": "1",
                  "DURATION": 0
                }
              },
              {
                "ORIGIN": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "32735",
                  "LOCATIONDESC": "Wilhelmstraße",
                  "RDSDIRECTION": "-"
                },
                "TO": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "21547",
                  "LOCATIONDESC": "Spandauer Straße",
                  "RDSDIRECTION": "-"
                },
                "DIRECTION": "+",
                "ALERTC": {
                  "TRAFFICCODE": 810,
                  "DESCRIPTION": "Veränderte Verkehrsführung im Baustellenbereich.",
                  "ALERTCDURATION": "(L)",
                  "ALERTCDIRECTION": 2,
                  "UPDATECLASS": 11,
                  "PHRASECODE": "E19",
                  "EXTENT": "1",
                  "DURATION": 0
                }
              }
            ]
          },
          "LOCATION": {
            "DEFINED": {
              "ORIGIN": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Unter den Linden",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Unter den Linden",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Unter den Linden",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 50232
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Wilhelmstraße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Wilhelmstraße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Wilhelmstraße",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Unter den Linden",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 32735
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "WEIßENSEE",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "WEIßENSEE",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "WEIßENSEE",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "AT",
                  "DESCRIPTION": "at"
                }
              },
              "TO": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 50232
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Spandauer Straße",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Karl-Liebknecht-Straße",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 21547
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "WEIßENSEE",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "WEIßENSEE",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "WEIßENSEE",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "AT",
                  "DESCRIPTION": "at"
                }
              }
            },
            "GEOLOC": {
              "ORIGIN": {
                "LATITUDE": 52.5169,
                "LONGITUDE": 13.38883
              },
              "TO": [
                {
                  "LATITUDE": 52.52003,
                  "LONGITUDE": 13.40495
                }
              ]
            },
            "NAVTECH": {
              "EDGE": {
                "EDGEID": [
                  "53500440",
                  "53500472",
                  "53507112",
                  "53507118",
                  "53507119",
                  "53516284",
                  "53517201",
                  "53523160",
                  "53594251",
                  "53628410",
                  "572706269",
                  "572706270",
                  "572713749",
                  "572713750",
                  "709936266",
                  "709936267",
                  "724106114",
                  "733165858",
                  "733165859",
                  "77269773",
                  "77269774",
                  "77301953",
                  "779384496",
                  "779392732",
                  "779392733",
                  "779395079",
                  "779395080",
                  "779461615",
                  "779461616"
                ]
              },
              "VERSIONID": "201701"
            }
          },
          "TRAFFICITEMDETAIL": {
            "ROADCLOSED": false,
            "EVENT": {
              "EVENTITEMCANCELLED": false,
              "SCHEDULEDCONSTRUCTIONEVENT": {
                "SCHEDULEDCONSTRUCTIONTYPEDESC": "CONSTRUCTION",
                "SCHEDULEDCONSTRUCTIONDETAIL": "construction"
              }
            }
          },
          "TRAFFICITEMDESCRIPTION": [
            {
              "content": "Zwischen Wilhelmstraße und Spandauer Straße - Veränderte Verkehrsführung im Baustellenbereich. Fahrbahn von auf einen Fahrstreifen verengt.",
              "TYPE": "short_desc"
            },
            {
              "content": "Zwischen Wilhelmstraße und Spandauer Straße - Veränderte Verkehrsführung im Baustellenbereich. Fahrbahn von auf einen Fahrstreifen verengt. B2, Stadtgebiet Berlin, Unter den Linden bis Karl-Liebknecht-Straße in beiden Richtungen, zwischen Kreuzung Friedrichstraße und Kreuzung Spandauer Straße, Fahrbahn auf einen Fahrstreifen verengt, geänderte Verkehrsführung im Baustellenbereich, bis 08.03.2017",
              "TYPE": "desc"
            },
            {
              "content": "Veränderte Verkehrsführung im Baustellenbereich. Fahrbahn von auf einen Fahrstreifen verengt. B2, Stadtgebiet Berlin, Unter den Linden bis Karl-Liebknecht-Straße in beiden Richtungen, zwischen Kreuzung Friedrichstraße und Kreuzung Spandauer Straße, Fahrbahn auf einen Fahrstreifen verengt, geänderte Verkehrsführung im Baustellenbereich, bis 08.03.2017",
              "TYPE": "no_exit_description"
            }
          ]
        },
        {
          "TRAFFICITEMID": 4523129799564502500,
          "ORIGINALTRAFFICITEMID": 4523131287961688600,
          "TRAFFICITEMSTATUSSHORTDESC": "ACTIVE",
          "TRAFFICITEMTYPEDESC": "CONSTRUCTION",
          "STARTTIME": "03/01/2017 15:30:03",
          "ENDTIME": "02/28/2018 22:59:00",
          "ENTRYTIME": "03/01/2017 15:32:34",
          "CRITICALITY": {
            "ID": "2",
            "DESCRIPTION": "minor"
          },
          "VERIFIED": true,
          "ABBREVIATION": {
            "SHORTDESC": "CONST",
            "DESCRIPTION": "construction"
          },
          "COMMENTS": "L1008, Stadtgebiet Berlin, Invalidenstraße, zwischen Kreuzung Chausseestraße und Kreuzung Gartenstraße, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 28.02.2018",
          "RDSTMCLOCATIONS": {
            "RDSTMC": [
              {
                "ORIGIN": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "27331",
                  "LOCATIONDESC": "Friedrich-List-Ufer",
                  "RDSDIRECTION": "-"
                },
                "TO": {
                  "EBUCOUNTRYCODE": "D",
                  "TABLEID": 1,
                  "LOCATIONID": "31009",
                  "LOCATIONDESC": "Gartenstraße",
                  "RDSDIRECTION": "-"
                },
                "DIRECTION": "+",
                "ALERTC": {
                  "TRAFFICCODE": 743,
                  "QUANTIFIERS": 0,
                  "DESCRIPTION": "Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
                  "ALERTCDURATION": "L",
                  "ALERTCDIRECTION": 1,
                  "UPDATECLASS": 5,
                  "PHRASECODE": "E1.D15",
                  "EXTENT": "1",
                  "DURATION": 0
                }
              }
            ]
          },
          "LOCATION": {
            "DEFINED": {
              "ORIGIN": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Invalidenstraße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Invalidenstraße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Invalidenstraße",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 50738
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Friedrich-List-Ufer",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Friedrich-List-Ufer",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Friedrich-List-Ufer",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Invalidenstraße",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 27331
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "PRENZLAUER BERG",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "PRENZLAUER BERG",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "PRENZLAUER BERG",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "AT",
                  "DESCRIPTION": "at"
                }
              },
              "TO": {
                "ROADWAY": {
                  "DESCRIPTION": [
                    {
                      "content": "Invalidenstraße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Invalidenstraße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Invalidenstraße",
                      "TYPE": "LOCAL"
                    }
                  ],
                  "ID": 50738
                },
                "POINT": {
                  "DESCRIPTION": [
                    {
                      "content": "Gartenstraße",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "Gartenstraße",
                      "TYPE": "RDSGN"
                    },
                    {
                      "content": "Gartenstraße",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "Invalidenstraße",
                      "TYPE": "BNAME"
                    }
                  ],
                  "ID": 31009
                },
                "DIRECTION": {
                  "DESCRIPTION": [
                    {
                      "content": "PRENZLAUER BERG",
                      "TYPE": "LOCAL"
                    },
                    {
                      "content": "PRENZLAUER BERG",
                      "TYPE": "NTCSA"
                    },
                    {
                      "content": "PRENZLAUER BERG",
                      "TYPE": "RDSGN"
                    }
                  ],
                  "ID": 0
                },
                "PROXIMITY": {
                  "ID": "AT",
                  "DESCRIPTION": "at"
                }
              }
            },
            "GEOLOC": {
              "ORIGIN": {
                "LATITUDE": 52.530372,
                "LONGITUDE": 13.382358
              },
              "TO": [
                {
                  "LATITUDE": 52.53175,
                  "LONGITUDE": 13.38972
                }
              ]
            },
            "NAVTECH": {
              "EDGE": {
                "EDGEID": [
                  "1044853605",
                  "1044853606",
                  "1084662917",
                  "1084662918",
                  "1159397996",
                  "1159397997",
                  "53499799",
                  "746350237",
                  "836011969",
                  "836011970",
                  "931447246",
                  "931447247",
                  "936673241"
                ]
              },
              "VERSIONID": "201701"
            }
          },
          "TRAFFICITEMDETAIL": {
            "ROADCLOSED": false,
            "EVENT": {
              "EVENTITEMCANCELLED": false,
              "SCHEDULEDCONSTRUCTIONEVENT": {
                "SCHEDULEDCONSTRUCTIONTYPEDESC": "CONSTRUCTION",
                "SCHEDULEDCONSTRUCTIONDETAIL": "construction"
              }
            }
          },
          "TRAFFICITEMDESCRIPTION": [
            {
              "content": "Zwischen Friedrich-List-Ufer und Gartenstraße - Baustelle; Fahrbahn von auf einen Fahrstreifen verengt.",
              "TYPE": "short_desc"
            },
            {
              "content": "Zwischen Friedrich-List-Ufer und Gartenstraße - Baustelle; Fahrbahn von auf einen Fahrstreifen verengt. L1008, Stadtgebiet Berlin, Invalidenstraße, zwischen Kreuzung Chausseestraße und Kreuzung Gartenstraße, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 28.02.2018",
              "TYPE": "desc"
            },
            {
              "content": "Baustelle; Fahrbahn von auf einen Fahrstreifen verengt. L1008, Stadtgebiet Berlin, Invalidenstraße, zwischen Kreuzung Chausseestraße und Kreuzung Gartenstraße, Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 28.02.2018",
              "TYPE": "no_exit_description"
            }
          ]
        }
      ]
    },
    "TIMESTAMP": "03/03/2017 10:17:49 GMT",
    "VERSION": 5
  };
  it('reads HERE traffic incidents and transforms them to a GeoJSON FeatureCollection', function() {

    var trIncidents = readTrafficIncidents(hti);
    should(trIncidents).have.property('type', 'FeatureCollection');
    should(trIncidents).have.property('features').with.lengthOf(6);
    should(trIncidents.features[0]).have.property('geometry');
    should(trIncidents.features[0].geometry).have.property('type', 'Point');
    should(trIncidents.features[0].properties).have.property('TRAFFICITEMTYPEDESC', 'CONSTRUCTION');
    should(trIncidents.features[0].properties).not.have.property('LOCATION');
  });
  it('reads HERE traffic incidents (incl. end points) and transforms them to a GeoJSON FeatureCollection', function() {

    var trIncidents = readTrafficIncidents(hti, true);
    should(trIncidents).have.property('type', 'FeatureCollection');
    should(trIncidents).have.property('features').with.lengthOf(12);
  });
});

describe('readWeatherConditions', function() {
  it('reads HERE weather conditions transforms them to a GeoJSON FeatureCollection', function() {

    var wcResp = {
      "observations": {
        "location": [
          {
            "observation": [
              {
                "daylight": "D",
                "description": "Scattered clouds. Cool.",
                "skyInfo": "9",
                "skyDescription": "Scattered clouds",
                "temperature": "9.00",
                "temperatureDesc": "Cool",
                "comfort": "6.96",
                "highTemperature": "10.90",
                "lowTemperature": "2.50",
                "humidity": "71",
                "dewPoint": "4.00",
                "precipitation1H": "*",
                "precipitation3H": "*",
                "precipitation6H": "*",
                "precipitation12H": "*",
                "precipitation24H": "*",
                "precipitationDesc": "",
                "airInfo": "*",
                "airDescription": "",
                "windSpeed": "12.97",
                "windDirection": "240",
                "windDesc": "Southwest",
                "windDescShort": "SW",
                "barometerPressure": "1028.11",
                "barometerTrend": "",
                "visibility": "*",
                "snowCover": "*",
                "icon": "2",
                "iconName": "mostly_sunny",
                "iconLink": "https://weather.cit.api.here.com/static/weather/icon/2.png",
                "ageMinutes": "27",
                "activeAlerts": "0",
                "country": "Germany",
                "state": "Berlin",
                "city": "Unter den Linden",
                "latitude": 52.5178,
                "longitude": 13.3874,
                "distance": 7.65,
                "elevation": 0,
                "utcTime": "2017-03-14T13:50:00.000+01:00"
              }
            ],
            "country": "Germany",
            "state": "Berlin",
            "city": "Unter den Linden",
            "latitude": 52.51784,
            "longitude": 13.38736,
            "distance": 0.23,
            "timezone": 1
          }
        ]
      },
      "feedCreation": "2017-03-14T13:17:51.901Z",
      "metric": true
    };
    var weatherConds = readWeatherConditions(wcResp);
    should(weatherConds).have.property('type', 'FeatureCollection');
    should(weatherConds).have.property('features').with.lengthOf(1);
    should(weatherConds.features[0]).have.property('geometry');
    should(weatherConds.features[0].geometry).have.property('type', 'Point');
    should(weatherConds.features[0].properties).have.property('skyDescription', 'Scattered clouds');
    should(weatherConds.features[0].properties).have.property('city', 'Unter den Linden');
    should(weatherConds.features[0].properties).have.property('temperature', '9.00');
  });
});
