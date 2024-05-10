define(['app'], function (app) {
    app.controller("EmployeeDetailsController", function ($scope, $localStorage, PayRollService, $uibModal) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getEmployeeDetailsData();


        }
<<<<<<< HEAD
        var DataTypeID = 1
        var getdesign = PayRollService.GetDesignationData(DataTypeID, 0, 0);
        getdesign.then(function (response) {

            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            //$scope.edit = true;
            if (res.Table.length > 0) {
                $scope.DesignationData = res.Table;
                $scope.Noreports = false;
=======
            var DataTypeID = 1
            var getdesign = PayRollService.GetDesignationData(DataTypeID, 0, 0);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.DesignationData = res.Table;
                    $scope.Noreports = false;
                  
>>>>>>> 6851f268f873cd906aea252414789dad476ce268


                }
                else {
                    $scope.DesignationData = [];
                    $scope.Noreports = true;
                }

<<<<<<< HEAD
            }
            else {
                $scope.DesignationData = [];
                $scope.Noreports = true;
            }


        },

            function (error) {
                alert("error while loading Designation");
                var err = JSON.parse(error);

            });
=======

            },

                function (error) {
                    alert("error while loading Designation");
                    var err = JSON.parse(error);

                });
>>>>>>> 6851f268f873cd906aea252414789dad476ce268


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
<<<<<<< HEAD

=======
              
>>>>>>> 6851f268f873cd906aea252414789dad476ce268


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


        $scope.adddetails = function () {

            var datatypeid = 1
            if ($scope.EmployeeCode == null || $scope.EmployeeCode == undefined || $scope.EmployeeCode == "") {
                alert("Please Enter Employee Code");
                return;
            }

            if ($scope.EmployeeName == null || $scope.EmployeeName == undefined || $scope.EmployeeName == "") {
                alert("Please Enter Employee Name");
                return;
            }

<<<<<<< HEAD
            if ($scope.DOB == null || $scope.DOB == undefined || $scope.DOB == "") {
=======
            if ($scope.CandidateNameDOB == null || $scope.CandidateNameDOB == undefined || $scope.CandidateNameDOB == "") {
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
                alert("Please Select DOB ");
                return;
            }

            if ($scope.DOJ == null || $scope.DOJ == undefined || $scope.DOJ == "") {
                alert("Please Enter DOJ ");
                return;
            }

            if ($scope.DOR == undefined || $scope.DOR == null || $scope.DOR == "") {
                alert("Please Enter DOR");
                return;
            }

            if ($scope.Designation == undefined || $scope.Designation == null || $scope.Designation == "") {
                alert("Please Enter DesignationName");
                return;
            }


            if ($scope.Department == undefined || $scope.Department == null || $scope.Department == "") {
                alert("Please Enter DepartmentName");
                return;
            }


            if ($scope.Gender == undefined || $scope.Gender == null || $scope.Gender == "") {
                alert("Please Enter Gender");
                return;
            }

            if ($scope.PHC == undefined || $scope.PHC == null || $scope.PHC == "") {
                alert("Please Enter PHC");
                return;
            }

<<<<<<< HEAD
            if ($scope.Empstatus == undefined || $scope.Empstatus == null || $scope.Empstatus == "") {
=======
            if ($scope.EmployeeStatus == undefined || $scope.EmployeeStatus == null || $scope.EmployeeStatus == "") {
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
                alert("Please Enter EmployeeStatus");
                return;
            }

            if ($scope.IncrementMonth == null || $scope.IncrementMonth == undefined || $scope.IncrementMonth == "") {
                alert("Please Enter IncrementMonth");
                return;
            }
            if ($scope.ScaleType == null || $scope.ScaleType == undefined || $scope.ScaleType == "") {
                alert("Please Select ScaleType ");
                return;
            }
<<<<<<< HEAD
            if ($scope.PanNo == null || $scope.PanNo == undefined || $scope.PanNo == "") {
=======
            if ($scope.PanNumber == null || $scope.PanNumber == undefined || $scope.PanNumber == "") {
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
                alert("Please Enter PanNumber ");
                return;
            }

<<<<<<< HEAD
            if ($scope.GPFNo == undefined || $scope.GPFNo == null || $scope.GPFNo == "") {
=======
            if ($scope.GPFNumber == undefined || $scope.GPFNumber == null || $scope.GPFNumber == "") {
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
                alert("Please Enter GPFNumber");
                return;
            }

            if ($scope.CPS_NPS == undefined || $scope.CPS_NPS == null || $scope.CPS_NPS == "") {
                alert("Please Enter CPS/NPS");
                return;
            }

<<<<<<< HEAD
            if ($scope.CPSNo == undefined || $scope.CPSNo == null || $scope.CPSNo == "") {
=======
            if ($scope.CPSNumber == undefined || $scope.CPSNumber == null || $scope.CPSNumber == "") {
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
                alert("Please Enter CPSNumber");
                return;
            }


<<<<<<< HEAD
            if ($scope.BankDetails == undefined || $scope.BankDetails == null || $scope.BankDetails == "") {
=======
            if ($scope.BankID == undefined || $scope.BankID == null || $scope.BankID == "") {
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
                alert("Please Enter BankDetails");
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

<<<<<<< HEAD
            var AddEmployeeDetails = PayRollService.AddEmployeeDetails(datatypeid, 0, $scope.EmployeeCode, $scope.EmployeeName, moment($scope.DOB).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOJ).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOR).format("YYYY-MM-DD HH:mm:ss.SSS"), $scope.DesignationName, $scope.Department, $scope.Gender, $scope.PHC, $scope.Empstatus, $scope.IncrementMonth, $scope.ScaleType, $scope.PanNo, $scope.GPFNo, $scope.CPS_NPS, $scope.CPSNo, $scope.BankDetails, $scope.AccountNumber, $scope.CategoryCode, 1, $scope.UserName)
=======
            var AddEmployeeDetails = PayRollService.AddEmployeeDetails(datatypeid, 0, $scope.EmployeeCode, $scope.EmployeeName, moment($scope.CandidateNameDOB).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOJ).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOR).format("YYYY-MM-DD HH:mm:ss.SSS"), $scope.Designation, $scope.Department, $scope.Gender, $scope.PHC, $scope.EmployeeStatus, $scope.IncrementMonth, $scope.ScaleType, $scope.PanNumber, $scope.GPFNumber, $scope.CPS_NPS, $scope.CPSNumber, $scope.BankID, $scope.AccountNumber, $scope.CategoryCode, 1, $scope.UserName)
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
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

<<<<<<< HEAD
=======
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
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
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




            var desig = PayRollService.UpdateEmployeeDetails(datatypeid, 0, $scope.EmployeeCode, $scope.EmployeeName, $scope.DOB, $scope.DOJ, $scope.DOR, $scope.DesignationName, $scope.DepartmentName, $scope.Gender, $scope.PHC, $scope.Empstatus, $scope.IncrementMonth, $scope.ScaleType, $scope.PanNo, $scope.GPFNo, $scope.CPS_NPS, $scope.CPSNo, $scope.BankDetails, $scope.AccountNumber, $scope.CategoryCode, 1, $scope.UserName)
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



<<<<<<< HEAD
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




=======
        
>>>>>>> 6851f268f873cd906aea252414789dad476ce268

        $scope.SelectBankDetails = function () {

            let DataTypeID = 1
            var getbank = PayRollService.GetBankDetailsData(DataTypeID, 0, 0);
            getbank.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.BanksData = res.Table;
                    $scope.Noreports = false;


                }
                else {
                    $scope.BanksData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/PostExam/PayRoll/Popups/BankDetailsPopup.html",
                size: 'lg',
                scope: $scope,
                windowClass: 'modal-fit',
                backdrop: 'static',
                keyboard: false
            });


        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };
<<<<<<< HEAD
=======

        $scope.getBranchesbyId = function (BankData) {
>>>>>>> 6851f268f873cd906aea252414789dad476ce268

        $scope.getBranchesbyId = function (BankData) {
            var BankData = JSON.parse(BankData)
            console.log(BankData)
            $scope.BankId = BankData.BankId;
            $scope.BankName = BankData.BankName;
            
            var getbranch = PayRollService.GetBankBranchbyId($scope.BankId);
            getbranch.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
<<<<<<< HEAD
                    $scope.BranchsData = res.Table;
=======
                    $scope.BanksData = res.Table;
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
                    $scope.Noreports = false;


                }
                else {
<<<<<<< HEAD
                    $scope.BranchsData = [];
=======
                    $scope.BanksData = [];
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });
        }

<<<<<<< HEAD
        $scope.ChangeBranchs = function (BankBranch) {
            $scope.BankBranch = BankBranch;
           
        }

        $scope.SubmitBankDetails = function (Bank, BankBranch) {

   
            $scope.BankDetails = $scope.BankName + ',' + $scope.BankBranch;
=======

        $scope.SubmitBankDetails = function (Bank, BankBranch) {

            $scope.Bank = Bank;
            $scope.BankBranch = BankBranch;
            $scope.BankID = BankBranch
            $scope.BankDetails = $scope.Bank + ',' + $scope.BankBranch;
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
            $scope.modalInstance.close();
        }

       



    })
})
<<<<<<< HEAD




=======
>>>>>>> 6851f268f873cd906aea252414789dad476ce268
