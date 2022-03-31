define(['app'], function (app) {
    app.controller("CcicAcademicYearSettingsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, CcicSettingsService, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        //console.log(authData)
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetData();
            $scope.getCcicCourseDurationBatches();
          
         
        }


        $scope.Add_AcademicYear = function () {
            $scope.AcademicStartYear = '';
            $scope.AcademicYear = '';
            $scope.AcademicYearStartDate = '';
            $scope.AcademicYearEndDate = '';
        }
        $scope.Add_Batches = function () {
            $scope.academicyear = '';
            $scope.CourseDuration = '';
            $scope.Batch = '';
            $scope.AYBatchStartDate = '';
            $scope.AYBatchEndDate = '';
            
        }
        $scope.disabletable = function () {
            var ele = document.getElementsByClassName("tableinpt");
           

        }


        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });

        var getCcicCourseDurations = CcicPreExaminationService.GetCcicCourseDurations();
        getCcicCourseDurations.then(function (response) {

            $scope.GetCcicCourseDurations = response;

        },
            function (error) {
                alert("error while loading CourseDurations");
                var err = JSON.parse(error);

            });



        $scope.getCcicCourseDurationBatches = function (CourseDuration) {

            if (CourseDuration == null || CourseDuration == undefined || CourseDuration == "") {
                return
            }
            var GetCcicCourseDurationBatches = CcicPreExaminationService.GetCcicCourseDurationBatches(CourseDuration);
            GetCcicCourseDurationBatches.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetCcicCourseDurationBatchesTable = res.Table;
                }
                else {
                    $scope.GetCcicCourseDurationBatchesTable = [];
                }

                $scope.CourseDurationBatches = res;
              

            },
                function (error) {
                    alert("error while loading CourseDurationBatches");
                    var err = JSON.parse(error);

                });
        }

        $scope.UpdateAcaYear = function (StartYear) {
            var tempyr = (parseInt(StartYear) + 1).toString();
            var yr = StartYear + '-' + tempyr.substring(2, 4);
            $scope.AcademicYear = yr;
        }





        $scope.GetData = function () {
            var GetCcicAcademicYears = CcicPreExaminationService.GetCcicAcademicYears()
            GetCcicAcademicYears.then(function (response) {
                $scope.GetCcicAcademicYears = response.Table;

                for (let i = 0; i < $scope.GetCcicAcademicYears.length; i++) {
                    if ($scope.GetCcicAcademicYears[i].GetCcicAcademicYears == true) {
                        $scope.finalList.push($scope.GetCcicAcademicYears[i]);
                    }
                }

                //  var ele = document.getElementsByClassName("tableinpt");
                for (var j = 1; j < response.Table.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }

        $scope.EditAcademicYear = function (data, ind) {
            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }


        $scope.UpdateAcademicYear = function (dat, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }



            var srtdate = dat.AcademicYearStartDate == undefined || dat.AcademicYearStartDate == null || dat.AcademicYearStartDate == "" ? " " : moment(dat.AcademicYearStartDate).format("YYYY-MM-DD");
            var enddate = dat.AcademicYearEndDate == undefined || dat.AcademicYearEndDate == null || dat.AcademicYearEndDate == "" ? " " : moment(dat.AcademicYearEndDate).format("YYYY-MM-DD");
            var updateacademicyear = CcicPreExaminationService.UpdateAcademicYear(parseInt(dat.AcademicYearID), srtdate, enddate, dat.CurrentAcademicYear, $scope.UserName);
            updateacademicyear.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }


                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.GetData();
                    $scope.clearDefaults();
                } else {
                    alert('Updated Successfully')
                }
                $scope.GetData();
                $scope.clearDefaults();
            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }
        Array.prototype.remByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i].ElectiveSet === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        $scope.changeActive = function (data, Active, index) {
            for (let i = 0; i < $scope.finalList.length; i++) {
                if ($scope.finalList[i].CurrentAcademicYear == data.CurrentAcademicYear) {
                    $scope.finalList.remByVal(data.CurrentAcademicYear);
                    break;
                }
            }
            $scope.finalList.push(data);

            for (let i = 0; i < $scope.GetCcicAcademicYears.length; i++) {
                if ($scope.GetCcicAcademicYears[i].CurrentAcademicYear == data.CurrentAcademicYear) {
                    if (i != index) {
                        $scope.GetCcicAcademicYears[i].CurrentAcademicYear = false;
                    }
                }
            }
            console.log($scope.finalList);
        }


        $scope.clearDefaults = function () {
            $scope.AcademicStartYear = '';
            $scope.AcademicYear = '';
            $scope.CurrentAcademicYear = '';
            $scope.AcademicYearStartDate = '';
            $scope.AcademicYearEndDate = '';


            $scope.CourseDuration = '';
            $scope.Batch = '';
            $scope.AYBatchStartDate = '';
            $scope.AYBatchEndDate = '';



        }

        $scope.AddAcademicYear = function () {


            if ($scope.AcademicStartYear == null || $scope.AcademicStartYear == undefined || $scope.AcademicStartYear == "") {
                alert("Select Start of Academic Year");
                return;
            }
            if ($scope.AcademicYearStartDate == null || $scope.AcademicYearStartDate == undefined || $scope.AcademicYearStartDate == "") {
                alert("Select Start Date");
                return;
            }
            if ($scope.AcademicYearEndDate == null || $scope.AcademicYearEndDate == undefined || $scope.AcademicYearEndDate == "") {
                alert("Select End Date");
                return;
            }
            if ($scope.CurrentAcademicYear == null || $scope.CurrentAcademicYear == undefined || $scope.CurrentAcademicYear == "") {
                alert("Select Current AcademicYear");
                return;
            }

            var CurrentAca = $scope.CurrentAcademicYear == "0" ? false : true;



            var SetAcademicYear = CcicPreExaminationService.AddAcademicYear($scope.AcademicStartYear, $scope.AcademicYear, moment($scope.AcademicYearStartDate).format("YYYY-MM-DD"), moment($scope.AcademicYearEndDate).format("YYYY-MM-DD"), CurrentAca, $scope.UserName);
            SetAcademicYear.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.GetData();
                    $scope.clearDefaults();
                } else {
                    alert('AcademicYear Added Succesfully')
                    $scope.GetData();
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }



        $scope.GetBatchData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }
            $scope.AcademicYearID = AcademicYearID;

         
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetCcicAcademicYearBatch(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }
 
                if (res.length > 0) {
                    $scope.GetCcicAcademicYearBatchTable = res;
                }
                else {
                    $scope.GetCcicAcademicYearBatchTable = [];
                }
                            
            },
                 function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });
            Array.prototype.remByVal = function (val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].ElectiveSet === val) {
                        this.splice(i, 1);
                        break;
                    }
                }
                return this;
            }
        }


        $scope.ModifyStatus = function (data, ind) {
            if ($scope.AcademicYear == null || $scope.AcademicYear == undefined || $scope.AcademicYear == "") {
                alert("Please Select AcademicYear to use the Operation");
                return
            }
            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }


        $scope.UpdateStatus = function (dat, ind) {
          

            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }

            var srtdate = dat.AYBatchStartDate == undefined || dat.AYBatchStartDate == null || dat.AYBatchStartDate == "" ? " " : moment(dat.AYBatchStartDate).format("YYYY-MM-DD");
            var enddate = dat.AYBatchEndDate == undefined || dat.AYBatchEndDate == null || dat.AYBatchEndDate == "" ? " " : moment(dat.AYBatchEndDate).format("YYYY-MM-DD");
            var updateacademicyearbatch = CcicPreExaminationService.UpdateAcademicYearBatch(2, $scope.UserName, parseInt(dat.AcademicYearBatchID), true, srtdate, enddate);
            updateacademicyearbatch.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponceCode == '400') {
                    alert(res[0].ResponceDescription)
                    $scope.GetBatchData();
                    $scope.clearDefaults();
                } else {
                    alert('Academic Year Batch Updated Successfully')
                    $scope.GetBatchData();
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


       
            

            $scope.SetAcademicYearBatchStatus = function (AcademicYearBatchID, Active) {
                if ($scope.AcademicYear == null || $scope.AcademicYear == undefined || $scope.AcademicYear == "") {
                    alert("Please Select AcademicYear to use the Operation");
                    return
                }

                var SetStatus = CcicPreExaminationService.SetAcademicYearBatchStatus(1, $scope.UserName, AcademicYearBatchID,Active);
                SetStatus.then(function (res) {
                    if (res[0].ResponceCode == '400') {
                        alert(res[0].ResponceDescription)
                        $scope.clearDefaults();
                    } else {
                        alert('Academic Year Batch Status Updated Successfully')
                        $scope.GetBatchData($scope.AcademicYearID);
                        $scope.clearDefaults();
                    }

                },
                    function (error) {

                        var err = JSON.parse(error);
                    })

        }

        $scope.AddAcademicYearBatch = function () {

            if ($scope.Batch == null || $scope.Batch == undefined || $scope.Batch == "") {
                alert("Select Batch");
                return;
            }

            if ($scope.AYBatchStartDate == null || $scope.AYBatchStartDate == undefined || $scope.AYBatchStartDate == "") {
                alert("Select Start Date");
                return;
            }
            if ($scope.AYBatchStartDate == null || $scope.AYBatchStartDate == undefined || $scope.AYBatchStartDate == "") {
                alert("Select End Date");
                return;
            }


            var SetAcademicYearBatch = CcicPreExaminationService.AddAcademicYearBatch($scope.academicyear, $scope.CourseDuration, $scope.Batch, moment($scope.AYBatchStartDate).format("YYYY-MM-DD"), moment($scope.AYBatchEndDate).format("YYYY-MM-DD"), $scope.UserName);
            SetAcademicYearBatch.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.GetBatchData();
                    $scope.clearDefaults();
                } else {
                    alert('Academic Year Batch Added Successfully')
                    $scope.GetBatchData();
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })
        };

    })
})