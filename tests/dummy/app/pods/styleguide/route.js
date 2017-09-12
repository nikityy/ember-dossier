/* globals require */
import Ember from 'ember';

const {
  Route,
  set,
} = Ember;

export default Route.extend({

  setupController(controller) {
    const { entries } = require;
    const entryKeys = Object.keys(entries);
    const components = entryKeys.filter(this._isComponent.bind(this));
    const documentedComponents = components.filter(this._isDocumented.bind(this));
    const items = documentedComponents.map((path) => ({
      name: this._getComponentName(path),
    }));

    set(controller, 'items', items);
  },

  _getComponentName(path) {
    const elements = this._getElements(path);
    return elements[elements.length - 3];
  },

  _getElements(path) {
    return path.split('/');
  },

  _isComponent(path) {
    return /.*components\/.*/.test(path);
  },

  _isDocumented(path) {
    const elements = this._getElements(path);
    const componentName = elements[elements.length - 2];
    return componentName === '__doc__';
  },

});
