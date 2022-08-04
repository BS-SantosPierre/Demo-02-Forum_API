const tagController = require('../controllers/tag-controller');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { tagValidator } = require('../validators/tag-validator');

const tagRouter = require('express').Router();

tagRouter.route('/')
	.get(tagController.getAll)
	.post(bodyValidation(tagValidator), tagController.add);

tagRouter.route('/:id')
	.get(tagController.getOne)
	.put(bodyValidation(tagValidator), tagController.update)
	.delete(tagController.delete);

module.exports = tagRouter;
