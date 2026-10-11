var assert = require('assert')
var mimeTypes = require('..')

describe('mp4 lookup regression', function () {
  it('should return video/mp4 for ".mp4"', function () {
    assert.strictEqual(mimeTypes.lookup('.mp4'), 'video/mp4')
    assert.strictEqual(mimeTypes.lookup('mp4'), 'video/mp4')
    assert.strictEqual(mimeTypes.lookup('/path/to/CLIP.MP4'), 'video/mp4')
    assert.strictEqual(mimeTypes.contentType('mp4'), 'video/mp4')
  })

  it('should not change related lookups', function () {
    assert.strictEqual(mimeTypes.lookup('.mpg4'), 'application/mp4')
    assert.strictEqual(mimeTypes.lookup('.m4a'), 'audio/mp4')
    assert.strictEqual(mimeTypes.lookup('.m4v'), 'video/x-m4v')
    assert.strictEqual(mimeTypes.lookup('.xml'), 'application/xml')
    assert.strictEqual(mimeTypes.lookup('.rtf'), 'application/rtf')
    assert.strictEqual(mimeTypes.lookup('.bogus'), false)
  })
})
