import {browser, by, element} from "protractor";
const expect = require('chai').expect;

export module HorseRacing {
    const
        placeBetButton = element(by.xpath("//*[@id='app']/div/div[4]/div/div/div[2]/div/div[1]/div/div/div[2]/div[1]/div/div[2]/span[3]/button/span[2]")),
        stakeAmount = element(by.xpath("html/body/div[4]/div/div/div[2]/div[2]/div/div[2]/div/div[1]/div/div/input")),
        addToBetSlip = element(by.xpath("/html/body/div[4]/div/div/div[2]/div[2]/div/span/div[2]/button[2]")),
        betSlipView = element(by.xpath("//*[@id='app']/div/div[3]/div/div[1]/a[2]/span[1]")),
        totalCostOnBetSlip = element(by.xpath("//*[@id='app']/div/div[3]/div/div[2]/section/section/div[3]/span[2]/span"));
    let
        horseRacingPageUrl = 'https://www.williamhill.com.au/horse-racing';

    /**
     * function to verify if the horse racing
     * page is opened
     * @returns {Promise<void>}
     */
    export async function verifyHorseRacingPage() {
        expect(await browser.getCurrentUrl()).to.equal(horseRacingPageUrl);
    }

    /**
     * function to click on the Place Bet Button
     * @returns {Promise<void>}
     */
    export async function clickPlaceBetButton() {
        await browser.wait(browser.isElementPresent(placeBetButton));
        await placeBetButton.click();
    }

    /**
     * function to enter the Stake Amount
     * First we wait for the Div to load
     * Then we switch to the Div
     * And we enter the amount
     * @param betAmount
     * @returns {Promise<any>}
     */
    export async function enterStakeAmount(betAmount: string) {
        await browser.wait(browser.isElementPresent(stakeAmount));
        await browser.switchTo().activeElement();
        await stakeAmount.click();
        return await stakeAmount.sendKeys(betAmount);
    }

    /**
     * function to click on Add Bet Slip
     * @returns {Promise<void>}
     */
    export async function clickAddToBetSlip() {
        await addToBetSlip.click();
    }

    /**
     * function to click on Bet Slip in the Hope Page header
     * @returns {Promise<void>}
     */
    export async function clickBetSlip() {
        await betSlipView.click();
    }

    /**
     * function to verify the total cost on Bet Slip
     * @param amount
     * @returns {Promise<void>}
     */
    export async function verifyTotalCostOnBetSlip(amount: string) {
        expect(await totalCostOnBetSlip.getText()).to.equal(amount);
    }
}