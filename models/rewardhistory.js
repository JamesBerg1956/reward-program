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
    // Does not work SMH
    // rewardhistory.belongsTo(models.Customer, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "customer_id",
    //   },
    // });

    rewardhistory.belongsTo(models.Rewards);
    // Does not work SMH
    // rewardhistory.belongsTo(models.Rewards, {
    //   foreignKey: {
    //     allowNull: true,
    //     name: "reward_id",
    //   },
    // });

  };
  return rewardhistory;
};
