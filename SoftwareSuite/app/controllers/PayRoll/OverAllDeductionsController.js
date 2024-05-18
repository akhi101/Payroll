define(['app'], function (app) {
    app.controller("OverAllDeductionsController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {

        $scope.Values = [{ "id": 1, "name": "Yes" }, { "id": 0, "name": "No" }]


        var DataTypeID = 1
        var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, 0, 0);
        getdesign.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            //$scope.edit = true;
            if (res.Table.length > 0) {
                $scope.EmployeeDetailsData = res.Table;
                $scope.Noreports = false;
            }
            else {
                $scope.EmployeeDetailsData = [];
                $scope.Noreports = true;
            }
        },
            function (error) {
                alert("error while loading Employee Details");
                var err = JSON.parse(error);

            });

    })
})