/**
 * validate email type
 */
export const valEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
/**
 * validate Password with minLenght is 3 and maxLenght is 12
 */
export const valPassword = new RegExp('^.{3,12}$');
/**
 * validate phone VN use Regex pattern
 * @param {*} phone 
 * @returns true if valid and false invalid
 */
export const valPhone = phone => {
    // Regex to match 10 digit Viet Nam phone number with country code prefix --> format: +84xxxxxxxxx
    const regexPhoneNumber1 = "^\\+(84)+([3|5|7|8|9])+\\d{8}$";
    // Regex to match 10 digit Viet Nam phone number --> format: 0xxxxxxxxx
    const regexPhoneNumber2 = "^(0)+([3|5|7|8|9])+\\d{8}$";
    const match1 = phone.match(regexPhoneNumber1) ? true : false;
    const match2 = phone.match(regexPhoneNumber2) ? true : false;
    if (match1 || match2) {
        return true;
    }
    else {
        return false;
    }
}

