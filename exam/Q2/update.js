use enron

db.messages.find({'headers.Message-ID': '<8147308.1075851042335.JavaMail.evans@thyme>'}).pretty()

db.messages.update({'headers.Message-ID': '<8147308.1075851042335.JavaMail.evans@thyme>'}, 
	{ $push: { 'headers.To': 'mrpotatohead@mongodb.com'   } },
	{ multi: true }
)

db.messages.find({'headers.Message-ID': '<8147308.1075851042335.JavaMail.evans@thyme>'}).pretty()


it
it
it