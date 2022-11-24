/*
    INTEGRATION FIELDS

    Meeting info
        #clientnameinfo     Client full name    text
        #dateinfo           Meeting date        date
        #startinfo          Meeting start time  time
        #endinfo            Meeting end time    time
    
    Add Meeting
        #clientname         Client full name    text
            note, dropdown alternative as follows (commented out atm)
        #clientname         Client full name    select
        #date               Meeting date        date
        #start              Meeting start time  time
        #end                Meeting end time    time
        #addbtn             Add meeting         clickable div
*/

// Force hide and unhide active calendar view button
function suppress() {
    $(".fc-button-active").animate({
        opacity: 0
    }, 250);
}
function enable() {
    $(".fc-button-active").animate({
        opacity: 1
    }, 250);
}


function addMeeting() {
    var clientname = $("#clientname").val();
    var date = $("#date").val();
    var starttime = $("#start").val();
    var endtime = $("#end").val();
    console.log(clientname, date, starttime, endtime);

    var startdt = new Date(date + 'T' + starttime);
    var enddt = new Date(date + 'T' + endtime);
    console.log(startdt, enddt);

    calendar.addEvent({
        title: clientname,
        start: startdt,
        end: enddt
    });
}

function getTimeStr(dt) {
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12
    minutes = (minutes < 10 ? "0" : "") + minutes;
    hours = (hours < 10 ? "0" : "") + hours;
    return hours + ":" + minutes + " " + ampm;
}

var Calendar;
var calendarEl;
var calendar;
var eventid;
document.addEventListener('DOMContentLoaded', function() {
    Calendar = FullCalendar.Calendar;
    calendarEl = document.getElementById('calendar');

    // initialize the calendar
    calendar = new Calendar(calendarEl, {
        headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'listMonth,listWeek,listDay'
        },
        buttonText: {
            today: 'Today',
            month: 'Monthly',
            week: 'Weekly',
            day: 'Daily'
        },
        contentHeight: "auto",
        initialView: 'listDay',
        events: 'https://fullcalendar.io/api/demo-feeds/events.json',
        eventClick: function(info) {
            eventid = info.event.id;

            if (info.event.title == "Repeating Event" || info.event.title == "Click for Google") {
                alert("Not handled - Event type not used in actual prototype");
                return;
            }

            suppress();
            prevposRember();

            $("#clientnameinfo").text(info.event.title);
            
            eventstart = info.event.start

            var month = eventstart.getMonth() + 1;
            var date = eventstart.getDate();
            var year = eventstart.getFullYear();
            $("#dateinfo").text(date + '-' + month + '-' + year);
            
            $("#startinfo").text(getTimeStr(eventstart));
            $("#endinfo").text(getTimeStr(info.event.end));

            slideIn($("#meetinfopanel"));
        }
    });

    calendar.render();
});

$("#meetremove").click(function() {
    if (eventid != -1) {
        calendar.getEventById(eventid).remove();
        $("#closemeetinfo").click();
    }
    prevposExecute();
});
$("#closemeetinfo").click(function() {
    slideOut($("#meetinfopanel"));
    $(".fc-button-active").removeClass("forcehide");
    enable();
    prevposExecute();
})


$("#addmenu").click(function() {
    prevposRember();
    slideIn($("#addmeetpanel"));
});
$("#closeaddmeet").click(function() {
    slideOut($("#addmeetpanel"));
    prevposExecute();
    $(".addfield>input").val("");
})

$("#addbtn").click(function() {
    addMeeting();
    $(".addfield>input").val("");
    $("#closeaddmeet").click();
});

$("#joinmeet").click(function() {
    slideIn($("#jitsipanel"));
    $(".fc-button-active").addClass("forcehide");
    $("#main").animate({
        scrollTop: 0
    }, 250, function() {
        $("#main").addClass("overflow-y-hidden");
    });
});
$("#closejitsi").click(function() {
    slideOut($("#jitsipanel"));
    $("#main").removeClass("overflow-y-hidden");
});
