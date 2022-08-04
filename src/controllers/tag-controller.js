const { Request, Response } = require('express');
const db = require('../models');
const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const { SuccessObjectResponse, SuccessArrayResponse } = require('../response-schemas/success-schema');

const tagController = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
		const data = await db.Tag.findAndCountAll();

		return res.status(200).json(new SuccessArrayResponse(data.rows, data.count));
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	getOne: async (req, res) => {
		const id = parseInt(req.params.id);

		const tag = await db.Tag.findOne({
			where: { id }
		});

		if (!tag) {
			return res.status(404).json(new NotFoundErrorResponse('Tag not found'));
		}

		return res.status(200).json(new SuccessObjectResponse(tag));
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	add: async (req, res) => {
		const data = req.validatedData;

		const newTag = await db.Tag.create(data);
		return res.status(201).json(new SuccessObjectResponse(newTag, 201));
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
		const id = parseInt(req.params.id);

		const data = req.validatedData;

		const updatedTag = await db.Tag.update(data, {
			where: { id },
			returning: true
		});

		if (!updatedTag[1]) {
			return res.status(400).json(new ErrorResponse('Bad Request'));
		}

		const updatedValue = await db.Tag.findOne({where: {id}});

		return res.status(200).json(new SuccessObjectResponse(updatedValue));
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {
		const id = parseInt(req.params.id);

		const nbRow = await db.Tag.destroy({
			where: { id }
		});

		if (nbRow !== 1) {
			return res.status(404).json(new NotFoundErrorResponse('Tag not found'));
		}

		return res.sendStatus(204);
	},
}

module.exports = tagController;
