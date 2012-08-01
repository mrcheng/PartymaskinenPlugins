// Used by the plugins to get common javascripts shared by both the PartyMachine host and the plugins.

(function () {

	function getUrlParams() {
		var urlParams = {};
		(function () {
			var e,
				a = /\+/g,  // Regex for replacing addition symbol with a space
				r = /([^&=]+)=?([^&]*)/g,
				d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
				q = window.location.search.substring(1);

			while (e = r.exec(q))
				urlParams[d(e[1])] = d(e[2]);
		})();

		return urlParams;
	};

	var urlQuerystring = getUrlParams();
	var encodedLoaderUrl = urlQuerystring["loader"];
	var loaderUrl = decodeURIComponent(encodedLoaderUrl);

	if (typeof encodedLoaderUrl === "undefined") {
		var baseUrl = 'http://mrcheng.github.com/Partymaskinen/';
		var defaultUrl = baseUrl + 'partymachine.client.loader.js';
		alert("Missing url to loader in querystring, defaulting to " + defaultUrl);
		loaderUrl = defaultUrl;
	}

	document.write('<scr' + 'ipt type="text/javascript" src="' + loaderUrl + '"></scr' + 'ipt>');

})();