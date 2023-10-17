define(['app'], function (app) {
    app.controller("ViewStdDetailsVerController", function ($scope, $uibModal, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        var tempData3 = $localStorage.TempData3;
        var tempData2 = $localStorage.TempData2;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmp = $localStorage.TempData;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.ViewStudentDetails();
            //$scope.GetVerificationReportData();
            $scope.ShowStudentDetails = false;
            $scope.DataTable = true;

            $scope.Clear = false;
        }
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }


        $scope.loading = true;
       

        if ($scope.UserTypeID == 1 || $scope.UserTypeID == 5 || $scope.UserTypeID == 6 ||
            $scope.UserTypeID == 7 || $scope.UserTypeID == 8 || $scope.UserTypeID == 9 || $scope.UserTypeID == 10) {
            $scope.Pen = true;
            $scope.RecommendButton = true;
            $scope.ApproveButton = false;
        }
        else if ($scope.UserTypeID == 4) {
            $scope.ApproveButton = true;
            $scope.RecommendButton = false;

        }





        $scope.Close = function () {
            $state.go('CcicDashboard.Academic.VerificationReport')
        }


        $scope.ViewStudentDetails = function () {
            //$scope.loading = true;
            $scope.DataTable = false;
            var ViewStudentDetail = CcicPreExaminationService.GetViewStudentDetails(tempData3.ApplicationNumber, tempData3.StudentID);
            ViewStudentDetail.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.ShowStudentDetails = true;
                $scope.DataTable = false;
                $scope.PreviewData = [];
                if (res.length >= 0) {
                    $scope.loading = false;
                    $scope.PreviewData = res[0];
                    $scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false;
                    $scope.PreviewData = [];
                    $scope.$emit('hideLoading', data);
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });



            $scope.Approve = function () {
                $scope.ApproveData = $scope.PreviewData;
                console.log($scope.ApproveData);
                $scope.modalInstance1 = $uibModal.open({
                    templateUrl: "/app/views/CCIC/CcicApprovedPopup.html",
                    size: 'lg',
                    scope: $scope,
                    windowClass: 'modal-fit',
                    backdrop: 'static',
                    keyboard: false
                });

                $scope.closeModal1 = function () {
                    $scope.modalInstance1.close();
                };
            }


            $scope.Revise = function () {
                $scope.ReviseData = $scope.PreviewData;
                $scope.modalInstance2 = $uibModal.open({
                    templateUrl: "/app/views/CCIC/CcicRevisedPopup.html",
                    size: 'lg',
                    scope: $scope,
                    windowClass: 'modal-fit',
                    backdrop: 'static',
                    keyboard: false
                });
                $scope.closeModal2 = function () {
                    $scope.modalInstance2.close();
                };
            }

            $scope.Reject = function () {
                $scope.RejectData = $scope.PreviewData;
                $scope.modalInstance3 = $uibModal.open({
                    templateUrl: "/app/views/CCIC/CcicRejectedPopup.html",
                    size: 'lg',
                    scope: $scope,
                    windowClass: 'modal-fit',
                    backdrop: 'static',
                    keyboard: false
                });
                $scope.closeModal3 = function () {
                    $scope.modalInstance3.close();
                };
            }

            $scope.Recommend = function () {
                $scope.ApproveData = $scope.PreviewData;
                console.log($scope.ApproveData);
                $scope.modalInstance1 = $uibModal.open({
                    templateUrl: "/app/views/CCIC/CcicApprovedPopup.html",
                    size: 'lg',
                    scope: $scope,
                    windowClass: 'modal-fit',
                    backdrop: 'static',
                    keyboard: false
                });

                $scope.closeModal1 = function () {
                    $scope.modalInstance1.close();
                };
            }


            $scope.Approved = function () {

                var setapprovestatus = CcicPreExaminationService.SetApplicationApprovalStatus(tempData3.StudentID, $scope.UserTypeID,  'Approved');
                setapprovestatus.then(function (response) {
                    $scope.loading = false;
                    if (response[0].ResponseCode == '500') {
                        alert(response[0].ResponseDescription);
                        $scope.ViewStudentDetails();
                        
                    } else {
                        $scope.loading = false;
                        alert('Application Approval Status Updated');
                        $scope.GetInstitutionVerReportData();

                    }

                },
                    function (error) {

                        var err = JSON.parse(error);
                    })

            }

            $scope.Revised = function () {

                var setapprovestatus = CcicPreExaminationService.SetApplicationApprovalStatus(tempData3.StudentID, $scope.UserTypeID, 'Revised');
                setapprovestatus.then(function (response) {
                    $scope.loading = false;
                    if (response[0].ResponseCode == '500') {
                        alert(response[0].ResponseDescription);
                        $scope.ViewStudentDetails();

                    } else {
                        $scope.loading = false;
                        alert('Application Approval Status Updated');
                        $scope.GetInstitutionVerReportData();
                        //$scope.ViewStudentDetails();

                    }

                },
                    function (error) {

                        var err = JSON.parse(error);
                    })

            }


            $scope.Recommended = function () {

                var setrecommendstatus = CcicPreExaminationService.SetApplicationApprovalStatus(tempData3.StudentID, $scope.UserTypeID, 'Recommended');
                setrecommendstatus.then(function (response) {
                    $scope.loading = false;
                    if (response[0].ResponseCode == '500') {
                        alert(response[0].ResponseDescription);
                        $scope.ViewStudentDetails();

                    } else {
                        $scope.loading = false;
                        alert('Application Recommended Status Updated');
                        $scope.GetInstitutionVerReportData();
                        //$scope.ViewStudentDetails();

                    }

                },
                    function (error) {

                        var err = JSON.parse(error);
                    })

            }
            $scope.GetInstitutionVerReportData = function () {
                var verificationreportData = CcicPreExaminationService.GetInstitutionVerificationReportData(tmp.InstitutionID, tempData2.CourseID, 5);
                verificationreportData.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    }
                    catch (err) { }
                    $scope.VerificationReportDataTable = [];
                    if (res.length >= 0) {
                        $scope.loading = false;
                        $state.go('CcicDashboard.Academic.CcicAdmVerificationCourses');
                        $scope.VerificationReportDataTable = res;
                        $scope.$emit('hideLoading', data);


                    } else {
                        $scope.loading = false;
                        $scope.VerificationReportDataTable = [];
                        $scope.$emit('hideLoading', data);

                    }
                },
                    function (error) {
                        //   alert("error while loading Notification");
                        var err = JSON.parse(error);
                    });
            }

            $scope.Rejected = function () {

                var setapprovestatus = CcicPreExaminationService.SetApplicationApprovalStatus(tempData3.StudentID, $scope.UserTypeID, 'Rejected');
                setapprovestatus.then(function (response) {
                    $scope.loading = false;
                    if (response[0].ResponseCode == '500') {
                        alert(response[0].ResponseDescription);
                        $scope.ViewStudentDetails();

                    } else {
                        $scope.loading = false;
                        alert('Application Approval Status Updated');
                        $scope.GetInstitutionVerReportData();

                    }

                },
                    function (error) {

                        var err = JSON.parse(error);
                    })

            }


        }




    });
});















