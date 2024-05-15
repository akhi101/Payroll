define(['app'], function (app) {
    app.controller("SalaryDetailsController", function ($scope, $localStorage, PayRollService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getsalarydata();


        }
        

        $scope.Add = function () {

            var datatypeid = 1


            if ($scope.EmployeeName == null || $scope.EmployeeName == undefined || $scope.EmployeeName == "") {
                alert("Please Enter EmployeeName");
                return;
            }
            if ($scope.BasicAmount == null || $scope.BasicAmount == undefined || $scope.BasicAmount == "") {
                alert("Enter Current Basic Amount");
                return;
            }
            var datatypeid = 1
            var AddSalary = PayRollService.AddSalary(datatypeid, 0, $scope.EmployeeName, $scope.BasicAmount, 1, $scope.UserName)
            AddSalary.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
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
            var getdesign = PayRollService.GetSalaryData(DataTypeID, 0, 0);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.SalaryData = res.Table;
                    $scope.Noreports = false;
                    for (var j = 1; j < $scope.SalaryData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }


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






        $scope.UpdateSalary = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }

            var datatypeid = 2;





            var desig = PayRollService.UpdateSalary(datatypeid, data.EmployeeID, $scope.EmployeeName, $scope.BasicAmount,  $scope.UserName)
            desig.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.getsalarydata();

                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.getsalarydata();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }











        $scope.EditSalary = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }
        $scope.ChangeStatus = function (EmployeeID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.ChangeSalaryStatus(DataType, EmployeeID, Status);
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