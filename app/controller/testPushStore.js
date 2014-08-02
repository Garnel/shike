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
                session.bind('storeinfo_container', {
                    data:storeCollection.find()
                });
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

    env.onrender = function(doRender){
        try{
            doRender('testStore', ['push', 'left']);
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
