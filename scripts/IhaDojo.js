/**
 * @author hendryau
 * 
 */
angular.module('ihaDojo', ['ui.bootstrap'])
	.controller('CarouselCtrl', ['$scope', function($scope) {
		$scope.interval = 5000;
		
		$scope.slides = [ {img: 'imgs/friendship-carousel.jpg', text: 'Friendship'},
		                  {img: 'imgs/cooperation-carousel.jpg', text: 'Cooperation'}, 
		                  {img: 'imgs/learning-carousel.jpg', text: 'Learning'} ]
		
	}]);