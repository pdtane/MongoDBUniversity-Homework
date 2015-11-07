use enron

db.messages.aggregate([
	{$project: {_id: 1, 'headers.To': 1, 'headers.From': 1}},
	{$unwind: '$headers.To'},
	{$group: { _id: { message_id: '$_id', sender:'$headers.From'}, recipients: {$addToSet: '$headers.To'}}},
	{$unwind: '$recipients'},
	{$group: { _id: {sender: '$_id.sender', recipient: '$recipients'}, message_count: {$sum: 1}}},
	/*{$match:{
		$or:[
			{$and: [ { '_id.sender': "susan.mara@enron.com"}, 
					 { '_id.recipient': "jeff.dasovich@enron.com"}
				   ]},
			{$and: [ { '_id.sender': "susan.mara@enron.com"}, 
					 { '_id.recipient': "richard.shapiro@enron.com"}
				   ]},
			{$and: [ { '_id.sender': "soblander@carrfut.com"},
					 { '_id.recipient': "soblander@carrfut.com"} 
				   ]},
			{$and: [ { '_id.sender': "susan.mara@enron.com"}, 
					 { '_id.recipient': "james.steffes@enron.com"}
				   ]},
			{$and: [ { '_id.sender': "evelyn.metoyer@enron.com"},
					 { '_id.recipient': "kate.symes@enron.com"}
				   ]},
			{$and: [ { '_id.sender': "susan.mara@enron.com"},
					 { '_id.recipient': "alan.comnes@enron.com"} 
				   ]}
		]
	} },*/
	{$sort: {message_count: -1}}
])

it
it
it