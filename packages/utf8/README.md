# `@lingcz/utf8`

## Usage

```javascript
const utf8 = require('@lingcz/utf8')
const str = 'I love 中国'
const result = utf8.encode(str)
/*
{
  hexStr: '49206c6f766520e4b8ade59bbd',
  buffer: ArrayBuffer {
    [Uint8Contents]: <49 20 6c 6f 76 65 20 e4 b8 ad e5 9b bd>,
    byteLength: 13
  },
  bytes: [
     73,  32, 108, 111, 118,
    101,  32, 228, 184, 173,
    229, 155, 189
  ]
}
*/

const originStr = utf8.decode(result.hexStr)
const originStr = utf8.decode(result.buffer)
const originStr = utf8.decode(result.bytes)

// 'I love 中国'
```
