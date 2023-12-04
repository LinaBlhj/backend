const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { google } = require('googleapis');
const { error } = require("console");
const { OAuth2 } = google.auth;
//https://developers.google.com/oauthplayground/#step2&apisSelect=https%3A%2F%2Fmail.google.com%2F&auth_code=4%2F0AfJohXneWJEtZ8-f4LcJbw5zT_LUnA_yVwvV7xgd7tMfSNjQx54fh_UfnokOf7BxjIo4Lw&refresh_token=1%2F%2F04oio90SvRDk1CgYIARAAGAQSNwF-L9IrJeyv8uBwPAEfyGpBcD6zwoAmmBKU_nRWS0OuzDCFvACy7y0BDIzS_gwykYG11cmoxds&access_token_field=ya29.a0AfB_byAqzc7sOTCkwNpZy41PsT_i3hvhbhmA7QgckRgur2IZJLuIn4nIW-v8cTkY9rwP89TU8ooYFXaeXeoyCPiORHCK4KjCXe_4lDslyCcB4G_h_AsFXnqydeFhrveqtc9y7TgxLIt1uapd7ZR5W78rKdcDgATEkFxlaCgYKAVcSARESFQHGX2MiUrTaa57UggXib95Rmcat-Q0171&url=https%3A%2F%2F&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=checked&oauthEndpointSelect=Google&oauthAuthEndpointValue=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth&oauthTokenEndpointValue=https%3A%2F%2Foauth2.googleapis.com%2Ftoken&oauthClientId=54831938708-692lm10b85v1k2o2m2igkrr96dslbrb7.apps.googleusercontent.com&expires_in=3598&oauthClientSecret=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&access_token_issue_date=1700260844&for_access_token=ya29.a0AfB_byAqzc7sOTCkwNpZy41PsT_i3hvhbhmA7QgckRgur2IZJLuIn4nIW-v8cTkY9rwP89TU8ooYFXaeXeoyCPiORHCK4KjCXe_4lDslyCcB4G_h_AsFXnqydeFhrveqtc9y7TgxLIt1uapd7ZR5W78rKdcDgATEkFxlaCgYKAVcSARESFQHGX2MiUrTaa57UggXib95Rmcat-Q0171&includeCredentials=checked&accessTokenType=bearer&autoRefreshToken=checked&accessType=offline&prompt=consent&response_type=code&wrapLines=on


const oauth2Client = new OAuth2(
  '54831938708-692lm10b85v1k2o2m2igkrr96dslbrb7.apps.googleusercontent.com',  
  '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', 
  'https://developers.google.com/oauthplayground'
);

// Stockez ces tokens en toute sécurité (base de données sécurisée, etc.)
const initialAccessToken = 'ya29.a0AfB_byAqzc7sOTCkwNpZy41PsT_i3hvhbhmA7QgckRgur2IZJLuIn4nIW-v8cTkY9rwP89TU8ooYFXaeXeoyCPiORHCK4KjCXe_4lDslyCcB4G_h_AsFXnqydeFhrveqtc9y7TgxLIt1uapd7ZR5W78rKdcDgATEkFxlaCgYKAVcSARESFQHGX2MiUrTaa57UggXib95Rmcat-Q0171';
const refreshToken = '1//0458zYI0w6uEoCgYIARAAGAQSNwF-L9IrLVVDEBe_8yxGv67HEZh8KBbYTeYEGveLrs6fovnI10H7nYIXh1oKGXkVUFhHXy9zQss';

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