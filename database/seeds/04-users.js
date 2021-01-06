exports.seed = function (knex, Promise) {
  return knex('users').insert([
    { username: 'olivia1', password: '123456' }, // 1
    { username: 'olivia2', password: '112233' }, // 2
  ]);
};
