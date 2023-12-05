import ElasticEmail from '@elasticemail/elasticemail-client';
import dotenv from "dotenv";

dotenv.config();

const { ELASTIC_API_KEY, EMAIL_FROM } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;
 
const {apikey} = defaultClient.authentications;
apikey.apiKey = ELASTIC_API_KEY;
 
const api = new ElasticEmail.EmailsApi();
 
export const sendEmail = async ({ to, subject, html }) => {
    const email = ElasticEmail.EmailMessageData.constructFromObject({
        Recipients: [
            new ElasticEmail.EmailRecipient(to)
        ],
        Content: {
            Body: [
                ElasticEmail.BodyPart.constructFromObject({
                    ContentType: "HTML",
                    Content: html
                })
            ],
            Subject: subject,
            From: EMAIL_FROM
        }
    });

    const callback = function (error, data, response) {
        if (error) {
            console.error(error.message);
        } else {
            console.log('API called successfully.');
        }
    };

    api.emailsPost(email, callback);
    return true;
}