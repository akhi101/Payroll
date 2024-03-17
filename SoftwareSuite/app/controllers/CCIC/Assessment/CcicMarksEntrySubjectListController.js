define(['app'], function (app) {

    app.controller("CcicMarksEntrySubjectListController", function ($scope, $http, $state, $localStorage,  CcicAssessmentService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var InstitutionID = authData.InstitutionID;
        var tmpdata = $localStorage.TempData;

        $scope.ExamType = tmpdata.ExamType;

        var getsubject = CcicAssessmentService.getInternalorExternalSubjects(tmpdata.AcademicYearID, tmpdata.ExamMonthYearID, tmpdata.InstitutionID, tmpdata.CourseID, tmpdata.ExamTypeID);
        getsubject.then(function (response) {
            try {
                var res = JSON.parse(response)
            }
            catch { }
            if (res !== undefined && res.length > 0) {
                $scope.getSubjectsResponse = res;
            }
            else {
                //alert("no subjects");
                //$state.go("Dashboard.AssessmentDashboard.practicals");
            }
        }, function (error) {
            alert("some thing went wrong");
        });


        $scope.selectSubjectDetails = function (subject) {
            $localStorage.TempData1 = {
                    AcademicYearID: tmpdata.AcademicYearID,
                    ExamMonthYearID: tmpdata.ExamMonthYearID,
                    InstitutionID: tmpdata.InstitutionID,
                    CourseID: tmpdata.CourseID,
                    ExamTypeID: tmpdata.ExamTypeID


                };
            $localStorage.assessment.selectSubjectDetails = subject;
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
