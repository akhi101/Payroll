define(['app'], function (app) {
    app.controller("OfficersController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.EmployeeData = false;
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.userName;
            
            $scope.FinancialYears();
            $scope.GetEmployeeDetails();
            $scope.GetMonths();
            $scope.GetIncrements();
        }

        
        $scope.GetIncrements = function () {
            var getdesign = PayRollService.GetIncrements();
            getdesign.then(function (response) {

                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.GetAllIncrements = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.GetAllIncrements = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Increment Data");
                    var err = JSON.parse(error);

                });
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
        
        $scope.GetEmployeeDetails = function () {
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
        $scope.ChangeEmpData = function (data) {
            var data = JSON.parse(data)
            $scope.EmployeeId = data.EmployeeID
            $scope.EmployeeCode = data.EmployeeCode
            $scope.EmployeeName = data.EmployeeName
            $scope.Designation = data.DesignationName
        }

        $scope.GetReport = function () {
            $scope.EmployeeData = true;
        }


        $scope.SaveIncrement = function () {
            var datatypeid = 1


      
          
            var datatypeid = 1
            var AddDepartment = PayRollService.AddorUpdateIncrements(datatypeid, null, $scope.FinancialYear, $scope.Month, $scope.EmployeeId, $scope.IncrementAmount, 1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetIncrements()

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetIncrements()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }
        

        $scope.Years = ['2021', '2022', '2023', '2024', '2025'];
        //$scope.SubBillers = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY'];
    })
})