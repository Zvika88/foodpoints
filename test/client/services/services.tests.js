describe('Services', function(){

    beforeEach(angular.mock.module('app'));

    it('can get an instance of my factory', inject(function(ProfileService) {
        expect(ProfileService).to.not.be.undefined;
    }));

    it('not logged', inject(function(ProfileService) {
        window.localStorage.removeItem('currentUserId');
        window.localStorage.removeItem('shopId');
        expect(ProfileService.getCurrentUserId()).to.equal(null);
        expect(ProfileService.getCurrentShopId()).to.equal(null);
    }));

    it('user', inject(function(ProfileService) {
        window.localStorage.removeItem('currentUserId');
        window.localStorage.removeItem('shopId');
        window.localStorage.setItem('currentUserId', 'currentUserId');
        expect(ProfileService.getCurrentUserId()).to.equal('currentUserId');
        expect(ProfileService.getCurrentShopId()).to.equal(null);
    }));

    it('owner', inject(function(ProfileService) {
        window.localStorage.removeItem('currentUserId');
        window.localStorage.removeItem('shopId');
        window.localStorage.setItem('currentUserId', 'currentUserId');
        window.localStorage.setItem('shopId', 'shopId');
        expect(ProfileService.getCurrentUserId()).to.equal('currentUserId');
        expect(ProfileService.getCurrentShopId()).to.equal('shopId');
    }));

});