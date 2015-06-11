var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://schoolSU:schoolOwner@localhost:27017/school', function(err, db) {
    if(err) throw err;

    db.collection('students').find().each(function(err, item) {
        if(err) throw err;
        
        if(item !== null) {
            var scores = item.scores;
            var lowestScore = 1000;
            for(var i = 0, length = scores.length; i < length; i++) {
                var score = scores[i];
                if(score.type === 'homework' && score.score < lowestScore) {
                    lowestScore = score.score;
                }
            }
            
            console.dir('lowest score for ' + item.name + ' is '  + lowestScore);
            
            var query = { _id : item._id };
            var update = { $pull: { 'scores' : { 'type': 'homework', 'score' : lowestScore } } };
            db.collection('students').update(query, update, function(err, updated) {
                if(err) throw err;
                console.dir('1 record updated');
                
            });
        }
        

       
    });
});
