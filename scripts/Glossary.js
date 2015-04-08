/**
 * @author hendryau
 *
 */
angular.module('ihaDojo')
	.directive('glossary', ['$http', function($http) {
		return {
			controller: 'GlossaryCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'templates/directives/glossary_template.html',
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
		
	}])
	.directive('term', [function() {
		return {
			scope: {
				content: '='
			},
			templateUrl: 'templates/directives/term_template.html',
			controller: 'TermCtrl',
			controllerAs: 'ctrl',
			link: function(scope, element, attrs) {
				scope.ctrl.term = scope.content;
			}
		}
	}])
	.controller('TermCtrl', function() {
		var ctrl = this;
		
		ctrl.more = false;
		ctrl.collapsedNoteLength = 200;
		
		ctrl.hasNotes = function() {
			return ctrl.term.notes != null && ctrl.term.notes.length > 0;
		}
		
		ctrl.canShowMore = function() {
			return ctrl.hasNotes() && ctrl.term.notes.length > ctrl.collapsedNoteLength;
		}
		
		ctrl.displayString = function() {
			if (ctrl.more || ctrl.term.notes.length < ctrl.collapsedNoteLength) {
				return ctrl.term.notes;
			}
			
			return ctrl.term.notes.substring(0,ctrl.collapsedNoteLength-1).trim() + '...';
		}
		
		ctrl.moreLessStr = function() {
			if (ctrl.more) {
				return 'less';
			}
			return 'more';
		}
	});