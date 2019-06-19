const nodemailer = require('nodemailer');

/** See README.md for instructions on getting correct credentials.  */
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REFRESH_TOKEN = '';

/** Sender's email address */
const SENDER_ADDRESS = '';

/**
 * Check the action has all the required customFields data.
 *
 * @param {object} action - The event action.
 */
const checkActionData = action => {
  const { to, subject, body } = action.customFields;
  if (!(to && subject && body)) {
    throw new Error('Action must contain to, subject, body in customFields');
  }
};

/**
 * Initialise nodemailer and send the email.
 *
 * @param {object} data - The action customFields data from checkActionData().
 * @returns {Promise} Promise that resolves when complete.
 */
const sendEmail = data => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'oauth2',
    user: SENDER_ADDRESS,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
  },
}).sendMail({
  subject: data.subject,
  to: data.to,
  from: SENDER_ADDRESS,
  html: data.body,
});

/**
 * Safely run an async function as a Reactor script.
 *
 * @param {function} f - The function to run.
 */
const runAsync = f => f().catch(e => logger.error(e.message || e.errors[0])).then(done);

// @filter(onActionCreated) action.type=_SendEmail
const onActionCreated = (event) => runAsync(async () => {
  checkActionData(event.action);
  logger.info(`Sending email: ${JSON.stringify(event.action.customFields)}`);

  await sendEmail(event.action.customFields);
  logger.info('Sent successfully!');
});

module.exports = { onActionCreated };
