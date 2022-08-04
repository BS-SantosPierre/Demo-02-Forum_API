const { Op } = require("sequelize");
const db = require("../models");
const { decodeJWT } = require("../utils/jwt-utils");

const authJWT = (options = { adminRight: false }) => {
	return async (req, res, next) => {
		// Récuperation du header d'authenfication
		// -> Exemple de résultat: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..."
		const authHeader = req.headers['authorization'];

		// Récuperation du JWT
		const token = authHeader && authHeader.split(' ')[1];

		// Si aucun token n'a été recu, erreur 401.
		if (!token) {
				return res.sendStatus(401);
		}

		// Récuperation des données du JWT
		let tokenData;
		try {
				// Extraction des données
				tokenData = await decodeJWT(token);
		}
		catch (error) {
				// En cas d'erreur, envoi d'un erreur
				return res.sendStatus(403);
		}

		// Vérification des droits de l'utilisateur si le flag "AdminRight" est présent
		if (options.adminRight) {
				// Validation des droits via la base de donnée
				// -> Certitude d'avoir les données à jours
				const admin = await db.User.findOne({
						where: {
								[Op.and]: [
										{ id: tokenData.id },
										{ isAdmin: true }
								]
						}
				});

				// Erreur 403 si l'utilisateur n'a pas les droits
				if (!admin) {
						return res.sendStatus(403);
				}
		}

		// Ajout des infos du token a l'object "request" de Express
		req.user = tokenData;

		// On continue 🙂
		next();
	}
}

module.exports = authJWT;
