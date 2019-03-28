import * as request from 'request';
import { google } from 'googleapis';

export interface entityEntry {
    "value": string,
    "synonyms": string[]
}

const cred = {
    serviceAccountEmail: "dialogflow-twniat@ivow-dev.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0v6LFs+7tDGCV\np54tcnG+d3mHMPNr/kXI3Km1HGrxLUPNKeFWCl8xtgnO2gf73WRBOJ1pIeBu7P64\nEllFIfQ2cnyL7GL51tKkRxLo0wJQeQtkzm6ZcBVg2lRWLidp2C16YRAmCp98nYpc\nioaGWTYzwAbcF4MRLRJOAiM1COwsw+uvee1f9pc5VPYAWLZyKW/UokPjvCpdTA4I\n8+PG771eZgfSkD8tgDk4sXW7kPQtAh/7CQM7xzDdQMaxvEg6MJnE02XNTXixt3wA\noUt3S16TUO2Ght8DEnldKYFBnWE32gD/zO25vPEuxQwtz8725UgrojLsqsBcQwCs\nUZ54SEFxAgMBAAECggEABONP0N5KUYFg4hTIpS/JaqsX3Fn5cAvnmDeupGkZBt4N\nNAp0MqiQi96BfZh0C2tTyQqLNNFUaYhU/rMkVEdhFgRBLcmEbbKeoXZ4lb134qdu\nivKk/aPd0byY9952Qcyb6KM6VattrIGLWqODLgJSNTkPfNRrJRCqd479CicF6zny\njGKtd4XmasozlklazXS7nINrRz45qe77zS4R37zWmHZ6RpIB7Tk9eBvsGGh17of6\nE+sei0IzzvIes26QnKIGTFTh/YCBzGcMNC8erpqw9KBofeiJn6j1lJMANiCO5b0Q\ndZ6etxgM9TJkeGgjk3fR8FXwMlNb2uMhdG2R7uJehwKBgQD9sBWYJXKVm2nkxccQ\nPoB4tb3YToiDvN40SLofCkOvmo5FjpIAW4R9BySiTQ9B88EmpgsVJ8MHz5A9r+ze\nn37JuYMM1gBDC/rjd6MWrwOfC7BPbFsH1SsWVdKNR2cWo1B21VW8SUXvZopbS5+Y\nYOPyGHW0eOXCVXAGzqmcDPZ1mwKBgQC2ZV3L494pwnXLsdTJ80377Ix7uQm/Ep7b\nEhKHiNfqvKc/psRhkbl6rjx/1kDgwCZZ92gHw4KkKDSjTZObHtAvWvpilpiUuEMo\n8ly8ZfmNKMLZMTwhG01CE26zrkvPYiy/nOXgWIkGtx6k+zvX8cz1nvEx0Jxc2SNh\n7hcuE7374wKBgCwswVXhD3blvSbNGcDGYXCjlQ9ZfYQTG05Xa7GEBA1MCIIsNVhC\nl2t+Fu78JDAD1hp4x21Doz508lULkV+ivl06JIvTp/AE4gdCCfAlQagsTONHpwJS\nKFKXVzaqvFTA034d3/QNflQVsvn6zSunk4nQoI5wjvGsFvnYeshlqXUJAoGBAJsw\n8HfU8GizrqqcKqOSQx5BDN8Qd/x9iXB4lg+AHcb6sYt1B87EwP5jVdKnqBgTJg6S\ndY91iKjIFNGF5jusIhLI5BYScMzJY0tpvAII+iZjMja+r5yzsC6yfhSgDpzruYtn\noiga7KwsDwTtRuPcNzod/LcX+pL9ph9jB5IK9jFlAoGBAPIwwzxk6xwhz3Ai1Huv\nX9eYetLkizXpuUG40rofYDhZcG/5aubEjDmV65sRQ+6ISnVTo6YESBxnW9m+bsqB\nqjRJCAelAg7cb4W1o6fkhhrFRlGOGYhVGxBcWJ8LotCegJWIASfW/4YEu9fFEqTZ\nNWUro6yBvOPXhPlueWpa+1wP\n-----END PRIVATE KEY-----\n"
}


export class agent {

    static getAllIntents = async function (session: string) {

        // getting server to server OAuth token
        const serviceAccountAuth = new google.auth.JWT({ // key is private key, extracted from service-account json file
            email: cred.serviceAccountEmail,
            key: cred.privateKey,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        })

        const tokenData = await serviceAccountAuth.authorize()
        console.log("tokenData: ", tokenData)
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`
        console.log("accessToken: ", accessToken)

        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/ivow-dev/agent/intents/`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error: any, response: any, body: any) {

                console.log(`on ${accessToken} getting intent list: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {

                    resolve(response.body);

                } else {
                    console.log(`on ${accessToken} on session ${session} `);
                    console.log("error in getting intent list: ", response.statusCode, error);
                    reject(error)
                }
            })
        })//promise end
    }
    static getIntent = async function (session: string, intentId: string) {

        // getting server to server OAuth token
        const serviceAccountAuth = new google.auth.JWT({ // key is private key, extracted from service-account json file
            email: cred.serviceAccountEmail,
            key: cred.privateKey,
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow']
        })

        const tokenData = await serviceAccountAuth.authorize()
        console.log("tokenData: ", tokenData)
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`
        console.log("accessToken: ", accessToken)

        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.get({
                url: `https://dialogflow.googleapis.com/v2/projects/ivow-dev/agent/intents/${intentId}`,
                headers: {
                    "Authorization": accessToken
                }
            }, function (error: any, response: any, body: any) {

                console.log(`on ${accessToken} getting intent list: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {

                    resolve(response.body);

                } else {
                    console.log(`on ${accessToken} on session ${session} `);
                    console.log("error in getting intent: ", response.statusCode, error);
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
            email: cred.serviceAccountEmail,
            key: cred.privateKey,
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        })

        const tokenData = await serviceAccountAuth.authorize()
        console.log("tokenData: ", tokenData)
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`
        console.log("accessToken: ", accessToken)

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
            }, function (error: any, response: any, body: any) {

                console.log(`on ${accessToken} making entity ${entityName} on session ${session} response: `, response.body);


                //checking if response was success
                if (!error && response.statusCode === 200) {

                    resolve(response.body);

                } else {
                    console.log(`on ${accessToken} making entity ${entityName} on session ${session} `);
                    console.log("error in making user /entity: ", response.statusCode, error);
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