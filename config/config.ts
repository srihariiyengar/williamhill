import { browser, Config } from 'protractor';
import {CucumberReporter} from "../support/CucumberReporter";
import {readFileSync} from "fs";

const
    jsonDir = CucumberReporter.getJsonDir(),
    PDFJSExtension = readFileSync("pdfjs64.crx", { encoding: 'base64' });

export let config: Config = {

    //seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    directConnect: true,

    SELENIUM_PROMISE_MANAGER: false,

    baseUrl: 'https://www.williamhill.com.au/',

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'extensions': [PDFJSExtension],
            'args': [
                'disable-infobars'//,'headless=true','disable-gpu=true',
            ],
            'prefs': {
                'credentials_enable_service': false,
                'download': {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                }
            }
        },
        "loggingPrefs": {"browser": "SEVERE"}   //OFF, SEVERE, WARNING, INFO, DEBUG, ALL
    },

    allScriptsTimeout: 120000,

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../../features/**/*.feature'
    ],

    beforeLaunch: async () => {
        await CucumberReporter.ensureReportFolderExists();
    },

    onPrepare: async () => {
        await CucumberReporter.generateMetaData();
        browser.ignoreSynchronization = true;
        await browser.manage().window().maximize();
    },

    afterLaunch: async () => {
        await CucumberReporter.generateReport();
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        strict: true,
        format: ['pretty', `json:${jsonDir}`],
        require: ['../../stepdefinitions/**/**/*.ts','../../support/*.ts','../support/*.ts','../../stepdefinitions/*.ts','../../stepdefinitions/**/*.ts','../stepdefinitions/**/**/*.ts','../stepdefinitions/*.ts','../stepdefinitions/**/*.ts'],
        tags: '@SK'
    }
};