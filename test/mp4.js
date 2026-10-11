var assert = require('assert')
var mimeTypes = require('..')

describe('mimeTypes mp4 regression', function () {
  it('should prefer video/mp4 over application/mp4 for .mp4', function () {
    assert.strictEqual(mimeTypes.lookup('.mp4'), 'video/mp4')
    assert.strictEqual(mimeTypes.lookup('mp4'), 'video/mp4')
    assert.strictEqual(mimeTypes.lookup('file.mp4'), 'video/mp4')
    assert.strictEqual(mimeTypes.lookup('.MP4'), 'video/mp4')
  })

  it('should not change related extensions', function () {
    assert.strictEqual(mimeTypes.lookup('.mp4v'), 'video/mp4')
    assert.strictEqual(mimeTypes.lookup('.mpg4'), 'application/mp4')
    assert.strictEqual(mimeTypes.lookup('.mp4s'), 'application/mp4')
    assert.strictEqual(mimeTypes.lookup('.m4p'), 'application/mp4')
  })
})
