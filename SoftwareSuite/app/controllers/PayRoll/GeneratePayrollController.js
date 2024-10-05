define(['app'], function (app) {
    app.controller("GeneratePayrollController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.FinancialYears();
            
            $scope.GetMonths();
            
        }

        $scope.GetData = function () {
            let datatype = 1
            var finyr = PayRollService.GetorEditIncrements(datatype, 0, 0)
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

        $scope.getEmployeebyMonthYear = function () {
            var getmnthyr = PayRollService.GetEmployeebyMonthYear($scope.IncrementsFinancialYear, $scope.IncrementsMonth)
            getmnthyr.then(function (response) {
                var res = JSON.parse(response)
                $scope.EmployeeDatabyYearMonth = res.Table;
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
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
        



        

        


        $scope.generatemonthlysalary = function () {
           

            var generate = PayRollService.GenerateMonthlySalary( $scope.FinancialYearID1, $scope.MonthID1)
            generate.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GeneratedData = res1;

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GeneratedData = res1;
                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


        $scope.getGenerateExcel = function () {
            $scope.loading = true;
            var ReportExcel = PayRollService.GetGenerateExcel($scope.FinancialYearID1, $scope.MonthID1);
            ReportExcel.then(function (res) {
                $scope.loading = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No  Excel Report Present")
                    }
                } else {
                    alert("No Excel Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };

        





        $scope.UpdateIncrement = function (data) {
            var DataTypeId = 2


            var AddDepartment = PayRollService.AddorUpdateIncrements(DataTypeId, data.IncrementID, data.FinancialYearID, data.MonthID, data.EmployeeID, data.IncrementAmount, data.Active, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditIncrements()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditIncrements()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.ChangeActive = function (FinancialYearID, MonthID, IncrementID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollIncrement(DataType, FinancialYearID, MonthID, IncrementID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditIncrements();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditIncrements();
                } else {
                    alert("Something Went Wrong")
                }
            },
                function (error) {

                    alert("error while loading Slides");
                    //alert("error while loading Notification");

                    var err = JSON.parse(error);
                });
        }





    })
})
