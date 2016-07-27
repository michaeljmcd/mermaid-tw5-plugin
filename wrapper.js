/*\
title: $:/plugins/michaeljmcd/mermaid/wrapper.js
type: application/javascript
module-type: widget

Wrapper for Mermaid that provides a `<$mermaid>` widget.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget,
    mermaidAPI = null;

if ($tw.browser) {
    mermaidAPI = require("$:/plugins/michaeljmcd/mermaid/mermaidAPI.min.js");
}

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
	var source = this.getAttribute("text",this.parseTreeNode.text || "");

    var _insertSvg = function(svgCode, bindFunctions) {
        div.innerHTML = svgCode;
    };

    try {
        mermaidAPI.render('test1', source, _insertSvg);
        // TODO: do something sensible with ID.
    } catch (ex) {
		div.className = "tc-error";
		div.textContent = ex;
    }

	// Insert the div into the DOM
	parent.insertBefore(div,nextSibling);
	this.domNodes.push(div);
};

MermaidWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes.text) {
		this.refreshSelf();
		return true;
	}
	return false;	
};

exports.mermaid = MermaidWidget;

})();
