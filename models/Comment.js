const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class Comment extends Model {}

Comment.init(
  {
    body: DataTypes.STRING,
    allowNull: false,
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
