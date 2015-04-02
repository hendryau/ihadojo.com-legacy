/**
 * @author hendryau
 * 
 */
angular.module('ihaDojo')
	.directive('ihaMenu', ['$location', function($location) {
		return {
			templateUrl: 'templates/directives/menu_template.html',
			controller: 'MenuCtrl',
			controllerAs: 'ctrl',
			link: function(scope, element, attrs) {
				var path = $location.absUrl().toString();
				scope.ctrl.page = path.substring(path.lastIndexOf('/')+1);
			}
		}
	}])
	.controller('MenuCtrl', [function() {
		var ctrl = this;
		
		this.getClass = function(btnId) {
			if (btnId === ctrl.page) {
				return 'btn iha-btn-selected';
			}
			return 'btn iha-btn';
		}
	}]);