module.exports = function (sequelize, DataTypes) {
  const rewardhistory = sequelize.define(
    "rewardhistory",
    {
      points_change: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // timestamps: false, <- This DOES work!!!  SMH
      //  freezeTableName: true, <- This does not work???
    }
  );

  rewardhistory.associate = function (models) {
    rewardhistory.belongsTo(models.Customer);
    rewardhistory.belongsTo(models.Rewards);
  };
  return rewardhistory;
};
