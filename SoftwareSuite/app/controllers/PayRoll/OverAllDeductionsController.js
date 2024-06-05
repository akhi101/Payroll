define(['app'], function (app) {
    app.controller("OverAllDeductionsController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
     $scope.Values = [{ "id": 1, "name": "Yes" }, { "id": 0, "name": "No" }]
        $ctrl.$onInit = () => {
            $scope.EmployeeData = false;
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.userName;
        $scope.FinancialYears();
            $scope.GetMonths();
            $scope.GetEditNPS();
    }
        $scope.FinancialYears = function () {
            var getdesign = PayRollService.GetFinancialYears();
            getdesign.then(function (response) {

                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.FinancialYears = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.FinancialYears = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Financial Years");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetMonths = function () {
            var getmonths = PayRollService.GetMonths();
            getmonths.then(function (response) {

                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.MonthsData = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.MonthsData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Months");
                    var err = JSON.parse(error);

                });
        }


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

        $scope.SaveNPS = function () {
            var datatypeid = 1
            console.log(datatypeid, null, $scope.NPSFinancialYear, $scope.NPSMonth, $scope.NPSEmployeeId, $scope.PensionAmount, 1, $scope.UserName)
            var AddDepartment = PayRollService.AddorUpdateNPS(datatypeid, null, $scope.NPSFinancialYear, $scope.NPSMonth, $scope.NPSEmployeeId, $scope.PensionAmount, 1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.EmployeeData = false;
                    $scope.PensionAmount = "";
                    $scope.GetEditNPS();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetEditNPS();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


        $scope.GetReport = function () {
            $scope.EmployeeData = true;
        }


        $scope.GetHBAReport = function () {
            $scope.HBAEmployeeData = true;
        }
        

        $scope.ChangeEmpData = function (data) {
           
            var data = JSON.parse(data)
            $scope.NPSEmployeeId = data.EmployeeID
            $scope.EmployeeCode = data.EmployeeCode
            $scope.EmployeeName = data.EmployeeName
            $scope.Designation = data.DesignationName

        }

        $scope.ChangeHBAEmpData = function (data) {
            $scope.HBAEmployeeId = data.EmployeeID
            $scope.HBAEmployeeCode = data.EmployeeCode
            $scope.HBAEmployeeName = data.EmployeeName
            $scope.HBADesignation = data.DesignationName

        }

        $scope.GetEditNPS = function () {
        var DataTypeID = 1
            var getdesign = PayRollService.GetEditNPS(DataTypeID, 0, 0);
        getdesign.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            //$scope.edit = true;
            if (res.Table.length > 0) {
                $scope.NPSData = res.Table;
                $scope.Noreports = false;
            }
            else {
                $scope.NPSData = [];
                $scope.Noreports = true;
            }
        },
            function (error) {
                alert("error while loading Employee Details");
                var err = JSON.parse(error);

            });

            $scope.SaveHBA = function () {
                var datatypeid = 1;
                console.log(datatypeid, null, $scope.HBAFinancialYear, $scope.HBAMonth, $scope.HBAEmployeeId, $scope.HBAAmount, $scope.HBAMonths, $scope.HBAMonthId, 1, $scope.UserName)
                var AddDepartment = PayRollService.AddorUpdateHBA(datatypeid, null, $scope.HBAFinancialYear, $scope.HBAMonth, $scope.HBAEmployeeId, $scope.HBAAmount, $scope.HBAMonths, $scope.HBAMonthId, 1, $scope.UserName)
                AddDepartment.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    } catch (err) { }
                    if (res[0].ResponseCode == '200') {
                        alert(res[0].ResponseDescription);
                        $scope.EmployeeData = false;
                        $scope.PensionAmount = "";
                        $scope.GetEditNPS();

                    }
                    else if (res[0].ResponseCode == '400') {
                        alert(res[0].ResponseDescription);
                        $scope.GetEditNPS();

                    } else {
                        alert('Something Went Wrong')

                    }
                },
                    function (error) {
                        alert("something Went Wrong")


                    });
            }

        }
    })
})