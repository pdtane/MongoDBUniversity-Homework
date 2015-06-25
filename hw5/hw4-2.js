use test

db.zips.aggregate([
    { $match: {
    	$or: [
    		{state: 'CA'},
    		{state: 'NY'}
    	]
     }},
     {
     	$group: {

     		_id: { state: '$state', city: '$city'},
     		population: { $sum: '$pop' }
     	}
     },
     {
     	$match: {
     		population: { $gt: 25000 }
     	}
     },
     {
     	$group: {
     		_id: null,
     		average_population: { $avg: '$population' }

     	}

     }
   
])

it
it
it
it