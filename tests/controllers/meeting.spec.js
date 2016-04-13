var MeetingController = require('../../api/controllers/MeetingController'),
  sinon = require('sinon'),
  assert = require('assert');

describe('The Meeting Controller', function () {
  describe('when we load the Meeting page', function () {
    it ('should render the view', function () {
      var view = sinon.spy();
      MeetingController.index(null, {
        view: view
      });
      assert.ok(view.called);
    });
  });
});
