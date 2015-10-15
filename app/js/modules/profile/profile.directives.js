Profile.directive('lbLogout', [
  'User',
  function (User) {
    return{
      template: '<button class="button button-full button-outline" ng-click="logout()" ng-show="isUserAuth()">logout</button>',
      controller: function ($scope, User, ProfileService) {
        $scope.logout = function () {
          ProfileService.logCurrentUserOut();
        };
        $scope.isUserAuth = function () {
          return ProfileService.getCurrentUserId();
        };
      },
      replace: true
    };
  }

]);