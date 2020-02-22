const cors = (req, res, next) => {
    // middelware to add header CROS to all querys
    res.append('Access-Control-Allow-Origin', ['*']); //All site/address allow
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // That method we allow
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

module.exports = {
    cors
}
