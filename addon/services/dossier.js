/* globals require */
import Ember from 'ember';

const {
  get,
  Service,
} = Ember;

export default Service.extend({

  docSubdirectory: '-doc',

  getDocumentedComponents() {
    const { entries } = require;
    const entryKeys = Object.keys(entries);
    const components = entryKeys.filter(this._isDocumentedComponent.bind(this));
    const items = components.map((path) => ({
      name: this._getComponentName(path),
    }));

    return items;
  },

  getDocumentationPath(componentName) {
    const docSubdirectory = get(this, 'docSubdirectory');
    return [componentName, docSubdirectory].join('/');
  },

  _getComponentName(path) {
    const elements = this._getElements(path);
    return elements[elements.length - 3];
  },

  _getElements(path) {
    return path.split('/');
  },

  _isDocumentedComponent(path) {
    const docSubdirectory = get(this, 'docSubdirectory');
    const pattern = new RegExp(`.*components/.*/${docSubdirectory}/template`);
    return pattern.test(path);
  },

});
