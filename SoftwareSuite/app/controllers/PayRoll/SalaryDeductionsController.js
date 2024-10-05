define(['app'], function (app) {
    app.controller("SalaryDeductionsController", function ($scope, $localStorage, PayRollService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            //$scope.getsalarydeductiondata();

            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';
        }
        var DataTypeID = 1
        var getdesign = PayRollService.GetDepartmentData(DataTypeID, 0, 0);
        getdesign.then(function (response) {

            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            //$scope.edit = true;
            if (res.Table.length > 0) {
                $scope.DepartmentData = res.Table;
                $scope.Noreports = false;
            }
            else {
                $scope.DepartmentData = [];
                $scope.Noreports = true;
            }


        },

            function (error) {
                alert("error while loading Department");
                var err = JSON.parse(error);

            });



        $scope.getEmployeeDetailsData = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, 0, $scope.DepartmentID,0,0);
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
        $scope.ClearData = function () {
            $scope.EmployeeID = null;
            $scope.PTAmount = '';
            $scope.ITAmount = '';
            $scope.GPF = '';
            $scope.TSGLI = '';
            $scope.GIS = '';
            $scope.FlagFund = '';
            $scope.Harithanidhi = '';
            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';

        }

        $scope.Add = function () {

            var datatypeid = 1


            if ($scope.EmployeeID == null || $scope.EmployeeID == undefined || $scope.EmployeeID == "") {
                alert("Please Enter EmployeeName");
                return;
            }


            if ($scope.DepartmentID == 1) {
                if ($scope.PTAmount == null || $scope.PTAmount == undefined || $scope.PTAmount == "") {
                    alert("Enter PTAmount");
                    return;
                }
                if ($scope.ITAmount == null || $scope.ITAmount == undefined || $scope.ITAmount == "") {
                    alert("Enter ITAmount");
                    return;
                }
                if ($scope.GPF == null || $scope.GPF == undefined || $scope.GPF == "") {
                    alert("Enter GPF");
                    return;
                }
                if ($scope.TSGLI == null || $scope.TSGLI == undefined || $scope.TSGLI == "") {
                    alert("Enter TSGLI");
                    return;
                }
                if ($scope.GIS == null || $scope.GIS == undefined || $scope.GIS == "") {
                    alert("Enter GIS");
                    return;
                }
                if ($scope.FlagFund == null || $scope.FlagFund == undefined || $scope.FlagFund == "") {
                    alert("Enter FlagFund");
                    return;
                }
                if ($scope.Harithanidhi == null || $scope.Harithanidhi == undefined || $scope.Harithanidhi == "") {
                    alert("Enter Harithanidhi");
                    return;
                }
            }
            else if ($scope.DepartmentID == 2) {

                if ($scope.PTAmount == null || $scope.PTAmount == undefined || $scope.PTAmount == "") {
                    alert("Enter PTAmount");
                    return;
                }
                if ($scope.ITAmount == null || $scope.ITAmount == undefined || $scope.ITAmount == "") {
                    alert("Enter ITAmount");
                    return;
                }
               
                if ($scope.FlagFund == null || $scope.FlagFund == undefined || $scope.FlagFund == "") {
                    alert("Enter FlagFund");
                    return;
                }
                if ($scope.Harithanidhi == null || $scope.Harithanidhi == undefined || $scope.Harithanidhi == "") {
                    alert("Enter Harithanidhi");
                    return;
                }

            }

            else if ($scope.DepartmentID == 3) {

                if ($scope.PTAmount == null || $scope.PTAmount == undefined || $scope.PTAmount == "") {
                    alert("Enter PTAmount");
                    return;
                }
                if ($scope.ITAmount == null || $scope.ITAmount == undefined || $scope.ITAmount == "") {
                    alert("Enter ITAmount");
                    return;
                }
                if ($scope.GPF == null || $scope.GPF == undefined || $scope.GPF == "") {
                    alert("Enter GPF");
                    return;
                }
                if ($scope.TSGLI == null || $scope.TSGLI == undefined || $scope.TSGLI == "") {
                    alert("Enter TSGLI");
                    return;
                }
                if ($scope.GIS == null || $scope.GIS == undefined || $scope.GIS == "") {
                    alert("Enter GIS");
                    return;
                }
                if ($scope.FlagFund == null || $scope.FlagFund == undefined || $scope.FlagFund == "") {
                    alert("Enter FlagFund");
                    return;
                }
                if ($scope.Harithanidhi == null || $scope.Harithanidhi == undefined || $scope.Harithanidhi == "") {
                    alert("Enter Harithanidhi");
                    return;
                }

            }

            let GPF = ($scope.GPF == null || $scope.GPF == undefined || $scope.GPF == "") ? 0 : $scope.GPF;
            let TSGLI = ($scope.TSGLI == null || $scope.TSGLI == undefined || $scope.TSGLI == "") ? 0 : $scope.TSGLI;
            let GIS = ($scope.GIS == null || $scope.GIS == undefined || $scope.GIS == "") ? 0 : $scope.GIS;
            
            var AddDeduction = PayRollService.AddSalaryDeduction(datatypeid, 0, $scope.DepartmentID, $scope.EmployeeID, $scope.PTAmount, $scope.ITAmount, GPF, TSGLI,GIS,$scope.FlagFund, $scope.Harithanidhi, $scope.UserName)
            AddDeduction.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getsalarydeductiondata($scope.DepartmentID);

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getsalarydeductiondata($scope.DepartmentID);

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }





        $scope.getsalarydeductiondata = function () {
            var DataTypeID = 1
            var getdeduction = PayRollService.GetSalaryDeductionData(DataTypeID, 0, $scope.DepartmentID, 0, 0);
            getdeduction.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.DeductionData = res.Table;

                    $scope.Noreports = false;



                }
                else {
                    $scope.DeductionData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Deduction Data");
                    var err = JSON.parse(error);

                });
        }






        $scope.UPDATE = function () {

            var datatypeid = 2;

            var salDed = PayRollService.UpdateSalaryDeduction(datatypeid, $scope.SalaryDeductionID, $scope.DepartmentID, $scope.EmployeeID, $scope.PTAmount, $scope.ITAmount, $scope.GPF, $scope.TSGLI, $scope.GIS, $scope.FlagFund, $scope.Harithanidhi, $scope.UserName)
            salDed.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.ClearData();
                    $scope.getsalarydeductiondata();

                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.ClearData();
                    $scope.getsalarydeductiondata();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }











        $scope.EditSalaryDeduction = function (data) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.AddDetails = '0';
            $scope.UpdateDetails = '1';
            var DataTypeID = 2
            var editded = PayRollService.GetSalaryDeductionData(DataTypeID, data.SalaryDeductionId, data.DepartmentId, data.EmployeeId, 0);
            editded.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.EditSalaryDeductionData = res.Table;
                    $scope.EmployeeID = res.Table[0].EmployeeId;
                    $scope.SalaryDeductionID = res.Table[0].SalaryDeductionId;
                    $scope.DepartmentID = res.Table[0].DepartmentId;
                    $scope.PTAmount = res.Table[0].PT;
                    $scope.ITAmount = res.Table[0].IT;
                    $scope.GPF = res.Table[0].GPFAmount;
                    $scope.TSGLI = res.Table[0].TSGLIAmount;
                    $scope.GIS = res.Table[0].GISAmount;
                    $scope.FlagFund = res.Table[0].FlagFund;
                    $scope.Harithanidhi = res.Table[0].Harithanidhi;
                    $scope.Noreports = false;
                }
                else {
                    $scope.EditSalaryDeductionData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Deduction Data");
                    var err = JSON.parse(error);

                });


        }
        $scope.ChangeStatus = function (SalaryDeductionId, DepartmentId, EmployeeId, Status) {
            var DataType = 3;
            var changestatus = PayRollService.ChangeSalaryDeductionStatus(DataType, SalaryDeductionId, DepartmentId, EmployeeId, Status);
            changestatus.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getsalarydeductiondata();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getsalarydeductiondata();
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

       


        $scope.ChangeDepartment = function (data) {
            if (data.DepartmentID == 1) {
                $scope.DepartmentID = data.DepartmentID;
                $scope.showPT = true;
                $scope.showIT = true;
                $scope.showFF = true;
                $scope.showHN = true;
                $scope.showTSGLI = true;
                $scope.showGIS = true; 
                $scope.showGPF = true;
              



                $scope.PTAmount = '';
                $scope.ITAmount = '';
                $scope.GPF = '';
                $scope.TSGLI = '';
                $scope.GIS = '';
                $scope.FlagFund = '';
                $scope.Harithanidhi = '';
                $scope.getsalarydeductiondata();
                $scope.getEmployeeDetailsData();


            }
            else if (data.DepartmentID == 2) {
                $scope.DepartmentID = data.DepartmentID;
                $scope.showPT = true;
                $scope.showIT = true;
                $scope.showFF = true;
                $scope.showHN = true;
                $scope.showGPF = false;
                $scope.showTSGLI = false;
                $scope.showGIS = false;
               
               

                $scope.PTAmount = '';
                $scope.ITAmount = '';
                $scope.GPF = '';
                $scope.TSGLI = '';
                $scope.GIS = '';
                $scope.FlagFund = '';
                $scope.Harithanidhi = '';
                $scope.getsalarydeductiondata();
                $scope.getEmployeeDetailsData();

            }
            else if (data.DepartmentID == 3) {
                $scope.DepartmentID = data.DepartmentID;
              
                $scope.showPT = true;
                $scope.showIT = true;
                $scope.showFF = true;
                $scope.showHN = true;
                $scope.showGPF = true;
                $scope.showTSGLI = true;
                $scope.showGIS = true;
                
             



                $scope.PTAmount = '';
                $scope.ITAmount = '';
                $scope.GPF = '';
                $scope.TSGLI = '';
                $scope.GIS = '';
                $scope.FlagFund = '';
                $scope.Harithanidhi = '';
                $scope.getsalarydeductiondata();
                $scope.getEmployeeDetailsData();

            }
        }

        $scope.ChangeEmployee = function (EmployeeID) {

            $scope.EmployeeID = EmployeeID;

            //if ($scope.EmployeeID == 12 || $scope.EmployeeID == 9 || $scope.EmployeeID == 8) {
            //    $scope.showGPF = false;
            //}

            //else {
            //    $scope.showGPF = true;
            //}



        }



    })
})