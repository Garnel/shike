sumeru.router.add(
	{
		pattern: '/store',
		action: 'App.store'
	}
);

App.store = sumeru.controller.create(function(env, session){
	env.onrender = function(doRender){
		doRender("store", ['push','left']);
	};
});
