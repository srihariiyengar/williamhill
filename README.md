[![CircleCI](https://circleci.com/gh/igniteram/protractor-cucumber-typescript/tree/master.svg?style=shield)](https://circleci.com/gh/igniteram/protractor-cucumber-typescript/tree/master)

### Protractor-Cucumber-TypeScript Setup Guide   
This project demonstrates the basic protractor-cucumber-typescript framework project setup.

### Features
* No typings.json or typings folder, they have been replaced by better **'@types'** modules in package.json
* ts-node(typescript execution environment for node) in cucumberOpts. 
* All scripts written with > Typescript2.0 $ Cucumber2.0
* Neat folder structures with transpiled js files in separate output folder.
* Page Object design pattern implementation
* Extensive hooks implemented for BeforeFeature, AfterScenarios etc.
* Screenshots on failure feature scenarios


### To Get Started

#### Pre-requisites
1.NodeJS installed globally in the system.
https://nodejs.org/en/download/

2.Chrome or Firefox browsers installed.

3.Text Editor(Optional) installed-->Sublime/Visual Studio Code/Brackets.

#### Setup Scripts
* Clone the repository into a folder
* Go inside the folder and run following command from terminal/command prompt
```
   npm install 
```
* All the dependencies from package.json and ambient typings would be installed in node_modules folder.

#### Run Scripts

* First step is to fire up the selenium server which could be done in many ways,  **webdriver-manager** proves very handy for this.

```
npm run webdriver-update
``` 
That should download the **chrome & gecko driver** binaries locally for you!

```
npm run webdriver-start
```
That should start your selenium server!

```
npm run tsc
```
The above command would create an output folder named 'typeScript' and transpile the .ts files.
```
npm test
```
It launches the Chrome Browser and run the scripts

```