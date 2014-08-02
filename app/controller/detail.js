sumeru.router.add(
	{
		pattern: '/detail',
		action: 'App.detail'
	}
);

App.detail = sumeru.controller.create(function(env, session){
	env.onrender = function(doRender){
		doRender("detail", ['push','left']);
	};
});
