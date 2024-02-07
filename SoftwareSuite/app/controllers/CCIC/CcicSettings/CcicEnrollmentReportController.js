define(['app'], function (app) {
    app.controller("CcicEnrollmentReportController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmp = $localStorage.TempData;

        const $ctrl = this;
        $ctrl.$onInit = () => {

         
        }

        var data = {};
        $scope.$emit('showLoading', data);
     


        if ($scope.UserTypeID == 1 || $scope.UserTypeID==4 || $scope.UserTypeID == 5 || $scope.UserTypeID == 6 || $scope.UserTypeID == 7 ||
            $scope.UserTypeID == 6 || $scope.UserTypeID == 7 || $scope.UserTypeID == 8 || $scope.UserTypeID == 9 ||
            $scope.UserTypeID==10) {
            $scope.loading = true;
            $scope.AdminEnrollmentReportTable = true;



            $scope.showAdminEnrollmentInsCount = function (InstitutionID, Institution) {

                $localStorage.TempData = {
                    InstitutionID: InstitutionID,
                    Institution: Institution
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
                var Enrolled = 0;
                var Submitted = 0;
                var Approved = 0;
                var Pending = 0;
                var Revised = 0;
                var Rejected = 0;

                if (Res.Table.length > 0) {
                    $scope.AdminEnrollmentReportInsCountTable = Res.Table;
                    for (var i = 0; i < Res.Table.length; i++) {
                        if (Res.Table[i].Enrolled != null)
                            Enrolled = Enrolled + Res.Table[i].Enrolled;
                        if (Res.Table[i].Submitted != null)
                            Submitted = Submitted + Res.Table[i].Submitted;
                        if (Res.Table[i].Approved != null)
                            Approved = Approved + Res.Table[i].Approved;
                        if (Res.Table[i].Pending != null)
                            Pending = Pending + Res.Table[i].Pending;
                        if (Res.Table[i].Revised != null)
                            Revised = Revised + Res.Table[i].Revised;
                        if (Res.Table[i].Rejected != null)
                            Rejected = Rejected + Res.Table[i].Rejected;
                    }
                    $scope.Enrolled = Enrolled;
                    $scope.Submitted = Submitted;
                    $scope.Approved = Approved;
                    $scope.Pending = Pending;
                    $scope.Revised = Revised;
                    $scope.Rejected = Rejected;
                    $scope.loading = false;
                    $scope.$emit('hideLoading', data);
                }
                else {
                    $scope.loading = false;
                    $scope.AdminEnrollmentReportInsCountTable = [];
                    $scope.$emit('hideLoading', data);
                    $scope.NoData = true;
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });

        
          
           

        }

        else if ($scope.UserTypeID == 2) {
            $scope.loading = true;
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
                    $scope.loading = false;
                    $scope.EnrollmentReportCoursesTable = res;
                    $scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false
                    $scope.EnrollmentReportCoursesTable = [];
                    $scope.$emit('hideLoading', data);
                    $scope.NoData = true;


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









      


      
       
    
