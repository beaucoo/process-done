/*jshint node: true, expr:true */
/*global module, process */


module.exports = function done(err) {
    "use strict";

    if (err) {
        console.error("Exited with error: %s", err);
        process.exit(1);
    } else {
        console.log("Exited normally");
        process.exit(0);
    }
};