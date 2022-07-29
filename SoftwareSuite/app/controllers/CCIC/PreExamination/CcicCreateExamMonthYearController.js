define(['app'], function (app) {
    app.controller("CcicCreateExamMonthYearController", function ($scope,$localStorage, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetCurrentAcademicYearData();
            $scope.GetExamMonthYearData();

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
                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
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


        $scope.Submit = function () {


            if ($scope.AcademicYear == null || $scope.AcademicYear == undefined || $scope.AcademicYear == "") {
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


            var addexammonthyear = CcicPreExaminationService.AddExamMonthYear($scope.AcademicYear, $scope.BaTch, $scope.ExamMonthYear, $scope.UserName);
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
                    alert('ExamMonthYear Added Succesfully')
                    $scope.GetExamMonthYearData($scope.AcademicYearID);
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }




        $scope.GetCurrentAcademicYearData = function () {
            var getacayrs = CcicPreExaminationService.GetCcicAcademicYears()
            getacayrs.then(function (response) {
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

     

        $scope.EditExamMonthYear = function (data, ind) {
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


        $scope.UpdateExamMonthYear = function (data, ind) {

          
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }




            //if (data.ExamMonthYear == null || data.ExamMonthYear == undefined || data.ExamMonthYear == "") {
            //    alert("Enter exam month and year.");
            //    return;
            //}
            //if (data.ExamMonthYearSequence == null || data.ExamMonthYearSequence == undefined || data.ExamMonthYearSequence == "") {
            //    alert("Enter ExamMonthYearSequence.");
            //    return;
            //}
            var UpdateExmMthYr = CcicPreExaminationService.UpdateExamMonthYear($scope.UserName, parseInt(data.ExamMonthYearID), data.ExamMonthYearName, parseInt(data.ExamMonthYearSequence))
            UpdateExmMthYr.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetExamMonthYearData($scope.AcademicYearID);
                    $scope.clearDefaults();
                } else {
                    alert('Exam Month Year Updated Successfully');
                    $scope.GetExamMonthYearData($scope.AcademicYearID);
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


            $scope.clearDefaults = function () {

                $scope.AcademicYear = null;
                $scope.BaTch = null;
                $scope.ExamMonthYear = null;

            }



        })
})