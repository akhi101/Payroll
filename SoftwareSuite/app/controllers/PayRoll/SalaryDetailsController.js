define(['app'], function (app) {
    app.controller("SalaryDetailsController", function ($scope, $localStorage, PayRollService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.getsalarydata();

            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';
        }




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
    

        $scope.ClearData = function () {
            $scope.EmployeeID = null;
            $scope.CurrentBasicAmount = "";
            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';

        }

        $scope.Add = function () {

            var datatypeid = 1


            if ($scope.EmployeeID == null || $scope.EmployeeID == undefined || $scope.EmployeeID == "") {
                alert("Please Enter EmployeeName");
                return;
            }
            if ($scope.CurrentBasicAmount == null || $scope.CurrentBasicAmount == undefined || $scope.CurrentBasicAmount == "") {
                alert("Enter Current Basic Amount");
                return;
            }
            var AddSalary = PayRollService.AddSalary(datatypeid, $scope.EmployeeID, $scope.CurrentBasicAmount, $scope.UserName)
            AddSalary.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getsalarydata();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getsalarydata();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }





        $scope.getsalarydata = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetSalaryData(DataTypeID,0, 0);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.SalaryData = res.Table;
                    $scope.Noreports = false;
                   


                }
                else {
                    $scope.SalaryData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Department");
                    var err = JSON.parse(error);

                });
        }






        $scope.UPDATE = function () {
            
            var datatypeid = 2;

            var sal = PayRollService.UpdateSalary(datatypeid, $scope.EmployeeID, $scope.CurrentBasicAmount,  $scope.UserName)
            sal.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.ClearData();
                    $scope.getsalarydata();

                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.ClearData();
                    $scope.getsalarydata();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }











        $scope.EditSalary = function (data) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.AddDetails = '0';
            $scope.UpdateDetails = '1';
            var DataTypeID = 2
            var getdesign = PayRollService.GetSalaryData(DataTypeID, data.EmployeeId, 0);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.EditSalaryData = res.Table;
                    $scope.EmployeeID = res.Table[0].EmployeeId;
                    $scope.CurrentBasicAmount = res.Table[0].CurrentBasicAmount;
                    $scope.Noreports = false;



                }
                else {
                    $scope.SalaryData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Department");
                    var err = JSON.parse(error);

                });


        }
        $scope.ChangeStatus = function (EmployeeId, Status) {
            var DataType = 3;
            var getSlides = PayRollService.ChangeSalaryStatus(DataType, EmployeeId, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getsalarydata();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getsalarydata();
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