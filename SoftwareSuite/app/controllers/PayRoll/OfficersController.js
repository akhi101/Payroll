define(['app'], function (app) {
    app.controller("OfficersController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService) {
        $scope.Years = ['2021', '2022', '2023', '2024', '2025'];
        $scope.SubBillers = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY'];
    })
})