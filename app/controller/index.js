sumeru.router.add(
	{
		pattern: '/index',
		action: 'App.index'
	}

);

sumeru.router.setDefault('App.index');

App.index = sumeru.controller.create(function(env, session){

	env.onrender = function(doRender){
		doRender("index", ['push','left']);
	};

    //onready is respond for event binding and data manipulate
    env.onready = function(){
        Library.touch.on('#scan_qr', 'touchstart', scanQr);
        // Library.touch.on('#search', 'touchstart', );
    };

    var scanQr = function() {
        clouda.device.qr.startCapture({
            onsuccess: function(data){
                console.log("open link: ", data);
                window.open(data,"_self");
            },
            onfail: function(err){
                console.log("fail", err);
            },
            type: clouda.device.QR_TYPE.QRCODE
        });
    };
});
