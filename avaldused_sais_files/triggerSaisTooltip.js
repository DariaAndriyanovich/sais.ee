$(document).ready(function () {
    var appStatus = $("#Application_ApplicationStatus_Value").val();

    if (!appStatus
        || appStatus === "0" // Uncompleted
        || appStatus === "70") // Reviewing
    {
        $('[sais-tooltip="tooltip"]').filter(function () {
            return $(this).attr('title') === '' || $(this).attr('title') == undefined;
        }).hide();

        $('[sais-tooltip="tooltip"]')
            .filter(function () { return $(this).attr('title') !== '' && $(this).attr('title') != undefined; })
            .addClass("glyphicon glyphicon-info-sign icon-tooltip-sais");

        $('[sais-tooltip="tooltip"]').filter(function () {
            return $(this).attr('title') !== '' && $(this).attr('title') != undefined;
        }).tooltip();
    }
});
