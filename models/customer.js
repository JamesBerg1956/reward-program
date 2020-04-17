module.exports = function (sequelize, DataTypes) {
  const Customer = sequelize.define("Customer", {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // CompanyID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  });

  Customer.associate = function (models) {
    Customer.belongsTo(models.Company, {
      company_id: {
        allowNull: false,
      },
    });
    Customer.hasMany(models.rewardhistory, {});
  };
  return Customer;
};
