/*\
title: $:/plugins/michaeljmcd/mermaid/wrapper.js
type: application/javascript
module-type: widget

FIXME

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var MermaidWidget = function(parseTreeNode, options) {
	this.initialise(parseTreeNode,options);
};

MermaidWidget.prototype = new Widget();

MermaidWidget.prototype.render = function(parent, nextSibling) {
	// Housekeeping
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();

	var div = this.document.createElement("div");

    var _insertSvg = function(svgCode, bindFunctions) {
        div.innerHTML = svgCode;
    };

    try {
        //mermaid.render('test1', 'graph TB\na-->b', _insertSvg);
        div.textContent = "I am here";
    } catch (ex) {
		div.className = "tc-error";
		div.textContent = ex;
    }

	// Insert the div into the DOM
	parent.insertBefore(div,nextSibling);
	this.domNodes.push(div);
};

exports.mermaid = MermaidWidget;

})();
