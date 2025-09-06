define(['app'], function (app) {
    app.controller("EmployeeConsolidatedController", function ($scope, $uibModal, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            var authData = $localStorage.authorizationData;
            $scope.UserID = authData.SystemUserTypeId;
            $scope.FinancialYears();

            //$scope.GetMonths();
            $scope.getMonths();
            $scope.GetPayrollMonths()
        }









        $scope.changeFinYear = function (data) {
            if (data == undefined || data == "" || data == null) {
                $scope.ClearData();
            }
        }

        $scope.changeFinYear1 = function (data) {
            if (data == undefined || data == "" || data == null) {
                $scope.ClearData1();
            }
        }

       

        $scope.ClearData = function () {

            $scope.GetAllGeneratedMontlysalary = [];
            $scope.GetAllPublishMontlysalary = [];

        }



        $scope.FinancialYears = function () {
            var getdesign = PayRollService.GetFinancialYears();
            getdesign.then(function (response) {

                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.FinancialYears = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.FinancialYears = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Financial Years");
                    var err = JSON.parse(error);

                });
        }



        $scope.GetPayrollMonths = function () {
            var getmonths = PayRollService.getPayMonths();
            getmonths.then(function (response) {

                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.MonthsData = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.MonthsData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Months");
                    var err = JSON.parse(error);

                });
        }



        $scope.getMonths = function () {
            var getmonths = PayRollService.GetMonths();
            getmonths.then(function (response) {

                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.AllMonthsData = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.AllMonthsData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Months");
                    var err = JSON.parse(error);

                });
        }






     



        $scope.ClearData1 = function () {
            $scope.GetAllPublishMontlysalary = [];


        }





        $scope.GenerateConsolidatedPaySlip = function () {
            //  var PaymentStudent = [{"Employeecode":"1025"}]
            // if (PaymentStudent != [] && PaymentStudent != '') {
            $scope.btndisable = true;
            var ApproveStatus = 1;
            $scope.loading = true;



            //  $scope.buttonlabel = "Signing in process ...";$scope.UserID
            var GetInterimCertificateTobeSignedlocation = PayRollService.GenerateConsolidatedPaySlip($scope.FinancialYearID3, 1)
            GetInterimCertificateTobeSignedlocation.then(function (response) {
                ///var url = window.location.origin + '/Reports/' + response ;
                console.log(response)
                download(response, 'Payslip.pdf');

                $scope.loading = false;
                //var pdf = response[0].PdfUrl
                //    var location = window.location.origin;
                //    if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
                //        location += "/API/"
                //    } else {
                //        location += "/"
                //}
                //   window.open(pdf, '_blank')
            }, function (err) {
                $scope.btndisable = false;
                $scope.buttonlabel = "Approve";
            });






            //} else {
            //    alert('select the pins');
            //    return;
            //}
        }





        const download = (path, filename) => {
            // Create a new link
            const anchor = document.createElement('a');
            anchor.href = path;
            anchor.download = filename;

            // Append to the DOM
            document.body.appendChild(anchor);

            // Trigger `click` event
            anchor.click();

            // Remove element from DOM
            document.body.removeChild(anchor);
        };










    })
})
