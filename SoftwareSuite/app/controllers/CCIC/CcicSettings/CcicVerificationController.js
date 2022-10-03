define(['app'], function (app) {
    app.controller("CcicVerificationController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmp = $localStorage.TempData;

        const $ctrl = this;
        $ctrl.$onInit = () => {


        }

        var data = {};
        $scope.$emit('showLoading', data);



        if ($scope.UserTypeID == 1) {
            $scope.loading = true;
            $scope.AdminVerificationReportTable = true;



            $scope.showAdminVerificationInsCount = function (InstitutionID) {

                $localStorage.TempData = {
                    InstitutionID: InstitutionID,
                };

                $state.go('CcicDashboard.Academic.CcicAdmVerificationCourses');

            }
            var adminverificationreportinsCount = CcicPreExaminationService.GetAdminVerificationReportInsCount();
            adminverificationreportinsCount.then(function (Res) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                $scope.AdminVerificationReportInsCountTable = [];
                if (Res.Table.length >= 0) {
                    $scope.loading = false;
                    $scope.AdminVerificationReportInsCountTable = Res.Table;
                    $scope.$emit('hideLoading', data);
                } else {
                    $scope.loading = false;
                    $scope.AdminVerificationReportInsCountTable = [];
                    $scope.$emit('hideLoading', data);
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });





        }

        else if ($scope.UserTypeID == 2) {
            $scope.loading = true;
            $scope.VerificationReportCoursesTable = true;
            $scope.AdminVerificationReportTable = false;
            var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID

            var verrepcoursescount = CcicPreExaminationService.GetInsVerificationReportCoursesCount(InstitutionID);
            verrepcoursescount.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.VerificationReportCoursesTable = [];
                if (res.length >= 0) {
                    $scope.loading = false;
                    $scope.VerificationReportCoursesTable = res;
                    $scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false
                    $scope.VerificationReportCoursesTable = [];
                    $scope.$emit('hideLoading', data);

                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });



            $scope.showDetails = function (CourseID, ReportTypeID) {

                $localStorage.TempData2 = {
                    CourseID: CourseID,
                    ReportTypeID: ReportTypeID,

                };
                $state.go('CcicDashboard.Academic.CcicVerificationData');

            }


        }






    });
});















