export default function getNextDay (dayName){

	// The current day
	let date = new Date();
	let now = date.getDay();

	// Days of the week
	let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	// The index for the day you want
	let day = days.indexOf(dayName.toLowerCase());

	// Find the difference between the current day and the one you want
	// If it's the same day as today (or a negative number), jump to the next week
	let diff = day - now;
	diff = diff < 1 ? 7 + diff : diff;

	// Get the timestamp for the desired day
	let nextDayTimestamp = date.getTime() + (1000 * 60 * 60 * 24 * diff);

	// Get the next day
	const nextDate = new Date(nextDayTimestamp);

  // Format the date
  const nextdDay = nextDate.getDate();
  const nextMonth = nextDate.getMonth() + 1;
  const nextYear = nextDate.getFullYear();

  // Return the date
  return `${nextMonth}/${nextdDay}/${nextYear}`;

}