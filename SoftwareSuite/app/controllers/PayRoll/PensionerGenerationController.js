define(['app'], function (app) {
    app.controller("PensionerGenerationController", function ($scope, $uibModal, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.FinancialYears();

            //$scope.GetMonths();
            $scope.getMonths();
            $scope.GetPensionPayrollMonths()
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

        $scope.ChangeMonth = function (data) {
            if (data == undefined || data == "" || data == null) {
                $scope.ClearData();
            }
            else {
                var generate = PayRollService.GenerateMonthlyPensionData(1, $scope.FinancialYearID1, $scope.MonthID1)
                generate.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    } catch (err) { }


                    if (res.Table[0].ResponseCode == '200') {
                        $scope.GetAllGeneratedMontlypension = res.Table1;

                    }
                    else if (res.Table[0].ResponseCode == '400') {
                        //alert(res.Table[0].ResponseDescription);
                    } else {
                        alert('Something Went Wrong')

                    }
                },
                    function (error) {
                        alert("something Went Wrong")


                    });
            }
        }


        $scope.ClearData = function () {

            $scope.GetAllGeneratedMontlypension = [];
            $scope.GetAllPublishMontlypension = [];

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



        $scope.GetPensionPayrollMonths = function () {
            var getmonths = PayRollService.getPensionPayMonths();
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






        $scope.generatemonthlypension = function () {


            var generate = PayRollService.GenerateMonthlyPension($scope.FinancialYearID1, $scope.MonthID1, 1)
            generate.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }


                if (res.Table[0].ResponseCode == '201') {
                    //alert(res.Table[0].ResponseDescription);

                    $scope.AlertMsge = res.Table[0].ResponseDescription;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/PayRoll/Popups/RegeneratePensionConfirmationPopup.html",
                        size: 'xlg',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                    });

                    $scope.closeModal = function () {
                        $scope.modalInstance.close();
                    }


                }
                else if (res.Table[0].ResponseCode == '400') {
                    //alert(res.Table[0].ResponseDescription);
                    alert('Please Generate MonthlyDays to Generate Monthly Pension')
                    //$scope.GeneratedData = res1;
                }
                else if (res.Table1[0].ResponseCode == '200') {
                    $scope.GetAllGeneratedMontlypension = res.Table;
                    alert(res.Table1[0].ResponseDescription);
                }
                else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


        $scope.ConfirmGenerate = function () {
            $scope.GetAllGeneratedMontlypension = [];
            var generate = PayRollService.GenerateMonthlyPension($scope.FinancialYearID1, $scope.MonthID1, 2)
            generate.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }

                $scope.GetAllGeneratedMontlypension = res.Table;
                $scope.modalInstance.close();



            },
                function (error) {
                    alert("something Went Wrong")


                });

        }











        $scope.getGeneratePensionExcel = function () {
            $scope.loading = true;
            var ReportExcel = PayRollService.GetGeneratePensionExcel(2, $scope.FinancialYearID1, $scope.MonthID1);
            ReportExcel.then(function (res) {
                $scope.loading = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No  Excel Report Present")
                    }
                } else {
                    alert("No Excel Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };


        $scope.getPensionGeneratedReports = function () {
            $scope.loading = true;
            var ReportExcel = PayRollService.GetPensionGeneratedReports($scope.FinancialYearID4, $scope.MonthID4);
            ReportExcel.then(function (res) {
                $scope.loading = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                        $scope.loading = false;
                    } else {
                        alert("No  Excel Report Present")
                    }
                } else {
                    alert("No Excel Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };




















        $scope.ChangeMonth2 = function (data) {
            if (data == undefined || data == "" || data == null) {
                $scope.ClearData1();
            }
            else {
                $scope.ClearData1();
                var generate = PayRollService.PublishMonthlyPensionData(1, $scope.FinancialYearID2, $scope.MonthID2)
                generate.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    } catch (err) { }


                    if (res.Table[0].ResponseCode == '200') {
                        $scope.GetAllPublishMontlypension = res.Table1;

                    }
                    else if (res.Table[0].ResponseCode == '400') {
                        //alert(res.Table[0].ResponseDescription);
                    } else {
                        alert('Something Went Wrong')

                    }
                },
                    function (error) {
                        alert("something Went Wrong")


                    });
            }
        }


        $scope.ClearData1 = function () {
            $scope.GetAllPublishMontlypension = [];


        }




        $scope.publishmonthlypension = function () {


            var Publish = PayRollService.PublishMonthlyPension($scope.FinancialYearID2, $scope.MonthID2)
            Publish.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }


                if (res.Table[0].ResponseCode == '200') {
                    alert(res.Table[0].ResponseDescription);
                    $scope.GetAllPublishMontlypension = res.Table1;

                }
                else if (res.Table[0].ResponseCode == '400') {
                    alert(res.Table[0].ResponseDescription);


                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


        $scope.getPublishedPensionExcel = function () {
            $scope.loading = true;
            var ReportExcel = PayRollService.GetPublishedPensionExcel(2, $scope.FinancialYearID2, $scope.MonthID2);
            ReportExcel.then(function (res) {
                $scope.loading = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No  Excel Report Present")
                    }
                } else {
                    alert("No Excel Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };

        $scope.GeneratePensionPaySlip = function () {
            //  var PaymentStudent = [{"Employeecode":"1025"}]
            // if (PaymentStudent != [] && PaymentStudent != '') {
            $scope.btndisable = true;
            var ApproveStatus = 1;
            $scope.loading = true;


            //  $scope.buttonlabel = "Signing in process ...";
            var GetInterimCertificateTobeSignedlocation = PayRollService.GetPensionPaySlip($scope.FinancialYearID3, $scope.MonthID3)
            GetInterimCertificateTobeSignedlocation.then(function (response) {
                var url = window.location.origin + '/Reports/' + response + '.pdf';
                console.log(url)
                download(url, response+'_Payslip' + '.pdf');
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
