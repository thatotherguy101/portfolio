function getErrorData(req, defaultVals){
    let sessionInputs = req.session.inputData;

    if(!sessionInputs){
        sessionInputs = {
            hasError: false,
            ...defaultVals
        };
    }

    req.session.inputData = null;

    return sessionInputs;
}

function flashErrors(req, errInfo, action) {
    req.session.inputData = { hasError: true, ...errInfo };
    req.session.save(action);
}

module.exports = {getErrorData:getErrorData, flashErrors: flashErrors };
