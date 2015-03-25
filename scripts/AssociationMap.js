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
					zoom: 2
				}
				
				var map = new google.maps.Map(mapCanvas, mapOptions);
				var geocoder = new google.maps.Geocoder();

				function placeMarker(type, dojo) {
					geocoder.geocode( { 'address': dojo.addr}, function(results, status) {
						  if (status == google.maps.GeocoderStatus.OK) {
						    new google.maps.Marker({
						        position: new google.maps.LatLng(results[0].geometry.location.k,results[0].geometry.location.D),
						        map: map,
						        title: dojo.instructor[0].name
						    });
						  } else {
						    console.log('failed to geocode ' + dojo.addr);
						  }
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