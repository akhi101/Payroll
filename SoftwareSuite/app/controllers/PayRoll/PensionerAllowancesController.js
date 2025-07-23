define(['app'], function (app) {
    app.controller("PensionerAllowancesController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $scope.Values = [{ "id": 1, "name": "Yes" }, { "id": 0, "name": "No" }]
        $ctrl.$onInit = () => {
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.UserName;

            //$scope.getEditAllowance();
            $scope.FinancialYears();

            //$scope.GetMonths();
            $scope.getMonths();
            $scope.getPensionerTypes();
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

        $scope.getPensionerTypes = function () {
            var getpensionertypes = PayRollService.GetPensionerTypes();
            getpensionertypes.then(function (response) {

                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.PensionerTypeData = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.PensionerTypeData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Pensioner Type Data");
                    var err = JSON.parse(error);

                });
        }

        $scope.getEmployeeDetailsbyPensionerID= function () {
            var getemployeedetail = PayRollService.GetEmployeeDetailsbyPensionerID($scope.PensionerType);
            getemployeedetail.then(function (res) {

                //$scope.edit = true;
                var response = JSON.parse(res);
                if (response.Table.length > 0) {
                    $scope.EmployeeDetailsData = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.EmployeeDetailsData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Employees Data");
                    var err = JSON.parse(error);

                });
        }

        $scope.ChangePensionerType = function () {


            if ($scope.PensionerType == null || $scope.PensionerType == undefined || $scope.PensionerType == "") {
                alert("Select PensionerType");
                $scope.PensionerType = null;
                return;
            }

            //if ($scope.FinancialYearID == null || $scope.FinancialYearID == undefined || $scope.FinancialYearID == "") {
            //    alert("Please Select FinancialYear");
            //    $scope.PensionerType = null;
            //    return;
            //}

            //if ($scope.MonthID == null || $scope.MonthID == undefined || $scope.MonthID == "") {
            //    alert("Select Month");
            //    $scope.PensionerType = null;
            //    return;
            //}

            $scope.getEmployeeDetailsbyPensionerID();
            $scope.getEditPensionerAllowance();
        }


      


        $scope.getEditPensionerAllowance = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetEditPensionerAllowance(DataTypeID, $scope.FinancialYearID, $scope.MonthID, 0, $scope.PensionerType, 1);
            getdesign.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.PensionerAllowanceData = res.Table;
                    $scope.DataNotFound = false;
                    for (var j = 1; j < $scope.PensionerAllowanceData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.PensionerAllowanceData = [];
                    $scope.DataNotFound = true;
                }
            },
                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });



        }

        $scope.ClearData = function () {
            $scope.FinancialYearID = null;
            $scope.MonthID = null;
            $scope.PensionerType = null;
            $scope.IR = "";
            $scope.DR = "";
           

        }

        $scope.ADDPensionerAllowance = function () {
            var datatypeid = 1
            if ($scope.PensionerType == null || $scope.PensionerType == undefined || $scope.PensionerType == "") {
                alert("Select PensionerType");
                return;
            }
            if ($scope.FinancialYearID == null || $scope.FinancialYearID == undefined || $scope.FinancialYearID == "") {
                alert("Please Select FinancialYear");
                return;
            }

            if ($scope.MonthID == null || $scope.MonthID == undefined || $scope.MonthID == "") {
                alert("Select Month");
                    return;
            }

            if ($scope.DR == null || $scope.DR == undefined || $scope.DR == "") {
                alert("Enter DR");
                return;
            }

            if ($scope.IR == null || $scope.IR == undefined || $scope.IR == "") {
                alert("Enter IR");
                return;
            }

            var aDDPensionerAllowance = PayRollService.AddorUpdatePensionerAllowance(datatypeid, 0, $scope.FinancialYearID, $scope.MonthID, $scope.PensionerType, $scope.IR, $scope.DR, 1,$scope.UserName)
            aDDPensionerAllowance.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    } catch (err) { }
                    if (res[0].ResponseCode == '200') {
                        alert(res[0].ResponseDescription);
                        $scope.ClearData();
                        $scope.getEditPensionerAllowance();

                    }
                    else if (res[0].ResponseCode == '400') {
                        alert(res[0].ResponseDescription);
                        $scope.getEditPensionerAllowance();

                    } else {
                        alert('Something Went Wrong')

                    }
                },
                    function (error) {
                        alert("something Went Wrong")


                    });
            
           

        }



        $scope.EditAllowance = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

            if (data.IR == 0) {
                $scope.disableir = true;
            }
            else {
                $scope.disableir = false;

            }

        }

        $scope.UpdateAllowance = function (data) {
            var datatypeid = 2


            var updateallowance = PayRollService.AddorUpdatePensionerAllowance(datatypeid, data.PensionerAllowanceID, data.FinancialYearID, data.MonthID, data.PensionerTypeID, data.IR, data.DR, data.Active,$scope.UserName)
            updateallowance.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getEditPensionerAllowance()

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getEditPensionerAllowance()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.ChangePensionerAllowance = function (PensionerAllowanceID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.GetEditPensionerAllowance(DataType,0,0, PensionerAllowanceID,0, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditPensionerAllowance()
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditPensionerAllowance()
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