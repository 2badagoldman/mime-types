var assert = require('assert')
var mimeTypes = require('..')

describe('mp4 resolution', function () {
  it('should resolve mp4 to video/mp4', function () {
    assert.strictEqual(mimeTypes.lookup('.mp4'), 'video/mp4')
    assert.strictEqual(mimeTypes.lookup('mp4'), 'video/mp4')
    assert.strictEqual(mimeTypes.lookup('file.mp4'), 'video/mp4')
  })

  it('should return a video/mp4 content-type for file.mp4', function () {
    assert.ok(mimeTypes.contentType('file.mp4').startsWith('video/mp4'))
  })

  it('should keep extension mappings for mp4 types', function () {
    assert.strictEqual(mimeTypes.extension('video/mp4'), 'mp4')
    assert.strictEqual(mimeTypes.extension('application/mp4'), 'mp4')
  })

  it('should not change other conflict resolutions', function () {
    assert.strictEqual(mimeTypes.lookup('.rtf'), 'application/rtf')
    assert.strictEqual(mimeTypes.lookup('.xml'), 'application/xml')
    assert.strictEqual(mimeTypes.lookup('.mp3'), 'audio/mpeg')
    assert.strictEqual(mimeTypes.lookup('.3gpp'), 'video/3gpp')
  })
})
