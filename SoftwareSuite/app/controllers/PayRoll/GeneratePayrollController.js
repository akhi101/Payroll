define(['app'], function (app) {
    app.controller("GeneratePayrollController", function ($scope, $uibModal, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.FinancialYears();
            
            $scope.GetMonths();
            $scope.getMonths();
            
        }




        

       


        $scope.changeFinYear = function (data) {
            if (data == undefined || data=="" || data==null) {
                $scope.ClearData();
            }
        }

        $scope.changeFinYear1 = function (data) {
            if (data == undefined || data == "" || data == null) {
                $scope.ClearData1();
            }
        }

        $scope.ChangeMonth = function (data) {
            if (data == undefined || data == "" || data == null) {
                $scope.ClearData();
            }
            else {
                var generate = PayRollService.GenerateMonthlySalaryData(1,$scope.FinancialYearID1, $scope.MonthID1)
                generate.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    } catch (err) { }


                    if (res.Table[0].ResponseCode == '200') {
                        $scope.GetAllGeneratedMontlysalary = res.Table1;

                    }
                    else if (res.Table[0].ResponseCode == '400') {
                        //alert(res.Table[0].ResponseDescription);
                    } else {
                        alert('Something Went Wrong')

                    }
                },
                    function (error) {
                        alert("something Went Wrong")


                    });
            }
            }
        

        $scope.ClearData = function () {

            $scope.GetAllGeneratedMontlysalary = [];
            $scope.GetAllPublishMontlysalary = [];
         
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
            var getmonths = PayRollService.GetMonthsforGeneration();
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
        


        $scope.getMonths = function () {
            var getmonths = PayRollService.GetMonths();
            getmonths.then(function (response) {

                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.AllMonthsData = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.AllMonthsData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Months");
                    var err = JSON.parse(error);

                });
        }

        

        


        $scope.generatemonthlysalary = function () {
           

            var generate = PayRollService.GenerateMonthlySalary( $scope.FinancialYearID1, $scope.MonthID1,1)
            generate.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }


                if (res.Table[0].ResponseCode == '201') {
                    //alert(res.Table[0].ResponseDescription);
                 
                    $scope.AlertMsge = res.Table[0].ResponseDescription;
                        $scope.modalInstance = $uibModal.open({
                            templateUrl: "/app/views/PayRoll/Popups/RegenerateConfirmationPopup.html",
                            size: 'xlg',
                            scope: $scope,
                            windowClass: 'modal-fit-att',
                        });

                    $scope.closeModal = function () {
                        $scope.modalInstance.close();
                    }


                }
                else if (res.Table[0].ResponseCode == '400') {
                    //alert(res.Table[0].ResponseDescription);
                    alert('Please Generate MonthlyDays to Generate Monthly Salary')
                    //$scope.GeneratedData = res1;
                }
                else if (res.Table1[0].ResponseCode == '200') {
                    $scope.GetAllGeneratedMontlysalary = res.Table;
                    alert(res.Table1[0].ResponseDescription);
                }
else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


        $scope.ConfirmGenerate = function () {
            $scope.GetAllGeneratedMontlysalary = [];
            var generate = PayRollService.GenerateMonthlySalary($scope.FinancialYearID1, $scope.MonthID1, 2)
            generate.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }

                    $scope.GetAllGeneratedMontlysalary = res.Table;
                    $scope.modalInstance.close();
                

                
            },
                function (error) {
                    alert("something Went Wrong")


                });

        }


        



      




        $scope.getGenerateExcel = function () {
            $scope.loading = true;
            var ReportExcel = PayRollService.GetGenerateExcel(2,$scope.FinancialYearID1, $scope.MonthID1);
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

        





     















        $scope.ChangeMonth2 = function (data) {
            if (data == undefined || data == "" || data == null) {
                $scope.ClearData1();
            }
            else {
                $scope.ClearData1();
                var generate = PayRollService.PublishMonthlySalaryData(1,$scope.FinancialYearID2, $scope.MonthID2)
                generate.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    } catch (err) { }


                if (res.Table[0].ResponseCode == '200') {
                    $scope.GetAllPublishMontlysalary = res.Table1;

                }
                else if (res.Table[0].ResponseCode == '400') {
                    //alert(res.Table[0].ResponseDescription);
                } else {
                    alert('Something Went Wrong')

                }
            },
            function (error) {
                alert("something Went Wrong")


            });
            }
        }


        $scope.ClearData1 = function () {
            $scope.GetAllPublishMontlysalary = [];


        }


      

        $scope.publishmonthlysalary = function () {


            var Publish = PayRollService.PublishMonthlySalary($scope.FinancialYearID2, $scope.MonthID2)
            Publish.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }


                if (res.Table[0].ResponseCode == '200') {
                    alert(res.Table[0].ResponseDescription);
                    $scope.GetAllPublishMontlysalary = res.Table1;

                }
                else if (res.Table[0].ResponseCode == '400') {
                    alert(res.Table[0].ResponseDescription);


                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


        $scope.getPublishedExcel = function () {
            $scope.loading = true;
            var ReportExcel = PayRollService.GetPublishedExcel(2, $scope.FinancialYearID2, $scope.MonthID2);
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
















    })
})
