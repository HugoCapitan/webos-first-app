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
