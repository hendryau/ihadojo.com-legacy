/**
 * @author hendryau
 *
 */
angular.module('ihaDojo')
	.directive('associationMap', ['$http', function($http) {
		return {
			templateUrl: 'templates/association_map_template.html',
			link: function(scope, element, attrs) {
				var mapCanvas = document.getElementById('association-map');
				var mapOptions = {
					center: new google.maps.LatLng(42.701848,-84.482172), //hombu latlng
					zoom: 1
				}
				
				var map = new google.maps.Map(mapCanvas, mapOptions);

				function placeMarker(type, dojo) {
					new google.maps.Marker({
						position: new google.maps.LatLng(dojo.lat, dojo.lng),
						map: map,
						title: dojo.instructor[0].name
					});
				}
				
				$http.get('data/hombu.json').then(function(hombu) {
					placeMarker('hombu', hombu.data[0]);
					$http.get('data/shibu.json').then(function(shibu) {
						shibu.data.forEach(function(dojo) {
							placeMarker('shibu', dojo);
						});
						$http.get('data/fukuShibu.json').then(function(fukuShibu) {
							fukuShibu.data.forEach(function(dojo) {
								placeMarker('fukuShibu', dojo);
							});
							$http.get('data/junShibu.json').then(function(junShibu) {
								if (junShibu.data instanceof Array) junShibu.data.forEach(function(dojo) {
									placeMarker('junShibu', dojo);
								});
							});
						});
					});
				});
			}
		}
	}]);