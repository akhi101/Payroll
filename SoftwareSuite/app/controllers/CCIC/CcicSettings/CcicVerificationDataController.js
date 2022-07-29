define(['app'], function (app) {
    app.controller("CcicVerificationDataController", function ($scope, $uibModal, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        var tempData2 = $localStorage.TempData2;
        var tmp = $localStorage.TempData;
        $scope.UserName = authData.UserName;

        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.GetVerificationReportData();
            $scope.ShowStudentDetails = false;
            $scope.DataTable = true;
            $scope.LoadImg = false;
            $scope.Clear = false;
        }

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }

        if ($scope.UserType == 1) {
            $scope.GetVerificationReportData = function (InstitutionID) {

                var verifyreportData = CcicPreExaminationService.GetInstitutionVerificationReportData(InstitutionID, tempData2.CourseID, tempData2.ReportTypeID);
                verifyreportData.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    }
                    catch (err) { }
                    $scope.VerificationReportDataTable = [];
                    if (res.length >= 0) {

                        $scope.VerificationReportDataTable = res;

                    } else {

                        $scope.VerificationReportDataTable = [];
                    }
                },
                    function (error) {
                        //   alert("error while loading Notification");
                        var err = JSON.parse(error);
                    });
            }


        }
        else {
            var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID
            $scope.GetVerificationReportData = function () {

                var verifyreportData = CcicPreExaminationService.GetInstitutionVerificationReportData(InstitutionID, tempData2.CourseID, tempData2.ReportTypeID);
                verifyreportData.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    }
                    catch (err) { }
                    $scope.VerificationReportDataTable = [];
                    if (res.length >= 0) {

                        $scope.VerificationReportDataTable = res;

                    } else {

                        $scope.VerificationReportDataTable = [];
                    }
                },
                    function (error) {
                        //   alert("error while loading Notification");
                        var err = JSON.parse(error);
                    });
            }
        }

        $scope.Close = function () {
            $state.go('CcicDashboard.Academic.VerificationReport')
        }

        $scope.ViewStudentDetails = function (AppNo, StdId) {
            $scope.LoadImg = true;
            $scope.DataTable = false;
            var ViewStudentDetail = CcicPreExaminationService.GetViewStudentDetails(AppNo, StdId);
            ViewStudentDetail.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.ShowStudentDetails = true;
                $scope.DataTable = false;

                //if (res[0].Submitted == 'Yes') {
                //    $scope.Edit = true;
                //    $scope.Submit = true;

                //}
                //else {
                //    $scope.Clear = true;
                //}

                $scope.PreviewData = [];
                if (res.length >= 0) {
                    $scope.LoadImg = true;
                    $scope.PreviewData = res[0];
                    $scope.LoadImg = false;

                    //$scope.PreviewData = $scope.PreviewData.map(x => {
                    //    return {
                    //        StudentName: x.StudentName, DateofBirth: x.DateofBirth,

                    //    }
                    //});
                } else {
                    $scope.LoadImg = false;
                    $scope.PreviewData = [];
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });



            $scope.Approve = function () {

                $scope.modalInstance1 = $uibModal.open({
                    templateUrl: "/app/views/CCIC/CcicApprovedPopup.html",
                    size: 'lg',
                    scope: $scope,
                    windowClass: 'modal-fit',
                    backdrop: 'static',
                    keyboard: false
                });
               

                $scope.ViewStudentDetails = [];
                for (var i = 0; i < $scope.PreviewData.length; i++) {
                    if ($scope.PreviewData[i].StudentID == StudentID) {
                        $scope.ViewStudentDetails.push({
                            StudentName: $scope.PreviewData[i].StudentName, DateofBirth: $scope.PreviewData[i].DateofBirth

                        });
                    }
                }

                $scope.closeModal1 = function () {
                    $scope.modalInstance1.close();
                };
            }


            $scope.Revise = function () {
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
              

            }
        

    });
});















