// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
//
module.exports = function (sequelize, DataTypes) {
  const Company = sequelize.define("Company", {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    company_name: {
      type: DataTypes.STRING,
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //
    active: {
      type: DataTypes.BOOLEAN,
    },
  });

  Company.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Company.hasMany(models.Rewards, {});
    Company.hasMany(models.Customer, {});
  };
  //
  // Creating a custom method for our Company model. This will check if an unhashed password entered by the Company can be compared to the hashed password stored in our database
  Company.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  //
  // Hooks are automatic methods that run during various phases of the Company Model lifecycle
  // In this case, before a Company is created, we will automatically hash their password
  Company.addHook("beforeCreate", function (company) {
    company.password = bcrypt.hashSync(
      company.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return Company;
};
