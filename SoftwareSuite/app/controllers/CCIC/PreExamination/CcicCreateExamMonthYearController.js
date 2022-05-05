define(['app'], function (app) {
    app.controller("CcicCreateExamMonthYearController", function ($scope, $http, $localStorage, $state, AppSettings, CcicPreExaminationService, $timeout) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetExamMonthYearData();
           
        }

  
        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });


        $scope.clearDefaults = function () {

            $scope.academicYear = null;
            $scope.BaTch = null;
            $scope.ExamMonthYear = null;
        }



        $scope.Submit = function () {


            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
                alert("Select Academic Year");
                return;
            }
            if ($scope.BaTch == null || $scope.BaTch == undefined || $scope.BaTch == "") {
                alert("Select Batch");
                return;
            }
            if ($scope.ExamMonthYear == null || $scope.ExamMonthYear == undefined || $scope.ExamMonthYear == "") {
                alert("Please Enter ExamMonthYear ");
                return;
            }
           

            var addexammonthyear = CcicPreExaminationService.AddExamMonthYear($scope.academicYear, $scope.BaTch, $scope.ExamMonthYear, $scope.UserName);
            addexammonthyear.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.GetExamMonthYearData($scope.AcademicYearID);
                    $scope.clearDefaults();
                } else {
                    alert('AcademicYear Added Succesfully')
                    $scope.GetExamMonthYearData($scope.AcademicYearID);
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }



        $scope.GetExamMonthYearData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            $scope.AcademicYearID = AcademicYearID;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYearTable = res.Table;
                }
                else {
                    $scope.GetExamMonthYearTable = [];
                }

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });



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


        }


        $scope.ChangeStatus = function (data, ind) {
            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
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


        $scope.UpdationStatus = function (dat, ind, ExamMonthYearName) {


            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }

         
            var updateexammonthyr = CcicPreExaminationService.UpdateExamMonthYear(2, $scope.UserName, parseInt(dat.ExamMonthYearID), true, ExamMonthYearName);
            updateexammonthyr.then(function (response) {

             
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.GetExamMonthYearData($scope.AcademicYearID);
                    $scope.clearDefaults();
                } else {
                    alert('ExamMonthYear Updated Successfully')
                    $scope.GetExamMonthYearData($scope.AcademicYearID);
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.SetExamMonthYearStatus = function (ExamMonthYearID, Active) {


            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
                alert("Please Select AcademicYear to use the Operation");
                return
            }

       

            var SetStatus = CcicPreExaminationService.SetExamMonthYearStatus(1, $scope.UserName, ExamMonthYearID, Active);
            SetStatus.then(function (response) {
             
           
                if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponseDescription)
                    $scope.GetExamMonthYearData($scope.AcademicYearID);
                    $scope.clearDefaults();
                }
                else {
                    alert('Exam Month Year Status Updated Successfully');
                    $scope.GetExamMonthYearData($scope.AcademicYearID);
                    $scope.clearDefaults();
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })


        }
        
    })
})