define(['app'], function (app) {
    app.controller("OfficersController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.EmployeeData = false;
            $scope.ShowLeaveData = false;
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.userName;
            $scope.MedicalLeaves = 1;
            $scope.CasualLeaves = 2;
            $scope.EarnLeaves=3
            $scope.TotalLeaves=10
            $scope.FinancialYears();
            $scope.GetEmployeeDetails();
            $scope.GetMonths();
            $scope.GetorEditIncrements();
            $scope.GetorEditDeductions();
            $scope.GetorEditLeaves();
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


        $scope.GetorEditIncrements = function () {
            var getdesign = PayRollService.GetorEditIncrements(1, 0, 0);
            getdesign.then(function (response) {
                var response = JSON.parse(response)
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.GetAllIncrements = response.Table;
                    $scope.Noreports = false;
                    for (var j = 1; j < $scope.GetAllIncrements.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.GetAllIncrements = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Increments Data");
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
                    for (var j = 1; j < $scope.GetAllDeductions.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
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

            var AddDepartment = PayRollService.AddorUpdateIncrements(datatypeid, 0, $scope.FinancialYear, $scope.Month, $scope.EmployeeId, $scope.IncrementAmount, 1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditIncrements()

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditIncrements()

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

           
            var AddDepartment = PayRollService.AddorUpdateDeductions(datatypeid, 0, $scope.FinancialYear, $scope.Month, $scope.EmployeeId, $scope.IT, $scope.FlagFund, $scope.Harithanidhi, $scope.DeductionAmount, 1, $scope.UserName)
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
                    $scope.ShowLeaveData = false;
                    $scope.GetorEditLeaves()

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.ShowLeaveData = false;
                    $scope.GetorEditLeaves()

                } else {
                    alert('Something Went Wrong')
                    $scope.ShowLeaveData = false;

                }
            },
                function (error) {
                    alert("something Went Wrong")
                    $scope.ShowLeaveData = false;

                });
        }

        $scope.ChangeLeaves = function () {
            //alert()
            if ($scope.MedicalLeaves == null || $scope.MedicalLeaves == undefined || $scope.MedicalLeaves == "") {
                $scope.MedicalLeaves = 0;
            }
            if ($scope.CasualLeaves == null || $scope.CasualLeaves == undefined || $scope.CasualLeaves == "") {
                $scope.CasualLeaves = 0;
            }
            if ($scope.EarnLeaves == null || $scope.EarnLeaves == undefined || $scope.EarnLeaves == "") {
                $scope.EarnLeaves = 0;
            }

            $scope.LeavesRequired = parseInt($scope.MedicalLeaves) + parseInt($scope.CasualLeaves) + parseInt($scope.EarnLeaves);
            if (parseInt($scope.LeavesRequired) <= parseInt($scope.LeavesBalance)) {
                $scope.RemainingLeaves = parseInt($scope.LeavesBalance) - parseInt($scope.LeavesRequired)
            } else {
                alert("Leaves Required must be less than Total Leaves")
                $scope.MedicalLeaves = 0;
                $scope.CasualLeaves = 0;
                $scope.EarnLeaves = 0;
            }
           
        }


        $scope.GetEmployeeLeaveBalance = function () {
            let DataType = 1;
            var getdesign = PayRollService.GetEmployeeLeaveBalance($scope.FinancialYear, $scope.EmployeeId);
            getdesign.then(function (resp) {
                console.log(resp)
                var response = JSON.parse(resp)
                console.log(response)
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.ShowLeaveData = true;
                    $scope.EmployeeLeaveBalance = response.Table[0];
                    $scope.LeavesBalance = $scope.EmployeeLeaveBalance.LeavesBalance;
                    $scope.EarnLeavesBalance = $scope.EmployeeLeaveBalance.EarnLeaves;
                    $scope.CasualLeavesBalance = $scope.EmployeeLeaveBalance.CasualLeaves;
                    $scope.MedicalLeavesBalance = $scope.EmployeeLeaveBalance.MedicalLeaves;
                    $scope.LeavesEmployeeCode = $scope.EmployeeLeaveBalance.EmployeeCode;
                    $scope.LeavesEmployeeName = $scope.EmployeeLeaveBalance.EmployeeName;
                    $scope.LeavesEmployeeID = $scope.EmployeeLeaveBalance.EmployeeID;

                    $scope.Noreports = false;
                }
                else {
                    $scope.EmployeeLeaveData = [];
                    $scope.Noreports = true;
                    $scope.ShowLeaveData = false;
                }
            },
                function (error) {
                    alert("error while loading Leaves Data");
                    $scope.ShowLeaveData = false;
                    var err = JSON.parse(error);

                });
        }



        $scope.EditIncrement = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }


        $scope.UpdateIncrement = function (data) {
            var DataTypeId = 2


            var AddDepartment = PayRollService.AddorUpdateIncrements(DataTypeId, data.IncrementID, data.FinancialYearID, data.MonthID, data.EmployeeID, data.IncrementAmount,data.Active, $scope.UserName)
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

        $scope.ChangeActive = function (IncrementID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollIncrement(DataType, IncrementID, Status);
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





        $scope.EditDeduction = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }


        $scope.UpdateDeduction = function (data) {
            var DataTypeId = 2


            var AddDepartment = PayRollService.AddorUpdateDeductions(DataTypeId, data.DeductionsID, data.FinancialYearID, data.MonthID, data.EmployeeID, data.IT, data.FlagFund, data.Harithanidhi, data.DeductionAmount, data.Active, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditDeductions()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditDeductions()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.ChangeDeduction = function (DeductionsID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollDecrement(DataType, DeductionsID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditDeductions();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditDeductions();
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

        
        $scope.EditLeave = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }


        $scope.UpdateLeave = function (data) {
            var DataTypeId = 2


            var AddDepartment = PayRollService.AddorUpdateLeaves(DataTypeId, data.LeaveId, data.FinancialYearId, data.MonthID, data.EmployeeID, data.TotalLeaves, data.MedicalLeaves, data.CasualLeaves, data.EarnLeaves, data.LeavesRequired, data.Active, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditLeaves()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditLeaves()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


        $scope.Approve = function () {
            var PaymentStudent = [{"Employeecode":"1025"}]
            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.btndisable = true;
                var ApproveStatus = 1;
               
                  
                    $scope.buttonlabel = "Signing in process ...";
                var GetInterimCertificateTobeSignedlocation = PayRollService.GetPaySlip(PaymentStudent)
                    GetInterimCertificateTobeSignedlocation.then(function (response) {
                        var location = window.location.origin;
                        if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
                            location += "/API/"
                        } else {
                            location += "/"
                        }
                      
                    }, function (err) {
                        $scope.btndisable = false;
                        $scope.buttonlabel = "Approve";
                    });



              

                
            } else {
                alert('select the pins');
                return;
            }
        }


        $scope.ChangeLeave = function (LeaveId, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollLeaves(DataType, LeaveId, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditLeaves();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditLeaves();
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

        
        
        
        $scope.Years = ['2021', '2022', '2023', '2024', '2025'];
        //$scope.SubBillers = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY'];
    })
})