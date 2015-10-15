var Shop = angular.module('Shop', []).
  run(function ($http, $templateCache) {

    /*
     *
     * pre load the module templates
     *
     * */
/*
    $http.get('js/modules/shop/templates/credit.directive.template.html').
      success(function (res) {
        $templateCache.put('credit.directive.html', res);
      }
    );

    $http.get('js/modules/shop/templates/debit.directive.template.html').
      success(function (res) {
        $templateCache.put('debit.directive.html', res);
      }
    );

    $http.get('js/modules/shop/templates/balance.directive.template.html').
      success(function (res) {
        $templateCache.put('balance.directive.html', res);
      }
    );
*/
  }
);