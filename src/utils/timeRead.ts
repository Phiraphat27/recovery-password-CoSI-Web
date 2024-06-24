export function hoursToHumanReadable(hours: number, short: boolean = false) {
    const minutesPerHour = 60;
    const secondsPerMinute = 60;

    const hoursPart = Math.floor(hours);
    const remainingMinutes = (hours - hoursPart) * minutesPerHour;
    const minutesPart = Math.floor(remainingMinutes);
    const secondsPart = Math.round((remainingMinutes - minutesPart) * secondsPerMinute);

    let result = '';

    if (hoursPart > 0) {
        result += !short ? `${hoursPart} hour${hoursPart > 1 ? 's' : ''} ` : `${hoursPart}h `;
    }

    if (minutesPart > 0) {
        result += !short ? `${minutesPart} minute${minutesPart > 1 ? 's' : ''} ` : `${minutesPart}m `;
    }

    if (secondsPart > 0) {
        result += !short ? `${secondsPart} second${secondsPart > 1 ? 's' : ''}` : `${secondsPart}s`;
    }

    result = result == "" ? "0 second" : result;

    return result.trim();
}
