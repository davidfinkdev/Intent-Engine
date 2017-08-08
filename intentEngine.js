/*
intentEngine.js
David Fink
@darkroastcreate
david@darkroastcreative.co
http://darkroastcreative.co
*/

class IntentEngine {

  constructor() {
    // Establish a set of variables for use with the engine
    var intent = this.getIntent();
    var nullIntent = true;
    var pages = this.getPages();
    var gotPages = false;
    var hasPages = false;
  }

  getIntent() {

    // Get query arguments from URI
    var $_GET = {},
      args = location.search.substr(1).split(/&/);
    for (var i = 0; i < args.length; ++i) {
      var tmp = args[i].split(/=/);
      if (tmp[0] !== "") {
        $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace("+", " "));
      }
    }

    // Assign intent property to the intent variable and set nullIntent variable accordingly
    this.intent = $_GET.intent;
    if (this.intent != null) {
      this.nullIntent = false;
      return this.intent;
    }
    this.nullIntent = true;
    return this.intent;
  }

  getPages() {

    // Clear page name array
    var pages = [];

    // Detect pages and add their names to the array
    $.each($(".page"), function(i) {
      pages.push($(this).attr("id"));
    });

    // Set gotPages to true
    this.gotPages = true;

    // If the array was populated with any pages, set hasPages to true
    if (pages.length > 0) {
      this.hasPages = true;
    }

    this.pages = pages;

  }

  hasPage(pageName) {

    // If the page list has already been retrieved, continue with checking for
    // the specified page, otherwise get the page list and try again
    if (this.gotPages) {
      if (this.hasPages && this.pages.indexOf(pageName) > -1) {
        return true;
      }
    }
    else {
      this.getPages();
      this.hasPage(pageName);
    }
    return false;

  }

  showIntentContent(transitionTime) {
    // check for the presence of parameters in the function call and act accordingly
    if (this.nullIntent) {
      this.intent = this.getIntent();
    }
    if (transitionTime == null) {
      transitionTime = 350;
    }

    // Hide all pages
    $.each($(".page"), function(i) {
      $(this).hide();
    });

    // Show the content associated with the current intent
    if(!this.nullIntent) {
      if (this.hasPage(this.intent)) {
        $("#" + this.intent).show(transitionTime);
        return;
      }
    }
    $("#default").show(transitionTime);

  }

}
