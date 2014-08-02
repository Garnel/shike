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
            store_id:wsi.id,
            store_name:wsi.name,
            time_to_wait:waittime,
            user_id:user_num,
            num_front:num_front,
            picture:wsi.picture
        };

        return waitinfo;
    };

    var getLightApp = function(){
        try{
            var recommend_app = [
                {'url':'http://m.dianping.com/', 'pic':'http://images.liqucn.com/h004/h40/img201109221119530.jpg'},
                {'url':'http://m.qiushibaike.com/', 'pic':'http://img4.imgtn.bdimg.com/it/u=1657999002,41923564&fm=21&gp=0.jpg'},
                {'url':'http://m.wangfujing.com/', 'pic':'http://img1.imgtn.bdimg.com/it/u=55635788,4007731553&fm=21&gp=0.jpg'},
                {'url':'http://m.baidu.com/', 'pic':'http://img.7xz.com/files/softimg/3343/10029748/10029748_0.png'}
            ];
            session.bind('lightapp_container', {
                recoapp:recommend_app
            });
        } catch(e){
            loghu(e.name+":"+e.message);
        }
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
        return [getWaitStores, getStores, getLightApp];
    };

    var filterStore = function(stores, timelimit){
        var retArray = [];
        var len = stores.length;
        for(var i=0; i<len; i++){
            if(stores.get(i).cost_time <= timelimit){
                retArray.push(stores.get(i));
            }
        }
        return retArray;
    }

    env.onrender = function(doRender){
        try{
            var waittime = session.waittime;
            var store_array = session.Store.find();
            var array_after_filter = filterStore(store_array, waittime);
            session.bind('storeinfo_container', {
                data:array_after_filter,
            });
            doRender('store', ['push', 'left']);
            loghu('render end');
        } catch(e){
            loghu(e.name+":"+e.message);
        }
    };

    env.onready = function() {
        Library.touch.on('#social-chat', 'tap', openChat);
        Library.touch.on('#social-share', 'tap', openShare);
    };

    var $ = function(id){
        return document.getElementById(id);
    }

    var openChat = function() {
        var storeid = parseInt(session.get('storeid')),
            waitnum = session.get('waitnum');
        //env.redirect('/hall', {'storeid': storeid, 'waitnum': waitnum}, true);
        //window.open('/hall?storeid=' + storeid + "&waitnum=" + waitnum);
        var url = '/hall?storeid=' + storeid + "&waitnum=" + waitnum;
        var a = document.createElement('a');
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");

        var dispatch = document.createEvent("HTMLEvents");
        dispatch.initEvent("click", true, true);
        a.dispatchEvent(dispatch);
    }

    var openShare = function() {
        loghu("open share");
        Blend.mbaas.socialshare.callShare({
            mediaType: "all",
            content: "我是等位达人",
            onsuccess: function() {
                alert("asdffda");
            },
            onfail: function() {
                alert("asdfasdf");
            }
        });
    }
});

