const
    moment = require('moment'),
    shortFormat = "D/MM/YYYY", //Some dates on the UI will be in this format
    defaultFormat = "L"; //Most dates should be in this format

moment.locale('en-AU'); //Set timezone to AU after instance is created to avoid MM/DD/YY format

export module DateTime {
    /**
     * @returns current timestamp in ISO format
     */
    export function getISOTimestamp () {
        return moment().format('YYYY-MM-DD[T]hh-mm-ss[Z]');
    }

    /**
     * @returns current date in ISO format
     */
    export function getCurrentISODate() {
        return moment().format('YYYY-MM-DD');
    }

    /**
     * Method that returns today's date, in format of Long ("DD/MM/YYYY") or Short ("D/MM/YYYY")
     * PropertyTree has a mixture depending on bugs in the UI
     * @param shortDate
     */
    export function getDateOfToday(shortDate? :boolean) {
        const formatString = shortDate ? shortFormat : defaultFormat;
        return moment().format(formatString);
    }
}