define(['app'], function (app) {
    app.controller("PensionerDeductionsController", function ($scope, $localStorage, PayRollService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;


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
                $scope.PensionerData = res.Table;
                $scope.Noreports = false;
            }
            else {
                $scope.PensionerData = [];
                $scope.Noreports = true;
            }


        },

            function (error) {
                alert("error while loading Pensioner");
                var err = JSON.parse(error);

            });



        $scope.getEmployeeDetailsData = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, 0, $scope.PensionerID, 0, 0);
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
            $scope.Pensionerid = null;
            $scope.CMRFAmount = '';
            $scope.RecoveryAmount = '';
            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';

        }

        $scope.Add = function () {

            var datatypeid = 1


            if ($scope.Pensionerid == null || $scope.Pensionerid == undefined || $scope.Pensionerid == "") {
                alert("Please Enter EmployeeName");
                return;
            }


            if ($scope.PensionerID == 1) {
                if ($scope.CMRFAmount == null || $scope.CMRFAmount == undefined || $scope.CMRFAmount == "") {
                    alert("Enter CMRFAmount");
                    return;
                }
                if ($scope.RecoveryAmount == null || $scope.RecoveryAmount == undefined || $scope.RecoveryAmount == "") {
                    alert("Enter RecoveryAmount");
                    return;
                }
                
            }
            else if ($scope.PensionerID == 2) {

                if ($scope.CMRFAmount == null || $scope.CMRFAmount == undefined || $scope.CMRFAmount == "") {
                    alert("Enter CMRFAmount");
                    return;
                }
                if ($scope.RecoveryAmount == null || $scope.RecoveryAmount == undefined || $scope.RecoveryAmount == "") {
                    alert("Enter RecoveryAmount");
                    return;
                }

               

            }

            else if ($scope.PensionerID == 3) {

                if ($scope.CMRFAmount == null || $scope.CMRFAmount == undefined || $scope.CMRFAmount == "") {
                    alert("Enter CMRFAmount");
                    return;
                }
                if ($scope.RecoveryAmount == null || $scope.RecoveryAmount == undefined || $scope.RecoveryAmount == "") {
                    alert("Enter RecoveryAmount");
                    return;
                }
                
            }

            
            var AddDeduction = PayRollService.AddSalaryDeduction(datatypeid, 0, $scope.PensionerID, $scope.CMRFAmount, $scope.RecoveryAmount, $scope.UserName)
            AddDeduction.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getsalarydeductiondata($scope.PensionerID);

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getsalarydeductiondata($scope.PensionerID);

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
            var getdeduction = PayRollService.GetSalaryDeductionData(DataTypeID, 0, $scope.PensionerID, 0, 0);
            getdeduction.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.PensionerData = res.Table;

                    $scope.Noreports = false;



                }
                else {
                    $scope.PensionerData = [];
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

            var salDed = PayRollService.UpdateSalaryDeduction(datatypeid, $scope.PensionerDeductionID, $scope.PensionerID, $scope.CMRFAmount, $scope.RecoveryAmount,  $scope.UserName)
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
            var editded = PayRollService.GetSalaryDeductionData(DataTypeID, data.PensionerDeductionId, data.PensionerId,  0);
            editded.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.EditSalaryDeductionData = res.Table;
                   
                    $scope.PensionerDeductionID = res.Table[0].PensionerDeductionId;
                    $scope.PensionerID = res.Table[0].PensionerId;
                    $scope.CMRFAmount = res.Table[0].PT;
                    $scope.RecoveryAmount = res.Table[0].IT;
                   
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
        $scope.ChangeStatus = function (PensionerDeductionId, PensionerID, EmployeeId, Status) {
            var DataType = 3;
            var changestatus = PayRollService.ChangeSalaryDeductionStatus(DataType, PensionerDeductionId, PensionerID,  Status);
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