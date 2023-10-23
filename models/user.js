"use strict";

const { Model } = require("sequelize");
const Transaction = require("./transaction");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Transaction, {
        foreignKey: "user_id",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        trim: true,
      },
      firstname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        trim: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      cvv: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      card_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
      underscored: true,
      timestamps: false,
    }
  );
  return User;
};
