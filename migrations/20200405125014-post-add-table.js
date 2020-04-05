'use strict';

module.exports = {
	up: function (queryInterface, DataTypes) {
		return queryInterface.createTable('posts', {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			company: {
				type: DataTypes.TEXT
			},
			company_logo: {
				type: DataTypes.TEXT
			},
			company_url: {
				type: DataTypes.TEXT
			},
			created_at: {
				type: DataTypes.DATE
			},
			createdAt: {
				type: DataTypes.DATE
			},
			updatedAt: {
				type: DataTypes.DATE
			},
			description: {
				type: DataTypes.TEXT
			},
			how_to_apply: {
				type: DataTypes.TEXT
			},
			location: {
				type: DataTypes.TEXT
			},
			title: {
				type: DataTypes.TEXT
			},
			type: {
				type: DataTypes.TEXT
			},
			url: {
				type: DataTypes.TEXT
			}
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable();
	}
};
