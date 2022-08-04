class ErrorResponse {
	constructor(message, status = 400){
		this.status = status;
		this.message = message;
	}
}

class NotFoundErrorResponse extends ErrorResponse {
	constructor(message) {
		super(message, 404);
	}
}

class InvalidFieldErrorsResponse extends ErrorResponse {
	constructor(message, fieldErrors, status = 422){
		super(message, status);
		this.fieldErrors = fieldErrors;
	}
}

module.exports = {
	ErrorResponse,
	NotFoundErrorResponse,
	InvalidFieldErrorsResponse
}
