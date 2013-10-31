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

### The Concept

The module works with the data object type, including any other types of data. However, the root object can not be a function or an array, only object.

Data is stored at document._isgDocument.

If you use the methods of the module when working with document are recalled events to which you can subscribe.

### var document = new isgDocument(object);
Returns instance of Document.
```js
var document = new isgDocument({ name: 'isglazunov' });
```

### document.get([Function callback]);
Returns clone of `document._isgDocument`.

Raises an event `isg-document: get`.

When events are complete, will cause callback, if it was transmitted.

```js
document.on('isg-document:get', function(exports, documentNow){
    exports; // {}
    exports.temp = 'temporary variable';
    documentNow; // { name: 'isglazunov' }
}, {sync: true});
document.on('isg-document:get', function(next, exports, documentNow){
    exports.temp; // 'temporary variable'
    next();
});
document.get(function(exports, documentNow){
    exports.temp; // 'temporary variable'
    documentNow; // { name: 'isglazunov' }
}).name; // 'isglazunov'
```

### document.set(data[, Function callback]);
Returns document instance.

Variable data can only be an object, but not an array or a function.

Object data will be imposed [lodash@2.2.1](https://github.com/lodash/lodash) merge function to an existing document.

After the function is triggered event: `isg-document:set`.

When events are complete, will cause callback, if it was transmitted.

```js
document.on('isg-document:set', function(exports, documentNow, documentPrev, data){
    exports; // {}
    exports.temp = 'temporary variable';
    documentNow; // { name: 'isglazunov', setted: true }
    documentPrev; // { name: 'isglazunov' }
    data; // { setted: true }
}, {sync: true});
document.on('isg-document:set', function(next, exports, documentNow, documentPrev, data){
    exports.temp; // 'temporary variable'
    next();
});
document.set({ setted: true }, function(exports, documentNow){
    exports.temp; // 'temporary variable'
    documentNow; // { name: 'isglazunov', setted: true }
    documentPrev; // { name: 'isglazunov' }
    data; // { setted: true }
}).get().setted; // true
```

### document.reset(data[, Function callback]);
Returns document instance.

Variable data can only be an object, but not an array or a function.

`document._isgDocument` will be replaced by the object data.

After the function is triggered event: `isg-document:reset`, `isg-document:set`.

When events are complete, will cause callback, if it was transmitted.

```js
document.on('isg-document:reset', function(exports, documentNow, documentPrev, data){
    exports; // {}
    exports.temp = 'temporary variable';
    documentNow; // { resetted: true }
    documentPrev; // { name: 'isglazunov', setted: true }
    data; // { resetted: true }
}, {sync: true});
document.on('isg-document:set', function(next, exports, documentNow, documentPrev, data){
    exports.temp; // 'temporary variable'
    next();
});
document.reset({ resetted: true }, function(exports, documentNow){
    exports.temp; // 'temporary variable'
    documentNow; // { resetted: true }
    documentPrev; // { name: 'isglazunov', setted: true }
    data; // { resetted: true }
}).get().setted; // true
```

### document.unset([Function callback]);
Returns document instance.

`document._isgDocument` will be replaced by {};

After the function is triggered event: `isg-document:unset`, `isg-document:reset`, `isg-document:set`.

When events are complete, will cause callback, if it was transmitted.

```js
document.on('isg-document:unset', function(exports, documentNow, documentPrev){
    exports; // {}
    exports.temp = 'temporary variable';
    documentNow; // {}
    documentPrev; // { resetted: true }
}, {sync: true});
document.on('isg-document:set', function(next, exports, documentNow, documentPrev, data){
    exports.temp; // 'temporary variable'
    next();
});
document.unset(function(exports, documentNow){
    exports.temp; // 'temporary variable'
    documentNow; // {}
    documentPrev; // { resetted: true }
    data; // {}
}).get(); // {}
```

## Versions

### 0.0.1
To connect the module used [isg-connector@0.0.2](https://github.com/isglazunov/isg-connector).
The basic functionality.