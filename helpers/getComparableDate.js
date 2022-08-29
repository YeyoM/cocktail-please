export default function getComparableDate (date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) {
    return `${year}-0${month}-${day}`;
  } else {
    if (day < 10) {
      return `${year}-${month}-0${day}`;
    } else {
      if (month < 10 && day < 10) {
        return `${year}-0${month}-0${day}`;
      } else {
        return `${year}-${month}-${day}`;
      }
    }
  }
}