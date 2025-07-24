define(['app'], function (app) {
    app.controller("PensionerDetailsController", function ($scope, $localStorage, PayRollService, $uibModal) {

        const $ctrl = this;
        $ctrl.$onInit = () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            $scope.FamilyAddDetails = '1';
            $scope.FamilyUpdateDetails = '0';
           // $scope.ServiceAddDetails = '1';
            $scope.ServiceUpdateDetails ='0'
            //$scope.getEmployeeDetailsData();
            $scope.showaddmonth = true;
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.UserName;

            //$scope.IncrementMonth = null;
            $scope.GetEmployeeDetails()
            $scope.GetorEditFamilyPensionerDetails(1)
            $scope.GetorEditServicePensionerDetails(1)

            $scope.LifeStatusList = [{ "id": true, "name": "Active" }, { "id": false, "name": "Deceased" }]
        }

        
        $scope.GetorEditFamilyPensionerDetails = function (DataTypeID) {
          //  var DataTypeID = 1
            var getdesign = PayRollService.GetorEditFamilyPensionerDetails(DataTypeID, 0);
            getdesign.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.FamilyPensionerData = res.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.FamilyPensionerData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Family Pensioner Details");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetorEditServicePensionerDetails = function (DataTypeID) {
            //var DataTypeID = 1
            var getdesign = PayRollService.GetorEditServicePensionerDetails(DataTypeID, 0);
            getdesign.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.ServicePensionerData = res.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.ServicePensionerData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Service Pensioner Details");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetEmployeeDetails = function () { 
        
            var getdesign = PayRollService.GetServicePensioners();
        getdesign.then(function (response) {
            //try {
            //    var res = JSON.parse(response);
            //}
            //catch (err) { }
            //$scope.edit = true;
            if (response.Table.length > 0) {
                $scope.EmployeeDetailsData = response.Table;
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

        $scope.ChangeAdvEmpData = function (data) {
            var data = JSON.parse(data)
            $scope.EmployeeId = data.EmployeeID
            $scope.EmployeeCode = data.EmployeeCode
            $scope.EmployeeName = data.EmployeeName
            $scope.Designation = data.DesignationName

        }

        $scope.EditServicePensionerDetails = function (ServicePensionerID) {

            $scope.showaddmonth = false;
            $scope.showupdatemonth = true;
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.AddDetails = '0';
            $scope.UpdateDetails = '1';
            var DataTypeID = 2
            $scope.ServicePensionerID = ServicePensionerID;
            var getdesign = PayRollService.GetorEditServicePensionerDetails(DataTypeID, ServicePensionerID);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.EditServicePensionerDetailsData = res.Table;
                    $scope.Noreports = false;
                   // $scope.ServiceAddDetails = '1';
                    $scope.ServiceUpdateDetails = '1'

                    $scope.ServicePensionerID = res.Table[0].ServicePensionerID;
                    $scope.EmployeeId = res.Table[0].EmployeeID;  
                    $scope.EmployeeCode = res.Table[0].EmployeeCode;
                    $scope.EmployeeName = res.Table[0].EmployeeName;
                    $scope.DOB = res.Table[0].DOB;
                    $scope.DOJ = res.Table[0].DOJ;
                    $scope.DOR = res.Table[0].DOR;
                    $scope.Designation = res.Table[0].DesignationId;
                    $scope.Department = res.Table[0].DepartmentId;
                    $scope.Gender = res.Table[0].Gender;
                    $scope.Empstatus = res.Table[0].Empstatus;
                  //  $scope.IncrementMonth = $scope.EditEmployeeDetailsData[0].MonthID;
                   // //$scope.IncrementMonthUpdated = res.Table[0].MonthID;
                    $scope.ScaleType = res.Table[0].ScaleType;
                    $scope.PanNo = res.Table[0].PanNo;
                    //$scope.CPS_NPS = res.Table[0].CPS_NPS;
                    //$scope.PranNo = res.Table[0].PranNo;
                    //$scope.GPFNo = res.Table[0].GPFNo;
                    $scope.LifeStatus = res.Table[0].LifeStatus;
                    $scope.AccountNumber = res.Table[0].AccountNumber;
                    $scope.IFSCCode = res.Table[0].IFSCCode;

                    $scope.GOPostID = res.Table[0].GOPostID;
                    $scope.SortOrder = res.Table[0].SortOrder;



                    //$scope.EditMonthData = res.Table1;


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

        $scope.EditFamilyPensionerDetails = function (FamilyPensionerID) {

            $scope.showaddmonth = false;
            $scope.showupdatemonth = true;
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.AddDetails = '0';
            $scope.UpdateDetails = '1';
            var DataTypeID = 2
            $scope.FamilyPensioner = FamilyPensionerID;
            var getdesign = PayRollService.GetorEditFamilyPensionerDetails(DataTypeID, $scope.FamilyPensioner);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                //$scope.edit = true;
                if (res.Table.length > 0) {
                   
                    $scope.EditServicePensionerDetailsData = res.Table;
                    $scope.Noreports = false;
                    $scope.FamilyPensionerID = res.Table[0].FamilyPensionerID;
                    $scope.EmployeeID1 = res.Table[0].EmployeeID;
                    $scope.EmployeeCode1 = res.Table[0].EmployeeCode;
                    $scope.EmployeeName1 = res.Table[0].EmployeeName;
                    $scope.Empstatus1 = res.Table[0].Empstatus;
                    $scope.NomineeName1 = res.Table[0].NomineeName;
                    $scope.Gender1 = res.Table[0].Gender;
                    $scope.PanNo1 = res.Table[0].PanNo;
                    $scope.Active1 = res.Table[0].Active;
                    $scope.AccountNumber1 = res.Table[0].AccountNumber;
                    $scope.IFSCCode1 = res.Table[0].IFSCCode;



                    //$scope.EditMonthData = res.Table1;

                    $scope.FamilyAddDetails = '0';
                    $scope.FamilyUpdateDetails = '1';
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

        $scope.AddFamilyPensioners = function (datatypeid) {


            let FamilyPensionerID = datatypeid == '2' ? $scope.FamilyPensionerID : "";
            let Active = datatypeid == '2' ? $scope.Active1 : "";

            var Setfamilypensioners = PayRollService.AddorUpdateFamilyPensioners(datatypeid, FamilyPensionerID, $scope.EmployeeID1, $scope.NomineeName1, $scope.Gender1, $scope.PanNo1, $scope.AccountNumber1, $scope.IFSCCode1, Active, $scope.UserName)
            Setfamilypensioners.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.GetorEditFamilyPensionerDetails(1)
                  //  $scope.ClearData();

                }
                else if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                    $scope.GetorEditFamilyPensionerDetails(1)
                    //  $scope.ClearData();

                }
                else {
                    alert('Something Went Wrong')
                    $scope.GetorEditFamilyPensionerDetails(1)
                    $scope.ClearData();

                }
            },
                function (error) {
                    alert("something Went Wrong")
                    $scope.ClearData();


                });
        }

        $scope.UpdateServicePensioners = function () {

            var SetFinYr = PayRollService.UpdateServicePensioners($scope.ServicePensionerID, $scope.EmployeeId, $scope.EmployeeCode, $scope.EmployeeName, $scope.DOB, $scope.DOJ, $scope.DOJ, $scope.Designation, $scope.Gender, $scope.PanNo, $scope.AccountNumber, $scope.IFSCCode, $scope.SortOrder, $scope.LifeStatus, 1, $scope.UserName)
            SetFinYr.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.ServiceAddDetails = '0';
                    $scope.GetorEditServicePensionerDetails(1)
                    $scope.GetData();
                    $scope.ClearData();

                } else {
                    alert('Something Went Wrong')
                    $scope.ClearData();

                }
            },
                function (error) {
                    alert("something Went Wrong")
                    $scope.ClearData();


                });
        }


        $scope.SortOrderData = [{ "Id": 1, "Value": "1" }, { "Id": 2, "Value": "2" }, { "Id": 3, "Value": "3" }, { "Id": 4, "Value": "4" }, { "Id": 5, "Value": "5" }, { "Id": 6, "Value": "6" }, { "Id": 7, "Value": "7" }, { "Id": 8, "Value": "8" }, { "Id": 9, "Value": "9" }, { "Id": 10, "Value": "10" }, { "Id": 11, "Value": "11" }, { "Id": 12, "Value": "12" }, { "Id": 13, "Value": "13" }, { "Id": 14, "Value": "14" }, { "Id": 15, "Value": "15" }, { "Id": 16, "Value": "16" }, { "Id": 17, "Value": "17" }, { "Id": 18, "Value": "18" }, { "Id": 19, "Value": "19" }, { "Id": 20, "Value": "20" }, { "Id": 21, "Value": "21" }, { "Id": 22, "Value": "22" }, { "Id": 23, "Value": "23" }, { "Id": 24, "Value": "24" }];

        $scope.getGOPosts = function () {
            var getGOPost = PayRollService.getGOPostData($scope.Department);
            getGOPost.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.GOData = res.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.GOData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading GOPost");
                    var err = JSON.parse(error);

                });

        };


        $scope.ChangeNPS = function (CPS_NPS) {
            var DataTypeID = 5
            var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, 0, $scope.DepartmentID, $scope.CPS_NPS, 0);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.PensionerDetailsData = res.Table;
                    $scope.Noreports = false;



                }
                else {
                    $scope.PensionerDetailsData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });
            if (CPS_NPS == "Y") {
                $scope.showprannumber = true;
                /* $scope.showtsglinumber = true;*/
                $scope.showgpfnumber = false;


            }
            else if (CPS_NPS == "N") {
                $scope.showprannumber = false;
                $scope.showgpfnumber = true;
                /*  $scope.showtsglinumber = true;*/
            }
        }

        var getmon = PayRollService.GetMonths();
        getmon.then(function (res) {

            //$scope.edit = true;
            if (res.Table.length > 0) {
                $scope.MonthsData = res.Table;
                $scope.Noreports = false;



            }
            else {
                $scope.MonthsData = [];
                $scope.Noreports = true;
            }


        },

            function (error) {
                alert("error while loading Department");
                var err = JSON.parse(error);

            });

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


        $scope.ClearData = function () {
            $scope.EmployeeCode = "";
            $scope.EmployeeName = "";
            $scope.DOB = "";
            $scope.DOJ = "";
            $scope.DOR = "";
            $scope.Designation = null;
            $scope.Department = null;
            $scope.Gender = "";
            /*                $scope.PHC = "";*/
            $scope.Empstatus = "";
            $scope.IncrementMonth = null;
            $scope.ScaleType = "";
            $scope.PanNo = "";
            $scope.CPS_NPS = "";
            $scope.PranNo = "";
            $scope.GPFNo = "";
            $scope.TSGLINumber = "";
            /* $scope.BankDetails = "";*/
            $scope.AccountNumber = "";
            $scope.IFSCCode = "";
            $scope.GOPostID = null;
            $scope.SortOrder = null;
            /*$scope.CategoryCode = "";*/

        }


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

            if ($scope.DOB == null || $scope.DOB == undefined || $scope.DOB == "" || $scope.DOB == "Invalid date") {
                $scope.DOB = null;
                //alert("Please Select DOB ");
                //return;
            } else {
                $scope.DOB = moment($scope.DOB).format("YYYY-MM-DD")
            }

            if ($scope.DOJ == null || $scope.DOJ == undefined || $scope.DOJ == "" || $scope.DOJ == "Invalid date") {
                $scope.DOJ = null;
                //alert("Please Enter DOJ ");
                //return;
            } else {
                $scope.DOJ = moment($scope.DOJ).format("YYYY-MM-DD")
            }

            if ($scope.DOR == undefined || $scope.DOR == null || $scope.DOR == "" || $scope.DOR == "Invalid date") {
                $scope.DOR = null;
                //alert("Please Enter DOR");
                //return;
            } else {
                $scope.DOR = moment($scope.DOR).format("YYYY-MM-DD")
            }

            if ($scope.Designation == undefined || $scope.Designation == null || $scope.Designation == "") {
                alert("Please Enter DesignationName");
                return;
            }


            if ($scope.LifeStatus == undefined || $scope.LifeStatus == null || $scope.LifeStatus == "") {
                alert("Please Enter LifeStatus");
                return;
            }
           
            
            if ($scope.PanNo == null || $scope.PanNo == undefined || $scope.PanNo == "") {
                alert("Please Enter PanNumber ");
                return;
            }
           
 

            if ($scope.AccountNumber == undefined || $scope.AccountNumber == null || $scope.AccountNumber == "") {
                alert("Please Enter AccountNumber");
                return;
            }
            if ($scope.IFSCCode == undefined || $scope.IFSCCode == null || $scope.IFSCCode == "") {
                alert("Please Enter IFSCCode");
                return;
            }


            var datatypeid = 1

            var addEmployeeDetails = PayRollService.AddEmployeeDetails(datatypeid, 0, $scope.EmployeeCode, $scope.EmployeeName, $scope.DOB, $scope.DOJ, $scope.DOR, $scope.Designation, $scope.Department, $scope.Gender, $scope.Empstatus, $scope.IncrementMonth, $scope.TSGLINumber, $scope.ScaleType, $scope.PanNo, $scope.CPS_NPS, $scope.PranNo, $scope.GPFNo, $scope.AccountNumber, $scope.IFSCCode, $scope.GOPostID, $scope.SortOrder, 1, $scope.UserName)
            addEmployeeDetails.then(function (res) {
                //try {
                //    var res = JSON.parse(response);
                //} catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getEmployeeDetailsData();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getEmployeeDetailsData();

                } else {
                    alert('Something Went Wrong');

                    $scope.ClearData();

                }
            },
                function (error) {
                    alert("something Went Wrong");
                    $scope.ClearData();


                });
        }


        $scope.checkDate = function (DOB) {
            var currentDate = new Date();
            var birthdate = new Date(DOB);
            if (birthdate > currentDate) {
                alert('Selected Date Should not be Future!')
                $scope.DOB = '';
                return;
            } else {
                $scope.DOB = DOB;
            }

            if (DOB) {
                var dobDate = new Date(DOB);
                var dorDate = new Date(dobDate.setFullYear(dobDate.getFullYear() + 61));
                $scope.DOR = dorDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd
            } else {
                $scope.DOR = '';
            }
        }

        $scope.checkDate1 = function (DOJ) {
            var currentDate = new Date();
            var birthdate = new Date(DOJ);
            if (birthdate > currentDate) {
                alert('Selected Date Should not be Future!')
                $scope.DOJ = '';
                return;
            } else {
                $scope.DOJ = DOJ;
            }
        }

        //$scope.checkDate2 = function (DOR) {
        //    var currentDate = new Date();
        //    var birthdate = new Date(DOR);
        //    if (birthdate > currentDate) {
        //        alert('Selected Date Should not be Future!')
        //        $scope.DOR = '';
        //        return;
        //    } else {
        //        $scope.DOR = DOR;
        //    }
        //}

        $scope.ChangeDepartment = function (data) {
            if ($scope.Department == 1) {
                $scope.ScaleType = "AICTE";
            } else {
                $scope.ScaleType = "";
            }

            $scope.DepartmentID = data;
            $scope.getEmployeeDetailsData(data)
            $scope.getGOPosts();

            if (data == 1 || data == 3) {
                $scope.ShowTSGLI = true;
            }

            else {
                $scope.ShowTSGLI = false;
            }


        }

        $scope.getEmployeeDetailsData = function (data) {
            var DataTypeID = 1
            var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, 0, $scope.Department, 0, 0);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.PensionerDetailsData = res.Table;
                    $scope.Noreports = false;



                }
                else {
                    $scope.PensionerDetailsData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });
        }






        $scope.updatepensionerdetails = function (data, ind) {
            //$scope['edit' + ind] = true;

            //var ele2 = document.getElementsByClassName("enabletable" + ind);
            //for (var j = 0; j < ele2.length; j++) {
            //    ele2[j].style['pointer-events'] = "none";
            //    ele2[j].style.border = "0";
            //}

            var datatypeid = 2;




            var desig = PayRollService.UpdateEmployeeDetails(datatypeid, $scope.EmployeeID, $scope.EmployeeCode, $scope.EmployeeName, moment($scope.DOB).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOJ).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOR).format("YYYY-MM-DD HH:mm:ss.SSS"), $scope.Designation, $scope.Gender, $scope.LifeStatus, $scope.PanNo, $scope.AccountNumber, $scope.IFSCCode, $scope.SortOrder, $scope.Active, $scope.UserName)
            desig.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.getEmployeeDetailsData();
                    $scope.ClearData();
                    $scope.EditEmployeeDetailsData[0].MonthID = null;
                    $scope.AddDetails = '1';
                    $scope.UpdateDetails = '0';

                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.getEmployeeDetailsData();
                    $scope.ClearData();
                    $scope.EditEmployeeDetailsData[0].MonthID = null;
                    $scope.AddDetails = '1';
                    $scope.UpdateDetails = '0';


                } else {
                    alert('Something Went Wrong');
                    $scope.ClearData();

                }
            },
                function (error) {
                    alert("something Went Wrong");
                    $scope.ClearData();



                });
        }









       

        $scope.EditPensionerDetails = function (EmployeeID, DepartmentId, Active) {

            $scope.showaddmonth = false;
            $scope.showupdatemonth = true;
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.AddDetails = '0';
            $scope.UpdateDetails = '1';
            var DataTypeID = 2
            $scope.EmployeeID = EmployeeID;
            $scope.DepartmentID = DepartmentId;
            $scope.Active = Active;
            var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, EmployeeID, DepartmentId, 0, Active);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.EditEmployeeDetailsData = res.Table;
                    $scope.Noreports = false;

                    $scope.EmployeeCode = res.Table[0].EmployeeCode;
                    $scope.EmployeeName = res.Table[0].EmployeeName;
                    $scope.DOB = res.Table[0].DOB;
                    $scope.DOJ = res.Table[0].DOJ;
                    $scope.DOR = res.Table[0].DOR;
                    $scope.Designation = res.Table[0].DesignationId;
                    $scope.Department = res.Table[0].DepartmentId;
                    $scope.Gender = res.Table[0].Gender;
                    $scope.Empstatus = res.Table[0].Empstatus;
                    $scope.IncrementMonth = $scope.EditEmployeeDetailsData[0].MonthID;
                    //$scope.IncrementMonthUpdated = res.Table[0].MonthID;
                    $scope.ScaleType = res.Table[0].ScaleType;
                    $scope.PanNo = res.Table[0].PanNo;
                    $scope.CPS_NPS = res.Table[0].CPS_NPS;
                    $scope.PranNo = res.Table[0].PranNo;
                    $scope.GPFNo = res.Table[0].GPFNo;
                    $scope.TSGLINumber = res.Table[0].TSGLINumber;
                    $scope.AccountNumber = res.Table[0].AccountNumber;
                    $scope.IFSCCode = res.Table[0].IFSCCode;

                    $scope.GOPostID = res.Table[0].GOPostID;
                    $scope.SortOrder = res.Table[0].SortOrder;



                    //$scope.EditMonthData = res.Table1;


                }
                else {
                    $scope.PensionerDetailsData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });


        }
        $scope.changemonth = function (data) {
            $scope.IncrementMonthUpdated = data;
        }

        $scope.ChangeStatus = function (EmployeeID, DepartmentId, CPS_NPS, Status) {
            var DataType = 3;
            var getSlides = PayRollService.EmployeeDetailStatus(DataType, EmployeeID, DepartmentId, CPS_NPS, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription);
                    var DataTypeID = 1;
                    var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, 0, $scope.DepartmentID, CPS_NPS, 0);
                    getdesign.then(function (response) {

                        try {
                            var res = JSON.parse(response);
                        }
                        catch (err) { }

                        //$scope.edit = true;
                        if (res.Table.length > 0) {
                            $scope.PensionerDetailsData = res.Table;
                            $scope.Noreports = false;



                        }
                        else {
                            $scope.PensionerDetailsData = [];
                            $scope.Noreports = true;
                        }


                    },

                        function (error) {
                            alert("error while loading Employee Details");
                            var err = JSON.parse(error);

                        });
                    //$scope.getEmployeeDetailsData();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription);
                    var DataTypeID = 1;
                    var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, 0, $scope.DepartmentID, 0);
                    getdesign.then(function (response) {

                        try {
                            var res = JSON.parse(response);
                        }
                        catch (err) { }

                        //$scope.edit = true;
                        if (res.Table.length > 0) {
                            $scope.PensionerDetailsData = res.Table;
                            $scope.Noreports = false;



                        }
                        else {
                            $scope.PensionerDetailsData = [];
                            $scope.Noreports = true;
                        }


                    },

                        function (error) {
                            alert("error while loading Employee Details");
                            var err = JSON.parse(error);

                        });
                    //$scope.getEmployeeDetailsData();
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





        //$scope.SelectBankDetails = function () {

        //    let DataTypeID = 1
        //    var getbank = PayRollService.GetBankDetailsData(DataTypeID, 0, 0);
        //    getbank.then(function (response) {

        //        try {
        //            var res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        //$scope.edit = true;
        //        if (res.Table.length > 0) {
        //            $scope.BanksData = res.Table;
        //            $scope.Noreports = false;


        //        }
        //        else {
        //            $scope.BanksData = [];
        //            $scope.Noreports = true;
        //        }


        //    },

        //        function (error) {
        //            alert("error while loading Employee Details");
        //            var err = JSON.parse(error);

        //        });


        //    //$scope.modalInstance = $uibModal.open({
        //    //    templateUrl: "/app/views/PayRoll/Popups/BankDetailsPopup.html",
        //    //    size: 'lg',
        //    //    scope: $scope,
        //    //    windowClass: 'modal-fit',
        //    //    backdrop: 'static',
        //    //    keyboard: false
        //    //});


        //}

        //$scope.closeModal = function () {
        //    $scope.modalInstance.close();
        //};

        //$scope.getBranchesbyName = function (BankData) {
        //    var BankData = JSON.parse(BankData)
        //    console.log(BankData)
        //    $scope.BankId = BankData.BankId;
        //    $scope.BankName = BankData.BankName;

        //    var getbranch = PayRollService.GetBankBranchbyName($scope.BankName);
        //    getbranch.then(function (response) {

        //        try {
        //            var res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        //$scope.edit = true;
        //        if (res.Table.length > 0) {
        //            $scope.BranchsData = res.Table;
        //            $scope.Noreports = false;


        //        }
        //        else {
        //            $scope.BranchsData = [];
        //            $scope.Noreports = true;
        //        }


        //    },

        //        function (error) {
        //            alert("error while loading Employee Details");
        //            var err = JSON.parse(error);

        //        });
        //}

        //$scope.ChangeBranchs = function (BankBranch) {
        //    $scope.BankBranch = BankBranch;
        //    var getbranchifsc = PayRollService.GetBranchIFSC($scope.BankName,$scope.BankBranch);
        //    getbranchifsc.then(function (response) {

        //        try {
        //            var res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        //$scope.edit = true;
        //        if (res.Table.length > 0) {
        //            $scope.BranchIFSCData = res.Table;
        //            $scope.IFSCCode = $scope.BranchIFSCData[0].IFSCCode;
        //            $scope.Noreports = false;


        //        }
        //        else {
        //            $scope.BranchsData = [];
        //            $scope.Noreports = true;
        //        }


        //    },

        //        function (error) {
        //            alert("error while loading Employee Details");
        //            var err = JSON.parse(error);

        //        });

        //}

        //$scope.SubmitBankDetails = function (BankData, BankBranch) {


        //    $scope.BankDetails = $scope.BankName + ',' + $scope.BankBranch + ',' + $scope.IFSCCode;
        //    //$scope.BankId = BankData.BankId;
        //    $scope.modalInstance.close();
        //}





    })
})


