exports.routes = function (map) {
	map.root('radar#index');

	map.resources('about');
	map.get('reg', 'about#index#');

	map.resources('radar');
	map.resources('sel');

    map.resources('posts');

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};