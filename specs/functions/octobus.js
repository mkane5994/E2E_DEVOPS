var testsCount;
var stepCount = 0;
const octobus_payload= require("../../data/octobus.json");
const boverall = new Date();
octobus_payload.dataset.runlabel = boverall;      
const userCredentials = require('./credentials')(browser);
// Testing environment
octobus_payload.dataset.env = userCredentials.environment;

function modifyProject(newData){
    octobus_payload.dataset.project += newData;
}

function defaultOctobusData(currentTest){
    const title = currentTest.fullTitle();
    if (!title.includes('Post_RD')) {
    octobus_payload.dataset.duration = currentTest.duration;
    }
    octobus_payload.dataset.step = currentTest.title;
    octobus_payload.dataset.eachTestResult = currentTest.state;
    const endStep = new Date();
    octobus_payload.dataset.end = endStep;
    console.log(octobus_payload.dataset);
    let res = service.rest.put(octobus_payload.octobus.octurl, octobus_payload.dataset, octobus_payload.octobus.config2);
    res.then(function(result) {
       console.log(`Octobus status message: ${result.status}`)
    })
}

module.exports = {
    userCredentials,
    modifyProject,
    beforeTest: function(){
        stepCount++;
        const title = this.currentTest.title.trim();
        this.currentTest.title = `Step ${String(stepCount).padStart(stepCount < 10 ? 2 : 0, '0')}: ${title}`;
        octobus_payload.dataset.start = new Date();
        testsCount = this.test.parent.tests.length;
    },
    afterTest: function(){
        let currentTest = this.currentTest;
        if (currentTest.state == 'failed' || currentTest.title == currentTest.parent.tests[testsCount - 1].title) {
            octobus_payload.dataset.finishflg = "Y";
            const eoverall = new Date();
            const durationO = (eoverall - boverall);
            octobus_payload.dataset.overalltime = durationO;
            defaultOctobusData(currentTest);
        } else {
            defaultOctobusData(currentTest);
        }
    },
    // finishTest: function() {
    // }
}