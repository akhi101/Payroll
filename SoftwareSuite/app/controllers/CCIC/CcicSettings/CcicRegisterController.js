define(['app'], function (app) {
    app.controller("CcicRegisterController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmp = $localStorage.TempData;
        var InstitutionID = authData.InstitutionID;
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.AdminRegisterInsTable = false;
            $scope.RegisterCoursesTable = false;
            $scope.DropDownTable = true;
           

        }

        //var data = [];
        //$scope.$emit('showLoading', data);

        $scope.loading = false;
        $scope.getAdminRegisterReportCount = function (academicYear, batch) {
            if ($scope.UserTypeID == 1) {
                $scope.GetAdmDetails(academicYear, batch);
            }
            else if ($scope.UserTypeID == 2)
                $scope.showRegisterCoursesCount(InstitutionID,academicYear, batch);
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





        $scope.GetAdmDetails = function (academicYear, batch) {
            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
                alert('Select Academic Year');
                return;
            }
            if ($scope.batch == null || $scope.batch == undefined || $scope.batch == "") {
                alert('Select Batch');
                return;
            }

            $scope.loading = true;
            $scope.DropDownTable = true;
            $scope.AdminRegisterInsTable = true;
            $scope.RegisterCoursesTable = false;
            var registerreportCount = CcicPreExaminationService.GetAdminRegisterReportCount(academicYear,batch);
            registerreportCount.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.AdmRegisterReportInsCountTable = [];
                if (res.length >= 0) {
                    $scope.loading = false;
                    $scope.AdmRegisterReportInsCountTable = res;
                    $scope.NoData = false;
                //    alert('Please scroll down!')
                //    $scope.$emit('hideLoading', data);
                } else {
                    $scope.loading = false;
                    $scope.AdmRegisterReportInsCountTable = [];
                    $scope.NoData = true;


                    //$scope.$emit('hideLoading', data);

                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }




        $scope.showRegisterCoursesCount = function (InstitutionID, academicYear, batch) {
            if (InstitutionID == null || InstitutionID == undefined || InstitutionID == "")  {
                alert('Select Institution ID');
                return;
            }

            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
                alert('Select Academic Year');
                return;
            }
            if ($scope.batch == null || $scope.batch == undefined || $scope.batch == "") {
                alert('Select Batch');
                return;
            }
            $scope.loading = true;
            $scope.AdminRegisterInsTable = false;
            $scope.RegisterCoursesTable = true;
            $scope.DropDownTable = true;
            var regcourscount = CcicPreExaminationService.GetRegisterCoursesCount(InstitutionID, academicYear, batch);
            regcourscount.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.RegisterCoursesCountTable = [];
                if (res.length >= 0) {
                    $scope.loading = false;
                    $scope.RegisterCoursesCountTable = res;
                    $scope.NoData = false;
                    //$scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false;
                    $scope.RegisterCoursesCountTable = [];
                    $scope.NoData = true;
                //    $scope.$emit('hideLoading', data);
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });



        }

      

       
          if ($scope.UserTypeID == 2) {
              /*$scope.UserDetails(InstitutionID);*/
              $scope.UserDetails = function (InstitutionID, CourseID, ReportTypeID, academicYear, batch) {

                  $localStorage.TempData2 = {
                      InstitutionID: InstitutionID,
                      CourseID: CourseID,
                      ReportTypeID: ReportTypeID,
                      academicYear: academicYear,
                      batch: batch,
                  };
                  $state.go('CcicDashboard.Academic.CcicRegisterReportData');

              
            }
        }


           
        
     


        if ($scope.UserTypeID == 1) {
            $scope.showAdminRegisterCoursesCount = function (InstitutionID, academicYear, batch) {

                $localStorage.TempData = {
                    InstitutionID: InstitutionID,
                    academicYear: academicYear,
                    batch: batch,
                };

                $state.go('CcicDashboard.Academic.CcicAdmRegisterReportCourses');

            }

        }
       
    });
});




