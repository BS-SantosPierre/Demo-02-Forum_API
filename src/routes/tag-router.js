const tagController = require('../controllers/tag-controller');
const authJWT = require('../middlewares/auth-middleware');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { tagValidator } = require('../validators/tag-validator');

const tagRouter = require('express').Router();

tagRouter.route('/')
	.get(tagController.getAll)
	.post(authJWT({ adminRight: true }), bodyValidation(tagValidator), tagController.add);

tagRouter.route('/:id')
	.get(tagController.getOne)
	.put(authJWT({ adminRight: true }), bodyValidation(tagValidator), tagController.update)
	.delete(authJWT({ adminRight: true }), tagController.delete);

module.exports = tagRouter;
