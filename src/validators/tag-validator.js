const yup = require('yup');

const tagValidator = yup.object().shape({
	name : yup.string().trim().required().max(50)
});

module.exports = {
	tagValidator
}
