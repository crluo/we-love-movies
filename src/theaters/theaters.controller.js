const service = require("./theaters.service");

/**
 * responds with all theaters and all movies showing
 */
async function list(req, res, next) {
    const theaters = await service.list();
    res.json({ data: theaters });
}

module.exports = {
    list,
}