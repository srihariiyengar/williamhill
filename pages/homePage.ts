import {browser, by, element} from 'protractor';
//Chai will be used as the assertion library
const expect = require('chai').expect;

export module HomePage {
    let
        pageTitle = 'Sports Betting Online &amp; Horse Racing in Australia - William Hill';
        //horseRacingPageUrl = 'https://www.williamhill.com.au/horse-racing';

    const
        racingLink = element(by.xpath("//span[@data-reactid='76']"));

    /**
     * function to Verify the Page Title
     * @returns {Promise<void>}
     */
    export async function verifyPageTitle() {
        expect(await browser.getTitle()).to.equal(pageTitle);
    }

    /**
     * function to click on the Horse Racing Link
     * @returns {Promise<void>}
     */
    export async function clickRacingLink() {
        await racingLink.click();
    }
}