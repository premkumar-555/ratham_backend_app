

const validateSession = (errorMsg) => {
    return async(req, res, next) => {
      let let missingFields = [...Object.keys(req.body).filter((ele) => !req.body[ele])];
      if (missingFields.length) {
      return res.status(400).send(`${errorMsg} ${missingFields.join(",")}!`);
    }
    next()
    }
}

module.exports = validateSession;