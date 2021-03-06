import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _typeof from 'babel-runtime/helpers/typeof';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

var isPromise = function isPromise(obj) {
  return !!obj && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};

var getBoxPositionOnWindowCenter = function getBoxPositionOnWindowCenter(width, height) {
  return {
    left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
    top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2
  };
};

var getBoxPositionOnScreenCenter = function getBoxPositionOnScreenCenter(width, height) {
  return {
    top: (window.screen.height - height) / 2,
    left: (window.screen.width - width) / 2
  };
};

function windowOpen(url, _ref, onClose) {
  var _ref$height = _ref.height,
      height = _ref$height === undefined ? 400 : _ref$height,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 550 : _ref$width,
      configRest = _objectWithoutProperties(_ref, ['height', 'width']);

  var config = _extends({
    height: height,
    width: width,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes'
  }, configRest);

  var shareDialog = window.open(url, '', _Object$keys(config).map(function (key) {
    return key + '=' + config[key];
  }).join(', '));

  if (onClose) {
    var interval = window.setInterval(function () {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval);
          onClose(shareDialog);
        }
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      }
    }, 1000);
  }

  return shareDialog;
}

var ShareButton = function (_PureComponent) {
  _inherits(ShareButton, _PureComponent);

  function ShareButton() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, ShareButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = ShareButton.__proto__ || _Object$getPrototypeOf(ShareButton)).call.apply(_ref2, [this].concat(args))), _this), _this.onClick = function (e) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onClick = _this$props.onClick,
          openWindow = _this$props.openWindow,
          beforeOnClick = _this$props.beforeOnClick;


      if (disabled) {
        return;
      }

      e.preventDefault();

      var link = _this.link();

      var clickHandler = openWindow ? function () {
        return _this.openWindow(link);
      } : function () {
        return onClick(link);
      };

      if (beforeOnClick) {
        var returnVal = beforeOnClick();

        if (isPromise(returnVal)) {
          returnVal.then(clickHandler);
        } else {
          clickHandler();
        }
      } else {
        clickHandler();
      }
    }, _this.onKeyPress = function (e) {
      if (e.key === 'Enter' || e.key === 13 || e.key === ' ' || e.key === 32) {
        _this.onClick(e);
      }
    }, _this.openWindow = function (link) {
      var _this$props2 = _this.props,
          windowPosition = _this$props2.windowPosition,
          onShareWindowClose = _this$props2.onShareWindowClose,
          windowWidth = _this$props2.windowWidth,
          windowHeight = _this$props2.windowHeight;


      var windowConfig = _extends({
        height: windowHeight,
        width: windowWidth
      }, windowPosition === 'windowCenter' ? getBoxPositionOnWindowCenter(windowWidth, windowHeight) : getBoxPositionOnScreenCenter(windowWidth, windowHeight));

      windowOpen(link, windowConfig, onShareWindowClose);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShareButton, [{
    key: 'link',
    value: function link() {
      var _props = this.props,
          url = _props.url,
          opts = _props.opts,
          networkLink = _props.networkLink;

      return networkLink(url, opts);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          additionalProps = _props2.additionalProps,
          children = _props2.children,
          className = _props2.className,
          disabled = _props2.disabled,
          disabledStyle = _props2.disabledStyle,
          network = _props2.network,
          role = _props2.role,
          style = _props2.style,
          tabIndex = _props2.tabIndex;


      var classes = cx('SocialMediaShareButton', 'SocialMediaShareButton--' + network, {
        'SocialMediaShareButton--disabled': !!disabled,
        disabled: !!disabled
      }, className);

      return React.createElement(
        'div',
        _extends({
          'aria-label': network
        }, additionalProps, {
          role: role,
          tabIndex: tabIndex,
          onClick: this.onClick,
          onKeyPress: this.onKeyPress,
          className: classes,
          style: _extends({}, style, disabled ? disabledStyle : {}) }),
        children
      );
    }
  }]);

  return ShareButton;
}(PureComponent);

ShareButton.propTypes = {
  additionalProps: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  network: PropTypes.string.isRequired,
  networkLink: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  opts: PropTypes.object,
  openWindow: PropTypes.bool,
  url: PropTypes.string.isRequired,
  role: PropTypes.string,
  style: PropTypes.object,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  windowPosition: PropTypes.oneOf(['windowCenter', 'screenCenter']),
  beforeOnClick: PropTypes.func,
  onShareWindowClose: PropTypes.func,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
ShareButton.defaultProps = {
  disabledStyle: {
    opacity: 0.6
  },
  openWindow: true,
  role: 'button',
  windowPosition: 'windowCenter',
  tabIndex: '0'
};


function createShareButton(network, link) {
  var optsMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return {};
  };
  var propTypes = arguments[3];
  var defaultProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var CreatedButton = function CreatedButton(props) {
    return React.createElement(ShareButton, _extends({}, props, {
      network: network,
      networkLink: link,
      opts: optsMap(props) }));
  };

  CreatedButton.propTypes = propTypes;
  CreatedButton.defaultProps = defaultProps;

  return CreatedButton;
}

export default createShareButton;