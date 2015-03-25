/**
 * @author hendryau
 * 
 */
angular.module('ihaDojo')
	.directive('itinerary', ['$http', function($http) {
		return {
			restrict: 'E',
			templateUrl: 'templates/itinerary_template.html',
			controller: 'ItineraryCtrl',
			controllerAs: 'ctrl',
			link: function(scope, element, attrs) {
				$http.get('data/itinerary.json').then(function(response) {
					scope.ctrl.itin = response.data;
					scope.ctrl.currentEvt = scope.ctrl.getCurrentEvt();
				});
			}
		}
	}])
	.controller('ItineraryCtrl', [function() {
		var ctrl = this;
		ctrl.months = ['January', 'February', 'March', 'April', 'May', 'June',
		               'July', 'August', 'September', 'October', 'November', 'December'];
		
		ctrl.getCurrentEvt = function() {
			var now = new Date();
			var currentEvt = null;
			
			ctrl.months.forEach(function(month) {
				ctrl.itin[month].forEach(function(evt) {
					var start = new Date(evt.start);
					var end = new Date(evt.end);
					if (start < now && end > now) {
						currentEvt = evt;
						return;
					}
				});
				
				if (currentEvt != null) {
					return;
				}
			});

			return currentEvt;
		}
	}]);