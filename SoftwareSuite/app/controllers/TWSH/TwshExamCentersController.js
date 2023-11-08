define(['app'], function (app) {
    app.controller("TwshExamCentersController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
        
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.ExamMode = 2;
            $scope.GetExamYearMonth();
            $scope.ExamMonthYear = "";
            $scope.Adddata = false;
            $scope.GetExamCenters();
            $scope.GetTwshDisticts();
            $scope.GetDetails();
        }

        var AcademicYearsActive = TwshStudentRegService.GetTwshAcademicYears();
        AcademicYearsActive.then(function (response) {

            //  $scope.years = response.Table[0];
            $scope.Acayears = response.Table;

        },
            function (error) {
                alert("error while loading Academic Year");
            });


        $scope.getExamMonthYearsData = function (year) {

            //let academicId = $scope.years.AcademicID;

            var EmYears = TwshStudentRegService.GetTwshExamMonthYearbyID(year);
            EmYears.then(function (response) {
                console.log(response)
                try {
                    var Res = JSON.parse(response)
                }
                catch { error }
                $scope.ExamMonthYears = Res.Table;
            },
                function (error) {
                    alert("error while loading semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }


        $scope.GendersList = [
           { Name: "Male", Id: 1 },
           { Name: "Female", Id: 2 },
           { Name: "Both", Id: 3 }
        ];

        $scope.ExamTypes = [
         { Name: "Computer Based Test(CBT)", Id: 1 },
         { Name: "TypeMachine Based Test(TMBT)", Id: 2 }
        ];

        //$scope.addData = function () {

        //    $scope.Adddata = true;
        //}

        $scope.GetDetails = function () {
           
            if ($scope.ExamMode == null || $scope.ExamMode == undefined || $scope.ExamMode == "") {
                alert("Please select Exam Mode.");
                return;
            }
            $scope.loading = true;
            var ApprovalList = TwshStudentRegService.getExamCentersByMode($scope.ExamMode);
            ApprovalList.then(function (response) {
                if (response.length>0){
                    $scope.loading = false;
                    $scope.Data = true;
                $scope.getData = response;
                for (var j = 1; j < response.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
                } else {
                    alert("No Data Found")
                    $scope.loading = false;
                    $scope.Data = false;
                }
            },
        function (error) {
            $scope.Data = false;
            $scope.loading = false;
            alert("error while loading Exam Month Year");
           
        });
        }

        $scope.GetExamCenters = function () {
            var CenterCollegeList = TwshStudentRegService.getTwshExamCenterCollegeList();
            CenterCollegeList.then(function (response) {
                $scope.ExamCenterCollegeList = response.Table;

            }, function (error) {
                alert("error while loading Exam centers.");

            });
        }

        $scope.GetTwshDisticts = function () {
            var getTwshDistictMasterList = TwshStudentRegService.getTwshDistictMasterList();
            getTwshDistictMasterList.then(function (response) {
                $scope.ExamDistrictList = response.Table;

            }, function (error) {
                alert("error while loading Exam Disticts.");

            });
        }



        $scope.Editsemesterdat = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }

        $scope.ActiveValues = [
            { "Id": true, "Value": true },
              { "Id": false, "Value": false }
        ]

        $scope.inputs = [
           { "Id": 1, "Value": "Yes" },
             { "Id": 0, "Value": "No" }
        ]

        $scope.deleteExamcenter = function (id,data) {

            if (confirm("Are you sure you want to delete Exam center " + data.ExaminationCenterCode + "-" + data.ExaminationCenterName +" ?") == true) {
              
                var DeleteTwshExamCenter = TwshStudentRegService.DeleteTwshExamCenter(id);
                DeleteTwshExamCenter.then(function (response) {
                    if (response[0].ResponceCode == '200') {
                        alert(response[0].ResponceDescription)
                        $scope.GetDetails();
                    } else {
                        $scope.GetDetails();
                    }
                },
                    function (error) {
                    });
            }

        }


        $scope.DownloadtoExcel = function () {
            if ($scope.ExamMode == null || $scope.ExamMode == undefined || $scope.ExamMode == "") {
                alert("Please select Exam Mode.");
                return;
            }
            //$scope.loading = true;
            var ApprovalList = TwshStudentRegService.getExamCentersByModeExcel($scope.ExamMode);
            ApprovalList.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode='200') {
                    //$scope.loading = false;
                    $scope.Data = true;
                    window.location.href = response[0].file;
                   
                } else {
                    alert("No Data Found")
                    $scope.loading = false;
                    $scope.Data = false;
                }
            },
        function (error) {
            $scope.Data = false;
            $scope.loading = false;
            alert("error while loading Exam Month Year");

        });
        }

        $scope.Updatesemesterdat = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }


            
            var SetSemester = TwshStudentRegService.SetTwshExamCenters(data.Id, data.ExaminationCenterCode, data.ExaminationCenterName, data.DistrictId, data.IsTw, data.IsSh, data.IsTwOnline, data.IsShOnline, data.GenderId, data.IsActive)
            SetSemester.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].ResponceCode == '200') { 
                    alert(response[0].ResponceDescription);
                    $scope.GetDetails();
                } else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription);
                    $scope.GetDetails();
                }else {
                    alert('Something Went Wrong');
                    $scope.GetDetails();
                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.GetExamYearMonth = function () {
            var data = {};
            $scope.$emit('showLoading', data);
            var ApprovalLists = TwshStudentRegService.GetTwshExamCenters();
            ApprovalLists.then(function (response) {
                $scope.getData = response.Table;
                for (var j = 1; j < response.Table.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
                $scope.$emit('hideLoading', data);
            }, function (error) {
                $scope.$emit('hideLoading', data);
                alert("error while loading Academic Year");

            });
        }

        $scope.Submit = function () {



            if ($scope.College == null || $scope.College == undefined || $scope.College == "") {
                alert("Select College.");
                return;
            }

            var examcenterdetail = JSON.parse($scope.College);
            if ($scope.ExamDistrict == null || $scope.ExamDistrict == undefined || $scope.ExamDistrict == "") {
                alert("Select Exam center district.");
                return;
            }
            if ($scope.Gendersallow == null || $scope.Gendersallow == undefined || $scope.Gendersallow == "") {
                alert("Select Geneders allowed");
                return;
            }
            if ($scope.IsTwOnline == undefined || $scope.IsTwOnline == null) {
                alert("Select IsTwOnline");
                return;
            }
            if ($scope.IsTwOffline == undefined || $scope.IsTwOffline == null) {
                alert("Select IsTwOffline");
                return;
            }
            if ($scope.IsShoffline == undefined || $scope.IsShoffline == null) {
                alert("Select IsShoffline");
                return;
            }
            if ($scope.IsShOnline == undefined || $scope.IsShOnline == null) {
                alert("Select IsShOnline");
                return;
            }

            var SetTwshExamCenter = TwshStudentRegService.SetTwshExamCenter(examcenterdetail.CollegeCode, examcenterdetail.CollegeName, examcenterdetail.Address, $scope.ExamDistrict,$scope.IsTwOffline,$scope.IsShoffline,$scope.IsTwOnline,$scope.IsShOnline, $scope.Gendersallow)
            SetTwshExamCenter.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    $scope.GetDetails();
                } else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription)
                    $scope.GetDetails();
                } else {
                    alert('Something Went Wrong');
                    $scope.GetDetails();
                }
            },
                function (error) {
                    alert("something Went Wrong");


                });
        }
    })
})