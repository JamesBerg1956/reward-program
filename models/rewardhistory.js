module.exports = function (sequelize, DataTypes) {
  const rewardhistory = sequelize.define(
    "rewardhistory",
    {
      // timestamps: false,
      // freezeTableName: true,
      points_change: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // customer_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // reward_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
    },
    {
      // timestamps: false, <- This DOES work!!!  SMH
      //  freezeTableName: true, <- This does not work???
    }
  );

  rewardhistory.associate = function (models) {
    //
    rewardhistory.belongsTo(models.Customer);
    //
    rewardhistory.belongsTo(models.Rewards);
    //
    // The following does not work and I dont know why!!!!
    //
    // rewardhistory.belongsTo(models.Customer, {
    //   foreignKey: {
    //     allowNull: false,
    //   },
    // });
    //
    // rewardhistory.belongsTo(models.Rewards, {
    //   foreignKey: {
    //     allowNull: false,
    //   },
    // });
  };
  return rewardhistory;
};
