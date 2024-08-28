export default (function (n) {
  'use strict';
  var t,
    r,
    o = function () {
      return (o =
        Object.assign ||
        function (n) {
          for (var t, r = 1, o = arguments.length; r < o; r++)
            for (var $ in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, $) && (n[$] = t[$]);
          return n;
        }).apply(this, arguments);
    };
  function $(n, t, r, o) {
    return new (r || (r = Promise))(function ($, i) {
      function a(n) {
        try {
          u(o.next(n));
        } catch (t) {
          i(t);
        }
      }
      function c(n) {
        try {
          u(o.throw(n));
        } catch (t) {
          i(t);
        }
      }
      function u(n) {
        var t;
        n.done
          ? $(n.value)
          : ((t = n.value) instanceof r
              ? t
              : new r(function (n) {
                  n(t);
                })
            ).then(a, c);
      }
      u((o = o.apply(n, t || [])).next());
    });
  }
  function i(n, t) {
    var r,
      o,
      $,
      i,
      a = {
        label: 0,
        sent: function () {
          if (1 & $[0]) throw $[1];
          return $[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (i = { next: c(0), throw: c(1), return: c(2) }),
      'function' == typeof Symbol &&
        (i[Symbol.iterator] = function () {
          return this;
        }),
      i
    );
    function c(c) {
      return function (u) {
        return (function (c) {
          if (r) throw TypeError('Generator is already executing.');
          for (; i && ((i = 0), c[0] && (a = 0)), a; )
            try {
              if (
                ((r = 1),
                o &&
                  ($ =
                    2 & c[0]
                      ? o.return
                      : c[0]
                        ? o.throw || (($ = o.return) && $.call(o), 0)
                        : o.next) &&
                  !($ = $.call(o, c[1])).done)
              )
                return $;
              switch (((o = 0), $ && (c = [2 & c[0], $.value]), c[0])) {
                case 0:
                case 1:
                  $ = c;
                  break;
                case 4:
                  return a.label++, { value: c[1], done: !1 };
                case 5:
                  a.label++, (o = c[1]), (c = [0]);
                  continue;
                case 7:
                  (c = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !($ = ($ = a.trys).length > 0 && $[$.length - 1]) &&
                    (6 === c[0] || 2 === c[0])
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === c[0] && (!$ || (c[1] > $[0] && c[1] < $[3]))) {
                    a.label = c[1];
                    break;
                  }
                  if (6 === c[0] && a.label < $[1]) {
                    (a.label = $[1]), ($ = c);
                    break;
                  }
                  if ($ && a.label < $[2]) {
                    (a.label = $[2]), a.ops.push(c);
                    break;
                  }
                  $[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              c = t.call(n, a);
            } catch (u) {
              (c = [6, u]), (o = 0);
            } finally {
              r = $ = 0;
            }
          if (5 & c[0]) throw c[1];
          return { value: c[0] ? c[1] : void 0, done: !0 };
        })([c, u]);
      };
    }
  }
  function a(n, t, r) {
    if (r || 2 === arguments.length)
      for (var o, $ = 0, i = t.length; $ < i; $++)
        (!o && $ in t) || (o || (o = Array.prototype.slice.call(t, 0, $)), (o[$] = t[$]));
    return n.concat(o || Array.prototype.slice.call(t));
  }
  function c(n, t) {
    return new Promise(function (r) {
      return setTimeout(r, n, t);
    });
  }
  function u() {
    return c(0);
  }
  function l(n) {
    return !!n && 'function' == typeof n.then;
  }
  function s(n, t) {
    try {
      var r = n();
      l(r)
        ? r.then(
            function (n) {
              return t(!0, n);
            },
            function (n) {
              return t(!1, n);
            },
          )
        : t(!0, r);
    } catch (o) {
      t(!1, o);
    }
  }
  function d(n, t, r) {
    return (
      void 0 === r && (r = 16),
      $(this, void 0, void 0, function () {
        var o, $, a, u;
        return i(this, function (i) {
          switch (i.label) {
            case 0:
              (o = Array(n.length)), ($ = Date.now()), (a = 0), (i.label = 1);
            case 1:
              return a < n.length
                ? ((o[a] = t(n[a], a)), (u = Date.now()) >= $ + r ? (($ = u), [4, c(0)]) : [3, 3])
                : [3, 4];
            case 2:
              i.sent(), (i.label = 3);
            case 3:
              return ++a, [3, 1];
            case 4:
              return [2, o];
          }
        });
      })
    );
  }
  function f(n) {
    n.then(void 0, function () {});
  }
  function m(n) {
    return parseInt(n);
  }
  function v(n) {
    return parseFloat(n);
  }
  function h(n, t) {
    return 'number' == typeof n && isNaN(n) ? t : n;
  }
  function _(n) {
    return n.reduce(function (n, t) {
      return n + (t ? 1 : 0);
    }, 0);
  }
  function p(n, t) {
    if ((void 0 === t && (t = 1), Math.abs(t) >= 1)) return Math.round(n / t) * t;
    var r = 1 / t;
    return Math.round(n * r) / r;
  }
  function b(n, t) {
    var r = n[0] >>> 16,
      o = 65535 & n[0],
      $ = n[1] >>> 16,
      i = 65535 & n[1],
      a = t[0] >>> 16,
      c = 65535 & t[0],
      u = t[1] >>> 16,
      l = 0,
      s = 0,
      d = 0,
      f = 0;
    (d += (f += i + (65535 & t[1])) >>> 16),
      (f &= 65535),
      (s += (d += $ + u) >>> 16),
      (d &= 65535),
      (l += (s += o + c) >>> 16),
      (s &= 65535),
      (l += r + a),
      (l &= 65535),
      (n[0] = (l << 16) | s),
      (n[1] = (d << 16) | f);
  }
  function y(n, t) {
    var r = n[0] >>> 16,
      o = 65535 & n[0],
      $ = n[1] >>> 16,
      i = 65535 & n[1],
      a = t[0] >>> 16,
      c = 65535 & t[0],
      u = t[1] >>> 16,
      l = 65535 & t[1],
      s = 0,
      d = 0,
      f = 0,
      m = 0;
    (f += (m += i * l) >>> 16),
      (m &= 65535),
      (d += (f += $ * l) >>> 16),
      (f &= 65535),
      (d += (f += i * u) >>> 16),
      (f &= 65535),
      (s += (d += o * l) >>> 16),
      (d &= 65535),
      (s += (d += $ * u) >>> 16),
      (d &= 65535),
      (s += (d += i * c) >>> 16),
      (d &= 65535),
      (s += r * l + o * u + $ * c + i * a),
      (s &= 65535),
      (n[0] = (s << 16) | d),
      (n[1] = (f << 16) | m);
  }
  function g(n, t) {
    var r = n[0];
    32 == (t %= 64)
      ? ((n[0] = n[1]), (n[1] = r))
      : t < 32
        ? ((n[0] = (r << t) | (n[1] >>> (32 - t))), (n[1] = (n[1] << t) | (r >>> (32 - t))))
        : ((t -= 32),
          (n[0] = (n[1] << t) | (r >>> (32 - t))),
          (n[1] = (r << t) | (n[1] >>> (32 - t))));
  }
  function L(n, t) {
    0 != (t %= 64) &&
      (t < 32
        ? ((n[0] = n[1] >>> (32 - t)), (n[1] = n[1] << t))
        : ((n[0] = n[1] << (t - 32)), (n[1] = 0)));
  }
  function k(n, t) {
    (n[0] ^= t[0]), (n[1] ^= t[1]);
  }
  var w = [4283543511, 3981806797],
    V = [3301882366, 444984403];
  function S(n) {
    var t = [0, n[0] >>> 1];
    k(n, t), y(n, w), (t[1] = n[0] >>> 1), k(n, t), y(n, V), (t[1] = n[0] >>> 1), k(n, t);
  }
  var W = [2277735313, 289559509],
    Z = [1291169091, 658871167],
    x = [0, 5],
    R = [0, 1390208809],
    F = [0, 944331445];
  function G(n, t) {
    var r = (function (n) {
      for (var t = new Uint8Array(n.length), r = 0; r < n.length; r++) {
        var o = n.charCodeAt(r);
        if (o > 127) return new TextEncoder().encode(n);
        t[r] = o;
      }
      return t;
    })(n);
    t = t || 0;
    var o,
      $ = [0, r.length],
      i = $[1] % 16,
      a = $[1] - i,
      c = [0, t],
      u = [0, t],
      l = [0, 0],
      s = [0, 0];
    for (o = 0; o < a; o += 16)
      (l[0] = r[o + 4] | (r[o + 5] << 8) | (r[o + 6] << 16) | (r[o + 7] << 24)),
        (l[1] = r[o] | (r[o + 1] << 8) | (r[o + 2] << 16) | (r[o + 3] << 24)),
        (s[0] = r[o + 12] | (r[o + 13] << 8) | (r[o + 14] << 16) | (r[o + 15] << 24)),
        (s[1] = r[o + 8] | (r[o + 9] << 8) | (r[o + 10] << 16) | (r[o + 11] << 24)),
        y(l, W),
        g(l, 31),
        y(l, Z),
        k(c, l),
        g(c, 27),
        b(c, u),
        y(c, x),
        b(c, R),
        y(s, Z),
        g(s, 33),
        y(s, W),
        k(u, s),
        g(u, 31),
        b(u, c),
        y(u, x),
        b(u, F);
    (l[0] = 0), (l[1] = 0), (s[0] = 0), (s[1] = 0);
    var d = [0, 0];
    switch (i) {
      case 15:
        (d[1] = r[o + 14]), L(d, 48), k(s, d);
      case 14:
        (d[1] = r[o + 13]), L(d, 40), k(s, d);
      case 13:
        (d[1] = r[o + 12]), L(d, 32), k(s, d);
      case 12:
        (d[1] = r[o + 11]), L(d, 24), k(s, d);
      case 11:
        (d[1] = r[o + 10]), L(d, 16), k(s, d);
      case 10:
        (d[1] = r[o + 9]), L(d, 8), k(s, d);
      case 9:
        (d[1] = r[o + 8]), k(s, d), y(s, Z), g(s, 33), y(s, W), k(u, s);
      case 8:
        (d[1] = r[o + 7]), L(d, 56), k(l, d);
      case 7:
        (d[1] = r[o + 6]), L(d, 48), k(l, d);
      case 6:
        (d[1] = r[o + 5]), L(d, 40), k(l, d);
      case 5:
        (d[1] = r[o + 4]), L(d, 32), k(l, d);
      case 4:
        (d[1] = r[o + 3]), L(d, 24), k(l, d);
      case 3:
        (d[1] = r[o + 2]), L(d, 16), k(l, d);
      case 2:
        (d[1] = r[o + 1]), L(d, 8), k(l, d);
      case 1:
        (d[1] = r[o]), k(l, d), y(l, W), g(l, 31), y(l, Z), k(c, l);
    }
    return (
      k(c, $),
      k(u, $),
      b(c, u),
      b(u, c),
      S(c),
      S(u),
      b(c, u),
      b(u, c),
      ('00000000' + (c[0] >>> 0).toString(16)).slice(-8) +
        ('00000000' + (c[1] >>> 0).toString(16)).slice(-8) +
        ('00000000' + (u[0] >>> 0).toString(16)).slice(-8) +
        ('00000000' + (u[1] >>> 0).toString(16)).slice(-8)
    );
  }
  function I(n) {
    return 'function' != typeof n;
  }
  function Y(n, t, r) {
    var o = Object.keys(n).filter(function (n) {
        return !(function (n, t) {
          for (var r = 0, o = n.length; r < o; ++r) if (n[r] === t) return !0;
          return !1;
        })(r, n);
      }),
      a = d(o, function (r) {
        var o, $, i;
        return (
          (o = n[r]),
          ($ = t),
          (i = new Promise(function (n) {
            var t = Date.now();
            s(o.bind(null, $), function () {
              for (var r = [], o = 0; o < arguments.length; o++) r[o] = arguments[o];
              var $ = Date.now() - t;
              if (!r[0])
                return n(function () {
                  return { error: r[1], duration: $ };
                });
              var i = r[1];
              if (I(i))
                return n(function () {
                  return { value: i, duration: $ };
                });
              n(function () {
                return new Promise(function (n) {
                  var t = Date.now();
                  s(i, function () {
                    for (var r = [], o = 0; o < arguments.length; o++) r[o] = arguments[o];
                    var i = $ + Date.now() - t;
                    if (!r[0]) return n({ error: r[1], duration: i });
                    n({ value: r[1], duration: i });
                  });
                });
              });
            });
          })),
          f(i),
          function () {
            return i.then(function (n) {
              return n();
            });
          }
        );
      });
    return (
      f(a),
      function () {
        return $(this, void 0, void 0, function () {
          var n, t, r, $;
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, a];
              case 1:
                return [
                  4,
                  d(i.sent(), function (n) {
                    var t = n();
                    return f(t), t;
                  }),
                ];
              case 2:
                return [4, Promise.all((n = i.sent()))];
              case 3:
                for (t = i.sent(), r = {}, $ = 0; $ < o.length; ++$) r[o[$]] = t[$];
                return [2, r];
            }
          });
        });
      }
    );
  }
  function X() {
    var n = window,
      t = navigator;
    return (
      _([
        'MSCSSMatrix' in n,
        'msSetImmediate' in n,
        'msIndexedDB' in n,
        'msMaxTouchPoints' in t,
        'msPointerEnabled' in t,
      ]) >= 4
    );
  }
  function C() {
    var n = window,
      t = navigator;
    return (
      _(['msWriteProfilerMark' in n, 'MSStream' in n, 'msLaunchUri' in t, 'msSaveBlob' in t]) >=
        3 && !X()
    );
  }
  function M() {
    var n = window,
      t = navigator;
    return (
      _([
        'webkitPersistentStorage' in t,
        'webkitTemporaryStorage' in t,
        0 === t.vendor.indexOf('Google'),
        'webkitResolveLocalFileSystemURL' in n,
        'BatteryManager' in n,
        'webkitMediaStream' in n,
        'webkitSpeechGrammar' in n,
      ]) >= 5
    );
  }
  function H() {
    var n = window,
      t = navigator;
    return (
      _([
        'ApplePayError' in n,
        'CSSPrimitiveValue' in n,
        'Counter' in n,
        0 === t.vendor.indexOf('Apple'),
        'getStorageUpdates' in t,
        'WebKitMediaKeys' in n,
      ]) >= 4
    );
  }
  function j() {
    var n = window,
      t = n.HTMLElement,
      r = n.Document;
    return (
      _([
        'safari' in n,
        !('ongestureend' in n),
        !('TouchEvent' in n),
        !('orientation' in n),
        t && !('autocapitalize' in t.prototype),
        r && 'pointerLockElement' in r.prototype,
      ]) >= 4
    );
  }
  function P() {
    var n,
      t = window;
    return (
      (n = t.print),
      !!/^function\s.*?\{\s*\[native code]\s*}$/.test(String(n)) &&
        _(['[object WebPageNamespace]' === String(t.browser), 'MicrodataExtractor' in t]) >= 1
    );
  }
  function E() {
    var n,
      t,
      r = window;
    return (
      _([
        'buildID' in navigator,
        'MozAppearance' in
          (null !==
            (t = null === (n = document.documentElement) || void 0 === n ? void 0 : n.style) &&
          void 0 !== t
            ? t
            : {}),
        'onmozfullscreenchange' in r,
        'mozInnerScreenX' in r,
        'CSSMozDocumentRule' in r,
        'CanvasCaptureMediaStream' in r,
      ]) >= 4
    );
  }
  function J() {
    var n = window,
      t = navigator,
      r = n.CSS,
      o = n.HTMLButtonElement;
    return (
      _([
        !('getStorageUpdates' in t),
        o && 'popover' in o.prototype,
        'CSSCounterStyleRule' in n,
        r.supports('font-size-adjust: ex-height 0.5'),
        r.supports('text-transform: full-width'),
      ]) >= 4
    );
  }
  function N() {
    var n = document;
    return (
      n.fullscreenElement ||
      n.msFullscreenElement ||
      n.mozFullScreenElement ||
      n.webkitFullscreenElement ||
      null
    );
  }
  function A() {
    var n = M(),
      t = E(),
      r = window,
      o = navigator,
      $ = 'connection';
    return n
      ? _([
          !('SharedWorker' in r),
          o[$] && 'ontypechange' in o[$],
          !('sinkId' in new window.Audio()),
        ]) >= 2
      : !!t &&
          _([
            'onorientationchange' in r,
            'orientation' in r,
            /android/i.test(navigator.appVersion),
          ]) >= 2;
  }
  function T() {
    var n = window,
      t = n.OfflineAudioContext || n.webkitOfflineAudioContext;
    if (!t) return -2;
    if (
      H() &&
      !j() &&
      (($ = window),
      !(
        _([
          'DOMRectList' in $,
          'RTCPeerConnectionIceEvent' in $,
          'SVGGeometryElement' in $,
          'ontransitioncancel' in $,
        ]) >= 3
      ))
    )
      return -1;
    var r = new t(1, 5e3, 44100),
      o = r.createOscillator();
    (o.type = 'triangle'), (o.frequency.value = 1e4);
    var $,
      i,
      a,
      c = r.createDynamicsCompressor();
    (c.threshold.value = -50),
      (c.knee.value = 40),
      (c.ratio.value = 12),
      (c.attack.value = 0),
      (c.release.value = 0.25),
      o.connect(c),
      c.connect(r.destination),
      o.start(0);
    var u =
        ((i = r),
        (a = function () {}),
        [
          new Promise(function (n, t) {
            var r = !1,
              o = 0,
              $ = 0;
            i.oncomplete = function (t) {
              return n(t.renderedBuffer);
            };
            var c = function () {
                setTimeout(
                  function () {
                    return t(z('timeout'));
                  },
                  Math.min(500, $ + 5e3 - Date.now()),
                );
              },
              u = function () {
                try {
                  var n = i.startRendering();
                  switch ((l(n) && f(n), i.state)) {
                    case 'running':
                      ($ = Date.now()), r && c();
                      break;
                    case 'suspended':
                      document.hidden || o++, r && o >= 3 ? t(z('suspended')) : setTimeout(u, 500);
                  }
                } catch (a) {
                  t(a);
                }
              };
            u(),
              (a = function () {
                r || ((r = !0), $ > 0 && c());
              });
          }),
          a,
        ]),
      s = u[0],
      d = u[1],
      m = s.then(
        function (n) {
          return (function (n) {
            for (var t = 0, r = 0; r < n.length; ++r) t += Math.abs(n[r]);
            return t;
          })(n.getChannelData(0).subarray(4500));
        },
        function (n) {
          if ('timeout' === n.name || 'suspended' === n.name) return -3;
          throw n;
        },
      );
    return (
      f(m),
      function () {
        return d(), m;
      }
    );
  }
  function z(n) {
    var t = Error(n);
    return (t.name = n), t;
  }
  function B(n, t, r) {
    var o, a, u;
    return (
      void 0 === r && (r = 50),
      $(this, void 0, void 0, function () {
        var $, l;
        return i(this, function (i) {
          switch (i.label) {
            case 0:
              ($ = document), (i.label = 1);
            case 1:
              return $.body ? [3, 3] : [4, c(r)];
            case 2:
              return i.sent(), [3, 1];
            case 3:
              (l = $.createElement('iframe')), (i.label = 4);
            case 4:
              return (
                i.trys.push([4, , 10, 11]),
                [
                  4,
                  new Promise(function (n, r) {
                    var o = !1,
                      i = function () {
                        (o = !0), n();
                      };
                    (l.onload = i),
                      (l.onerror = function (n) {
                        (o = !0), r(n);
                      });
                    var a = l.style;
                    a.setProperty('display', 'block', 'important'),
                      (a.position = 'absolute'),
                      (a.top = '0'),
                      (a.left = '0'),
                      (a.visibility = 'hidden'),
                      t && 'srcdoc' in l ? (l.srcdoc = t) : (l.src = 'about:blank'),
                      $.body.appendChild(l);
                    var c = function () {
                      var n, t;
                      o ||
                        ('complete' ===
                        (null ===
                          (t =
                            null === (n = l.contentWindow) || void 0 === n ? void 0 : n.document) ||
                        void 0 === t
                          ? void 0
                          : t.readyState)
                          ? i()
                          : setTimeout(c, 10));
                    };
                    c();
                  }),
                ]
              );
            case 5:
              i.sent(), (i.label = 6);
            case 6:
              return (
                null ===
                  (a = null === (o = l.contentWindow) || void 0 === o ? void 0 : o.document) ||
                void 0 === a
                  ? void 0
                  : a.body
              )
                ? [3, 8]
                : [4, c(r)];
            case 7:
              return i.sent(), [3, 6];
            case 8:
              return [4, n(l, l.contentWindow)];
            case 9:
              return [2, i.sent()];
            case 10:
              return null === (u = l.parentNode) || void 0 === u || u.removeChild(l), [7];
            case 11:
              return [2];
          }
        });
      })
    );
  }
  function D(n) {
    for (
      var t = (function (n) {
          for (
            var t,
              r,
              o = "Unexpected syntax '".concat(n, "'"),
              $ = /^\s*([a-z-]*)(.*)$/i.exec(n),
              i = $[1] || void 0,
              a = {},
              c = /([.:#][\w-]+|\[.+?\])/gi,
              u = function (n, t) {
                (a[n] = a[n] || []), a[n].push(t);
              };
            ;

          ) {
            var l = c.exec($[2]);
            if (!l) break;
            var s = l[0];
            switch (s[0]) {
              case '.':
                u('class', s.slice(1));
                break;
              case '#':
                u('id', s.slice(1));
                break;
              case '[':
                var d = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(s);
                if (!d) throw Error(o);
                u(
                  d[1],
                  null !== (r = null !== (t = d[4]) && void 0 !== t ? t : d[5]) && void 0 !== r
                    ? r
                    : '',
                );
                break;
              default:
                throw Error(o);
            }
          }
          return [i, a];
        })(n),
        r = t[0],
        o = t[1],
        $ = document.createElement(null != r ? r : 'div'),
        i = 0,
        a = Object.keys(o);
      i < a.length;
      i++
    ) {
      var c = a[i],
        u = o[c].join(' ');
      'style' === c ? O($.style, u) : $.setAttribute(c, u);
    }
    return $;
  }
  function O(n, t) {
    for (var r = 0, o = t.split(';'); r < o.length; r++) {
      var $ = o[r],
        i = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec($);
      if (i) {
        var a = i[1],
          c = i[2],
          u = i[4];
        n.setProperty(a, c, u || '');
      }
    }
  }
  var U = ['monospace', 'sans-serif', 'serif'],
    Q = [
      'sans-serif-thin',
      'ARNO PRO',
      'Agency FB',
      'Arabic Typesetting',
      'Arial Unicode MS',
      'AvantGarde Bk BT',
      'BankGothic Md BT',
      'Batang',
      'Bitstream Vera Sans Mono',
      'Calibri',
      'Century',
      'Century Gothic',
      'Clarendon',
      'EUROSTILE',
      'Franklin Gothic',
      'Futura Bk BT',
      'Futura Md BT',
      'GOTHAM',
      'Gill Sans',
      'HELV',
      'Haettenschweiler',
      'Helvetica Neue',
      'Humanst521 BT',
      'Leelawadee',
      'Letter Gothic',
      'Levenim MT',
      'Lucida Bright',
      'Lucida Sans',
      'Menlo',
      'MS Mincho',
      'MS Outlook',
      'MS Reference Specialty',
      'MS UI Gothic',
      'MT Extra',
      'MYRIAD PRO',
      'Marlett',
      'Meiryo UI',
      'Microsoft Uighur',
      'Minion Pro',
      'Monotype Corsiva',
      'PMingLiU',
      'Pristina',
      'SCRIPTINA',
      'Segoe UI Light',
      'Serifa',
      'SimHei',
      'Small Fonts',
      'Staccato222 BT',
      'TRAJAN PRO',
      'Univers CE 55 Medium',
      'Vrinda',
      'ZWAdobeF',
    ];
  function K(n) {
    return $(this, void 0, void 0, function () {
      var t, r, o, a, c, l, s;
      return i(this, function (d) {
        var f, m, v, h;
        switch (d.label) {
          case 0:
            return (
              (t = !1),
              (c = (a =
                (((f = document.createElement('canvas')).width = 1),
                (f.height = 1),
                [f, f.getContext('2d')]))[0]),
              (l = a[1]),
              ((m = c), (v = l) && m.toDataURL) ? [3, 1] : ((r = o = 'unsupported'), [3, 4])
            );
          case 1:
            return (
              (t =
                ((h = l).rect(0, 0, 10, 10),
                h.rect(2, 2, 6, 6),
                !h.isPointInPath(5, 5, 'evenodd'))),
              n ? ((r = o = 'skipped'), [3, 4]) : [3, 2]
            );
          case 2:
            return [
              4,
              (function n(t, r) {
                return $(this, void 0, void 0, function () {
                  var n, o;
                  return i(this, function ($) {
                    switch ($.label) {
                      case 0:
                        var i, a, c;
                        return (
                          (i = t),
                          (a = r),
                          (i.width = 240),
                          (i.height = 60),
                          (a.textBaseline = 'alphabetic'),
                          (a.fillStyle = '#f60'),
                          a.fillRect(100, 1, 62, 20),
                          (a.fillStyle = '#069'),
                          (a.font = '11pt "Times New Roman"'),
                          (c = 'Cwm fjordbank gly '.concat(String.fromCharCode(55357, 56835))),
                          a.fillText(c, 2, 15),
                          (a.fillStyle = 'rgba(102, 204, 0, 0.2)'),
                          (a.font = '18pt Arial'),
                          a.fillText(c, 4, 45),
                          [4, u()]
                        );
                      case 1:
                        return (
                          $.sent(),
                          (n = q(t)) !== (o = q(t))
                            ? [2, ['unstable', 'unstable']]
                            : ((function (n, t) {
                                (n.width = 122),
                                  (n.height = 110),
                                  (t.globalCompositeOperation = 'multiply');
                                for (
                                  var r = 0,
                                    o = [
                                      ['#f2f', 40, 40],
                                      ['#2ff', 80, 40],
                                      ['#ff2', 60, 80],
                                    ];
                                  r < o.length;
                                  r++
                                ) {
                                  var $ = o[r],
                                    i = $[0],
                                    a = $[1],
                                    c = $[2];
                                  (t.fillStyle = i),
                                    t.beginPath(),
                                    t.arc(a, c, 40, 0, 2 * Math.PI, !0),
                                    t.closePath(),
                                    t.fill();
                                }
                                (t.fillStyle = '#f9c'),
                                  t.arc(60, 60, 60, 0, 2 * Math.PI, !0),
                                  t.arc(60, 60, 20, 0, 2 * Math.PI, !0),
                                  t.fill('evenodd');
                              })(t, r),
                              [4, u()])
                        );
                      case 2:
                        return $.sent(), [2, [q(t), n]];
                    }
                  });
                });
              })(c, l),
            ];
          case 3:
            (r = (s = d.sent())[0]), (o = s[1]), (d.label = 4);
          case 4:
            return [2, { winding: t, geometry: r, text: o }];
        }
      });
    });
  }
  function q(n) {
    return n.toDataURL();
  }
  function ee() {
    var n = screen,
      t = function (n) {
        return h(m(n), null);
      },
      r = [t(n.width), t(n.height)];
    return r.sort().reverse(), r;
  }
  function en() {
    var n = this;
    return (
      (function () {
        if (void 0 === r) {
          var n = function () {
            var o = et();
            er(o) ? (r = setTimeout(n, 2500)) : ((t = o), (r = void 0));
          };
          n();
        }
      })(),
      function () {
        return $(n, void 0, void 0, function () {
          var n;
          return i(this, function (r) {
            var o;
            switch (r.label) {
              case 0:
                return er((n = et()))
                  ? t
                    ? [2, a([], t, !0)]
                    : N()
                      ? [
                          4,
                          (
                            (o = document).exitFullscreen ||
                            o.msExitFullscreen ||
                            o.mozCancelFullScreen ||
                            o.webkitExitFullscreen
                          ).call(o),
                        ]
                      : [3, 2]
                  : [3, 2];
              case 1:
                r.sent(), (n = et()), (r.label = 2);
              case 2:
                return er(n) || (t = n), [2, n];
            }
          });
        });
      }
    );
  }
  function et() {
    var n = screen;
    return [
      h(v(n.availTop), null),
      h(v(n.width) - v(n.availWidth) - h(v(n.availLeft), 0), null),
      h(v(n.height) - v(n.availHeight) - h(v(n.availTop), 0), null),
      h(v(n.availLeft), null),
    ];
  }
  function er(n) {
    for (var t = 0; t < 4; ++t) if (n[t]) return !1;
    return !0;
  }
  function eo(n) {
    n.style.setProperty('visibility', 'hidden', 'important'),
      n.style.setProperty('display', 'block', 'important');
  }
  function e$(n) {
    return matchMedia('(inverted-colors: '.concat(n, ')')).matches;
  }
  function ei(n) {
    return matchMedia('(forced-colors: '.concat(n, ')')).matches;
  }
  function ea(n) {
    return matchMedia('(prefers-contrast: '.concat(n, ')')).matches;
  }
  function ec(n) {
    return matchMedia('(prefers-reduced-motion: '.concat(n, ')')).matches;
  }
  function eu(n) {
    return matchMedia('(prefers-reduced-transparency: '.concat(n, ')')).matches;
  }
  function el(n) {
    return matchMedia('(dynamic-range: '.concat(n, ')')).matches;
  }
  var es = Math,
    ed = function () {
      return 0;
    },
    ef = {
      default: [],
      apple: [{ font: '-apple-system-body' }],
      serif: [{ fontFamily: 'serif' }],
      sans: [{ fontFamily: 'sans-serif' }],
      mono: [{ fontFamily: 'monospace' }],
      min: [{ fontSize: '1px' }],
      system: [{ fontFamily: 'system-ui' }],
    },
    em = new Set([
      10752, 2849, 2884, 2885, 2886, 2928, 2929, 2930, 2931, 2932, 2960, 2961, 2962, 2963, 2964,
      2965, 2966, 2967, 2968, 2978, 3024, 3042, 3088, 3089, 3106, 3107, 32773, 32777, 32777, 32823,
      32824, 32936, 32937, 32938, 32939, 32968, 32969, 32970, 32971, 3317, 33170, 3333, 3379, 3386,
      33901, 33902, 34016, 34024, 34076, 3408, 3410, 3411, 3412, 3413, 3414, 3415, 34467, 34816,
      34817, 34818, 34819, 34877, 34921, 34930, 35660, 35661, 35724, 35738, 35739, 36003, 36004,
      36005, 36347, 36348, 36349, 37440, 37441, 37443, 7936, 7937, 7938,
    ]),
    ev = new Set([34047, 35723, 36063, 34852, 34853, 34854, 34229, 36392, 36795, 38449]),
    eh = ['FRAGMENT_SHADER', 'VERTEX_SHADER'],
    e_ = ['LOW_FLOAT', 'MEDIUM_FLOAT', 'HIGH_FLOAT', 'LOW_INT', 'MEDIUM_INT', 'HIGH_INT'],
    ep = 'WEBGL_debug_renderer_info';
  function eb(n) {
    if (n.webgl) return n.webgl.context;
    var t,
      r = document.createElement('canvas');
    r.addEventListener('webglCreateContextError', function () {
      return (t = void 0);
    });
    for (var o = 0, $ = ['webgl', 'experimental-webgl']; o < $.length; o++) {
      var i = $[o];
      try {
        t = r.getContext(i);
      } catch (a) {}
      if (t) break;
    }
    return (n.webgl = { context: t }), t;
  }
  function e0(n, t, r) {
    var o = n.getShaderPrecisionFormat(n[t], n[r]);
    return o ? [o.rangeMin, o.rangeMax, o.precision] : [];
  }
  function ey(n) {
    return Object.keys(n.__proto__).filter(e1);
  }
  function e1(n) {
    return 'string' == typeof n && !n.match(/[^A-Z0-9_x]/);
  }
  function eg() {
    return E();
  }
  function eL(n) {
    return 'function' == typeof n.getParameter;
  }
  var e3 = {
    fonts: function () {
      var n = this;
      return B(function (t, r) {
        var o = r.document;
        return $(n, void 0, void 0, function () {
          var n, t, r, $, a, c, l, s, d, f, m;
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                return (
                  ((n = o.body).style.fontSize = '48px'),
                  (t = o.createElement('div')).style.setProperty(
                    'visibility',
                    'hidden',
                    'important',
                  ),
                  (r = {}),
                  ($ = {}),
                  (a = function (n) {
                    var r = o.createElement('span'),
                      $ = r.style;
                    return (
                      ($.position = 'absolute'),
                      ($.top = '0'),
                      ($.left = '0'),
                      ($.fontFamily = n),
                      (r.textContent = 'mmMwWLliI0O&1'),
                      t.appendChild(r),
                      r
                    );
                  }),
                  (c = function (n, t) {
                    return a("'".concat(n, "',").concat(t));
                  }),
                  (l = function () {
                    for (
                      var n = {},
                        t = function (t) {
                          n[t] = U.map(function (n) {
                            return c(t, n);
                          });
                        },
                        r = 0,
                        o = Q;
                      r < o.length;
                      r++
                    )
                      t(o[r]);
                    return n;
                  }),
                  (s = function (n) {
                    return U.some(function (t, o) {
                      return n[o].offsetWidth !== r[t] || n[o].offsetHeight !== $[t];
                    });
                  }),
                  (d = U.map(a)),
                  (f = l()),
                  n.appendChild(t),
                  [4, u()]
                );
              case 1:
                for (i.sent(), m = 0; m < U.length; m++)
                  (r[U[m]] = d[m].offsetWidth), ($[U[m]] = d[m].offsetHeight);
                return [
                  2,
                  Q.filter(function (n) {
                    return s(f[n]);
                  }),
                ];
            }
          });
        });
      });
    },
    domBlockers: function (n) {
      var t = (void 0 === n ? {} : n).debug;
      return $(this, void 0, void 0, function () {
        var n, r, o, a, l;
        return i(this, function (s) {
          var d;
          switch (s.label) {
            case 0:
              return H() || A()
                ? ((r = Object.keys(
                    (n = {
                      abpIndo: [
                        '#Iklan-Melayang',
                        '#Kolom-Iklan-728',
                        '#SidebarIklan-wrapper',
                        '[title="ALIENBOLA" i]',
                        (d = atob)('I0JveC1CYW5uZXItYWRz'),
                      ],
                      abpvn: [
                        '.quangcao',
                        '#mobileCatfish',
                        d('LmNsb3NlLWFkcw=='),
                        '[id^="bn_bottom_fixed_"]',
                        '#pmadv',
                      ],
                      adBlockFinland: [
                        '.mainostila',
                        d('LnNwb25zb3JpdA=='),
                        '.ylamainos',
                        d('YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd'),
                        d('YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd'),
                      ],
                      adBlockPersian: [
                        '#navbar_notice_50',
                        '.kadr',
                        'TABLE[width="140px"]',
                        '#divAgahi',
                        d('YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd'),
                      ],
                      adBlockWarningRemoval: [
                        '#adblock-honeypot',
                        '.adblocker-root',
                        '.wp_adblock_detect',
                        d('LmhlYWRlci1ibG9ja2VkLWFk'),
                        d('I2FkX2Jsb2NrZXI='),
                      ],
                      adGuardAnnoyances: [
                        '.hs-sosyal',
                        '#cookieconsentdiv',
                        'div[class^="app_gdpr"]',
                        '.as-oil',
                        '[data-cypress="soft-push-notification-modal"]',
                      ],
                      adGuardBase: [
                        '.BetterJsPopOverlay',
                        d('I2FkXzMwMFgyNTA='),
                        d('I2Jhbm5lcmZsb2F0MjI='),
                        d('I2NhbXBhaWduLWJhbm5lcg=='),
                        d('I0FkLUNvbnRlbnQ='),
                      ],
                      adGuardChinese: [
                        d('LlppX2FkX2FfSA=='),
                        d('YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd'),
                        '#widget-quan',
                        d('YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd'),
                        d('YVtocmVmKj0iLjE5NTZobC5jb20vIl0='),
                      ],
                      adGuardFrench: [
                        '#pavePub',
                        d('LmFkLWRlc2t0b3AtcmVjdGFuZ2xl'),
                        '.mobile_adhesion',
                        '.widgetadv',
                        d('LmFkc19iYW4='),
                      ],
                      adGuardGerman: ['aside[data-portal-id="leaderboard"]'],
                      adGuardJapanese: [
                        '#kauli_yad_1',
                        d('YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0='),
                        d('Ll9wb3BJbl9pbmZpbml0ZV9hZA=='),
                        d('LmFkZ29vZ2xl'),
                        d('Ll9faXNib29zdFJldHVybkFk'),
                      ],
                      adGuardMobile: [
                        d('YW1wLWF1dG8tYWRz'),
                        d('LmFtcF9hZA=='),
                        'amp-embed[type="24smi"]',
                        '#mgid_iframe1',
                        d('I2FkX2ludmlld19hcmVh'),
                      ],
                      adGuardRussian: [
                        d('YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0='),
                        d('LnJlY2xhbWE='),
                        'div[id^="smi2adblock"]',
                        d('ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd'),
                        '#psyduckpockeball',
                      ],
                      adGuardSocial: [
                        d('YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0='),
                        d('YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0='),
                        '.etsy-tweet',
                        '#inlineShare',
                        '.popup-social',
                      ],
                      adGuardSpanishPortuguese: [
                        '#barraPublicidade',
                        '#Publicidade',
                        '#publiEspecial',
                        '#queTooltip',
                        '.cnt-publi',
                      ],
                      adGuardTrackingProtection: [
                        '#qoo-counter',
                        d('YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=='),
                        d('YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0='),
                        d('YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=='),
                        '#top100counter',
                      ],
                      adGuardTurkish: [
                        '#backkapat',
                        d('I3Jla2xhbWk='),
                        d('YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0='),
                        d('YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd'),
                        d('YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ=='),
                      ],
                      bulgarian: [
                        d('dGQjZnJlZW5ldF90YWJsZV9hZHM='),
                        '#ea_intext_div',
                        '.lapni-pop-over',
                        '#xenium_hot_offers',
                      ],
                      easyList: [
                        '.yb-floorad',
                        d('LndpZGdldF9wb19hZHNfd2lkZ2V0'),
                        d('LnRyYWZmaWNqdW5reS1hZA=='),
                        '.textad_headline',
                        d('LnNwb25zb3JlZC10ZXh0LWxpbmtz'),
                      ],
                      easyListChina: [
                        d('LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=='),
                        d('LmZyb250cGFnZUFkdk0='),
                        '#taotaole',
                        '#aafoot.top_box',
                        '.cfa_popup',
                      ],
                      easyListCookie: [
                        '.ezmob-footer',
                        '.cc-CookieWarning',
                        '[data-cookie-number]',
                        d('LmF3LWNvb2tpZS1iYW5uZXI='),
                        '.sygnal24-gdpr-modal-wrap',
                      ],
                      easyListCzechSlovak: [
                        '#onlajny-stickers',
                        d('I3Jla2xhbW5pLWJveA=='),
                        d('LnJla2xhbWEtbWVnYWJvYXJk'),
                        '.sklik',
                        d('W2lkXj0ic2tsaWtSZWtsYW1hIl0='),
                      ],
                      easyListDutch: [
                        d('I2FkdmVydGVudGll'),
                        d('I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=='),
                        '.adstekst',
                        d('YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0='),
                        '#semilo-lrectangle',
                      ],
                      easyListGermany: [
                        '#SSpotIMPopSlider',
                        d('LnNwb25zb3JsaW5rZ3J1ZW4='),
                        d('I3dlcmJ1bmdza3k='),
                        d('I3Jla2xhbWUtcmVjaHRzLW1pdHRl'),
                        d('YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0='),
                      ],
                      easyListItaly: [
                        d('LmJveF9hZHZfYW5udW5jaQ=='),
                        '.sb-box-pubbliredazionale',
                        d('YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd'),
                        d('YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd'),
                        d('YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ=='),
                      ],
                      easyListLithuania: [
                        d('LnJla2xhbW9zX3RhcnBhcw=='),
                        d('LnJla2xhbW9zX251b3JvZG9z'),
                        d('aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd'),
                        d('aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd'),
                        d('aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd'),
                      ],
                      estonian: [d('QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==')],
                      fanboyAnnoyances: [
                        '#ac-lre-player',
                        '.navigate-to-top',
                        '#subscribe_popup',
                        '.newsletter_holder',
                        '#back-top',
                      ],
                      fanboyAntiFacebook: ['.util-bar-module-firefly-visible'],
                      fanboyEnhancedTrackers: [
                        '.open.pushModal',
                        '#issuem-leaky-paywall-articles-zero-remaining-nag',
                        '#sovrn_container',
                        'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',
                        '.BlockNag__Card',
                      ],
                      fanboySocial: [
                        '#FollowUs',
                        '#meteored_share',
                        '#social_follow',
                        '.article-sharer',
                        '.community__social-desc',
                      ],
                      frellwitSwedish: [
                        d('YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=='),
                        d('YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=='),
                        'article.category-samarbete',
                        d('ZGl2LmhvbGlkQWRz'),
                        'ul.adsmodern',
                      ],
                      greekAdBlock: [
                        d('QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd'),
                        d('QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=='),
                        d('QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd'),
                        'DIV.agores300',
                        'TABLE.advright',
                      ],
                      hungarian: [
                        '#cemp_doboz',
                        '.optimonk-iframe-container',
                        d('LmFkX19tYWlu'),
                        d('W2NsYXNzKj0iR29vZ2xlQWRzIl0='),
                        '#hirdetesek_box',
                      ],
                      iDontCareAboutCookies: [
                        '.alert-info[data-block-track*="CookieNotice"]',
                        '.ModuleTemplateCookieIndicator',
                        '.o--cookies--container',
                        '#cookies-policy-sticky',
                        '#stickyCookieBar',
                      ],
                      icelandicAbp: [
                        d('QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ=='),
                      ],
                      latvian: [
                        d(
                          'YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0=',
                        ),
                        d(
                          'YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==',
                        ),
                      ],
                      listKr: [
                        d('YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0='),
                        d('I2xpdmVyZUFkV3JhcHBlcg=='),
                        d('YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=='),
                        d('aW5zLmZhc3R2aWV3LWFk'),
                        '.revenue_unit_item.dable',
                      ],
                      listeAr: [
                        d('LmdlbWluaUxCMUFk'),
                        '.right-and-left-sponsers',
                        d('YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=='),
                        d('YVtocmVmKj0iYm9vcmFxLm9yZyJd'),
                        d('YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd'),
                      ],
                      listeFr: [
                        d('YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=='),
                        d('I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=='),
                        d('YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0='),
                        '.site-pub-interstitiel',
                        'div[id^="crt-"][data-criteo-id]',
                      ],
                      officialPolish: [
                        '#ceneo-placeholder-ceneo-12',
                        d('W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd'),
                        d('YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=='),
                        d('YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=='),
                        d('ZGl2I3NrYXBpZWNfYWQ='),
                      ],
                      ro: [
                        d('YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd'),
                        d('YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd'),
                        d(
                          'YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0=',
                        ),
                        d('YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd'),
                        'a[href^="/url/"]',
                      ],
                      ruAd: [
                        d('YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd'),
                        d('YVtocmVmKj0iLy91dGltZy5ydS8iXQ=='),
                        d('YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0='),
                        '#pgeldiz',
                        '.yandex-rtb-block',
                      ],
                      thaiAds: [
                        'a[href*=macau-uta-popup]',
                        d('I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=='),
                        d('LmFkczMwMHM='),
                        '.bumq',
                        '.img-kosana',
                      ],
                      webAnnoyancesUltralist: [
                        '#mod-social-share-2',
                        '#social-tools',
                        d('LmN0cGwtZnVsbGJhbm5lcg=='),
                        '.zergnet-recommend',
                        '.yt.btn-link.btn-md.btn',
                      ],
                    }),
                  )),
                  [
                    4,
                    (function n(t) {
                      var r;
                      return $(this, void 0, void 0, function () {
                        var n, o, $, a, l, s, d;
                        return i(this, function (i) {
                          switch (i.label) {
                            case 0:
                              for (
                                o = (n = document).createElement('div'),
                                  $ = Array(t.length),
                                  a = {},
                                  eo(o),
                                  d = 0;
                                d < t.length;
                                ++d
                              )
                                'DIALOG' === (l = D(t[d])).tagName && l.show(),
                                  eo((s = n.createElement('div'))),
                                  s.appendChild(l),
                                  o.appendChild(s),
                                  ($[d] = l);
                              i.label = 1;
                            case 1:
                              return n.body ? [3, 3] : [4, c(50)];
                            case 2:
                              return i.sent(), [3, 1];
                            case 3:
                              return n.body.appendChild(o), [4, u()];
                            case 4:
                              i.sent();
                              try {
                                for (d = 0; d < t.length; ++d) $[d].offsetParent || (a[t[d]] = !0);
                              } finally {
                                null === (r = o.parentNode) || void 0 === r || r.removeChild(o);
                              }
                              return [2, a];
                          }
                        });
                      });
                    })(
                      (l = []).concat.apply(
                        l,
                        r.map(function (t) {
                          return n[t];
                        }),
                      ),
                    ),
                  ])
                : [2, void 0];
            case 1:
              return (
                (o = s.sent()),
                t &&
                  (function (n, t) {
                    for (
                      var r = 'DOM blockers debug:\n```', o = 0, $ = Object.keys(n);
                      o < $.length;
                      o++
                    ) {
                      var i = $[o];
                      r += '\n'.concat(i, ':');
                      for (var a = 0, c = n[i]; a < c.length; a++) {
                        var u = c[a];
                        r += '\n  '.concat(t[u] ? '\uD83D\uDEAB' : '➡️', ' ').concat(u);
                      }
                    }
                    console.log(''.concat(r, '\n```'));
                  })(n, o),
                (a = r.filter(function (t) {
                  var r = n[t];
                  return (
                    _(
                      r.map(function (n) {
                        return o[n];
                      }),
                    ) >
                    0.6 * r.length
                  );
                })).sort(),
                [2, a]
              );
          }
        });
      });
    },
    fontPreferences: function () {
      var n, t;
      return (
        (n = function (n, t) {
          for (var r = {}, o = {}, $ = 0, i = Object.keys(ef); $ < i.length; $++) {
            var a = i[$],
              c = ef[a],
              u = c[0],
              l = void 0 === u ? {} : u,
              s = c[1],
              d = void 0 === s ? 'mmMwWLliI0fiflO&1' : s,
              f = n.createElement('span');
            (f.textContent = d), (f.style.whiteSpace = 'nowrap');
            for (var m = 0, v = Object.keys(l); m < v.length; m++) {
              var h = v[m],
                _ = l[h];
              void 0 !== _ && (f.style[h] = _);
            }
            (r[a] = f), t.append(n.createElement('br'), f);
          }
          for (var p = 0, b = Object.keys(ef); p < b.length; p++)
            o[(a = b[p])] = r[a].getBoundingClientRect().width;
          return o;
        }),
        void 0 === t && (t = 4e3),
        B(function (r, o) {
          var $ = o.document,
            i = $.body,
            c = i.style;
          (c.width = ''.concat(t, 'px')),
            (c.webkitTextSizeAdjust = c.textSizeAdjust = 'none'),
            M()
              ? (i.style.zoom = ''.concat(1 / o.devicePixelRatio))
              : H() && (i.style.zoom = 'reset');
          var u = $.createElement('div');
          return (
            (u.textContent = a([], Array((t / 20) << 0), !0)
              .map(function () {
                return 'word';
              })
              .join(' ')),
            i.appendChild(u),
            n($, i)
          );
        }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')
      );
    },
    audio: function () {
      return H() && J() && P() ? -4 : T();
    },
    screenFrame: function () {
      var n = this;
      if (H() && J() && P())
        return function () {
          return Promise.resolve(void 0);
        };
      var t = en();
      return function () {
        return $(n, void 0, void 0, function () {
          var n, r;
          return i(this, function (o) {
            switch (o.label) {
              case 0:
                return [4, t()];
              case 1:
                return (
                  (n = o.sent()),
                  [
                    2,
                    [
                      (r = function (n) {
                        return null === n ? null : p(n, 10);
                      })(n[0]),
                      r(n[1]),
                      r(n[2]),
                      r(n[3]),
                    ],
                  ]
                );
            }
          });
        });
      };
    },
    canvas: function () {
      return K(H() && J() && P());
    },
    osCpu: function () {
      return navigator.oscpu;
    },
    languages: function () {
      var n,
        t = navigator,
        r = [],
        o = t.language || t.userLanguage || t.browserLanguage || t.systemLanguage;
      if ((void 0 !== o && r.push([o]), Array.isArray(t.languages)))
        (M() &&
          _([
            !('MediaSettingsRange' in (n = window)),
            'RTCEncodedAudioFrame' in n,
            '' + n.Intl == '[object Intl]',
            '' + n.Reflect == '[object Reflect]',
          ]) >= 3) ||
          r.push(t.languages);
      else if ('string' == typeof t.languages) {
        var $ = t.languages;
        $ && r.push($.split(','));
      }
      return r;
    },
    colorDepth: function () {
      return window.screen.colorDepth;
    },
    deviceMemory: function () {
      return h(v(navigator.deviceMemory), void 0);
    },
    screenResolution: function () {
      if (!(H() && J() && P())) return ee();
    },
    hardwareConcurrency: function () {
      return h(m(navigator.hardwareConcurrency), void 0);
    },
    timezone: function () {
      var n,
        t = null === (n = window.Intl) || void 0 === n ? void 0 : n.DateTimeFormat;
      if (t) {
        var r = new t().resolvedOptions().timeZone;
        if (r) return r;
      }
      var o,
        $ =
          ((o = new Date().getFullYear()),
          -Math.max(
            v(new Date(o, 0, 1).getTimezoneOffset()),
            v(new Date(o, 6, 1).getTimezoneOffset()),
          ));
      return 'UTC'.concat($ >= 0 ? '+' : '').concat($);
    },
    sessionStorage: function () {
      try {
        return !!window.sessionStorage;
      } catch (n) {
        return !0;
      }
    },
    localStorage: function () {
      try {
        return !!window.localStorage;
      } catch (n) {
        return !0;
      }
    },
    indexedDB: function () {
      if (!X() && !C())
        try {
          return !!window.indexedDB;
        } catch (n) {
          return !0;
        }
    },
    openDatabase: function () {
      return !!window.openDatabase;
    },
    cpuClass: function () {
      return navigator.cpuClass;
    },
    platform: function () {
      var n = navigator.platform;
      return 'MacIntel' === n && H() && !j()
        ? !(function () {
            if ('iPad' === navigator.platform) return !0;
            var n = screen,
              t = n.width / n.height;
            return (
              _([
                'MediaSource' in window,
                !!Element.prototype.webkitRequestFullscreen,
                t > 0.65 && t < 1.53,
              ]) >= 2
            );
          })()
          ? 'iPhone'
          : 'iPad'
        : n;
    },
    plugins: function () {
      var n = navigator.plugins;
      if (n) {
        for (var t = [], r = 0; r < n.length; ++r) {
          var o = n[r];
          if (o) {
            for (var $ = [], i = 0; i < o.length; ++i) {
              var a = o[i];
              $.push({ type: a.type, suffixes: a.suffixes });
            }
            t.push({ name: o.name, description: o.description, mimeTypes: $ });
          }
        }
        return t;
      }
    },
    touchSupport: function () {
      var n,
        t = navigator,
        r = 0;
      void 0 !== t.maxTouchPoints
        ? (r = m(t.maxTouchPoints))
        : void 0 !== t.msMaxTouchPoints && (r = t.msMaxTouchPoints);
      try {
        document.createEvent('TouchEvent'), (n = !0);
      } catch (o) {
        n = !1;
      }
      return { maxTouchPoints: r, touchEvent: n, touchStart: 'ontouchstart' in window };
    },
    vendor: function () {
      return navigator.vendor || '';
    },
    vendorFlavors: function () {
      for (
        var n = [],
          t = 0,
          r = [
            'chrome',
            'safari',
            '__crWeb',
            '__gCrWeb',
            'yandex',
            '__yb',
            '__ybro',
            '__firefox__',
            '__edgeTrackingPreventionStatistics',
            'webkit',
            'oprt',
            'samsungAr',
            'ucweb',
            'UCShellJava',
            'puffinDevice',
          ];
        t < r.length;
        t++
      ) {
        var o = r[t],
          $ = window[o];
        $ && 'object' == typeof $ && n.push(o);
      }
      return n.sort();
    },
    cookiesEnabled: function () {
      var n = document;
      try {
        n.cookie = 'cookietest=1; SameSite=Strict;';
        var t = -1 !== n.cookie.indexOf('cookietest=');
        return (
          (n.cookie = 'cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT'), t
        );
      } catch (r) {
        return !1;
      }
    },
    colorGamut: function () {
      for (var n = 0, t = ['rec2020', 'p3', 'srgb']; n < t.length; n++) {
        var r = t[n];
        if (matchMedia('(color-gamut: '.concat(r, ')')).matches) return r;
      }
    },
    invertedColors: function () {
      return !!e$('inverted') || (!e$('none') && void 0);
    },
    forcedColors: function () {
      return !!ei('active') || (!ei('none') && void 0);
    },
    monochrome: function () {
      if (matchMedia('(min-monochrome: 0)').matches) {
        for (var n = 0; n <= 100; ++n)
          if (matchMedia('(max-monochrome: '.concat(n, ')')).matches) return n;
        throw Error('Too high value');
      }
    },
    contrast: function () {
      return ea('no-preference')
        ? 0
        : ea('high') || ea('more')
          ? 1
          : ea('low') || ea('less')
            ? -1
            : ea('forced')
              ? 10
              : void 0;
    },
    reducedMotion: function () {
      return !!ec('reduce') || (!ec('no-preference') && void 0);
    },
    reducedTransparency: function () {
      return !!eu('reduce') || (!eu('no-preference') && void 0);
    },
    hdr: function () {
      return !!el('high') || (!el('standard') && void 0);
    },
    math: function () {
      var n,
        t = es.acos || ed,
        r = es.acosh || ed,
        o = es.asin || ed,
        $ = es.asinh || ed,
        i = es.atanh || ed,
        a = es.atan || ed,
        c = es.sin || ed,
        u = es.sinh || ed,
        l = es.cos || ed,
        s = es.cosh || ed,
        d = es.tan || ed,
        f = es.tanh || ed,
        m = es.exp || ed,
        v = es.expm1 || ed,
        h = es.log1p || ed;
      return {
        acos: t(0.12312423423423424),
        acosh: r(1e308),
        acoshPf: ((n = 1e154), es.log(n + es.sqrt(n * n - 1))),
        asin: o(0.12312423423423424),
        asinh: $(1),
        asinhPf: es.log(1 + es.sqrt(2)),
        atanh: i(0.5),
        atanhPf: es.log(3) / 2,
        atan: a(0.5),
        sin: c(-1e300),
        sinh: u(1),
        sinhPf: es.exp(1) - 1 / es.exp(1) / 2,
        cos: l(10.000000000123),
        cosh: s(1),
        coshPf: (es.exp(1) + 1 / es.exp(1)) / 2,
        tan: d(-1e300),
        tanh: f(1),
        tanhPf: (es.exp(2) - 1) / (es.exp(2) + 1),
        exp: m(1),
        expm1: v(1),
        expm1Pf: es.exp(1) - 1,
        log1p: h(10),
        log1pPf: es.log(11),
        powPI: es.pow(es.PI, -100),
      };
    },
    pdfViewerEnabled: function () {
      return navigator.pdfViewerEnabled;
    },
    architecture: function () {
      var n = new Float32Array(1),
        t = new Uint8Array(n.buffer);
      return (n[0] = 1 / 0), (n[0] = n[0] - n[0]), t[3];
    },
    applePay: function () {
      var n = window.ApplePaySession;
      if ('function' != typeof (null == n ? void 0 : n.canMakePayments)) return -1;
      try {
        return n.canMakePayments() ? 1 : 0;
      } catch (t) {
        return (function (n) {
          if (n instanceof Error) {
            if ('InvalidAccessError' === n.name) {
              if (/\bfrom\b.*\binsecure\b/i.test(n.message)) return -2;
              if (/\bdifferent\b.*\borigin\b.*top.level\b.*\bframe\b/i.test(n.message)) return -3;
            }
            if (
              'SecurityError' === n.name &&
              /\bthird.party iframes?.*\bnot.allowed\b/i.test(n.message)
            )
              return -3;
          }
          throw n;
        })(t);
      }
    },
    privateClickMeasurement: function () {
      var n,
        t = document.createElement('a'),
        r = null !== (n = t.attributionSourceId) && void 0 !== n ? n : t.attributionsourceid;
      return void 0 === r ? void 0 : String(r);
    },
    audioBaseLatency: function () {
      var n;
      return A() || H()
        ? window.AudioContext && null !== (n = new AudioContext().baseLatency) && void 0 !== n
          ? n
          : -1
        : -2;
    },
    webGlBasics: function (n) {
      var t,
        r,
        o,
        $,
        i,
        a,
        c = eb(n.cache);
      if (!c) return -1;
      if (!eL(c)) return -2;
      var u = eg() ? null : c.getExtension(ep);
      return {
        version:
          (null === (t = c.getParameter(c.VERSION)) || void 0 === t ? void 0 : t.toString()) || '',
        vendor:
          (null === (r = c.getParameter(c.VENDOR)) || void 0 === r ? void 0 : r.toString()) || '',
        vendorUnmasked: u
          ? null === (o = c.getParameter(u.UNMASKED_VENDOR_WEBGL)) || void 0 === o
            ? void 0
            : o.toString()
          : '',
        renderer:
          (null === ($ = c.getParameter(c.RENDERER)) || void 0 === $ ? void 0 : $.toString()) || '',
        rendererUnmasked: u
          ? null === (i = c.getParameter(u.UNMASKED_RENDERER_WEBGL)) || void 0 === i
            ? void 0
            : i.toString()
          : '',
        shadingLanguageVersion:
          (null === (a = c.getParameter(c.SHADING_LANGUAGE_VERSION)) || void 0 === a
            ? void 0
            : a.toString()) || '',
      };
    },
    webGlExtensions: function (n) {
      var t = eb(n.cache);
      if (!t) return -1;
      if (!eL(t)) return -2;
      var r = t.getSupportedExtensions(),
        o = t.getContextAttributes(),
        $ = [],
        i = [],
        a = [],
        c = [];
      if (o)
        for (var u = 0, l = Object.keys(o); u < l.length; u++) {
          var s = l[u];
          $.push(''.concat(s, '=').concat(o[s]));
        }
      for (var d = 0, f = ey(t); d < f.length; d++) {
        var m = t[(p = f[d])];
        i.push(
          ''
            .concat(p, '=')
            .concat(m)
            .concat(em.has(m) ? '='.concat(t.getParameter(m)) : ''),
        );
      }
      if (r)
        for (var v = 0, h = r; v < h.length; v++) {
          var _ = h[v];
          if (!((_ === ep && eg()) || ('WEBGL_polygon_mode' === _ && (M() || H())))) {
            var p,
              b = t.getExtension(_);
            if (b)
              for (var y = 0, g = ey(b); y < g.length; y++)
                (m = b[(p = g[y])]),
                  a.push(
                    ''
                      .concat(p, '=')
                      .concat(m)
                      .concat(ev.has(m) ? '='.concat(t.getParameter(m)) : ''),
                  );
          }
        }
      for (var L = 0, k = eh; L < k.length; L++)
        for (var w = k[L], V = 0, S = e_; V < S.length; V++) {
          var W = S[V],
            Z = e0(t, w, W);
          c.push(''.concat(w, '.').concat(W, '=').concat(Z.join(',')));
        }
      return (
        a.sort(),
        i.sort(),
        {
          contextAttributes: $,
          parameters: i,
          shaderPrecisions: c,
          extensions: r,
          extensionParameters: a,
        }
      );
    },
  };
  function ek(n) {
    return JSON.stringify(
      n,
      function (n, t) {
        var r, $;
        return t instanceof Error
          ? o(
              {
                name: (r = t).name,
                message: r.message,
                stack: null === ($ = r.stack) || void 0 === $ ? void 0 : $.split('\n'),
              },
              r,
            )
          : t;
      },
      2,
    );
  }
  function ew(n) {
    return G(
      (function (n) {
        for (var t = '', r = 0, o = Object.keys(n).sort(); r < o.length; r++) {
          var $ = o[r],
            i = n[$],
            a = 'error' in i ? 'error' : JSON.stringify(i.value);
          t += ''
            .concat(t ? '|' : '')
            .concat($.replace(/([:|\\])/g, '\\$1'), ':')
            .concat(a);
        }
        return t;
      })(n),
    );
  }
  function e2(n) {
    var t, r, o;
    return (
      void 0 === n && (n = 50),
      (t = n),
      (r = 2 * n),
      (o = window.requestIdleCallback)
        ? new Promise(function (n) {
            return o.call(
              window,
              function () {
                return n();
              },
              { timeout: r },
            );
          })
        : c(Math.min(t, r))
    );
  }
  function eV(n) {
    return (
      void 0 === n && (n = {}),
      $(this, void 0, void 0, function () {
        var t, r, o;
        return i(this, function (a) {
          switch (a.label) {
            case 0:
              return n.monitoring, (t = n.delayFallback), (r = n.debug), [4, e2(t)];
            case 1:
              var c, u, l, s;
              return (
                a.sent(),
                [
                  2,
                  ((u = o = Y(e3, (c = { cache: {}, debug: r }), [])),
                  (l = r),
                  (s = Date.now()),
                  {
                    get: function (n) {
                      return $(this, void 0, void 0, function () {
                        var t, r, o;
                        return i(this, function ($) {
                          switch ($.label) {
                            case 0:
                              return (t = Date.now()), [4, u()];
                            case 1:
                              var i, a, c, d, f, m;
                              return (
                                (o = {
                                  get visitorId() {
                                    return void 0 === a && (a = ew(this.components)), a;
                                  },
                                  set visitorId(e) {
                                    a = e;
                                  },
                                  confidence:
                                    ((f = (function (n) {
                                      if (A()) return 0.4;
                                      if (H()) return !j() || (J() && P()) ? 0.3 : 0.5;
                                      var t = 'value' in n.platform ? n.platform.value : '';
                                      return /^Win/.test(t) ? 0.6 : /^Mac/.test(t) ? 0.5 : 0.7;
                                    })((c = i = r = $.sent()))),
                                    (m = p(0.99 + 0.01 * (d = f), 1e-4)),
                                    {
                                      score: f,
                                      comment: '$ if upgrade to Pro: https://fpjs.dev/pro'.replace(
                                        /\$/g,
                                        ''.concat(m),
                                      ),
                                    }),
                                  components: i,
                                  version: '4.4.1',
                                }),
                                (l || (null == n ? void 0 : n.debug)) &&
                                  console.log(
                                    'Copy the text below to get the debug data:\n\n```\nversion: '
                                      .concat(o.version, '\nuserAgent: ')
                                      .concat(navigator.userAgent, '\ntimeBetweenLoadAndGet: ')
                                      .concat(t - s, '\nvisitorId: ')
                                      .concat(o.visitorId, '\ncomponents: ')
                                      .concat(ek(r), '\n```'),
                                  ),
                                [2, o]
                              );
                          }
                        });
                      });
                    },
                  }),
                ]
              );
          }
        });
      })
    );
  }
  return (
    (n.componentsToDebugString = ek),
    (n.default = { load: eV, hashComponents: ew, componentsToDebugString: ek }),
    (n.getFullscreenElement = N),
    (n.getUnstableAudioFingerprint = T),
    (n.getUnstableCanvasFingerprint = K),
    (n.getUnstableScreenFrame = en),
    (n.getUnstableScreenResolution = ee),
    (n.getWebGLContext = eb),
    (n.hashComponents = ew),
    (n.isAndroid = A),
    (n.isChromium = M),
    (n.isDesktopWebKit = j),
    (n.isEdgeHTML = C),
    (n.isGecko = E),
    (n.isTrident = X),
    (n.isWebKit = H),
    (n.load = eV),
    (n.loadSources = Y),
    (n.murmurX64Hash128 = G),
    (n.prepareForSources = e2),
    (n.sources = e3),
    (n.transformSource = function (n, t) {
      var r = function (n) {
        return I(n)
          ? t(n)
          : function () {
              var r = n();
              return l(r) ? r.then(t) : t(r);
            };
      };
      return function (t) {
        var o = n(t);
        return l(o) ? o.then(r) : r(o);
      };
    }),
    (n.withIframe = B),
    Object.defineProperty(n, '__esModule', { value: !0 }),
    n
  );
})({});
