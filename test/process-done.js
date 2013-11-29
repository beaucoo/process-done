/*jshint node: true, expr:true */
/*global describe, beforeEach, it, require */

require('must');
var rewire = require('rewire');


describe("process must", function () {
    "use strict";

    var mod;
    var doneFunc;

    function setMock(hash) {
        mod.__set__(hash);
    }

    function stub() {
    }


    beforeEach(function (done) {
        mod = doneFunc = rewire("../lib/process-done");

        setMock({
            console: {
                log: stub,
                error: stub
            },
            process: {
                exit: stub
            }
        });

        done();
    });


    it("exit normally when there wasn't an error", function (done) {
        setMock({
            process: {
                exit: function (level) {
                    level.must.eql(0);
                    done();
                }
            }
        });

        doneFunc();
    });


    it("log when exiting normally", function (done) {
        setMock({
            console: {
                log: function (msg) {
                    msg.must.eql("Exited normally");
                    done();
                }
            }
        });

        doneFunc();
    });


    it("abnormally when there was an error", function (done) {
        setMock({
            process: {
                exit: function (level) {
                    level.must.eql(1);
                    done();
                }
            }
        });

        doneFunc("SOME_ERROR");
    });


    it("log when there was an error", function (done) {
        setMock({
            console: {
                error: function (format, err) {
                    format.must.eql("Exited with error: %s");
                    err.must.eql("SOME_ERROR");
                    done();
                }
            }
        });

        doneFunc("SOME_ERROR");
    });
});