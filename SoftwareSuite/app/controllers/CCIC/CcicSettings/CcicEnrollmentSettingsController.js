define(['app'], function (app) {
    app.controller("CcicEnrollmentSettingsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, CcicSettingsService, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        //console.log(authData)
        const $ctrl = this;
        $ctrl.$onInit = () => {
           
            $scope.GetCcicCourseDurations();

            /* $scope.CcicCourseDurationBatches();*/
            //  $scope.disabletable();
        }

        $scope.disabletable = function () {
            var ele = document.getElementsByClassName("tableinpt");
            //ele.style.width = "100%";
            //ele.style['box-shadow'] = "none";
            //ele.style['pointer-events'] = "none";
            //ele.style.cursor = "pointer";


        }


        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });

        $scope.GetCcicCourseDurations = function (Batch) {

            if (Batch == null || Batch == undefined || Batch == "") {
                return
            }
            var GetCcicCourseDurationBatches = CcicPreExaminationService.GetCcicCourseDurations(Batch);
            GetCcicCourseDurationBatches.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetCcicCourseDurationsTable = res.Table;
                }
                else {
                    $scope.GetCcicCourseDurationsTable = [];
                }

                $scope.CourseDurations = res;


            },
                function (error) {
                    alert("error while loading CourseDuration");
                    var err = JSON.parse(error);

                });
        }



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

      
        $scope.AddEnrollmentDates = function () {

            if ($scope.BaTch == null || $scope.BaTch == undefined || $scope.BaTch == "") {
                alert("Select Batch");
                return;
            }

            if ($scope.courseduration == null || $scope.courseduration == undefined || $scope.courseduration == "") {
                alert("Select Batch");
                return;
            }

            if ($scope.EnrollementStartDate == null || $scope.EnrollementStartDate == undefined || $scope.EnrollementStartDate == "") {
                alert("Select Start Date");
                return;
            }
            if ($scope.EnrollementEndDate == null || $scope.EnrollementEndDate == undefined || $scope.EnrollementEndDate == "") {
                alert("Select End Date");
                return;
            }


            var SetEnrollmentDates = CcicPreExaminationService.AddEnrollmentDates($scope.AcademicYear, $scope.courseduration, $scope.BaTch, moment($scope.EnrollementStartDate).format("YYYY-MM-DD"), moment($scope.EnrollementEndDate).format("YYYY-MM-DD"), $scope.UserName);
            SetEnrollmentDates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.GetEnrollmentData();
                    $scope.clearDefaults();

                } else {
                    alert('Academic Year Batch Added Successfully')
                    $scope.GetEnrollmentData();
                    $scope.clearDefaults();
                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })
        };
   



        $scope.GetEnrollmentData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            $scope.AcademicYearID = AcademicYearID;

            var GetCurrentBatchData = CcicPreExaminationService.GetCurrentBatch(AcademicYearID);
            GetCurrentBatchData.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetCurrentBatch = res.Table;
                }
                else {
                    $scope.GetCurrentBatch = [];
                }


            },

                function (error) {
                    alert("error while loading CurrentBatch");
                    var err = JSON.parse(error);

                });


            $scope.getCcicCourseDurations = function (BaTch) {

                if (BaTch == null || BaTch == undefined || BaTch == "") {
                    return
                }
                $scope.BaTch = BaTch;
                var getCcicCourseDurations = CcicPreExaminationService.GetCcicCourseDurations(BaTch);
                getCcicCourseDurations.then(function (response) {

                    try {
                        var res = JSON.parse(response);
                    }
                    catch (err) { }

                    if (res.Table.length > 0) {
                        $scope.GetCcicCourseDurationsData = res.Table;
                    }
                    else {
                        $scope.GetCcicCourseDurationsData = [];
                    }


                },

                    function (error) {
                        alert("error while loading CourseDuration");
                        var err = JSON.parse(error);

                    });
            }


            var getCcicEnrollmentDates = CcicPreExaminationService.GetEnrollmentDates(AcademicYearID)
            getCcicEnrollmentDates.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetEnrollmentDatesTable = res;
                }
                else {
                    $scope.GetEnrollmentDatesTable = [];
                }



                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
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

            var srtdate = dat.EnrollementStartDate == undefined || dat.EnrollementStartDate == null || dat.EnrollementStartDate == "" ? " " : moment(dat.EnrollementStartDate).format("YYYY-MM-DD");
            var enddate = dat.EnrollementEndDate == undefined || dat.EnrollementEndDate == null || dat.EnrollementEndDate == "" ? " " : moment(dat.EnrollementEndDate).format("YYYY-MM-DD");
            var updateenrollmentdates = CcicPreExaminationService.UpdateEnrollmentDates(2, $scope.UserName, parseInt(dat.EnrollementDatesID), true, srtdate, enddate);
            updateenrollmentdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponceCode == '400') {
                    alert(res[0].ResponceDescription)
                    $scope.GetEnrollmentData();
                    $scope.clearDefaults();
                } else {
                    alert('Enrollment Dates Updated Successfully')
                    $scope.GetEnrollmentData();
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.clearDefaults = function () {

            $scope.AcademicYear = '';
            $scope.courseduration = '';
            $scope.BaTch = '';
            $scope.EnrollementStartDate = '';
            $scope.EnrollementEndDate = '';



        }




        $scope.SetEnrollmentDatesStatus = function (EnrollementDatesID, Active) {
            if ($scope.AcademicYear == null || $scope.AcademicYear == undefined || $scope.AcademicYear == "") {
                alert("Please Select AcademicYear to use the Operation");
                return
            }

            var SetStatus = CcicPreExaminationService.SetEnrollmentDatesStatus(1, $scope.UserName, EnrollementDatesID, Active);
            SetStatus.then(function (res) {
                if (res[0].ResponceCode == '400') {
                    alert(res[0].ResponceDescription)
                   
                    $scope.clearDefaults();
                } else {
                    alert('Enrollment Dates Status Updated Successfully')
                    $scope.GetEnrollmentData($scope.AcademicYearID);
                   
                    $scope.clearDefaults();
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
           

        }
    })
})