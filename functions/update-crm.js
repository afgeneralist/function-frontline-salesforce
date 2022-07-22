//const sfdcAuthenticatePath = Runtime.getFunctions()['auth/sfdc-authenticate'].path;
//const { sfdcAuthenticate } = require(sfdcAuthenticatePath);

const jsforce = require("jsforce");
const sfdc = new jsforce.Connection({});

const { Twilio } = require("twilio");
const client = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

exports.handler = async function (context, event, callback) {
    //const sfdcConnectionIdentity = await sfdcAuthenticate(context, null); // this is null due to no user context, default to env. var SF user
    //const { connection } = sfdcConnectionIdentity;
    await sfdc.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);
    console.log(connection.sobject('Contact'));

  /*const participants = await client.conversations
    .conversations(event.ConversationSid)
    .participants.list();

  const customer_id = participants
    .map((p) => JSON.parse(p.attributes))
    .find((attr) => attr.customer_id).customer_id;*/

  await sfdc.sobject("Task").create({
    ActivityDate: new Date(),
    Description: 'event.Body',
    Status: "Completed",
    Subject: "SMS Message",
    WhoId: '0038Z00002uJ1YnQAK',
  }); callback(null, {});
}; 