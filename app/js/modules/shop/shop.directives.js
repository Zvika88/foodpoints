Shop.directive('lbCreditDirective', [
  '$templateCache',
  function ($templateCache) {

    return {
      templateUrl: 'js/modules/shop/templates/credit.directive.template.html',
      controller: function ($scope) {

        //  $scope.viewTitle = 'Search';

      }
    };
  }
]);

Shop.directive('lbDebitDirective', [
  '$templateCache',
  function ($templateCache) {

    return {
      templateUrl: 'js/modules/shop/templates/debit.directive.template.html',
      controller: function ($scope) {

        //  $scope.viewTitle = 'Search';

      }
    };
  }
]);

Shop.directive('lbBalanceDirective', [
  '$templateCache',
  function ($templateCache) {

    return {
      templateUrl: 'js/modules/shop/templates/balance.directive.template.html',
      controller: function ($scope) {

        //  $scope.viewTitle = 'Search';

      }
    };
  }
]);
