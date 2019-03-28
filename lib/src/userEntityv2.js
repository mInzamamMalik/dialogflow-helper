"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const googleapis_1 = require("googleapis");
let cred;
exports.init = (serviceAccountJson) => {
    console.log("serviceAccountJson: ", serviceAccountJson);
    cred = serviceAccountJson;
};
class nodejsClient {
}
nodejsClient.detectIntent = function (sessionId, queryText) {
    return __awaiter(this, void 0, void 0, function* () {
        // getting server to server OAuth token
        const serviceAccountAuth = new googleapis_1.google.auth.JWT({
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        });
        const tokenData = yield serviceAccountAuth.authorize();
        console.log("tokenData: ", tokenData);
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`;
        console.log("accessToken: ", accessToken);
        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.post({
                url: `https://dialogflow.googleapis.com/v2/projects/${cred.project_id}/agent/sessions/${sessionId}:detectIntent`,
                json: {
                    "queryInput": {
                        "text": {
                            "languageCode": "en",
                            "text": queryText
                        }
                    }
                },
                headers: {
                    "Authorization": accessToken
                }
            }, function (error, response, body) {
                console.log(`on ${accessToken} detecting intent: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {
                    resolve(response.body);
                }
                else {
                    console.log(`on ${accessToken} on session ${sessionId} `);
                    console.log("error in getting intent list: ", response.statusCode, error);
                    reject(error);
                }
            });
        }); //promise end
    });
};
exports.nodejsClient = nodejsClient;
class agent {
}
agent.getAllIntents = function (session) {
    return __awaiter(this, void 0, void 0, function* () {
        // getting server to server OAuth token
        const serviceAccountAuth = new googleapis_1.google.auth.JWT({
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        });
        const tokenData = yield serviceAccountAuth.authorize();
        console.log("tokenData: ", tokenData);
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`;
        console.log("accessToken: ", accessToken);
        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/ivow-dev/agent/intents/`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error, response, body) {
                console.log(`on ${accessToken} getting intent list: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {
                    resolve(response.body);
                }
                else {
                    console.log(`on ${accessToken} on session ${session} `);
                    console.log("error in getting intent list: ", response.statusCode, error);
                    reject(error);
                }
            });
        }); //promise end
    });
};
agent.getIntent = function (session, intentId) {
    return __awaiter(this, void 0, void 0, function* () {
        // getting server to server OAuth token
        const serviceAccountAuth = new googleapis_1.google.auth.JWT({
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        });
        const tokenData = yield serviceAccountAuth.authorize();
        console.log("tokenData: ", tokenData);
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`;
        console.log("accessToken: ", accessToken);
        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/ivow-dev/agent/intents/${intentId}`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error, response, body) {
                console.log(`on ${accessToken} getting intent list: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {
                    resolve(response.body);
                }
                else {
                    console.log(`on ${accessToken} on session ${session} `);
                    console.log("error in getting intent: ", response.statusCode, error);
                    reject(error);
                }
            });
        }); //promise end
    });
};
exports.agent = agent;
class userEntityv2 {
}
userEntityv2.makeUserEntity = function (session, entityName, entries) {
    return __awaiter(this, void 0, void 0, function* () {
        // getting server to server OAuth token
        const serviceAccountAuth = new googleapis_1.google.auth.JWT({
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        });
        const tokenData = yield serviceAccountAuth.authorize();
        console.log("tokenData: ", tokenData);
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`;
        console.log("accessToken: ", accessToken);
        // cleaning session id:
        // session comes in production: "projects/ivow-dev/agent/environments/__aog-2/users/-/sessions/ABwppHFAOMb4sI8jtqvYUtW1ukPMMP7E0uPEgpKjvOAnZJZ8k7OZZ_5Nf46rzaJhM6uKOjk6eRc"
        // session comes in development: "projects/ivow-dev/agent/sessions/ABwppHEr4cN0CrYSL9j8XmQImU33A7EIapijgLMPyQjZc2n87gBv1RxPdo253VA7Nzf7CXd6Rt8"
        // const session = _session.replace("/environments/__aog-2/users/-", "")
        // console.log("session: ", session)
        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.post({
                url: `https://dialogflow.googleapis.com/v2/${session}/entityTypes/`,
                headers: {
                    "Authorization": accessToken
                },
                json: {
                    "name": `${session}/entityTypes/${entityName}`,
                    "entityOverrideMode": "ENTITY_OVERRIDE_MODE_OVERRIDE",
                    "entities": entries
                }
            }, function (error, response, body) {
                console.log(`on ${accessToken} making entity ${entityName} on session ${session} response: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {
                    resolve(response.body);
                }
                else {
                    console.log(`on ${accessToken} making entity ${entityName} on session ${session} `);
                    console.log("error in making user /entity: ", response.statusCode, error);
                    reject(error);
                }
            });
        }); //promise end
    });
}; //makeUserEntity end
userEntityv2.makeUserEntityWithArray = (session, entityName, entries, isDry = false) => __awaiter(this, void 0, void 0, function* () {
    const newentityEntry = [];
    entries.map((name, index) => {
        let value = name; //temp variable
        let synonyms = [name]; //temp variable
        if (!isDry) {
            switch (index) {
                case 0:
                    synonyms.push("1");
                    synonyms.push("1st");
                    synonyms.push("first");
                    synonyms.push("first option");
                    synonyms.push("one");
                    synonyms.push("option one");
                    break;
                case 1:
                    synonyms.push("2");
                    synonyms.push("2nd");
                    synonyms.push("2nd option");
                    synonyms.push("second");
                    synonyms.push("second option");
                    synonyms.push("two");
                    synonyms.push("option two");
                    break;
                case 2:
                    synonyms.push("3");
                    synonyms.push("3rd");
                    synonyms.push("3rd option");
                    synonyms.push("third");
                    synonyms.push("third option");
                    synonyms.push("three");
                    synonyms.push("option three");
                    break;
                default:
                    synonyms.push("" + (index + 1));
                    synonyms.push("" + (index + 1) + "th");
                    synonyms.push("" + (index + 1) + "th option");
                    break;
            }
        }
        newentityEntry.push({
            value: value,
            synonyms: synonyms // synonyms looks like: ["geo fence group", "1", "1st", "first"]
        });
    });
    const result = yield userEntityv2.makeUserEntity(session, entityName, newentityEntry);
    return result;
    // .catch(e => {
    //     throw new Error("error in making entity with array")
    // })
});
exports.userEntityv2 = userEntityv2;
//# sourceMappingURL=userEntityv2.js.map