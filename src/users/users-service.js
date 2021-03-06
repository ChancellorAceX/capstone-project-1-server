const xss = require('xss');
const bcrypt = require('bcryptjs');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  validatePassword(password) {
    if (password.length < 8) { return 'Password must be longer than 8 characters'; }
    if (password.length > 72) { return 'Password must be less than 70 characters'; }
    if (password.startsWith(' ') || password.endsWith(' ')) { return 'Password must not start or end with empty spaces'; }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) { return 'Password must contain 1 upper case, lower case, number, and special character'; }
    return null;
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },

  serializeUser(user) {
    return {
      uid: user.uid,
      fullname: xss(user.fullname),
      username: xss(user.username),
      nickname: xss(user.nickname),
      creation: user.creation
    };
  },

  hasUserWithUserName(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then(user => !!user);
  },

  getUserById(db, id) {
    return db
      .from('users')
      .select()
      .where('uid', id)
      .first();
  },

  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => UsersService.getUserById(db, user.uid));
  },
};

module.exports = UsersService;