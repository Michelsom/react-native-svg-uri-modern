Here’s a refactored and improved version of your README.md with clearer formatting, better code highlighting, and more concise instructions:

---

# React Native SVG URI Modern

A modern, maintained React Native component to render SVG images from a URI or direct SVG content. This serves as a spiritual successor to the deprecated `react-native-svg-uri` package.

## Features

- Load SVG from a URI or direct SVG content
- TypeScript support
- Caching system
- Loading states
- Error handling
- Custom styling
- Fill and stroke color customization
- Timeout configuration
- Custom headers support

## Installation

```bash
npm install react-native-svg-uri-modern react-native-svg
# or
yarn add react-native-svg-uri-modern react-native-svg
```

### iOS Setup

```bash
cd ios && pod install
```

## Usage

### Basic

```tsx
import SvgUriModern from 'react-native-svg-uri-modern';

// From URI
<SvgUriModern
  source="https://example.com/icon.svg"
  width={100}
  height={100}
/>

// From SVG content
<SvgUriModern
  source="<svg>...</svg>"
  width={100}
  height={100}
/>

// With object source
<SvgUriModern
  source={{ uri: "https://example.com/icon.svg" }}
  width={100}
  height={100}
/>
```

### Advanced

```tsx
<SvgUriModern
  source="https://example.com/icon.svg"
  width={100}
  height={100}
  fill="#FF0000"
  stroke="#00FF00"
  showLoading
  cache
  timeout={5000}
  headers={{ Authorization: 'Bearer token' }}
  onLoad={() => console.log('SVG loaded')}
  onError={error => console.error('SVG error:', error)}
  style={{ margin: 10 }}
/>
```

## Props

| Prop              | Type                     | Default   | Description                 |
|-------------------|--------------------------|-----------|-----------------------------|
| `source`          | `string \| { uri: string }` | -         | SVG URI or SVG content      |
| `width`           | `number \| string`       | `100`     | Width of the SVG            |
| `height`          | `number \| string`       | `100`     | Height of the SVG           |
| `fill`            | `string`                 | -         | Fill color                  |
| `stroke`          | `string`                 | -         | Stroke color                |
| `showLoading`     | `boolean`                | `true`    | Show loading indicator      |
| `loadingComponent`| `React.ReactNode`        | -         | Custom loading component    |
| `onLoad`          | `() => void`             | -         | Callback when loaded        |
| `onError`         | `(error: Error) => void` | -         | Callback on error           |
| `style`           | `ViewStyle`              | -         | Container style             |
| `cache`           | `boolean`                | `true`    | Enable caching              |
| `timeout`         | `number`                 | `10000`   | Request timeout (ms)        |
| `headers`         | `Record<string, string>` | `{}`      | Custom request headers      |

# react-native-svg-uri-modern

An improved and modernized fork of [react-native-svg-uri](https://github.com/vault-development/react-native-svg-uri), bringing updated compatibility, maintenance, and support for recent versions of React Native.

## Why does this fork exist?

The original package [`react-native-svg-uri`](https://github.com/vault-development/react-native-svg-uri) is no longer maintained and may present incompatibilities with current versions of React Native. This modernized version aims to:

- Fix bugs, warnings, and compatibility issues
- Update dependencies
- Improve documentation and examples
- Ensure the community continues to have access to a functional SVG URI component

## License

This project is licensed under the ISC license. See the [LICENSE](./LICENSE) file for details.

---

## Credits

This project is based on [react-native-svg-uri](https://github.com/vault-development/react-native-svg-uri) (ISC License).

Special thanks to the original authors and the open source community.
