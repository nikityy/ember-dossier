import Ember from 'ember';

const {
  get,
  inject: { service },
  Route,
  set,
} = Ember;

export default Route.extend({

  dossier: service('dossier'),

  setupController(controller) {
    const dossier = get(this, 'dossier');
    const items = dossier.getDocumentedComponents();

    set(controller, 'items', items);
  },

});
