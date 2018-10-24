$(document).ready(function() {
  // log the screen width on resize
  window.onresize = function(event) {
    console.log("window width: "+$(window).width()+"px");
  };

  $(".tab-button").on("click", function(){
    var selected = $(this).attr('id').replace('-button', '');

    // remove initially visible elements
    $("#main-ticket-button").hide();
    $("#high-priority-information-wrap").hide();

    // clear 'selected' and designate the currently selected tab-button
    $("#nav>li.selected").removeClass("selected");
    $(".sub-nav>li.selected").removeClass("selected");
    $(this).addClass("selected");

    // hide all tabs and show the selected tab
    $(".tab").hide();
    $("#"+selected).show();

    // show sub-navigation if relevant
    if($("#"+selected).hasClass("sub-navigable")) {
      $("#"+selected+"-sub-nav").show();
    } else if($("#"+selected).hasClass("sub-tab")) {
      // re-select the parent nav button to clarify sub-nav origin
      var parentNavButton = this.parentNode.id.replace('sub-nav', 'button');
      $("#"+parentNavButton).addClass("selected");
    } else {
      $(".sub-nav").hide();
    };
  });
});

document.addEventListener('unii:opened', function(event) {
  gtag('event', 'view_item', {'items': 'get-tickets'});
}, false);

init = function() {
  loadSpeakers();
  displayMailingList();
}

// load all abstracts
loadSpeakers = function() {
  // should be "member-of-the-lineup" i guess...?
  $.get("./speakers.html", function(template) {
    var types = ['lecture', 'workshop', 'ritual', 'techgnosis', 'art']
    for( var i in types ) {
      var type = types[i];
      var collection = abstracts.filter(object => object.type === type);
      console.log(collection);
      var speakerData = collection.map(function(abstract){
        return Mustache.to_html(template, abstract)
      })

      $("#lineup-wrap #"+type).html(speakerData);
    }
  }, "html");
}

goToPage = function(path){
  // update urls when clicking a link
  // github pages use a frameset which is fucked, that's the short version.
  top.window.location.href = path
  // send this as an event to google analytics
  gtag('event', 'page_view', {'page_path': path});
}

// display the mailing list sign-up form
displayMailingList = function() {
  $("#mailing-list-boop-boop").delay(1000).fadeIn(2000);
}

hideMailingList = function() {
  $("#mailing-list-boop-boop").fadeOut(200);
}
