// In a file named utils.js
const faker = require('faker');

function generateRandomUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      dob: faker.date.past().toISOString(),
      location: {
        city: faker.address.city(),
        country: faker.address.country(),
      },
      gender: faker.random.arrayElement(['male', 'female']),
      address: faker.address.streetAddress(),

      // Generate  a placeholder image url
      avatar: faker.image.avatar()
    };
    users.push(user);
  }
  return users;
}

module.exports = {
  generateRandomUsers,
};