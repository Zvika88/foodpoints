Shop.controller('CreditController', [
  '$scope',
  '$state',
  'Shop',
  'ProfileService',
  '$ionicHistory',
  function ($scope, $state, Shop, ProfileService, $ionicHistory) {
    $scope.viewTitle = 'CreditController';

    $scope.credentials = {
    };
    if (ProfileService.getCurrentUserId())
      $scope.credentials.creatorId = ProfileService.getCurrentUserId();
    else {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('login');
    }

    if (ProfileService.getCurrentShopId())
      $scope.credentials.id = ProfileService.getCurrentShopId();
    else {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('login');
    }

    $scope.submit = function () {
      $scope.creditError = null;
      $scope.creditSuccess = null;
    	$scope.creditResult = Shop.credit($scope.credentials, 
        function (value, responseHeaders) {
          if(value.success){
            delete $scope.credentials.email;
            delete $scope.credentials.amount;
            $scope.creditSuccess = true;
          }else{
            $scope.creditError = true;
          }
        },
        function (res) {
          $scope.creditError = res.data.error;
        }
        );
    }

  }
]);

Shop.controller('DebitController', [
  '$scope',
  '$state',
  'Shop',
  'ProfileService',
  '$ionicHistory',
  function ($scope, $state, Shop, ProfileService, $ionicHistory) {
    $scope.viewTitle = 'DebitController';

    $scope.credentials = {
    };

    if (ProfileService.getCurrentUserId())
      $scope.credentials.creatorId = ProfileService.getCurrentUserId();
    else {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('login');
    }

    if (ProfileService.getCurrentShopId())
      $scope.credentials.id = ProfileService.getCurrentShopId();
    else {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('login');
    }

    $scope.submit = function () {

      $scope.creditError = null;
      $scope.creditSuccess = null;
      $scope.creditResult = Shop.debit($scope.credentials, 
        function (value, responseHeaders) {
          if(value.success){
            delete $scope.credentials.email;
            delete $scope.credentials.amount;
            $scope.creditSuccess = true;
          }else{
            $scope.creditError = true;
          }
        },
        function (res) {
          $scope.creditError = res.data.error;
        }
        );
    }

  }
]);

Shop.controller('BalanceController', [
  '$scope',
  '$state',
  'Shop',
  'ProfileService',
  '$ionicHistory',
  function ($scope, $state, Shop, ProfileService, $ionicHistory) {
    $scope.viewTitle = 'BalanceController';

    $scope.credentials = {
    };
    if (!ProfileService.getCurrentUserId()) {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('login');
    }

    if (!ProfileService.getCurrentShopId()){
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('login');
    }

    $scope.submit = function () {
      $scope.creditError = null;
      $scope.creditSuccess = null;
      $scope.creditResult = Shop.balance($scope.credentials, 
        function (value, responseHeaders) {
          console.log(value.amount);
          $scope.credentials.amount = value.amount;
          $scope.creditSuccess = true;
        },
        function (res) {
          $scope.creditError = res.data.error;
        }
        );
    }

  }
]);

Shop.controller('MyBalanceController', [
  '$scope',
  '$state',
  'User',
  'ProfileService',
  '$ionicHistory',
  function ($scope, $state, User, ProfileService, $ionicHistory) {
    $scope.amount = "buscando ...";
    query = {
      id:ProfileService.getCurrentUserId()
    };
      $scope.creditError = null;
      $scope.creditSuccess = null;
      $scope.creditResult = User.balance(query, 
        function (value, responseHeaders) {
          console.log(value.amount);
          $scope.amount = value.amount;
          $scope.creditSuccess = true;
        },
        function (res) {
          $scope.creditError = res.data.error;
        }
        );
  }
]);