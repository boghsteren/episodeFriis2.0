import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

var SocialMediaShareCount = function (_Component) {
  _inherits(SocialMediaShareCount, _Component);

  function SocialMediaShareCount(props) {
    _classCallCheck(this, SocialMediaShareCount);

    var _this = _possibleConstructorReturn(this, (SocialMediaShareCount.__proto__ || _Object$getPrototypeOf(SocialMediaShareCount)).call(this, props));

    _this._isMounted = false;
    _this.state = { count: 0 };
    return _this;
  }

  _createClass(SocialMediaShareCount, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._isMounted = true;
      this.updateCount(this.props.url);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.url !== this.props.url) {
        this.updateCount(nextProps.url);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: 'updateCount',
    value: function updateCount(url) {
      var _this2 = this;

      if (this.props.getCount) {
        this.setState({
          isLoading: true
        });

        this.props.getCount(url, function (count) {
          if (_this2._isMounted) {
            _this2.setState({
              count: count,
              isLoading: false
            });
          }
        }, this.props.accessToken ? this.props.accessToken : null);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          count = _state.count,
          isLoading = _state.isLoading;
      var _props = this.props,
          children = _props.children,
          className = _props.className;


      return React.createElement(
        'div',
        { className: cx('SocialMediaShareCount', className) },
        !isLoading && children(count || 0)
      );
    }
  }]);

  return SocialMediaShareCount;
}(Component);

SocialMediaShareCount.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  getCount: PropTypes.func,
  url: PropTypes.string.isRequired,
  accessToken: PropTypes.string
};

SocialMediaShareCount.defaultProps = {
  children: function children(shareCount) {
    return shareCount;
  }
};

export default function shareCountFactory(getCount) {
  return function (props) {
    return React.createElement(SocialMediaShareCount, _extends({ getCount: getCount }, props));
  };
}