const _paq = (window._paq = window._paq || []);
_paq.push([
  "setDomains",
  ["*.pktwallets.gridfinity.dev", "pktwallets.gridfinity.dev"],
]);
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function () {
  const u = "https://analytics.gridfinity.com/";
  _paq.push(["setTrackerUrl", u + "matomo.php"]);
  _paq.push(["setSiteId", "4"]);
  const d = document;
  const g = d.createElement("script");
  const s = d.getElementsByTagName("script")[0];
  g.type = "text/javascript";
  g.async = true;
  g.src = u + "matomo.js";
  s.parentNode.insertBefore(g, s);
})();
