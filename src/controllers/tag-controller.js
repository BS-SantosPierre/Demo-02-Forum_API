const { Request, Response } = require('express');
const db = require('../models');

const tagController = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
		const tags = await db.Tag.findAll();
		return res.status(200).json(tags);
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
			return res.status(404).json({ message: 'Tag not found', status: 404 });
		}

		return res.status(200).json(tag);
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	add: async (req, res) => {
		const { name } = req.body;
		const data = {
			name
		};
		const newTag = await db.Tag.create(data);
		return res.status(201).json(newTag);
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
		const id = parseInt(req.params.id);
		const { name } = req.body;

		const data = {
			name
		};

		const updatedTag = await db.Tag.update(data, {
			where: { id },
			returning: true
		});

		if (!updatedTag[1]) {
			return res.status(400).json({message: 'Bad request'})
		}

		const updatedValue = await db.Tag.findOne({where: {id}});

		return res.status(200).json(updatedValue);
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: (req, res) => {
		res.sendStatus(501);
	},
}

module.exports = tagController;
