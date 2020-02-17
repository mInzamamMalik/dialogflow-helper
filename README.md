# dilogflow-helper
bunch of dialogflow helper
 functions such as for making developer entity
 and session entity and many more using dialogflow v2 rest api

# Install:
`npm i dialogflow-helper`

# contribute:
Feel free to fork and make pull requests
Or if you are passionate and want to have direct access to the repo Just let me know I will add you as collaborator after signing a simple agreement document



```
import {init, nodejsClient, agent, entityEntryInterface, entityv1, userEntityv2 } from '../index'


// 
// initialize the helper library
// replace this json with your own service account
init({
    "type": "service_account",
    "project_id": "abc-project id",
    "client_email": "dialogflow-xxxx@bilal-assistant.iam.gserviceaccount.com",
    "private_key": "adfadfsdfsdfsdfsdf"
})



// to talk with chatbot through nodejs
nodejsClient.detectIntent("abcSession123", "hey chatbot read surah fatiha", {}).then((response: any) => {
    console.log("response: ", response.fulfillmentText)
})

// to read intent list make sure you have enough IAM permission
// goto https://console.cloud.google.com/iam-admin/iam?authuser=0&project=<project-id> look for
// service account you are using and make sure it is set to "Dialogflow API Admin" anything less then admin will not work

agent.getAllIntents().then(allIntents => {
    console.log("allIntents: ", allIntents)
})


agent.getIntent("ed90f12e-0391-475c-bf43-c13cfb363f7f") 
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










```