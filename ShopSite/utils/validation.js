function isUserInfoEntered(email, confirmEmail, password, name, address) {
    return email && confirmEmail && password && name && address;
}

function doEmailsMatch(email, confirmEmail) {
    return email === confirmEmail;
}

function isPasswordLongEnough(password) {
    return password.length > 9;
}

function isEmailFormatCorrect(email) {
    return email.includes('@');
}

function isProductInfoEntered(name, price, summary, description, imagePath) {
    return name && price && summary && description && imagePath;
}

function isUpdateInfoEntered(name, price, summary, description) {
    return name && price && summary && description;
}

function isPriceValid(price) {
    return !isNaN(price) && price >= 0;
}

function isSummaryShort(summary) {
    return summary.length < 26;
}

module.exports = {
    isUserInfoEntered: isUserInfoEntered,
    doEmailsMatch: doEmailsMatch,
    isPasswordLongEnough: isPasswordLongEnough,
    isEmailFormatCorrect: isEmailFormatCorrect,
    isProductInfoEntered: isProductInfoEntered,
    isPriceValid: isPriceValid,
    isSummaryShort: isSummaryShort,
    isUpdateInfoEntered: isUpdateInfoEntered,
};
