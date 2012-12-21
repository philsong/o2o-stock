exports.routes = function (map) {
	//map.root('radar#index');
    map.get('stock','stock#index');
    map.get('stock/query','stock#query');
    map.get('stock/search','stock#search');

    map.root('stock#search');

	map.resources('about');
	map.get('reg', 'users#new');

	map.resources('radar');
	map.resources('sel');

    map.resources('posts');
    map.resources('users');
    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};