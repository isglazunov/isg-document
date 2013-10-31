// isg-document@0.0.1
// https://github.com/isglazunov/isg-document

(function(factory){
    
    // isg-connector@0.0.2
    (function(b,constructor,c,d){if(typeof(window)!=='undefined'){var e=[];for(var f in d){e.push(window[d[f]])}this[b]=constructor.apply(null,e)}if(typeof(define)!=='undefined'&&define.amd){var e=['module'];for(var f in c){e.push(c[f])}define(e,function(a){a.exports=constructor.apply(null,[].slice.call(arguments,1))})}if(typeof(module)!=='undefined'&&module.exports&&typeof(require)=='function'){var e=[];for(var f in c){e.push(require(c[f]))}module.exports=constructor.apply(null,e)}return constructor})(
        'isgDocument', factory, ['lodash', 'isg-events'], ['_', 'isgEvents']
    );
        
}.call(this, function(_, isgEvents){
    
    // Prototype
    var DocumentPrototype = function(){};
    DocumentPrototype.prototype = new isgEvents.Events;
    
    // Document
    var Document = function(data){
        if(_.isObject(data) && !_.isArray(data) && !_.isFunction(data)) this._isgDocument = data;
        else this._isgDocument = {};
    };
    Document.prototype = new DocumentPrototype;
    
    Document.version = '0.1.0';
    Document.dependencies = {
        _: _,
        isgEvents: isgEvents
    };
    
    // Methods
    
    // document.set(Object data[, Function callback]);
    // document.set({}, function(){ /* after events */ }).get().attr
    Document.prototype.set = function(data, callback){
        var self = this;
        
        // Strict typing argument Object data
        if(!_.isObject(data) && _.isArray(data) && _.isFunction(data)) throw new TypeError('wrong Object data argument');
        var prev = _.cloneDeep(self._isgDocument);
        _.merge(self._isgDocument, data);
        var exports = {};
        self.trigger('isg-document:set', [exports, _.cloneDeep(self._isgDocument), prev, _.cloneDeep(data)], function(){
            if(_.isFunction(callback)) callback(exports, _.cloneDeep(self._isgDocument), prev, _.cloneDeep(data));
        });
        return self;
    };
    
    // document.get([Function callback]);
    Document.prototype.get = function(callback){
        var self = this;
        
        self.trigger('isg-document:get', [exports, _.cloneDeep(self._isgDocument)], function(){
            if(_.isFunction(callback)) callback(exports, _.cloneDeep(self._isgDocument));
        });
        
        return self._isgDocument;
    };
    
    // document.reset(Object data[, Function callback]);
    // document.reset({}, function(){ /* after events */ }).get().attr
    Document.prototype.reset = function(data, callback){
        var self = this;
        
        // Strict typing argument Object data
        if(!_.isObject(data) && _.isArray(data) && _.isFunction(data)) throw new TypeError('wrong Object data argument');
        
        var prev = _.cloneDeep(self._isgDocument);
        self._isgDocument = data;
        var exports = {};
        
        self.trigger('isg-document:reset', [exports, _.cloneDeep(self._isgDocument), prev, _.cloneDeep(data)], function(){
            self.trigger('isg-document:set', [exports, _.cloneDeep(self._isgDocument), prev, _.cloneDeep(data)], function(){
                if(_.isFunction(callback)) callback(exports, _.cloneDeep(self._isgDocument), prev, _.cloneDeep(data));
            });
        });
        
        return self;
    };
    
    // document.unset([Function callback]);
    // document.unset(function(){ /* after events */ }).get() // {}
    Document.prototype.unset = function(callback){
        var self = this;
        var prev = _.clone(self._isgDocument);
        var data = {};
        self._isgDocument = data;
        var exports = {};
        
        self.trigger('isg-document:unset', [exports, _.cloneDeep(self._isgDocument), prev], function(){
            self.trigger('isg-document:reset', [exports, _.cloneDeep(self._isgDocument), prev, _.cloneDeep(data)], function(){
                self.trigger('isg-document:set', [exports, _.cloneDeep(self._isgDocument), prev, _.cloneDeep(data)], function(){
                    if(_.isFunction(callback)) callback(exports, _.cloneDeep(self._isgDocument), prev, _.cloneDeep(data));
                });
            });
        });
        
        return self;
    };
    
    return Document;
}));
