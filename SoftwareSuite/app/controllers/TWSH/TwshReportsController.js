define(['app'], function (app) {
    app.controller("TwshReportsController", function ($scope, $state, TwshStudentRegService, $localStorage) {

        var authData = $localStorage.Twsh;
      
        $scope.userId = authData.UserId;
        $scope.userType = authData.UserTypeId;
        var GetInstituteReports = TwshStudentRegService.getInstituteReports($scope.userId);
        GetInstituteReports.then(function (response) {
            if (response.length > 0) {
                $scope.data = true;
           
            $scope.InstituteReports = response;
            var Applied = 0;
            var FeeNotPaid = 0;
            var FeePaid = 0;
            for (count = 0; count < $scope.InstituteReports.length; count++) {
                Applied += parseInt($scope.InstituteReports[count].Applied)
                FeeNotPaid += parseInt($scope.InstituteReports[count].FeeNotPaid);
                FeePaid += parseInt($scope.InstituteReports[count].FeePaid);
            }
           
            $scope.Applied = Applied;
            $scope.FeeNotPaid = FeeNotPaid;
            $scope.FeePaid = FeePaid;
            } else {
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;
            }
        },
            function (error) {
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;

            });

        $scope.openDetails = function (gradeId) {
         
            localStorage.setItem('gradeId',gradeId)
            $state.go('TWSH.DetailedReports')
        }
    })
})
