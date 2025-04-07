## Loan management system - Kioko test

This repo collates required files for the basic lending system.

Cloned from https://github.com/Incourage-Insurance-Ltd/QA-Loan-Management-System


## Server
wkdir server/

### SetUp
#### Added/Modified files/processes

1. Database.sql has been updated and corrected the errors for initialization
2. Node modules removed from repository, by .gitignore
3. ```Index.js``` has been split into 2 files, ```index.js``` and ```app.js``` to accommodate jest tests in file ```loans.test.js``` . When in one file, calling ```app.listen()``` at the end of file does not return app instance due to the database pool connection tied to it.
4. ```app.js``` has been updated to add return statements so as to prevent hanging of requests, especially on errors



### API AND DATABASE DATA TESTS
API tests have been created and run using .... package;
To run tests, install Jest with Supertest
```npm install --save-dev @babel/preset-env babel-jest```
then run
```npx jest --coverage``` to view the coverage report of the tests

The coverage report can be viewed by opening ```cd server/coverage/lcov-report``` then 
```open index.html``` after generating the report

For this application, the results are as in this path:
```server/coverage/lcov-report/index.html```

Database fields are well validated, including foreign keys and unique fields.

The automated jest scripts are found in the ```server/loans.test.js``` file


### LOAD TESTING REPORT
Load testing requires the  ```artillery``` package for more illustrative information and data
Sample looad testing results are found in ```load_test_results.json``` file although there isnt much to decipher there without artillery acocunt.
To easily visualize those very results, click this link: https://app.artillery.io/oofzhjhvaugmm/load-tests/twc5z_bwcwdpyjwg88jaq463qfmfat757ze_zk77

As per the results, the application has a load bearing capacity of less than 9% for concurrent requests. More than 85% of requests are queued and timeout, while about 1% of the requests are overridden by a connection reset.



## CLIENT
wkdir client/

### Set Up
After installations, most of modifications affected the ```App.js``` file for routing of authenticated and non-authenticated routes

### MANUAL TESTING TEST CASES
Comprehensive Test cases developed are available in this file:

https://docs.google.com/spreadsheets/d/1Tu0V_GccqoyMG-9yPYHjRvprxnR9fLmnxEHYh1S-YZ0/edit?usp=sharing


### Issues and Bug reports
Issues and bugs, with screenshots and reproduction steps are available in this repository Issues tab here:

https://github.com/kiokogit/incourage-test/issues

### Automated testing
Used CypressStudio to record and automate end to end testing of the user experience theough the application.
Comprehensive issues developed are found in the Issues and Bug reports.

The script for the automated cypress steps are indicated in this file: 
```client/cypress/e2e/loansCypressTest.cy.js```

```cypress.config.js``` file and cypress folders are included for cypress studio configurations
