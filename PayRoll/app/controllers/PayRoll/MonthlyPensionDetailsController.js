define(['app'], function (app) {
    app.controller("MonthlyPensionDetailsController", function ($scope, $uibModal, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';

            $scope.AddPaqDetails = '1';
            $scope.UpdatePaqDetails = '0';

            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.UserName;


            $scope.getPensionerTypes();
            $scope.FinancialYears();
            $scope.getMonths();
        }

        $scope.getPensionerTypes = function () {
            var getpensionertypes = PayRollService.GetPensionerTypes();
            getpensionertypes.then(function (response) {
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


        $scope.getPensionerDeductions = function (DataTypeID) {

            var getdesign = PayRollService.GetorEditPensionerDeductions(DataTypeID, 0, $scope.PensionerTypeID1, $scope.FinancialYearID1, $scope.MonthID1, 0, 0);
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

        $scope.EditPensionerDeductions = function (PensionerDeductionID, PensionerTypeID, FinancialYearID, MonthID) {


            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.AddDetails = '0';
            $scope.UpdateDetails = '1';
            var DataTypeID = 2
            $scope.PensionerDeductionID = PensionerDeductionID;
            var getdeduction = PayRollService.GetorEditPensionerDeductions(DataTypeID, PensionerDeductionID, PensionerTypeID, FinancialYearID, MonthID, 0, 0);
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


                    // Fix: Set Pensioner object for dropdown selection
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

            if ($scope.MonthID1 == null || $scope.MonthID1 == undefined || $scope.MonthID1 == "") {
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

            var addpensionerdeductions = PayRollService.AddorUpdatePensionerDeductions(datatypeid, PensionerDeductionID, $scope.FinancialYearID1, $scope.MonthID1, $scope.PensionerTypeID1, $scope.PensionerID1, $scope.EmployeeID1, $scope.CMRFAmount1, $scope.RecoveryAmount1, Active, $scope.UserName)
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

                    alert("error while loading Data");
                    var err = JSON.parse(error);
                });
        }




        $scope.ChangePaqMonth = function () {

            if ($scope.FinancialYearID2 == null || $scope.FinancialYearID2 == undefined || $scope.FinancialYearID2 == "") {
                alert("Please Select FinancialYear");
                $scope.PensionerTypeID2 = null;
                return;
            }

            if ($scope.MonthID2 == null || $scope.MonthID2 == undefined || $scope.MonthID2 == "") {
                alert("Select Month");
                $scope.PensionerTypeID2 = null;
                return;
            }

            $scope.getPaqPensionerDetailsbyPensionerTypeID();
            $scope.getPensionerAdditionalQuantum(1);
        }


        $scope.getPaqPensionerDetailsbyPensionerTypeID = function () {
            var getEmployeedetail = PayRollService.GetPensionerDetailsbyPensionerTypeID($scope.PensionerTypeID2);
            getEmployeedetail.then(function (res) {
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

        $scope.getPensionerAdditionalQuantum = function (DataTypeID) {

            var getpaqdata = PayRollService.GetorEditPensionerAdditionalQuantum(DataTypeID, 0, $scope.PensionerTypeID2, $scope.FinancialYearID2, $scope.MonthID2, 0, 0);
            getpaqdata.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.PAQData = res.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.PAQData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Pensioner Additional Quantum Data");
                    var err = JSON.parse(error);

                });
        }

        $scope.EditPaq = function (PAQID, PensionerTypeID, FinancialYearID, MonthID) {


            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.AddPaqDetails = '0';
            $scope.UpdatePaqDetails = '1';
            var DataTypeID = 2
            var editpaqdata = PayRollService.GetorEditPensionerAdditionalQuantum(DataTypeID, PAQID, PensionerTypeID, FinancialYearID, MonthID, 0, 0);
            editpaqdata.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }


                if (res.Table.length > 0) {
                    $scope.editPaqdisable = true;
                    $scope.disablePaqPensionerType = true;
                    $scope.disablePaqFinancialYear = true;
                    $scope.disablePaqMonth = true;
                    $scope.disablePaqPensioner = true;
                    $scope.disablePaqActive = true;
                    $scope.EditPAQData = res.Table;
                    $scope.Noreports = false;
                    $scope.PAQID = res.Table[0].PAQID;
                    $scope.PensionerTypeID2 = res.Table[0].PensionerTypeID;
                    $scope.PensionerType = res.Table[0].PensionerTypeName;
                    $scope.PensionerID2 = res.Table[0].PensionerID;
                    $scope.PensionerName2 = res.Table[0].PensionerName;
                    $scope.FinancialYearID2 = res.Table[0].FinancialYearID;
                    $scope.FinancialYear = res.Table[0].FinancialYear;
                    $scope.MonthID2 = res.Table[0].MonthID;
                    $scope.Months = res.Table[0].Months;
                    $scope.EmployeeID2 = res.Table[0].EmployeeID;
                    $scope.EmployeeName = res.Table[0].EmployeeName;
                    $scope.AQA2 = res.Table[0].AdditionalQuantum;
                    $scope.OtherAmount2 = res.Table[0].OtherAmount;
                    $scope.Active2 = res.Table[0].Active;
                    $scope.AccountNumber2 = res.Table[0].AccountNumber;
                    $scope.IFSCCode2 = res.Table[0].IFSCCode;


                    // Fix: Set Pensioner object for dropdown selection
                    $scope.PaqPensioner = $scope.PensionerDetailsData.find(function (item) {
                        return item.PensionerID === res.Table[0].PensionerID;
                    });

                    $scope.AddPaqDetails = '0';
                    $scope.UpdatePaqDetails = '1';
                }
                else {
                    $scope.EditPAQData = [];
                    $scope.editPaqdisable = false;
                    $scope.disablePaqPensionerType = false;
                    $scope.disablePaqFinancialYear = false;
                    $scope.disablePaqMonth = false;
                    $scope.disablePaqPensioner = false;
                    $scope.disablePaqActive = false;
                }


            },

                function (error) {
                    alert("error while loading Pensioner Additional Quantum Data");
                    $scope.editPaqdisable = false;
                    $scope.disablePaqPensionerType = false;
                    $scope.disablePaqFinancialYear = false;
                    $scope.disablePaqMonth = false;
                    $scope.disablePaqPensioner = false;
                    $scope.disablePaqActive = false;
                    var err = JSON.parse(error);

                });


        }



        $scope.ClearPaqData = function () {
            $scope.PaqPensioner = null;
            $scope.AQA2 = "";
            $scope.OtherAmount2 = "";

            $scope.editPaqdisable = false;
            $scope.disablePaqPensioner = false;
            $scope.disablePaqActive = false;
            $scope.AddPaqDetails = '1';
            $scope.UpdatePaqDetails = '0';
        }

        $scope.changePaqPensioner = function (PaqPensioner) {
            $scope.EmployeeID2 = PaqPensioner.EmployeeID;
            $scope.PensionerID2 = PaqPensioner.PensionerID;
            $scope.PensionerName2 = PaqPensioner.PensionerName;
        }

        $scope.addorupdatePaq = function (datatypeid) {


            if ($scope.PensionerTypeID2 == null || $scope.PensionerTypeID2 == undefined || $scope.PensionerTypeID2 == "") {
                alert("Select Pensioner Type");
                return;
            }
            if ($scope.FinancialYearID2 == null || $scope.FinancialYearID2 == undefined || $scope.FinancialYearID2 == "") {
                alert("Please Select FinancialYear");
                $scope.PaqPensionerType = null;
                return;
            }

            if ($scope.MonthID2 == null || $scope.MonthID2 == undefined || $scope.MonthID2 == "") {
                alert("Select Month");
                $scope.PaqPensionerType = null;
                return;
            }

            if ($scope.PaqPensioner == null || $scope.PaqPensioner == undefined || $scope.PaqPensioner == "") {
                alert("Select Pensioner Name");
                return;
            }
            if ($scope.AQA2 == null || $scope.AQA2 == undefined || $scope.AQA2 == "") {
                alert("Enter Additional Qunatum Amount");
                return;
            }

            if ($scope.OtherAmount2 == null || $scope.OtherAmount2 == undefined || $scope.OtherAmount2 == "") {
                alert("Enter Other Amount");
                return;
            }

            let PAQID = datatypeid == '2' ? $scope.PAQID : "";
            let Active = datatypeid == '2' ? $scope.Active2 : "";

            var addorupdatepaqdata = PayRollService.AddorUpdatePensionerAdditionalQuantum(datatypeid, PAQID, $scope.FinancialYearID2, $scope.MonthID2, $scope.PensionerTypeID2, $scope.PensionerID2, $scope.EmployeeID2, $scope.AQA2, $scope.OtherAmount2, Active, $scope.UserName)
            addorupdatepaqdata.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.editPaqdisable = false;
                    $scope.getPensionerAdditionalQuantum(1);
                    $scope.ClearPaqData();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.editPaqdisable = false;
                    $scope.getPensionerAdditionalQuantum(1);
                    $scope.ClearPaqData();

                } else {
                    $scope.editPaqdisable = false;
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    $scope.editPaqdisable = false;
                    alert("something Went Wrong")


                });



        }

        $scope.ChangePaqStatus = function (PAQID, PensionerTypeID, PensionerID, Status) {
            var DataType = 3;
            var changepaqstatus = PayRollService.GetorEditPensionerAdditionalQuantum(DataType, PAQID, PensionerTypeID, PensionerID, Status);
            changepaqstatus.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getPensionerAdditionalQuantum(1);
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getPensionerAdditionalQuantum(1);
                } else {
                    alert("Something Went Wrong")
                }
            },
                function (error) {

                    alert("error while loading Data");
                    var err = JSON.parse(error);
                });
        }


    })
})
