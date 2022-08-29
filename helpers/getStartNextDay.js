export default function getNextDay (dayName){

	// The current day
	let date = new Date();
	date.setHours(0,0,0,0);
	let now = date.getDay();

	// Days of the week
	let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	// The index for the day you want
	let day = days.indexOf(dayName.toLowerCase());

	// Find the difference between the current day and the one you want
	// If it's the same day as today (or a negative number), jump to the next week
	let diff = day - now;

	if (diff === 0) {
		let a =	date.getTime()
		return new Date(a)
	}

	diff = diff < 1 ? 7 + diff : diff;

	// Get the timestamp for the desired day
	let nextDayTimestamp = date.getTime() + (1000 * 60 * 60 * 24 * diff);

	// Get the next day
	return new Date(nextDayTimestamp)
}