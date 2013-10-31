# isg-document@0.0.1
Easy organization management document content.

## Install

* NPM `npm install isg-document`
* GIT `git clone https://github.com/isglazunov/isg-document.git`
* download from [releases](https://github.com/isglazunov/isg-document/releases)

## Require
Depends on the modules:
* [lodash@2.2.1](https://github.com/lodash/lodash)
* [isg-events@0.1.0](https://github.com/isglazunov/isg-events)

Indirect dependency
* [isg-connector@0.0.2](https://github.com/isglazunov/isg-connector)

The module can be connected using all supported module [isg-connector@0.0.2](https://github.com/isglazunov/isg-connector) methods.

### window (Browser)
```html
<script src="isg-document.js"></script>
```

### define (AMD/Requirejs)
```js
define(['isg-document.js'], function(isgDocument){});
```

### require (Node.js)
```js
var isgDocument = require('isg-document');
```

## Usage

### Available variables

#### isgDocument.version
Contains the current version of the module.

#### isgDocument.dependencies
Contains links to the required modules.

### new isgDocument;
```js
var document = new isgDocument({ name: 'isglazunov' });
```
or
```js
var MyDocument = function(){};
MyDocument.prototype = new isgDocument;
```

## Versions

### 0.0.1
To connect the module used [isg-connector@0.0.2](https://github.com/isglazunov/isg-connector).
The basic functionality.