(function () {
    'use strict';

    angular
        .module('jhipsterSampleGatewayApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
