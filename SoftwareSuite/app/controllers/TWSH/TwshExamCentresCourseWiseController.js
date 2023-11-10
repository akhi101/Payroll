define(['app'], function (app) {
    app.controller("TwshExamCentresCourseWiseController", function ($scope, $localStorage, $uibModal, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;
        $scope.UserTypeID = authData.SystemUserTypeId;

        var tmpdata = $localStorage.TempData;
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getExamCentresCoursewise();
            //$scope.GetExamCenters();
        }

       

        
        $scope.getExamCentresCoursewise = function () {
            $scope.loading = true;
            var getcentres = TwshStudentRegService.getExamCentresCoursewise(1, tmpdata.ExamCentreID, tmpdata.AcademicYearID, tmpdata.ExamMonthYearID);
            getcentres.then(function (response) {
                try {
                    var Res = JSON.parse(response)
                }
                catch { }
                if (Res.Table.length > 1 && Res.Table[0].ResponseCode == undefined) {
                    $scope.loading = false;
                    $scope.Data = true;
                    $scope.getData = Res.Table;
                }
                else if (Res.Table.length > 0 && Res.Table[0].ResponseCode == '400') {
                    alert("No Data Found")
                    $scope.loading = false;
                    $scope.confirmGetOldExamCentreData();
                }
            },
                function (error) {
                    $scope.Data = false;
                    $scope.loading = false;
                    alert("error while loading Exam Centers");

                });
        }


        $scope.confirmGetOldExamCentreData = function () {
            var getcentres = TwshStudentRegService.getExamCentresCoursewise(2, tmpdata.ExamCentreID, tmpdata.AcademicYearID, tmpdata.ExamMonthYearID);
            getcentres.then(function (response) {
                try {
                    var Res = JSON.parse(response)
                }
                catch { }
                if (Res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.getData = Res.Table;
                }
                else {
                    alert("No Data Found")
                    $scope.loading = false;
                }
            },
                function (error) {
                    $scope.Data = false;
                    $scope.loading = false;
                    alert("error while loading Exam Centers");

                });
        }

       

        

        $scope.EditCentres = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
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

        $scope.deleteExamcenter = function (id, data) {

            if (confirm("Are you sure you want to delete Exam center " + data.ExaminationCenterCode + "-" + data.ExaminationCenterName + " ?") == true) {

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
                if (response[0].ResponceCode = '200') {
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

        $scope.UpdateDetails = function (ind,data) {

            $scope.viewField = false;
            $scope.modifyField = false;
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }
            var Setexamcentres = TwshStudentRegService.UpdateTwshExamCentres(2, data.Id, data.AcademicID, data.ExamMonthYearID, data.ExaminationCenterCode, data.ExaminationCenterName, data.DistrictId, data.GenderId, data.CBT, data.MBT, data.SHORTHAND, data.ExaminationCenterAddress, data.IsActive, data.InsertedBy)
            Setexamcentres.then(function (response) {
                try {
                    var response = JSON.parse(response)
                }
                catch (err) { }
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription);
                    $scope.getExamCentres(data.ExamMonthYearID);
                    $scope.modalInstance.close();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription);
                    $scope.getExamCentres(data.ExamMonthYearID);
                    $scope.modalInstance.close();
                } else {
                    alert('Something Went Wrong');
                    $scope.getExamCentres();
                }
            },
                function (error) {
                    alert("something Went Wrong")


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
            if ($scope.CBT == undefined || $scope.CBT == '') {
                alert("Select CBT");
                return;
            }
            if ($scope.MBT == undefined || $scope.MBT == '') {
                alert("Select MBT");
                return;
            }
            if ($scope.ShortHand == undefined || $scope.ShortHand == '') {
                alert("Select ShortHand");
                return;
            }


            var SetTwshExamCenter = TwshStudentRegService.SetTwshExamCentres(1, 0, $scope.year, $scope.ExamMonthYear, examcenterdetail.CollegeCode, examcenterdetail.CollegeName, $scope.ExamDistrict, $scope.Gendersallow, $scope.CBT, $scope.MBT, $scope.ShortHand, examcenterdetail.Address, 1, $scope.UserName)
            SetTwshExamCenter.then(function (response) {
                try {
                    var response = JSON.parse(response)
                }
                catch (err) { }
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getExamCentres(data.ExamMonthYearID);
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getExamCentres(data.ExamMonthYearID);
                } else {
                    alert('Something Went Wrong');
                    $scope.getExamCentres(data.ExamMonthYearID);
                }
            },
                function (error) {
                    alert("something Went Wrong");


                });
        }
    })
})