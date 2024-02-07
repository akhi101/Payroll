define(['app'], function (app) {
    app.controller("CcicAdmEnrollReportCoursesController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmp = $localStorage.TempData;

        $scope.Institution = tmp.Institution;



        const $ctrl = this;
        $ctrl.$onInit = () => {

          
        }

        var data = [];
        $scope.$emit('showLoading', data);


        $scope.loading = true;
        var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID

        var enrollmentreportCount = CcicPreExaminationService.GetInsEnrollmentReportCoursesCount(InstitutionID);
        enrollmentreportCount.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.EnrollmentReportCoursesTable = [];
            if (res.length >= 0) {
                $scope.loading = false;
                $scope.EnrollmentReportCoursesTable = res;
                $scope.$emit('hideLoading', data);
            } else {
                $scope.loading = false;
                $scope.EnrollmentReportCoursesTable = [];
                $scope.$emit('hideLoading', data);
            }
        },
            function (error) {
                //   alert("error while loading Notification");
                var err = JSON.parse(error);
            });


        //$scope.showAdminEnrollmentCount = function (InstitutionID) {
        //    var enrollmentreportCount = CcicPreExaminationService.GetInstitutionEnrollmentReportCount(InstitutionID);
        //    enrollmentreportCount.then(function (response) {
        //        try {
        //            var res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        $scope.EnrollmentReportCountTable = [];
        //        if (res.length >= 0) {
        //            $scope.EnrollmentReportCountTable = res;
        //        } else {
        //            $scope.EnrollmentReportCountTable = [];
        //        }
        //    },
        //        function (error) {
        //            //   alert("error while loading Notification");
        //            var err = JSON.parse(error);
        //        });
        //    /*$state.go('CcicDashboard.Academic.EnrollmentReport');*/



        //}

    

        $scope.ShowDetails = function (InstitutionID, CourseID, ReportTypeID, Course) {

            $localStorage.TempData2 = {
                InstitutionID: InstitutionID,
                CourseID: CourseID,
                ReportTypeID: ReportTypeID,
                Course: Course,
                Institution: $scope.Institution

            };

            $state.go('CcicDashboard.Academic.CcicAdmEnrollmentReportData');


        }
            


    });
});

