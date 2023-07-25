const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const writeUsersToCsv = (usersData) => {
  const csvWriter = createCsvWriter({
    path: 'usersData.csv',
    header: [
      { id: 'id', title: 'ID' },
      { id: 'name', title: 'Name' },
      { id: 'email', title: 'Email' },
      { id: 'phone', title: 'Phone' },
      { id: 'dob', title: 'Date of Birth' },
      { id: 'location.city', title: 'City' },
      { id: 'location.country', title: 'Country' },
      { id: 'gender', title: 'Gender' },
      { id: 'address', title: 'Address' },
      { id: 'avatar', title: 'Avatar' }
    ],
  });

  return csvWriter.writeRecords(usersData);
};

module.exports = {
  writeUsersToCsv,
};