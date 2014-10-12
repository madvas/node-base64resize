# node-base64resize

## Installation
Since this module uses famous [node-canvas](https://github.com/Automattic/node-canvas) module, you will need to
install Cairo on your machine, so please follow install instructions at [node-canvas](https://github.com/Automattic/node-canvas)

## Usage
### base64resize(options, callback)
#### options

- **src** : base64 string, which will be resized
- **dst** : A path where image will be written. Note:  when no path is specified function returns resized base64 string
- **width** : desired width
- **height** : desired height
- **withPrefix** : whether to include image type prefix when returning base64 e.g. 'data:image/png;base64,', default: true

#### callback function(err, base64str)

## Usage
```
var should = require('should')
  , base64resize = require('../lib/base64resize')
  , validator = require('validator')
  , randombase64 = require('randombase64')
  , fs = require('fs');

describe('base64resize', function() {
  it('writes new resized file into filesystem', function(done) {
    var str = randombase64.generate({width : 500, height : 500, withPrefix : true, unitSize : 5})
      , file = \__dirname + '/tmp.png';
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
```

