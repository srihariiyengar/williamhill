import { browser } from 'protractor';
import {defineSupportCode} from "cucumber";
import {getLoggedBrowserErrors} from "./BrowserLogs";
import {WindowHelper} from "./WindowHelper";

// Stores the Errors recorded from the browser logs used in the After Scenario output
let browserErrorLogs = [];

/**
 * Below is an overwrite method for browser.get();
 * Because browser logs are lost on use we store them before they are lost.
 */
const originalBrowserGet = browser.get;
browser.get = function () {
    return getLoggedBrowserErrors().then((loggedErrors) => {
        for(let i = 0 ; i < loggedErrors.length; i++) {
            browserErrorLogs.push(loggedErrors[i]);
        }
        return originalBrowserGet.apply(this, arguments);
    });
};

defineSupportCode(({After, registerHandler, setDefaultTimeout}) => {

    setDefaultTimeout(60 * 1000 * 3);

    /**
     * Adding deletion of cookies here as only log-out will not actually logout the user.
     * Forcing the User to Logout
     * reference: https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/event_handlers.md
     */
    registerHandler('BeforeScenario', async function () {
        await browser.manage().deleteAllCookies();
    });

    /**
     * After Scenario runs code after every scenario event.
     * reference: https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/event_handlers.md
     */
    After(async function () {
        //ScreenShot is a base-64 encoded PNG
        this.attach(new Buffer(await browser.takeScreenshot(), 'base64'), 'image/png');

        let loggedErrors = await getLoggedBrowserErrors();
        for(let i = 0 ; i < loggedErrors.length; i++) {
            browserErrorLogs.push(loggedErrors[i]);
        }

        //Attach only if we have 1 or more browser logs
        if(browserErrorLogs.length > 0) {
            let myJSONString = JSON.stringify(browserErrorLogs, undefined, 1);
            //Force the correct format for Browser's Stacktrace
            myJSONString = myJSONString.replace(/\\n/g, "\n");

            this.attach(myJSONString);
        }
        //Reset Console Error Collection for next Scenario
        browserErrorLogs = [];

        //Some tests open new tabs, ensure browser status is reset after screenshot is taken.
        await WindowHelper.closeOtherTabs();
    });
});