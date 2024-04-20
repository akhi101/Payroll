define(['app'], function (app) {
    app.controller("OverAllDeductionsController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService) {

        $scope.Values = [{ "id": 1, "name": "Yes" }, { "id": 0, "name": "No" }]

    })
})