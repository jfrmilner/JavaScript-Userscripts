// ==UserScript==
// @name         Service Now - Project Engineer Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Project Engineer Helper
// @author       John Milner
// @match        https://onetimico.service-now.com
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


$(document).ready(function () {
    //1. Accept/Start
    $("#S1").click(function () {
        //iframe gsft_main
        var gsft_main = document.getElementById('gsft_main').contentWindow;

        //accept
        //Attempt to get the element using document.getElementById
        var acceptButton = gsft_main.document.getElementById("accept");

        //If it isn't "undefined" and it isn't "null", then it exists.
        if (typeof (acceptButton) != 'undefined' && acceptButton != null) {
            console.log('acceptButton exists!');
            acceptButton.click();
        } else {
            console.log('acceptButton does not exist!');
        }

        //start_work
        //var start_workButton = gsft_main.document.getElementById("start_work");
        //start_workButton.click();
        var checkExist = setInterval(function () {
            if (gsft_main.document.getElementById("start_work") && gsft_main.g_form) {
                console.log("start_work Exists!");
                gsft_main.document.getElementById("start_work").click();
                clearInterval(checkExist);
            }
            else {
                console.log('start_work does not exist!');
            }
        }, 100); // check every 100ms
    });

    //2. Work Start/End
    $("#S2").click(function () {
        //iframe gsft_main
        var gsft_main = document.getElementById('gsft_main').contentWindow;

        //chargeable
        var chargeable = gsft_main.document.getElementById("wm_task.u_ufi_chargeable");
        chargeable.value = "no";

        //actual_travel_start
        var ats = gsft_main.document.getElementById("wm_task.actual_travel_start");
        ats.value = gsft_main.document.getElementById("wm_task.window_start").value;

        //estimated_end
        var we = gsft_main.document.getElementById("wm_task.work_end");
        we.value = gsft_main.document.getElementById("sys_readonly.wm_task.estimated_end").value;

        //work_start
        var ws = gsft_main.document.getElementById("wm_task.work_start");
        ws.value = gsft_main.document.getElementById("wm_task.actual_travel_start").value;

        //save (update_and_stay)
        gsft_main.g_form.save();
    });

    //3. Work_Notes, Close
    $("#S3").click(function () {
        //iframe gsft_main
        var gsft_main = document.getElementById('gsft_main').contentWindow;

        //work_notes
        gsft_main.g_form.setValue('work_notes', 'Work Order Task competed successfully.');

        //close_complete
        var close_completeButton = gsft_main.document.getElementById("close_complete");
        close_completeButton.click();
    });

});


$('body').append('<input type="button" value="1. Accept/Start" id="S1">')
$("#S1").css("position", "fixed").css("top", 0).css("left", 200);

$('body').append('<input type="button" value="2. Work Start/End" id="S2">')
$("#S2").css("position", "fixed").css("top", 0).css("left", 300);

$('body').append('<input type="button" value="3. Work_Notes, Close" id="S3">')
$("#S3").css("position", "fixed").css("top", 0).css("left", 416);
