define(['app'], function (app) {
    app.controller("ViewStuDetailsController", function ($scope, $uibModal, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tempData3 = $localStorage.TempData3;
        //var tempData2 = $localStorage.TempData2;
        //$scope.ReportTypeID = tempData2.ReportTypeID;
        $scope.isSubmitted = tempData3.isSubmitted;
        $scope.ApplicationStatus = tempData3.ApplicationStatus;

        $scope.Submitted = tempData3.ApplicationStatus;
        const $ctrl = this;
        $ctrl.$onInit = () => {

        }

        var data = {};
        $scope.$emit('showLoading', data);

        $scope.Close = function () {
            $state.go('CcicDashboard.Academic')
        }
        $scope.loading = true;
        if (tempData3.ApplicationStatus == 'Pending') {
            $scope.ApplicationStatus = 0;
        }
        else if (tempData3.ApplicationStatus == 'Approved') {
            $scope.ApplicationStatus = 1;
        }
        else if (tempData3.ApplicationStatus == 'Revised') {
            $scope.ApplicationStatus = 2;
        }
        else if (tempData3.ApplicationStatus == 'Rejected') {
            $scope.ApplicationStatus = 3;
        }
        var ViewStudentDetail = CcicPreExaminationService.GetViewStudentDetails(tempData3.ApplicationNumber, tempData3.StudentID, $scope.ApplicationStatus);
        ViewStudentDetail.then(function (response) {

            try {
                var res = JSON.parse(response);
            }
            catch (err) { }


            //if (res[0].Submitted == 'Yes') {
            //    $scope.Edit = true;
            //    $scope.Submit = true;

            //}
            //else {
            //    $scope.Clear = true;
            //}

            $scope.PreviewData = [];
            if (res.length >= 0) {
                $scope.loading = false;
                $scope.PreviewData = res[0];
                $scope.imagesrc = res.Table[0].SSCCertificate;
                $scope.imagesrc1 = res.Table[0].QualificationCertificate;
                $scope.imagesrc2 = res.Table[0].ExperienceCertificate;
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









    });
});















