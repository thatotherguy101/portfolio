const Quote = require('../models/quote');

async function getQuote(req, res, next) {
    let quoteText;
    try {
        quoteText = await Quote.getRandomQuote();
    } catch (error) {
        return next(error);
    }

    return res.json({ quote: quoteText });
}

module.exports = { getQuote: getQuote };
