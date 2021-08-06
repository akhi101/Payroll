define(['app'], function (app) {
    app.controller("MemoTrSheetController", function ($scope, $q, $http, PreExaminationService, $localStorage, $state, $stateParams, AppSettings) {
        $scope.NrGenerating = false;
        $scope.LoadImg = false;
        var ApproveList = PreExaminationService.GetScheme();
        ApproveList.then(function (response) {

            $scope.Schemes = response.Table;

        },
        function (error) {
            //$scope.$emit('hideLoading', data);

            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });



        var ApproveLists = PreExaminationService.getExamYearMonths();
        ApproveLists.then(function (response) {

            console.log(response);
            $scope.ExamMonthYear = response.Table

        },
        function (error) {
            //$scope.$emit('hideLoading', data);

            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });

        $scope.DownloadMemoTrSheets = function () {
            $scope.NrGenerating = true;
            var CertificateFeePaymentReports = PreExaminationService.GetTrSheets($scope.Scheme, $scope.ExamMonth, $scope.date);
            CertificateFeePaymentReports.then(function (res) {
                $scope.NrGenerating = false;
                if (res.length > 0) {                   
                        if (res.length > 10) {
                            window.location.href = "/Reports/" + res + '.pdf';
                        } else {
                            alert("Failed to generate Memo Tr Sheets");
                        }
                   
                } else {
                    alert("No Report Present")
                }
            }, function (err) {
                    $scope.NrGenerating = false;
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        }
    })
})