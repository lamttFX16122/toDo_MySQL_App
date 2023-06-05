/**
 * function convert minutes to String format 00g 00p
 * @param {int} minutes 
 * @returns 
 */
export const changeMinutesToHours = (minutes) => {
    let hours = parseInt(minutes / 60) > 0 ? `${parseInt(minutes / 60)}h` : '';
    let min = minutes % 60 > 0 ? `${minutes % 60}p` : '';
    return `${hours} ${min}`.trim().length > 0 ? `${hours} ${min}` : 0;
}
