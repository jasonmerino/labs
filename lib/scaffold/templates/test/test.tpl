/**
*    <%= cname %><%= clayer %>Test Module
*    @author <%= authorName %> <<%=authorEmail %>>
*    @desc <Description>
**/

var libpath = process.env['UT'] ? '<%= appfolder %>-cov/' : '<%= appfolder %>/',
    path = require('path'),
    should = require('should'),
    assert = require('assert');

/**
*    IMPORTANT NOTES TO KEEP IN MIND:
*
*    1) Always use 'libpath' for importing the module (and dependency modules) you want to test.
*    2) MURPHY RULE: Always expect the 'unexpected' in terms of a javascript object state or behavior. So,
*    DON'T ASSUME ONLY the 'ideal state' of an object while writing unit tests, OK? ;).
*    3) For Integration Tests against a database engine or any long running process, please use the asynchronous tests definition described down below.
*    4) After you complete all your test cases, please take an extra ~10 minutes to review them.
*    5) USE the CodeCoverage tool provided as a guide to evaluate how efficient your unit tests are. Available here: http://localhost:[port]/coverage/coverage.html
*    6) First time using mocha and should.js??? Here some good documentation:
*        - mocha (http://visionmedia.github.io/mocha/)
*        - should.js (https://github.com/visionmedia/should.js)
*    7) If you don't follow these instructions, please go to (http://24.media.tumblr.com/tumblr_ljx6bevWRs1qb42o2o1_500.gif)
**/
var <%= cname %> = require(path.resolve(libpath, '<%= layer %>/<%= name %>_<%= layer%>'));

/**
*    @class <%= cname %><%= clayer %>Test
*    @classdesc <TestClassDescription>
**/
describe('<%= cname %><%= clayer %>', function() {
    
    /**
    *    Pre/Post Unit test processing helpers:
    *    
    *    before(function(done) { });
    *    after(function(done) { });
    *    beforeEach(function(done) { });
    *    afterEach(function(done) { });
    **/
    
    /**
    *    Example Test Unit for a method.
    **/
    describe('#method()', function() {
        
        /**
        *    Synchronous Test Example
        **/
        it('<TestDescription>', function() {
            // Synchronous code
        });
        
        /**
        *    Asynchronous Test Example
        **/
        it('<TestDescription>', function(done) {
            // Asynchronous code
            setTimeout(function() {
                done();
            }, 2000);
        });
        
    });
    
    //...

});