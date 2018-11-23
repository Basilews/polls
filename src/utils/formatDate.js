// source code: https://stackoverflow.com/q/3552461

function formatDate(date) {
  const DateModel = new Date(date);

  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];

  const day = DateModel.getDate();
  const monthIndex = DateModel.getMonth();
  const year = DateModel.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
}

export default formatDate;
