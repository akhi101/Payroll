define(['app'], function (app) {

    app.controller("CcicMarksEntrySubjectListController", function ($scope, $window, $http, $state, $localStorage,  CcicAssessmentService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var InstitutionID = authData.InstitutionID;
        var tmpdata = $localStorage.TempData;
        $scope.SessionID = $localStorage.SessionID;


        //$scope.NewAcademicYearID = tmpdata.AcademicYearID;
        //$scope.NewExamMonthYearID = tmpdata.ExamMonthYearID;
        //$scope.NewCourseID = tmpdata.CourseID;

        $scope.ExamType = tmpdata.ExamType;

        var getsubject = CcicAssessmentService.getInternalorExternalSubjects(tmpdata.AcademicYearID, tmpdata.ExamMonthYearID, tmpdata.InstitutionID, tmpdata.CourseID, tmpdata.ExamTypeID);
        getsubject.then(function (response) {
            try {
                var res = JSON.parse(response)
            }
            catch { }
            if (res !== undefined && res.length > 0) {
                $scope.getSubjectsResponse = res;
                $scope.AcademicYearID = res[0].AcademicYearID;
                $scope.ExamMonthYearID = res[0].ExamMonthYearID;
            }
            else {
                //alert("no subjects");
                //$state.go("Dashboard.AssessmentDashboard.practicals");
            }
        }, function (error) {
            alert("some thing went wrong");
        });


        $scope.back = function () {
            //$localStorage.BackTempData = {
            //    AcademicYearID: tmpdata.AcademicYearID,
            //    ExamMonthYearID: tmpdata.ExamMonthYearID,
            //    ExamMonthYearID: tmpdata.CourseID,
            //};
            var AcademicYearID = $scope.AcademicYearID
            var ExamMonthYearID = $scope.ExamMonthYearID
            var CourseID = tmpdata.CourseID
            sessionStorage.setItem("AcademicYearID", AcademicYearID);
            sessionStorage.setItem("ExamMonthYearID", ExamMonthYearID);
            sessionStorage.setItem("CourseID", CourseID);
            $state.go("CcicDashboard.Assessment.MarksEntry");
        //    $window.open($state.href('CcicDashboard.Assessment.MarksEntry'));
        }

        $scope.selectSubjectDetails = function (subject) {
            $localStorage.TempData1 = {
                    AcademicYearID: tmpdata.AcademicYearID,
                    ExamMonthYearID: tmpdata.ExamMonthYearID,
                    InstitutionID: tmpdata.InstitutionID,
                    CourseID: tmpdata.CourseID,
                    ExamTypeID: tmpdata.ExamTypeID,
                    ExamTypeName: tmpdata.ExamType
                };
            $localStorage.SubjectDetails = subject;
            $state.go('CcicDashboard.Assessment.MarksEntryPage')
        }

        $scope.logOut = function () {
            $scope.$emit("logout", authData.userName);
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
            delete $localStorage.assessment;

            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };

        }
    });
});
