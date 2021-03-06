'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonp = require('jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _shareCountFactory = require('./utils/shareCountFactory');

var _shareCountFactory2 = _interopRequireDefault(_shareCountFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFacebookShareCount(shareUrl, callback, accessToken) {
  var endpoint = 'https://graph.facebook.com/?id=' + shareUrl + '&fields=engagement&access_token=' + accessToken;

  (0, _jsonp2.default)(endpoint, function (err, data) {
    callback(!err && data && data.engagement && data.engagement.share_count ? data.engagement.share_count : undefined);
  });
}

exports.default = (0, _shareCountFactory2.default)(getFacebookShareCount);