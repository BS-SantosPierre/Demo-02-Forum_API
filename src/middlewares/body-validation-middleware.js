const { InvalidFieldErrorsResponse } = require("../response-schemas/error-schema");

const bodyValidation = (yupValidator, errorCode = 422) => {
	return (req, res, next) => {
		yupValidator.validate(req.body, { abortEarly: false })
			.then((data) => {
				req.validatedData = data;
				next()
			})
			.catch((yupError) => {
				const errors = yupError.inner.reduce((acc, error) => {
					const { path, message} = error;
					if (!acc.hasOwnProperty(path)) {
						acc[path] = [message];
					}else {
						acc[path].push(message);
					}
					return acc;
				}, {});

				return res.status(422).json(new InvalidFieldErrorsResponse(
																				'Data Invalid',
																				errors,
																				errorCode));
			});
	}
}

module.exports = bodyValidation;
