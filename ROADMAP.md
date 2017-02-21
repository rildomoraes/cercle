

# Cercle CRM OPEN SOURCE ROADMAP

To be announced very soon.

# Usefull Command and Inboud Parameter for Webhook
mix
mix ecto.gen.migration add_posts_table

{
  "FromName": "Postmarkapp Support",
  "From": "support@postmarkapp.com",
  "FromFull": {
    "Email": "support@postmarkapp.com",
    "Name": "Postmarkapp Support",
    "MailboxHash": ""
  },
  "To": "\"Firstname Lastname\" <mailbox+SampleHash@inbound.postmarkapp.com>",
  "ToFull": [
    {
      "Email": "mailbox+SampleHash@inbound.postmarkapp.com",
      "Name": "Firstname Lastname",
      "MailboxHash": "SampleHash"
    }
  ],
  "Cc": "\"First Cc\" <firstcc@postmarkapp.com>, secondCc@postmarkapp.com",
  "CcFull": [
    {
      "Email": "firstcc@postmarkapp.com",
      "Name": "First Cc",
      "MailboxHash": ""
    },
    {
      "Email": "secondCc@postmarkapp.com",
      "Name": "",
      "MailboxHash": ""
    }
  ],
  "Bcc": "\"First Bcc\" <firstbcc@postmarkapp.com>",
  "BccFull": [
    {
      "Email": "firstbcc@postmarkapp.com",
      "Name": "First Bcc",
      "MailboxHash": ""
    }
  ],
  "OriginalRecipient": "mailbox+SampleHash@inbound.postmarkapp.com",
  "Subject": "Test subject",
  "MessageID": "73e6d360-66eb-11e1-8e72-a8904824019b",
  "ReplyTo": "replyto@postmarkapp.com",
  "MailboxHash": "SampleHash",
  "Date": "Mon, 20 Feb 2017 03:08:23 -0500",
  "TextBody": "This is a test text body.",
  "HtmlBody": "&lt;html&gt;&lt;body&gt;&lt;p&gt;This is a test html body.&lt;\/p&gt;&lt;\/body&gt;&lt;\/html&gt;",
  "StrippedTextReply": "This is the reply text",
  "Tag": "TestTag",
  "Headers": [
    {
      "Name": "X-Header-Test",
      "Value": ""
    }
  ],
  "Attachments": [
    {
      "Name": "test.txt",
      "Content": "VGhpcyBpcyBhdHRhY2htZW50IGNvbnRlbnRzLCBiYXNlLTY0IGVuY29kZWQu",
      "ContentType": "text/plain",
      "ContentLength": 45
    }
  ]
}
