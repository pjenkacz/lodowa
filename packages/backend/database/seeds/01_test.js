/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      const plainTextPasswords = ['dupabiskupa', 'gigajajo', 'dzem1234' , 'kotek1123', '123'];
      const saltRounds = 10;

      const hashedPasswords = plainTextPasswords.map(plainTextPassword =>
        bcrypt.hashSync(plainTextPassword, saltRounds)
      );

      const users = [
        { email: 'dzamb12o@dzet.pl', id: 1, password: hashedPasswords[0] },
        { email: 'gggg22@dzet.pl', id: 2, password: hashedPasswords[1] },
        { email: 'hugo76@dzet.pl', id: 3, password: hashedPasswords[2] },
        { email: 'weronika@gmial.pl', id: 4, password: hashedPasswords[3] },
        { email: 'bajo@jajo.pl', id: 5, password: hashedPasswords[4] }

      ];

      return knex('users').insert(users);
    });
};
