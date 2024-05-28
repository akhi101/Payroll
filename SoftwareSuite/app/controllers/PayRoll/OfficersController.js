define(['app'], function (app) {
    app.controller("OfficersController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.EmployeeData = false;
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.userName;
            $scope.MedicalLeaves = 1;
            $scope.CasualLeaves = 2;
            $scope.EarnLeaves=3
            $scope.TotalLeaves=10
            $scope.FinancialYears();
            $scope.GetEmployeeDetails();
            $scope.GetMonths();
            $scope.GetIncrements();
            $scope.GetorEditDeductions();
            $scope.GetorEditLeaves();
        }

        $scope.GetData = function () {
            let datatype = 1
            var finyr = PayRollService.GetIncrements(datatype, 0, 0)
            finyr.then(function (response) {
                var res = JSON.parse(response)
                $scope.GetAllIncrements = res.Table;

                for (var j = 1; j < $scope.GetAllIncrements.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

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


        $scope.GetorEditDeductions = function () {
            var getdesign = PayRollService.GetorEditDeductions(1, 1, 0);
            getdesign.then(function (response) {
                var response = JSON.parse(response)
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.GetAllDeductions = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.GetAllDeductions = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Deductions Data");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetorEditLeaves = function () {
            let DataType = 1;
            var getdesign = PayRollService.GetorEditLeaves(DataType,0,0,0,0);
            getdesign.then(function (resp) {
                console.log(resp)
                var response = JSON.parse(resp)
                console.log(response)
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.EmployeeLeaveData = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.EmployeeLeaveData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Leaves Data");
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
                    $scope.savebutton = true;
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



        $scope.ChangeEmpDedData = function (data) {
            var data = JSON.parse(data)
            $scope.EmployeeId = data.EmployeeID
            $scope.EmployeeCode = data.EmployeeCode
            $scope.EmployeeName = data.EmployeeName
            $scope.Designation = data.DesignationName
            
        }

        $scope.ChangeEmpLevData = function (data) {
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






        $scope.SaveDeduction = function () {
            var datatypeid = 1

            var datatypeid = 1
            var AddDepartment = PayRollService.AddorUpdateDeductions(datatypeid, null, $scope.FinancialYear, $scope.Month, $scope.EmployeeId, $scope.IT, $scope.FlagFund, $scope.Harithanidhi, $scope.DeductionAmount, 1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditDeductions()

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditDeductions()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.SaveLeaves = function () {
            var datatypeid = 1

            var datatypeid = 1
            var AddDepartment = PayRollService.AddorUpdateLeaves(datatypeid, 0, $scope.FinancialYear, $scope.Month, $scope.EmployeeId, $scope.TotalLeaves, $scope.MedicalLeaves, $scope.CasualLeaves, $scope.EarnLeaves ,$scope.LeavesRequired, 1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditLeaves()

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditLeaves()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.ChangeLeaves = function () {
            //alert()
            $scope.LeavesRequired = parseInt($scope.MedicalLeaves) + parseInt($scope.CasualLeaves) + parseInt($scope.EarnLeaves);
            $scope.RemainingLeaves = parseInt($scope.TotalLeaves) - parseInt($scope.LeavesRequired)
        }
        

        
        
        
        $scope.Years = ['2021', '2022', '2023', '2024', '2025'];
        //$scope.SubBillers = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY'];
    })
})