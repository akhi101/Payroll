define(['app'], function (app) {
    app.controller("C18OdcTrSheetController", function ($scope, $q, $http, PreExaminationService, $localStorage, $state, $stateParams, AppSettings) {
        $scope.NrGenerating = false;
        //var ApproveList = PreExaminationService.GetSchemes();
        //ApproveList.then(function (response) {

        //    console.log(response);
        //    $scope.Schemes = response.Table;

        //},
        //function (error) {
        //    //$scope.$emit('hideLoading', data);

        //    $scope.Data = false;
        //    $scope.Nodata = true;
        //    alert("error while loading data");
        //});



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

        $scope.DownloadODCTrsheet = function () {
            $scope.NrGenerating = true;
            var CertificateFeePaymentReports = PreExaminationService.GetC18OdcTrSheets($scope.ExamMonth);
            CertificateFeePaymentReports.then(function (res) {
                $scope.NrGenerating = false;
                if (res.length > 0) {
                    if (res.length > 10) {
                        window.location.href = "/Reports/" + res + '.pdf';
                    } else {
                        alert("Failed to generate ODC Tr Sheets");
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