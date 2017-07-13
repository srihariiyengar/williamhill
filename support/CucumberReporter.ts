import {DateTime} from "./DateTime";
import * as fs from 'fs';
import * as cucumberHtmlReporter from 'cucumber-html-reporter';
import * as path from "path";
import { mkdirp } from 'mkdirp';
import {browser} from "protractor";

const
    opn = require('opn'),
    jsonReports = path.resolve("./reports/json"),
    htmlReports = path.resolve("./reports/html"),
    targetJson = path.join(jsonReports, "results.json");
let
    cucumberReporterOptions = {
        theme: "bootstrap",
        jsonFile: targetJson,
        output: path.join(htmlReports, DateTime.getCurrentISODate(), DateTime.getISOTimestamp() + "_cucumber_report.html"),
        reportSuiteAsScenarios: true,
        metadata: {} // See generateMetaData() for values set
    };

export module CucumberReporter {
    /**
     * Returns the directory for JSON files to be stored, imported and used in config setup
     * @returns {string}
     */
    export function getJsonDir() {
        return targetJson;
    }

    /**
     * Generates the cucumber report (called at the end of the test via config)
     * Uses Opn to open as the default Open command via cucumber-html-reporter is buggy and doesn't work sometimes
     * @returns {Promise<void>}
     */
    export async function generateReport() {
        await cucumberHtmlReporter.generate(cucumberReporterOptions);
        await opn(cucumberReporterOptions.output);
    }

    /**
     * Creates the Report Folder if it does not exist
     */
    export async function ensureReportFolderExists() {
        if (!fs.existsSync(jsonReports)) {
            await mkdirp(jsonReports, function (err) {
                if (err) {
                    console.warn('Could not create directory for ' + jsonReports);
                }
            });
        }
    }

    /**
     * Sets MetaData object for Cucumber Reporter for Report Generation later
     * @returns {Promise<void>}
     */
    export async function generateMetaData(){
        const browserCapabilities = await browser.getCapabilities();
        let browserData = browserCapabilities.get('browserName') + " " + browserCapabilities.get('version');
        cucumberReporterOptions.metadata = {
            "Test Environment": browser.baseUrl,
            "Browser": browserData
        }
    }
}