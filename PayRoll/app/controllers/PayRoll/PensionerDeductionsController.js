define(['app'], function (app) {
    app.controller("PensionerDeductionsController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.UserName;


            $scope.getPensionerTypes();
            $scope.FinancialYears();
            $scope.getMonths();
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


        $scope.ChangeMonth = function () {

            if ($scope.FinancialYearID1 == null || $scope.FinancialYearID1 == undefined || $scope.FinancialYearID1 == "") {
                alert("Please Select FinancialYear");
                $scope.PensionerType = null;
                return;
            }

            if ($scope.MonthID1 == null || $scope.MonthID1 == undefined || $scope.MonthID1 == "") {
                alert("Select Month");
                $scope.PensionerType = null;
                return;
            }

            $scope.getPensionerDetailsbyPensionerTypeID();
            $scope.getPensionerDeductions(1);
        }

        $scope.getPensionerDetailsbyPensionerTypeID = function () {
            var getEmployeedetail = PayRollService.GetPensionerDetailsbyPensionerTypeID($scope.PensionerTypeID1);
            getEmployeedetail.then(function (res) {

                //$scope.edit = true;
                var response = JSON.parse(res);
                if (response.Table.length > 0) {
                    $scope.PensionerDetailsData = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.PensionerDetailsData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Employees Data");
                    var err = JSON.parse(error);

                });
        }

        //$scope.ChangePensionerType = function () {
        //    //$scope.DeductionsData = [];

        //    if ($scope.PensionerTypeID1 == null || $scope.PensionerTypeID1 == undefined || $scope.PensionerTypeID1 == "") {
        //        alert("Select PensionerType");
        //        $scope.PensionerType = null;
        //        return;
        //    }

        //    $scope.getEmployeeDetailsbyPensionerID();
        //    $scope.getPensionerDeductions(1);
        //}


        $scope.getPensionerDeductions = function (DataTypeID) {

            var getdesign = PayRollService.GetorEditPensionerDeductions(DataTypeID, 0, $scope.PensionerTypeID1, $scope.FinancialYearID1, $scope.MonthID1,0,0);
            getdesign.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.DeductionsData = res.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.DeductionsData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Deductions Data");
                    var err = JSON.parse(error);

                });
        }

        $scope.EditPensionerDeductions = function (PensionerDeductionID, PensionerTypeID,FinancialYearID, MonthID ) {

            
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.AddDetails = '0';
            $scope.UpdateDetails = '1';
            var DataTypeID = 2
            $scope.PensionerDeductionID = PensionerDeductionID;
            var getdeduction = PayRollService.GetorEditPensionerDeductions(DataTypeID, PensionerDeductionID, PensionerTypeID, FinancialYearID, MonthID,0,0);
            getdeduction.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

               
                if (res.Table.length > 0) {
                    $scope.editdisable = true;
                    $scope.disablePensionerType = true;
                    $scope.disableFinancialYear = true;
                    $scope.disableMonth = true;
                    $scope.disablePensioner = true;
                    $scope.disableActive = true;
                    $scope.EditPensionerDeductionsData = res.Table;
                    $scope.Noreports = false;
                    $scope.PensionerDeductionID = res.Table[0].PensionerDeductionID;
                    $scope.PensionerTypeID1 = res.Table[0].PensionerTypeID;
                    $scope.PensionerType = res.Table[0].PensionerTypeName;
                    $scope.PensionerID1 = res.Table[0].PensionerID;
                    $scope.PensionerName1 = res.Table[0].PensionerName;
                    $scope.FinancialYearID1 = res.Table[0].FinancialYearID;
                    $scope.FinancialYear = res.Table[0].FinancialYear;
                    $scope.MonthID1 = res.Table[0].MonthID;
                    $scope.Months = res.Table[0].Months;
                    $scope.EmployeeID1 = res.Table[0].EmployeeID;
                    $scope.EmployeeName = res.Table[0].EmployeeName;
                    $scope.CMRFAmount1 = res.Table[0].CMRFAmount;
                    $scope.RecoveryAmount1 = res.Table[0].Recovery_TDS;
                    $scope.Active1 = res.Table[0].Active;
                    $scope.AccountNumber1 = res.Table[0].AccountNumber;
                    $scope.IFSCCode1 = res.Table[0].IFSCCode;


                    // ✅ Fix: Set Pensioner object for dropdown selection
                    $scope.Pensioner = $scope.PensionerDetailsData.find(function (item) {
                        return item.PensionerID === res.Table[0].PensionerID;
                    });

                    $scope.AddDetails = '0';
                    $scope.UpdateDetails = '1';
                }
                else {
                    $scope.EditPensionerDeductionsData = [];
                    $scope.editdisable = false;
                    $scope.disablePensionerType = false;
                    $scope.disableFinancialYear = false;
                    $scope.disableMonth = false;
                    $scope.disablePensioner = false;
                    $scope.disableActive = false;
                }


            },

                function (error) {
                    alert("error while loading Pensioner Deductions");
                    $scope.editdisable = false;
                    $scope.disablePensionerType = false;
                    $scope.disableFinancialYear = false;
                    $scope.disableMonth = false;
                    $scope.disablePensioner = false;
                    $scope.disableActive = false;
                    var err = JSON.parse(error);

                });


        }

        

        $scope.ClearData = function () {

            //$scope.PensionerType1 = null;
            $scope.Pensioner = null;
            $scope.CMRFAmount1 = "";
            $scope.RecoveryAmount1 = "";

            $scope.editdisable = false;
            $scope.disablePensioner = false;
            $scope.disableActive = false;
            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';
        }

        $scope.changePensioner = function (Pensioner) {
            $scope.EmployeeID1 = Pensioner.EmployeeID;
            $scope.PensionerID1 = Pensioner.PensionerID;
            $scope.PensionerName1 = Pensioner.PensionerName;
        }

        $scope.addorupdatePensionerDeductions = function (datatypeid) {


            if ($scope.PensionerTypeID1 == null || $scope.PensionerTypeID1 == undefined || $scope.PensionerTypeID1 == "") {
                alert("Select Pensioner Type");
                return;
            }
            if ($scope.FinancialYearID1 == null || $scope.FinancialYearID1 == undefined || $scope.FinancialYearID1 == "") {
                alert("Please Select FinancialYear");
                $scope.PensionerType = null;
                return;
            }

            if ($scope.MonthID1 == null || $scope.MonthID1== undefined || $scope.MonthID1 == "") {
                alert("Select Month");
                $scope.PensionerType = null;
                return;
            }
 
            if ($scope.Pensioner == null || $scope.Pensioner == undefined || $scope.Pensioner == "") {
                alert("Select Pensioner Name");
                return;
            }
            if ($scope.CMRFAmount1 == null || $scope.CMRFAmount1 == undefined || $scope.CMRFAmount1 == "") {
                alert("Enter CMRF Amount");
                return;
            }

            if ($scope.RecoveryAmount1 == null || $scope.RecoveryAmount1 == undefined || $scope.RecoveryAmount1 == "") {
                alert("Enter Recovery Amount");
                return;
            }

            let PensionerDeductionID = datatypeid == '2' ? $scope.PensionerDeductionID : "";
            let Active = datatypeid == '2' ? $scope.Active1 : "";

            var addpensionerdeductions = PayRollService.AddorUpdatePensionerDeductions(datatypeid, PensionerDeductionID, $scope.FinancialYearID1, $scope.MonthID1, $scope.PensionerTypeID1,$scope.PensionerID1, $scope.EmployeeID1, $scope.CMRFAmount1, $scope.RecoveryAmount1, Active, $scope.UserName)
            addpensionerdeductions.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.editdisable = false;
                    $scope.getPensionerDeductions(1);
                    $scope.ClearData();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.editdisable = false;
                    $scope.getPensionerDeductions(1);
                    $scope.ClearData();

                } else {
                    $scope.editdisable = false;
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    $scope.editdisable = false;
                    alert("something Went Wrong")


                });



        }



        
        



        $scope.ChangeStatus = function (PensionerDeductionID, PensionerTypeID, PensionerID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.GetorEditPensionerDeductions(DataType, PensionerDeductionID, PensionerTypeID, PensionerID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getPensionerDeductions(1);
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getPensionerDeductions(1);
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