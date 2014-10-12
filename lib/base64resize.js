/**
 * Resizes base64 image input and returns new base64 string or saves image into filesystem
 *
 * Available options:
 * src : base64 string, which will be resized
 * width : desired width
 * height : desired height
 * dst : A path where image will be written.
 *  Note when no path is specified function returns resized base64 string
 * withPrefix : whether to include image type prefix when returning base64 e.g. 'data:image/png;base64,', default: true
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

module.exports = function(options, callback) {
  var Canvas = require('canvas')
    , Image = Canvas.Image
    , fs = require('fs')
    , img = new Image
    , options = options || {};

  options.withPrefix = options.withPrefix == undefined ? true : options.withPrefix;
  img.onerror = function(err) {
    throw err;
  };

  img.onload = function() {
    var width = options.width || 100;
    var height = options.height || 100;
    var canvas = new Canvas(width, height);
    var ctx = canvas.getContext('2d');

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, 0, 0, width, height);

    if (options.dst) {
      canvas.toBuffer(function(err, buf) {
        if (err) throw err;
        fs.writeFile(options.dst, buf, callback);
      });
    } else {
      if (options.withPrefix) {
        canvas.toDataURL(null, callback);
      } else {
        var prefix = 'data:image/png;base64,'
          , callbackWrap = function(err, str) {
            callback(err, str.replace(prefix, ''));
          };
        canvas.toDataURL(null, callbackWrap);
      }
    }
  };

  img.src = options.src;

};