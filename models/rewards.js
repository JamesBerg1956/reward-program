module.exports = function (sequelize, DataTypes) {
  const Rewards = sequelize.define("Rewards", {
    reward_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reward_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reward_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  });

  Rewards.associate = function (models) {
    Rewards.belongsTo(models.Company);
    Rewards.hasMany(models.rewardhistory);

    // Does not work!!!!
    // Rewards.belongsTo(models.Company, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "company_id",
    //   },
    // });
  };
  return Rewards;
};
