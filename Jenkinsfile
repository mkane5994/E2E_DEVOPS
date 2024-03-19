#!/usr/bin/env groovy
@Library(['piper-lib', 'ownJenkinsMethods']) _
import com.sap.cc.jenkins.*

def runTest = true
def runProd = true

Vyper vyper = new Vyper(this)
node('built-in'){
  
    // Cronjob, run every 1 hour
    String cron_string = env.BRANCH_NAME == 'main' ? 'H * * * *' : ''
    properties([
      pipelineTriggers([cron(cron_string)])
    ])
    
    try {
        def testFiles = []
        def prodFiles = []
        def devFiles = []
        def matchingFilesTest = []
        def matchingFilesDev = []
        def matchingFilesProd = []
        stage('Checkout') {
                deleteDir()
                def scmVars = checkout scm
                setupPipelineEnvironment script: this, storeGitHubStatistics: false, buildDiscarder: [daysToKeep:2, numToKeep:24, artifactDaysToKeep:2, artifactNumToKeep:24]
                stash 'sonarcode'
                durationMeasure(script: this, measurementName: 'build_duration') {
                   stash excludes: '.git/**/*', name: 'sourcecode'
                   echo "Run ${env.BUILD_NUMBER} for pull Request ID ${env.CHANGE_ID} "
                   echo "Target branch name is ${env.CHANGE_TARGET}"
                   echo "The actually branch name is ${env.CHANGE_BRANCH} or ${env.BRANCH_NAME}"
                   gitCommit = scmVars.GIT_COMMIT
                   gitUrl = scmVars.GIT_URL
                   GIT_COMMIT_EMAIL = sh (
                       script: 'git --no-pager show -s --format=\'%ae\'',
                       returnStdout: true
                   ).trim()
                   echo "Git committer email: ${GIT_COMMIT_EMAIL}"
                   jobName = env.JOB_NAME
                   jobName = jobName.replace("/", "_")
                   echo "normal ${env.JOB_NAME} - replaced ${jobName}"
                   echo "Git_URL: ${gitUrl}"
                   echo "${gitUrl.tokenize("/")[-1].tokenize(".")[0]}"
                }
        }
        stage('Check Files') {

              def createTable = { title, environment, files ->
                  return """
                  +---------------------------+
                  | ${title} ${environment} |
                  +---------------------------+
                  | ${files.join(", ")} |
                  +---------------------------+
                  """
              }

              def regexForTest = /.T1.*(spec|special)\.js/
              def regexForProd = /.P1.*(spec|special)\.js/
              def regexForDev = /.D1.*(spec|special)\.js/

              if(env.BRANCH_NAME.startsWith("PR-")){
                  withCredentials([usernamePassword(credentialsId: 'C5253257_GitHubJenkins', passwordVariable: 'GIT_TOKEN', usernameVariable: 'USERNAME')]) {
                    def gitApi = "https://github.wdf.sap.corp/api/v3"
                    aFilesList = vyper.getAllChangedFile("${gitApi}", "${GIT_TOKEN}", "specs", "its", "E2E_DEVOPS")

                    matchingFilesTest = aFilesList.findAll { it =~ regexForTest }
                    matchingFilesDev = aFilesList.findAll { it =~ regexForDev }
                    matchingFilesProd = aFilesList.findAll { it =~ regexForProd }

                    // Create tables for each environment
                    def tableChangedFilesTest = createTable("Changed test files for", "Test", matchingFilesTest)
                    def tableChangedFilesDev = createTable("Changed test files for", "Dev", matchingFilesDev)
                    def tableChangedFilesProd = createTable("Changed test files for", "Prod", matchingFilesProd)

                    echo tableChangedFilesTest
                    echo tableChangedFilesDev
                    echo tableChangedFilesProd 
                  }
              }

              def allFiles = sh(script: 'ls specs', returnStdout: true).trim().split('\n')
              testFiles = allFiles.findAll { it =~ regexForTest }.collect { "specs/${it}" }
              prodFiles = allFiles.findAll { it =~ regexForProd }.collect { "specs/${it}" }
              devFiles = allFiles.findAll { it =~ regexForDev }.collect { "specs/${it}" }

              // Create tables for each environment
              def tableTest = createTable("Test files for", "Test", testFiles)
              def tableDev = createTable("Test files for", "Dev", devFiles)
              def tableProd = createTable("Test files for", "Prod", prodFiles)    

              echo tableTest
              echo tableDev
              echo tableProd   

            }
        stage('Execute QMate E2E'){
                parallel([
                    "QMATE_E2E_TEST": {
                      if(runTest){
                        deleteDir()
                        if(env.BRANCH_NAME.startsWith("PR-")){
                          echo "<<<<<<<<<< ONLY CHANGED FILES WILL BE EXECUTED >>>>>>>>>>"
                        }
                        def aOptionsA = [
                            configPath: "QMATE_E2E_test_Config.js",
                            reuseBranch: "main",
                            appName: "QMATE_E2E_TEST",
                            environment: "test",
                            files: env.BRANCH_NAME.startsWith("PR-") ? "${matchingFilesTest}" : "${testFiles}"
                        ]
                        timeout(time: 300, unit: 'MINUTES') {
                          vyper.executeQmate(aOptionsA)
                        }
                      } else {
                        if(!runProd && !runTest){
                        error("run disabled in Jenkinsfile")
                        } else { 
                          echo "run disabled in Jenkinsfile"
                          }
                        }
                    },
                    "QMATE_E2E_PROD": {
                      if(runProd){
                        deleteDir()
                        if(env.BRANCH_NAME.startsWith("PR-")){
                          echo "<<<<<<<<<< ONLY CHANGED FILES WILL BE EXECUTED >>>>>>>>>>"
                        }
                        def aOptionsA = [
                            configPath: "QMATE_E2E_prod_Config.js",
                            reuseBranch: "main",
                            appName: "QMATE_E2E_PROD",
                            environment: "prod",
                            files: env.BRANCH_NAME.startsWith("PR-") ? "${matchingFilesProd}" : "${prodFiles}"

                        ]
                        timeout(time: 300, unit: 'MINUTES') {
                          vyper.executeQmate(aOptionsA)
                        }
                      } else {
                        if(!runProd && !runTest){
                        error("run disabled in Jenkinsfile")
                        } else { 
                          echo "run disabled in Jenkinsfile"
                          }
                        }
                    }
                ])
        }
    } catch (Throwable err) { // catch all exceptions
        globalPipelineEnvironment.addError(this, err)
        throw err
    }
    finally {

        echo "CurrentBuild Result is ${currentBuild.currentResult}"

        def countArray = vyper.getCountArray()
        def (totalCount, totalFailure) = [0, 0]
        def (failingStages, failingTestCases, failingTestCasesStepsMsg) = [" - ", " - ", " - "]
        def reportUrls = ""

        echo "Total results count: ${countArray}"

        countArray.each { test ->
            totalCount += test[1] as int
            totalFailure += test[3] as int
            reportUrls = "${reportUrls}${test[8] as String}\n\n\n"

            if ((test[3] as int) > 0){
                failingStages = failingStages == " - " ? test[0] as String : "${failingStages}, ${test[0] as String}"
                failingTestCases = failingTestCases == " - " ? test[4] as String : "${failingTestCases}, ${test[4] as String}"
                failingTestCasesStepsMsg = failingTestCasesStepsMsg == " - " ? test[5] as String : "${failingTestCasesStepsMsg}\n\n${test[5] as String}"
            }
        }

        int totalSuccess = totalCount - totalFailure

        def factDefs = [
            [name: "QMate-Test (specs)", template: "${totalCount}/${totalSuccess}/${totalFailure} [Total/Success/Failing]"],
            [name: "Failing QMate-Stages", template: failingStages],
            [name: "Failing QMate-Tests (specs)", template: failingTestCases],
            [name: "Failing QMate-Steps", template: failingTestCasesStepsMsg],
            [name: "Report URLs", template: reportUrls]
        ]

        office365ConnectorSend webhookUrl: "https://sap.webhook.office.com/webhookb2/1b10f33f-2e6a-4827-a96d-fa01e89bd968@42f7676c-f455-423c-82f6-dc2d99791af7/IncomingWebhook/59189a639c7c48ea9a466f52af8abac1/fd5da366-c6f9-46a7-ac91-9ab01624f623",
                                status: currentBuild.currentResult,
                                factDefinitions: factDefs

        def outputFileName = './sendToOctobus.json'
        def outputDataToOctobus = """
        [
          {
            "project": "e2e_devops",
            "Status":  "${currentBuild.currentResult}",
            "Total_specs" : ${totalCount},
            "Passing_specs" : ${totalSuccess},
            "Failing_specs" : ${totalFailure},
            "Failing_Tests" : "${failingTestCases}",
            "Failing_Stages" : "${failingStages}",
            "Failing QMate-Steps" : "${failingTestCasesStepsMsg}",
            "Report_URLs" : "${reportUrls}"
          }
        ]
        """
        writeFile(file: outputFileName, text: outputDataToOctobus)
        sh "curl -X POST \"https://in-https.eude1.ccloud.octobus.tools.sap/c0065/log/callidus_ies\" -H \"Content-Type: application/json\" -d @${outputFileName}"
    }
}
