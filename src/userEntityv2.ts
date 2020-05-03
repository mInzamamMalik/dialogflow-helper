import * as request from 'request';
import { google } from 'googleapis';

export interface entityEntry {
    "value": string,
    "synonyms": string[]
}
export interface serviceAccount {
    client_email: string,
    private_key: string,
    project_id: string,
    [ignore_additional_property: string]: string;
}

let cred: serviceAccount;
let _debug: boolean;

const debugLog = (data1: any, data2?: any, data3?: any) => {
    if (_debug) {

        if (typeof data1 === "object" && data1.outputAudio) {
            data1.outputAudio = `${data1.outputAudio.slice(0, 200)} ( ... truncated text)`
        }
        if (typeof data2 === "object" && data2.outputAudio) {
            data2.outputAudio = `${data2.outputAudio.slice(0, 200)} ( ... truncated text)`
        }
        if (typeof data3 === "object" && data3.outputAudio) {
            data3.outputAudio = `${data3.outputAudio.slice(0, 200)} ( ... truncated text)`
        }
        console.log(data1, data2, data3);
    }
}

export let init = (serviceAccountJson: serviceAccount, debug: boolean = false) => {

    if (serviceAccountJson.client_email
        && serviceAccountJson.private_key
        && serviceAccountJson.project_id
    ) {
        // debugLog("serviceAccountJson: ", serviceAccountJson);
        console.log("dialogflow-helper initialized")
        cred = serviceAccountJson;
    } else {
        console.error("Failed to initialize dialogflow-helper: client_email, private_key and project_id are required, please initialize with correct service account json")
    }
    _debug = debug;
}


export class nodejsClient {

    static detectIntent = async function (sessionId: string, queryText: string, customPayload: Object = {}) {

        const containInvalid = RegExp(/[^a-zA-Z0-9`~!@$%^&*()-+.]/g);

        if (containInvalid.test(sessionId)) {
            console.warn("detectIntent: In sessionId special charecters could be a problem, if you are getting 404 when you detect intent please make sure your sessionId have legal charectors only,  (/,#) are strickly prohabited")
        }


        // getting server to server OAuth token
        const serviceAccountAuth = new google.auth.JWT({ // key is private key, extracted from service-account json file
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        })

        const tokenData = await serviceAccountAuth.authorize()
        debugLog("tokenData: ", tokenData)
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`
        debugLog("accessToken: ", accessToken)

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
            }
            // debugLog("requestObj: ", requestObj)

            request.post(requestObj, function (error: any, response: any, body: any) {

                debugLog(`on ${accessToken} detecting intent: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {

                    resolve(response.body);

                } else {
                    debugLog(`on ${accessToken} on session ${sessionId} `);
                    console.error("error in detect intent: ", response.statusCode, error);
                    reject(error)
                }
            })
        })//promise end
    }

}

export class agent {

    static getAllIntents = async function () {

        // getting server to server OAuth token
        const serviceAccountAuth = new google.auth.JWT({ // key is private key, extracted from service-account json file
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        })

        const tokenData = await serviceAccountAuth.authorize()
        debugLog("tokenData: ", tokenData)
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`
        debugLog("accessToken: ", accessToken)

        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/${cred.project_id}/agent/intents/`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error: any, response: any, body: any) {

                debugLog(`on ${accessToken} getting intent list: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {

                    resolve(response.body);

                } else {
                    debugLog(`on ${accessToken}`);
                    console.error("error in getting intent list: ", response.statusCode, error);
                    reject(error)
                }
            })
        })//promise end
    }

    static getIntent = async function (intentId: string) {

        // getting server to server OAuth token
        const serviceAccountAuth = new google.auth.JWT({ // key is private key, extracted from service-account json file
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        })

        const tokenData = await serviceAccountAuth.authorize()
        debugLog("tokenData: ", tokenData)
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`
        debugLog("accessToken: ", accessToken)

        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/${cred.project_id}/agent/intents/${intentId}`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error: any, response: any, body: any) {

                debugLog(`on ${accessToken} getting intent: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {

                    resolve(response.body);

                } else {
                    debugLog(`on ${accessToken}`);
                    console.error("error in getting intent: ", response.statusCode, error);
                    reject(error)
                }
            })
        })//promise end
    }


    static getAllEntities = async function () {

        // getting server to server OAuth token
        const serviceAccountAuth = new google.auth.JWT({ // key is private key, extracted from service-account json file
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        })

        const tokenData = await serviceAccountAuth.authorize()
        debugLog("tokenData: ", tokenData)
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`
        debugLog("accessToken: ", accessToken)

        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/${cred.project_id}/agent/entityTypes/`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error: any, response: any, body: any) {

                debugLog(`on ${accessToken} getting entities list: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {

                    resolve(response.body);

                } else {
                    debugLog(`on ${accessToken}`);
                    console.error("error in getting entities list: ", response.statusCode, error);
                    reject(error)
                }
            })
        })//promise end
    }

    static getEntity = async function (entityId: string) {

        // getting server to server OAuth token
        const serviceAccountAuth = new google.auth.JWT({ // key is private key, extracted from service-account json file
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        })

        const tokenData = await serviceAccountAuth.authorize()
        debugLog("tokenData: ", tokenData)
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`
        debugLog("accessToken: ", accessToken)

        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/${cred.project_id}/agent/entityTypes/${entityId}`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error: any, response: any, body: any) {

                debugLog(`on ${accessToken} getting entity: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {

                    resolve(response.body);

                } else {
                    debugLog(`on ${accessToken}`);
                    console.error("error in getting entity: ", response.statusCode, error);
                    reject(error)
                }
            })
        })//promise end
    }

}
export class userEntityv2 {

    static makeUserEntity = async function (
        session: string,
        entityName: string,
        entries: entityEntry[]
    ) {

        // getting server to server OAuth token
        const serviceAccountAuth = new google.auth.JWT({ // key is private key, extracted from service-account json file
            email: cred.client_email,
            key: cred.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        })

        const tokenData = await serviceAccountAuth.authorize()
        debugLog("tokenData: ", tokenData)
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`
        debugLog("accessToken: ", accessToken)

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
            }, function (error: any, response: any, body: any) {

                debugLog(`on ${accessToken} making entity ${entityName} on session ${session} response: `, response.body);


                //checking if response was success
                if (!error && response.statusCode === 200) {

                    resolve(response.body);

                } else {
                    debugLog(`on ${accessToken} making entity ${entityName} on session ${session} `);
                    console.error("error in making user /entity: ", response.statusCode, error);
                    reject(error)
                }
            })
        })//promise end
    }//makeUserEntity end


    static makeUserEntityWithArray = async (
        session: string,
        entityName: string,
        entries: string[],
        isDry = false
    ) => {

        const newentityEntry: entityEntry[] = [];
        entries.map((name, index) => {

            let value = name; //temp variable
            let synonyms = [name]; //temp variable

            if (!isDry) {
                switch (index) {
                    case 0:
                        synonyms.push("1")
                        synonyms.push("1st")
                        synonyms.push("first")
                        synonyms.push("first option")
                        synonyms.push("one")
                        synonyms.push("option one")
                        break;
                    case 1:
                        synonyms.push("2")
                        synonyms.push("2nd")
                        synonyms.push("2nd option")
                        synonyms.push("second")
                        synonyms.push("second option")
                        synonyms.push("two")
                        synonyms.push("option two")
                        break;
                    case 2:
                        synonyms.push("3")
                        synonyms.push("3rd")
                        synonyms.push("3rd option")
                        synonyms.push("third")
                        synonyms.push("third option")
                        synonyms.push("three")
                        synonyms.push("option three")
                        break;
                    default:
                        synonyms.push("" + (index + 1))
                        synonyms.push("" + (index + 1) + "th")
                        synonyms.push("" + (index + 1) + "th option")
                        break;
                }
            }
            newentityEntry.push({
                value: value, // value will look like: "geo fence group"
                synonyms: synonyms // synonyms looks like: ["geo fence group", "1", "1st", "first"]
            })
        })
        const result = await userEntityv2.makeUserEntity(session, entityName, newentityEntry)
        return result

        // .catch(e => {
        //     throw new Error("error in making entity with array")
        // })
    }
}