import {browser} from "protractor";

const whiteListedErrors = [browser.baseUrl + '/common/api/location/verifyAddress - Failed to load resource: the server responded with a status of 400'];

/**
 * Function used to collect browser logs, iterate through each, filtering white listed (unavoidable or expected errors)
 * Returns an array to be used in the hooks file for reporter output.
 *
 * Unfortunately cannot be made async as it is used in an override method for browser.get() which must receive a Promise
 * @returns {Promise<Array>}
 */
export function getLoggedBrowserErrors() {
    return browser.manage().logs().get('browser').then(function (browserLog) {
        const reportedErrors = [];

        if (browserLog.length > 0) {
            for (let i = 0; i < browserLog.length; i++) { //For each browser error
                let queryIndex = -1,
                    onWhiteList = false;

                //Make sure the error is not part of our whitelist. If it is sets onWhitelist to true via indexOf match
                for (let w = 0; w < whiteListedErrors.length; w++) {
                    onWhiteList = browserLog[i].message.indexOf(whiteListedErrors[w]) !== -1;
                    if (onWhiteList) {
                        break; //Exit out early if match found
                    }
                }

                //Check error against white-list (excluded errors e.g. google API verification failures)
                if (!onWhiteList) { //If not on white-list
                    for (let y = 0; y < reportedErrors.length; y++) { //For each already stored error we have
                        if (reportedErrors[y].errorText === browserLog[i].message) { //Check if it exists
                            queryIndex = y;
                            break;
                        }
                    }

                    if (queryIndex === -1) { //If it does not exist add it to our error list
                        reportedErrors.push({errorText: browserLog[i].message, errorCount: 1});
                    }
                    else { //If it does, just increment the count of the error
                        reportedErrors[queryIndex].errorCount++;
                    }
                }
            }
        }
        return reportedErrors;
    });
}