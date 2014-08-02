sumeru.router.add(
    {
        pattern:'/store',
        action:'App.pushStore'
    }
);

App.pushStore = sumeru.controller.create(function(env, session){
    var loghu = function(str){
        console.log('start```````````````');
        console.log(str);
        console.log('end`````````````````');
    };

    var getStores = function(){
        try{
            session.Store = env.subscribe('pub-pushStoreAll', function(storeCollection){
            });
        } catch(e){
            loghu(e.name+":"+e.message);
        }
    };

    env.onload = function(){
        loghu('onload end');
        try{
            var storecollec = sumeru.collection.create({'modelName':'Model.pushStore'});
            var store1 = sumeru.model.create('Model.pushStore');
            //store1.set('name', 'test');
            //store1.set('coordinate', [109.234,34.34]);
            //storecollec.add(store1);
            //storecollec.save();
        } catch(e){
            console.log(e.name+":"+e.message);
        }
        return [getStores];
    };

    var getIdStore = function(stores, id){
        var retArray = [];
        var len = stores.length;
        for(var i=0 ; i<len ; i++){
            if(stores.get(i).id == id){
                return stores.get(i);
            };
        }
    };

    env.onrender = function(doRender){
        try{
            var arraystore = session.Store.find();
            var thestore = getIdStore(arraystore, parseInt(session.get("id")));
            session.bind('storeinfo_container', {
                //data:storeCollection.find({"id":parseInt(session.get("id"))})
                data:thestore
            });
            doRender('detail', ['push', 'left']);
            loghu('render end');
        } catch(e){
            console.log(e.name+":"+e.message);
        }
    };

    var $ = function(id){
        return document.getElementById(id);
    }

    env.onready = function(){
    };
});
