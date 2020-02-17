"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// 
// initialize the helper library
index_1.init({
    "type": "service_account",
    "project_id": "bilal-assistant",
    "private_key_id": "10ef00c793cb84c7d4f7282d2171752b3895983c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWzq979ps3uWfK\nFuAS/N9wG0VRO1ikCSIht5MgD+k5BLygkhBvzbmWktSq7pV8zLBAP05MgU5yiln9\nih8qhbdfSAnuhju6EpcnXSTeEDU50Kdp7J3S5ew7NtX5dS+kIMsZwTORRZ0rG9I+\nOBjwNBxAfm/FxJ2N6uUcR06gzbwO8oJRbr1tK6GuFUFvCIJ6S24fipxpP1lzvrSU\nJsCvywm+O1Mx2Hy6COJcigHdFJuj5mmHDBwSqxoGZIanAk2WacllY0eWI5+T+F1U\nhl44GYwo/e26EvxDIfc5rKLp/rGIaHiC1QL7jEJPJrcsdBh/mi3pyVVfU3313LTU\nBrQbzo1PAgMBAAECggEAEAz3ndqqdHp9H+OfsKuGgpj3D//QOsmX7E8MRkwKEEGj\nWpgvdDs6D98+1trm/qFI1jQkxKCw3Owrlz9X3tSJBCyc2V7cXaX/92gFVjZ906kc\nqVSN4nFdunr5eB9ihPASXQVLtiIugUcd6ZpFesVaCxOnhG6Rm0YfAoLthCR7Vd5z\n5LWhsfXFjKYX7ptLo6ISWEKNLdwoOZB3l4NK7gkei7pT4O/0Y+rI4qSYAsDgh1F5\nlY+IHyGcPLZ6MxfvsQcAngai/hYa4Qhu5wzVi9rUwFdWAJhLg8KKTpXchXqQ1Tbr\nsmDna0ei/E+tEKk/PhOs7z1RUGSNJlkK++3rzXE7gQKBgQD/OXFMPF6JdjBvhbAJ\nm0Sicr/YvcYN1p/NEQPCRgunMq/vTzrVIzJti6LmpFXywfkSSd8FPf0IQV9PUf1n\nxYFENOujQ46BgjhiWcFo5baW+g/DndueHPWRsyp0IBwvX05Xio6wxN2tq7tmnXRJ\n4SF00QXTpwoKKkXQ3ldQpsvsQQKBgQDXdcyy7I4tyWYsyNFFbzirPva0zToj8zyk\nSQLEoUNajgIUTlCiNh3Ft+Osleh3axn9h6om8x5/bf6HfrqfnC1IcSxB87HfHuhK\nDJwL6/TUtdo6oiJYwwBS2yLS+PtS3Id/KDvFlEE0Fexd3x+YtGFAByIZVolBCieg\nu6mm7XRVjwKBgQDSZX46xIGCfEYNiX3HTZJVAJeai0cb3VQ67s3Ud33fxW83rm7n\niW5m0/fkfpDD4Jf9NZx+a82N4qY5c3Oc+jpICgA+xNBTfxAQM8G3Qbc12sroDdgg\nDet6wuI6fMX/X2frzrM2kfPU2X9RZneY99hmvnE5O7iRDKwlNUVxnS76gQKBgBke\n4evmirkp5yDHlSasTgYhRDBWUTYJ0QMyhAEa8DhpoDJv4xTWjGgWBZSEseLieNhH\nbf42kFK5J1jy3J1pXxo4H7ncyNtDxj+D8tms/BGk1jnJ14lTywDeDdRdNSg3EBEy\nRq3FmEiTWcikEBIEzeXiLwaXQU90+KPT3XbZ7ptfAoGBAIHdSLWEhxsrJ++R2JZX\nwH4CWfOMVOypg4CYXCoeubePtUjaGEglYwC7NTsUrFOywgU58VO6WxLrCUF1Fgb7\nQnLa40JAUjAWX/PyjetLflPMnVnjAMTo9ypSQRMAdKvOXO0napRNE/1yZrWmathY\nyFLLa8zHzaus2fM2vJ5DZbJI\n-----END PRIVATE KEY-----\n",
    "client_email": "dialogflow-glwyvs@bilal-assistant.iam.gserviceaccount.com",
    "client_id": "109965490712938617595",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dialogflow-glwyvs%40bilal-assistant.iam.gserviceaccount.com"
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