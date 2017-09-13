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
      link: this.componentNameToPath(this._getComponentName(path)),
    }));

    return items;
  },

  getDocumentationPath(path) {
    const docSubdirectory = get(this, 'docSubdirectory');
    const componentName = this.pathToComponentName(path);

    return [
      componentName,
      docSubdirectory
    ].join('/');
  },

  componentNameToPath(componentName) {
    return componentName.replace(/\//g, '--');
  },

  pathToComponentName(path) {
    return path.replace(/--/g, '/');
  },

  _getComponentName(path) {
    const elements = this._getElements(path).slice(1);

    const podsPartIndex = elements.indexOf('pods');
    const componentsPartIndex = elements.indexOf('components');
    const componentPathStart = Math.max(podsPartIndex, componentsPartIndex);

    return elements.slice(
      componentPathStart + 1,
      elements.length - 1,
    ).join('/');
  },

  _getElements(path) {
    return path.split('/');
  },

  _isDocumentedComponent(path, index, array) {
    const docSubdirectory = get(this, 'docSubdirectory');
    const componentPattern = /\/component$/;

    if (componentPattern.test(path)) {
      const componentDirectory = path.replace(componentPattern, '');
      const documentationDirectory = [componentDirectory, docSubdirectory].join('/');
      const documentationPattern = new RegExp(`^${documentationDirectory}`);
      return !!array.find((x) => documentationPattern.test(x));
    }

    return false;
  },

});
