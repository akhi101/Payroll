define(['app'], function (app) {
    app.controller("CollegeAuthorizationController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
        var authData = $localStorage.Twsh;
        $scope.studDetailsfound = false;
        $scope.failed = false;

        $scope.userId = authData.UserId;
        $scope.UserId = authData == undefined || authData == "" ? -1 : authData.UserId;

        var GetExamCenterApplied = TwshStudentRegService.getExamCenterApplied($scope.UserId);
        GetExamCenterApplied.then(function (response) {
            if (response) {
                if (response.Table) {
                    $scope.studDetailsfound = true;
                    $scope.class = "alert-success";
                    //  $scope.StatusMessage = true;
                    //  $scope.showStatus = true;
                    $scope.GetAppliedStudents = response.Table1;
                    $scope.GetAppliedStudents.forEach(function (modules) {
                        if (modules.NeedToApprove == null && modules.NeedToApprove == '0') {
                            $scope.ApproveList = true;
                        } else {
                            $scope.ApproveList = false;
                        }
                    });

                } else {
                    $scope.StatusMessage = "No data found!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    $scope.studDetailsfound = false;
                }

                //$timeout(function () {
                //    $scope.showStatus = false;                  
                //}, 5000);
            } else {
                $scope.StatusMessage = "No Record found!";
                $scope.showStatus = true;
                $scope.statusclass = "alert-danger";
                //$timeout(function () {
                //    $scope.showStatus = false;
                //}, 5000);
                $scope.studDetailsfound = false;
            }

        },
            function (error) {
                $scope.showStatus = true;
                $scope.statusclass = "alert-danger";
                $scope.StatusMessage = "No Record found!";
                $scope.showStatus = true;
                $timeout(function () {
                    $scope.showStatus = false;
                }, 5000);
                $scope.studDetailsfound = false;
            });
        $scope.noData = function () {
            window.scroll({
                top: 50, // could be negative value
                left: 0,
                behavior: 'smooth'
            });
            $scope.showStatus = true;
            $scope.statusclass = "alert-danger";
            $scope.StatusMessage = "No Approvals found!";
            $scope.showStatus = true;
            $timeout(function () {
                $scope.showStatus = false;
            }, 5000);

        }

        $scope.openStudentList = function (courseId, gradeId, languageId, examBatch, DataType) {

            $localStorage.collegeAuthorization = "";

            collegeauthorization = {
                UserId: $scope.UserId,
                CourseId: courseId,
                GradeId: gradeId,
                LanguageId: languageId,
                ExamBatch: examBatch,
                DataType: DataType
            }

            $localStorage.collegeAuthorization = collegeauthorization;
            $state.go('TWSH.ViewAuthorization');
        }

    })
})