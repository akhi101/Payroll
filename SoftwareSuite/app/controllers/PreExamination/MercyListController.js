define(['app'], function (app) {
    app.controller("MercyListController", function ($scope, $http, $localStorage, $uibModal, $state, AppSettings, PreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.Data = false;
        $scope.Nodata = false;

        var MercyList = PreExaminationService.GetMercyList();
        MercyList.then(function (response) {
            //var response = JSON.parse(response)
            //console.log(response);
            if (response.Table.length > 0) {
                $scope.$emit('hideLoading', data);

                $scope.Data = true;
                $scope.Nodata = false;
                $scope.MercyData = response.Table;
                
            } else {
                $scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
            }



        },
            function (error) {
                $scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });


    })
})