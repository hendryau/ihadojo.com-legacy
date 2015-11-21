/**
 * @author hendryau
 * 
 */
angular.module('ihaDojo')
	.directive('dojoList', ['$http', function($http) {
		return {
			scope: {},
			controller: 'DojoListCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'templates/directives/dojo_list_template.html',
			link: function(scope, element, attrs) {
				scope.ctrl.type = attrs.type;
				if (scope.ctrl.type === 'hombu') {
					$http.get('data/hombu.json').then(function(response) {
						scope.ctrl.dojos = response.data
					});
				}
				else if (scope.ctrl.type === 'shibu') {
					$http.get('data/shibu.json').then(function(response) {
						scope.ctrl.dojos = response.data
					});
				}
				else if (scope.ctrl.type === 'fuku shibu') {
					$http.get('data/fukuShibu.json').then(function(response) {
						scope.ctrl.dojos = response.data
					});
				}
				else if (scope.ctrl.type === 'jun shibu') {
					$http.get('data/junShibu.json').then(function(response) {
						scope.ctrl.dojos = response.data
					});
				}
				else {
					throw new Exception('Unknown Dojo Type');
				}
			}
		}
	}])
	.controller('DojoListCtrl', [function(){
		var ctrl = this;
		this.dojos = {};

		this.getId = function(dojo) {
			return dojo.dojo.replace(/ /g, '').replace(/-/g, '').replace(/\./g, '');
		}
	}]);