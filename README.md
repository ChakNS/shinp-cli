<h2 align="left">vite-plugin-color</h2>

**English** | [中文文档](./README.zh_CN.md)

<p align="left">Automatically change colors and output theme packs for Vite</p>

## Usage

### Install

**node version:** >= 14.0.0

**vite version:** >= 2.0.0

```
yarn add vite-plugin-color -D

or

npm i vite-plugin-color -D
```

### Config

Add it to `vite.config.js`
```javascript
// vite.config.js
import viteColor from 'vite-plugin-color'

export default {
  plugins: [
    viteColor([
      {
        extract: ['#eee'],
        output: 'themes/triple-e.css',
        injectTo: 'head'
      }
    ])
  ]
}
```

## Options

The parameters can be a single object or an array of objects.

| param | type | required | default | desc |
| --- | --- | --- | --- | --- |
| extract | `string[]` | Y | - | The color value that needs to be extracted. Inline styles or styled are not supported at this time. |
| output | `string` | N | - | The file output path |
| external | `string[]` | N | - | External css file links like 'cdn' |
| minify | `boolean` | N | `true` | Whether to minify |
| minifyOptions | `<OptionsPromise>` | N | - | Minify options，follow `clean-css` |
| transform | `(code:string) => string` | N | - | The handler of the matching content |
| injectTo | `head` or `body` or `head-prepend` or `body-prepend` or `<HtmlTagDescriptor>` | N | - | Production environment auto-injects loaded css, supports customization, follows `vite HtmlTagDescriptor` |

## Reference

[webpack-theme-color-replacer](https://github.com/hzsrc/webpack-theme-color-replacer)

## License

MIT
