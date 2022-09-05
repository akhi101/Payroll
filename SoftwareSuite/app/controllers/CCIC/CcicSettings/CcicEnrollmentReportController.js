define(['app'], function (app) {
    app.controller("CcicEnrollmentReportController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmp = $localStorage.TempData;

        const $ctrl = this;
        $ctrl.$onInit = () => {

         
        }


     


        if ($scope.UserTypeID == 1) {
           
            $scope.AdminEnrollmentReportTable = true;



            $scope.showAdminEnrollmentInsCount = function (InstitutionID) {

                $localStorage.TempData = {
                    InstitutionID: InstitutionID,
                };

                $state.go('CcicDashboard.Academic.CcicAdmEnrollReportCourses');

            }
            var adminenrollreportinsCount = CcicPreExaminationService.GetAdminEnrollmentReportInsCount();
            adminenrollreportinsCount.then(function (Res) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                $scope.AdminEnrollmentReportInsCountTable = [];
                if (Res.Table.length >= 0) {
                    $scope.AdminEnrollmentReportInsCountTable = Res.Table;
                } else {
                    $scope.AdminEnrollmentReportInsCountTable = [];
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });

        
          
           

        }

        else if ($scope.UserTypeID==2) {
            $scope.EnrollmentReportCoursesTable = true;
            $scope.AdminEnrollmentReportTable = false;
            var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID

            var enrollrepcoursescount = CcicPreExaminationService.GetInsEnrollmentReportCoursesCount(InstitutionID);
            enrollrepcoursescount.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.EnrollmentReportCoursesTable = [];
                if (res.length >= 0) {
                    $scope.EnrollmentReportCoursesTable = res;
                } else {
                    $scope.EnrollmentReportCoursesTable = [];
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
                $state.go('CcicDashboard.Academic.CcicEnrollmentReportData');

            }

 
        }


    



    });
 });









      


      
       
    
