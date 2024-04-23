define(['app'], function (app) {
    app.controller("EmployeeDetailsController", function ($scope, $localStorage, PayRollService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getEmployeeDetailsData();


        }



        $scope.Add = function () {

            var datatypeid = 1


            if ($scope.EmployeeName == null || $scope.EmployeeName == undefined || $scope.EmployeeName == "") {
                alert("Please Enter Employee Name");
                return;
            } if ($scope.CandidateNameDOB == null || $scope.CandidateNameDOB == undefined || $scope.CandidateNameDOB == "") {
                alert("Please Select DOB ");
                return;
            } if ($scope.DOJ == null || $scope.DOJ == undefined || $scope.DOJ == "") {
                alert("Please Enter DOJ ");
                return;
            }
            if ($scope.DOR == undefined || $scope.DOR == null || $scope.DOR == "") {
                alert("Please Enter DOR");
                return;
            }
            if ($scope.Gender == undefined || $scope.Gender == null || $scope.Gender== "") {
                alert("Please Enter Gender");
                return;
            }
            if ($scope.PHC == undefined || $scope.PHC == null || $scope.PHC == "") {
                alert("Please Enter PHC");
                return;
            }
            if ($scope.EmployeeStatus == undefined || $scope.EmployeeStatus == null || $scope.EmployeeStatus == "") {
                alert("Please Enter EmployeeStatus");
                return;
            }
            if ($scope.IncrementMonth == null || $scope.IncrementMonth == undefined || $scope.IncrementMonth == "") {
                alert("Please Enter IncrementMonth");
                return;
            } if ($scope.ScaleType == null || $scope.ScaleType == undefined || $scope.ScaleType == "") {
                alert("Please Select ScaleType ");
                return;
            } if ($scope.PanNumber == null || $scope.PanNumber == undefined || $scope.PanNumber == "") {
                alert("Please Enter PanNumber ");
                return;
            }
            if ($scope.GPFNumber == undefined || $scope.GPFNumber == null || $scope.GPFNumber == "") {
                alert("Please Enter GPFNumber");
                return;
            }
            if ($scope.CPS_NPS == undefined || $scope.CPS_NPS == null || $scope.CPS_NPS == "") {
                alert("Please Enter CPS/NPS");
                return;
            }
            if ($scope.CPSNumber == undefined || $scope.CPSNumber == null || $scope.CPSNumber == "") {
                alert("Please Enter CPSNumber");
                return;
            }
            if ($scope.AccountNumber == undefined || $scope.AccountNumber == null || $scope.AccountNumber == "") {
                alert("Please Enter AccountNumber");
                return;
            }
            if ($scope.CategoryCode == undefined || $scope.CategoryCode == null || $scope.CategoryCode == "") {
                alert("Please Enter CategoryCode");
                return;
            }
            
            var datatypeid = 1

            var AddEmployeeDetails = PayRollService.AddEmployeeDetails(datatypeid, 0, $scope.EmployeeName, moment($scope.CandidateNameDOB).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOJ).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOR).format("YYYY-MM-DD HH:mm:ss.SSS"), $scope.Gender, $scope.PHC, $scope.EmployeeStatus, $scope.IncrementMonth, $scope.ScaleType, $scope.PanNumber, $scope.GPFNumber, $scope.CPS_NPS, $scope.CPSNumber, $scope.AccountNumber, $scope.CategoryCode,  1, $scope.UserName)
            AddEmployeeDetails.then(function (res) {
                //try {
                //    var res = JSON.parse(response);
                //} catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getEmployeeDetailsData();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getEmployeeDetailsDatafF();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


        $scope.checkDate = function (CandidateNameDOB) {
            var currentDate = new Date();
            var birthdate = new Date(CandidateNameDOB);
            if (birthdate > currentDate) {
                alert('Selected Date Should not be Future!')
                $scope.CandidateNameDOB = '';
                return;
            } else {
                $scope.CandidateNameDOB = CandidateNameDOB;
            }
        }

      


        $scope.getEmployeeDetailsData = function () {
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
                    for (var j = 1; j < $scope.EmployeeDetailsData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }

             
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






        $scope.UpdateEmployeeDetails = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }

            var datatypeid = 2;




            var desig = PayRollService.UpdateEmployeeDetails(datatypeid, 0, $scope.EmployeeName, $scope.CandidateNameDOB, $scope.DOJ, $scope.DOR, $scope.Gender, $scope.PHC, $scope.EmployeeStatus, $scope.IncrementMonth, $scope.ScaleType, $scope.PanNumber, $scope.GPFNumber, $scope.CPS / NPS, $scope.CPSNumber, $scope.AccountNumber, $scope.CategoryCode, 1, $scope.UserName)
            desig.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.getEmployeeDetailsData();

                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.getEmployeeDetailsData();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }











        $scope.EditEmployeeDetails = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }
        $scope.ChangeStatus = function (EmployeeId, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollStatus(DataType, EmployeeId, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEmployeeDetailsData();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEmployeeDetailsData();
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