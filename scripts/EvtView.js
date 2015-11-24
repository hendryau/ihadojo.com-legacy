/**
 * @author hendryau
 * 
 */
angular.module('ihaDojo')
	.directive('evtView', ['$http', '$parse', function($http, $parse) {
		return {
			scope: {
				showPastEvts: '&',
				evtCount: '='
			},
			templateUrl: '/templates/directives/evt_view_template.html',
			controller: 'EvtCtrl',
			controllerAs: 'ctrl', 
			link: function(scope, element, attrs) {
				var showPastEvts = $parse(attrs.showPastEvts)(scope);
				var evtCount = $parse(attrs.evtCount)(scope);
				
				if (showPastEvts == null) {
					scope.ctrl.showPastEvts = true;
				}
				else {
					scope.ctrl.showPastEvts = showPastEvts;
				}
				
				if (evtCount == null) {
					scope.ctrl.evtCount = 9000;
				}
				else {
					scope.ctrl.evtCount = evtCount;
				}
				
				$http.get('data/events.json').then(function(response) {
					scope.ctrl.evts = scope.ctrl.initializeEvts(response.data);
				}); 
			}
		} 
	}])
	.controller('EvtCtrl', [function() {
		var ctrl = this;
		
		ctrl.initializeEvts = function(evts) {
			//TODO do not assume sorted
			var result = [];
			for (var i=0; i<evts.length; i++) {
				var evt = evts[i];
				if (ctrl.isPastEvt(evt) && !ctrl.showPastEvts) {
					continue;
				}
				result.push(evt);
				if (result.length === ctrl.evtCount) {
					break;
				}
			}
			return result;
		}
		
		ctrl.getDisplayDate = function(evt) {
			var startDate = new Date(evt.start);
			var endDate = new Date(evt.end);
			
			if (startDate.getTime() === endDate.getTime()) {
				return evt.start;
			}
			
			return evt.start + ' - ' + evt.end;
		}
		
		ctrl.isPastEvt = function(evt) {
			var now = new Date();
			var dayAfterEndDate = new Date(new Date(evt.end).getTime() + 86400000);
			
			if (now > dayAfterEndDate) {
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