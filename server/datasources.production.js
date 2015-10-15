exports = {
  "db" : {
    "url": process.env.MONGOLAB_URI,
    "name": "db",
    "connector": "mongodb",
  }
}

mail_provider = process.env.MAIL_PROVIDER || 'mandrill';

if (mail_provider=='mandrill'){
  console.log(mail_provider);
  exports["mail"]= {
    "name": "mail",
    "defaultForType": "mail",
    "connector": "mail",
    "transports": [
      {
        "type": "smtp",
        "host": "smtp.mandrillapp.com",
        "port": 587,
        "auth": {
          "user": process.env.MANDRILL_USERNAME,
          "pass": process.env.MANDRILL_APIKEY
        }
      }
    ]
  };
} else if (mail_provider=='mailgun') {
  console.log(mail_provider);
  exports["mail"]= {
    "name": "mail",
    "defaultForType": "mail",
    "connector": "mail",
    "transports": [
      {
        "type": "smtp",
        "host": process.env.MAILGUN_SMTP_SERVER,
        "port": process.env.MAILGUN_SMTP_PORT,
        "auth": {
          "user": process.env.MAILGUN_SMTP_LOGIN,
          "pass": process.env.MAILGUN_SMTP_PASSWORD
        }
      }
    ]
  };
} else if (mail_provider=='postmark') {
  console.log(mail_provider);
  exports["mail"]= {
    "name": "mail",
    "defaultForType": "mail",
    "connector": "mail",
    "transports": [
      {
        "type": "smtp",
        "host": process.env.POSTMARK_SMTP_SERVER,
        "port": 25,
        "auth": {
          "user": process.env.POSTMARK_API_TOKEN,
          "pass": process.env.POSTMARK_API_TOKEN
        }
      }
    ]
  };
} else if (mail_provider=='sendgrid') {
  console.log(mail_provider);
  exports["mail"]= {
    "name": "mail",
    "defaultForType": "mail",
    "connector": "mail",
    "transports": [
      {
        "type": "smtp",
        "host": "smtp.sendgrid.net",
        "port": 587,
        "auth": {
          "user": process.env.SENDGRID_USERNAME,
          "pass": process.env.SENDGRID_PASSWORD
        }
      }
    ]
  };
}

module.exports = exports;