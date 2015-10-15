Profile.service('ProfileService', [
  'User',
  function (User) {
    var svc = {};

    svc.getCurrentUserId = function () {
      return window.localStorage.getItem('currentUserId');
    };

    svc.getCurrentShopId = function () {
      return window.localStorage.getItem('shopId');
    };

    svc.authUser = function () {
      return false;
    };

    svc.logCurrentUserOut = function () {
      window.localStorage.removeItem('currentUserId');
      window.localStorage.removeItem('shopId');
      window.localStorage.removeItem('accessToken');
      User.logout();
    };

    return svc;

  }
]);






