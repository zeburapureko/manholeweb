'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'エフ・アンド・オー・システムズ',
        pass: 'fosys',
        mail: 'info@fando.co.jp',
        telno:'0263728288',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '吉原尊夫',
        pass: 'yoshi',
        mail: 'yoshihara@fando.co.jp',
        telno:'09044613411',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
