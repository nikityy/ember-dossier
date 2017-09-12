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
      link: this._getComponentName(path).replace(/\//g, '--'),
    }));

    return items;
  },

  getDocumentationPath(componentName) {
    const docSubdirectory = get(this, 'docSubdirectory');
    return [
      componentName.replace(/--/g, '/'),
      docSubdirectory
    ].join('/');
  },

  _getComponentName(path) {
    const elements = this._getElements(path);
    const componentsPartIndex = elements.indexOf('components');
    return elements.slice(
      componentsPartIndex + 1,
      elements.length - 2,
    ).join('/');
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
