$("document").ready(function () {

    $('.datepicker').datepicker({
        format: "d/mm/yyyy"
    });

    $(function () {
        $(".tablesorter").tablesorter();
    });

    $(".app-study-load").change(function () {
        $('.app-study-load').not(this).prop('checked', false);
    });
    
});