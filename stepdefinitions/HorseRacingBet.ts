import { defineSupportCode } from 'cucumber';
import {config} from "../config/config";
import {browser} from "protractor";
import {HomePage} from "../pages/homePage";
import {HorseRacing} from "../pages/horse-racing";

defineSupportCode(function ({Given, When, Then}) {
    Given(/^I navigate to the William Hill website$/, async () => {
        await browser.get(config.baseUrl);
        await HomePage.verifyPageTitle;
    });

    When(/^I click on the Racing link$/, async () => {
        await HomePage.clickRacingLink();
        await HorseRacing.verifyHorseRacingPage();
    });

    When(/^I click on any of the runners$/, async() => {
        await HorseRacing.clickPlaceBetButton();
    });

    When(/^I enter the Stake amount as (.+?)$/, async(betAmount: string) => {
        await HorseRacing.enterStakeAmount(betAmount);
    });

    When(/^I click on Add to Bet Slip$/, async() => {
        await HorseRacing.clickAddToBetSlip();
    });

    Then(/^I see the Bet Slip added with the (.+?)$/, async(amount: string) => {
        await HorseRacing.clickBetSlip();
        await HorseRacing.verifyTotalCostOnBetSlip(amount);
    });
});