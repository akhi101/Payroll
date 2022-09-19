define(['app'], function (app) {
    app.controller("ViewStdDetailsController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tempData3 = $localStorage.TempData3;
        $scope.isSubmitted = tempData3.isSubmitted;
        const $ctrl = this;
        $ctrl.$onInit = () => {

        }

        var data = {};
        $scope.$emit('showLoading', data);

        $scope.Close = function () {
            $state.go('CcicDashboard.Academic')
        }
        $scope.loading = true;
        var ViewStudentDetail = CcicPreExaminationService.GetViewStudentDetails(tempData3.ApplicationNumber, tempData3.StudentID);
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















