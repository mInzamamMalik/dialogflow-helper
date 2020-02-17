"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// 
// initialize the helper library
// replace this json with your own service account
index_1.init({
    "type": "service_account",
    "project_id": "abc-project id",
    "client_email": "dialogflow-xxxx@bilal-assistant.iam.gserviceaccount.com",
    "private_key": "adfadfsdfsdfsdfsdf"
});
// to talk with chatbot through nodejs
index_1.nodejsClient.detectIntent("abcSession123", "hey chatbot read surah fatiha", {}).then((response) => {
    console.log("response: ", response.fulfillmentText);
});
// to read intent list make sure you have enough IAM permission
// goto https://console.cloud.google.com/iam-admin/iam?authuser=0&project=<project-id> look for
// service account you are using and make sure it is set to "Dialogflow API Admin" anything less then admin will not work
index_1.agent.getAllIntents().then(allIntents => {
    console.log("allIntents: ", allIntents);
});
index_1.agent.getIntent("ed90f12e-0391-475c-bf43-c13cfb363f7f");
// when you get all intents look last part of each intent name is id of that intent
// {
//     "name": "projects/bilal-assistant/agent/intents/ed90f12e-0391-475c-bf43-c13cfb363f7f",
//     "displayName": "quranAction.readSurah",
//     "priority": 500000,
//     "webhookState": "WEBHOOK_STATE_ENABLED",
//     "parameters": ...
//      ...
//   }
// there are some other functions, I will put the full examples later sometime, pull request are most welcome 
//# sourceMappingURL=test.js.map