/**
 * @author hendryau
 * 
 */
angular.module('ihaDojo')
	.directive('historyView', ['$http', function($http) {
		return {
			templateUrl: 'templates/history_view_template2.html',
			controller: 'HistoryCtrl',
			controllerAs: 'ctrl',
			link: function(scope, element, attrs) {
				$http.get('data/history.json').then(function(response) {
					scope.ctrl.history = response.data.history;
					scope.ctrl.sources = response.data.sources;
				});
			}
		}
	}])
	.controller('HistoryCtrl', [function() {
		var ctrl = this;
	}]);