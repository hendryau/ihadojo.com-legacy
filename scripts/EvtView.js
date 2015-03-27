/**
 * @author hendryau
 * 
 */
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
		
		ctrl.isPastEvt = function(evt) {
			var endDate = new Date(evt.end);
			var now = new Date();
			if (now.getTime() > endDate.getTime()) {
				return true;
			}
			return false;
		}
		
		ctrl.getHostLabel = function(evt) {
			if (evt.host instanceof Array && evt.host.length > 0) {
				return 'Hosts';
			}
			
			return 'Host';
		}
		
		ctrl.getHostString = function(evt) {
			if (typeof evt.host === 'string') {
				return evt.host;
			}
			
			var result = '';
			for (var i=0; i<evt.host.length; i++) {
				result += evt.host[i];
				if (i+1 === evt.host.length) {
					break;
				}
				result += ', ';
			}
			
			return result;
		}
		
	}]);