var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var mandrillKey = require('../../mandrillKey.js');
var mongoose = require('mongoose')
var Product = mongoose.model('Product')

var emailTemplate = fs.readFileSync(path.join(__dirname, '/email_template.html'), 'utf8');

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(mandrillKey);
 
function sendConfirmationEmail(order, email, address, customizedTemplate){ 
          var orderItems = [];
          // var orderItemTitles = [];
          // var orderCost;

          order.storedItems.forEach(function(el){
            orderItems.push(el)
          })



          var copyTemplate = emailTemplate;
          var customizedTemplate = ejs.render(
            copyTemplate,  {
            firstName: order.owner, 
            email: email,
            address: address,
            orderItems: orderItems
           });

          sendEmail(order.owner, email, "McFly's", "mcflys@ninetiesstore.com", "Order Confirmed", customizedTemplate);          
  };


function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
    //22. add keys in message for storedItem product names
    var message = {
        "html": message_html,
        "subject": subject,
        "from_email": from_email,
        "from_name": from_name,
        "to": [{
                "email": to_email,
                "name": to_name
            }],
        "important": false,
        "track_opens": true,    
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false,
        "tags": [
            "Fullstack_Tumblrmailer_Workshop"
        ]    
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
                  
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
}

module.exports = sendConfirmationEmail;