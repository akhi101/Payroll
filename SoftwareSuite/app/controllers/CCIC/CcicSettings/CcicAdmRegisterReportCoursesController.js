define(['app'], function (app) {
    app.controller("CcicAdmRegisterReportCourses", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmp = $localStorage.TempData;



        const $ctrl = this;
        $ctrl.$onInit = () => {


        }
        var data = [];
        $scope.$emit('showLoading', data);

        $scope.loading = true;
        var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID
        var registerreportcoursesCount = CcicPreExaminationService.GetInsRegisterReportCoursesCount(InstitutionID,tmp.academicYear,tmp.batch);
        registerreportcoursesCount.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.RegisterReportCoursesTable = [];
            if (res.length >= 0) {
                $scope.loading = false;
                $scope.RegisterReportCoursesTable = res;
                $scope.$emit('hideLoading', data);

            } else {
                $scope.loading = false;
                $scope.RegisterReportCoursesTable = [];
                $scope.$emit('hideLoading', data);

            }
        },
            function (error) {
                //   alert("error while loading Notification");
                var err = JSON.parse(error);
            });


    



        $scope.ShowDetails = function (InstitutionID,CourseID, ReportTypeID,academicYear,batch) {

            $localStorage.TempData2 = {
                InstitutionID: InstitutionID,
                CourseID: CourseID,
                ReportTypeID: ReportTypeID,
                academicYear: academicYear,
                batch: batch,

            };

            $state.go('CcicDashboard.Academic.CcicAdmRegisterReportData');


        }



    });
});

