$("#selectall>input").click(function() {
    if (selall) {
        $(".selectclient>input").prop("checked", false);
        selall = false;
    } else {
        $(".selectclient>input").prop("checked", true);
        selall = true;
    }
});

var addobj;
function addobjfunc() {
    addobj = {
        "LName": $("#lname").val(),
        "FName": $("#fname").val(),
        "Address": $("#address").val(),
        "Birthdate": $("#birthdate").val()
    }
    console.log(addobj);
    cllen = cllen + 1;
    jsonobj[cllen] = addobj;
    addClient(jsonobj[cllen], cllen);
}
$("#addbtn").click(function() {
    addobjfunc();
});
// TODO: add on submit functionality

$("#deleteselected").click(function() {
    const selected = [];
    $(".selectclient>input").each(function() {
        if ($(this).prop("checked")) {
            var markedclient = $(this).closest(".client");
            var selid = markedclient.attr("id");
            selected.push(selid);
            markedclient.remove();
        }
    });
    if (selected.length > 0) {
        for (let i = 0; i< selected.length; i++) {
            delete jsonobj[selected[i]];
        }
    }
});


$("#addclient").click(function() {
    slideIn($("#addclpanel"));
    prevposRember();
});
$("#closeaddcl").click(function() {
    slideOut($("#addclpanel"));
    prevposExecute();
});

$("#singleremove").click(function() {
    var markedclient = $("#cllist").children(".client").eq(clindex);
    var selid = markedclient.attr("id");
    selid = parseInt(selid);
    selid = selid + 1;
    selid = selid.toString();
    delete jsonobj[selid];
    markedclient.remove();
    $("#closeclinfo").click();
    $(".infofield").val("");
})


$("#addmenu").click(function() {
    slideIn($("#addmeetpanel"));
    $("#mainwrap").animate({
        scrollTop: 0
    }, 250, function() {
        $("#mainwrap").addClass("overflow-y-hidden");
    });
});
$("#closeaddmeet").click(function() {
    $(".addfieldmeet>input").val("");
    slideOut($("#addmeetpanel"));
    $("#mainwrap").removeClass("overflow-y-hidden");
});
$("#addmeetbtn").click(function() {
    // TODO: add meeting to db
    $(".addfieldmeet>input").val("");
    slideOut($("#addmeetpanel"));
    $("#mainwrap").removeClass("overflow-y-hidden");
})
