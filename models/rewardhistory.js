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
    rewardhistory.belongsTo(models.Customer);
    rewardhistory.belongsTo(models.Rewards);
    // Does not WORK!!!
    // rewardhistory.belongsTo(models.Customer, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "customer_id",
    //   },
    // });
    // rewardhistory.belongsTo(models.Rewards, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "reward_id",
    //   },
    // });
  };
  return rewardhistory;
};
