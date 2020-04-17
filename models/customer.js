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
  });
  //
  Customer.associate = function (models) {
    Customer.belongsTo(models.Company);
    Customer.hasMany(models.rewardhistory);
    //
    // Does not work!
    // Customer.belongsTo(models.Company, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "company_id",
    //   },
    // });
  };
  // The following DOES NOT work!!!!!  I do not know why!!!!
  //
  // Customer.associate = function (models) {
  //   Customer.belongsTo(models.Company, {
  //     company_id: {
  //       allowNull: false,
  //     },
  //   });
  //   Customer.hasMany(models.rewardhistory, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };
  return Customer;
};
