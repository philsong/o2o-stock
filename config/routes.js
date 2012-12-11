exports.routes = function (map) {
	//map.root('radar#index');
    map.root('about#index');

	map.resources('about');
	//map.get('reg', 'users#new');

	map.resources('radar');
	map.resources('sel');

    map.resources('posts');
    map.resources('users');
    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};