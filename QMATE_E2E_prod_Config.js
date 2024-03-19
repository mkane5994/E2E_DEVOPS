const path = require("path");
const merge = require(path.resolve(process.env.DEEPMERGE_PATH));
const profile = require(path.resolve(process.env.QMATE_CONFIGS, "report.headless.conf.js")); //report.headless.conf.js

exports.config = merge(profile.config, {
    //maxInstances: 10,
    maxInstances: 1,
    bail: 0,
    specFileRetries: 0,
    logLevel: "error",
    stableCountTries: 0,
    params: {
        auth: {
            formType: "plain"
        },
        SystemToTest: "T-FLP", 
        systemUrl: "https://ict.wdf.sap.corp/",
        username: "C5253257",
        cpqUrl: "https://sap-ies-sales.cpq.cloud.sap/Login.aspx",
        sapCloudUrl: "https://harmonyquote-sapitcloud.dispatcher.hana.ondemand.com/webapp/index.html#",
        export: {
            exportData: "./specs/data.json"
        },
        import: {
            oppData: "./specs/data.json"
        },
        coverage: {
            status: false,
           // coverage_files: ["<your_component>"],
           // sourcePath: "./sourceFolder"
        },
        logUI5Version: "always"
    },

    baseUrl: "https://sap-ies-sales.cpq.cloud.sap/Login.aspx",

    specs: []

});