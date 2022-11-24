$("#joinmeet").click(function() {
    slideIn($("#jitsipanel"));
    $("body").animate({
        scrollTop: 0
    }, 250, function() {
        $("body").addClass("overflow-y-hidden");
    });
});
$("#closejitsi").click(function() {
    slideOut($("#jitsipanel"));
    $("body").removeClass("overflow-y-hidden");
});
