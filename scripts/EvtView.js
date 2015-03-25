angular.module('ihaDojo')
	.directive('evtView', ['$http', function($http) {
		return {
			templateUrl: 'templates/evt_view_template.html',
			controller: 'EvtViewCtrl',
			controllerAs: 'ctrl', 
			link: function(scope, element, attrs) {
				$http.get('data/events.json').then(function(response) {
					scope.ctrl.evts = response.data;
				}); 
			}
		} 
	}])
	.controller('EvtViewCtrl', [function() {
		var ctrl = this;
		
		ctrl.getDisplayDate = function(evt) {
			var startDate = new Date(evt.start);
			var endDate = new Date(evt.end);
			
			if (startDate.getTime() === endDate.getTime()) {
				return evt.start;
			}
			
			return evt.start + ' - ' + evt.end;
		}
		
		ctrl.hasPassed = function(evt) {
			var endDate = new Date(evt.end)
			if (new Date() > endDate) {
				return true;
			}
			return false;
		}
		
		ctrl.showDetails = function(evt) {
			if (ctrl.hasPassed(evt)) {
				return false;
			}
			
			return evt.location;
		}
	}]);