load('application');

action('index', function () {
	var user = req.session.oauthUser;
	if (user) {
		this.username = user.screen_name;
	}
	else
	{
		this.username = '';
	}

    render();
});