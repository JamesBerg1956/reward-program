module.exports = function (sequelize, DataTypes) {
    const RewardHistory = sequelize.define("RewardHistory", {
      points_change: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    });
  
    RewardHistory.associate = function (models) {
        RewardHistory.belongsTo(models.Customer, {
        customer_id: {
          allowNull: false,
        },
      });
      RewardHistory.belongsTo(models.Rewards, {
        reward_id: {
          allowNull: false,
        },
      });
    };
    return RewardHistory;
  };
  