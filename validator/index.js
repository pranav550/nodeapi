exports.createPostValidator = (req, res, next) => {
  req.check("title", "title is required").notEmpty();
  req.check("title", "title must be b/w 4 to 20").isLength({
    min: 4,
    max: 20
  });
  req.check("body", "body is required").notEmpty();
  req.check("body", "body must be b/w 4 to 100").isLength({
    min: 4,
    max: 100
  });
  console.log("check1");
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
