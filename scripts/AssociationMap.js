/**
 * @author hendryau
 *
 */
angular.module('ihaDojo')
	.directive('associationMap', ['$http', function($http) {
		return {
			template: '<div id="association-map" class="iha-map"></div>',
			link: function(scope, element, attrs) {
				var mapCanvas = document.getElementById('association-map');
				var mapOptions = {
					center: new google.maps.LatLng(42.733363, -84.521598), //hombu latlng
					zoom: 1
				}
				
				var map = new google.maps.Map(mapCanvas, mapOptions);

				function placeMarker(type, dojo) {
					var icon = '';
					if (type === 'hombu') {
						icon = 'imgs/marker-ylw.png';
					}
					else if (type === 'shibu') {
						icon = 'imgs/marker-red.png';
					}
					else if (type === 'fukuShibu') {
						icon = 'imgs/marker-blu.png'
					}
					
					new google.maps.Marker({
						position: new google.maps.LatLng(dojo.lat, dojo.lng),
						map: map,
						icon: icon,
						title: dojo.instructor[0].name
					});
				}
				
				if (attrs.hombu) {
					$http.get('data/hombu.json').then(function(hombu) {
						placeMarker('hombu', hombu.data[0]);
						map.zoom = 15;
					});
					return;
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