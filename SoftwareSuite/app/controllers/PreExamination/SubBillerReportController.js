define(['app'], function (app) {
    app.controller("SubBillerReportController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService, MarksEntryService) {
        $scope.SubBillers = ['TSDOFP','TSCCIC','LATEFEE', 'TSTWSH', 'STUSERVICES'];
        $scope.ExcelView = false;
        $scope.isShowResults = false;
        $scope.RegularDisable = false;
        $scope.selectedSubBiller = "";

        $scope.GetReport = function () {
            $scope.isShowResults = true;
            var subBiller = $scope.selectedSubBiller;
            var fromdate = moment($scope.setFromDate).format("YYYY-MM-DD");
            var todate = moment($scope.setToDate).format("YYYY-MM-DD");
            PreExaminationService.GetSubBillerReport(subBiller, fromdate.toString(), todate.toString())
                .then(function (response) {
                    if (response != null && response.length > 1) {
                        var location = window.location.origin;
                        window.location.href = '/Reports' + response;
                        $scope.NoResult = false;
                    } else {
                        alert("Error Generating The Report");
                        $scope.NoResult = true;
                    }
                },
                    function (error) {
                        alert("error data is not getting");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                    });
        }
        $scope.Setdate = function () {
            if (Date.parse($scope.setFromDate) > Date.parse($scope.setToDate)) {
                alert("To Date Should Not Less Then From Date");
                $scope.setToDate = '';

                return false;
            }
        };
        $scope.Todate = function () {
            if (Date.parse($scope.setFromDate) > Date.parse($scope.setToDate)) {
                alert("To Date Should Not Less Then From Date");
                $scope.setFromDate = '';

                return false;
            }
        };
    });
});