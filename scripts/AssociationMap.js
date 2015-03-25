/**
 * @author hendryau
 *
 */
angular.module('ihaDojo')
	.directive('associationMap', [function() {
		return {
			templateUrl: 'templates/association_map_template.html',
			link: function(scope, element, attrs) {
				var mapCanvas = document.getElementById('association-map');
				var mapOptions = {
					center: new google.maps.LatLng(42.701848,-84.482172), //hombu latlng
					zoom: 3
				}
				var map = new google.maps.Map(mapCanvas, mapOptions);
				
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode( { 'address': "2018 East Michigan Ave, Lansing MI USA"}, function(results, status) {
				  if (status == google.maps.GeocoderStatus.OK) {
				    new google.maps.Marker({
				        position: new google.maps.LatLng(results[0].geometry.location.k,results[0].geometry.location.D),
				        map: map,
				        title: 'Hombu'
				    });
				  } else {
				    console.log('failed to geocode');
				  }
				});
				
			}
		}
	}]);