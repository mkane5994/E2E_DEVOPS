module.exports = function (browser) {
    let usernameSAPCloud, passwordSAPCloud, usernameCPQ, passwordCPQ, environment;
    if (browser.config.params.environment === 'test') {
        // CPQ Test
        usernameCPQ = browser.config.params.username;
        passwordCPQ = browser.config.params.passwordCPQ1;
        // HQ Test
        usernameSAPCloud = browser.config.params.username;
        passwordSAPCloud = browser.config.params.passwordFE;
        passwordBE = browser.config.params.passwordBE;
        environment = "test"
    } else if (browser.config.params.environment === 'prod') {
        // CPQ Prod
        usernameCPQ = browser.config.params.TechUSERNAME_CPQ_PROD;
        passwordCPQ = browser.config.params.TechPASSWORD_CPQ_PROD;
        // HarmonyQuote SAP Cloud 
        usernameSAPCloud = browser.config.params.usernameSAPCloudProd; 
        passwordSAPCloud = browser.config.params.passwordSAPCloudProd;
        environment = "prod"
    } 
    // else if (browser.config.params.environment === 'dev') {
    //     usernameCPQ = browser.config.params.USERNAME_CPQ_PROD;
    //     passwordCPQ = browser.config.params.PASSWORD_CPQ_PROD;
    //     usernameSAPCloud = browser.config.params.username;
    //     passwordSAPCloud = browser.config.params.passwordFE;
    //     environment = "dev"
    // } 
    return {
        usernameSAPCloud,
        passwordSAPCloud,
        usernameCPQ,
        passwordCPQ,
        passwordBE,
        environment
    };
};

 
    // Credentials
