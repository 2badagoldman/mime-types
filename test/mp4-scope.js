var assert = require('assert')
var db = require('mime-db')
var mimeTypes = require('..')

// Pre-change resolution: plain mime-score, no mp4 special-casing
var baseScore = require('../mimeScore')
function baselineTypes () {
  var types = Object.create(null)
  Object.keys(db).forEach(function (type) {
    var exts = db[type].extensions
    if (!exts) return
    exts.forEach(function (ext) {
      var cur = types[ext]
      var s0 = cur ? baseScore(cur, db[cur].source) : 0
      var s1 = baseScore(type, db[type].source)
      types[ext] = s0 > s1 ? cur : type
    })
  })
  return types
}

describe('mp4 override scope', function () {
  it('should not change .mpg4', function () {
    assert.strictEqual(mimeTypes.lookup('.mpg4'), 'application/mp4')
  })

  it('should not change any extension other than mp4', function () {
    var before = baselineTypes()
    assert.strictEqual(before.mp4, 'application/mp4')
    Object.keys(before).forEach(function (ext) {
      if (ext === 'mp4') return
      assert.strictEqual(mimeTypes.lookup(ext), before[ext], ext)
    })
    assert.strictEqual(Object.keys(mimeTypes.types).length, Object.keys(before).length)
  })
})
