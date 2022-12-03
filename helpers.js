function getDate() {
  let date = new Date();
  const monthArray = [
      "January", "Febuary", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"
  ];
  const hours24 = date.getHours();
  const hours = (hours24 % 12) || 12; // Converts 24 hour time to 12 hour time
  const amOrPm = hours24 >= 12 ? 'pm' : 'am';
  date = {
      year: 1900 + date.getYear(),
      month: monthArray[date.getMonth()],
      day: date.getDate(),
      hours: hours,
      minutes: date.getMinutes().toString().padStart(2, '0'),
      amOrPm: amOrPm
  }
  return `${date.month} ${date.day}, ${date.year}, ${date.hours}:${date.minutes} ${amOrPm}`;
}

function getTime() {
  const date = new Date();
  const hours24 = date.getHours(); // Converts 24 hour time to 12 hour time
  const hours = (hours24 % 12) || 12;
  const amOrPm = hours24 >= 12 ? 'pm' : 'am';
  const time = {
    day: date.getDate(),
    hours: hours,
    amOrPm: amOrPm,
    minutes: date.getMinutes().toString().padStart(2, '0')
  }
  return `${time.hours}:${time.minutes}${time.amOrPm}`;
}

export {getDate, getTime}