define(['app'], function (app) {
    app.controller("CcicVerificationController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        var tmp = $localStorage.TempData;

        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.AdminVerificationReportTable = true;
            $scope.VerificationReportTable = false;
        }





        if ($scope.UserName == 'ADMIN') {

            $scope.AdminVerificationReportTable = true;
            $scope.VerificationReportTable = false;


            $scope.showAdminVerificationCount = function (InstitutionID) {

                $localStorage.TempData = {
                    InstitutionID: InstitutionID,
                };

                $state.go('CcicDashboard.Academic.CcicAdmVerificationCourses');

            }
            var admverifyreportcourses = CcicPreExaminationService.GetAdminVerificationReportCount();
            admverifyreportcourses.then(function (Res) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                $scope.AdminVerificationReportCountTable = [];
                if (Res.Table.length >= 0) {
                    $scope.AdminVerificationReportCountTable = Res.Table;
                } else {
                    $scope.AdminVerificationReportCountTable = [];
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });





        }

        else {
            $scope.VerificationReportTable = true;

            var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID

            var verifyreportCount = CcicPreExaminationService.GetInstitutionVerificationReportCount(InstitutionID);
            verifyreportCount.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.VerificationReportCountTable = [];
                if (res.length >= 0) {
                    $scope.VerificationReportCountTable = res;
                } else {
                    $scope.VerificationtReportCountTable = [];
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
                $state.go('CcicDashboard.Academic.CcicVerificationReportData');

            }

            $scope.VerificationReportTable = true;
            $scope.AdminVerificationReportTable = false;
        }


    });
});















