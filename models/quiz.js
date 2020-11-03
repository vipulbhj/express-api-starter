module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define(
    "quiz",
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Quiz.associate = (models) => {
    Quiz.hasMany(models.question);
  };

  return Quiz;
};
