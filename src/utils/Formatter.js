export const uploadedTime = (date) => {
    let ans = "";
    const thatDate = new Date(date);
    // Convert date to milliseconds
    var date1_ms = thatDate.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Date.now() - date1_ms;

    // Convert to seconds
    let difference = Math.round(difference_ms / 1000);
    if (difference > 31536000)
        ans = Math.round(difference / 31536000) + " years";

    else if (difference > 2630000)
        ans = Math.round(difference / 2630000) + " months";

    else if (difference > 86400)
        ans = Math.round(difference / 86400) + " days";

    else if (difference > 3600)
        ans = Math.round(difference / 3600) + " hours";

    else if (difference > 60)
        ans = Math.round(difference / 60) + " minutes";

    else
        ans = difference + " seconds";

    return ans;
}

export const duration = (rawFormat) => {
    let days = '00',
        hours = '00',
        minutes = '00',
        seconds = '00';
    let tmp = '';
    for (let char of rawFormat) {
        if (char === 'T' || char === 'P') {
            continue;
        }
        else if (char === 'D') {
            days = tmp;
            tmp = '';
        } else if (char === 'H') {
            hours = tmp;
            tmp = '';
        } else if (char === 'M') {
            minutes = tmp;
            tmp = '';
        } else if (char === 'S') {
            seconds = tmp;
            tmp = '';
        } else {
            tmp += char;
        }
    }
    days = days.padStart(2, '0');
    hours = hours.padStart(2, '0');
    minutes = minutes.padStart(2, '0');
    seconds = seconds.padStart(2, '0');
    return `${days}:${hours}:${minutes}:${seconds}`;
};

export const formatedTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    totalSeconds %= 60 * 60 * 24;

    const hours = Math.floor(totalSeconds / (60 * 60));
    totalSeconds %= 60 * 60;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let formattedTime = "";

    if (days > 0) {
        formattedTime += `${days}:`;
    }
    if (hours > 0) {
        formattedTime += `${hours}:`;
    }
    formattedTime += `${minutes}:${seconds}`;
    return formattedTime.trim();
}






