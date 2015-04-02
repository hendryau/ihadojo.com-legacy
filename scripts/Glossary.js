/**
 * @author hendryau
 *
 */
angular.module('ihaDojo')
	.directive('glossary', ['$http', function($http) {
		return {
			templateUrl: 'templates/directives/glossary_template.html',
			controller: 'GlossaryCtrl',
			controllerAs: 'ctrl',
			link: function(scope, element, attrs) {
				$http.get('data/glossary.json').then(function(response) {
					scope.ctrl.glossary = response.data.sort(function(a, b) {
						return a.term > b.term;
					});
				});
			}
		}
	}])
	.controller('GlossaryCtrl', [function() {
		
	}]);