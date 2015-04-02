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
						var a2 = a.term.toLowerCase();
						var b2 = b.term.toLowerCase();
						
						if (a2 < b2) {
							return -1;
						}
						if (a2 > b2) {
							return 1;
						}
						
						return 0;
					});
				});
			}
		}
	}])
	.controller('GlossaryCtrl', [function() {
		
	}]);