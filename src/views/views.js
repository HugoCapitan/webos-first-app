var Collection = require('enyo/Collection');
var dataFile = require('../data/data');
var kind = require('enyo/kind');

var DataGridList = require('moonstone/DataGridList');
var GridListImageItem = require('moonstone/GridListImageItem');
var Panel = require('moonstone/Panel');
var Panels = require('moonstone/Panels');


var SearchPanel = kind({
  name: 'SearchPanel',
  kind: Panel,
  title: 'Search Flickr',
  titleBelow: 'Enter search term above',
  headerOptions: {inputMode: true, dismissOnEnter: true},
  handlers: {
    onInputHeaderChange: 'search'
  },
  components: [
    {kind: DataGridList, fit: true, name: 'resultList', minWidth: 250, minHeight: 300, components: [
      {kind: GridListImageItem, imageSizing: 'cover', useSubCaption: false, centered: false, bindings: [
        {from: 'model.title', to: 'caption'},
        {from: 'model.thumbnail', to: 'source'}
      ]}
    ]}
  ],
  bindings: [
    {from: 'photos', to: '$.resultList.collection'}
  ],
  create: function (){
    this.inherited(arguments);
    this.set('photos', new dataFile.SearchCollection());
  },
  search: function (sender, ev) {
    this.$.resultList.collection.set('searchText', ev.originator.get('value'));
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
