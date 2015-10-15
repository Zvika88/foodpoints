var Home = angular.module('Home', []).
  run(function ($http, $templateCache) {

    /*
     *
     * pre load the module templates
     *
     * */
    /*
     *
     * Load Home Template
     *
     * */
/*    $http.get('js/modules/home/templates/home.template.html').
      success(function (res) {
        $templateCache.put('home.html', res);
      }
    );
*/

  }
);