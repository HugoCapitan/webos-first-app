(function (scope, bundled) {
	
	var   enyo     = scope.enyo || (scope.enyo = {})
		, manifest = enyo.__manifest__ || (defineProperty(enyo, '__manifest__', {value: {}}) && enyo.__manifest__)
		, exported = enyo.__exported__ || (defineProperty(enyo, '__exported__', {value: {}}) && enyo.__exported__)
		, require  = enyo.require || (defineProperty(enyo, 'require', {value: enyoRequire}) && enyo.require)
		, local    = bundled()
		, entries;

	// below is where the generated entries list will be assigned if there is one
	entries = null;


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
	return {'moonstone/options':[function (module,exports,global,require,request){
var
	utils = require('enyo/utils'),
	options = require('enyo/options');

var config = global.moon && global.moon.config;

/**
* Global *design-time* configuration options for Moonstone
*
* @param {Boolean} Set accelerate `false` to prefer position properties over CSS transforms.
* @module moonstone/options
*/
module.exports = utils.mixin({
	/** @lends module:moonstone/options */
	accelerate: true,
	renderOnShow: {
		expandableListDrawer: true
	}
}, options, config);

}],'moonstone/resolution':[function (module,exports,global,require,request){
/**
* Defines TV-specific resolution values. See {@link module:enyo/resolution} for more details.
* @module moonstone/resolution
*/
var
	ri = require('enyo/resolution');

ri.defineScreenTypes([
	{name: 'hd',      pxPerRem: 16, width: 1280, height: 720,  aspectRatioName: 'hdtv'},
	{name: 'fhd',     pxPerRem: 24, width: 1920, height: 1080, aspectRatioName: 'hdtv', base: true},
	{name: 'uw-uxga', pxPerRem: 24, width: 2560, height: 1080, aspectRatioName: 'cinema'},
	{name: 'uhd',     pxPerRem: 48, width: 3840, height: 2160, aspectRatioName: 'hdtv'}
]);

module.exports = ri;

}],'moonstone/i18n':[function (module,exports,global,require,request){
var
	ResBundle = require('enyo-ilib/ResBundle');

/**
* Localized strings from [iLib]{@link ilib} translations.
*
* @param {String} string - String to be localized.
* @returns {String} Localized string.
* @name moon.$L
* @public
*/
var $L = function (string) {
	if (!$L.rb) {
		return string;
	}
	var str = $L.rb.getString(string);
	return str.toString();
};
$L.rb = new ResBundle({
	loadParams: {
		root: 'moonstone/resources'
	}
});

/**
* Exports the $L i18n function from [iLib]{@link ilib}.
* @module moonstone/i18n
*/
module.exports = $L;

}],'moonstone/fonts':[function (module,exports,global,require,request){
var
	i18n = require('enyo/i18n'),
	platform = require('enyo/platform');

var
	Locale = require('enyo-ilib/Locale');

/**
* `moon-fonts` is the locale-specific font generator, allowing any locale to have its own custom
* font. Each locale-font from the configuration block (defined in this file) is generated at
* run-time. If the locale you're currently in is in the locale-font list an additional
* `@font-face` rule will be generated that will override the standard "Moonstone LG Display"
* font.
*
* Below is example genarated-output of the Urdu ("ur") locale-font.
*
* ```css
* &#64;font-face {
* 	font-family: 'Moonstone LG Display ur';
* 	font-weight: normal;
* 	src: local('LG Display_Urdu');
* 	unicode-range: U+0600-U+06FF, U+FE70-U+FEFE, U+FB50-U+FDFF;
* }
* &#64;font-face {
* 	font-family: 'Moonstone LG Display ur Bold';
* 	font-weight: normal;
* 	src: local('LG Display_Urdu');
* 	unicode-range: U+0600-U+06FF, U+FE70-U+FEFE, U+FB50-U+FDFF;
* }
* &#64;font-face {
* 	font-family: 'Moonstone LG Display ur Light';
* 	font-weight: normal;
* 	src: local('LG Display_Urdu');
* 	unicode-range: U+0600-U+06FF, U+FE70-U+FEFE, U+FB50-U+FDFF;
* }
* ```
*
* @name International Fonts
* @public
*/

function funLocaleSpecificFonts () {
	var loc = new Locale(),
		language = loc.getLanguage(),
		region = loc.getRegion(),
		styleId = 'enyo-localization-font-override',
		styleElem = document.getElementById(styleId),
		fontDefinitionCss = '',
		// Locale Configuration Block
		fonts = {
			'NonLatin': {
				regular: 'LG Display-Light',
				bold:    'LG Display-Regular'
			},
			'ja': {
				regular: 'LG Display_JP'
			},
			'en-JP': {
				regular: 'LG Display_JP'
			},
			'ur': {
				regular: 'LG Display_Urdu',
				unicodeRanges:
					'U+600-6FF,' +
					'U+FE70-FEFE,' +
					'U+FB50-FDFF'
			},
			'zh-HK': {
				regular: 'LG Display GP4_HK-Light',
				bold:    'LG Display GP4_HK-Regular',
				unicodeRanges:
					'U+0-FF,' +
					'U+2E80-2EFF,' +
					'U+3000-303F,' +
					'U+3200-33FF,' +
					'U+3400-4DBF,' +
					'U+4E00-9FFF,' +
					'U+E000-FAFF,' +
					'U+FF00-FFEF'
			}
		};

	// Duplications and alternate locale names
	fonts['zh-TW'] = fonts['zh-HK'];

	// Generate a single font-face rule
	this.buildFont = function(inOptions) {
		if (!inOptions && !inOptions.name) {
			return '';
		}
		var strOut = '@font-face { \n' +
			'  font-family: "' + inOptions.name + '";\n' +
			'  font-weight: ' + ( inOptions.weight || 'normal' ) + ';\n';

		if (inOptions.localName) {
			strOut+= '  src: local("' + inOptions.localName + '");\n';
		}
		if (inOptions.unicodeRanges) {
			strOut+= '  unicode-range: ' + inOptions.unicodeRanges + ';\n';
		}
		strOut+= '} \n';
		return strOut;
	};

	// Generate a collection of font-face rules, in multiple font-variants
	this.buildFontSet = function(strLang, bitDefault) {
		var strOut = '',
			name = (bitDefault) ? '' : ' ' + strLang;

		if (fonts[strLang].regular) {
			// Build Regular
			strOut+= this.buildFont({
				name: 'Moonstone LG Display' + name,
				localName: fonts[strLang].regular,
				unicodeRanges: fonts[strLang].unicodeRanges
			});

			// Build Bold
			strOut+= this.buildFont({
				name: 'Moonstone LG Display' + name + ' Bold',
				localName: fonts[strLang].bold || fonts[strLang].regular,
				unicodeRanges: fonts[strLang].unicodeRanges
			});

			// Build Light
			strOut+= this.buildFont({
				name: 'Moonstone LG Display' + name + ' Light',
				localName: fonts[strLang].light || fonts[strLang].regular,
				unicodeRanges: fonts[strLang].unicodeRanges
			});
		}
		return strOut;
	};

	if (!styleElem) {
		styleElem = document.createElement('style');
		styleElem.setAttribute('id', styleId);
		if (platform.ie === 8) {
			// ENYO-3944: Using getElementsByTagName('head') for IE8 Sampler support
			document.getElementsByTagName('head')[0].appendChild(styleElem);
		} else {
			document.head.appendChild(styleElem);
		}
	}

	// Build all the fonts so they could be explicitly called
	for (var lang in fonts) {
		fontDefinitionCss+= this.buildFontSet(lang);
	}

	// Set up the override so "Moonstone LG Display" becomes the local-specific font.
	if (language === 'ja') {
		fontDefinitionCss+= this.buildFontSet('ja', true);
	}
	else if (language === 'en' && region === 'JP') {
		fontDefinitionCss+= this.buildFontSet('en-JP', true);
	}
	else if (language === 'ur') {
		fontDefinitionCss+= this.buildFontSet('ur', true);
	}
	else if (language === 'zh' && region === 'HK') {
		fontDefinitionCss+= this.buildFontSet('zh-HK', true);
	}
	else if (language === 'zh' && region === 'TW') {
		fontDefinitionCss+= this.buildFontSet('zh-TW', true);
	}

	// ENYO-3944: IE8 Sampler support - IE8 does not allow innerHTML modification of <style> elements
	if (platform.ie !== 8) {
		styleElem.innerHTML = fontDefinitionCss;
	}
}

i18n.updateLocale.extend(function (sup) {
	return function() {
		sup.apply(this, arguments);
		funLocaleSpecificFonts();
	};
});

funLocaleSpecificFonts();
}],'moonstone':[function (module,exports,global,require,request){
'use strict';

var
	platform = require('enyo/platform'),
	dispatcher = require('enyo/dispatcher'),
	gesture = require('enyo/gesture');

exports = module.exports = require('./src/options');
exports.version = '2.6.0-pre.18.1';

// Override the default holdpulse config to account for greater delays between keydown and keyup
// events in Moonstone with certain input devices.
gesture.drag.configureHoldPulse({
	events: [{name: 'hold', time: 400}],
	endHold: 'onLeave'
});

/**
* Registers key mappings for webOS-specific device keys related to media control.
*
* @private
*/
if (platform.webos >= 4) {
	// Table of default keyCode mappings for webOS device
	dispatcher.registerKeyMap({
		415 : 'play',
		413 : 'stop',
		19  : 'pause',
		412 : 'rewind',
		417 : 'fastforward',
		461 : 'back'
	});
}

// ensure that these are registered
require('./src/resolution');
require('./src/fonts');

},{'./src/options':'moonstone/options','./src/resolution':'moonstone/resolution','./src/fonts':'moonstone/fonts'}],'moonstone/BreadcrumbArranger':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/BreadcrumbArranger~BreadcrumbArranger} kind.
* @module moonstone/BreadcrumbArranger
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	log = require('enyo/logger'),
	ri = require('enyo/resolution');

var
	DockRightArranger = require('layout/DockRightArranger');

/**
* @typedef {Object} moon.BreadcrumbArranger~PanelInfoObject
* @property {Boolean} breadcrumb - Whether panel is in breadcrumb (collapsed) form.
* @property {Boolean} offscreen - Whether panel is offscreen.
* @public
*/

/**
* {@link module:moonstone/BreadcrumbArranger~BreadcrumbArranger} is a {@link module:layout/Arranger~Arranger} that displays the active
* control, along with some number of breadcrumbs on the right side. This is the default
* arranger for both the "Always Viewing" and "Activity" patterns; if you are using
* {@link module:moonstone/Panel~Panel} with either of these patterns, you don't need to specify an arranger
* explicitly.
*
* The breadcrumbs reflect the sequence of panels that the user has already seen.
*
* Transitions between arrangements are handled by sliding the new control in from the
* right. If the old controls can fit within the width of the container, they will slide
* to the left; if not, they will collapse to the left.
*
* The control's child components may be of any kind; by default, they are instances of
* {@link module:moonstone/Panel~Panel}.
*
* ```
* var
* 	kind = require('enyo/kind'),
* 	Item = require('moonstone/Item'),
* 	Panels = require('moonstone/Panels');
*
* {name: 'panels', kind: Panels, pattern: 'alwaysviewing', classes: 'enyo-fit', components: [
* 	{title: 'First', components: [
* 		{kind: Item, style: 'margin-top:20px;', content: 'Item One'},
* 		{kind: Item, content: 'Item Two'},
* 		{kind: Item, content: 'Item Three'},
* 		{kind: Item, content: 'Item Four'},
* 		{kind: Item, content: 'Item Five'}
* 	]},
* 	{title: 'Second', joinToPrev: true, components: [
* 		{kind: Item, style: 'margin-top:20px;', content: 'Item One'},
* 		{kind: Item, content: 'Item Two'},
* 		{kind: Item, content: 'Item Three'},
* 		{kind: Item, content: 'Item Four'},
* 		{kind: Item, content: 'Item Five'}
* 	]}
* ]}
* ```
*
* @class BreadcrumbArranger
* @extends module:layout/DockRightArranger~DockRightArranger
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/BreadcrumbArranger~BreadcrumbArranger.prototype */ {

	/**
	* @private
	*/
	name: 'moon.BreadcrumbArranger',

	/**
	* @private
	*/
	kind: DockRightArranger,

	/**
	* Returns an object containing information about the state of a given panel (identified by
	* `panelIndex`) within a given arrangement (identified by `activeIndex`).
	*
	* Specifically, {@link module:moonstone/BreadcrumbArranger~BreadcrumbArranger} reports whether a panel is offscreen, and
	* whether it is in breadcrumb (collapsed) form.
	*
	* @param {Number} panelIndex - Index of the panel for which to get info.
	* @param {Number} activeIndex - Index of the arranger the panel is in.
	* @returns {moon.BreadcrumbArranger~PanelInfoObject}
	* @public
	*/
	getPanelInfo: function (panelIndex, activeIndex) {
		return {
			breadcrumb: this.isBreadcrumb(panelIndex, activeIndex),
			offscreen: this.isOffscreen(panelIndex, activeIndex)
		};
	},

	/**
	* @private
	*/
	breadcrumbWidth: 234,

	/**
	* @private
	*/
	debug: false,

	/**
	* @private
	*/
	size: function() {
		var containerWidth = this.getContainerWidth(),
			panels = this.container.getPanels(),
			i;

		// Set up default widths for each panel
		for (i = 0; i < panels.length; i++) {
			// If panels have already been stretched, unstretch them before doing calculations
			if (panels[i].actualWidth) {
				panels[i].applyStyle('width', dom.unit(panels[i].width, 'rem'));
			}

			panels[i].set('animate', this.container.animate);
			panels[i].actualWidth = null;
			panels[i].width = panels[i].getBounds().width;
		}

		// Calculate which panels will be joined
		this.joinedPanels = this.calculateJoinedPanels(containerWidth);

		// Stretch all panels to fit vertically
		this.applyVerticalFit();

		// Reset panel arrangement positions
		this.container.transitionPositions = this.calculateTransitionPositions(containerWidth, this.joinedPanels);
		this.adjustTransitionPositionsForJoinedPanels(this.joinedPanels);

		// Update individual panel widths to account for _joinedPanels_
		this.updateWidths(containerWidth, this.joinedPanels);
		this.applyUpdatedWidths();

		// Calculate _this.breadcrumbPositions_
		this.calcBreadcrumbPositions(this.joinedPanels);

		if (this.debug) {
			log('transitionPositions:', this.container.transitionPositions);
			log('breadcrumbPositions:', this.breadcrumbPositions);
		}
	},

	/**
	* @private
	*/
	calculateJoinedPanels: function (containerWidth) {
		containerWidth = containerWidth || this.getContainerWidth();

		var panels = this.container.getPanels(),
			joinedPanels = {};

		for (var panelIndex = 0; panelIndex < panels.length; panelIndex++) {
			for (var index = 0; index < panels.length; index++) {
				if (panelIndex > index) {
					joinedPanels[panelIndex + '.' + index] = this.isPanelJoined(panelIndex, index, containerWidth);
				}
			}
		}

		return this.formatJoinedPanels(joinedPanels);
	},

	/**
	* @private
	*/
	isPanelJoined: function (panelIndex, index, containerWidth) {
		containerWidth = containerWidth || this.getContainerWidth();

		var panels = this.container.getPanels(),
			xPos = this.getBreadcrumbEdge(index),
			i = panelIndex;

		while(i > index) {
			if (!panels[i].joinToPrev) {
				return false;
			}

			xPos += panels[i].width;
			i--;
		}

		if(xPos + panels[index].width > containerWidth) {
			return false;
		}

		return true;
	},

	/**
	* @private
	*/
	formatJoinedPanels: function (joinedPanels) {
		var panels = this.container.getPanels(),
			ret = [], i, j;

		for (i = 0; i < panels.length; i++) {
			for (j = 0; j < panels.length; j++) {
				if (!joinedPanels[i+'.'+j]) {
					continue;
				}

				ret[i] = ret[i] || [];
				ret[i].push(j);
			}
		}

		return ret;
	},

	/**
	* @private
	*/
	calculateTransitionPositions: function (containerWidth, joinedPanels) {
		var panels = this.container.getPanels(),
			tp = {};

		for (var panelIndex = 0; panelIndex < panels.length; panelIndex++) {
			for (var index = 0; index < panels.length; index++) {
				tp[panelIndex + '.' + index] = this.calculateXPos(panelIndex, index, containerWidth, joinedPanels);
			}
		}

		return tp;
	},

	/**
	* @private
	*/
	calculateXPos: function (panelIndex, index, containerWidth, joinedPanels) {
		var breadcrumbEdge = this.getBreadcrumbEdge(index),
			breadcrumbWidth = ri.scale(this.breadcrumbWidth),
			panels = this.container.getPanels(),
			xPos,
			i,
			patternOffset = 0;

		if (this.container.pattern == 'activity') {
			// add some positional sugar just for the activity breadcrumbs
			if (index === 0) {
				patternOffset = breadcrumbEdge;
			}
			else {
				patternOffset = breadcrumbEdge - breadcrumbWidth;
			}
			patternOffset/= 2;
		}

		// each active item should be at _breadcrumbEdge_
		if (index === panelIndex) {
			return breadcrumbEdge + this.getBreadcrumbGap()/2 - patternOffset;

		// breadcrumbed panels should be positioned to the left
		} else if (index > panelIndex) {
			return breadcrumbEdge - (index - panelIndex) * breadcrumbWidth - this.getBreadcrumbGap()/2 - patternOffset;

		// upcoming panels should be layed out to the right if _joinToPrev_ is true
		} else {
			// If this panel is not joined at this index, put it off the screen to the right
			if (!joinedPanels[panelIndex] || joinedPanels[panelIndex].indexOf(index) === -1) {
				return containerWidth;
			}

			xPos = breadcrumbEdge;

			i = panelIndex;
			while (i > index) {
				if (panels[i - 1]) {
					xPos += panels[i - 1].width - patternOffset;
				}
				i--;
			}

			return xPos;
		}
	},

	/**
	* @private
	*/
	recalculatePanelTransitionPositions: function (panelIndex, containerWidth, joinedPanels) {
		var panels = this.container.getPanels();
		for (var i = 0; i < panels.length; i++) {
			this.container.transitionPositions[panelIndex + '.' + i] = dom.unit(this.calculateXPos(panelIndex, i, containerWidth, joinedPanels), 'rem');
		}
	},

	/**
	* @private
	*/
	adjustTransitionPositionsForJoinedPanels: function (joinedPanels) {
		var tp = this.container.transitionPositions,
			panels = this.container.getPanels();

		for (var i = panels.length; i >= 0; i--) {
			if (!joinedPanels[i]) {
				continue;
			}

			for (var j = joinedPanels[i].length - 1; j >= 0; j--) {
				for (var k = 0; k < panels.length; k++) {
					tp[k+'.'+i] = tp[k+'.'+joinedPanels[i][j]];
				}
			}
		}
	},

	/**
	* @private
	*/
	updateWidths: function (containerWidth, joinedPanels) {
		var panels = this.container.getPanels(),
			diff,
			i, j;

		// Calculate stretched widths for panels at the end of given index
		for (i = 0; i < joinedPanels.length; i++) {
			if (!joinedPanels[i]) {
				continue;
			}

			var totalWidth = panels[i].width +
				this.getBreadcrumbEdge(joinedPanels[i][0]) +
				this.getBreadcrumbGap();

			// Add the width of each additional panel that is visible at this index
			for (j = 0; j < joinedPanels[i].length; j++) {
				// If this panel is joined with another one that has already been stretched, reposition
				// it so everything is kosher. TODO - this is a strange edge case, needs to be discussed.
				if (panels[joinedPanels[i][j]].actualWidth) {
					totalWidth += panels[joinedPanels[i][j]].actualWidth;
					// TODO - this.recalculatePanelTransitionPositions(i, containerWidth, joinedPanels);
				} else {
					totalWidth += panels[joinedPanels[i][j]].width;
				}
			}

			diff = containerWidth - totalWidth;
			panels[i].actualWidth = panels[i].width + diff;

			if (this.debug) {
				log(i, panels[i].width, '-->', panels[i].actualWidth);
			}
		}

		// Stretch all panels that should fill the whole width
		for (i = 0; i < panels.length; i++) {
			if (!panels[i].actualWidth) {
				var match = false;
				for (j = 0; j < joinedPanels.length; j++) {
					if (joinedPanels[j] && joinedPanels[j].indexOf(i) >= 0) {
						match = true;
					}
				}
				panels[i].actualWidth = (match) ?
					panels[i].width :
					containerWidth - this.getBreadcrumbEdge(i) - this.getBreadcrumbGap();
			}
		}
	},

	/**
	* @private
	*/
	applyUpdatedWidths: function () {
		var panels = this.container.getPanels();
		for (var i = 0; i < panels.length; i++) {
			panels[i].applyStyle('width', dom.unit(panels[i].actualWidth, 'rem'));
		}
	},

	/**
	* @private
	*/
	calcBreadcrumbPositions: function (joinedPanels) {
		var panels = this.container.getPanels(),
			isBreadcrumb,
			index,
			i;

		this.breadcrumbPositions = {};

		for (i = 0; i < panels.length; i++) {
			for (index = 0; index < panels.length; index++) {
				isBreadcrumb = false;

				if (index > i) {
					isBreadcrumb = !(joinedPanels[index] && joinedPanels[index].indexOf(i) > -1);
				}

				this.breadcrumbPositions[i+'.'+index] = isBreadcrumb;
			}
		}
	},

	/**
	* @private
	*/
	start: function () {
		this.inherited(arguments);

		var tp = this.container.transitionPositions;
		var panels = this.container.getPanels();
		var panel;
		var hiding = [];
		for(var i=0;(panel = panels[i]);i++) {
			if (tp[i+'.'+this.container.toIndex] === 0) {
				var width = panel.getBounds().width;
				var nextTp = tp[i+1+'.'+this.container.toIndex];
				if (width > nextTp) {
					hiding.push(i);
				}
			}
		}

		this.container.hiddenPanels = hiding;
	},

	/**
	* @private
	*/
	arrange: function (inC, inName) {
		var c$ = this.container.getPanels();
		var s = this.container.clamp(inName);
		var i, c, xPos;

		for (i=0; (c=c$[i]); i++) {
			xPos = this.container.transitionPositions[i + '.' + s];
			// If the panel is even a little off the screen,
			if (xPos < 0) {
				// lets check if its fully off.
				var containerPadding = this.getContainerPadding();
				if (xPos <= ((ri.scale(this.breadcrumbWidth) - containerPadding.left) * -1)) {
					// Its visible portion is, so lets nudge it off entirely so it can't be
					// highlighted using just its non-visible edge
					xPos -= containerPadding.right;
				}
			}
			this.arrangeControl(c, {left: xPos});
		}
	},

	/**
	* @private
	*/
	isOffscreen: function (panelIndex, activeIndex) {
		if (!this.container.transitionPositions) {
			return;
		}
		var transitionPosition = this.container.transitionPositions[panelIndex + '.' + activeIndex];
		var screenEdge = this.container.panelCoverRatio == 1 ? this.getBreadcrumbEdge(panelIndex) : 0;
		if (transitionPosition < 0) {
			return transitionPosition + ri.scale(this.breadcrumbWidth) <= screenEdge;
		} else {
			return transitionPosition >= this.containerBounds.width;
		}
	},

	/**
	* @private
	*/
	isBreadcrumb: function (panelIndex, activeIndex) {
		return this.breadcrumbPositions && this.breadcrumbPositions[panelIndex + '.' + activeIndex];
	},

	/**
	* @private
	*/
	calcBreadcrumbEdges: function () {
		this.breadcrumbEdges = [];
		for (var i = 0, panel; (panel = this.container.getPanels()[i]); i++) {
			this.breadcrumbEdges[i] = (i === 0) ? 0 : ri.scale(this.breadcrumbWidth);
		}
	},

	/**
	* @private
	*/
	getContainerWidth: function () {
		return this.containerBounds.width;
	},

	/**
	* @private
	*/
	getBreadcrumbGap: function () {
		return this.container.breadcrumbGap || 0;
	},

	/**
	* @private
	*/
	getBreadcrumbEdge: function (index) {
		var leftMargin = this.getContainerWidth() * (1 - this.container.panelCoverRatio);
		if (this.container.panelCoverRatio == 1) {
			var containerPadding = this.getContainerPadding();
			leftMargin += containerPadding.left + containerPadding.right;
		}
		if (this.container.showFirstBreadcrumb && index !== 0) {
			leftMargin += ri.scale(this.breadcrumbWidth);
		}
		return leftMargin;
	},

	/**
	* Sets bounds for each panel to fit vertically.
	* @private
	*/
	applyVerticalFit: function () {
		var panels = this.container.getPanels(),
			padding = this.getContainerPadding();

		for (var i = 0, panel; (panel = panels[i]); i++) {
			panel.setBounds({top: dom.unit(padding.top, 'rem'), bottom: dom.unit(padding.bottom, 'rem')});
		}
	},

	/**
	* @private
	*/
	getContainerPadding: function () {
		return this.container.hasNode() ? dom.calcPaddingExtents(this.container.node) : {};
	},

	/**
	* Returns `true` if any panels will move in the transition from `fromIndex` to `toIndex`.
	* @private
	*/
	shouldArrange: function (fromIndex, toIndex) {
		if (!(fromIndex >= 0 && toIndex >= 0)) {
			return;
		}

		var transitionPositions = this.container.transitionPositions,
			panelCount = this.container.getPanels().length,
			panelIndex,
			from,
			to;

		for (panelIndex = 0; panelIndex < panelCount; panelIndex++) {
			from = transitionPositions[panelIndex + '.' + fromIndex];
			to = transitionPositions[panelIndex + '.' + toIndex];

			if (from !== to) {
				return true;
			}
		}

		return false;
	}
});

}],'moonstone/StyleAnimator':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/StyleAnimator~StyleAnimator} kind.
* @module moonstone/StyleAnimator
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	log = require('enyo/logger'),
	utils = require('enyo/utils'),
	Component = require('enyo/Component');

/**
* @typedef {Object} module:moonstone/StyleAnimator~StyleAnimator~AnimationDefinitionObject
* @property {String} name - An optional name for the animation. If not specified,
* a name will be generated.
* @property {Number} duration - An optional duration. If not specified, the
*	[default duration]{@link module:moonstone/StyleAnimator~StyleAnimator#defaultDuration} will be used.
* @property {Object} timingFunction - An optional timing function. If not specified, the
*	[default timing function]{@link module:moonstone/StyleAnimator~StyleAnimator#defaultTimingFunction} will be used.
* @property {String} direction - `'forward'` or `'backward'`. Currently unused.
* @property {Object[]} keyframes - Animation keyframes.
* @public
*/

/**
* Fires when an animation step occurs.
*
* @event module:moonstone/StyleAnimator~StyleAnimator#onStep
* @type {Object}
* @property {Object} animation - A reference to the animation that generated the event.
* @public
*/

/**
* Fires when the animation completes.
*
* @event module:moonstone/StyleAnimator~StyleAnimator#onComplete
* @type {Object}
* @property {Object} animation - A reference to the animation that completed.
* @public
*/

/**
* {@link module:moonstone/StyleAnimator~StyleAnimator} is a basic animation component.  Call
* [play()]{@link module:moonstone/StyleAnimator~StyleAnimator#play} to start the animation.  The animation will run for
* the period of time (in milliseconds) specified by its `duration`, subject to its
* `timingFunction` and `direction` (See: {@link module:moonstone/StyleAnimator~StyleAnimator~AnimationDefinitionObject}).
*
* @class StyleAnimator
* @extends module:enyo/Component~Component
* @public
*/
module.exports = kind(
	/** @lends module:enyo/StyleAnimator~StyleAnimator.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.StyleAnimator',

	/**
	* @private
	*/
	kind: Component,

	/**
	* @private
	*/
	events: {
		onStep: '',
		onComplete: ''
	},

	/**
	* @private
	* @lends module:enyo/StyleAnimator~StyleAnimator.prototype
	*/
	published: {
		//* Default value used if the animation has no `duration` specified.
		defaultDuration: 1000,
		//* Default value used if the animation has no `timingFunction` specified.
		defaultTimingFunction: 'linear',
		//* Default value used if the animation has no `direction` specified.
		defaultDirection: 'forward'
	},

	/**
	* @private
	*/
	transitionProperty: dom.transition,

	/**
	* @private
	*/
	instructions: null,

	/**
	* @private
	*/
	stepInterval: null,

	/**
	* @private
	*/
	stepIntervalMS: 50,

	/**
	* @private
	*/
	startTime: null,

	/**
	* @private
	*/
	animations: null,

	/**
	* @private
	*/
	create: function () {
		Component.prototype.create.apply(this, arguments);
		this.animations = [];
	},

	/**
	* Returns animation object reflecting the passed-in properties, while also adding it to the
	* `animations` array.
	*
	* @param {module:moonstone/StyleAnimator~StyleAnimator~AnimationDefinitionObject} props - An animation definition hash.
	* @public
	*/
	newAnimation: function (props) {
		// TODO: Add documentation for the generated animation object
		if (this.animations && props.name && this.getAnimation(props.name)) {
			this.deleteAnimation(props.name);
		}

		props.keyframes = this.formatKeyframes(props.keyframes);
		props.instructions = this.generateInstructions(props.keyframes);

		var animation = {
			name:           props.name || this.generateAnimationName(),
			duration:       props.duration || this.defaultDuration,
			timingFunction: props.timingFunction ? this.updateTimingFunction (props.timingFunction) : this.updateTimingFunction (this.defaultTimingFunction),
			direction:      props.direction || this.defaultDirection,
			timeElapsed:    0,
			keyframes:      props.keyframes,
			instructions:   props.instructions,
			state:          'paused'
		};

		this.animations.push(animation);

		return animation;
	},

	/**
	* Resets transition properties to their pre-transition state for the specified animation.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	reset: function (name) {
		this.getAnimation(name);
		this._reset(name);
	},

	/**
	* Plays the animation according to its properties.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	play: function (name) {
		var animation = this.getAnimation(name);

		if (!animation) {
			return;
		}

		this.findStartAndEndValues(animation);
		this.applyValues(animation.startValues);
		this.cacheStartValues(animation.startValues);

		utils.asyncMethod(this.bindSafely(function () { this._play(name); }));
	},

	/**
	* Jumps directly to the end state of a given animation (without animating).
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	jumpToEnd: function (name) {
		var animation = this.getAnimation(name);

		if (!animation) {
			return;
		}

		this.findStartAndEndValues(animation);
		this.applyValues(animation.endValues);
	},

	/**
	* Pauses the animation, if it is currently playing.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	pause: function (name) {
		var animation = this.getAnimation(name);
		if (animation.state === 'playing') {
			this._pause(name);
		}
	},

	/**
	* Looks up an animation by name in the animation list.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	getAnimation: function (name) {
		var animation = null;
		for (var i = 0; i < this.animations.length; i++) {
			if (this.animations[i].name === name) {
				animation = this.animations[i];
				break;
			}
		}
		return animation;
	},

	/**
	* Removes an existing animation from `this.animations`, stopping it first, if necessary.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	deleteAnimation: function (name) {
		var animation = this.getAnimation(name);

		if (!animation) {
			return false;
		}

		// Pause animation if necessary
		this._pause(name);

		// Splice out this animation
		this.animations.splice(this.animations.indexOf(animation), 1);
	},

	/**
	* Begins stepping through the animation.
	*
	* @public
	*/
	start: function () {
		this.beginStepping();
	},

	/**
	* Stops stepping through the animation.
	*
	* @public
	*/
	stop: function () {
		this.stopStepping();
	},

	/**
	* Generates a unique name based on the length of `this.animations`.
	*
	* @private
	*/
	generateAnimationName: function () {
		var count = this.animations.length,
			name = this.getName()+'_animation_'+count;
		while (this.getAnimation(name)) {
			name = this.getName()+'_animation_'+count;
		}
		return name;
	},

	/**
	* @private
	*/
	formatKeyframes: function (inKeyframes) {
		var frames = [];
		for (var index in inKeyframes) {
			frames.push({index: index, controls: inKeyframes[index]});
		}
		return frames;
	},

	/**
	* @private
	*/
	updateTimingFunction: function (inTimingFunction) {
		return inTimingFunction.match(/\bcubic-bezier/i) ? inTimingFunction : this.convertTimingFunctionToBezier(inTimingFunction);
	},

	/**
	* @private
	*/
	convertTimingFunctionToBezier: function (timing) {
		switch (timing) {
		case 'linear':
			return 'cubic-bezier(0, 0, 1, 1)';
		case 'ease':
			return 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';
		case 'ease-in':
			return 'cubic-bezier(.42, 0, 1, 1)';
		case 'ease-out':
			return 'cubic-bezier(0, 0, .58, 1)';
		case 'ease-in-out':
			return 'cubic-bezier(.42, 0, .58, 1)';
		}
		log.warn('Unknown timing function: ', timing);
		return timing;
	},

	/**
	* @private
	*/
	generateInstructions: function (inKeyframes) {
		var frames = inKeyframes,
			instructions = [],
			instruction,
			endValues;

		for (var i = 0; i < frames.length-1; i++) {
			for (var j = 0, control; (control = frames[i].controls[j]); j++) {
				for (var prop in control.properties) {

					instruction = {
						control: control.control,
						property: prop,
						startValue: control.properties[prop],
						startTime: frames[i].index
					};

					endValues = this.findInstructionEndValues(instruction, i+1, frames);

					// If no end values, skip this rule   TODO - is this right?
					if (!endValues) {
						continue;
					}

					// Mix in end values
					instructions.push(utils.mixin(instruction, endValues));
				}
			}
		}

		return instructions;
	},

	/**
	* @private
	*/
	findStartAndEndValues: function (inAnimation) {
		var frames = inAnimation.keyframes,
			startValues = {},
			endValues = {},
			c,
			cID;

		for (var i = 0; i < frames.length; i++) {
			for (var j = 0, control; (control = frames[i].controls[j]); j++) {
				c = control.control;
				cID = c.id;

				if (!startValues[cID]) {
					startValues[cID] = {
						control: c,
						properties: {}
					};
				}
				if (!endValues[cID]) {
					endValues[cID] = {
						control: c,
						properties: {}
					};
				}

				for (var prop in control.properties) {
					// If value is set to _current_, grab the computed value
					if (control.properties[prop] === 'current') {
						control.properties[prop] = dom.getComputedStyle(c.hasNode())[prop];
					}
					// at zero, every prop is a startvalue
					if (i === 0 || typeof startValues[cID]['properties'][prop] === 'undefined') {
						startValues[cID]['properties'][prop] = control.properties[prop];
					}

					endValues[cID]['properties'][prop] = control.properties[prop];
				}
			}
		}

		inAnimation.startValues = startValues;
		inAnimation.endValues = endValues;
	},

	/**
	* @private
	*/
	findInstructionEndValues: function (inInstruction, inFrameIndex, inFrames) {
		for (var i = inFrameIndex; i < inFrames.length; i++) {
			for (var j = 0, control; (control = inFrames[i].controls[j]); j++) {
				if (control.control !== inInstruction.control) {
					continue;
				}
				for (var prop in control.properties) {
					if (prop === inInstruction.property) {
						return {endValue: control.properties[prop], endTime: inFrames[i].index};
					}
				}
			}
		}
	},

	/**
	* @private
	*/
	_play: function (name) {
		this.startAnimation(name);
		this.beginStepping();
	},

	/**
	* @private
	*/
	startAnimation: function (name) {
		var animation = this.getAnimation(name);

		this.applyTransitions(name, 0);
		animation.state = 'playing';
		animation.timeElapsed = 0;
		animation.startTime = utils.perfNow();
	},

	/**
	* @private
	*/
	applyValues: function (inValues) {
		var item, prop, control;

		for(item in inValues) {
			control = inValues[item].control;

			for (prop in inValues[item].properties) {
				control.applyStyle(prop, inValues[item].properties[prop]);
			}
		}
	},

	/**
	* @private
	*/
	cacheStartValues: function (inStartValues) {
		var item, control;
		this.startValues = inStartValues;

		for(item in inStartValues) {
			control = inStartValues[item].control;
			inStartValues[item].properties[this.transitionProperty] = control[this.transitionProperty];
		}
	},

	/**
	* @private
	*/
	applyTransitions: function (name, inStartTime) {
		var animation = this.getAnimation(name),
			instructions = animation.instructions;
		for (var i = 0; i < instructions.length; i++) {
			if (instructions[i].startTime <= inStartTime && !instructions[i].started) {
				this.applyTransition(name, instructions[i]);
				instructions[i].started = true;
			}
		}
	},

	/**
	* @private
	*/
	applyTransition: function (name, inInstruction) {
		var animation = this.getAnimation(name),
			currentStyle = inInstruction.control[this.transitionProperty],
			transitionTime = (inInstruction.endTime - inInstruction.startTime)*animation.duration/(100*1000),
			newStyle = currentStyle ? currentStyle + ', ' : '',
			transitionProperty = this.transitionProperty;

		newStyle += inInstruction.property + ' ' + transitionTime + 's ' + animation.timingFunction + ' 0s';

		inInstruction.control.applyStyle(transitionProperty, newStyle);

		// we arbitrarily cache this value for cheaper lookup later
		inInstruction.control[transitionProperty] = newStyle;

		inInstruction.control.applyStyle(inInstruction.property, inInstruction.endValue);

		//  this.log(inInstruction.control.id+'.applyStyle('+transitionProperty+', '+newStyle+')');
		//  this.log(inInstruction.control.id+'.applyStyle('+inInstruction.property+', '+inInstruction.endValue+')');
	},

	/**
	* Begins stepping.
	*
	* @private
	*/
	beginStepping: function () {
		if (!this.stepInterval) {
			this.stepInterval = setInterval(this.bindSafely('_step'), this.stepIntervalMS);
		}
	},

	/**
	* Stops stepping.
	*
	* @private
	*/
	stopStepping: function () {
		if (this.stepInterval) {
			clearInterval(this.stepInterval);
			this.stepInterval = null;
		}
	},

	/**
	* Steps through each playing animation.
	*
	* @private
	*/
	_step: function () {
		var playingAnimations = false,
			now = utils.perfNow(),
			animation,
			elapsed,
			i;

		for (i = 0; (animation = this.animations[i]); i++) {
			if (animation.state === 'paused') {
				continue;
			}

			elapsed = now - animation.startTime;

			// If complete, bail
			if (elapsed > animation.duration) {
				if (animation.percentElapsed != 100) {
					this.applyTransitions(animation.name, 100);
				}
				animation.percentElapsed = 100;
				this.doStep({animation: animation});
				this.completeAnimation(animation.name);
				return;
			}

			animation.timeElapsed = elapsed;
			animation.percentElapsed = Math.round(elapsed*100/animation.duration);
			this.applyTransitions(animation.name, animation.percentElapsed);
			playingAnimations = true;

			// Bubble step event
			this.doStep({animation: animation});
		}

		if (!playingAnimations) {
			this.stop();
		}
	},

	/**
	* @private
	*/
	completeAnimation: function (name) {
		var animation = this.getAnimation(name);

		this._pause(name);
		this._reset(name);
		this.doComplete({animation: animation});
	},

	/**
	* Resets transition properties to their pre-transition values.
	*
	* @private
	*/
	_reset: function (name) {
		var animation = this.getAnimation(name);
		for(var item in animation.startValues) {
			animation.startValues[item].control.applyStyle(this.transitionProperty, animation.startValues[item].properties[this.transitionProperty]);
		}
	},

	/**
	* @private
	*/
	_pause: function (name) {
		var animation = this.getAnimation(name);
		animation.state = 'paused';
	}
});

}],'moonstone/HistorySupport':[function (module,exports,global,require,request){
require('moonstone');

/**
* Mixin that enables support for custom history.
*
* @module moonstone/HistorySupport
*/

var
	EnyoHistory = require('enyo/History'),
	kind = require('enyo/kind');

/**
* {@link module:moonstone/HistorySupport~HistorySupport} is a {@glossary mixin} that enables support
* for custom history. In its current implementation, "back" actions are implemented, which allows
* for controls to override and customize the behavior that occurs when the back key is pressed or
* the `window.history` is utilized.
*
* @mixin
* @public
*/
module.exports = {

	/**
	* @private
	*/
	name: 'HistorySupport',

	/**
	* @private
	*/
	published: {

		/**
		* When `true`, pressing the back key will result in control-specific behavior that
		* corresponds to a "back" action.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		allowBackKey: true
	},

	/**
	* Pushes a default state to the back history, consisting of a reference to our handler for
	* any "back" actions.
	*
	* If the default `pushBackHistory` behavior is to be overridden, ensure that the control's
	* implementation of `pushBackHistory` signifies it has handled the necessary behavior by
	* returning `true`.
	*
	* @example
	* pushBackHistory: function() {
	*	// perform custom operations here
	*	return true;
	* }
	*
	* @method
	* @public
	*/
	pushBackHistory: kind.inherit(function (sup) {
		// When you use a mixin, it will override existing properties and methods. If a control,
		// which uses `moon.HistorySupport`, has implemented the `pushBackHistory` method, the
		// method will be replaced with the following method. To ensure that the control's
		// implementation of `pushBackHistory` is executed, we allow it to run and subsequently
		// examine its return value.
		return function () {
			// check whether this control's `pushBackHistroy` method has effectively handled
			// the call, or whether it wants the inherited method to execute
			if (!sup.apply(this, arguments)) {
				EnyoHistory.push({context: this, handler: this.backKeyHandler});
			}
			return true;
		};
	}),

	/**
	* Handler for whenever a "back" action is triggered. The default behavior is to hide the
	* control if it is showing.
	*
	* Most controls will want to override this behavior. If the default behavior should not be
	* executed, ensure that the `backKeyHandler` method in the control signifies it has handled
	* the necessary behavior by returning `true`.
	*
	* @method
	* @public
	*/
	backKeyHandler: kind.inherit(function (sup) {
		return function () {
			if (!sup.apply(this, arguments)) {
				if (this.showing) this.hide();
			}
			return true;
		};
	})
};

}],'moonstone/HighlightText':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/HighlightText~HighlightText} kind.
* @module moonstone/HighlightText
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	Control = require('enyo/Control'),
	HTMLStringDelegate = require('enyo/HTMLStringDelegate');

/**
* Event sent to {@link module:moonstone/HighlightText~HighlightText} to turn on highlighting.
*
* @event moon.HighlightText#onHighlight
* @type {Object}
* @property {String|RegExp} highlight - String or regular expression specifying the text or
*	pattern to highlight.
* @public
*/

/**
* Event sent to {@link module:moonstone/HighlightText~HighlightText} to turn off highlighting. No additional data
* is sent with this event.
*
* @event moon.HighlightText#onUnHighlight
* @type {Object}
* @public
*/

var HighlightTextDelegate = Object.create(HTMLStringDelegate);

HighlightTextDelegate.generateInnerHtml = function (control) {
	var i = 0, child;
	// flow can alter the way that html content is rendered inside
	// the container regardless of whether there are children.
	control.flow();
	if (control.children.length) {
		// If marqueeText is created inside of highlightText then it needs to pass search keyword to children
		for (; (child = control.children[i]); ++i) {
			child.search = control.search;
			child.highlightClasses = control.highlightClasses; // this is not included in search, so passing it
		}
		return this.generateChildHtml(control);
	}
	else {
		if (control.search && control.content) {
			return control.content.replace(control.search, control.bindSafely(function (s) {
				return '<span style=\'pointer-events:none;\' class=\'' + this.highlightClasses + '\'>' + dom.escape(s) + '</span>';
			}));
		} else {
			return dom.escape(control.get('content'));
		}
	}
};

/**
* {@link module:moonstone/HighlightText~HighlightText} is a control that displays highlighted text.  When
* the [highlight]{@link module:moonstone/HighlightText~HighlightText#highlight} property is set or an
* [onHighlight]{@link module:moonstone/HighlightText~HighlightText#onHighlight} event is received,
* it will highlight a specified string if that string is found within the
* control's content.
*
* For example, let's say we have the following control:
*
* ```
* {kind: 'moon.HighlightText', name: 'myHT', content: 'Hello World!'}
* ```
* In response to the event
*
* ```
* this.waterfall('onHighlight', {highlight: 'Hello'});
* ```
* or the direct API call
*
* ```
* this.$.myHT.set('highlight', 'Hello');
* ```
*
* the word 'Hello' will be highlighted.
*
* The highlighting will be turned off when an
* [onUnHighlight]{@link module:moonstone/HighlightText~HighlightText#onUnHighlight} event is received.
*
* ```
* this.waterfall('onUnHighlight');
* ```
* or when [highlight]{@link module:moonstone/HighlightText~HighlightText#highlight} is set to a **falsy** value.
*
* ```
* this.$.myHT.set('highlight', '');
* ```
*
* @class HighlightText
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/HighlightText~HighlightText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.HighlightText',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	* @lends module:moonstone/HighlightText~HighlightText.prototype
	*/
	published: {

		/**
		* String or regular expression specifying the text or pattern to highlight.
		* Setting this to an empty string, a **falsy** value, or an empty regex
		* will disable highlighting.
		*
		* @type {String|RegExp}
		* @default ''
		* @public
		*/
		highlight: '',

		/**
		* If `true`, only case-sensitive matches of the string to highlight will be
		* highlighted.  This property will be ignored if the
		* [highlight]{@link module:moonstone/HighlightText~HighlightText#highlight} property is set to a regular
		* expression (you may use the `'i'` modifier to create a case-insensitive regex).
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		caseSensitive: false,

		/**
		* The default CSS class to apply to highlighted content.
		*
		* @type {String}
		* @default 'moon-highlight-text-highlighted'
		* @public
		*/
		highlightClasses: 'moon-highlight-text-highlighted'
	},

	/**
	* @private
	*/
	renderDelegate: HighlightTextDelegate,

	/**
	* @private
	*/
	handlers: {
		onHighlight: 'onHighlightHandler',
		onUnHighlight: 'unHighlightHandler'
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.highlightChanged();
	},

	/**
	* @private
	*/
	highlightChanged: function () {
		if (this.highlight) {
			if (this.highlight instanceof RegExp) {
				// Make sure the regex isn't empty
				this.search = (''.match(this.highlight)) ? null : this.highlight;
			} else {
				// Escape string for use in regex (standard regex escape from google)
				var escaped = this.highlight.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
				this.search = new RegExp(escaped, this.caseSensitive ? 'g' : 'ig');
			}
		} else {
			this.search = false;
		}
		if (this.hasNode()) {
			this.contentChanged();
		}
	},

	/**
	* @private
	*/
	caseSensitiveChanged: function () {
		this.highlightChanged();
	},

	/**
	* @private
	*/
	onHighlightHandler: function (inSender, inEvent) {
		this.setHighlight(inEvent.highlight);
		return true;
	},

	/**
	* @private
	*/
	unHighlightHandler: function (inSender, inEvent) {
		this.setHighlight('');
		return true;
	}
});

}],'moonstone/Marquee':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Marquee~MarqueeSupport} mixin and the {@link module:moonstone/Marquee~MarqueeText} &
* {@link module:moonstone/Marquee~MarqueeDecorator} kinds.
* @module moonstone/Marquee
*/

var kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	platform = require('enyo/platform'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	Component = require('enyo/Component'),
	Signals = require('enyo/Signals');

var
	options = require('../options'),
	HighlightText = require('../HighlightText');

var exports = module.exports = {};

/**
* There are a couple scenarios (window blurs and changing from pointer mode to 5-way) in which
* we'd like to stop an actively on-hover marqueeing control. This private instance manages
* those events centrally to minimize unnecessary Signal's subscribers.
*
* @private
*/
var observer = new Component({

	/**
	* @private
	*/
	hoverControl: null,

	/**
	* @private
	*/
	components: [
		{kind: Signals, onSpotlightModeChanged: 'handleModeChanged', onblur: 'handleBlur'}
	],

	/**
	* @private
	*/
	_setMarqueeOnHoverControl: function(oControl) {
		this.hoverControl = oControl;
	},

	/**
	* @private
	*/
	_getMarqueeOnHoverControl: function() {
		return this.hoverControl;
	},

	/**
	* @private
	*/
	handleModeChanged: function (sender, event) {
		if (!event.pointerMode && this.hoverControl) {
			this.hoverControl._marquee_leave();
		}
	},

	/**
	* @private
	*/
	handleBlur: function (sender, event) {
		if (this.hoverControl) {
			this.hoverControl._marquee_leave();
		}
	}
});

/**
* Fires to queue up a list of child animations.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarquee
* @type {Object}
* @property {Object} originator - A reference to the originator of this event.
* @property {Boolean} marqueePause - The desired duration in milliseconds that the
* marquee will pause at the end of the animation, before resetting to the beginning.
* @property {Number} marqueeSpeed - The desired speed for the marquee animation,
* in pixels per second.
* @private
*/

/**
* Fires to start marquee animation in a child marquee.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStart
* @type {Object}
* @property {Object} originator - A reference to the originator of this event.
* @private
*/

/**
* Fires to halt marquee animation in a child marquee.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStop
* @type {Object}
* @property {Object} originator - A reference to the originator of this event.
* @private
*/

/**
* Fires to enable animation in a child marquee. No additional data is sent with this event.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeEnable
* @type {Object}
* @private
*/

/**
* Fires to disable animation in a child marquee. No additional data is sent with this event.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeDisable
* @type {Object}
* @private
*/

/**
* Fires when marquee ends. No additional data is sent with this event.
*
* @event module:moonstone/Marquee~MarqueeItem#onMarqueeEnded
* @type {Object}
* @private
*/

/**
* The {@link module:moonstone/Marquee~MarqueeSupport} [mixin]{@glossary mixin} should be used with controls
* that contain multiple marquees whose animation behavior should be synchronized. Calling
* [this.startMarquee()]{@link module:moonstone/Marquee~MarqueeSupport#startMarquee} or
* [this.stopMarquee()]{@link module:moonstone/Marquee~MarqueeSupport#stopMarquee} will start or stop all
* contained marquees.
*
* The following properties, defined on the base kind to which the mixin is applied,
* control the marquee behavior:
*
* [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight}: When `true`, marquee
* starts when control is spotlight focused and ends when it is spotlight blurred.
*
* [marqueeOnHover]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnHover}: When `true`, marquee runs
* while control is hovered over with the mouse. This property is ignored if
* `marqueeOnSpotlight` is `true`.
*
* [marqueeOnRender]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRender}: When `true`, marquee starts
* running as soon as control is rendered, and runs continuously.
*
* [marqueeSpeed]{@link module:moonstone/Marquee~MarqueeSupport#marqueeSpeed}: The speed of the marquee animation,
* in pixels per second.
*
* [marqueeDelay]{@link module:moonstone/Marquee~MarqueeSupport#marqueeDelay}: The delay between spotlight
* focus/hover and the start of the animation. (This is only used when either
* `marqueeOnSpotlight` or `marqueeOnHover` is `true`).
*
* [marqueeOnRenderDelay]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRenderDelay}: Used when you want
* the marquee to run on render, after a specified delay.
*
* [marqueePause]{@link module:moonstone/Marquee~MarqueeSupport#marqueePause}: The duration in milliseconds that
* the marquee will pause at the end of the animation, before resetting to the beginning.
*
* @mixin
* @public
*/
var MarqueeSupport = {

	/**
	* @private
	*/
	name: 'MarqueeSupport',

	/**
	* @private
	*/
	_marquee_Handlers: {
		onRequestStartMarquee: '_marquee_requestStartMarquee',
		onSpotlightFocused: '_marquee_spotlightFocused',
		onSpotlightBlur: '_marquee_spotlightBlur',
		onenter: '_marquee_enter',
		onleave: '_marquee_leave',
		onMarqueeEnded: '_marquee_marqueeEnded',
		onresize: '_marquee_resize',

		// Stop propagation of requests coming from parent MarqueeSupport's, since
		// only this MarqueeSupport should be controlling its subordinate children
		onRequestMarquee: '_marquee_stopPropagation',
		onRequestMarqueeStart: '_marquee_stopPropagation',
		onRequestMarqueeStop: '_marquee_stopPropagation'
	},

	/**
	* @private
	*/
	_marquee_active: false,

	/**
	* When `true`, marquee starts when the control is {@link Spotlight} focused and ends
	* when it is spotlight blurred.
	*
	* @type {Boolean}
	* @default undefined
	* @public
	*/
	marqueeOnSpotlight: undefined,

	/**
	* When `true`, marquee runs while the control is hovered over with the mouse. This
	* property is ignored if [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight}
	* is `true`.
	*
	* @type {Boolean}
	* @default undefined
	* @public
	*/
	marqueeOnHover: undefined,

	/**
	* When `true`, marquee starts running as soon as the control is rendered, and runs
	* continuously.
	*
	* @type {Boolean}
	* @default undefined
	* @public
	*/
	marqueeOnRender: undefined,

	/**
	* The speed of the marquee animation, in pixels per second.
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueeSpeed: undefined,

	/**
	* The delay between spotlight focus/hover and the start of the animation. (This is only
	* used when either [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight} or
	* [marqueeOnHover]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnHover} is `true`.)
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueeDelay: undefined,

	/**
	* Used when you want the marquee to run on render, after a specified delay.
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueeOnRenderDelay: undefined,

	/**
	* The duration in milliseconds that the marquee will pause at the end of the
	* animation, before resetting to the beginning.
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueePause: undefined,

	/**
	* Initializes marquee timings.
	*
	* @method
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.marqueeOnSpotlight = (this.marqueeOnSpotlight === undefined) ? true : this.marqueeOnSpotlight;
			this.marqueeOnHover =  (this.marqueeOnHover ===   undefined) ? false :  this.marqueeOnHover;
			this.marqueeSpeed =    (this.marqueeSpeed ===     undefined) ? 60 :    this.marqueeSpeed;
			this.marqueeDelay =    (this.marqueeDelay ===     undefined) ? 1000 :  this.marqueeDelay;
			this.marqueePause =    (this.marqueePause ===     undefined) ? 1000 :  this.marqueePause;
			this.marqueeHold  =    (this.marqueeHold  ===     undefined) ? 2000 :  this.marqueeHold;
			this.marqueeOnRender = (this.marqueeOnRender  === undefined) ? false : this.marqueeOnRender;
			this.marqueeOnRenderDelay = (this.marqueeOnRenderDelay === undefined) ? this.marqueeDelay : this.marqueeOnRenderDelay;
		};
	}),

	/**
	* If {@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRender} is `true`, kicks off marquee animation.
	*
	* @method
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			if (this.marqueeOnRender && !this.disabled) {
				this.startMarqueeCustomDelay(this.marqueeOnRenderDelay);
			}
		};
	}),

	/**
	* @method
	* @private
	*/
	teardownRender: kind.inherit(function (sup) {
		return function (caching) {
			if (caching && this._marquee_active) {
				this.stopMarquee();
			}
			sup.apply(this, arguments);
		};
	}),

	/**
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			if (this === observer._getMarqueeOnHoverControl()) {
				observer._setMarqueeOnHoverControl(null);
			}
			sup.apply(this, arguments);
		};
	}),

	/**
	* @method
	* @private
	*/
	dispatchEvent: kind.inherit(function (sup) {
		return function (sEventName, oEvent, oSender) {
			// Needed for proper onenter/onleave handling
			if (this.strictlyInternalEvents[sEventName] && this.isInternalEvent(oEvent)) {
				return true;
			}
			// FIXME: not sure why events can arrive without event objects, but we guard here for safety
			if (oEvent && !oEvent.delegate) {
				var handler = this._marquee_Handlers[sEventName];
				if (handler){
					this.cachePoint = true;
					if(this[handler](oSender, oEvent)) {
						return true;
					}
				}
			}
			return sup.apply(this, arguments);
		};
	}),

	/**
	* Handles external requests to kick off {@link module:moonstone/Marquee~MarqueeSupport#marqueeStart}.
	*
	* @private
	*/
	_marquee_requestStartMarquee: function () {
		if (this.marqueeOnRender) {
			this.stopMarquee();
			this.startMarquee();
			return true;
		}
	},

	/**
	* On focus, starts child marquees.
	*
	* @private
	*/
	_marquee_spotlightFocused: function (sender, ev) {
		this._marquee_isFocused = true;
		if (this.marqueeOnSpotlight) {
			this.startMarquee();
		}
	},

	/**
	* On blur, halts child marquees.
	*
	* @private
	*/
	_marquee_spotlightBlur: function (sender, ev) {
		this._marquee_isFocused = false;
		if (this.marqueeOnSpotlight && !this.marqueeOnRender) {
			this.stopMarquee();
		}
	},

	/**
	* @private
	*/
	_marquee_enter: function (sender, ev) {
		this._marquee_isHovered = true;
		if ((this.marqueeOnHover && !this.marqueeOnSpotlight) ||
		(this.disabled && this.marqueeOnSpotlight)) {
			if (this.marqueeOnHover) {
				observer._setMarqueeOnHoverControl(this);
			}
			this.startMarquee();
		}
	},

	/**
	* @private
	*/
	_marquee_leave: function (sender, ev) {
		this._marquee_isHovered = false;
		if ((this.marqueeOnHover && !this.marqueeOnSpotlight) || (this.disabled && this.marqueeOnSpotlight)) {
			if (this.marqueeOnHover) {
				observer._setMarqueeOnHoverControl(null);
			}
			if (!this.marqueeOnRender) {
				this.stopMarquee();
			}
		}
	},

	/**
	* @private
	*/
	_marquee_stopPropagation: function (sender, ev) {
		if (ev.originator != this) {
			return true;
		}
	},

	/**
	* When a child marquee animation completes, removes the child from
	* [marqueeWaitList]{@link module:moonstone/Marquee~MarqueeSupport#marqueeWaitList}.
	*
	* @private
	*/
	_marquee_marqueeEnded: function (sender, ev) {
		if (this._marquee_active) {
			util.remove(ev.originator, this.marqueeWaitList);
			if (this.marqueeWaitList.length === 0) {
				this._marquee_startHold();
				this._marquee_active = false;
			}
		}
		return true;
	},

	/**
	* @private
	*/
	_marquee_resize: function (sender, ev) {
		if (this.marqueeOnSpotlight && this._marquee_active) {
			this._marquee_active = false;
			this._marquee_startHold();
		}
	},

	/**
	* Starts timer to waterfall an
	* [onRequestMarqueeStart]{@link module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStart} event
	* that kicks off marquee animation on all child marquees.
	*
	* @public
	*/
	startMarquee: function () {
		this.startMarqueeCustomDelay(this.marqueeDelay);
	},

	/**
	* Waterfalls an [onRequestMarqueeStop]{@link module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStop}
	* event to halt all running child marquees.
	*
	* @public
	*/
	stopMarquee: function () {
		this.stopJob('marqueeSupportJob');
		this.stopJob('resetMarquee');
		this._marquee_active = false;
		this._marquee_stopChildMarquees();
	},

	/**
	* @public
	*/
	enableMarquee: function () {
		this._marquee_enableChildMarquees();
	},

	/**
	* @public
	*/
	disableMarquee: function () {
		this.stopMarquee();
		this._marquee_disableChildMarquees();
	},

	/**
	* Adds the passed-in [control]{@link module:enyo/Control~Control} to the list of marquee items.
	*
	* @param {Object} control  The [control]{@link module:enyo/Control~Control} to add.
	* @public
	*/
	addMarqueeItem: function (control) {
		this.marqueeWaitList.push(control);
	},

	/**
	* Restarts marquee if needed (depending on the
	* [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight} and
	* [marqueeOnRender]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRender} settings).
	*
	* @public
	*/
	resetMarquee: function () {
		if ((this.marqueeOnSpotlight && this._marquee_isFocused) ||
			(this.marqueeOnHover && this._marquee_isHovered) ||
			this.marqueeOnRender) {
			// Batch multiple requests to reset from children being hidden/shown
			this.startJob('resetMarquee', '_resetMarquee', 10);
		}
	},

	/**
	* Starts Marquee after a specified delay. Used to provide different delays for `onRender`
	* and `onSpotlight/Hover`.
	*
	* @param {Number} delay  Length of delay in milliseconds
	* @public
	*/
	startMarqueeCustomDelay: function (delay) {
		this._marquee_buildWaitList();

		if (this.marqueeWaitList.length === 0) {
			return;
		}

		this._marquee_active = true;
		this.startJob('marqueeSupportJob', '_marquee_startChildMarquees', delay);
	},

	/**
	* Stops and restarts the marquee animations.
	*
	* @private
	*/
	_resetMarquee: function () {
		this.stopMarquee();
		if (this.marqueeOnRender) { this.startMarqueeCustomDelay(this.marqueeOnRenderDelay); }
		else { this.startMarquee(); }
	},

	/**
	* Waterfalls request for child animations to build up
	* [marqueeWaitList]{@link module:moonstone/Marquee~MarqueeSupport#marqueeWaitList}.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarquee
	* @private
	*/
	_marquee_buildWaitList: function () {
		this.marqueeWaitList = [];
		this.waterfall('onRequestMarquee', {originator: this, marqueePause: this.marqueePause, marqueeSpeed: this.marqueeSpeed});
	},

	/**
	* Waterfalls event to kick off child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStart
	* @private
	*/
	_marquee_startChildMarquees: function () {
		this.waterfall('onRequestMarqueeStart', {originator: this});
	},

	/**
	* Waterfalls event to halt child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStop
	* @private
	*/
	_marquee_stopChildMarquees: function () {
		this.waterfall('onRequestMarqueeStop', {originator: this});
	},

	/**
	* Waterfalls event to enable child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeEnable
	* @private
	*/
	_marquee_enableChildMarquees: function () {
		this.waterfall('onRequestMarqueeEnable');
	},

	/**
	* Waterfalls event to disable child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeDisable
	* @private
	*/
	_marquee_disableChildMarquees: function () {
		this.waterfall('onRequestMarqueeDisable');
	},

	/**
	* Begins delayed restart of child marquee animations.
	*
	* @private
	*/
	_marquee_startHold: function () {
		this.startJob('marqueeSupportJob', 'startMarquee', this.marqueeHold);
	}
};

exports.Support = MarqueeSupport;

/**
* The {@link module:moonstone/Marquee~MarqueeItem} mixin is used to add marquee animation functionality
* to a control.
*
* @mixin
* @public
*/
var MarqueeItem = {

	/**
	* @private
	*/
	events: {

		/**
		* {@link module:moonstone/Marquee~MarqueeItem#onMarqueeEnded}
		*/
		onMarqueeEnded:''
	},

	/**
	* @private
	*/
	_marqueeItem_Handlers: {
		onRequestMarquee: '_marquee_requestMarquee',
		onRequestMarqueeStart: '_marquee_startAnimation',
		onRequestMarqueeStop: '_marquee_stopAnimation',
		onRequestMarqueeEnable: '_marquee_enable',
		onRequestMarqueeDisable: '_marquee_disable',
		ontransitionend: '_marquee_animationEnded'
	},

	/**
	* @private
	*/
	observers: {
		_marquee_contentChanged: ['content'],
		_marquee_centeredChanged: ['centered'],
		_marquee_wrapInsteadOfMarqueeChanged: ['wrapInsteadOfMarquee']
	},

	/**
	* @private
	*/
	bindings: [
		{from: '.allowHtml', to:'.$.marqueeText.allowHtml'}
	],

	/**
	* @private
	*/
	classes: 'moon-marquee',

	/**
	* @method
	* @private
	*/
	dispatchEvent: kind.inherit(function (sup) {
		return function (sEventName, oEvent, oSender) {
			if (sup.apply(this, arguments)) {
				return true;
			}
			if (oEvent && !oEvent.delegate) {
				var handler = this._marqueeItem_Handlers[sEventName];
				if (handler && this[handler](oSender, oEvent)) {
					return true;
				}
			}
		};
	}),

	/**
	* @private
	*/
	_marquee_enabled: true,

	/**
	* @private
	*/
	_marquee_distance: null,

	/**
	* @private
	*/
	_marquee_fits: null,

	/**
	* @private
	*/
	_marquee_puppetMaster: null,

	/**
	* @method
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.detectTextDirectionality();
			this._marquee_wrapInsteadOfMarqueeChanged();
		};
	}),

	/**
	* @method
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			// There is a known issue where a parent control that modifies the layout will
			// invalidate the measurements used to detect the proper alignment, which can
			// result in the appropriate text-align rule not being applied. For example, this
			// can occur with a moon.Header that is located inside a moon.Scroller which has
			// vertical scrollbars visible.
			this._marquee_detectAlignment();
			setTimeout(util.bindSafely(this, this._marquee_calcDistance), platform.firefox ? 100 : 16);
		};
	}),

	/**
	* @method
	* @private
	*/
	reflow: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this._marquee_invalidateMetrics();
			this._marquee_calcDistance();
		};
	}),

	/**
	* @method
	* @private
	*/
	showingChangedHandler: kind.inherit(function (sup) {
		return function (sender, event) {
			sup.apply(this, arguments);
			this._marquee_reset();
			if(this.showing && event.showing){
				this._marquee_calcDistance();
			} else {
				//if the marquee isn't showing we should reset its spotlight focus
				if (this._marquee_puppetMaster) {
					this._marquee_puppetMaster._marquee_spotlightBlur();
				} else if (this._marquee_spotlightBlur) {
					this._marquee_spotlightBlur();
				}
			}
		};
	}),

	/**
	* We must measure the content (after render) to determine if it's marqueeable, then to set
	* its alignment to left if the content was explicitly set to LTR earlier. This happens when
	* the locale is set to a RTL language, but your string contains no RTL characters in it.
	* Therefore it's LTR, and if it's marqueeable, should be left aligned, so it marquees in the
	* natural marqueeing direction.
	*
	* @param {Boolean} [forceAnimate]  Override the animation check (only accepts `true`). Use
	*	this if you know already, because you've already measured that you will need to marquee.
	* @param {Boolean} [forceRtl]  Override the internal RTL property, in case you know better.
	* @private
	*/
	_marquee_detectAlignment: function (forceAnimate, forceRtl) {
		var alignment = null,
			rtl = forceRtl || this.rtl;

		// We only attempt to set the alignment of this control if the locale's directionality
		// differs from the directionality of our current marqueeable control (as determined by
		// the control's content or is explicitly specified).
		if (Control.prototype.rtl != rtl || this.centered) {
			// If we will be marqueeing, we know the alignment needs to be set based on directionality.
			if (forceAnimate || this._marquee_shouldAnimate()) {
				if (rtl) {
					alignment = 'right';
				} else {
					alignment = 'left';
				}
			}
			// Alignment wasn't set yet, so we know we don't need to animate. Now we can center the text if we're supposed to.
			if (!alignment && this.centered) {
				alignment = 'center';
			}
		}

		this.set('_marquee_alignment', alignment);
	},

	/**
	* Reset the marquee distance if the alignment changes, since now we'll have to calculate the
	* size again.
	*
	* @private
	*/
	_marquee_alignmentChanged: function () {
		this.applyStyle('text-align', this._marquee_alignment);
		this._marquee_invalidateMetrics();
	},

	/**
	* @private
	*/
	_marquee_invalidateMetrics: function () {
		this._marquee_distance = null;
		this._marquee_fits = null;
	},

	/**
	* When the content of this control changes, updates the content of
	* `this.$.marqueeText` (if it exists).
	*
	* @private
	*/
	_marquee_contentChanged: function () {
		this.detectTextDirectionality();
		if (this.$.marqueeText) {
			this.$.marqueeText.setContent(this.content);
		}
		if (this.generated) {
			this._marquee_invalidateMetrics();
			this._marquee_detectAlignment();
			this._marquee_calcDistance();
		}
		this._marquee_reset();
	},

	/**
	* If this control needs to marquee, lets the event originator know.
	*
	* @private
	*/
	_marquee_requestMarquee: function (sender, ev) {
		if (!ev || !this.showing || this._marquee_fits) {
			return;
		}

		this._marquee_puppetMaster = ev.originator;
		ev.originator.addMarqueeItem(this);

		this.marqueePause = ev.marqueePause || 1000;
		this.marqueeSpeed = ev.marqueeSpeed || 60;
	},

	/**
	* Starts marquee animation.
	*
	* @private
	*/
	_marquee_startAnimation: function (sender, ev) {
		// if this control hasn't been generated, there's no need to follow through on
		// marquee requests as we'll be unable to correctly measure the distance delta yet
		if (!this.generated) return;

		var distance = this._marquee_calcDistance();

		// If there is no need to animate, return early
		if (!this._marquee_shouldAnimate(distance)) {
			this._marquee_fits = true;
			this.doMarqueeEnded();
			return;
		}

		// Lazy creation of _this.$.marqueeText_
		if (!this.$.marqueeText) {
			this._marquee_createMarquee();
			distance = this._marquee_calcDistance();
		}

		this._marquee_addAnimationStyles(distance);

		if (this.$.marqueeText) { return true; }
		//if we should animate marquee (distance > 0) but can`t do this
		//(this.$.marqueeText == undefined (marquee has children)) we fire doMarqueeEnded
		//to remove marquee from marquee wait list
		else { this.doMarqueeEnded(); }
	},

	/**
	* @private
	*/
	_marquee_enable: function () {
		this.set('_marquee_enabled', true);
	},

	/**
	* @private
	*/
	_marquee_disable: function () {
		this.set('_marquee_enabled', false);
		this._marquee_stopAnimation();
	},

	/**
	* Stops marquee animation.
	*
	* @fires module:moonstone/Marquee~MarqueeItem#onMarqueeEnded
	* @private
	*/
	_marquee_stopAnimation: function (sender, ev) {
		this.stopJob('stopMarquee');
		this._marquee_removeAnimationStyles();
		this.doMarqueeEnded();
	},

	/**
	* When animation ends, starts `this.stopMarquee` job.
	*
	* @private
	*/
	_marquee_animationEnded: function (sender, ev) {
		if (ev.originator !== this.$.marqueeText) {
			return;
		}

		this.startJob('stopMarquee', '_marquee_stopAnimation', this.marqueePause);
		return true;
	},

	/**
	* Returns `true` if this control has enough content to animate.
	*
	* @private
	*/
	_marquee_shouldAnimate: function (distance) {
		distance = (distance && distance >= 0) ? distance : this._marquee_calcDistance();
		return (distance > 0);
	},

	/**
	* Determines how far the marquee needs to scroll.
	*
	* @private
	*/
	_marquee_calcDistance: function () {
		var node = this.$.marqueeText ? this.$.marqueeText.hasNode() : this.hasNode(),
			rect;

		if (node && this._marquee_distance == null && this.getAbsoluteShowing()) {
			rect = node.getBoundingClientRect();
			this._marquee_distance = Math.floor(Math.abs(node.scrollWidth - rect.width));

			//if the distance is exactly 0, then the ellipsis
			//most likely are hiding the content, and marquee does not
			//need to animate
			if(this._marquee_distance === 0) {
				this.applyStyle('text-overflow', 'clip');
			} else {
				this.applyStyle('text-overflow', 'ellipsis');
			}
		}

		return this._marquee_distance;
	},

	/**
	* Returns duration based on `distance` and `this.marqueeSpeed`.
	*
	* @private
	*/
	_marquee_calcDuration: function (distance) {
		return distance / this.marqueeSpeed;
	},

	/**
	* Creates a marquee-able `div` inside of `this`.
	*
	* @private
	*/
	_marquee_createMarquee: function () {
		// Do not create marqueeText when there are children
		// because we don't know what should be the controlParent
		if (this.children && this.children.length > 0) return;
		var marqueeText = {name: 'marqueeText', kind: Control, classes: 'moon-marquee-text', allowHtml: this.allowHtml, content: this.content},
			highlightText = null,
			wrapper;

		if (this instanceof HighlightText) {
			dom.setInnerHtml(this.hasNode(), '');
			highlightText = {renderDelegate: this.renderDelegate, highlightClasses: this.highlightClasses, search: this.search};
			marqueeText = util.mixin(marqueeText, highlightText);
		}
		wrapper = this.createComponent({name: 'marqueeTextWrapper', kind: Control, classes: 'moon-marquee-text-wrapper', components: [marqueeText]});
		wrapper.renderInto(this.hasNode());
		return true;
	},

	/**
	* @private
	*/
	_marquee_addAnimationStyles: function (distance) {
		if (!this.$.marqueeText) return;
		var duration = this._marquee_calcDuration(distance);

		this.$.marqueeText.addClass('animate-marquee');

		if (options.accelerate) {
			dom.transform(this.$.marqueeText, {translateZ: 0});
			this.$.marqueeText.applyStyle('transition', 'transform ' + duration + 's linear');
			this.$.marqueeText.applyStyle('-webkit-transition', '-webkit-transform ' + duration + 's linear');
		} else {
			this.$.marqueeText.applyStyle('transition', 'left ' + duration + 's linear');
			this.$.marqueeText.applyStyle('-webkit-transition', 'left ' + duration + 's linear');
		}

		// Need this timeout for FF!
		setTimeout(this.bindSafely(function () {
			if (options.accelerate) {
				dom.transform(this.$.marqueeText, {translateX: this._marquee_adjustDistanceForRTL(distance) + 'px'});
			} else {
				this.$.marqueeText.applyStyle('left', this._marquee_adjustDistanceForRTL(distance) + 'px');
			}
		}), platform.firefox ? 100 : 16);
	},

	/**
	* @private
	*/
	_marquee_removeAnimationStyles: function () {
		if (!this.$.marqueeText) {
			return;
		}

		this.$.marqueeText.applyStyle('transition-duration', '0s');
		this.$.marqueeText.applyStyle('-webkit-transition-duration', '0s');

		// Need this timeout for FF!
		/**
		* @private
		*/
		setTimeout(this.bindSafely(function () {
			this.$.marqueeText.removeClass('animate-marquee');
			if (options.accelerate) {
				dom.transform(this.$.marqueeText, {translateX: null, translateZ: null});
			} else {
				this.$.marqueeText.applyStyle('left', null);
			}
		}), platform.firefox ? 100 : 0);
	},

	/**
	* Flips distance value for RTL support.
	*
	* @private
	*/
	_marquee_adjustDistanceForRTL: function (distance) {
		return this.rtl ? distance : distance * -1;
	},

	/**
	* @private
	*/
	_marquee_reset: function () {
		this._marquee_invalidateMetrics();
		if (this._marquee_puppetMaster) {
			this._marquee_puppetMaster.resetMarquee();
		}
	},

	/**
	* @private
	*/
	_marquee_centeredChanged: function () {
		this._marquee_detectAlignment();
	},

	/**
	* @private
	*/
	_marquee_wrapInsteadOfMarqueeChanged: function(old) {
		if (this.wrapInsteadOfMarquee) {
			this.addClass('allow-wrap');
			if (this.$.marqueeText) {
				this.$.marqueeTextWrapper.destroy();
				this.render();
			}
		}
		if (old && !this.wrapInsteadOfMarquee) {
			this.removeClass('allow-wrap');
			// FIXME: Performing creation here to workaround potential WebKit measuring issue
			// with scrollWidth (under-measures by 10px when marquee components are destroyed
			// when we switch wrapInsteadofMarquee from `false` to `true`, and back to `false`).
			this._marquee_createMarquee();
		}
	}
};

exports.Item = MarqueeItem;

/**
* {@link module:moonstone/Marquee~MarqueeText} is a basic text control that supports marquee animation.
* When `MarqueeText` objects are used inside a
* [MarqueeDecorator]{@link module:moonstone/Marquee~MarqueeDecorator}, the decorator synchronizes
* their start times; the user may start a marquee programmatically by calling
* [startMarquee()]{@link module:moonstone/Marquee~MarqueeSupport#startMarquee}.
*
* ```
* var
* 	kind = require('enyo/kind'),
* 	Header = require('moonstone/Header'),
* 	MarqueeSupport = require('moonstone/Marquee').Support,
* 	MarqueeText = require('moonstone/Marquee').Text;
*
* module.exports = kind({
* 	name: Header,
* 	mixins: [MarqueeSupport],
* 	marqueeSpeed: 100,
* 	components: [
* 		{kind: MarqueeText, content: 'longText+longText'},
* 		{kind: MarqueeText, content: 'longText'}
* 	],
* 	rendered: function () {
* 		this.startMarquee();
* 	}
* });
* ```
*
* To add the marquee feature to a kind, simply use the
* [MarqueeSupport]{@link module:moonstone/Marquee~MarqueeSupport} mixin:
*
* ```
* var
* 	kind = require('enyo/kind'),
* 	Button = require('enyo/Button'),
* 	MarqueeSupport = require('moonstone/Marquee').Support,
* 	MarqueeText = require('moonstone/Marquee').Text;
*
* module.exports = kind({
* 	name: 'MarqueeButton',
* 	kind: Button,
* 	mixins: [MarqueeSupport],
* 	components: [
* 		{kind: MarqueeText}
* 	],
* 	contentChanged: function () {
* 		this.$.marqueeText.setContent(this.content);
* 	}
* });
* ```
*
* @class MarqueeText
* @extends module:enyo/Control~Control
* @mixes module:moonstone/Marquee~MarqueeItem
* @ui
* @public
*/
exports.Text = kind(
	/** @lends module:moonstone/Marquee~MarqueeText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.MarqueeText',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [MarqueeItem],

	/**
	* @private
	* @lends module:moonstone/Marquee~MarqueeText.prototype
	*/
	published: {

		/**
		* The speed of the marquee animation, in pixels per second.
		*
		* @type {Number}
		* @default 60
		* @public
		*/
		marqueeSpeed: 60,

		/**
		* The duration in milliseconds that the marquee will pause at the end of the
		* animation, before resetting to the beginning.
		*
		* @type {Number}
		* @default 1000
		* @public
		*/
		marqueePause: 1000,

		/**
		* When `true`, marqueeing will not occur.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* When `true`, text is centered; otherwise, it is left-aligned.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		centered: false,

		/**
		* When `true`, element wraps instead of marqueeing.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		wrapInsteadOfMarquee: false
	}
});

/**
* {@link module:moonstone/Marquee~MarqueeDecorator} is a wrapper for {@link module:moonstone/Marquee~MarqueeText} objects.
*
* @class MarqueeDecorator
* @extends module:enyo/Control~Control
* @mixes module:moonstone/Marquee~MarqueeSupport
* @ui
* @public
*/
var MarqueeDecorator = kind(
	/** @lends module:moonstone/Marquee~MarqueeDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'moon.MarqueeDecorator',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [MarqueeSupport],

	/**
	* @private
	*/
	style: 'overflow: hidden;'
});

/**
* The {@link module:moonstone/Marquee~MarqueeDecorator} export
* @public
*/
exports.Decorator = MarqueeDecorator;

},{'../options':'moonstone/options','../HighlightText':'moonstone/HighlightText'}],'moonstone/RichText':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/RichText~RichText} kind.
* @module moonstone/RichText
*/

var
	kind = require('enyo/kind'),
	RichText = require('enyo/RichText');

/**
* {@link module:moonstone/RichText~RichText} is a Moonstone-styled text input field with support for
* rich text formatting such as bold, italics, and underlining, derived from
* {@link module:enyo/RichText~RichText}. Typically, a `moon.RichText` is placed inside a
* {@link module:moonstone/InputDecorator~InputDecorator}, which provides styling, e.g.:
*
* ```
* var InputDecorator = require('moonstone/InputDecorator'),
*     RichText = require('moonstone/RichText');
* ...
* {kind: InputDecorator, components: [
*	{kind: RichText, style: 'width: 240px;', onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class RichText
* @extends module:enyo/RichText~RichText
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/RichText~RichText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.RichText',

	/**
	* @private
	*/
	kind: RichText,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-richtext',

	/**
	* @private
	*/
	create: function () {
		RichText.prototype.create.apply(this, arguments);
		this.disabledChanged();
	},

	/**
	* Sets the focus on the RichText.
	*
	* @public
	*/
	focus: function () {
		RichText.prototype.focus.apply(this, arguments);
		var node = this.hasNode();
		// We move the cursor to the end, because in 5-way
		// mode there is no way (other than backspacing) for
		// the user to move the caret within the text field
		this.moveCursorToEnd();
		node.scrollTop = node.scrollHeight;
	},

	/**
	* Removes focus from the RichText.
	*
	* @public
	*/
	blur: function () {
		if (this.hasNode()) {
			this.node.blur();
		}
	},

	/**
	* Piggyback onto enyo.RichText blurHandler.
	*
	* @private
	* @method
	*/
	blurHandler: function () {
		RichText.prototype.blurHandler.apply(this, arguments);
		this.hasNode().scrollTop = 0;
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		RichText.prototype.disabledChanged.apply(this, arguments);
		if (this.disabled) {
			this.attributes.contenteditable = false;
		}
	},

	/**
	* @private
	*/
	left: function () {
		var sel = this.getSelection();
		if (sel.rangeCount) {
			var selRange = sel.getRangeAt(0);
			var testRange = selRange.cloneRange();

			testRange.selectNodeContents(this.node);
			testRange.setEnd(selRange.startContainer, selRange.startOffset);

			if (testRange.toString() === '') {
				return false;
			}
		}
		return true;
	},

	/**
	* @private
	*/
	right: function () {
		var sel = this.getSelection();
		if (sel.rangeCount) {
			var selRange = sel.getRangeAt(0);
			var testRange = selRange.cloneRange();

			testRange.selectNodeContents(this.node);
			testRange.setStart(selRange.endContainer, selRange.endOffset);

			if (testRange.toString() === '') {
				return false;
			}
		}
		return true;
	},

	/**
	* @private
	*/
	up: function (inEvent) {
		return this.left();
	},

	/**
	* @private
	*/
	down: function (inEvent) {
		return this.right();
	}
});

}],'moonstone/TextArea':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/TextArea~TextArea} kind.
* @module moonstone/TextArea
*/

var
	kind = require('enyo/kind'),
	TextArea = require('enyo/TextArea');

/**
* {@link module:moonstone/TextArea~TextArea} is a Moonstone-styled text input field, derived from
* {@link module:enyo/TextArea~TextArea}. Typically, a `moon.TextArea` is placed inside
* a {@link module:moonstone/InputDecorator~InputDecorator}, which provides styling, e.g.:
*
* ```
* {kind: 'moon.InputDecorator', components: [
*	{kind: 'moon.TextArea', onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class TextArea
* @extends module:enyo/TextArea~TextArea
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/TextArea~TextArea.prototype */ {

	/**
	* @private
	*/
	name: 'moon.TextArea',

	/**
	* @private
	*/
	kind: TextArea,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-textarea',

	/**
	* @private
	*/
	spotlightIgnoredKeys: [13, 16777221],	// 13==Enter, 16777221==KeypadEnter

	/**
	* @private
	*/
	handlers: {
		onblur: 'blurred'
	},

	/**
	* Sets the focus on the TextArea.
	*
	* @public
	*/
	focus: function () {
		TextArea.prototype.focus.apply(this, arguments);
		var node = this.hasNode();
		// We move the cursor to the end, because in 5-way
		// mode there is no way (other than backspacing) for
		// the user to move the caret within the text field
		node.selectionStart = this.value.length;
		node.scrollTop = node.scrollHeight;
	},

	/**
	* Removes focus from the TextArea.
	*
	* @public
	*/
	blur: function () {
		if (this.hasNode()) {
			this.node.blur();
		}
	},

	/**
	* @private
	*/
	blurred: function () {
		this.hasNode().scrollTop = 0;
	},

	/**
	* @private
	*/
	left: function (inEvent) {
		if (!this.hasNode() || this.node.selectionStart === 0) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	right: function (inEvent) {
		if (!this.hasNode() || this.node.selectionStart == this.node.value.length) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	up: function (inEvent) {
		return this.left(inEvent);
	},

	/**
	* @private
	*/
	down: function (inEvent) {
		return this.right(inEvent);
	}
});

}],'moonstone/Input':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Input~Input} kind.
* @module moonstone/Input
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Input = require('enyo/Input');

var
	Spotlight = require('spotlight');

/**
* {@link module:moonstone/Input~Input} is a Moonstone-styled input control, derived from
* {@link module:enyo/Input~Input}. Typically, a `moon.Input` is placed inside a
* {@link module:moonstone/InputDecorator~InputDecorator}, which provides styling, e.g.:
*
* ```
* {kind: 'moon.InputDecorator', components: [
*	{kind: 'moon.Input', placeholder: 'Enter some text...', onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class Input
* @extends module:enyo/Input~Input
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Input~Input.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Input',

	/**
	* @private
	*/
	kind: Input,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-input',

	/**
	* 13==Enter, 16777221==KeypadEnter
	*
	* @private
	*/
	spotlightIgnoredKeys: [13, 16777221],

	/**
	* @private
	* @lends module:moonstone/Input~Input.prototype
	*/
	published: {

		/**
		* When `true`, input blurs on Enter keypress (if focused).
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		dismissOnEnter: false
	},

	/**
	* @private
	*/
	handlers: {
		onkeyup    : 'onKeyUp',
		onblur     : 'onBlur',
		onfocus    : 'onFocus'
	},

	/**
	* Used only for [dismissOnEnter]{@link module:moonstone/Input~Input#dismissOnEnter} feature;
	* we cannot rely on `hasFocus()` in this case due to race condition.
	*
	* @private
	*/
	_bFocused: false,

	/**
	* @private
	*/
	onFocus: function () {
		var node = this.hasNode();

		if (this.dismissOnEnter) {
			var oThis = this;
			util.asyncMethod(this, function () {oThis._bFocused = true;});
		}
		// Force cursor to end of text during a generic focus event. Creating the input by compiling
		// a string of text with value="this.value" produces different initial caret position than
		// using node.setAttribute('value', this.value), which is what would happen any time after
		// the initial creation. The initial end-position of the caret is required to support
		// Virtual keyboards because without arrow-keys because normal left/right arrow navigation
		// in inputs is impossible, so the caret must be positioned at the end to allow for deletion
		// of the previous input. We are intentionally setting the value to force the cursor to the
		// end of the text. `selectionStart` is the obvious choice, but it is not supported in
		// certain types of fields (i.e. number, email).
		if (node) node.value = this.get('value');
	},

	/**
	* @private
	*/
	onBlur: function () {
		if (this.dismissOnEnter) {
			this._bFocused = false;
		}
	},

	/**
	* @private
	*/
	onKeyUp: function (oSender, oEvent) {
		if (this.dismissOnEnter) {
			if (oEvent.keyCode == 13 && this._bFocused) {
				this.blur();
				if (Spotlight.getPointerMode()) {
					Spotlight.unspot();
				}
			}
		}
	},

	/**
	* @private
	*/
	blur: function () {
		if (this.hasNode()) {
			this.node.blur();
		}
	},

	/**
	* @private
	*/
	left: function () {
		if (!this.hasNode() || this.node.selectionStart === 0) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	right: function () {
		if (!this.hasNode() || this.node.selectionStart == this.node.value.length) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	up: function () {
		return false;
	},

	/**
	* @private
	*/
	down: function () {
		return false;
	}
});

}],'moonstone/InputDecorator':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/InputDecorator~InputDecorator} kind.
* @module moonstone/InputDecorator
*/

var
	kind = require('enyo/kind'),
	ToolDecorator = require('enyo/ToolDecorator');

var
	Spotlight = require('spotlight');

var
	$L = require('../i18n'),
	Input = require('../Input'),
	RichText = require('../RichText'),
	TextArea = require('../TextArea');

/**
* {@link module:moonstone/InputDecorator~InputDecorator} is a control that provides input styling. Any controls
* in the InputDecorator will appear to be inside an area styled as an input. Usually,
* an InputDecorator surrounds a [moon.Input]{@link module:moonstone/Input~Input}:
*
* ```
* {kind: 'moon.InputDecorator', components: [
* 	{kind: 'moon.Input'}
* ]}
* ```
*
* Other controls, such as buttons, may be placed to the right or left of the
* input control, e.g.:
*
* ```
* {kind: 'moon.InputDecorator', components: [
* 	{kind: 'moon.IconButton', src: 'search.png'},
* 	{kind: 'moon.Input'},
* 	{kind: 'moon.IconButton', src: 'cancel.png'}
* ]}
* ```
*
* Note that the InputDecorator fits around the content inside it. If the
* decorator is sized, then its contents will likely need to be sized as well.
*
* ```
* {kind: 'moon.InputDecorator', style: 'width: 500px;', components: [
* 	{kind: 'moon.Input', style: 'width: 100%;'}
* ]}
* ```
*
* @class InputDecorator
* @extends module:enyo/ToolDecorator~ToolDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/InputDecorator~InputDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'moon.InputDecorator',

	/**
	* @private
	*/
	kind: ToolDecorator,

	/**
	* @private
	*/
	tag: 'label',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	spotlightDecorate: false,

	/**
	* @private
	*/
	handlers: {
		onDisabledChange    : 'disabledChangeHandler',
		onfocus             : 'focusHandler',
		onblur              : 'blurHandler',
		onSpotlightFocused  : 'spotlightFocusedHandler',
		onSpotlightSelect   : 'spotlightSelectHandler',
		onSpotlightBlur     : 'spotlightBlurHandler',
		onSpotlightLeft     : 'spotlightLeftHandler',
		onSpotlightRight    : 'spotlightRightHandler',
		onSpotlightUp       : 'spotlightUpHandler',
		onSpotlightDown     : 'spotlightDownHandler'
	},

	/**
	* @private
	*/
	_oInputControl: null,

	/**
	* Returns boolean indicating whether passed-in control is an input field.
	*
	* @private
	*/
	_isInput: function (oControl) {
		return (
			oControl instanceof Input		||
			oControl instanceof RichText	||
			oControl instanceof TextArea
		);
	},

	/**
	* Traverses tree of children to find input control.
	*
	* @private
	*/
	_findInputControl: function (oControl) {
		oControl = oControl || this;

		var oInputControl = null;

		for (var n=0; n<oControl.children.length; n++) {
			if (this._isInput(oControl.children[n])) {
				return oControl.children[n];
			}
			if ((oInputControl = this._findInputControl(oControl.children[n]))) {
				return oInputControl;
			}
		}
	},

	/**
	* @private
	*/
	create: function () {
		ToolDecorator.prototype.create.apply(this, arguments);
		this.updateFocus(false);
		this._oInputControl = this._findInputControl();
		if (this._oInputControl instanceof Input) {
			this.addClass('moon-divider-text moon-input-decorator');
		}
		if (this._oInputControl instanceof TextArea || this._oInputControl instanceof RichText) {
			this.addClass('moon-divider-text moon-textarea-decorator');
		}
	},

	/**
	* @private
	*/
	createComponent: function () {
		ToolDecorator.prototype.createComponent.apply(this, arguments);
		this._oInputControl = this._findInputControl();
	},

	/**
	* @private
	*/
	createComponents: function () {
		ToolDecorator.prototype.createComponents.apply(this, arguments);
		this._oInputControl = this._findInputControl();
	},

	/**
	* Updates styling based on focus state.
	*
	* @param {Boolean} bFocus - Whether to add/remove `moon-focused` class.
	* @public
	*/
	updateFocus: function (bFocus) {
		this.set('focused', bFocus);
		this.addRemoveClass('moon-focused', this.alwaysLooksFocused || this.focused);
	},

	/**
	* Retrieves the child input control.
	*
	* @returns {Object} A reference to the child input control.
	* @public
	*/
	getInputControl: function () {
		return this._oInputControl;
	},

	// Event handlers:
	/**************************************************/

	/**
	* @private
	*/
	focusHandler: function (oSender, oEvent) {
		if (Spotlight.getCurrent() != this) {
			// Force a spot here, even when we're in pointer mode,
			// to ensure that clicks inside us (e.g. to position
			// the cursor) don't cause Spotlight to unfreeze
			Spotlight.spot(this, {focusType: 'point'});
		}
		Spotlight.freeze();
		this.updateFocus(true);
	},

	/**
	* @private
	*/
	blurHandler: function () {
		Spotlight.unfreeze();
		this.updateFocus(false);
	},

	/**
	* @private
	*/
	disabledChangeHandler: function (oSender, oEvent) {
		this.addRemoveClass('moon-disabled', oEvent.originator.disabled);
	},

	// Spotlight Event handlers:
	/**************************************************/

	/**
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @private
	*/
	spotlightFocusedHandler: function () {
		this.set('spotted', true);
		this.bubble('onRequestScrollIntoView');
	},

	/**
	* @private
	*/
	spotlightSelectHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput) {
			if (oInput.hasFocus() && oEvent) {
				return true;
			} else {
				oInput.focus();
			}
			return false;
		}
	},

	/**
	* @private
	*/
	spotlightBlurHandler: function (oSender, oEvent) {
		this.set('spotted', false);
		this.blur();
	},

	/**
	* @private
	*/
	spotlightLeftHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.left) {
			if (oInput.left()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightLeft to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	/**
	* @private
	*/
	spotlightRightHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.right) {
			if (oInput.right()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightRight to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	/**
	* @private
	*/
	spotlightUpHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.up) {
			if (oInput.up()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightUp to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	/**
	* @private
	*/
	spotlightDownHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.down) {
			if (oInput.down()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightLeft to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	// Accessibility

	/**
	* spotted and focused can change in sequence but within the same cycle causing the TV to read
	* changes when spotting a different control. Enabling this will batch up those changes into
	* one DOM update thereby avoiding this behavior.
	*
	* @type {Boolean}
	* @default true
	* @private
	*/
	accessibilityDefer: true,

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['spotted', 'focused'], method: function () {
			var text = '',
				oInput = this.getInputControl();

			this.set('accessibilityLive', this.focused || !this.spotted ? null : 'polite');
			if (oInput) {
				if (oInput instanceof RichText && oInput.hasNode()) {
					text = (oInput.hasNode().innerText || oInput.getPlaceholder()) + ' ' + $L('edit box');
				} else if (oInput.type == 'password' && oInput.getValue()) {
					var character = (oInput.getValue().length > 1) ? $L('characters') : $L('character');
					text = oInput.getValue().length + ' ' + character + ' ' + $L('edit box');
				} else {
					text = (oInput.getValue() || oInput.getPlaceholder()) + ' ' + $L('edit box');
				}
			}
			this.set('accessibilityLabel', this.spotted && !this.focused ? text : null);
		}}
	]
});

},{'../i18n':'moonstone/i18n','../Input':'moonstone/Input','../RichText':'moonstone/RichText','../TextArea':'moonstone/TextArea'}],'moonstone/Header':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Header~Header} kind.
* @module moonstone/Header
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	ri = require('enyo/resolution'),
	util = require('enyo/utils'),
	Control = require('enyo/Control');

var
	Input = require('../Input'),
	InputDecorator = require('../InputDecorator'),
	StyleAnimator = require('../StyleAnimator'),
	Marquee = require('../Marquee'),
	MarqueeSupport = Marquee.Support,
	MarqueeText = Marquee.Text;

var _delayedMeasurementFinished;

/**
* Custom input event to allow apps to distinguish header inputs from regular inputs.
*
* @event module:moonstone/Header~Header#onInputHeaderInput
* @type {Object}
* @property {Object} originalEvent - The original event fired from the input. See
*	{@link module:enyo/Input~Input#oninput} for more event information.
* @public
*/

/**
* Custom input change event to allow apps to distinguish header input changes from
* regular input changes.
*
* @event module:moonstone/Header~Header#onInputHeaderChange
* @type {Object}
* @property {Object} originalEvent - The original event fired from the input. See
*	{@link module:enyo/Input~Input#onchange} for more event information.
* @public
*/

/**
* {@link module:moonstone/Header~Header} is a Moonstone-styled control with a large title and an area for
* additional controls.
*
* @class Header
* @extends module:enyo/Control~Control
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Header~Header.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Header',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-header',

	/**
	* @private
	* @lends module:moonstone/Header~Header.prototype
	*/
	published: {

		/**
		* Title of the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		title: '',

		/**
		* Text above the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleAbove: '',

		/**
		* Text below the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleBelow: '',

		/**
		* Sub-text below the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		subTitleBelow: '',

		/**
		* Size of the header, for styling purposes. Will be one of `'large'` (the default),
		* `'medium'`, or `'small'`. If `'large'`, the `moon-header` CSS class will be applied
		* to this header; if `'medium'`, the `moon-medium-header` class will be applied; if
		* `'small'`, the `moon-small-header` class will be applied.
		*
		* @type {String}
		* @default 'large'
		* @public
		*/
		type: 'large',

		/**
		* If `true`, the `moon-medium-header` CSS class will be applied to this header.
		*
		* Note that this property will be deprecated soon. For now, it is being left in
		* for backward compatibility. Until it is removed, `small: true` refers to the
		* historical header size, which is now equivalent to `type: 'medium'`.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		small: false,

		/**
		* URL(s) of background image(s).
		* This may be a string referring a single background image, or an array of strings
		* referring to multiple background images. To support multiple background-images at
		* multiple resolutions, this property can accept several formats:
		* 1) A string src,
		* 2) An array of string srcs,
		* 3) A [MultiRes Hash]{@link module:enyo/resolution#selectSrc~src}
		* 4) An array of [MultiRes Hashs]{@link module:enyo/resolution#selectSrc~src}
		*
		* @type {(String|String[]|module:enyo/resolution#selectSrc~src|module:enyo/resolution#selectSrc~src[])}
		* @default null
		* @public
		*/
		backgroundSrc: null,

		/**
		* Position of background image, defined as a string of the form
		* `'<vertical> <horizontal>'`, with a space separating the `<vertical>`
		* and `<horizontal>` values (e.g., `'top right'`). If no second property
		* is specified, the `<horizontal>` value will default to `'right'`. As
		* with [backgroundSrc]{@link module:moonstone/Header~Header#backgroundSrc}, an array of strings
		* may be supplied to position multiple background images. The order of items
		* should be the same as in `backgroundSrc`.
		*
		* @type {(String|String[])}
		* @default 'top right'
		* @public
		*/
		backgroundPosition: 'top right',

		/**
		* When using a full-bleed background image, set this property to `true` to indent
		* the header text/controls and remove the header lines.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		fullBleedBackground: false,

		/**
		* If `true`, title will be an input.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		inputMode: false,

		/**
		* When `true`, input will be blurred on Enter keypress, if it was previously
		* focused.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		dismissOnEnter: false,

		/**
		* Text to display when the input is empty.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		placeholder: '',

		/**
		* The value of the input.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		value: '',

		/**
		* When `true`, the title text will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercase: true,

		/**
		* @deprecated Replaced by [uppercase]{@link module:moonstone/Header~Header#uppercase}.
		*
		* Formerly defaulted to `true`, now defaults to `null` and will only have
		* an effect when explicitly set (for complete backward compatibility).
		*
		* @type {Boolean}
		* @default null
		* @public
		*/
		titleUpperCase: null
	},

	/**
	* @private
	*/
	mixins: [MarqueeSupport],

	/**
	* @private
	*/
	marqueeOnSpotlight: false,

	/**
	* @private
	*/
	marqueeOnHover: true,

	/**
	* @private
	*/
	marqueeOnRender: true,

	/**
	* @private
	*/
	marqueeOnRenderDelay: 10000,

	/**
	* Described in .moon-header class
	*
	* @private
	*/
	standardHeight: 360,

	/**
	* @private
	*/
	handlers: {
		oninput: 'handleInput',
		onchange: 'handleChange',
		onRequestCreateListActions: 'handleRequestCreateComponents',
		onListActionOpenChanged: 'handleListActionOpenChanged'
	},

	/**
	* @private
	*/
	events: {

		/**
		* Custom input event to allow apps to distinguish header inputs from regular inputs.
		*/
		onInputHeaderInput: '',

		/**
		* Custom input change event to allow apps to distinguish header input changes from
		* regular input changes.
		*/
		onInputHeaderChange: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'titleAbove', kind: Control, classes: 'moon-super-header-text moon-header-title-above'},
		{name: 'titleWrapper', kind: Control, classes: 'moon-header-title-wrapper', components: [
			{name: 'title', kind: MarqueeText, classes: 'moon-header-text moon-header-title', canGenerate: false},
			{name: 'inputDecorator', kind: InputDecorator, classes: 'moon-input-header-input-decorator',canGenerate: false, components: [
				{name: 'titleInput', kind: Input, classes: 'moon-header-text moon-header-title'}
			]}
		]},
		{name: 'titleBelow', kind: MarqueeText, classes: 'moon-sub-header-text moon-header-title-below'},
		{name: 'subTitleBelow', kind: MarqueeText, classes: 'moon-sub-header-text moon-header-sub-title-below'},
		{name: 'client', kind: Control, classes: 'moon-hspacing moon-header-client'},
		{name: 'animator', kind: StyleAnimator, onComplete: 'animationComplete'}
	],

	/**
	* @private
	*/
	bindings: [
		{from: '.value', to: '.$.titleInput.value', oneWay: false},
		{from: '.dismissOnEnter', to: '.$.titleInput.dismissOnEnter'}
	],

	/**
	* @private
	*/
	create: function () {
		this.inherited(arguments);

		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// the titleUpperCase property is fully deprecated and removed. The legacy
		// property takes precedence if it exists.
		if (this.titleUpperCase !== null) this.uppercase = this.titleUpperCase;

		// Note: This smallchanged() line will be deprecated soon. For backward compatiblity, I leave it for a
		// while.
		this.smallChanged();
		this.typeChanged();
		this.titleChanged();
		this.titleAboveChanged();
		this.titleBelowChanged();
		this.subTitleBelowChanged();
		this.allowHtmlChanged();
		this.backgroundSrcChanged();
		this.backgroundPositionChanged();
		this.inputModeChanged();
		this.placeholderChanged();
		this.fullBleedBackgroundChanged();
	},

	rendered: function() {
		this.inherited(arguments);
		// At the first render, the fonts may not have finished loading yet. We delay the first
		// time using an async method, and set a flag so we know the deed is done at subsequent calls.
		if (_delayedMeasurementFinished) {
			this.adjustTitleWidth();
		} else {
			util.asyncMethod(this, function () {
				this.adjustTitleWidth();
				_delayedMeasurementFinished = true;
			});
		}
	},

	/**
	* @private
	*/
	allowHtmlChanged: function () {
		this.$.title.setAllowHtml( this.get('type') == 'small' ? true : this.allowHtml );
		this.$.titleBelow.setAllowHtml(this.allowHtml);
		this.$.subTitleBelow.setAllowHtml(this.allowHtml);
	},

	/**
	* @private
	*/
	backgroundSrcChanged: function () {
		var bgs = (util.isArray(this.backgroundSrc)) ? this.backgroundSrc : [this.backgroundSrc];
		bgs = util.map(bgs, this.bindSafely(function (inBackgroundSource) {
				return inBackgroundSource ? 'url(' + ri.selectSrc(inBackgroundSource) + ')' : null;
			}));
		this.applyStyle('background-image', (bgs.length) ? bgs.join(', ') : null);
	},

	/**
	* @private
	*/
	backgroundPositionChanged: function () {
		var bgp = this.backgroundPosition;
		if (util.isArray(bgp)) {
			bgp = (bgp.length) ? bgp.join(', ') : null;
		}
		// If `this.backgroundPosition` is set explicitly to inherit or initial, apply that
		// instead of assuming a position.
		if (bgp == 'inherit' || bgp == 'initial') {
			this.applyStyle('background-position', bgp);
			return;
		}
		var posArray = bgp && bgp.split(' ') || [],
			posStr = (posArray.length === 0) ? 'top right'
					: (posArray.length === 1) ? posArray[0] + ' right' : bgp;
		this.applyStyle('background-position', posStr);
	},

	/**
	* @private
	*/
	fullBleedBackgroundChanged: function () {
		this.addRemoveClass('full-bleed', this.fullBleedBackground);
	},

	/**
	* @private
	*/
	handleRequestCreateComponents: function (inSender, inEvent) {
		this.controlParent = null;
		this.createComponents(inEvent.components, {owner: inEvent.originator});
		this.discoverControlParent();
	},

	/**
	* Collapses the drawer, hiding its contents.
	*
	* @public
	*/
	collapseToSmall: function () {
		if (this.collapsed) {
			return;
		}

		var myStyle = dom.getComputedStyle(this.hasNode());
		var titleWrapperStyle = dom.getComputedStyle(this.$.titleWrapper.hasNode());
		var titleBelowStyle = dom.getComputedStyle(this.$.titleBelow.hasNode());
		var subTitleBelowStyle = dom.getComputedStyle(this.$.subTitleBelow.hasNode());
		var titleAboveStyle = dom.getComputedStyle(this.$.titleAbove.hasNode());

		// TODO - animator should track initial positions so we don't have to store these if we
		// want to reverse the animation
		this.smallAnimProps = {
			'height': myStyle['height']
		};
		this.$.titleWrapper.smallAnimProps = {
			'padding-left': titleWrapperStyle['padding-left'],
			'top': titleWrapperStyle['top']
		};
		this.$.title.smallAnimProps = {};
		this.$.titleAbove.smallAnimProps = {
			'height': titleAboveStyle['height'],
			'opacity': titleAboveStyle['opacity']
		};
		this.$.titleBelow.smallAnimProps = {
			'top': titleBelowStyle['top']
		};
		this.$.subTitleBelow.smallAnimProps = {
			'top': subTitleBelowStyle['top']
		};

		this.$.animator.newAnimation({
			name: 'collapseToSmall',
			duration: 200,
			timingFunction: 'linear',
			keyframes: {
				0: [{
					control: this,
					properties: {
						'height': 'current'
					}
				}, {
					control: this.$.titleWrapper,
					properties: {
						'padding-left': 'current',
						'top': 'current'
					}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': 'current',
						'opacity': 'current',
						'margin-top': 'current'
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {
						'top': 'current'
					}
				}, {
					control: this.$.subTitleBelow,
					properties: {
						'top': 'current'
					}
				}],
				70: [],
				100: [{
					control: this,
					properties: {
						'height': dom.unit(ri.scale(260), 'rem')
					}
				}, {
					control: this.$.titleWrapper,
					properties: {}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': 0,
						'opacity': 0,
						'margin-top': 0
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {}
				}, {
					control: this.$.subTitleBelow,
					properties: {}
				}]

			}
		});
		this.$.animator.play('collapseToSmall');
		this.collapsed = true;
	},

	/**
	* Expands the drawer, showing its contents.
	*
	* @public
	*/
	expandToLarge: function () {
		if (!this.collapsed) {
			return;
		}

		this.$.animator.newAnimation({
			name: 'expandToLarge',
			duration: 200,
			timingFunction: 'linear',
			keyframes: {
				0: [{
					control: this,
					properties: {
						'height': 'current'
					}
				}, {
					control: this.$.titleWrapper,
					properties: {
						'padding-left': 'current',
						'top': 'current'
					}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': 'current',
						'opacity': 'current',
						'margin-top': 'current'
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {
						'top': 'current'
					}
				}, {
					control: this.$.subTitleBelow,
					properties: {
						'top': 'current'
					}
				}],
				30: [],
				100: [{
					control: this,
					properties: {
						'height': this.smallAnimProps.height
					}
				}, {
					control: this.$.titleWrapper,
					properties: {
						'padding-left': this.$.titleWrapper.smallAnimProps['padding-left'],
						'top': this.$.titleWrapper.smallAnimProps['top']
					}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': this.$.titleAbove.smallAnimProps['height'],
						'opacity': this.$.titleAbove.smallAnimProps['opacity'],
						'margin-top': this.$.titleAbove.smallAnimProps['margin-top']
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {
						'top': this.$.titleBelow.smallAnimProps['top']
					}
				}, {
					control: this.$.subTitleBelow,
					properties: {
						'top': this.$.subTitleBelow.smallAnimProps['top']
					}
				}]
			}
		});
		this.$.animator.play('expandToLarge');
		this.collapsed = false;
	},

	/**
	* @private
	*/
	typeChanged: function () {
		this.addRemoveClass('moon-large-header', this.get('type') == 'large');
		this.addRemoveClass('moon-medium-header', this.get('type') == 'medium');
		this.addRemoveClass('moon-small-header', this.get('type') == 'small');
		this.contentChanged();
		if (this.generated) this.adjustTitleWidth();
	},

	/**
	* @private
	*/
	valueChanged: function () {
		this.$.titleInput.detectTextDirectionality((this.$.titleInput.value || this.$.titleInput.value === 0 || this.$.titleInput.value === '0') ? this.$.titleInput.value : this.$.titleInput.get('placeholder'));
	},

	/**
	* @private
	*/
	adjustTitleWidth: function() {
		var type = this.get('type'),
			// Measure client area's width + 40px of spacing
			client = this.$.client ? this.$.client.hasNode() : null,
			clientWidth = client ? client.offsetWidth : null,
			clientStyle = client ? (client.currentStyle || dom.getComputedStyle(client)) : null,		// Originally by YuC @ http://stackoverflow.com/questions/349257/detecting-true-border-padding-and-margin-from-javascript
			clientMargin = client ? (parseInt(clientStyle.marginLeft, 10) + parseInt(clientStyle.marginRight, 10)) : null,
			clientSpaceSmall = dom.unit(clientWidth + clientMargin + ri.scale(36), 'rem'),
			clientSpace = dom.unit(clientWidth + ri.scale(36), 'rem'),
			rtl = this.rtl;

		if (client) {
			// Set the margin on the correct side for the correct control, otherwise set it to nothing
			this.$.title.applyStyle('margin-right', (type == 'small' && !rtl && clientWidth) ? clientSpaceSmall : null);
			this.$.title.applyStyle('margin-left', (type == 'small' && rtl && clientWidth) ? clientSpaceSmall : null);

			this.$.titleBelow.applyStyle('margin-right', (type == 'medium' && !rtl && clientWidth) ? clientSpace : null);
			this.$.titleBelow.applyStyle('margin-left', (type == 'medium' && rtl && clientWidth) ? clientSpace : null);

			this.$.subTitleBelow.applyStyle('margin-right', (type == 'medium' && !rtl && clientWidth) ? clientSpace : null);
			this.$.subTitleBelow.applyStyle('margin-left', (type == 'medium' && rtl && clientWidth) ? clientSpace : null);
		}
	},

	/**
	* Note that this method will be deprecated soon. For now, it is being left in for
	* backward compatibility.
	*
	* @private
	*/
	smallChanged: function () {
		this.addRemoveClass('moon-medium-header', this.get('small'));
	},

	/**
	* @private
	*/
	contentChanged: function () {
		var title = this.get('uppercase')
					? util.toUpperCase(this.get('title') || this.get('content'))
					: (this.get('title') || this.get('content')),
			subtitle = this.get('titleBelow');
		if ((this.get('type') == 'small') && subtitle) {
			this.$.title.set('allowHtml', true);
			if (!this.allowHtml) {
				title = dom.escape(title);
				subtitle = dom.escape(subtitle);
			}
			this.$.title.set('content', Control.prototype.rtl && !util.isRtl(subtitle + title) ?
				'<span class="moon-sub-header-text moon-header-sub-title">' + subtitle + '</span>' + '   ' + title :
				title + '   ' + '<span class="moon-sub-header-text moon-header-sub-title">' + subtitle + '</span>');
		} else {
			this.$.title.set('allowHtml', this.get('allowHtml') );
			this.$.title.set('content', title);
		}
		this.placeholderChanged();
	},

	/**
	* For backward-compatibility with original API.
	*
	* @private
	*/
	titleChanged: function () {
		this.contentChanged();
	},

	/**
	* @private
	*/
	placeholderChanged: function () {
		// For backward-compatibility with original API
		this.$.titleInput.set('placeholder', this.getTitleUpperCase()
				? util.toUpperCase(this.placeholder || this.title || this.content)
				: (this.placeholder || this.title || this.content) );
		this.valueChanged();
	},

	/**
	* @private
	*/
	uppercaseChanged: function () {
		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// titleUpperCase is fully deprecated and removed.
		if (this.titleUpperCase != this.uppercase) this.titleUpperCase = this.uppercase;
		this.titleChanged();
	},

	/**
	* @private
	*/
	titleUpperCaseChanged: function () {
		if (this.uppercase != this.titleUpperCase) this.uppercase = this.titleUpperCase;
		this.uppercaseChanged();
	},

	/**
	* @private
	*/
	titleAboveChanged: function () {
		this.$.titleAbove.addRemoveClass('no-border', this.titleAbove === '');
		this.$.titleAbove.set('content', this.titleAbove);
	},

	/**
	* @private
	*/
	titleBelowChanged: function () {
		this.$.titleBelow.set('content', this.titleBelow || '');
		this.contentChanged();
	},

	/**
	* @private
	*/
	subTitleBelowChanged: function () {
		this.$.subTitleBelow.set('content', this.subTitleBelow || '');
	},

	/**
	* Placeholder
	*
	* @private
	*/
	// animationComplete: function (inSender, inEvent) {
		// Do something?
	// },

	/**
	* @private
	*/
	inputModeChanged: function () {
		this.$.title.canGenerate = !this.inputMode;
		this.$.title.setShowing(!this.inputMode);
		this.$.inputDecorator.canGenerate = this.inputMode;
		this.$.inputDecorator.setShowing(this.inputMode);

		if (!this.inputMode) {
			if (!this.$.title.hasNode()) {
				this.$.title.render();
			}
			// Reset marquees when coming back to static text
			if (this.generated) {
				this.stopMarquee();
				this.startMarquee();
			}
		}
		if (this.inputMode && !this.$.inputDecorator.hasNode()) {
			this.$.inputDecorator.render();
		}
		this.addRemoveClass('moon-input-header', this.inputMode);
	},

	/**
	* Handles `input` event, firing custom
	* [onInputHeaderInput]{@link module:moonstone/Header~Header#onInputHeaderInput} event.
	*
	* @fires module:moonstone/Header~Header#onInputHeaderInput
	* @private
	*/
	handleInput: function (inSender, inEvent) {
		this.doInputHeaderInput({originalEvent: util.clone(inEvent, true)});
	},

	/**
	* Handles `change` event, firing custom
	* [onInputHeaderChange]{@link module:moonstone/Header~Header#onInputHeaderChange} event.
	*
	* @fires module:moonstone/Header~Header#onInputHeaderChange
	* @private
	*/
	handleChange: function (inSender, inEvent) {
		this.doInputHeaderChange({originalEvent: util.clone(inEvent, true)});
	},


	/**
	* Enlarges listActionDrawer's height to large type's height.
	*
	* @private
	*/
	handleListActionOpenChanged: function (inSender, inEvent) {
		if (!inEvent.open) {
			return;
		}
		inEvent.originator.beforeOpenDrawer(this.standardHeight, this.get('type'));
	}
});

},{'../Input':'moonstone/Input','../InputDecorator':'moonstone/InputDecorator','../StyleAnimator':'moonstone/StyleAnimator','../Marquee':'moonstone/Marquee'}],'moonstone/Panel':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Panel~Panel} kind.
* @module moonstone/Panel
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	dom = require('enyo/dom'),
	Control = require('enyo/Control');

var
	FittableLayout = require('layout/FittableLayout'),
	FittableRows = require('layout/FittableRows'),
	FittableRowsLayout = FittableLayout.Rows;

var
	Spotlight = require('spotlight');

var
	options = require('../options'),
	StyleAnimator = require('../StyleAnimator'),
	Header = require('../Header'),
	Marquee = require('../Marquee'),
	MarqueeSupport = Marquee.Support,
	MarqueeItem = Marquee.Item;

/**
* Fires when this [panel]{@link module:moonstone/Panel~Panel} has completed its pre-arrangement transition.
* No additional data is passed with this event.
*
* @event moon.Panel#onPreTransitionComplete
* @type {Object}
* @public
*/

/**
* Fires when this [panel]{@link module:moonstone/Panel~Panel} has completed its post-arrangement transition.
* No additional data is passed with this event.
*
* @event moon.Panel#onPostTransitionComplete
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/Panel~Panel} is the default kind for controls created inside a
* [moonstone/Panels]{@link module:moonstone/Panels~Panels} container. A `moonstone/Panels`
* will typically contain several instances of `moonstone/Panel`.
*
* The built-in features include an embedded {@link module:moonstone/Header~Header} and an
* {@link module:layout/FittableRows~FittableRows} layout for the main body content.
*
* @class Panel
* @extends module:enyo/Control~Control
* @ui
* @public
*/

module.exports = kind(
	/** @lends module:moonstone/Panel~Panel.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Panel',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	* @lends module:moonstone/Panel~Panel.prototype
	*/
	published: {
		/**
		* Facade for the [title]{@link module:moonstone/Header~Header#title} property of the embedded
		* {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		title: '',

		/**
		* Facade for the [titleAbove]{@link module:moonstone/Header~Header#titleAbove} property of the
		* embedded {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleAbove: '',

		/**
		* Facade for the [titleBelow]{@link module:moonstone/Header~Header#titleBelow} property of the
		* embedded {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleBelow: '',

		/**
		* Facade for the [subTitleBelow]{@link module:moonstone/Header~Header#subTitleBelow} property
		* of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		subTitleBelow: '',

		/**
		* When `true`, the header's [titleAbove]{@link module:moonstone/Header~Header#titleAbove} property
		* is automatically populated with the panel index.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		autoNumber: true,

		/**
		* Facade for the [type]{@link module:moonstone/Header~Header#type} property of the embedded
		* {@link module:moonstone/Header~Header}.
		* Valid values are: `'large'`, `'small'`, and `'medium'`.
		*
		* @type {String}
		* @default 'large'
		* @public
		*/
		headerType: 'large',

		/**
		* Facade for the [small]{@link module:moonstone/Header~Header#small} property of the embedded
		* {@link module:moonstone/Header~Header}. Note that this property will be deprecated soon. Until
		* it is removed, `'smallHeader: true'` refers to the historical header size,
		* which is now equivalent to `type: 'medium'`.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		smallHeader: false,

		/**
		* If `true`, the header collapses when the panel body is scrolled down.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		collapsingHeader: false,

		/**
		* Facade for the [allowHtml]{@link module:enyo/Control~Control#allowHtml} property of the
		* embedded {@link module:moonstone/Header~Header}.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		allowHtmlHeader: false,

		/**
		* Facade for the [backgroundSrc]{@link module:moonstone/Header~Header#backgroundSrc} property
		* of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {(String|String[]|module:enyo/resolution#selectSrc~src|module:enyo/resolution#selectSrc~src[])}
		* @default null
		* @public
		*/
		headerBackgroundSrc: null,

		/**
		* Facade for the [backgroundPosition]{@link module:moonstone/Header~Header#backgroundPosition}
		* property of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {(String|String[])}
		* @default 'top right'
		* @public
		*/
		headerBackgroundPosition: 'top right',

		/**
		* An object containing additional settings for the {@link module:moonstone/Header~Header}. Any
		* values specified here will be mixed into the header definition.
		*
		* @type {Object}
		* @default null
		* @public
		*/
		headerOptions: null,

		/**
		* Facade for the [titleUpperCase]{@link module:moonstone/Header~Header#titleUpperCase} property
		* of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		titleUpperCase: true
	},

	/**
	* @private
	*/
	events: {
		/**
		* {@link module:moonstone/Panel~Panel#onPreTransitionComplete}
		*/
		onPreTransitionComplete: '',
		/**
		* {@link module:moonstone/Panel~Panel#onPostTransitionComplete}
		*/
		onPostTransitionComplete: ''
	},

	/**
	* @private
	*/
	handlers: {
		onScroll: 'scroll'
	},

	/**
	* @private
	*/
	spotlight: 'container',

	/**
	* @private
	*/
	classes: 'moon-panel',

	/**
	* @private
	*/
	layoutKind: FittableRowsLayout,

	/**
	* @private
	*/
	headerOption: null, //* Deprecated

	/**
	* @private
	*/
	preventTransform: !options.accelerate,

	/**
	* @private
	*/
	preventAccelerate: !options.accelerate,

	/**
	* @private
	*/
	panelTools : [
		{name: 'breadcrumb', kind: Control, ontap: 'handleBreadcrumbTap', classes: 'moon-panel-breadcrumb', components: [
			{name: 'breadcrumbViewport', kind: Control, classes: 'moon-panel-breadcrumb-viewport', components: [
				{name: 'breadcrumbBackground', kind: Control, classes: 'moon-panel-small-header-wrapper', components: [
					{name: 'breadcrumbTitleAbove', kind: Control, classes: 'moon-super-header-text moon-panel-small-header-title-above'},
					{name: 'breadcrumbText', kind: Control, mixins: [MarqueeSupport, MarqueeItem], classes: 'moon-sub-header-text moon-panel-small-header'}
				]}
			]}
		]},
		{name: 'viewport', kind: Control, classes: 'moon-panel-viewport', onwebkitAnimationEnd: 'animationComplete', onanimationend: 'animationComplete', components: [
			{name: 'contentWrapper', kind: FittableRows, classes: 'moon-panel-content-wrapper', components: [
				/* header will be created here programmatically in createTools after mixing-in headerOptions */
				{name: 'panelBody', kind: FittableRows, fit: true, classes: 'moon-panel-body'}
			]}
		]},

		{name: 'animator', kind: StyleAnimator, onComplete: 'animationComplete'},
		{name: 'spotlightDummy', kind: Control, spotlight: false, style: 'width:0;height:0;'}
	],

	/**
	* @private
	*/
	headerConfig : {name: 'header', kind: Header, onComplete: 'headerAnimationComplete', isChrome: true},

	/**
	* @private
	*/
	bindings: [
		{from: '.title', to: '.$.header.title'},
		{from: '.title', to: '.$.breadcrumbText.content'},
		{from: '.titleAbove', to: '.$.header.titleAbove'},
		{from: '.titleAbove', to: '.$.breadcrumbTitleAbove.content'},
		{from: '.titleBelow', to: '.$.header.titleBelow'},
		{from: '.subTitleBelow', to: '.$.header.subTitleBelow'},
		{from: '.allowHtmlHeader', to: '.$.header.allowHtml'},
		{from: '.allowHtmlHeader', to: '.$.breadcrumbText.allowHtml'},
		{from: '.headerBackgroundSrc', to: '.$.header.backgroundSrc'},
		{from: '.headerBackgroundPosition', to: '.$.header.backgroundPosition'},
		{from: '.titleUpperCase', to: '.$.header.titleUpperCase'},
		{from: '.headerType', to: '.$.header.type', oneWay: false}
	],

	/**
	* @private
	*/
	headerComponents: [],

	/**
	* @private
	*/
	isBreadcrumb: false,

	/**
	* @private
	*/
	isOffscreen: false,

	/**
	* @private
	*/
	isHeaderCollapsed: false,

	/**
	* @private
	*/
	shrinking: false,

	/**
	* @private
	*/
	growing: false,

	/**
	* Set by {@link module:moonstone/BreadcrumbArranger~BreadcrumbArranger} during {@link module:moonstone/BreadcrumbArranger~BreadcrumbArranger#size}
	* based on the value of {@link module:moonstone/Panels~Panels#animate}.
	*
	* @private
	*/
	animate: !options.accelerate,

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		// FIXME: Need to determine whether headerComponents was passed on the instance or kind to get the ownership correct
		if (this.headerComponents) {
			var owner = this.hasOwnProperty('headerComponents') ? this.getInstanceOwner() : this;
			this.$.header.createComponents(this.headerComponents, {owner: owner});
		}
		this.autoNumberChanged();
		// Note: This line will be deprecated soon. For backward compatiblity, I leave it for a while.
		this.smallHeaderChanged();
		this.headerTypeChanged();
		this.animateChanged();
	},

	/**
	* @private
	*/
	initComponents: function () {
		this.createTools();
		this.controlParentName = 'panelBody';
		this.discoverControlParent();
		Control.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	createTools: function () {
		// Create everything but the header
		this.createChrome(this.panelTools);
		// Special-handling for header, which can have its options modified by the instance
		var hc = util.clone(this.headerConfig || {});
		hc.addBefore = this.$.panelBody;
		util.mixin(hc, this.headerOptions || this.headerOption);
		this.$.contentWrapper.createComponent(hc, {owner:this});
	},

	/**
	* On reflow, updates `this.$.contentWrapper` bounds.
	* @private
	*/
	reflow: function () {
		Control.prototype.reflow.apply(this, arguments);
		this.getInitAnimationValues();
		this.updateViewportSize();
		this.shrinkAsNeeded();
	},

	/**
	* Updates `this.$.contentWrapper` to have the height/width of `this`.
	* @private
	*/
	updateViewportSize: function () {
		var node = this.hasNode();

		if (!node || this.isBreadcrumb) {
			return;
		}

		this.$.viewport.applyStyle('height', dom.unit(this.initialHeight, 'rem'));
		this.$.viewport.applyStyle('width', dom.unit(this.initialWidth, 'rem'));
		this.$.contentWrapper.applyStyle('height', dom.unit(this.initialHeight, 'rem'));
		this.$.contentWrapper.applyStyle('width', dom.unit(this.initialWidth, 'rem'));
	},

	/**
	* Forcibly applies layout kind changes to `this.$.panelBody`.
	* @private
	*/
	layoutKindChanged: function () {
		this.$.panelBody.setLayoutKind(this.layoutKind);
	},

	/**
	* @private
	*/
	updateSpotability: function () {
		if (this.isOffscreen) {
			this.spotlightDisabled = true;
			this.removeSpottableProps();
			this.removeSpottableBreadcrumbProps();
		} else {
			if (this.isBreadcrumb) {
				this.spotlightDisabled = true;
				this.addSpottableBreadcrumbProps();
			}
			else {
				this.spotlightDisabled = false;
				this.$.spotlightDummy.spotlight = false;
				if (!Spotlight.isSpottable(this)) {
					// make dummy div spottable if there is no spottable child
					this.$.spotlightDummy.spotlight = true;
				}
			}
		}
	},

	/**
	* @private
	*/
	handleBreadcrumbTap: function (sender, event) {
		event.breadcrumbTap = true;
	},

	/**
	* Note: `smallHeader` will be deprecated soon.
	* @private
	*/
	scroll: function (sender, event) {
		if (this.collapsingHeader && ((this.headerType === 'large') || !this.smallHeader)) {
			if (event.originator.y < 0) {
				this.collapseHeader();
			} else {
				this.expandHeader();
			}
		}
	},

	/**
	* @private
	*/
	animateChanged: function () {
		this.addRemoveClass('moon-composite', this.animate);
	},

	/**
	* Note: This method will be deprecated soon.
	* @private
	*/
	smallHeaderChanged: function () {
		this.$.header.setSmall(this.smallHeader);
		if (this.generated) {
			this.$.contentWrapper.resize();
		}
	},

	/**
	* @private
	*/
	headerTypeChanged: function () {
		this.$.header.setType(this.headerType);
		if (this.generated) {
			this.$.contentWrapper.resize();
		}
	},

	/**
	* @private
	*/
	collapseHeader: function () {
		if (!this.isHeaderCollapsed) {
			this.$.header.collapseToSmall();
			this.isHeaderCollapsed = true;
		}
	},

	/**
	* @private
	*/
	expandHeader: function () {
		if (this.isHeaderCollapsed) {
			this.$.header.expandToLarge();
			this.isHeaderCollapsed = false;
		}
	},

	/**
	* Updates [titleAbove]{@link module:moonstone/Panel~Panel#titleAbove} when
	* [autoNumber]{@link module:moonstone/Panel~Panel#autoNumber} changes.
	* @private
	*/
	autoNumberChanged: function () {
		if (this.getAutoNumber() === true && this.container) {
			// This gets the index regardless of whether the panel is client or chome
			var n = this.parent.indexOfChild(this) + 1;
			n = ((n < 10) ? '0' : '') + n;
			this.setTitleAbove(n);
		}
	},

	/**
	* @private
	*/
	generateAutoNumber: function () {
		var adjustedIndex = this.indexInContainer() + 1;
		return (adjustedIndex < 10) ? '0'+ adjustedIndex : adjustedIndex;
	},

	/**
	* @private
	*/
	addSpottableBreadcrumbProps: function () {
		this.$.breadcrumbBackground.set('spotlight', true);
	},

	/**
	* @private
	*/
	removeSpottableBreadcrumbProps: function () {
		this.$.breadcrumbBackground.set('spotlight', false);
		this.$.breadcrumbBackground.removeClass('spotlight');
	},

	/**
	* @private
	*/
	removeSpottableProps: function () {
		this.$.breadcrumbBackground.set('spotlight', false);
	},

	/**
	* @private
	*/
	shrinkAsNeeded: function () {
		if (this.needsToShrink) {
			this.shrink();
			this.needsToShrink = false;
		}
	},

	/**
	* @private
	*/
	enableMarquees: function () {
		this.$.breadcrumbText.enableMarquee();
		this.$.header.enableMarquee();
	},

	/**
	* @private
	*/
	disableMarquees: function () {
		this.$.breadcrumbText.disableMarquee();
		this.$.header.disableMarquee();
	},

	/**
	* @private
	*/
	startMarqueeAsNeeded: function (info) {
		var onscreen = !info.offscreen;
		if (onscreen) {
			if (this.isBreadcrumb) {
				this.$.breadcrumbText.enableMarquee();
				this.$.breadcrumbText.startMarquee();
			}
			else {
				this.$.header.enableMarquee();
				this.$.header.startMarquee();
			}
		}
	},

	/**
	* @private
	*/
	getHeader: function () {
		return this.$.header;
	},

	/**
	* Called directly by {@link module:moonstone/Panels~Panels}.
	* @private
	*/
	initPanel: function (info) {
		this.set('isBreadcrumb', info.breadcrumb);
		this.set('isOffscreen', info.offscreen);
		this.updateSpotability();
		if (this.isBreadcrumb) {
			this.needsToShrink = true;
		}
		this.disableMarquees();
		this.startMarqueeAsNeeded(info);
	},

	/**
	* Called directly by {@link module:moonstone/Panels~Panels}.
	* @private
	*/
	preTransition: function (info) {
		this.disableMarquees();
		this.addClass('transitioning');
		if (!this.shrinking && info.breadcrumb && (!this.isBreadcrumb || this.growing)) {
			this.shrinkAnimation();
			return true;
		}

		return false;
	},

	/**
	* Called directly by {@link module:moonstone/Panels~Panels}.
	* @private
	*/
	postTransition: function (info) {
		this.removeClass('transitioning');

		if (!this.growing && !info.breadcrumb && (this.isBreadcrumb || this.shrinking) && this.hasClass('shrunk')) {
            //only grow if it has been shrunk before
			this.growAnimation();
			return true;
		}

		return false;
	},

	/**
	* Called directly by {@link module:moonstone/Panels~Panels}.
	* @private
	*/
	updatePanel: function (info) {
		if (!info.animate) {
			this.disableMarquees();
		}

        if (this.isBreadcrumb && !info.breadcrumb) {
            this.grow();
        }

        if (!this.isBreadcrumb && info.breadcrumb) {
            this.shrink();
        }

		this.set('isBreadcrumb', info.breadcrumb);
		this.set('isOffscreen', info.offscreen);
		this.updateSpotability();
		this.startMarqueeAsNeeded(info);
	},

	/**
	* Called directly on the panel by {@link module:moonstone/Panels~Panels} when the panel has completed a
	* transition. You may override this function in a panel subkind to perform
	* post-transition work (e.g., loading data for the panel).
	*
	* @param {Object} info - Information from the [Panels]{@link module:moonstone/Panels~Panels} component.
	* Additional information may be supplied by the arranger, such as breadcrumb and
	* offscreen status.
	* @param {Number} info.from - The index the parent Panels was moving from for this transition.
	* @param {Number} info.to - The index the parent Panels was moving to for this transition.
	* @param {Number} info.index - The current index of this [panel]{@link module:moonstone/Panel~Panel}.
	* @param {Boolean} info.animate - Whether the parent Panels is set to animate.
	* @public
	*/
	transitionFinished: function (info) {
		this.updatePanel(info);
	},

	/**
	* @private
	*/
	shrinkAnimation: function () {
		this.growing = false;
		this.shrinking = true;
		this.addClass('shrunken');
		this.addClass('shrinking');
	},

	/**
	* @private
	*/
	shrink: function () {
		this.addClass('shrunken');
	},

	/**
	* @private
	*/
	growAnimation: function () {
		this.growing = true;
		this.shrinking = false;
		this.addClass('growing');
		this.removeClass('shrunken');
	},

	/**
	* @private
	*/
	grow: function () {
		this.removeClass('shrunken');
	},

	/**
	* Was protected
	* @private
	*/
	getInitAnimationValues: function () {
		var node = this.hasNode(),
			paddingT = parseInt(dom.getComputedStyleValue(node, 'padding-top'), 10),
			paddingR = parseInt(dom.getComputedStyleValue(node, 'padding-right'), 10),
			paddingB = parseInt(dom.getComputedStyleValue(node, 'padding-bottom'), 10),
			paddingL = parseInt(dom.getComputedStyleValue(node, 'padding-left'), 10);
		this.initialHeight = node.offsetHeight - paddingT - paddingB;
		this.initialWidth = node.offsetWidth   - paddingR - paddingL;
	},

	/**
	* @private
	*/
	haltAnimations: function () {
		this.removeClass('growing');
		this.removeClass('shrinking');
	},

	/**
	* @private
	*/
	preTransitionComplete: function () {
		this.shrinking = false;
		this.doPreTransitionComplete();
	},

	/**
	* @private
	*/
	postTransitionComplete: function () {
		this.growing = false;
		this.doPostTransitionComplete();
	},

	/**
	* @private
	*/
	animationComplete: function (sender, event) {
		if (this.shrinking) {
			this.removeClass('shrinking');
			this.preTransitionComplete();
			return true;
		}
		if (this.growing) {
			this.removeClass('growing');
			this.postTransitionComplete();
			return true;
		}
	},

	/**
	* @private
	*/
	headerAnimationComplete: function (sender, event) {
		if (event.animation) {
			switch (event.animation.name) {
			case 'collapseToSmall':
			case 'expandToLarge':
				// FIXME: It would be better to call this during the animation so it resizes
				// smoothly, but that's not possible with CSS transitions; it will jump now
				this.resize();
				return true;	// We stop header animation event bubble up here.
			}
		}
	},

	// Accessibility

	/**
	* @private
	*/
	accessibilityRole: 'region',

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['title', 'accessibilityLabel', 'accessibilityHint'], method: function () {
			var content = this.title,
				prefix = this.accessibilityLabel || content || null,
				label = this.accessibilityHint && prefix && (prefix + ' ' + this.accessibilityHint) ||
						this.accessibilityHint ||
						this.accessibilityLabel ||
						prefix ||
						null;

			this.setAriaAttribute('aria-label', label);
		}}
	],

	/**
	* @private
	*/
	accessibilityLive: 'off'
});

},{'../options':'moonstone/options','../StyleAnimator':'moonstone/StyleAnimator','../Header':'moonstone/Header','../Marquee':'moonstone/Marquee'}],'moonstone/Panels':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Panels~Panels} kind.
* @module moonstone/Panels
*/

var
	kind = require('enyo/kind'),
	dispatcher = require('enyo/dispatcher'),
	dom = require('enyo/dom'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	EnyoHistory = require('enyo/History'),
	Img = require('enyo/Image'),
	Signals = require('enyo/Signals');

var
	Panels = require('layout/Panels');

var
	Spotlight = require('spotlight');

var
	options = require('../options'),
	BreadcrumbArranger = require('../BreadcrumbArranger'),
	Panel = require('../Panel'),
	StyleAnimator = require('../StyleAnimator'),
	HistorySupport = require('../HistorySupport');

/**
* `moon.PanelsHandle` is a helper kind for {@link module:moonstone/Panels~Panels} which implements a spottable
*  handle that the user can interact with to hide and show the `moon.Panels` control.
*
* @class PanelsHandle
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var PanelsHandle = kind(
	/** @lends module:moonstone/PanelsHandle~PanelsHandle.prototype */ {

	/**
	* @private
	*/
	name: 'moon.PanelsHandle',

	/*
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [HistorySupport],

	/*
	* @private
	*/
	classes: 'moon-panels-handle',

	/**
	* @private
	*/
	handlers: {
		ontap: 'handleTap'
	},

	/**
	* @private
	*/
	handleTap: function () {
		if (!EnyoHistory.isProcessing()) {
			this.pushBackHistory();
		}
	},

	/**
	* @private
	*/
	backKeyHandler: function () {
		this.bubble('ontap');
		return true;
	},

	/*
	* We override getAbsoluteShowing so that the handle's spottability is not dependent on the
	* showing state of its parent, the {@link module:moonstone/Panels~Panels} control.
	*
	* @private
	*/
	getAbsoluteShowing: function (ignoreBounds) {
		var bounds = !ignoreBounds ? this.getBounds() : null;

		if (!this.generated || this.destroyed || !this.showing || (bounds &&
			bounds.height === 0 && bounds.width === 0)) {
			return false;
		}

		return true;
	}
});

/**
* {@link module:moonstone/Panels~Panels} extends {@link module:layout/Panels~Panels}, adding support for 5-way focus
* (Spotlight) and pre-configured Moonstone panels design patterns. By default,
* controls added to a `moonstone/Panels` are instances of {@link module:moonstone/Panel~Panel}.
*
* `moonstone/Panels` introduces the concept of patterns for panel display. Set
* [pattern]{@link module:moonstone/Panels~Panels#pattern} to `'activity'` or `'alwaysViewing'`
* to use one of two patterns designed for apps on Smart TV systems.
*
* @class Panels
* @extends module:layout/Panels~Panels
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Panels~Panels.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Panels',

	/**
	* @private
	*/
	kind : Panels,

	/**
	* @private
	*/
	mixins : [HistorySupport],

	/**
	* @private
	*/
	classes : 'moon-panels',

	/**
	* @private
	*/
	spotlightDecorate : false,

	/**
	* @private
	* @lends module:moonstone/Panels~Panels.prototype
	*/
	published: {
		/**
		* A convenience property for configuring {@link module:moonstone/Panels~Panels} according to a
		* particular design pattern.  Valid values are `'none'` (default), `'activity'`,
		* and `'alwaysviewing'`. Note that this property may only be set at creation
		* time, and should not be changed at runtime.
		*
		* The `'alwaysviewing'` pattern uses the {@link module:moonstone/BreadcrumbArranger~BreadcrumbArranger},
		* with semi-transparent panels (depending on the color theme) over the right
		* half of the screen, allowing multiple breadcrumbs to accumulate on the left
		* half of the screen.
		*
		* The `'activity'` pattern  uses the `moonstone/BreadcrumbArranger` with opaque
		* panels over the full screen and only one breadcrumb showing onscreen.
		*
		* The `'none'` pattern should be used when selecting other arrangers, such as
		* {@link module:layout/CarouselArranger~CarouselArranger} or {@link module:layout/CardArranger~CardArranger}.
		*
		* @type {String}
		* @default 'none'
		* @public
		*/
		pattern: 'none',

		/**
		* When [useHandle]{@link module:moonstone/Panels~Panels#useHandle} is used, it is automatically
		* hidden after this amount of time (in milliseconds).
		*
		* @type {Number}
		* @default 4000
		* @public
		*/
		autoHideTimeout: 4000,

		/**
		* When `true`, a handle is created to allow the user to control the showing
		* state of the panels using animation. When `false`, no handle is created and
		* panels may only be hidden/shown programmatically with no animation.
		* When `'auto'` (the default), `useHandle` is set to `true` if the
		* [pattern]{@link module:moonstone/Panels~Panels#pattern} is `'alwaysviewing'` and to `false` if
		* the `pattern` is `'activity'`. Note that this property may only be set at
		* creation time, and should not be changed at runtime. This property
		* only has an effect when using the `'activity'` or `'alwaysviewing'` pattern.
		*
		* @type {String|Boolean}
		* @default 'auto'
		* @public
		*/
		useHandle: 'auto',

		/**
		* Dynamically controls whether the handle is showing.
		* When `true` (the default), the handle is shown and panels may be shown by
		* activating the handle and hidden by re-activating the handle or by tapping
		* outside the panel area. When `false`, the handle is hidden and panels may
		* only be shown or hidden programmatically using the
		* [showing]{@link module:enyo/Control~Control#showing} property or the
		* [show()]{@link module:enyo/Control~Control#show}/[hide()]{@link module:enyo/Control~Control#hide} API.
		* This property only has an effect when [useHandle]{@link module:moonstone/Panels~Panels#useHandle}
		* is `true` (or `'auto'`, resulting in `true`).
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		handleShowing: true,

		/**
		* When `true`, panels are automatically popped when the user moves back.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		popOnBack: false,

		/**
		* The source of the image used for branding in the lower left region of the Panels
		* (only applies to Panels using the `'activity'` pattern).
		*
		* @type {String|module:enyo/resolution#selectSrc~src}
		* @default ''
		* @public
		*/
		brandingSrc: ''
	},

	/**
	* @private
	*/
	narrowFit: false,

	/**
	* Hierachical stack.
	* When we call setIndex or pushPanel, new object is pushed to this stack.
	* When we call popPanel or back key handler, lasted object is removed.
	* To save memory, it is initiated when this.allowBackKey is true.
	*
	* @type {Array}
	* @default null
	* @private
	*/
	panelStack: null,

	/**
	* @private
	*/
	handlers: {
		ontap:						'tapped',

		onSpotlightRight:			'spotlightRight',
		onSpotlightLeft:			'spotlightLeft',
		onSpotlightUp:				'spotlightUp',
		onSpotlightDown:			'spotlightDown',
		onSpotlightFocus:			'spotlightFocus',
		onSpotlightContainerLeave:	'onSpotlightPanelLeave',
		onSpotlightContainerEnter:	'onSpotlightPanelEnter',

		onPreTransitionComplete:	'preTransitionComplete',
		onPostTransitionComplete:	'postTransitionComplete'
	},

	/**
	* @private
	*/
	handleTools: [
		{name: 'backgroundScrim', kind: Control, classes: 'moon-panels-background-scrim'},
		{name: 'clientWrapper', kind: Control, classes: 'enyo-fill enyo-arranger moon-panels-client', accessibilityPreventScroll: true, components: [
			{name: 'scrim', kind: Control, classes: 'moon-panels-panel-scrim', components: [
				{name: 'branding', kind: Img, sizing: 'contain', classes: 'moon-panels-branding'}
			]},
			{name: 'client', kind: Control, tag: null}
		]},
		{name: 'showHideHandle', kind: PanelsHandle, classes: 'hidden', canGenerate: false, ontap: 'handleTap', onSpotlightLeft: 'handleSpotLeft', onSpotlightRight: 'handleSpotRight', onSpotlightFocused: 'handleFocused', onSpotlightBlur: 'handleBlur', tabIndex: -1},
		{name: 'showHideAnimator', kind: StyleAnimator, onComplete: 'showHideAnimationComplete'}
	],

	/**
	* @private
	*/
	defaultKind: Panel,

	/**
	* When `false`, dragging is disabled.
	*
	* @private
	*/
	draggable: false,

	/**
	* Value may be between `0` and `1`, inclusive.
	*
	* @private
	*/
	panelCoverRatio: 1,

	/**
	* Will be `true` for 'activity' pattern, and `false` for 'alwaysviewing' pattern.
	*
	* @private
	*/
	showFirstBreadcrumb: false,

	/**
	* Default to using `moon.BreadcrumbArranger`.
	*
	* @private
	*/
	arrangerKind: BreadcrumbArranger,

	/**
	* Index of panel set in the middle of transition.
	*
	* @private
	*/
	queuedIndex: null,

	/**
	* Flag for initial transition.
	*
	* @private
	*/
	_initialTransition: true,

	/**
	* Flag for blocking consecutive push/pop/replace panel actions to protect
	* create/render/destroy time.
	*
	* @private
	*/
	isModifyingPanels: false,

	/**
	* Flag to indicate if the Panels are currently transitioning to a new index
	*
	* @private
	*/
	transitioning: false,

	/**
	* Checks the state of panel transitions.
	*
	* @return {Boolean} `true` if a transition between panels is currently in progress;
	* otherwise, `false`.
	* @public
	*/
	inTransition: function () {
		return this.transitioning;
	},

	/**
	* Creates a panel on top of the stack and increments index to select that component.
	*
	* @param {Object} info - The declarative {@glossary kind} definition.
	* @param {Object} moreInfo - Additional properties to be applied (defaults).
	* @return {Object} The instance of the panel that was created on top of the stack.
	* @public
	*/
	pushPanel: function (info, moreInfo) { // added
		if (this.transitioning || this.isModifyingPanels) {return null;}
		this.isModifyingPanels = true;
		var lastIndex = this.getPanels().length - 1,
			oPanel = this.createComponent(info, moreInfo);
		oPanel.render();
		this.reflow();
		oPanel.show();
		oPanel.resize();
		this.setIndex(lastIndex+1);
		this.isModifyingPanels = false;
		return oPanel;
	},

	/**
	* Options for the [moon.Panels.pushPanels()]{@link module:moonstone/Panels~Panels.pushPanels} method.
	*
	* @typedef {Object} moon.Panels.pushPanels~options
	* @property {Number} targetIndex - The panel index number to immediately switch to. Leaving
	*	this blank or not setting it will perform the default action, which transitions to the
	*	first of the new panels. Setting this to a negative and other "out of bounds" values
	*	work in conjunction with the `wrap: true` property. Negative values count backward from
	*	the end, while indices greater than the total Panels' panel length wrap around and start
	*	counting again from the beginning.
	* @property {Boolean} transition - Whether to transition or jump directly to the next panel.
	* @public
	*/

	/**
	* Creates multiple panels on top of the stack and updates index to select the last one
	* created. Supports an optional `options` object as the third parameter.
	*
	* @param {Object[]} info - The declarative {@glossary kind} definitions.
	* @param {Object} commonInfo - Additional properties to be applied (defaults).
	* @param {Object} options - Additional options for pushPanels.
	* @return {null|Object[]} Array of the panels that were created on top of the stack, or
	*	`null` if panels could not be created.
	* @public
	*/
	pushPanels: function(info, commonInfo, options) { // added
		if (this.transitioning || this.isModifyingPanels) { return null; }
		this.isModifyingPanels = true;

		if (!options) { options = {}; }
		var lastIndex = this.getPanels().length,
			oPanels = this.createComponents(info, commonInfo),
			nPanel;

		for (nPanel = 0; nPanel < oPanels.length; ++nPanel) {
			oPanels[nPanel].render();
		}
		this.reflow();
		if (options.targetIndex || options.targetIndex === 0) {
			lastIndex = options.targetIndex;
		}
		lastIndex = this.clamp(lastIndex);
		this.getPanels()[lastIndex].show();
		for (nPanel = 0; nPanel < oPanels.length; ++nPanel) {
			oPanels[nPanel].resize();
		}

		// If transition was explicitly set to false, since null or undefined indicate "never set" or unset
		if (options.transition === false) {
			this.setIndexDirect(lastIndex);
		} else {
			this.setIndex(lastIndex);
		}

		this.isModifyingPanels = false;
		return oPanels;
	},

	/**
	* Destroys panels whose index is greater than or equal to a specified value.
	*
	* @param {Number} index - Index at which to start destroying panels.
	* @public
	*/
	popPanels: function (index) {
		if (this.transitioning || this.isModifyingPanels) {return;}
		this.isModifyingPanels = true;
		var panels = this.getPanels();
		index = index || panels.length - 1;

		while (panels.length > index && index >= 0) {
			panels[panels.length - 1].destroy();
		}
		this.isModifyingPanels = false;
	},

	/**
	* Destroys specified panel and creates new panel in-place without transition effect.
	*
	* @param {Number} index - Index of panel to destroy.
	* @param {Object} info - The declarative {@glossary kind} definition.
	* @param {Object} moreInfo - Additional properties to be applied (defaults).
	* @public
	*/
	replacePanel: function (index, info, moreInfo) {
		if (this.transitioning || this.isModifyingPanels) {return;}
		this.isModifyingPanels = true;
		var oPanel = null;

		if (this.getPanels().length > index) {
			this.getPanels()[index].destroy();
			if (this.getPanels().length > index) {
				moreInfo = util.mixin({addBefore: this.getPanels()[index]}, moreInfo);
			}
		}
		oPanel = this.createComponent(info, moreInfo);
		oPanel.render();
		this.resize();
		this.isModifyingPanels = false;
	},

	/**
	* Finds and returns the panel index of the passed-in control. Returns `-1` if
	* panel is not found.
	*
	* @param {Object} oControl - A control to look for.
	* @return {Number} Panel index of control, or `-1` if panel is not found.
	* @public
	*/
	getPanelIndex: function (oControl) {
		var oPanel = null;

		while (oControl && oControl.parent) {
			// Parent of a panel can be a client or a panels.
			if (oControl.parent === this.$.client || oControl.parent === this) {
				oPanel = oControl;
				break;
			}
			oControl = oControl.parent;
		}

		if (oPanel) {
			for (var n=0; n<this.getPanels().length; n++) {
				if (this.getPanels()[n] == oPanel) {
					return n;
				}
			}
		}

		return -1;
	},

	/**
	* Returns `true` if the passed-in control is a child panel of this Panels instance.
	*
	* @param {Object} control - A panel control.
	* @return {Boolean} `true` if the specified control is a child panel of this Panels
	* instance.
	* @public
	*/
	isPanel: function (control) {
		for (var n=0; n<this.getPanels().length; n++) {
			if (this.getPanels()[n] == control) {
				return true;
			}
		}
	},

	/**
	* @method
	* @private
	*/
	create: function () {
		Panels.prototype.create.apply(this, arguments);
		this.set('animate', this.animate && options.accelerate, true);

		// we need to ensure our handler has the opportunity to modify the flow during
		// initialization
		this.showingChanged();
		this.brandingSrcChanged();
	},

	/**
	* @private
	*/
	initComponents: function () {
		this.applyPattern();
		Panels.prototype.initComponents.apply(this, arguments);
		this.initializeShowHideHandle();
		this.handleShowingChanged();
		this.allowBackKeyChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Panels.prototype.rendered.apply(this, arguments);

		// Direct hide if not showing and using handle
		if (this.useHandle === true) {
			if (this.showing) {
				this._directShow();
			} else {
				this._directHide();
			}
		}
		this.displayBranding();
	},

	/**
	* @private
	*/
	tapped: function (oSender, oEvent) {
		if (oEvent.originator === this.$.showHideHandle || this.pattern === 'none' ||
			this.transitioning === true || this.isModifyingPanels === true) {
			return;
		}

		if (this.shouldHide(oEvent)) {
			if (this.showing && (this.useHandle === true) && this.handleShowing) {
				this.hide();
			}
		} else {
			var n = (oEvent.breadcrumbTap) ? this.getPanelIndex(oEvent.originator) : -1;
			// If tapped on not current panel (breadcrumb), go to that panel
			if (n >= 0 && n !== this.getIndex()) {
				this.setIndex(n);
			}
		}
	},

	/**
	* @private
	*/
	shouldHide: function (oEvent) {
		return (oEvent.originator === this.$.clientWrapper || (oEvent.originator instanceof Panel && this.isPanel(oEvent.originator)));
	},

	/**
	* @private
	*/
	spotlightLeft: function (oSender, oEvent) {
		if (this.toIndex !== null) {
			this.queuedIndex = this.toIndex - 1;
			//queuedIndex could have out boundary value. It will be managed in setIndex()
		}
		var orig = oEvent.originator,
			idx;
		// Don't allow left-movement from a breadcrumb
		if (orig.name === 'breadcrumbBackground') {
			return true;
		}
		if (orig instanceof Panel) {
			idx = this.getPanelIndex(orig);
			if (idx === 0) {
				if (this.showing && (this.useHandle === true) && this.handleShowing) {
					this.hide();
					return true;
				}
			}
			else {
				this.previous();
				return true;
			}
		}
	},

	/**
	* @private
	*/
	spotlightRight: function (oSender, oEvent) {
		if (this.toIndex !== null) {
			this.queuedIndex = this.toIndex + 1;
			//queuedIndex could have out boundary value. It will be managed in setIndex()
		}
		var orig = oEvent.originator,
			idx = this.getPanelIndex(orig),
			next = this.getPanels()[idx + 1];
		if (orig.name === 'breadcrumbBackground') {
			// Upon pressing right from a pointer-focused breadcrumb, just jump
			// to the current panel to keep focus visible
			Spotlight.spot(next);
			return true;
		}
		if (next && orig instanceof Panel) {
			if (this.useHandle === true && this.handleShowing && next.isOffscreen) {
				Spotlight.spot(this.$.showHideHandle);
			}
			else {
				this.next();
			}
			return true;
		}
	},

	/**
	* @private
	*/
	spotlightDown: function (oSender, oEvent) {
		if (oEvent.originator.name === 'breadcrumbBackground') { return true; }
	},

	/**
	* @private
	*/
	spotlightFocus: function (oSender, oEvent) {
		var orig = oEvent.originator;
		var idx = this.getPanelIndex(orig);
		if (this.index !== idx && idx !== -1 && orig.name !== 'breadcrumbBackground') {
			this.setIndex(idx);
		}
	},

	/**
	* Responds to tap on show/hide handle.
	*
	* @private
	*/
	handleTap: function () {
		this.setShowing(!this.showing);
	},

	/**
	* @private
	*/
	handleSpotLeft: function () {
		if (this.showing) {
			Spotlight.spot(this.getActive());
		} else {
			Spotlight.unspot();
		}
		return true;
	},

	/**
	* @private
	*/
	handleSpotRight: function (sender, event) {
		if (this.showing) {
			return true;
		}
	},

	/**
	* @private
	*/
	handleBlur: function (sender, event) {
		if (this.isHandleFocused) {
			this.isHandleFocused = false;
			if (!Spotlight.getPointerMode()) {
				if (!this.showing) {
					this.panelsHiddenAsync();
				}
			}
		}
		this.resetHandleAutoHide();
		if (!this.showing) {
			Signals.send('onPanelsHandleBlurred');
		}
	},

	/**
	* @private
	*/
	panelsHiddenAsync: function () {
		util.asyncMethod(Signals, 'send', 'onPanelsHidden');
	},

	/**
	* @private
	*/
	resetHandleAutoHide: function (sender, event) {
		this.startJob('autoHide', 'stashHandle', this.getAutoHideTimeout());
	},

	/**
	* @private
	*/
	stopHandleAutoHide: function (sender, event) {
		this.stopJob('autoHide');
	},

	/**
	* @private
	*/
	stashHandle: function () {
		this.$.showHideHandle.addRemoveClass('stashed', !this.showing);
	},

	/**
	* @private
	*/
	unstashHandle: function () {
		this.stopHandleAutoHide();
		this.$.showHideHandle.removeClass('stashed');
	},

	/**
	* @private
	*/
	handleFocused: function () {
		this.unstashHandle();
		this.startJob('autoHide', 'handleSpotLeft', this.getAutoHideTimeout());
		this.isHandleFocused = true;
		Signals.send('onPanelsHandleFocused');
	},

	/**
	* @private
	*/
	handleShowingChanged: function () {
		//* show handle only when useHandle is true
		if (this.useHandle !== true) { return; }
		this.$.showHideHandle.addRemoveClass('hidden', !this.handleShowing);
		this.$.showHideHandle.spotlight = this.handleShowing;
	},

	/**
	* Called when focus enters one of the panels. If currently hiding and
	* `this.useHandle` is `true`, shows handle.
	*
	* @private
	*/
	onSpotlightPanelEnter: function () {
		if (!this.showing && (this.useHandle === true) && this.handleShowing ) {
			Spotlight.spot(this.$.showHideHandle);
			return true;
		}
	},

	/**
	* Sets the index of the active panel, possibly transitioning the panel into view.
	*
	* @param {number} index - Index of the panel to make active.
	* @public
	*/
	setIndex: function (index) {
		// Normally this.index cannot be smaller than 0 and larger than panels.length
		// However, if panels uses handle and there is sequential key input during transition
		// then index could have -1. It means that panels will be hidden.
		if (this.toIndex === null || this.useHandle === false) {
			index = this.clamp(index);
		}

		if (index === this.index) {
			return;
		}

		if (this.toIndex !== null) {
			return;
		}

		this.notifyPanels('initPanel');
		this.fromIndex = this.index;
		this.toIndex = index;

		this.queuedIndex = null;
		this._willMove = null;

		// Ensure any VKB is closed when transitioning panels
		this.blurActiveElementIfHiding(index);

		// If panels will move for this index change, kickoff animation. Otherwise skip it.
		if (this.shouldAnimate()) {
			Spotlight.mute(this);
			// if back key feature is enabled and setIndex is not called from back key handler
			if (this.allowBackKey && !EnyoHistory.isProcessing()) {
				this.panelStack.push(this.index);
				this.pushBackHistory();
			}

			this.startTransition();
			this.triggerPreTransitions();
		} else {
			this._setIndex(this.toIndex);
		}
	},

	/**
	* @private
	*/
	blurActiveElementIfHiding: function (index) {
		var activeElement = document.activeElement,
			activeComponent = activeElement ? dispatcher.$[activeElement.id] : null,
			panels = this.getPanels(),
			panel,
			panelInfo;
		if (activeComponent) {
			for (var i = 0; i < panels.length; i++) {
				panel = panels[i];
				if (activeComponent.isDescendantOf(panel)) {
					panelInfo = this.getPanelInfo(i, index);
					if (panelInfo.offscreen) {
						document.activeElement.blur();
					}
					break;
				}
			}
		}
	},

	/**
	* Returns `true` if the panels should animate in the transition from `fromIndex` to
	* `toIndex`.
	*
	* @private
	*/
	shouldAnimate: function () {
		if (this._willMove == null) {
			return (this._willMove = this.animate && this.shouldArrange());
		}
		else {
			return this._willMove;
		}
	},

	/**
	* Returns `true` if any panels will move in the transition from `fromIndex` to `toIndex`.
	*
	* @private
	*/
	shouldArrange: function () {
		return this.layout.shouldArrange ? this.layout.shouldArrange(this.fromIndex, this.toIndex) : true;
	},

	/**
	*
	* @private
	*/
	_setIndex: function (index) {
		var prev = this.get('index');
		this.index = this.clamp(index);
		this.notifyObservers('index', prev, index);
	},

	/**
	* Called when the arranger animation completes.
	*
	* @private
	*/
	animationEnded: function () {
		if (this.animate) {
			this.triggerPostTransitions();
		} else {
			Panels.prototype.animationEnded.apply(this, arguments);
		}

		return true;
	},

	/**
	* @private
	*/
	getPanelInfo: function (inPanelIndex, inActiveIndex) {
		return this.layout.getPanelInfo && this.layout.getPanelInfo(inPanelIndex, inActiveIndex) || {};
	},

	/**
	* @private
	*/
	getTransitionInfo: function (inPanelIndex) {
		var to = (this.toIndex || this.toIndex === 0) ? this.toIndex : this.index;
		var info = this.getPanelInfo(inPanelIndex, to);
		info.from = this.fromIndex;
		info.to = this.toIndex;
		info.index = inPanelIndex;
		info.animate = this.animate;
		return info;
	},

	/**
	* If any panel has a pre-transition, pushes the panel's index to `preTransitionWaitList`.
	*
	* @private
	*/
	triggerPreTransitions: function () {
		var panels = this.getPanels(),
			info;

		this.preTransitionWaitlist = [];

		for(var i = 0, panel; (panel = panels[i]); i++) {
			info = this.getTransitionInfo(i);
			if (panel.preTransition && panel.preTransition(info)) {
				this.preTransitionWaitlist.push(i);
			}
		}

		if (this.preTransitionWaitlist.length === 0) {
			this._setIndex(this.toIndex);
		}
	},

	/**
	* @private
	*/
	preTransitionComplete: function (sender, event) {
		var index = this.getPanels().indexOf(event.originator);

		for (var i = 0; i < this.preTransitionWaitlist.length; i++) {
			if (this.preTransitionWaitlist[i] === index) {
				this.preTransitionWaitlist.splice(i,1);
				break;
			}
		}

		if (this.preTransitionWaitlist.length === 0) {
			this._setIndex(this.toIndex);
		}

		return true;
	},

	/**
	* @private
	*/
	triggerPostTransitions: function () {
		var panels = this.getPanels(),
			info;

		this.postTransitionWaitlist = [];

		for(var i = 0, panel; (panel = panels[i]); i++) {
			info = this.getTransitionInfo(i);
			if (panel.postTransition && panel.postTransition(info)) {
				this.postTransitionWaitlist.push(i);
			}
		}

		if (this.postTransitionWaitlist.length === 0) {
			this.completed();
			return true;
		}
	},

	/**
	* @private
	*/
	postTransitionComplete: function (sender, event) {
		var index = this.getPanels().indexOf(event.originator);

		for (var i = 0; i < this.postTransitionWaitlist.length; i++) {
			if (this.postTransitionWaitlist[i] === index) {
				this.postTransitionWaitlist.splice(i,1);
				break;
			}
		}

		if (this.postTransitionWaitlist.length === 0) {
			this.completed();
		}

		return true;
	},

	/**
	* When index changes, make sure to update the breadcrumbed panel's `spotlight` property
	* (to avoid {@glossary Spotlight} issues).
	*
	* @private
	*/
	indexChanged: function () {
		var activePanel = this.getActive();

		if (activePanel && activePanel.isBreadcrumb) {
			activePanel.removeSpottableBreadcrumbProps();
		}

		Panels.prototype.indexChanged.apply(this, arguments);

		this.displayBranding();
	},

	notifyPanels: function (method) {
		var panels = this.getPanels(),
			panel, info, i;
		for (i = 0; (panel = panels[i]); i++) {
			info = this.getTransitionInfo(i);
			if (panel[method]) {
				panel[method](info);
			}
		}
	},

	/**
	* @private
	*/
	finishTransition: function () {
		var panels = this.getPanels(),
			toIndex = this.toIndex,
			fromIndex = this.fromIndex,
			i, panel, info, popFrom;

		this.notifyPanels('transitionFinished');
		Panels.prototype.finishTransition.apply(this, arguments);

		// Automatically pop off panels that are no longer on screen
		if (this.popOnBack && (toIndex < fromIndex)) {
			popFrom = toIndex + 1;
			for (i = 0; (panel = panels[i]); i++) {
				info = this.getTransitionInfo(i);
				// If a panel is onscreen, don't pop it
				if ((i > toIndex) && !info.offscreen) {
					popFrom++;
				}
			}

			this.popPanels(popFrom);
		}

		// queuedIndex becomes -1 when left key input is occurred
		// during transition from index 1 to 0.
		// We can hide panels if we use handle.
		if (this.queuedIndex === -1 && this.useHandle) {
			this.hide();
		} else if (this.queuedIndex !== null) {
			this.setIndex(this.queuedIndex);
		}

		Spotlight.unmute(this);
		// Spot the active panel
		Spotlight.spot(this.getActive());
	},

	/**
	* Override the default `getShowing()` behavior to avoid setting `this.showing` based on the
	* CSS `display` property.
	*
	* @private
	*/
	getShowing: function () {
		return this.showing;
	},

	/**
	* @private
	*/
	showingChanged: function (inOldValue) {
		if (this.$.backgroundScrim) {
			this.$.backgroundScrim.addRemoveClass('visible', this.showing);
		}
		if (this.useHandle === true) {
			if (this.showing) {
				this.unstashHandle();
				this._show();
				Spotlight.spot(this.getActive());
			}
			else {
				// in this case, our display flag will have been set to none so we need to clear
				// that even though the showing flag will remain false
				this.applyStyle('display', null);
				this.resetHandleAutoHide();
				this._hide();
			}
			this.sendShowingChangedEvent(inOldValue);
		}
		else {
			Panels.prototype.showingChanged.apply(this, arguments);
		}
	},

	/**
	* @private
	*/
	applyPattern: function () {
		switch (this.pattern) {
		case 'alwaysviewing':
			this.applyAlwaysViewingPattern();
			break;
		case 'activity':
			this.applyActivityPattern();
			break;
		default:
			this.useHandle = false;
			break;
		}
	},

	/**
	* @private
	*/
	applyAlwaysViewingPattern: function () {
		this.setArrangerKind(BreadcrumbArranger);
		this.addClass('always-viewing');
		this.panelCoverRatio = 0.5;
		this.useHandle = (this.useHandle === 'auto') ? true : this.useHandle;
		this.createChrome(this.handleTools);
		this.breadcrumbGap = 20;
	},

	/**
	* @private
	*/
	applyActivityPattern: function () {
		this.setArrangerKind(BreadcrumbArranger);
		this.addClass('activity');
		this.showFirstBreadcrumb = true;
		this.useHandle = (this.useHandle === 'auto') ? false : this.useHandle;
		this.createChrome(this.handleTools);
		this.breadcrumbGap = 0;
	},

	/**
	* @private
	*/
	initializeShowHideHandle: function () {
		if (this.useHandle === true) {
			this.$.showHideHandle.canGenerate = true;
			this.$.showHideHandle.spotlight = true;
		}
	},

	/**
	* Shows panels with transition from right.
	*
	* @private
	*/
	_show: function () {
		var init = false;
		if (!this.hasNode()) {
			init = true;
		} else {
			this.$.showHideHandle.addClass('right');
			this.applyShowAnimation();
		}
		Signals.send('onPanelsShown', {initialization: init});
	},

	/**
	* Hides panels with transition to right.
	*
	* @private
	*/
	_hide: function () {
		if (!this.hasNode()) {
			return;
		}
		this.$.showHideHandle.removeClass('right');
		this.applyHideAnimation();
		this.panelsHiddenAsync();
	},

	/**
	* Sets show state without animation.
	*
	* @private
	*/
	_directShow: function () {
		this.$.showHideHandle.addClass('right');
		if (this.handleShowing) {
			this.$.showHideHandle.removeClass('hidden');
		}
		this.applyShowAnimation(true);
	},

	/**
	* Sets hide state without animation.
	*
	* @private
	*/
	_directHide: function () {
		this.$.showHideHandle.addClass('hidden');
		this.$.showHideHandle.removeClass('right');
		this.applyHideAnimation(true);
		this.hideAnimationComplete();
	},

	/**
	* @private
	*/
	applyShowAnimation: function (direct) {
		this.$.clientWrapper.applyStyle('transition', direct ? null : 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		this.$.clientWrapper.applyStyle('-webkit-transition', direct ? null : '-webkit-transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		dom.transform(this.$.clientWrapper, {translateX: 0});
	},

	/**
	* @private
	*/
	applyHideAnimation: function (direct) {
		this.$.clientWrapper.applyStyle('transition', direct ? null : 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		this.$.clientWrapper.applyStyle('-webkit-transition', direct ? null : '-webkit-transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		dom.transform(this.$.clientWrapper, {translateX: '100%'});
	},

	/**
	* @private
	*/
	getOffscreenXPosition: function () {
		return this.$.clientWrapper.getBounds().width;
	},

	/**
	* Hide/show animation complete.
	*
	* @private
	*/
	showHideAnimationComplete: function (sender, event) {
		switch (event.animation.name) {
		case 'show':
			this.showAnimationComplete();
			return true;
		case 'hide':
			this.hideAnimationComplete();
			return true;
		}
	},

	/**
	* @private
	*/
	showAnimationComplete: function () {
		if (this.handleShowing) {
			this.$.showHideHandle.removeClass('hidden');
		}
	},

	/**
	* @private
	*/
	hideAnimationComplete: function () {
		if (this.handleShowing) {
			this.$.showHideHandle.removeClass('hidden');
		}
	},

	/**
	* @private
	*/
	displayBranding: function () {
		if (this.$.branding) {
			if (this.pattern == 'activity' && this.getPanelInfo(0, this.index).breadcrumb) {
				this.$.branding.show();
			} else {
				this.$.branding.hide();
			}
		}
	},

	/**
	* @private
	*/
	brandingSrcChanged: function () {
		if (this.$.branding) {
			this.$.branding.set('src', this.brandingSrc);
		}
	},

	/**
	* @private
	*/
	animateChanged: function () {
		this.addRemoveClass('moon-composite', this.animate);
	},

	/**
	* @private
	*/
	backKeyHandler: function () {
		if (this.panelStack.length) {
			this.setIndex(this.panelStack.pop());
		}
		return true;
	},

	/**
	* @private
	*/
	allowBackKeyChanged: function () {
		if (this.allowBackKey) {
			//initialize stack
			this.panelStack = [];
		} else if(this.panelStack) {
			this.panelStack = null;
		}
	},

	// Accessibility

	ariaObservers: [
		{path: ['showing', 'index'], method: function () {
			var panels = this.getPanels(),
				active = this.getActive(),
				l = panels.length,
				panel;

			while (--l >= 0) {
				panel = panels[l];
				if (panel instanceof Panel && panel.title) {
					panel.set('accessibilityRole', (panel === active) && this.get('showing') ? 'alert' : 'region');
				}
			}
		}}
	]

});

},{'../options':'moonstone/options','../BreadcrumbArranger':'moonstone/BreadcrumbArranger','../Panel':'moonstone/Panel','../StyleAnimator':'moonstone/StyleAnimator','../HistorySupport':'moonstone/HistorySupport'}]
	};

});
//# sourceMappingURL=moonstone.js.map