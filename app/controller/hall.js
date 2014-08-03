sumeru.router.add(
    {
        pattern: '/hall',
        action : 'App.hall'
    }
);

App.hall = sumeru.controller.create(function(env, session){
    var getMsgs = function(){
        try {
            session.messages = env.subscribe('pub-message', function(msgCollection){
                var storeid = parseInt(session.get('storeid'));
                session.bind('message-hall', {
                    data: msgCollection.find({'storeid': storeid})
                });
            });
        } catch (e) {
            loghu(e.name + ": " + e.message)
        }
     };
    //onload is respond for handle all data subscription
    env.onload = function(){
        return [getMsgs];
    };

    //sceneRender is respond for handle view render and transition
    env.onrender = function(doRender){
        doRender('hall', ['push', 'left']);
    };
    //onready is respond for event binding and data manipulate
    env.onready = function(){
        Library.touch.on('.messageSubmit', 'touchstart', submitMessage);
    };

    var submitMessage = function(){
        var input = document.getElementById('messageInput'),
            inputVal = input.value.trim();
        if (inputVal == '') {
           return false;
        };

        var storeid = parseInt(session.get('storeid')),
            waitnum = session.get('waitnum');
        session.messages.add({
            'storeid': storeid,
            'waitnum': waitnum,
            'content' : inputVal
        });
        session.messages.save();
        input.value = '';
    };
});
