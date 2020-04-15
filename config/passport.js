var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a companyname/email and password
passport.use(
  new LocalStrategy(
    // Our company will sign in using an email, rather than a "companyname"
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // When a company tries to sign in this code runs
      db.Company.findOne({
        where: {
          email: email,
        },
      }).then(function (dbCompany) {
        // If there's no company with the given email
        if (!dbCompany) {
          return done(null, false, {
            message: "Incorrect email.",
          });
        }
        // If there is a company with the given email, but the password the company gives us is incorrect
        else if (!dbCompany.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        // If none of the above, return the company
        return done(null, dbCompany);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the company
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (company, cb) {
  cb(null, company);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
