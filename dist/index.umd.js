'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _excluded = ["src", "checkForExisting"];
function useScript(_ref) {
  var src = _ref.src,
      _ref$checkForExisting = _ref.checkForExisting,
      checkForExisting = _ref$checkForExisting === void 0 ? false : _ref$checkForExisting,
      attributes = _objectWithoutProperties(_ref, _excluded);

  var _useState = react.useState(Boolean(src)),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = react.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  react.useEffect(function () {
    if (!isBrowser || !src) return;

    if (checkForExisting) {
      var existing = document.querySelectorAll("script[src=\"".concat(src, "\"]"));

      if (existing.length > 0) {
        setLoading(false);
        return;
      }
    }

    var scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', src);
    Object.keys(attributes).forEach(function (key) {
      //@ts-ignore
      if (scriptEl[key] === undefined) {
        scriptEl.setAttribute(key, attributes[key]);
      } else {
        //@ts-ignore
        scriptEl[key] = attributes[key];
      }
    });

    var handleLoad = function handleLoad() {
      setLoading(false);
    };

    var handleError = function handleError(error) {
      setError(error);
    };

    scriptEl.addEventListener('load', handleLoad);
    scriptEl.addEventListener('error', handleError);
    document.body.appendChild(scriptEl);
    return function () {
      scriptEl.removeEventListener('load', handleLoad);
      scriptEl.removeEventListener('error', handleError);
    }; // we need to ignore the attributes as they're a new object per call, so we'd never skip an effect call
  }, [src]);
  return [loading, error];
}
var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

var useMergeLink = function useMergeLink(config) {
  var _useScript = useScript({
    src: 'https://cdn.merge.dev/initialize.js',
    checkForExisting: true
  }),
      _useScript2 = _slicedToArray(_useScript, 2),
      loading = _useScript2[0],
      error = _useScript2[1];

  var _useState = react.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isReady = _useState2[0],
      setIsReady = _useState2[1];

  var isServer = typeof window === 'undefined';
  var isReadyForInitialization = !isServer && !!window.MergeLink && !loading && !error;
  react.useEffect(function () {
    if (isReadyForInitialization && window.MergeLink) {
      window.MergeLink.initialize(_objectSpread2(_objectSpread2({}, config), {}, {
        onReady: function onReady() {
          return setIsReady(true);
        }
      }));
    }
  }, [isReadyForInitialization, config]);

  var open = function open() {
    if (window.MergeLink) {
      window.MergeLink.openLink(config);
    }
  };

  return {
    open: open,
    isReady: isReady,
    error: error
  };
};

exports.useMergeLink = useMergeLink;
