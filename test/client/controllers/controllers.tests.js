
describe('Controllers', function(){

    // load the controller's module
    // beforeEach(module('app'));
    beforeEach(angular.mock.module('app'));

    // tests start here
    it('should have a Home module', function() {
        expect(Home).to.not.be.undefined;
    });

  it('should have a properly working HomeController controller', 
    inject(function($rootScope, $controller, $httpBackend) {

    window.localStorage.removeItem('currentUserId');
    window.localStorage.removeItem('shopId');

    var $scope = $rootScope.$new();
    var ctrl = $controller('HomeController', {
      $scope : $scope,
    });

    expect($scope.viewTitle).to.equal('FoodPoints');
    expect($scope.showMyBalance()).to.equal(false);
    expect($scope.showCredit()).to.equal(false);
    expect($scope.showDebit()).to.equal(false);
    expect($scope.showBalance()).to.equal(false);
    expect($scope.showLogin()).to.equal(true);
    expect($scope.showRegister()).to.equal(true);

  }));

  it('HomeController unauthenticated', 
    inject(function($rootScope, $controller, $httpBackend) {
    
    window.localStorage.removeItem('currentUserId');
    window.localStorage.removeItem('shopId');

    var $scope = $rootScope.$new();
    var ctrl = $controller('HomeController', {
      $scope : $scope,
    });

    expect($scope.viewTitle).to.equal('FoodPoints');
    expect($scope.showMyBalance()).to.equal(false);
    expect($scope.showCredit()).to.equal(false);
    expect($scope.showDebit()).to.equal(false);
    expect($scope.showBalance()).to.equal(false);
    expect($scope.showLogin()).to.equal(true);
    expect($scope.showRegister()).to.equal(true);

  }));

  it('HomeController user', 
    inject(function($rootScope, $controller, $httpBackend) {
    
    window.localStorage.removeItem('currentUserId');
    window.localStorage.removeItem('shopId');
    window.localStorage.setItem('currentUserId', 'currentUserId');

    var $scope = $rootScope.$new();
    var ctrl = $controller('HomeController', {
      $scope : $scope,
    });

    expect($scope.viewTitle).to.equal('FoodPoints');
    expect($scope.showMyBalance()).to.equal(true);
    expect($scope.showCredit()).to.equal(false);
    expect($scope.showDebit()).to.equal(false);
    expect($scope.showBalance()).to.equal(false);
    expect($scope.showLogin()).to.equal(false);
    expect($scope.showRegister()).to.equal(false);

  }));

  it('HomeController owner', 
    inject(function($rootScope, $controller, $httpBackend) {
    
    window.localStorage.removeItem('currentUserId');
    window.localStorage.removeItem('shopId');
    window.localStorage.setItem('currentUserId', 'currentUserId');
    window.localStorage.setItem('shopId', 'shopId');

    var $scope = $rootScope.$new();
    var ctrl = $controller('HomeController', {
      $scope : $scope,
    });

    expect($scope.viewTitle).to.equal('FoodPoints');
    expect($scope.showMyBalance()).to.equal(false);
    expect($scope.showCredit()).to.equal(true);
    expect($scope.showDebit()).to.equal(true);
    expect($scope.showBalance()).to.equal(true);
    expect($scope.showLogin()).to.equal(false);
    expect($scope.showRegister()).to.equal(false);

  }));

});