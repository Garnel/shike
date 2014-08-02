sumeru.router.add(
    {
        pattern:'/waitStore',
        action:'App.waitStore'
    }
);

App.waitStore = sumeru.controller.create(function(env, session){
    var loghu = function(str){
        console.log('start```````````````');
        console.log(str);
        console.log('end`````````````````');
    };

    var calNumQueue = function(queue, num){
        var i = 0;
        for(i=0 ; i<queue.length ; i++){
            if(queue[i] >= num){
                break;
            };
        };
        return i;
    };

    var getStaticWaitStore = function(){
        return {
            name:"海底捞",
            type:"",
            coordinate:[],
            description:"",
            num_perhour:10,
            waiting_queue:[166, 167, 168, 169, 170],
            picture:""
        };
    };

    var getWaitInfo = function(wsi, user_num){
        var num_front = calNumQueue(wsi.waiting_queue, user_num);
        var waittime = num_front*1.0/wsi.num_perhour*60;

        var waitinfo = {
            store_name:wsi.name,
            time_to_wait:waittime,
            user_id:user_num,
            num_front:num_front,
            picture:wsi.picture
        };

        return waitinfo;
    };

    var getWaitStores = function(){
        try{
            session.Store = env.subscribe('pub-waitStoreAll', function(storeCollection){
                var storeid = parseInt(session.get('storeid'));
                var usernum = parseInt(session.get('waitnum'));
                var infos = getWaitInfo(storeCollection.find({id:storeid})[0], usernum);
                session.waittime = infos.time_to_wait;
                session.bind('waitinfo_container', {
                    waitinfo: infos
                });
            });
        } catch(e){
            loghu(e.name+":"+e.message);
        }
    }

    var getStores = function(){
        try{
            session.Store = env.subscribe('pub-pushStoreAll', function(storeCollection){
                //session.bind('storeinfo_container', {
                    //data:storeCollection.find(),
                    //waittime:session.waittime
                //});
            });
        } catch(e){
            loghu(e.name+":"+e.message);
        }
    };

    env.onload = function(){
        loghu('onload end');
        try{
            var storecollec = sumeru.collection.create({'modelName':'Model.waitStore'});
            var store1 = sumeru.model.create('Model.waitStore');
        } catch(e){
            console.log(e.name+":"+e.message);
        }
        return [getWaitStores, getStores];
    };

    env.onrender = function(doRender){
        try{
            session.bind('storeinfo_container', {
                data:session.Store.find(),
                waittime:session.waittime
            });
            doRender('testWaitStore', ['push', 'left']);
            loghu('render end');
        } catch(e){
            loghu(e.name+":"+e.message);
        }
    };

    var $ = function(id){
        return document.getElementById(id);
    }
});

