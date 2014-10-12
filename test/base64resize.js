var should = require('should')
  , base64resize = require('../lib/base64resize')
  , validator = require('validator')
  , randombase64 = require('randombase64')
  , fs = require('fs');

describe('base64resize', function() {
  it('writes new resized file into filesystem', function(done) {
    var str = randombase64.generate({width : 500, height : 500, withPrefix : true, unitSize : 5})
      , file = __dirname + '/tmp.png';

    base64resize({
      src    : str,
      dst    : file,
      width  : 50,
      height : 50
    }, function(err) {
      should.not.exist(err);
      fs.existsSync(file).should.be.true;
      fs.unlink(file, done);
    });
  });

  it('returns resized base64 string when no dst is specified', function(done) {
    var str = randombase64.generate({width : 500, height : 500, withPrefix : true, unitSize : 5});
    base64resize({
      src        : str,
      width      : 50,
      height     : 50,
      withPrefix : false
    }, function(err, resized) {
      should.not.exist(err);
      validator.isBase64(resized).should.be.true;
      str.length.should.be.above(resized.length);
      done();
    });
  });
});
