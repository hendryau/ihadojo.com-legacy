/**
 * @author hendryau
 * 
 */
angular.module('ihaDojo')
	.directive('rootTemplate', [function() {
		return {
			scope: {
				content: '=?'
			},
			transclude: true,
			restrict: 'E',
			controller: 'IhaDojoCtrl',
			controllerAs: 'rootCtrl',
			templateUrl: '/templates/root_template.html'
		}
	}])
	.controller('IhaDojoCtrl', [function() {
		var ctrl = this;	
		ctrl.isMobile = false;
		
		if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
			ctrl.isMobile = true;
		}

	}]);