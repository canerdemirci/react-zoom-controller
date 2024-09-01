# react-zoom-controller

> Customizable React Zoom Controller (Typescript)

[![NPM](https://img.shields.io/npm/v/react-zoom-controller.svg)](https://www.npmjs.com/package/react-zoom-controller) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Features
- Zoom slider step size property
- Zoom slider points (25%, 50%, 75%, 100%)
- Zoom slider width property
- Zoom slider tooltip (optional)
- Zoom options (dropdown menu - accepts zoom value input) (optional)
- Customizable style

## Install

```bash
npm install --save cnr-react-pagination
```

## Usage

```tsx
import React, { Component } from 'react'

import Pagination from 'react-zoom-controller'

class Example extends Component {
  render() {
    return <ZoomController
          value={zoom}
          onChange={handleZoomControllerOnChange}
        />
  }
}
```

## License

MIT © [canerdemirci](https://github.com/canerdemirci)