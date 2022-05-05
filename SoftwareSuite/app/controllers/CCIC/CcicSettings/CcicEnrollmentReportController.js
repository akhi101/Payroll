define(['app'], function (app) {
    app.controller("CcicEnrollmentReportController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        var tmp = $localStorage.TempData;

        const $ctrl = this;
        $ctrl.$onInit = () => {
          
         
        }

       


        var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID

        var enrollmentreportCount = CcicPreExaminationService.GetInstitutionEnrollmentReportCount(InstitutionID);
        enrollmentreportCount.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.EnrollmentReportCountTable = [];
            if (res.length >= 0) {
                $scope.EnrollmentReportCountTable = res;
            } else {
                $scope.EnrollmentReportCountTable = [];
            }
        },
            function (error) {
                //   alert("error while loading Notification");
                var err = JSON.parse(error);
            });


       
        $scope.showDetails = function (CourseID,ReportTypeID) {
            
            $localStorage.TempData2 = {
                CourseID: CourseID,
                ReportTypeID: ReportTypeID,

            };
            $state.go('CcicDashboard.Academic.CcicStudentRegList');

        }


        


    });
 });









      


      
       
    
