define(['app'], function (app) {
    app.controller("ViewAuthorizationDetailsController", function ($scope, $http, $timeout, $localStorage, $uibModal, $state, $stateParams, AppSettings, TwshStudentRegService) {
        var authData = $localStorage.Twsh;
        $scope.userId = authData.UserId;
        $scope.loading = true;
        var date = new Date();
        date.setHours('11');
        date.setMinutes('00');
        $scope.examtime = moment(date).format("HH:mm");
        var ApplicationDetails = $localStorage.ApplicationDetails;
        $scope.Id = ApplicationDetails.Id
        $scope.ApplicationNumber = ApplicationDetails.ApplicationNumber
        $scope.Name = ApplicationDetails.Name
        $scope.Gender = ApplicationDetails.Gender
        $scope.PhoneNumber = ApplicationDetails.PhoneNumber
        var GetApprovedDetails = TwshStudentRegService.getNeedApproveDetails($scope.Id);
        GetApprovedDetails.then(function (response) {
            $scope.loading = false;
            $scope.getData = true;
            $scope.ExamMode = response[0].ExamMode;
            $scope.ApproveDetails = response.Table;
            $scope.uploadPhoto = response[0].Photo;
            $scope.imagesrc = response[0].File1;
            $scope.imagesrc2 = response[0].File2;
            $scope.IsEligible = response[0].IsEligible;
            $scope.isrejected = response[0].isrejected;
            $scope.RejectedRemarks = response[0].RejectedRemarks;
            $scope.SelectedOnlineExamDate = response[0].SelectedOnlineExamDate;
            if ($scope.ExamMode == 1) {
                $scope.avaexamdates = JSON.parse(response[0].OnlineExamDate)
            }
            $scope.def = { exam: "" }
        },
            function (error) {
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.StatusMessage = "No Data Found";
                $timeout(function () {
                    $scope.showStatus = false;

                }, 5000);
                $scope.loading = false;
                $scope.getData = false;

            });


        $scope.selRadio = function () {
            $scope.SelectDateofExam = date;
        }

        $scope.openImage = function (imagesrc) {
            $scope.img = imagesrc;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "app/views/TWSH/ViewDocument.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',

            });

        }

        $scope.cancel = function () {
            $state.go('TWSH.Authorization')
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };



        $scope.Reject = function (ApproveStatus) {
            $scope.remarks = '';
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/Controllers/PostExam/RejectPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
        }


        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }


        $scope.Submit = function (remarks) {
          
            var RejectDetails = TwshStudentRegService.RejectSubmitDetails(2, $scope.Id, 0, remarks);
            RejectDetails.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch {}
                if (Res.Table[0].ResponceCode == '200') {
                    $scope.loading = false;
                    alert(Res.Table[0].ResponceDescription);
                  
                    $state.go('TWSH.ViewAuthorization')
                    $scope.modalInstance.close();
                } else if (Res.Table[0].ResponceCode == '400') {
                    $scope.loading = false;
                    alert(Res.Table[0].ResponceDescription);
                    $scope.modalInstance.close();

                } else {
                    $scope.loading = false;
                    alert("No Data Found");

                }

            }, function (err) {
                $scope.loading = false;
                alert("Error while loading");
            });

           
               


        }

        $scope.ApproveButton = function () {
            if ($scope.ExamMode == 2) {

                $scope.def.exam = "";
                $scope.examtime = "";
                var examdate = "";

            } else if ($scope.ExamMode == 1) {

                if (angular.isUndefined($scope.def.exam) || $scope.def.exam == "") {
                    $scope.showStatus = true;
                    $scope.statusclass = 'alert-danger';
                    $scope.StatusMessage = "Select Online Examination Date.";
                    $timeout(function () {
                        $scope.showStatus = false;

                    }, 5000);
                    return;
                }
                if ($scope.examtime == '11:00') {
                    var examdate = $scope.def.exam + " " + $scope.examtime;
                } else {
                    var examdate = $scope.def.exam + " " + moment($scope.examtime).format("HH:mm");
                }

            }

            var ApproveDetails = TwshStudentRegService.approveDetails(1, $scope.Id, examdate, '');
            ApproveDetails.then(function (response) {


                window.scroll({
                    top: 50, // could be negative value
                    left: 0,
                    behavior: 'smooth'
                });
                $scope.showStatus = true;
                $scope.statusclass = 'alert-success';
                $scope.StatusMessage = "Application Verified Successfully";
                $timeout(function () {
                    $scope.showStatus = true;
                    $state.go('TWSH.Authorization')
                }, 5000);
                //alert(response[0].Responce)
            },
                function (error) {
                    $scope.showStatus = true;
                    $scope.statusclass = 'alert-danger';
                    $scope.StatusMessage = "Server error";
                    $timeout(function () {
                        $scope.showStatus = true;
                        $state.go('TWSH.Authorization')
                    }, 5000);

                });
        }



        //$scope.Approve = function (ApproveStatus) {
        //    $scope.remarks = '';
        //    $scope.modalInstance = $uibModal.open({
        //        templateUrl: "/app/Controllers/PostExam/RejectPopup.html",
        //        size: 'xlg',
        //        scope: $scope,
        //        windowClass: 'modal-fit-att',
        //    });
        //}


        //$scope.closeModal = function () {
        //    $scope.modalInstance.close();
        //}


        $scope.ApproveSubmit = function () {
            if ($scope.ExamMode == 2) {

                $scope.def.exam = "";
                $scope.examtime = "";
                var examdate = "";

            } else if ($scope.ExamMode == 1) {

                if (angular.isUndefined($scope.def.exam) || $scope.def.exam == "") {
                    $scope.showStatus = true;
                    $scope.statusclass = 'alert-danger';
                    $scope.StatusMessage = "Select Online Examination Date.";
                    $timeout(function () {
                        $scope.showStatus = false;

                    }, 5000);
                    return;
                }
                if ($scope.examtime == '11:00') {
                    var examdate = $scope.def.exam + " " + $scope.examtime;
                } else {
                    var examdate = $scope.def.exam + " " + moment($scope.examtime).format("HH:mm");
                }
            }
            var ApproveDetails = TwshStudentRegService.ApproveSubmitDetails(1, $scope.Id,examdate, 0);
            ApproveDetails.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch { }
                if (Res.Table[0].ResponceCode == '200') {
                    $scope.loading = false;
                    alert(Res.Table[0].ResponceDescription);
                    $state.go('TWSH.ViewAuthorization')
                    $scope.modalInstance.close();       
                } else if (Res.Table[0].ResponceCode == '400') {
                    $scope.loading = false;
                    alert(Res.Table[0].ResponceDescription);
                    $scope.modalInstance.close();

                } else {
                    $scope.loading = false;
                    alert("No Data Found");
                }

            }, function (err) {
                $scope.loading = false;
                alert("Error while loading");
            });






        //}

    })
})