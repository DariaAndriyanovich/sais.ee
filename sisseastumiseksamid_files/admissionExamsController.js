function changeIsTakingExam(element,elementIndex) {
    var self = $(element);
    $(":radio.AdmissionExamSchedule" + elementIndex).each(function (index, value) {
        if (self.is(':checked')) {
            value.checked = false;
            value.disabled = true;
        } else {
            value.disabled = false;
        }
    });
    $(":radio.CandidateApplicationExamCity" + elementIndex).each(function (index, value) {
        if (self.is(':checked')) {
            value.checked = false;
            value.disabled = true;
        } else {
            value.disabled = false;
        }
    });
};
