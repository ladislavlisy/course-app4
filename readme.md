REGEX pattern to parse path from request
/^\/+|\/+$/g

// TEST Twilio
// TODO: Get rid of this
helpers.sendTvilioSms('606639349','Hello MasterClass', function(err){
  if (err) {
    console.log('This was an error', err);
  } else {
    console.log('This was succesful');
  }
});

// echo $NODE_TLS_REJECT_UNAUTHORIZED
/*
{
  "sid": "SMd9dfbf7681f849ecba73da08afe3ee0e",
  "date_created": "Wed, 07 Nov 2018 12:15:54 +0000",
  "date_updated": "Wed, 07 Nov 2018 12:15:54 +0000",
  "date_sent": null,
  "account_sid": "guid",
  "to": "+420777772336", "from": "+15005550006",
  "messaging_service_sid": null,
  "body": "Sent from your Twilio trial account - Hello MasterClass",
  "status": "queued",
  "num_segments": "1",
  "num_media": "0",
  "direction": "outbound-api",
  "api_version": "2010-04-01",
  "price": null,
  "price_unit": "USD",
  "error_code": null,
  "error_message": null,
  "uri": "/2010-04-01/Accounts/guid/Messages/SMd9dfbf7681f849ecba73da08afe3ee0e.json",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/guid/Messages/SMd9dfbf7681f849ecba73da08afe3ee0e/Media.json"
  }
}
*/
return;
