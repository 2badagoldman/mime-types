var assert = require('assert')
var mimeTypes = require('..')

describe('mimeTypes', function () {
  describe('.isText(type)', function () {
    it('should return true for any text/* type', function () {
      assert.strictEqual(mimeTypes.isText('text/plain'), true)
      assert.strictEqual(mimeTypes.isText('text/html'), true)
      assert.strictEqual(mimeTypes.isText('text/css'), true)
      assert.strictEqual(mimeTypes.isText('text/markdown'), true)
      assert.strictEqual(mimeTypes.isText('text/x-bogus'), true)
    })

    it('should be case-insensitive', function () {
      assert.strictEqual(mimeTypes.isText('TEXT/HTML'), true)
      assert.strictEqual(mimeTypes.isText('Application/JSON'), true)
      assert.strictEqual(mimeTypes.isText('IMAGE/SVG+XML'), true)
    })

    it('should return true for JSON, XML and JavaScript types', function () {
      assert.strictEqual(mimeTypes.isText('application/json'), true)
      assert.strictEqual(mimeTypes.isText('application/xml'), true)
      assert.strictEqual(mimeTypes.isText('application/javascript'), true)
      assert.strictEqual(mimeTypes.isText('application/x-javascript'), true)
      assert.strictEqual(mimeTypes.isText('application/ecmascript'), true)
      assert.strictEqual(mimeTypes.isText('text/javascript'), true)
    })

    it('should return true for +json and +xml suffixed types', function () {
      assert.strictEqual(mimeTypes.isText('application/ld+json'), true)
      assert.strictEqual(mimeTypes.isText('application/vnd.api+json'), true)
      assert.strictEqual(mimeTypes.isText('image/svg+xml'), true)
      assert.strictEqual(mimeTypes.isText('application/atom+xml'), true)
    })

    it('should ignore parameters in a full Content-Type header', function () {
      assert.strictEqual(mimeTypes.isText('application/json; charset=utf-8'), true)
      assert.strictEqual(mimeTypes.isText('text/html; charset=iso-8859-1'), true)
      assert.strictEqual(mimeTypes.isText('image/png; name="text/plain"'), false)
      assert.strictEqual(mimeTypes.isText('application/octet-stream; charset=utf-8'), false)
    })

    it('should tolerate surrounding whitespace', function () {
      assert.strictEqual(mimeTypes.isText('  text/plain  '), true)
      assert.strictEqual(mimeTypes.isText(' application/json ; charset=utf-8'), true)
    })

    it('should return false for binary types', function () {
      assert.strictEqual(mimeTypes.isText('image/png'), false)
      assert.strictEqual(mimeTypes.isText('image/jpeg'), false)
      assert.strictEqual(mimeTypes.isText('audio/mpeg'), false)
      assert.strictEqual(mimeTypes.isText('video/mp4'), false)
      assert.strictEqual(mimeTypes.isText('application/octet-stream'), false)
      assert.strictEqual(mimeTypes.isText('application/pdf'), false)
      assert.strictEqual(mimeTypes.isText('application/zip'), false)
      assert.strictEqual(mimeTypes.isText('application/wasm'), false)
    })

    it('should return false for types that only look like suffixes', function () {
      assert.strictEqual(mimeTypes.isText('application/json-seq'), false)
      assert.strictEqual(mimeTypes.isText('application/jsonx'), false)
      assert.strictEqual(mimeTypes.isText('application/xml-dtd+bin'), false)
      assert.strictEqual(mimeTypes.isText('application/x-json'), false)
      assert.strictEqual(mimeTypes.isText('application/vnd.foo+json-binary'), false)
    })

    it('should return false for extensions and other non-MIME input', function () {
      assert.strictEqual(mimeTypes.isText('json'), false)
      assert.strictEqual(mimeTypes.isText('txt'), false)
      assert.strictEqual(mimeTypes.isText('.txt'), false)
    })

    it('should return false for invalid input', function () {
      assert.strictEqual(mimeTypes.isText(''), false)
      assert.strictEqual(mimeTypes.isText('   '), false)
      assert.strictEqual(mimeTypes.isText(null), false)
      assert.strictEqual(mimeTypes.isText(undefined), false)
      assert.strictEqual(mimeTypes.isText(), false)
      assert.strictEqual(mimeTypes.isText(0), false)
      assert.strictEqual(mimeTypes.isText(42), false)
      assert.strictEqual(mimeTypes.isText(true), false)
      assert.strictEqual(mimeTypes.isText({}), false)
      assert.strictEqual(mimeTypes.isText(['text/plain']), false)
      assert.strictEqual(mimeTypes.isText(Symbol('text/plain')), false)
    })

    it('should return false for malformed types', function () {
      assert.strictEqual(mimeTypes.isText('text/'), false)
      assert.strictEqual(mimeTypes.isText('/plain'), false)
      assert.strictEqual(mimeTypes.isText('/'), false)
      assert.strictEqual(mimeTypes.isText('text'), false)
      assert.strictEqual(mimeTypes.isText('text//plain'), false)
      assert.strictEqual(mimeTypes.isText('text/plain/extra'), false)
      assert.strictEqual(mimeTypes.isText('; charset=utf-8'), false)
      assert.strictEqual(mimeTypes.isText('text/pl\u0000ain'), false)
      assert.strictEqual(mimeTypes.isText('tëxt/plain'), false)
      assert.strictEqual(mimeTypes.isText('application/+json'), false)
    })
  })
})
