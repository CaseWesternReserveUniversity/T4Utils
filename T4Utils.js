/* 
	Utility Javascript for T4 Javascript Content Processor
   	Ben Margevicius; bdm4@case.edu
	Version 0.1x 6/24/2015
   
	Github source: https://github.com/CaseWesternReserveUniversity/T4Utils/
    6/24/2015 - Initial

	Usage:
	1) Add a content type, modify the content layout, paste this at the top of your layout. 
	2) Your code will go below the T4Utils Object
	
	Examples:
	T4Utils.write("Some text"); 
	var sectionTitle = T4Utils.getSectionInfo.sectionTitle(section);
	var pathToRootArray = T4Utils.getSectionInfo.getRootPath(section);	
*/
 
importClass(com.terminalfour.publish.PathBuilder); //import the pathbuilder class

//IIFE for t4Utils. NOTE you can't use the window namespace for window.ns = window.ns || {} 
var T4Utils = (function (utils) {
  	/* T4Utils.write 
       Writes some text between some paragraph tags
    */
    utils.write = function(text)
    {
      document.write("<p>" + text + "</p>");
    }
    
    /* getSectionInfo namespace gets 
       information about a section. duh.       
    */
    utils.getSectionInfo = utils.getSectionInfo || {};
  	//getPublishLink will return the publishing Link 
    utils.getSectionInfo.getPublishLink = function () {
        return this.publishLink;
    };
    //sets the publishlink object
    utils.getSectionInfo.setPublishLink = function (section) {
        this.publishLink = PathBuilder.getLink(dbStatement, section, publishCache, language, isPreview); //cache the call         
    };
    
  	//gets the section title for the section passed in
    utils.getSectionInfo.sectionTitle = function (section) {
        this.setPublishLink(section);
        return this.publishLink.getText();
    };
  
  	//gets the url for the section passed in
    utils.getSectionInfo.sectionLink = function (section) {
        this.setPublishLink(section);
        return this.publishLink.getLink();
    };
  
  	//returns a fully formed anchor link for the section passed in
    utils.getSectionInfo.anchorLink = function (section) {
        this.setPublishLink(section);
        var theLink = this.publishLink.getLink();
        var theText = this.publishLink.getText();
        var myLink = '<a href="' + theLink + '">' + theText + '</a>';
        return myLink;
    };
   	
  
  //outputs the directory from "section" in a string format
   	utils.getSectionInfo.getDirectory = function(section) {
      	return PathBuilder.getDirectory(section, publishCache, language).toString();		
    }
    
  /*
  	GetRootPath(section, path)
    Usage T4Utils.getSectionInfo.getRootPath(section); //section is predefined in t4 as the section you are in. 
    Returns an array of sections until root. Including the current section.    
  */
    utils.getSectionInfo.getRootPath = function (nextNode, path) {             
      path = path || []; //if the path is empty create on e
      path.push(nextNode);  //add the next node
      var parentnode = nextNode.getParent();  //get the next node.    
      if (parentnode !== null) return this.getRootPath(parentnode, path); //if the next node is not nothing, get the next node and repeat until nothing. 
      else return path;  //when all the nodes have been gotten return the path. 
    };    
  
    return utils; //return out of the module 
})(T4Utils || {});