const { Sequelize, DataTypes } = require('sequelize');
/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
	const Tag = sequelize.define('tag', {
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: {
				name: 'UK_Tag_Name'
			}
		}
	},{
		timestamps: false
	});

	return Tag;
}
