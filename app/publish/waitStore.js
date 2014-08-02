module.exports = function(fw){
    try{
        fw.publish('waitStore', 'pub-waitStoreAll', function(callback){
            var collection = this;
            collection.find({}, function(err, items){
                callback(items);
            });
        });
    } catch(e){
        console.log(e.name+":"+e.message);
    }
};
