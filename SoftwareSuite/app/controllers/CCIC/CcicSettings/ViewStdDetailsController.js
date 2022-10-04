define(['app'], function (app) {
    app.controller("ViewStdDetailsController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tempData3 = $localStorage.TempData3;
        //var tempData2 = $localStorage.TempData2;
        //$scope.ReportTypeID = tempData2.ReportTypeID;
        $scope.isSubmitted = tempData3.isSubmitted;
        $scope.ApplicationStatus = tempData3.ApplicationStatus;
        const $ctrl = this;
        $ctrl.$onInit = () => {

        }

        var data = {};
        $scope.$emit('showLoading', data);

        $scope.Close = function () {
            $state.go('CcicDashboard.Academic.EnrollmentReport')
        }
        $scope.loading = true;
        var ViewStudentDetail = CcicPreExaminationService.GetViewStudentDetails(tempData3.ApplicationNumber, tempData3.StudentID);
        ViewStudentDetail.then(function (response) {

            try {
                var res = JSON.parse(response);
            }
            catch (err) { }

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


       
        $scope.Modify = function (ApplicationNumber, StudentID) {
            var ApplicationNumber = tempData3.ApplicationNumber;
            var StudentID = tempData3.StudentID;
            $localStorage.TempData4 = {
                ApplicationNumber: ApplicationNumber,
                StudentID: StudentID
                


            };

            $state.go('CcicDashboard.Academic.EditStdDetails');
        }



        $scope.SubmitStdDetails = function () {
            var submitstddetails = CcicPreExaminationService.SubmitStdDetails(tempData3.ApplicationNumber, tempData3.StudentID);
            submitstddetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $state.go('CcicDashboard.Academic.EnrollmentReport');
   
                }

                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                }

                else {
                    alert('Something Went Wrong')
                }
            }, function (error) {
                var err = JSON.parse(error);
            });
        }




    });
});















