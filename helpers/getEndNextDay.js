function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

export default function getEndNextDay (date){
  return addHours(24, date)
}