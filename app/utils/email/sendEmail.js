const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { google } = require('googleapis');
const { error } = require("console");
const { OAuth2 } = google.auth;
require('dotenv').config();
//https://developers.google.com/oauthplayground/#step2&apisSelect=https%3A%2F%2Fmail.google.com%2F%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.insert%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.labels%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.modify%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.send&auth_code=4%2F0AfJohXn8NxQZoYu-STMPQuGDOhYux1D7tAtXRF3c_g1f5QvebBJu2WCQQHioR7PDqtocTA&refresh_token=1%2F%2F04r9yqIwzGvzPCgYIARAAGAQSNwF-L9IrmRysz5exbtHsA2tz8vGy5hAuRMmlJRFySaklYTCL1M8S3BvlKvXqlIeX6DpZ6I0CLwo&access_token_field=ya29.a0AfB_byBLqanm2Vba780YSCQyybjA1FzbIjRFHrC1eScQx00Bi4KSgwFyXLjq5UvNMt3E7iMY1ISDYEkpPD2yae2KCClNTGI-2e6N83HM9CbeQj46d6uJ_l3dFFOPRhtYYgt8xirD2cceaZEj0RoH_ly-WQf5ULqwp7RgaCgYKAU8SARESFQHGX2Mi0yy11K68LBDw79fju_cWDw0171&url=https%3A%2F%2F&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=checked&oauthEndpointSelect=Google&oauthAuthEndpointValue=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth&oauthTokenEndpointValue=https%3A%2F%2Foauth2.googleapis.com%2Ftoken&oauthClientId=54831938708-692lm10b85v1k2o2m2igkrr96dslbrb7.apps.googleusercontent.com&expires_in=3598&oauthClientSecret=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&access_token_issue_date=1701716169&for_access_token=ya29.a0AfB_byBLqanm2Vba780YSCQyybjA1FzbIjRFHrC1eScQx00Bi4KSgwFyXLjq5UvNMt3E7iMY1ISDYEkpPD2yae2KCClNTGI-2e6N83HM9CbeQj46d6uJ_l3dFFOPRhtYYgt8xirD2cceaZEj0RoH_ly-WQf5ULqwp7RgaCgYKAU8SARESFQHGX2Mi0yy11K68LBDw79fju_cWDw0171&includeCredentials=checked&accessTokenType=bearer&autoRefreshToken=unchecked&accessType=offline&prompt=consent&response_type=code&wrapLines=on


const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,  
  process.env.CLIENT_SECRET, 
  'https://developers.google.com/oauthplayground'
);

// Stockez ces tokens en toute sécurité (base de données sécurisée, etc.)
const refreshToken = process.env.REFRESH_TOKEN;

// Configurez l'OAuth2 client avec le token d'accès initial
oauth2Client.setCredentials({
  refresh_token: refreshToken
});


const getAccessToken = () => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        throw("Failed to create access token :( " + err);
      }
      return token;
    });

}




module.exports = async (email, subject, payload, template,callback) => {
    console.log("sendEmail, email: ", email)
  try {
    console.log("checkpoint1")
    const accessToken = await oauth2Client.getAccessToken().catch(error => {return error});

    console.log(accessToken)
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({  
      service: 'gmail',  
      host: "smtp.gmail.com",
      port: 465,
      auth: {  
          type: "OAuth2",
          user: 's94279326@gmail.com',  
          clientId: '54831938708-692lm10b85v1k2o2m2igkrr96dslbrb7.apps.googleusercontent.com',  
          clientSecret: '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',  
          refreshToken: refreshToken,
          accessToken: accessToken
      }  
    });  
    console.log("checkpoint2")
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    console.log("checkpoint3")
    const options = () => {
      return {
        from: "s94279326@gmail.com",
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };
    console.log("checkpoint4")
  
    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    },callback);
    console.log("Message sent");
  } catch (error) {
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

//module.exports = sendEmail;