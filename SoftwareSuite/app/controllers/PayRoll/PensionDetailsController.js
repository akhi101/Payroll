define(['app'], function (app) {
    app.controller("PensionDetailsController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $scope.Values = [{ "id": 1, "name": "Yes" }, { "id": 0, "name": "No" }]
        $ctrl.$onInit = () => {
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.UserName;

          
            $scope.getPensionerTypes();
        }

        $scope.changePensioner = function (Pensioner) {
            $scope.EmployeeID1 = Pensioner.EmployeeID;
            $scope.PensionerID1 = Pensioner.PensionerID;
            $scope.PensionerName1 = Pensioner.PensionerName;
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

        

        $scope.ChangePensionerType = function () {

           
            if ($scope.PensionerType == null || $scope.PensionerType == undefined || $scope.PensionerType == "") {
                alert("Select PensionerType");
                $scope.PensionerType = null;
                return;
            }

            var PensionerType = $scope.PensionerType;

            $scope.getPensionerDetailsbyPensionerTypeID();
            $scope.getEditPensionDetails(1, 0, PensionerType,0);
        }


        $scope.getPensionerDetailsbyPensionerTypeID = function () {
            var getEmployeedetail = PayRollService.GetPensionerDetailsbyPensionerTypeID($scope.PensionerType);
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


        $scope.getEditPensionDetails = function (DataTypeID, PensionerDetailsID, PensionerTypeID, Active) {
            var getdesign = PayRollService.GetEditPensionDetails(DataTypeID, PensionerDetailsID, PensionerTypeID, Active);
            getdesign.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.PensionDetailsData = res.Table;
                    $scope.DataNotFound = false;
                    for (var j = 1; j < $scope.PensionDetailsData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.PensionDetailsData = [];
                    $scope.DataNotFound = true;
                }
            },
                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });



        }

        $scope.ClearData = function () {
            
            $scope.PensionerType = null;
            $scope.PensionAmount = "";
            $scope.IR = "";
            $scope.DR = "";
            $scope.MA = "";


        }

        $scope.changePensioner = function (Pensioner) {
            $scope.EmployeeID = Pensioner.EmployeeID;
            $scope.PensionerID = Pensioner.PensionerID;
            $scope.PensionerName = Pensioner.PensionerName;
        }

        $scope.ADDPensionerDetails = function () {
            var datatypeid = 1

            
            if ($scope.PensionerType == null || $scope.PensionerType == undefined || $scope.PensionerType == "") {
                alert("Select PensionType");
                return;
            }



            if ($scope.Pensioner == null || $scope.Pensioner == undefined || $scope.Pensioner == "") {
                alert("Select Pensioner Name");
                    return;
                }
            if ($scope.PensionAmount == null || $scope.PensionAmount == undefined || $scope.PensionAmount == "") {
                alert("Enter Pension Amount");
                return;
            }
            if ($scope.CommutationAmount == null || $scope.CommutationAmount == undefined || $scope.CommutationAmount == "") {
                alert("Enter Commutation Amount");
                return;
            }
            if ($scope.IR == null || $scope.IR == undefined || $scope.IR == "") {
                alert("Enter IR");
                return;
            }

            if ($scope.DR == null || $scope.DR == undefined || $scope.DR == "") {
                alert("Enter DR");
                return;
            }


            var aDDPensionerDetails = PayRollService.AddorUpdatePensionDetails(datatypeid, 0, $scope.PensionerType, $scope.EmployeeID, $scope.PensionerID, $scope.PensionAmount,$scope.CommutationAmount, $scope.IR, $scope.DR, $scope.MA, 1, $scope.UserName)
            aDDPensionerDetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getEditPensionDetails(1, 0, $scope.PensionerType, 0);

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getEditPensionDetails(1, 0, $scope.PensionerType, 0);

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });



        }



        $scope.EditDetails = function (data, ind) {

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

        $scope.UpdateDetails = function (data) {
            var datatypeid = 2


            var updateDetails = PayRollService.AddorUpdatePensionDetails(datatypeid, data.PensionerDetailsID, data.PensionerTypeID, data.EmployeeID, data.PensionerID, data.PensionAmount, data.CommutationAmount, data.IR, data.DR, data.MA, data.Active, $scope.UserName)
            updateDetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getEditPensionDetails(1, 0, data.PensionerTypeID, 0)

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getEditPensionDetails(1, 0, data.PensionerTypeID, 0)

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.ChangeDetails = function (DetailsID, PensionerTypeID, Status) {
            var DataType = 3;
            var setstatus = PayRollService.GetEditPensionDetails(DataType, DetailsID, PensionerTypeID, Status);
            setstatus.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditPensionDetails(1, 0, PensionerTypeID, 0)
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditPensionDetails(1, 0, PensionerTypeID, 0)
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