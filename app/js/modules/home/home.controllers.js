Home.controller('HomeController', [
  '$scope',
  '$state',
  'ProfileService',
  function ($scope, $state, ProfileService) {

    $scope.viewTitle = 'FoodPoints';

    $scope.showMyBalance = function () {
      if (ProfileService.getCurrentUserId() && !ProfileService.getCurrentShopId()) {
        return true;
      }
      return false;
    };
    $scope.showCredit = function () {
      if (ProfileService.getCurrentUserId() && ProfileService.getCurrentShopId()) {
        return true;
      }
      return false;
    };
    $scope.showDebit = function () {
      if (ProfileService.getCurrentUserId() && ProfileService.getCurrentShopId()) {
        return true;
      }
      return false;
    };
    $scope.showBalance = function () {
      if (ProfileService.getCurrentUserId() && ProfileService.getCurrentShopId()) {
        return true;
      }
      return false;
    };
    $scope.showLogin = function () {
      if (ProfileService.getCurrentUserId()) {
        return false;
      }
      return true;

    };
    $scope.showRegister = function () {
      if (ProfileService.getCurrentUserId()) {
        return false;
      }
      return true;

    };

  }
]);
