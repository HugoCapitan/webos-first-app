/**
	For simple applications, you might define all of your models, collections,
	and sources in this file.  For more complex applications, you might choose to separate
	these kind definitions into multiple files under this folder.
*/

var Collection = require('enyo/Collection');
var JsonpSource = require('enyo/JsonpSource');
var kind = require('enyo/kind');
var Model = require('enyo/Model');
var utils = require('enyo/utils');

var Source = kind({
  name: 'Source',
  kind: JsonpSource,
  urlRoot: 'https://api.flickr.com/services/rest/',
  fetch: function (rec, opts){
    opts.callbackName = 'jsoncallback';
    opts.params = utils.clone(rec.params);
    opts.params.api_key = '2a21b46e58d207e4888e1ece0cb149a5';
    opts.params.format = 'json';
    this.inherited(arguments);
  }
});

new Source({name: 'flickr'});

var ImageModel = kind({
  name: 'ImageModel',
  kind: Model,
  options: {parse: true},
  source: 'flickr',
  computed: [
    {method: 'thumbnail', path: ['farm', 'server', 'id', 'secret']},
    {method: 'original', path: ['farm', 'server', 'id', 'secret']}
  ],
  thumbnail: function () {
    return 'https://farm' + this.get('farm') +
            '.static.flickr.com/' + this.get('server') +
            '/' + this.get('id') + '_' + this.get('secret') + '_m.jpg';
  },
  original: function () {
    return 'https://farm' + this.get('farm') +
            '.static.flickr.com/' + this.get('server') +
            '/' + this.get('id') + '_' + this.get('secret') + '.jpg';
  }
});

var SearchCollection = kind({
  name: 'SearchCollection',
  kind: Collection,
  model: ImageModel,
  source: 'flickr',
  options: {parse: true},
  published: {
    searchText: null
  },
  searchTextChanged: function () {
    this.empty({destroy: true});
    this.fetch();
  },
  fetch: function (opts) {
    this.params = {
      method: 'flickr.photos.search',
      sort: 'interestingness-desc',
      per_page: 50,
      text: this.searchText
    };
    return this.inherited(arguments);
  },
  parse: function (data) {
    return data && data.photos && data.photos.photo;
  }
});

module.exports = {SearchCollection: SearchCollection};
