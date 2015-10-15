Profile.controller('ProfileController', [
  '$rootScope',
  'ProfileService',
  '$scope',
  'User',
  function ($rootScope, ProfileService, $scope, User) {

    $scope.viewTitle = 'Profile';

    $scope.showMyReservations = function () {
      if (ProfileService.getCurrentUserId()) {
        return true;
      }
      return false;
    };
    $scope.showReceiveNotifications = function(){
      var pushNotificationsEnabled = true;
//      if (ProfileService.getCurrentUserId()) {
//        return true;
//      }
      return pushNotificationsEnabled;
    };
  }
]);
Profile.controller('LoginController', [
  '$scope',
  '$state',
  'User',
  function ($scope, $state, User) {
    
    $scope.credentials = {
    };
    // TODO move to Profile Service
    $scope.login = function () {

      $scope.loginResult = User.login($scope.credentials,
        function () {

          // TODO make a more robust API call here
          window.localStorage.setItem('currentUserId', $scope.loginResult.userId);
          window.localStorage.setItem('accessToken', $scope.loginResult.id);
          User.shops(
            { id: $scope.loginResult.userId },
            function(list) {
              if (list && list.length>0)
                window.localStorage.setItem('shopId', list[0].id);
            },
            function(errorResponse) { /* error */ }
          );
          // User.shops({"id":$scope.loginResult.userId})
          //   .$promise
          //   .then(function(results) {
          //     console.log("results", results);
          //   });

          $state.go('home');

          //$location.path('/');
        },
        function (res) {
          $scope.loginError = res.data.error;
        }
      );
    };
  }
]);
Profile.controller('RegisterController', [
  '$scope',
  '$state',
  'User',
  function ($scope, $state, User) {

    $scope.registration = {};

    $scope.register = function () {
      $scope.user = User.save($scope.registration,
        function () {
          $state.go('login');
        },
        function (res) {
          $scope.registerError = res.data.error;
        }
      );
    };

    $scope.getCarThumb = function (res) {
      return 'http://0.0.0.0:3000/images/car/midsize-thumb.png';
    };
  }
]);
