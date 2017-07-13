import {browser} from "protractor";

export module WindowHelper {
    /**
     * Function is designed to focus on a new window (browser tab) for pages like change user details or PDF Reports.
     * @param windowIndex
     * @param isAngular
     * @returns {Promise<void>}
     */
    export async function setFocusOnTabNumber(windowIndex: number, isAngular: boolean = true) {
        if(windowIndex === 0) {
            throw new Error('0 is not a valid value for setFocusOnTabNumber');
        }

        // Value passed will be not index relative, i.e. Tab number 2 = index 1, so reduce by 1
        windowIndex = windowIndex - 1;

        let handles = await browser.driver.getAllWindowHandles();
        await browser.driver.switchTo().window(handles[windowIndex]);

        await browser.waitForAngularEnabled(isAngular);
        if(isAngular) {
            await browser.waitForAngular();
        }
    }

    /**
     * Closes all other Tabs except for index 0 in the array which is assumed to be the Main Tab
     * @returns {Promise<void>}
     */
    export async function closeOtherTabs() {
        let handles = await browser.driver.getAllWindowHandles();

        //Only perform if more than one Tab is open
        if(handles.length > 1) {
            //Close all windows starting from highest index first (reverse loop)
            for (let index = handles.length - 1; index > 0; --index) {
                await browser.driver.switchTo().window(handles[index]);
                await browser.driver.close();
            }

            await setFocusOnTabNumber(1);
        }
    }
}