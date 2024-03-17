define(['app'], function (app) {
    app.controller("CcicMarksEntryController", function ($scope, $localStorage, $state, CcicPreExaminationService, CcicAssessmentService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        $scope.InstitutionID = authData.InstitutionID;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetCcicCoursesByInstitution($scope.InstitutionID)
        }

        $scope.getexamTypes = function () {
            var examtypes = CcicAssessmentService.getExamTypes();
            examtypes.then(function (response) {
                if (response.length > 0) {
                    var modulesList = [];
                    if (response.length > 0) {
                        for (var i = 0; i < response.length; i++) {
                            var obj = {};
                            obj.SysModName = response[i].ExamType;
                            obj.SysModID = response[i].Examtypeid;
                            obj.ModuleRouteName = response[i].ModuleRouteName;
                            obj.ModuleImageClass = response[i].ModuleImageClass;
                            modulesList.push(obj);

                        }
                        $scope.ExamTypes = modulesList;
                    } else {
                        $scope.ExamTypes = [];
                    }
                }
                else {
                    $scope.ExamTypes = [];
                    alert("Marks entry Not Available for this semester");
                }
            }, function (error) {
                $scope.ExamTypes = [];
                alert("error while getting data");
            });
        }
       
        var GetCcicAcademicYears = CcicPreExaminationService.GetCcicAcademicYears()
        GetCcicAcademicYears.then(function (response) {
            $scope.loading = false;
            $scope.GetCcicAcademicYears = response.Table;
            //$scope.$emit('hideLoading', data);

        },
            function (error) {
                alert("data is not loaded");
                var err = JSON.parse(error);
                console.log(err.Message);
            });

        $scope.GetCcicCoursesByInstitution = function (InstitutionID) {

            var GetCcicCoursesByInstitution = CcicPreExaminationService.GetCcicCoursesByInstitution(InstitutionID);
            GetCcicCoursesByInstitution.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.CoursesData = res;
                }
                else {
                    $scope.GetCcicCoursesByInstitution = [];
                }

                $scope.AffiliatedInsttitutionCourses = res;


            },
                function (error) {
                    alert("error while loading Courses");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetExamMonthYearData = function (academicYear) {
            if (academicYear == null || academicYear == undefined || academicYear == "") {
                return;

            }
            $scope.academicYear = academicYear;
            $scope.loading = true;
            var getexammonthyrdata = CcicPreExaminationService.GetExamMonthYears(academicYear);
            getexammonthyrdata.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.ExamMonthYrData = res.Table;
                    $scope.NoData = false;
                }
                else {
                    $scope.loading = false;
                    $scope.ExamMonthYrData = [];
                    $scope.NoData = true;
                }


            },

                function (error) {
                    alert("error while loading CurrentBatch");
                    var err = JSON.parse(error);

                });


        }


        $scope.verifyDates = function () {
            var VerifyDate = CcicAssessmentService.VerifyAssesmentEntryDate($scope.academicYear,$scope.ExamMonthYear);
            VerifyDate.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch { err }
                if (res[0].ResponseCode == '200') {
                    $scope.getexamTypes();

                } else {
                    alert('Entry Date Not Found')
                    return;
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.OpenAssessmentModule = function (RouteName) {

            if (RouteName.ModuleRouteName == "Internals" || RouteName.ModuleRouteName == "Practicals") {
                $localStorage.TempData = {
                    AcademicYearID: $scope.academicYear,
                    ExamMonthYearID: $scope.ExamMonthYear,
                    InstitutionID: authData.InstitutionID,
                    CourseID: $scope.Course,
                    ExamTypeID: RouteName.SysModID,
                    ExamType: RouteName.ModuleRouteName

                };
                $state.go('CcicDashboard.Assessment.SubjectList')
            } 
            

        }




    });
});

