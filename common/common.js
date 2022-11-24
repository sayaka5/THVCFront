// Sidebar menu open
$("#menuopen").click(function() {
    $("#sidebar").removeClass("hidden sticky");
    $("#sidebar").addClass("absolute");
    $("#sidebar").css("left", "-16rem");
    $("#modalbg").removeClass("hidden");
    $("#menuclose").removeClass("hidden");
    $("#sidebar").animate({left:0}, 200);
});
// Sidebar menu close
$("#modalbg, #menuclose").click(function() {
    $("#modalbg").addClass("hidden");
    $("#menuclose").addClass("hidden");
    $("#sidebar").animate({left:"-16rem"}, 200, function() {
        $("#sidebar").addClass("hidden sticky");
        $("#sidebar").removeClass("absolute");
    });
});

// Panel helper functions
function slideIn(target) {
    target.removeClass("hidden");
    target.animate({
        left: 0,
        opacity: 1
    }, 250);
    $(".fc-button-active").animate({
        opacity: 0
    }, 250);
}
function slideOut(target) {
    target.animate({
        left: "25%",
        opacity: 0
    }, 250, function() {
        target.addClass("hidden");
    });
    $(".fc-button-active").animate({
        opacity: 1
    }, 250);
}

var prevpos;
function prevposRember() {
    prevpos = $("html").scrollTop();
    $("html").animate({
        scrollTop: 0
    }, 250);
    $("body").addClass("overflow-hidden");
}
function prevposExecute() {
    $("html").animate({
        scrollTop: prevpos
    }, 250);
    $("body").removeClass("overflow-hidden");
}
