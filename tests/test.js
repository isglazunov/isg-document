describe('isg-document', function(){
    it('should be equal', function(done){
        var document = new isgDocument({ a: { b: 'c' } });
        
        async.series([
            function(callback){
                document.once('isg-document:set', function(exports, now, prev){
                    now.should.be.eql({ a: { b: 'c', d: { e: 'f' } } });
                    prev.should.be.eql({ a: { b: 'c' } });
                    callback();
                }, {sync: true});
                document.set({ a: { d: { e: 'f' } } });
            },
            function(callback){
                document.once('isg-document:set', function(exports, now, prev){
                    now.should.be.eql({ a: { b: 'c', d: { e: 'f', i: 'j' } } });
                    prev.should.be.eql({ a: { b: 'c', d: { e: 'f' } } });
                    callback();
                }, {sync: true});
                document.set({ a: { d: { i: 'j' } } });
            },
            function(callback){
                document.once('isg-document:get', function(exports, now){
                    now.should.be.eql({ a: { b: 'c', d: { e: 'f', i: 'j' } } });
                    callback();
                }, {sync: true});
                document.get().should.be.eql({ a: { b: 'c', d: { e: 'f', i: 'j' } } });
            },
            function(callback){
                document.once('isg-document:reset', function(exports, now, prev){
                    now.should.be.eql({ a: { e: 'f' } });
                    prev.should.be.eql({ a: { b: 'c', d: { e: 'f', i: 'j' } } });
                }, {sync: true});
                document.once('isg-document:set', function(exports, now, prev){
                    now.should.be.eql({ a: { e: 'f' } });
                    prev.should.be.eql({ a: { b: 'c', d: { e: 'f', i: 'j' } } });
                    callback();
                }, {sync: true});
                document.reset({ a: { e: 'f' } });
            },
            function(callback){
                document.once('isg-document:get', function(exports, now){
                    now.should.be.eql({ a: { e: 'f' } });
                    callback();
                }, {sync: true});
                document.get().should.be.eql({ a: { e: 'f' } });
            },
            function(callback){
                document.once('isg-document:unset', function(exports, now, prev){
                    exports.should.be.eql({});
                    exports.a = 'b';
                    now.should.be.eql({});
                    prev.should.be.eql({ a: { e: 'f' } });
                }, {sync: true});
                document.once('isg-document:reset', function(exports, now, prev){
                    exports.should.be.eql({ a: 'b' });
                    now.should.be.eql({});
                    prev.should.be.eql({ a: { e: 'f' } });
                }, {sync: true});
                document.once('isg-document:set', function(exports, now, prev){
                    exports.should.be.eql({ a: 'b' });
                    now.should.be.eql({});
                    prev.should.be.eql({ a: { e: 'f' } });
                }, {sync: true});
                document.unset(function(exports, now, prev){
                    exports.should.be.eql({ a: 'b' });
                    callback();
                });
            },
            function(callback){
                document.once('isg-document:get', function(exports, now){
                    exports.should.be.eql({});
                    exports.a = 'b';
                    now.should.be.eql({});
                }, {sync: true});
                document.get(function(exports, now){
                    exports.should.be.eql({ a: 'b' });
                    now.should.be.eql({});
                    callback();
                }).should.be.eql({});
            }
        ], done)
    });
});