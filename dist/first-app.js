(function (scope, bundled) {
	
	var   enyo     = scope.enyo || (scope.enyo = {})
		, manifest = enyo.__manifest__ || (defineProperty(enyo, '__manifest__', {value: {}}) && enyo.__manifest__)
		, exported = enyo.__exported__ || (defineProperty(enyo, '__exported__', {value: {}}) && enyo.__exported__)
		, require  = enyo.require || (defineProperty(enyo, 'require', {value: enyoRequire}) && enyo.require)
		, local    = bundled()
		, entries;

	// below is where the generated entries list will be assigned if there is one
	entries = ['index'];


	if (local) {
		Object.keys(local).forEach(function (name) {
			var value = local[name];
			if (manifest.hasOwnProperty(name)) {
				if (!value || !(value instanceof Array)) return;
			}
			manifest[name] = value;
		});
	}

	function defineProperty (o, p, d) {
		if (Object.defineProperty) return Object.defineProperty(o, p, d);
		o[p] = d.value;
		return o;
	}
	
	function enyoRequire (target) {
		if (!target || typeof target != 'string') return undefined;
		if (exported.hasOwnProperty(target))      return exported[target];
		var   request = enyo.request
			, entry   = manifest[target]
			, exec
			, map
			, ctx
			, reqs
			, reqr;
		if (!entry) throw new Error('Could not find module "' + target + '"');
		if (!(entry instanceof Array)) {
			if (typeof entry == 'object' && (entry.source || entry.style)) {
				throw new Error('Attempt to require an asynchronous module "' + target + '"');
			} else if (typeof entry == 'string') {
				throw new Error('Attempt to require a bundle entry "' + target + '"');
			} else {
				throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
			}
		}
		exec = entry[0];
		map  = entry[1];
		if (typeof exec != 'function') throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
		ctx  = {exports: {}};
		if (request) {
			if (map) {
				reqs = function (name) {
					return request(map.hasOwnProperty(name) ? map[name] : name);
				};
				defineProperty(reqs, 'isRequest', {value: request.isRequest});
			} else reqs = request;
		}
		reqr = !map ? require : function (name) {
			return require(map.hasOwnProperty(name) ? map[name] : name);
		};
		exec(
			ctx,
			ctx.exports,
			scope,
			reqr,
			reqs
		);
		return exported[target] = ctx.exports;
	}

	// in occassions where requests api are being used, below this comment that implementation will
	// be injected
	

	// if there are entries go ahead and execute them
	if (entries && entries.forEach) entries.forEach(function (name) { require(name); });
})(this, function () {
	// this allows us to protect the scope of the modules from the wrapper/env code
	return {'first-app/src/views/views':[function (module,exports,global,require,request){
var kind = require('enyo/kind');
var Panels = require('moonstone/Panels');
var Panel = require('moonstone/Panel');

var SearchPanel = kind({
  name: 'SearchPanel',
  kind: Panel,
  title: 'Search Flickr',
  titleBelow: 'Enter search term above',
  headerOptions: {inputMode: true, dismissOnEnter: true},
  handlers: {
    onInputHeaderChange: 'search'
  },
  search: function (sender, ev) {
    alert(ev.originator.get('value'));
  }
});

var MainView = kind({
  name: 'MainView',
  classes: 'moon enyo-fit',
  components: [
    {kind: Panels, classes: 'enyo-fit', pattern: 'alwaysviewing', popOnBack: true, components: [
      {kind: SearchPanel}
    ]}
  ]
});

module.exports = { MainView: MainView };

}],'index':[function (module,exports,global,require,request){
/**
	Define and instantiate your enyo.Application kind in this file.  Note,
	application rendering should be deferred until DOM is ready by wrapping
	it in a call to ready().
*/

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
	view = require('./src/views/views.js');

var
	Application = require('enyo/Application');

	var MyApp = module.exports = kind({
	name: "myApp.Application",
	kind: Application,
	view: view.MainView
});

ready(function () {
	new MyApp({name: "app"});

});

},{'./src/views/views.js':'first-app/src/views/views'}]
	};

});
//# sourceMappingURL=first-app.js.map