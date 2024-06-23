define(['app'], function (app) {
    app.controller("CommonElevensesController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $scope.Values = [{ "id": 1, "name": "Yes" }, { "id": 0, "name": "No" }]
        $ctrl.$onInit = () => {
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.userName;

            $scope.getEditIDH();
            $scope.getEditMA();

        }


      


        $scope.getEditIDH = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetEditIDH(DataTypeID, $scope.IR, $scope.DA, $scope.HRA, 0, 0);
            getdesign.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.IDHData = res.Table;
                    $scope.DataNotFound = false;
                    for (var j = 1; j < $scope.IDHData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.IDHData = [];
                    $scope.DataNotFound = true;
                }
            },
                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });



        }



        $scope.ADDIDH = function () {
            var datatypeid = 1
           
            var addIDH = PayRollService.AddorUpdateIDH(datatypeid, 0, $scope.IR, $scope.DA, $scope.HRA, $scope.UserName)
            addIDH.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    
                    $scope.getEditIDH();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getEditIDH();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.EditIDH = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }

        $scope.UpdateIDH = function (data) {
            var datatypeid = 2


            var AddDepartment = PayRollService.AddorUpdateIDH(datatypeid, data.IR_DA_HRAID, data.IR, data.DA, data.HRA, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.getEditIDH()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.getEditIDH()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

     

        $scope.ChangeIDH = function (IR_DA_HRAID,  Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollIDH(DataType, IR_DA_HRAID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditIDH();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditIDH();
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


      




        $scope.getEditMA = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetEditMA(DataTypeID, $scope.MA, 0, 0);
            getdesign.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.MAData = res.Table;
                    $scope.DataNotFound = false;
                    for (var j = 1; j < $scope.MAData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.MAData = [];
                    $scope.DataNotFound = true;
                }
            },
                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });



        }



        $scope.ADDMA = function () {
            var datatypeid = 1

            var AddDepartment = PayRollService.AddorUpdateMA(datatypeid, 0, $scope.MA,  $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    
                    $scope.getEditMA();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getEditMA();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.EditMA = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }

        $scope.UpdateMA = function (data) {
            var datatypeid = 2


            var updatema = PayRollService.AddorUpdateMA(datatypeid, data.MAID, data.MA, $scope.UserName)
            updatema.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.getEditMA()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.getEditMA()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.ChangeMA = function (MAID,  Status) {
            var DataType = 3;
            var changema = PayRollService.PayRollMA(DataType, MAID,  Status);
            changema.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditMA();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditMA();
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