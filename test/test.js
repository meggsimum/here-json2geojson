import should from 'should/as-function';
import {readPoint} from '../'


describe('hg2geojson', function() {

  describe('readPoint', function() {
    it('reads a HERE point and and tranforms it to a GeoJSON point', function() {
      var herePoint = {lat: 50.0, lng: 8.0};
      var geojsonPoint = readPoint(herePoint);
      should(geojsonPoint).be.eql({"type": "Point", "coordinates": [50.0, 8.0]});
    });
  });

});
