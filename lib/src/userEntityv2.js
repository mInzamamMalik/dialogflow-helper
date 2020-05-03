"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const googleapis_1 = require("googleapis");
let cred;
let _debug;
const debugLog = (data1, data2, data3) => {
    if (_debug) {
        if (typeof data1 === "object" && data1.outputAudio) {
            data1.outputAudio = `${data1.outputAudio.slice(0, 200)} ( ... truncated text)`;
        }
        if (typeof data2 === "object" && data2.outputAudio) {
            data2.outputAudio = `${data2.outputAudio.slice(0, 200)} ( ... truncated text)`;
        }
        if (typeof data3 === "object" && data3.outputAudio) {
            data3.outputAudio = `${data3.outputAudio.slice(0, 200)} ( ... truncated text)`;
        }
        console.log(data1, data2, data3);
    }
};
exports.init = (serviceAccountJson, debug = false) => {
    if (serviceAccountJson.client_email
        && serviceAccountJson.private_key
        && serviceAccountJson.project_id) {
        // debugLog("serviceAccountJson: ", serviceAccountJson);
        console.log("dialogflow-helper initialized");
        cred = serviceAccountJson;
    }
    else {
        console.error("Failed to initialize dialogflow-helper: client_email, private_key and project_id are required, please initialize with correct service account json");
    }
    _debug = debug;
};
class nodejsClient {
}
exports.nodejsClient = nodejsClient;
nodejsClient.detectIntent = function (sessionId, queryText, customPayload = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const containInvalid = RegExp(/[^a-zA-Z0-9`~!@$%^&*()-+.]/g);
        if (containInvalid.test(sessionId)) {
            console.warn("detectIntent: In sessionId special charecters could be a problem, if you are getting 404 when you detect intent please make sure your sessionId have legal charectors only,  (/,#) are strickly prohabited");
        }
        // getting server to server OAuth token
        const serviceAccountAuth = new googleapis_1.google.auth.JWT({
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        });
        const tokenData = yield serviceAccountAuth.authorize();
        debugLog("tokenData: ", tokenData);
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`;
        debugLog("accessToken: ", accessToken);
        return new Promise((resolve, reject) => {
            const requestObj = {
                url: `https://dialogflow.googleapis.com/v2/projects/${cred.project_id}/agent/sessions/${sessionId}:detectIntent`,
                json: {
                    "queryInput": {
                        "text": {
                            "languageCode": "en",
                            "text": queryText
                        }
                    },
                    "queryParams": {
                        "payload": customPayload
                    }
                },
                headers: {
                    "Authorization": accessToken
                }
            };
            // debugLog("requestObj: ", requestObj)
            request.post(requestObj, function (error, response, body) {
                debugLog(`on ${accessToken} detecting intent: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {
                    resolve(response.body);
                }
                else {
                    debugLog(`on ${accessToken} on session ${sessionId} `);
                    console.error("error in detect intent: ", response.statusCode, error);
                    reject(error);
                }
            });
        }); //promise end
    });
};
class agent {
}
exports.agent = agent;
agent.getAllIntents = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // getting server to server OAuth token
        const serviceAccountAuth = new googleapis_1.google.auth.JWT({
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        });
        const tokenData = yield serviceAccountAuth.authorize();
        debugLog("tokenData: ", tokenData);
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`;
        debugLog("accessToken: ", accessToken);
        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/${cred.project_id}/agent/intents/`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error, response, body) {
                debugLog(`on ${accessToken} getting intent list: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {
                    resolve(response.body);
                }
                else {
                    debugLog(`on ${accessToken}`);
                    console.error("error in getting intent list: ", response.statusCode, error);
                    reject(error);
                }
            });
        }); //promise end
    });
};
agent.getIntent = function (intentId) {
    return __awaiter(this, void 0, void 0, function* () {
        // getting server to server OAuth token
        const serviceAccountAuth = new googleapis_1.google.auth.JWT({
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        });
        const tokenData = yield serviceAccountAuth.authorize();
        debugLog("tokenData: ", tokenData);
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`;
        debugLog("accessToken: ", accessToken);
        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/${cred.project_id}/agent/intents/${intentId}`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error, response, body) {
                debugLog(`on ${accessToken} getting intent: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {
                    resolve(response.body);
                }
                else {
                    debugLog(`on ${accessToken}`);
                    console.error("error in getting intent: ", response.statusCode, error);
                    reject(error);
                }
            });
        }); //promise end
    });
};
agent.getAllEntities = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // getting server to server OAuth token
        const serviceAccountAuth = new googleapis_1.google.auth.JWT({
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        });
        const tokenData = yield serviceAccountAuth.authorize();
        debugLog("tokenData: ", tokenData);
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`;
        debugLog("accessToken: ", accessToken);
        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/${cred.project_id}/agent/entityTypes/`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error, response, body) {
                debugLog(`on ${accessToken} getting entities list: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {
                    resolve(response.body);
                }
                else {
                    debugLog(`on ${accessToken}`);
                    console.error("error in getting entities list: ", response.statusCode, error);
                    reject(error);
                }
            });
        }); //promise end
    });
};
agent.getEntity = function (entityId) {
    return __awaiter(this, void 0, void 0, function* () {
        // getting server to server OAuth token
        const serviceAccountAuth = new googleapis_1.google.auth.JWT({
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        });
        const tokenData = yield serviceAccountAuth.authorize();
        debugLog("tokenData: ", tokenData);
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`;
        debugLog("accessToken: ", accessToken);
        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/${cred.project_id}/agent/entityTypes/${entityId}`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error, response, body) {
                debugLog(`on ${accessToken} getting entity: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {
                    resolve(response.body);
                }
                else {
                    debugLog(`on ${accessToken}`);
                    console.error("error in getting entity: ", response.statusCode, error);
                    reject(error);
                }
            });
        }); //promise end
    });
};
class userEntityv2 {
}
exports.userEntityv2 = userEntityv2;
userEntityv2.makeUserEntity = function (session, entityName, entries) {
    return __awaiter(this, void 0, void 0, function* () {
        // getting server to server OAuth token
        const serviceAccountAuth = new googleapis_1.google.auth.JWT({
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        });
        const tokenData = yield serviceAccountAuth.authorize();
        debugLog("tokenData: ", tokenData);
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`;
        debugLog("accessToken: ", accessToken);
        // cleaning session id:
        // session comes in production: "projects/ivow-dev/agent/environments/__aog-2/users/-/sessions/ABwppHFAOMb4sI8jtqvYUtW1ukPMMP7E0uPEgpKjvOAnZJZ8k7OZZ_5Nf46rzaJhM6uKOjk6eRc"
        // session comes in development: "projects/ivow-dev/agent/sessions/ABwppHEr4cN0CrYSL9j8XmQImU33A7EIapijgLMPyQjZc2n87gBv1RxPdo253VA7Nzf7CXd6Rt8"
        // const session = _session.replace("/environments/__aog-2/users/-", "")
        // debugLog("session: ", session)
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
                debugLog(`on ${accessToken} making entity ${entityName} on session ${session} response: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {
                    resolve(response.body);
                }
                else {
                    debugLog(`on ${accessToken} making entity ${entityName} on session ${session} `);
                    console.error("error in making user /entity: ", response.statusCode, error);
                    reject(error);
                }
            });
        }); //promise end
    });
}; //makeUserEntity end
userEntityv2.makeUserEntityWithArray = (session, entityName, entries, isDry = false) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=userEntityv2.js.map