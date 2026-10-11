var assert = require('assert')
var db = require('mime-db')
var mimeTypes = require('..')
var mimeScore = require('../mimeScore')

describe('mp4 preference', function () {
  it('should look up video/mp4 for ".mp4", "mp4" and "file.mp4"', function () {
    assert.strictEqual(mimeTypes.lookup('.mp4'), 'video/mp4')
    assert.strictEqual(mimeTypes.lookup('mp4'), 'video/mp4')
    assert.strictEqual(mimeTypes.lookup('file.mp4'), 'video/mp4')
  })

  it('should return video/mp4 content-type for ".mp4"', function () {
    assert.strictEqual(mimeTypes.contentType('.mp4'), 'video/mp4')
    assert.strictEqual(mimeTypes.contentType('.mp4'), mimeTypes.contentType('video/mp4'))
  })

  it('should keep extension mappings for video/mp4 intact', function () {
    assert.deepStrictEqual(mimeTypes.extensions['video/mp4'], ['mp4', 'mp4v', 'mpg4'])
    assert.strictEqual(mimeTypes.extension('video/mp4'), 'mp4')
    assert.strictEqual(mimeTypes.extension('application/mp4'), 'mp4')
  })

  it('should not change any other extension relative to plain mime-score', function () {
    var expected = Object.create(null)
    Object.keys(db).forEach(function (type) {
      (db[type].extensions || []).forEach(function (ext) {
        var prev = expected[ext]
        var s0 = prev ? mimeScore(prev, db[prev].source) : 0
        var s1 = mimeScore(type, db[type].source)
        expected[ext] = s0 > s1 ? prev : type
      })
    })
    expected.mp4 = 'video/mp4'
    assert.deepStrictEqual(
      Object.assign({}, mimeTypes.types),
      Object.assign({}, expected)
    )
    assert.strictEqual(mimeTypes.lookup('.mpg4'), 'application/mp4')
    assert.strictEqual(mimeTypes.lookup('.xml'), 'application/xml')
    assert.strictEqual(mimeTypes.lookup('.wav'), 'audio/wav')
  })
})
