window.onload = function () {
    $('.loader').hide();
};

function ShowPointsModal(applicationId) {
    $('#loader_' + applicationId).show();
    $('#PointsModalContainer').load("/Applications/_PointsModal?applicationId=" + applicationId, function () {
        $('#PointsModal').modal('show');
        $('#loader_' + applicationId).hide();
    });
}
