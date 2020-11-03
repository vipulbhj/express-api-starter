module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "question",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      options: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      correct_option: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Question.associate = (models) => {
    Question.belongsTo(models.quiz);
  };

  return Question;
};
