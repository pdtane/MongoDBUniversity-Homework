var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/photosharing', function(err, db) {
    if(err) throw err;
    var imageIds = [];
    
    db.collection('images').find({}, {_id: 1}).toArray(function(err, result) {
       for(var i = 0, length = result.length; i < length; i++) {
           imageIds.push(result[i]._id);
       }
       
        db.collection('albums').aggregate(
         [
           { $unwind: '$images' },
           { $group: {'_id': '$images'}},
           { $sort: {_id: 1}}
         ]
    	).toArray(function(err, albums) {
            
           var albumImageIds = [];
           for(var i = 0, length = albums.length; i < length; i++) {
               albumImageIds.push(albums[i]._id);
           }
           
           console.dir(albumImageIds);
           
           for(var j = 0, l = imageIds.length; j < l; j++) {
               var id = imageIds[j];
               if(albumImageIds.indexOf(id) === -1) {
                    console.dir('Removing ' + id);
                    
                    db.collection('images').remove({ _id: id}, function(err, numRemoved) {
                        if(err) throw err;
                    }); 
               }
           }
        });
       
       
    });
    
    
    
    
    
    
   
    
    

    /*db.collection('albums').findOne(function(err, doc) {
        if(err) throw err;

        if (!doc) {
            console.dir("No document found");
            return db.close();
        }

        console.log("doc: " + doc.images);
        return db.close();
    });*/
});
