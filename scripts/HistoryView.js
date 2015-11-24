/**
 * @author hendryau
 * 
 */
angular.module('ihaDojo')
	.directive('historyView', ['$http', function($http) {
		return {
			templateUrl: '/templates/directives/history_view_template.html',
			controller: 'HistoryCtrl',
			controllerAs: 'ctrl',
			link: function(scope, element, attrs) {
				$http.get('/data/history.json').then(function(response) {
					scope.ctrl.history = response.data.history;
					scope.ctrl.sources = response.data.sources;
				});
			}
		}
	}])
	.controller('HistoryCtrl', [function() {
		var ctrl = this;
	}]);