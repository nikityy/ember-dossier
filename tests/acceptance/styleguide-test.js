import { test } from 'qunit';
import moduleForAcceptance from 'dummy/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Styleguide');

test('visiting /styleguide', function(assert) {
  visit('/styleguide');

  andThen(function() {
    assert.equal(currentURL(), '/styleguide');
  });
});

test('correct documentations list', function(assert) {
  visit('/styleguide');

  andThen(function() {
    const items = find('.item').toArray().map((x) => $(x).text().trim());
    assert.deepEqual(items, [
      'some-another-component',
      'some-component',
    ]);
  });
});
