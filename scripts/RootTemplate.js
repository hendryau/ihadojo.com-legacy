/**
 * @author hendryau
 * 
 */
angular.module('ihaDojo')
	.directive('rootTemplate', [function() {
		return {
			scope: {
				content: '='
			},
			restrict: 'E',
			templateUrl: 'templates/root_template.html'
		}
	}]);