module.exports = function (sequelize, DataTypes) {
  const Company = sequelize.define("Company", {
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [10],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    Company_name: {
      type: DataTypes.STRING,
    },
  });

  Company.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Company.hasMany(models.Rewards, {});
  };

  return Company;
};
