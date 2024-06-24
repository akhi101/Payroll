define(['app'], function (app) {
    app.controller("CommonElevensesController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $scope.Values = [{ "id": 1, "name": "Yes" }, { "id": 0, "name": "No" }]
        $ctrl.$onInit = () => {
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.userName;

            $scope.getEditElevence();

        }


      


        $scope.getEditElevence = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetEditElevence(DataTypeID, $scope.ElevenceId, $scope.IR, $scope.DA, $scope.HRA, $scope.Medical, 0, 0);
            getdesign.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.ElevenceData = res.Table;
                    $scope.DataNotFound = false;
                    for (var j = 1; j < $scope.ElevenceData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.ElevenceData = [];
                    $scope.DataNotFound = true;
                }
            },
                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });



        }

        $scope.ClearData = function () {
            $scope.ElevenceId = null;
            $scope.IR = "";
            $scope.DA = "";
            $scope.HRA = "";
            $scope.Medical = "";
            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';

        }

        $scope.ADDElevence = function () {
            var datatypeid = 1

            
            if ($scope.IR == null || $scope.IR == undefined || $scope.IR == "") {
                alert("Enter IR");
                return;
            }
            if ($scope.DA == null || $scope.DA == undefined || $scope.DA == "") {
                alert("Enter DA");
                return;
            }
            if ($scope.HRA == null || $scope.HRA == undefined || $scope.HRA == "") {
                alert("Enter HRA");
                return;
            }
            if ($scope.Medical == null || $scope.Medical == undefined || $scope.Medical == "") {
                alert("Enter Medical");
                return;
            }

            var addElevence = PayRollService.AddorUpdateElevence(datatypeid, 0, $scope.IR, $scope.DA, $scope.HRA, $scope.Medical, $scope.UserName)
            addElevence.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getEditElevence();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getEditElevence();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.EditElevence = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }

        $scope.UpdateElevence = function (data) {
            var datatypeid = 2


            var AddDepartment = PayRollService.AddorUpdateElevence(datatypeid, data.ElevenceID, data.IR, data.DA, data.HRA, data.Medical, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.ClearData();
                    $scope.getEditElevence()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.ClearData();
                    $scope.getEditElevence()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

     

        $scope.ChangeElevence = function (ElevenceID,  Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollElevence(DataType, ElevenceID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditElevence();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditElevence();
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