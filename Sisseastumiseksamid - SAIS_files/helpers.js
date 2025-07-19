 
// "{0}".format()
String.prototype.format = function () {
    var args = arguments;
    //can be given as string array
    if (Array.isArray(arguments[0])) {
        args = arguments[0];
    }
    return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
};

//replaceValues - given as string array.
//usage example in _SubmittedApplication.cshtml
function displayAlertMessage(alertMessage, replaceValues) {
    if (replaceValues)
        alertMessage = alertMessage.format(replaceValues);

    if (confirm(alertMessage)) {
        return true;
    } else {
        return false;
    }
}
