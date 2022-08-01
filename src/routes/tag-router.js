const tagController = require('../controllers/tag-controller');

const tagRouter = require('express').Router();

tagRouter.route('/')
	.get(tagController.getAll)
	.post(tagController.add);

tagRouter.route('/:id')
	.get(tagController.getOne)
	.put(tagController.update)
	.delete(tagController.delete);

module.exports = tagRouter;
