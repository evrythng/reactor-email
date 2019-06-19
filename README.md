# reactor-email

Reusable Reactor script to send an email from a Google account.


## Setup

### Install Script

1. Paste `main.js` into an EVRYTHNG Application's Reactor script field.
2. Copy `package.json` `dependencies` to the Reactor script's package.json field
   after clicking 'Show dependencies'.
3. Set up credential constants at the top of `main.js` as described below.


### Create Credentials

To get correct credentials, follow these instructions:

1. Create a project at
  [Google API Console](https://console.developers.google.com/apis/credentials).
2. Click 'Create Credentials' choosing 'OAuth Client ID'.
3. If required, 'Configure consent screen' (basic info only).
4. Choose 'Web Application'.
5. Set 'Authorized redirect URIs' as
  `https://developers.google.com/oauthplayground`.
6. Set `CLIENT_ID` and `CLIENT_SECRET` using credentials provided.
7. Go to the
  [Google OAuth Playground](https://developers.google.com/oauthplayground).
8. Click top-right Settings (gear icon), choose
  'Use your own OAuth credentials', enter them.
9. Enter 'https://mail.google.com/' under list of APIs, click 'Authorize APIs'.
10. Click 'Exchange authorization code for tokens', then set REFRESH_TOKEN as
  provided.


## Usage

Once the script is installed correctly, simply create an action of the type
specified in the `onActionCreated` Reactor filter (by default this is
`_SendEmail`) ensuring that action type is in project scope of the application.

Email data is specified in the action's `customFields`, such as the example
below:

```json
{
  "type": "_SendEmail",
  "customFields": {
    "to": "example@evrythng.com",
    "subject": "Hello from reactor-email!",
    "body": "This is a test email from Reactor, do not be alarmed!"
  }
}
```
