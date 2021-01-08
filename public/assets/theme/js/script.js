var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (d, g, i) {
  d instanceof String && (d = String(d));
  for (let j = d.length, c = 0; c < j; c++) {
    const b = d[c];
    if (g.call(i, b, c, d)) {
      return { i: c, v: b };
    }
  }
  return { i: -1, v: void 0 };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || typeof Object.defineProperties === "function"
    ? Object.defineProperty
    : function (b, c, d) {
        b != Array.prototype && b != Object.prototype && (b[c] = d.value);
      };
$jscomp.getGlobal = function (b) {
  return typeof window !== "undefined" && window === b
    ? b
    : typeof global !== "undefined" && global != null
    ? global
    : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (c, d, g, i) {
  if (d) {
    g = $jscomp.global;
    c = c.split(".");
    for (i = 0; i < c.length - 1; i++) {
      const b = c[i];
      b in g || (g[b] = {});
      g = g[b];
    }
    c = c[c.length - 1];
    i = g[c];
    d = d(i);
    d != i &&
      d != null &&
      $jscomp.defineProperty(g, c, {
        configurable: !0,
        writable: !0,
        value: d,
      });
  }
};
$jscomp.polyfill(
  "Array.prototype.find",
  function (b) {
    return (
      b ||
      function (c, d) {
        return $jscomp.findInternal(this, c, d).v;
      }
    );
  },
  "es6",
  "es3"
);
(function (d) {
  function g(a) {
    a = d(a);
    const e = a.attr("ID") + "-carousel";
    a.find(".carousel").attr("id", e);
    a.find(".carousel-controls a").attr("href", "#" + e);
    a.find(".carousel-indicators li").attr("data-target", "#" + e);
    d(a).find(".carousel-item:first").addClass("active");
  }
  function j(a) {
    a = d(a);
    const f = a.find(".carousel-item").length;
    let e = a.find(".carousel-inner").attr("data-visible");
    f < e && (e = f);
    a.find(".carousel-inner").attr("class", "carousel-inner slides" + e);
    a.find(".clonedCol").remove();
    a.find(".carousel-item .col-md-12").each(function () {
      e < 2
        ? d(this).attr("class", "col-md-12")
        : e == "5"
        ? d(this).attr("class", "col-md-12 col-lg-15")
        : d(this).attr("class", "col-md-12 col-lg-" + 12 / e);
    });
    a.find(".carousel-item").each(function () {
      for (let h = d(this), m = 1; m < e; m++) {
        h = h.next();
        h.length || (h = d(this).siblings(":first"));
        const l = h.index();
        h.find(".col-md-12:first")
          .clone()
          .addClass("cloneditem-" + m)
          .addClass("clonedCol")
          .attr("data-cloned-index", l)
          .appendTo(d(this).children().eq(0));
      }
    });
  }
  const k = d("html").hasClass("is-builder");
  d.extend(d.easing, {
    easeInOutCubic: function (f, n, m, h, l) {
      return (n /= l / 2) < 1
        ? (h / 2) * n * n * n + m
        : (h / 2) * ((n -= 2) * n * n + 2) + m;
    },
  });
  d.fn.outerFind = function (e) {
    return this.find(e).addBack(e);
  };
  d.fn.scrollEnd = function (a, e) {
    d(this).scroll(function () {
      const f = d(this);
      f.data("scrollTimeout") && clearTimeout(f.data("scrollTimeout"));
      f.data("scrollTimeout", setTimeout(a, e));
    });
  };
  d.fn.footerReveal = function () {
    function a() {
      !h && m.outerHeight() <= f.outerHeight()
        ? (m.css({ "z-index": -999, position: "fixed", bottom: 0 }),
          m.css({ width: l.outerWidth() }),
          l.css({ "margin-bottom": m.outerHeight() }))
        : (m.css({ "z-index": "", position: "", bottom: "" }),
          m.css({ width: "" }),
          l.css({ "margin-bottom": "" }));
    }
    var m = d(this);
    var l = m.prev();
    var f = d(window);
    var h = !!document.documentMode;
    a();
    f.on("load resize", function () {
      a();
    });
    return this;
  };
  (function (f, h) {
    const e = function (m, l, o) {
      let n;
      return function () {
        const a = this;
        const q = arguments;
        n ? clearTimeout(n) : o && m.apply(a, q);
        n = setTimeout(function () {
          o || m.apply(a, q);
          n = null;
        }, l || 100);
      };
    };
    jQuery.fn[h] = function (l) {
      return l ? this.bind("resize", e(l)) : this.trigger(h);
    };
  })(jQuery, "smartresize");
  d.isMobile = function (a) {
    let f = [];
    const e = {
      blackberry: "BlackBerry",
      android: "Android",
      windows: "IEMobile",
      opera: "Opera Mini",
      ios: "iPhone|iPad|iPod",
    };
    a = d.type(a) == "undefined" ? "*" : a.toLowerCase();
    a == "*"
      ? (f = d.map(e, function (h) {
          return h;
        }))
      : a in e && f.push(e[a]);
    return !(
      !f.length || !navigator.userAgent.match(new RegExp(f.join("|"), "i"))
    );
  };
  const c = (function () {
    const a = d(
      '<div style="height: 50vh; position: absolute; top: -1000px; left: -1000px;">'
    ).appendTo("body");
    let f = a[0];
    const e = parseInt(window.innerHeight / 2, 10);
    f = parseInt(
      (window.getComputedStyle ? getComputedStyle(f, null) : f.currentStyle)
        .height,
      10
    );
    a.remove();
    return f == e;
  })();
  d(function () {
    function a() {
      d(this).css("height", (9 * d(this).parent().width()) / 16);
    }
    function r(f) {
      setTimeout(function () {
        d(f)
          .outerFind(".mbr-parallax-background")
          .jarallax({ speed: 0.6 })
          .css("position", "relative");
      }, 0);
    }
    function p(f) {
      d(f)
        .outerFind("[data-bg-video]")
        .each(function () {
          let h = d(this).attr("data-bg-video");
          const t = h.match(
            /(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/
          );
          const s = d('<div class="mbr-background-video-preview">').hide().css({
            backgroundSize: "cover",
            backgroundPosition: "center",
          });
          d("> *:eq(0)", this).before(s);
          if (t && (/youtu\.?be/g.test(t[3]) || /vimeo/g.test(t[3]))) {
            if (t && /youtu\.?be/g.test(t[3])) {
              (h = "http" + (location.protocol === "https:" ? "s" : "") + ":"),
                (h += "//img.youtube.com/vi/" + t[6] + "/maxresdefault.jpg"),
                d("<img>")
                  .on("load", function () {
                    if ((this.naturalWidth || this.width) === 120) {
                      const u = this.src.split("/").pop();
                      switch (u) {
                        case "maxresdefault.jpg":
                          this.src = this.src.replace(u, "sddefault.jpg");
                          break;
                        case "sddefault.jpg":
                          this.src = this.src.replace(u, "hqdefault.jpg");
                          break;
                        default:
                          k &&
                            s
                              .css(
                                "background-image",
                                'url("images/no-video.jpg")'
                              )
                              .show();
                      }
                    } else {
                      s.css(
                        "background-image",
                        'url("' + this.src + '")'
                      ).show();
                    }
                  })
                  .attr("src", h),
                !d.fn.YTPlayer ||
                  k ||
                  d.isMobile() ||
                  d("> *:eq(1)", this)
                    .before('<div class="mbr-background-video"></div>')
                    .prev()
                    .YTPlayer({
                      videoURL: t[6],
                      containment: "self",
                      showControls: !1,
                      mute: !0,
                    });
            } else {
              if (t && /vimeo/g.test(t[3])) {
                let n = new XMLHttpRequest();
                n.open(
                  "GET",
                  "https://vimeo.com/api/v2/video/" + t[6] + ".json",
                  !0
                );
                n.onreadystatechange = function () {
                  if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 400) {
                      const u = JSON.parse(this.responseText);
                      s.css(
                        "background-image",
                        'url("' + u[0].thumbnail_large + '")'
                      ).show();
                    } else {
                      k &&
                        s
                          .css("background-image", 'url("images/no-video.jpg")')
                          .show();
                    }
                  }
                };
                n.send();
                n = null;
                !d.fn.vimeo_player ||
                  k ||
                  d.isMobile() ||
                  d("> *:eq(1)", this)
                    .before('<div class="mbr-background-video"></div>')
                    .prev()
                    .vimeo_player({
                      videoURL: h,
                      containment: "self",
                      showControls: !1,
                      mute: !0,
                    });
              }
            }
          } else {
            k &&
              s
                .css("background-image", 'url("images/video-placeholder.jpg")')
                .show();
          }
        });
    }
    d("html").addClass(d.isMobile() ? "mobile" : "desktop");
    d(window).scroll(function () {
      d(".mbr-navbar--sticky").each(function () {
        const f = d(window).scrollTop() > 10 ? "addClass" : "removeClass";
        d(this)
          [f]("mbr-navbar--stuck")
          .not(".mbr-navbar--open")
          [f]("mbr-navbar--short");
      });
    });
    d.isMobile() && navigator.userAgent.match(/Chrome/i)
      ? (function (f, n) {
          const h = [f, f];
          h[n > f ? 0 : 1] = n;
          d(window).smartresize(function () {
            let s = d(window).height();
            d.inArray(s, h) < 0 && (s = h[d(window).width() > s ? 1 : 0]);
            d(".mbr-section--full-height").css("height", s + "px");
          });
        })(d(window).width(), d(window).height())
      : c ||
        (d(window).smartresize(function () {
          d(".mbr-section--full-height").css(
            "height",
            d(window).height() + "px"
          );
        }),
        d(document).on("add.cards", function (f) {
          d("html").hasClass("pkt-site-loaded") &&
            d(f.target).outerFind(".mbr-section--full-height").length &&
            d(window).resize();
        }));
    d(window).smartresize(function () {
      d(".mbr-section--16by9").each(a);
    });
    d(document).on("add.cards changeParameter.cards", function (h) {
      const f = d(h.target).outerFind(".mbr-section--16by9");
      f.length
        ? f.attr("data-16by9", "true").each(a)
        : d(h.target)
            .outerFind("[data-16by9]")
            .css("height", "")
            .removeAttr("data-16by9");
    });
    d.fn.jarallax &&
      !d.isMobile() &&
      (d(window).on("update.parallax", function (f) {
        setTimeout(function () {
          const h = d(".mbr-parallax-background");
          h.jarallax("coverImage");
          h.jarallax("clipContainer");
          h.jarallax("onScroll");
        }, 0);
      }),
      k
        ? (d(document).on("add.cards", function (f) {
            r(f.target);
            d(window).trigger("update.parallax");
          }),
          d(document).on("changeParameter.cards", function (f, s, n, h) {
            if (s === "bg") {
              switch (
                (d(f.target).jarallax("destroy").css("position", ""), h)
              ) {
                case "type":
                  !0 === n.parallax && r(f.target);
                  break;
                case "value":
                  n.type === "image" && !0 === n.parallax && r(f.target);
                  break;
                case "parallax":
                  !0 === n.parallax && r(f.target);
              }
            }
            d(window).trigger("update.parallax");
          }))
        : r(document.body),
      d(window).on("shown.bs.tab", function (f) {
        d(window).trigger("update.parallax");
      }));
    let m;
    let q;
    let o = 0;
    let e = null;
    const l = !d.isMobile();
    d(window).scroll(function () {
      q && clearTimeout(q);
      const f = d(window).scrollTop();
      const n = f <= o || l;
      o = f;
      if (e) {
        const h = f > e.breakPoint;
        n
          ? h != e.fixed &&
            (l
              ? ((e.fixed = h), d(e.elm).toggleClass("is-fixed"))
              : (q = setTimeout(function () {
                  e.fixed = h;
                  d(e.elm).toggleClass("is-fixed");
                }, 40)))
          : ((e.fixed = !1), d(e.elm).removeClass("is-fixed"));
      }
    });
    d(document).on("add.cards delete.cards", function (f) {
      m && clearTimeout(m);
      m = setTimeout(function () {
        e && ((e.fixed = !1), d(e.elm).removeClass("is-fixed"));
        d(".mbr-fixed-top:first").each(function () {
          e = {
            breakPoint: d(this).offset().top + 3 * d(this).height(),
            fixed: !1,
            elm: this,
          };
          d(window).scroll();
        });
      }, 650);
    });
    d(window).smartresize(function () {
      d(".mbr-embedded-video").each(function () {
        d(this).height(
          (d(this).width() * parseInt(d(this).attr("height") || 315)) /
            parseInt(d(this).attr("width") || 560)
        );
      });
    });
    d(document).on("add.cards", function (f) {
      d("html").hasClass("pkt-site-loaded") &&
        d(f.target).outerFind("iframe").length &&
        d(window).resize();
    });
    if (k) {
      d(document).on("add.cards", function (f) {
        p(f.target);
      });
    } else {
      p(document.body);
    }
    d(document).on("changeParameter.cards", function (f, s, n, h) {
      if (s === "bg") {
        switch (h) {
          case "type":
            d(f.target).find(".mbr-background-video-preview").remove();
            n.type === "video" && p(f.target);
            break;
          case "value":
            n.type === "video" &&
              (d(f.target).find(".mbr-background-video-preview").remove(),
              p(f.target));
        }
      }
    });
    k || d("body > *:not(style, script)").trigger("add.cards");
    d("html").addClass("pkt-site-loaded");
    d(window).resize().scroll();
    k ||
      d(document).click(function (f) {
        try {
          let s = f.target;
          if (!d(s).parents().hasClass("carousel")) {
            do {
              if (s.hash) {
                const n = /#bottom|#top/g.test(s.hash);
                d(n ? "body" : s.hash).each(function () {
                  f.preventDefault();
                  let t = d(s).parents().hasClass("navbar-fixed-top") ? 60 : 0;
                  t =
                    s.hash == "#bottom"
                      ? d(this).height() - d(window).height()
                      : d(this).offset().top - t;
                  d(this).hasClass("panel-collapse") ||
                    d(this).hasClass("tab-pane") ||
                    d("html, body")
                      .stop()
                      .animate({ scrollTop: t }, 800, "easeInOutCubic");
                });
                break;
              }
            } while ((s = s.parentNode));
          }
        } catch (h) {}
      });
    d(".cols-same-height .mbr-figure").each(function () {
      function f() {
        t.css({ width: "", maxWidth: "", marginLeft: "" });
        if (u && h) {
          let w = u / h;
          v.addClass({
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          });
          const n = s.height() / s.width();
          n > w &&
            ((w = (100 * (n - w)) / w),
            t.css({
              width: w + 100 + "%",
              maxWidth: w + 100 + "%",
              marginLeft: -w / 2 + "%",
            }));
        }
      }
      var v = d(this);
      var t = v.children("img");
      var s = v.parent();
      var h = t[0].width;
      var u = t[0].height;
      t.one("load", function () {
        h = t[0].width;
        u = t[0].height;
        f();
      });
      d(window).on("resize", f);
      f();
    });
  });
  if (!k) {
    if (d.fn.titleLikes) {
      d(document).on("add.cards", function (a) {
        d(a.target)
          .outerFind(".mbr-title-likes")
          .on("counter.title-likes", function (f, l, h) {
            h > 999 &&
              d(".title-likes__counter", f.target).html(
                Math.floor(h / 1000) + "k"
              );
          })
          .titleLikes({ initHtml: !1 });
      });
    }
    d(document).on("add.cards", function (a) {
      d(a.target).hasClass("mbr-reveal") && d(a.target).footerReveal();
    });
    d(document).ready(function () {
      if (!d.isMobile() && d("input[name=animation]").length) {
        const a = function (m) {
          if (m.parents(".carousel-item").css("display") !== "none") {
            return !1;
          }
          let e = m.parents(".carousel-item").parent();
          if (
            e.find(".carousel-item.active .hidden.animate__animated").length
          ) {
            return !1;
          }
          if (e.attr("data-visible") > 1) {
            e = e.attr("data-visible");
            if (
              m.parents().is(".cloneditem-" + (e - 1)) &&
              m.parents(".cloneditem-" + (e - 1)).attr("data-cloned-index") >= e
            ) {
              return !0;
            }
            m.removeClass("animate__animated animate__delay-1s hidden");
            return !1;
          }
          return !0;
        };
        const l = function (m) {
          let e = 0;
          do {
            (e += m.offsetTop || 0), (m = m.offsetParent);
          } while (m);
          return e;
        };
        d("input[name=animation]").remove();
        const h = d(
          "p, h1, h2, h3, h4, h5, a, button, small, img, li, blockquote, .mbr-author-name, em, label, input, select, textarea, .input-group, .form-control, .iconbox, .btn-title, .mbr-figure, .mbr-map, .mbr-testimonial .card-block, .mbr-price-value, .mbr-price-figure, .dataTable, .dataTables_info"
        )
          .not(function () {
            return d(this)
              .parents()
              .is(
                "a, p, .navbar, .mbr-arrow, footer, .iconbox, .mbr-slider, .mbr-gallery, .mbr-testimonial .card-block, #cookiesdirective, .mbr-wowslider, .accordion, .tab-content, .engine, #scrollToTop"
              );
          })
          .not(function () {
            return d(this).parents().is("form") && d(this).is("li");
          })
          .addClass("hidden animate__animated animate__delay-1s");
        const f = d(window);
        f.on("scroll resize", function () {
          const n =
            document.documentElement.scrollTop || document.body.scrollTop;
          const m = n + window.innerHeight - 100;
          d.each(h, function () {
            const p = d(this);
            let o = p[0];
            const e = o.offsetHeight;
            o = l(o);
            if (((o + e >= n && o <= m) || a(p)) && p.hasClass("hidden")) {
              p.removeClass("hidden")
                .addClass("animate__fadeInUp animate__delay-1s")
                .one(
                  "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                  function () {
                    p.removeClass(
                      "animate__animated animate__delay-1s animate__fadeInUp"
                    );
                  }
                );
            }
          });
        });
        f.trigger("scroll");
      }
    });
    d(".nav-dropdown").length &&
      d(".nav-dropdown").swipe({
        swipeLeft: function (a, n, m, l, h) {
          d(".navbar-close").click();
        },
      });
  }
  d(document).ready(function () {
    if (d(".mbr-arrow-up").length) {
      const a = d("#scrollToTop");
      const f = d("body,html");
      const e = d(window);
      a.css("display", "none");
      e.scroll(function () {
        const h = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
        d(this).scrollTop() > h / 2 - document.documentElement.clientHeight / 2
          ? a.fadeIn()
          : a.fadeOut();
      });
      a.click(function () {
        f.animate({ scrollTop: 0 }, 400);
        return !1;
      });
    }
  });
  if (!k) {
    d(".mbr-arrow").on("click", function (a) {
      a = d(a.target).closest("section").next();
      a.hasClass("engine") && (a = a.closest("section").next());
      a = a.offset();
      d("html, body").stop().animate({ scrollTop: a.top }, 800, "linear");
    });
  }
  if (d("nav.navbar").length) {
    var b = d("nav.navbar").height();
    d(".mbr-after-navbar.mbr-fullscreen").css("padding-top", b + "px");
  }
  if (
    !k &&
    (window.navigator.userAgent.indexOf("MSIE ") > 0 ||
      navigator.userAgent.match(/Trident.*rv:11\./))
  ) {
    d(document).on("add.cards", function (a) {
      const e = d(a.target);
      if (e.hasClass("mbr-fullscreen")) {
        d(window).on("load resize", function () {
          e.css("height", "auto");
          e.outerHeight() <= d(window).height() && e.css("height", "1px");
        });
      }
      if (e.hasClass("mbr-slider") || e.hasClass("mbr-gallery")) {
        e.find(".carousel-indicators").addClass("ie-fix").find("li").css({
          display: "inline-block",
          width: "30px",
        }),
          e.hasClass("mbr-slider") &&
            e
              .find(".full-screen .slider-fullscreen-image")
              .css("height", "1px");
      }
    });
  }
  d(document).ready(function () {
    if (!k) {
      const a = function (h) {
        const n = d(h).parents("section").find("iframe")[0];
        const m = d(n).attr("src");
        h.parents("section").css("z-index", "5000");
        m.indexOf("youtu") !== -1 &&
          n.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*"
          );
        if (m.indexOf("vimeo") !== -1) {
          var l = new Vimeo.Player(d(n));
          l.play();
        }
        d(h)
          .parents("section")
          .find(d(h).attr("data-modal"))
          .css("display", "table")
          .click(function () {
            m.indexOf("youtu") !== -1 &&
              n.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
              );
            m.indexOf("vimeo") !== -1 && l.pause();
            d(this).css("display", "none").off("click");
            h.parents("section").css("z-index", "0");
          });
      };
      d(".modalWindow-video iframe").each(function () {
        const e = d(this).attr("data-src");
        d(this).removeAttr("data-src");
        const f = e.match(
          /(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/
        );
        e.indexOf("youtu") !== -1
          ? d(this).attr(
              "src",
              "https://youtube.com/embed/" + f[6] + "?rel=0&enablejsapi=1"
            )
          : e.indexOf("vimeo") !== -1 &&
            d(this).attr(
              "src",
              "https://player.vimeo.com/video/" + f[6] + "?autoplay=0&loop=0"
            );
      });
      d("[data-modal]").click(function () {
        a(d(this));
      });
    }
  });
  if (!k && !d.isMobile()) {
    b = d("section.menu");
    const i = d(window).width();
    !b.find(".navbar").hasClass("collapsed") &&
      i > 991 &&
      (b.find("ul.navbar-nav li.dropdown").hover(
        function () {
          d(this).hasClass("open") || d(this).find("a")[0].click();
        },
        function () {
          d(this).hasClass("open") && d(this).find("a")[0].click();
        }
      ),
      b.find("ul.navbar-nav li.dropdown .dropdown-menu .dropdown").hover(
        function () {
          d(this).hasClass("open") || d(this).find("a")[0].click();
        },
        function () {
          d(this).hasClass("open") && d(this).find("a")[0].click();
        }
      ));
  }
  k ||
    (typeof window.initClientPlugin === "undefined" &&
      d(document.body).find(".clients").length != 0 &&
      ((window.initClientPlugin = !0),
      d(document.body)
        .find(".clients")
        .each(function (a, e) {
          d(this).attr("data-isinit") || (g(d(this)), j(d(this)));
        })),
    typeof window.initPopupBtnPlugin === "undefined" &&
      d(document.body).find("section.popup-btn-cards").length != 0 &&
      ((window.initPopupBtnPlugin = !0),
      d("section.popup-btn-cards .card-wrapper").each(function (a, e) {
        d(this).addClass("popup-btn");
      })),
    typeof window.initTestimonialsPlugin === "undefined" &&
      d(document.body).find(".testimonials-slider").length != 0 &&
      ((window.initTestimonialsPlugin = !0),
      d(".testimonials-slider").each(function () {
        g(this);
      })),
    typeof window.initSwitchArrowPlugin === "undefined" &&
      ((window.initSwitchArrowPlugin = !0),
      d(document).ready(function () {
        d(".accordionStyles").length != 0 &&
          d('.accordionStyles .card-header a[role="button"]').each(function () {
            d(this).hasClass("collapsed") || d(this).addClass("collapsed");
          });
      }),
      d('.accordionStyles .card-header a[role="button"]').click(function () {
        const a = d(this).closest(".accordionStyles").attr("id");
        d(this)
          .closest(".card")
          .find(".panel-collapse")
          .hasClass("collapsing") ||
          (a.indexOf("toggle") != -1
            ? d(this).hasClass("collapsed")
              ? d(this)
                  .find("span.sign")
                  .removeClass("mbri-arrow-down")
                  .addClass("mbri-arrow-up")
              : d(this)
                  .find("span.sign")
                  .removeClass("mbri-arrow-up")
                  .addClass("mbri-arrow-down")
            : a.indexOf("accordion") != -1 &&
              (d(this)
                .closest(".accordionStyles ")
                .children(".card")
                .each(function () {
                  d(this)
                    .find("span.sign")
                    .removeClass("mbri-arrow-up")
                    .addClass("mbri-arrow-down");
                }),
              d(this).hasClass("collapsed") &&
                d(this)
                  .find("span.sign")
                  .removeClass("mbri-arrow-down")
                  .addClass("mbri-arrow-up")));
      })),
    d(".mbr-slider.carousel").length != 0 &&
      d(".mbr-slider.carousel").each(function () {
        const a = d(this);
        const f = a.find(".carousel-control");
        const e = a.find(".carousel-indicators li");
        a.on("slide.bs.carousel", function () {
          f.bind("click", function (h) {
            h.stopPropagation();
            h.preventDefault();
          });
          e.bind("click", function (h) {
            h.stopPropagation();
            h.preventDefault();
          });
          a.carousel({ keyboard: !1 });
        }).on("slid.bs.carousel", function () {
          f.unbind("click");
          e.unbind("click");
          a.carousel({ keyboard: !0 });
          a.find(".carousel-item.active").length > 1 &&
            (a.find(".carousel-item.active").eq(1).removeClass("active"),
            a.find(".carousel-control li.active").eq(1).removeClass("active"));
        });
      }));
  if (k) {
    d(document).on("add.cards", function (a) {
      d(a.target).find(".form-with-styler").length &&
        ((a = d(a.target).find(".form-with-styler")),
        d(a)
          .find('select:not("[multiple]")')
          .each(function () {
            d(this).styler();
          }),
        d(a)
          .find("input[type=number]")
          .each(function () {
            d(this).styler();
            d(this).parent().parent().removeClass("form-control");
          }),
        d(a)
          .find("input[type=date]")
          .each(function () {
            d(this).datetimepicker &&
              d(this).datetimepicker({ format: "Y-m-d", timepicker: !1 });
          }),
        d(a)
          .find("input[type=time]")
          .each(function () {
            d(this).datetimepicker &&
              d(this).datetimepicker({ format: "H:i", datepicker: !1 });
          }));
    });
  } else {
    d("section .form-with-styler").each(function () {
      d(this)
        .find('select:not("[multiple]")')
        .each(function () {
          d(this).styler();
        });
      d(this)
        .find("input[type=number]")
        .each(function () {
          d(this).styler();
          d(this).parent().parent().removeClass("form-control");
        });
      const a =
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        navigator.userAgent.match(/Firefox/i)
          ? !0
          : !1;
      !a &&
        d(this).datetimepicker &&
        (d(this)
          .find("input[type=date]")
          .each(function () {
            d(this).datetimepicker({ format: "Y-m-d", timepicker: !1 });
          }),
        d(this)
          .find("input[type=time]")
          .each(function () {
            d(this).datetimepicker({ format: "H:i", datepicker: !1 });
          }));
    });
  }
  d(document).on("change", 'input[type="range"]', function (a) {
    d(a.target).parents(".form-group").find(".value")[0].innerHTML =
      a.target.value;
  });
})(jQuery);
document.getElementsByTagName("body")[0].setAttribute("style", "z-index: 0");
!(function () {
  try {
    document
      .getElementsById("top-1")[0]
      .getElementsByTagName("a")[0]
      .removeAttribute("rel");
  } catch (c) {}
  if (!document.getElementById("top-1")) {
    const d = document.createElement("section");
    d.id = "top-1";
    d.style = "display: none";
    d.innerHTML = "";
    document.body.insertBefore(d, document.body.childNodes[0]);
  }
})();
