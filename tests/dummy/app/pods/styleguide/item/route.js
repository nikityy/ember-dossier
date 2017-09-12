import Ember from 'ember';

const {
  get,
  inject: { service },
  Route,
  set,
} = Ember;

export default Route.extend({

  dossier: service('dossier'),

  model(params) {
    return params;
  },

  setupController(controller, model) {
    const dossier = get(this, 'dossier');
    const { componentName } = model;
    const documentComponentPath = dossier.getDocumentationPath(componentName);
    set(controller, 'documentComponentPath', documentComponentPath);
  },

});
