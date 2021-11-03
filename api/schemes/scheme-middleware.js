const Scheme = require("./scheme-model");
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  Scheme.findById(req.params.scheme_id)
    .then((scheme) => {
      if (scheme) {
        next();
      } else {
        next({
          status: 404,
          message: `scheme with scheme_id ${req.params.scheme_id} not found`,
        });
      }
    })
    .catch(next);
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const scheme_name = req.body.scheme_name;
  if (!scheme_name || scheme_name === "" || typeof scheme_name !== "string") {
    next({ status: 400, message: `invalid scheme_name` });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const instructions = req.body.instructions;
  const step_number = req.body.step_number;
  if (
    !instructions ||
    instructions === "" ||
    typeof instructions !== "string" ||
    typeof step_number !== "number" ||
    step_number < 1
  ) {
    next({ status: 400, message: "inavlid step" });
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
