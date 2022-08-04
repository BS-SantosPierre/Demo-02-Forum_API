const { Sequelize, DataTypes } = require('sequelize');
/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
	const User = sequelize.define('user', {
		pseudo: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: {
				name: 'UK_User_Pseudo'
			}
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: {
				name: 'UK_User_Email'
			}
		},
		password: {
			type: DataTypes.CHAR(60),
			allowNull: false
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	},{
		timestamps: true,
		updatedAt: false
	});

	return User;
}
