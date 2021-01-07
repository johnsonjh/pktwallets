(function () {
  function aq() {
    if (!ap && document.body) {
      ap = !0;
      const h = document.body;
      const f = document.documentElement;
      let m = window.innerHeight;
      const r = h.scrollHeight;
      aK = document.compatMode.indexOf("CSS") >= 0 ? f : h;
      aJ = h;
      aO.keyboardSupport && window.addEventListener("keydown", ag, !1);
      if (top != self) {
        aF = !0;
      } else {
        if (ax && r > m && (h.offsetHeight <= m || f.offsetHeight <= m)) {
          const l = document.createElement("div");
          l.style.cssText =
            "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" +
            aK.scrollHeight +
            "px";
          document.body.appendChild(l);
          let k;
          aE = function () {
            k ||
              (k = setTimeout(function () {
                l.style.height = "0";
                l.style.height = aK.scrollHeight + "px";
                k = null;
              }, 500));
          };
          setTimeout(aE, 10);
          window.addEventListener("resize", aE, !1);
          aA = new av(aE);
          aA.observe(h, { attributes: !0, childList: !0, characterData: !1 });
          aK.offsetHeight <= m &&
            ((m = document.createElement("div")),
            (m.style.clear = "both"),
            h.appendChild(m));
        }
      }
      aO.fixedBackground ||
        ((h.style.backgroundAttachment = "scroll"),
        (f.style.backgroundAttachment = "scroll"));
    }
  }
  function af(h, f, m) {
    b(f, m);
    if (aO.accelerationMax != 1) {
      var r = Date.now() - ao;
      r < aO.accelerationDelta &&
        ((r = (1 + 50 / r) / 2),
        r > 1 && ((r = Math.min(r, aO.accelerationMax)), (f *= r), (m *= r)));
      ao = Date.now();
    }
    aH.push({
      x: f,
      y: m,
      lastX: f < 0 ? 0.99 : -0.99,
      lastY: m < 0 ? 0.99 : -0.99,
      start: Date.now(),
    });
    if (!an) {
      r = ae();
      const l = h === r || h === document.body;
      h.$scrollBehavior == null &&
        ay(h) &&
        ((h.$scrollBehavior = h.style.scrollBehavior),
        (h.style.scrollBehavior = "auto"));
      var k = function (y) {
        y = Date.now();
        for (var t = 0, g = 0, u = 0; u < aH.length; u++) {
          const x = aH[u];
          let w = y - x.start;
          const a = w >= aO.animationTime;
          let v = a ? 1 : w / aO.animationTime;
          aO.pulseAlgorithm &&
            ((w = v),
            w >= 1
              ? (v = 1)
              : w <= 0
              ? (v = 0)
              : (aO.pulseNormalize == 1 && (aO.pulseNormalize /= ad(1)),
                (v = ad(w))));
          w = (x.x * v - x.lastX) >> 0;
          v = (x.y * v - x.lastY) >> 0;
          t += w;
          g += v;
          x.lastX += w;
          x.lastY += v;
          a && (aH.splice(u, 1), u--);
        }
        l
          ? window.scrollBy(t, g)
          : (t && (h.scrollLeft += t), g && (h.scrollTop += g));
        f || m || (aH = []);
        aH.length
          ? ac(k, h, 1000 / aO.frameRate + 1)
          : ((an = !1),
            h.$scrollBehavior != null &&
              ((h.style.scrollBehavior = h.$scrollBehavior),
              (h.$scrollBehavior = null)));
      };
      ac(k, h, 0);
      an = !0;
    }
  }
  function ab(g) {
    ap || aq();
    let f = g.target;
    if (
      g.defaultPrevented ||
      g.ctrlKey ||
      aI(aJ, "embed") ||
      (aI(f, "embed") && /\.pdf/i.test(f.src)) ||
      aI(aJ, "object") ||
      f.shadowRoot
    ) {
      return !0;
    }
    let h = -g.wheelDeltaX || g.deltaX || 0;
    let k = -g.wheelDeltaY || g.deltaY || 0;
    c &&
      (g.wheelDeltaX &&
        aD(g.wheelDeltaX, 120) &&
        (h = (g.wheelDeltaX / Math.abs(g.wheelDeltaX)) * -120),
      g.wheelDeltaY &&
        aD(g.wheelDeltaY, 120) &&
        (k = (g.wheelDeltaY / Math.abs(g.wheelDeltaY)) * -120));
    h || k || (k = -g.wheelDelta || 0);
    g.deltaMode === 1 && ((h *= 40), (k *= 40));
    f = s(f);
    if (!f) {
      return aF && am
        ? (Object.defineProperty(g, "target", { value: window.frameElement }),
          (g = new g.constructor(g.type, g)),
          parent.dispatchEvent(g))
        : !0;
    }
    if (az(k)) {
      return !0;
    }
    Math.abs(h) > 1.2 && (h *= aO.stepSize / 120);
    Math.abs(k) > 1.2 && (k *= aO.stepSize / 120);
    af(f, h, k);
    g.preventDefault();
    q();
  }
  function ag(g) {
    let f = g.target;
    let m =
      g.ctrlKey ||
      g.altKey ||
      g.metaKey ||
      (g.shiftKey && g.keyCode !== aN.spacebar);
    document.body.contains(aJ) || (aJ = document.activeElement);
    let r = /^(textarea|select|embed|object)$/i;
    let l = /^(button|submit|radio|checkbox|file|color|image)$/i;
    if (
      !(r =
        g.defaultPrevented ||
        r.test(f.nodeName) ||
        (aI(f, "input") && !l.test(f.type)) ||
        aI(aJ, "video"))
    ) {
      r = g.target;
      let k = !1;
      if (document.URL.indexOf("www.youtube.com/watch") != -1) {
        do {
          if (
            (k = r.classList && r.classList.contains("html5-video-controls"))
          ) {
            break;
          }
        } while ((r = r.parentNode));
      }
      r = k;
    }
    if (
      r ||
      f.isContentEditable ||
      m ||
      ((aI(f, "button") || (aI(f, "input") && l.test(f.type))) &&
        g.keyCode === aN.spacebar) ||
      (aI(f, "input") && f.type == "radio" && aw[g.keyCode])
    ) {
      return !0;
    }
    r = f = 0;
    m = s(aJ);
    if (!m) {
      return aF && am ? parent.keydown(g) : !0;
    }
    l = m.clientHeight;
    m == document.body && (l = window.innerHeight);
    switch (g.keyCode) {
      case aN.up:
        r = -aO.arrowScroll;
        break;
      case aN.down:
        r = aO.arrowScroll;
        break;
      case aN.spacebar:
        r = g.shiftKey ? 1 : -1;
        r = -r * l * 0.9;
        break;
      case aN.pageup:
        r = 0.9 * -l;
        break;
      case aN.pagedown:
        r = 0.9 * l;
        break;
      case aN.home:
        m == document.body &&
          document.scrollingElement &&
          (m = document.scrollingElement);
        r = -m.scrollTop;
        break;
      case aN.end:
        l = m.scrollHeight - m.scrollTop - l;
        r = l > 0 ? l + 10 : 0;
        break;
      case aN.left:
        f = -aO.arrowScroll;
        break;
      case aN.right:
        f = aO.arrowScroll;
        break;
      default:
        return !0;
    }
    af(m, f, r);
    g.preventDefault();
    q();
  }
  function p(f) {
    aJ = f.target;
  }
  function q() {
    clearTimeout(o);
    o = setInterval(function () {
      n = al = at = {};
    }, 1000);
  }
  function ak(g, f, h) {
    h = h ? n : al;
    for (let k = g.length; k--; ) {
      h[aj(g[k])] = f;
    }
    return f;
  }
  function s(g) {
    const f = [];
    const k = document.body;
    const l = aK.scrollHeight;
    do {
      let h = al[aj(g)];
      if (h) {
        return ak(f, h);
      }
      f.push(g);
      if (l === g.scrollHeight) {
        if (
          ((h = (j(aK) && j(k)) || i(aK)),
          (aF && aK.clientHeight + 10 < aK.scrollHeight) || (!aF && h))
        ) {
          return ak(f, ae());
        }
      } else {
        if (g.clientHeight + 10 < g.scrollHeight && i(g)) {
          return ak(f, g);
        }
      }
    } while ((g = g.parentElement));
  }
  function j(f) {
    return getComputedStyle(f, "").getPropertyValue("overflow-y") !== "hidden";
  }
  function i(f) {
    f = getComputedStyle(f, "").getPropertyValue("overflow-y");
    return f === "scroll" || f === "auto";
  }
  function ay(g) {
    const f = aj(g);
    at[f] == null &&
      ((g = getComputedStyle(g, "")["scroll-behavior"]),
      (at[f] = g == "smooth"));
    return at[f];
  }
  function aI(g, f) {
    return g && (g.nodeName || "").toLowerCase() === f.toLowerCase();
  }
  function b(g, f) {
    g = g > 0 ? 1 : -1;
    f = f > 0 ? 1 : -1;
    if (ar.x !== g || ar.y !== f) {
      (ar.x = g), (ar.y = f), (aH = []), (ao = 0);
    }
  }
  function az(f) {
    if (f) {
      return (
        aM.length || (aM = [f, f, f]),
        (f = Math.abs(f)),
        aM.push(f),
        aM.shift(),
        clearTimeout(d),
        (d = setTimeout(function () {
          try {
            localStorage.SS_deltaBuffer = aM.join(",");
          } catch (a) {}
        }, 1000)),
        (f = f > 120 && ai(f)),
        !ai(120) && !ai(100) && !f
      );
    }
  }
  function aD(g, f) {
    return Math.floor(g / f) == g / f;
  }
  function ai(f) {
    return aD(aM[0], f) && aD(aM[1], f) && aD(aM[2], f);
  }
  function ad(g) {
    g *= aO.pulseScale;
    if (g < 1) {
      var f = g - (1 - Math.exp(-g));
    } else {
      (f = Math.exp(-1)), (g = 1 - Math.exp(-(g - 1))), (f += g * (1 - f));
    }
    return f * aO.pulseNormalize;
  }
  function aB(g) {
    for (const f in g) {
      au.hasOwnProperty(f) && (aO[f] = g[f]);
    }
  }
  var au = {
    frameRate: 150,
    animationTime: 400,
    stepSize: 100,
    pulseAlgorithm: !0,
    pulseScale: 4,
    pulseNormalize: 1,
    accelerationDelta: 50,
    accelerationMax: 3,
    keyboardSupport: !0,
    arrowScroll: 50,
    fixedBackground: !0,
    excluded: "",
  };
  var aO = au;
  var aF = !1;
  var ar = { x: 0, y: 0 };
  var ap = !1;
  var aK = document.documentElement;
  let aJ;
  let aA;
  let aE;
  var aM = [];
  let d;
  var c = /^Mac/.test(navigator.platform);
  var aN = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    spacebar: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
  };
  var aw = { 37: 1, 38: 1, 39: 1, 40: 1 };
  var aH = [];
  var an = !1;
  var ao = Date.now();
  var aj = (function () {
    let f = 0;
    return function (a) {
      return a.uniqueID || (a.uniqueID = f++);
    };
  })();
  var n = {};
  var al = {};
  let o;
  var at = {};
  if (window.localStorage && localStorage.SS_deltaBuffer) {
    try {
      aM = localStorage.SS_deltaBuffer.split(",");
    } catch (aP) {}
  }
  var ac = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (g, f, h) {
        window.setTimeout(g, h || 1000 / 60);
      }
    );
  })();
  var av =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;
  var ae = (function () {
    let f = document.scrollingElement;
    return function () {
      if (!f) {
        const a = document.createElement("div");
        a.style.cssText = "height:10000px;width:1px;";
        document.body.appendChild(a);
        const g = document.body.scrollTop;
        window.scrollBy(0, 3);
        f =
          document.body.scrollTop != g
            ? document.body
            : document.documentElement;
        window.scrollBy(0, -3);
        document.body.removeChild(a);
      }
      return f;
    };
  })();
  let aL = window.navigator.userAgent;
  let aG = /Edge/.test(aL);
  var am = /chrome/i.test(aL) && !aG;
  aG = /safari/i.test(aL) && !aG;
  const e = /mobile/i.test(aL);
  const aC = /Windows NT 6.1/i.test(aL) && /rv:11/i.test(aL);
  var ax = aG && (/Version\/8/i.test(aL) || /Version\/9/i.test(aL));
  aL = (am || aG || aC) && !e;
  let aQ = !1;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          aQ = !0;
        },
      })
    );
  } catch (aP) {}
  aG = aQ ? { passive: !1 } : !1;
  const ah =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
  ah &&
    aL &&
    (window.addEventListener(ah, ab, aG || !1),
    window.addEventListener("mousedown", p, !1),
    window.addEventListener("load", aq, !1));
  aB.destroy = function () {
    aA && aA.disconnect();
    window.removeEventListener(ah, ab, !1);
    window.removeEventListener("mousedown", p, !1);
    window.removeEventListener("keydown", ag, !1);
    window.removeEventListener("resize", aE, !1);
    window.removeEventListener("load", aq, !1);
  };
  window.SmoothScrollOptions && aB(window.SmoothScrollOptions);
  typeof define === "function" && define.amd
    ? define(function () {
        return aB;
      })
    : typeof exports === "object"
    ? (module.exports = aB)
    : (window.SmoothScroll = aB);
})();
