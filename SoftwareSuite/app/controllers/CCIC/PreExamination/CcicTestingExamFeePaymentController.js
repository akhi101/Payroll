define(['app'], function (app) {
    app.controller("CcicTestingExamFeePaymentController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService, CcicPreExaminationService, CcicStudentRegistrationService, $uibModal, PaymentService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        $scope.InstitutionID = authData.InstitutionID;
        $scope.allItemsSelected = false;
        $scope.btndisable = false;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getCcicCurrentAcademicYear();
            $scope.feePaymentType();
        }

        $scope.addData = function (feePaymentDataID, studentID, PIN, feeAmount) {

            return {
                FeePaymentDataID: feePaymentDataID,
                StudentID: studentID,
                PIN: PIN,
                FeeAmount: feeAmount,
            };

        };

        var PaymentStudentList = [];
        $scope.selectEntity = function (data) {

            if (data.isChecked) {
                let list = $scope.addData(data.FeePaymentDataID, data.StudentID, data.PIN, data.FeeAmount);
                PaymentStudentList.push(list);

                var FeeAmount = 0;
                var PIN = [];
                $scope.PaymentStudentList = PaymentStudentList;
                for (i = 0; i < $scope.PaymentStudentList.length; i++) {
                    FeeAmount += parseInt($scope.PaymentStudentList[i].FeeAmount)
                    var obj = {
                        PIN: $scope.PaymentStudentList[i].PIN,
                    }
                    PIN.push(obj)
                }

                $scope.PIN = PIN;
                $scope.feeAmount = FeeAmount;
                if ($scope.PaymentStudentList.length > 0) {
                    $scope.btndisable = false;
                } else {
                    $scope.btndisable = true;
                }
            }
            if (!data.isChecked) {
                function arrayRemove(arr, value) {
                    return arr.filter(function (ele) {
                        return ele.FeePaymentDataID != value;
                    });
                }


                 NewPaymentStudentList = arrayRemove(PaymentStudentList, data.FeePaymentDataID, data.StudentID, data.PIN, data.FeeAmount);
                var FeeAmount = 0;
                var PIN = []
                var FeePaymentDataID = 0;
                $scope.NewPaymentStudentList = NewPaymentStudentList;
                for (i = 0; i < $scope.NewPaymentStudentList.length; i++) {
                    FeeAmount += parseInt($scope.NewPaymentStudentList[i].FeeAmount)
                    var obj = {
                        PIN: $scope.NewPaymentStudentList[i].PIN,
                    }
                    PIN.push(obj)
                }
                $scope.PIN = PIN;
                $scope.feeAmount = FeeAmount;
                $scope.FeePaymentDataID = FeePaymentDataID;
                if ($scope.NewPaymentStudentList.length > 0) {
                    $scope.btndisable = false;
                } else {
                    $scope.btndisable = true;
                }
            }
            for (var i = 0; i < $scope.ExamPayment.length; i++) {
                if (!$scope.ExamPayment[i].isChecked) {
                    $scope.allItemsSelected = false;
                    return;
                }
            }


            $scope.allItemsSelected = true;
        };






        $scope.selectAll = function () {
            PaymentStudentList = [];
            for (var i = 0; i < $scope.ExamPayment.length; i++) {
                $scope.ExamPayment[i].isChecked = $scope.allItemsSelected;
                if ($scope.ExamPayment[i].isChecked) {
                    let list = $scope.addData($scope.ExamPayment[i].FeePaymentDataID, $scope.ExamPayment[i].StudentID, $scope.ExamPayment[i].PIN, $scope.ExamPayment[i].FeeAmount);
                    PaymentStudentList.push(list);


                }
                if (!$scope.ExamPayment[i].isChecked) {
                    function arrayRemove(arr, value) {
                        return arr.filter(function (ele) {
                            return ele.Id != value;
                        });

                    }
                    PaymentStudentList = arrayRemove(PaymentStudentList, $scope.ExamPayment[i].FeePaymentDataID, $scope.ExamPayment[i].StudentID, $scope.ExamPayment[i].PIN, $scope.ExamPayment[i].FeeAmount);

                }
            }
            $scope.PaymentStudentList = PaymentStudentList;

            var FeeAmount = 0;
            var PIN = [];
            for (i = 0; i < $scope.PaymentStudentList.length; i++) {
                FeeAmount += parseInt($scope.PaymentStudentList[i].FeeAmount)
                var obj = {
                    PIN: $scope.PaymentStudentList[i].PIN,
                }
                PIN.push(obj)
            }
            $scope.PIN = PIN;
            $scope.feeAmount = FeeAmount;
            if ($scope.PaymentStudentList.length > 0) {
                $scope.btndisable = false;
            } else {
                $scope.btndisable = true;
            }
        };

        $scope.Proceed = function () {
            $scope.btndisable = true;
            if ($scope.PIN == '' || $scope.PIN == undefined || $scope.PIN == null) {
                alert('Plese select Pin/s');
                $scope.btndisable = false;
                return;
            }
            var obj =
            {
                "TotalAmount": $scope.feeAmount,
                "ApplicationCount": $scope.PaymentStudentList.length,
                "AppData": $scope.PaymentStudentList
            }

            $scope.AppCount = $scope.PaymentStudentList.length;
            $scope.PINS = $scope.PIN;
            $scope.AmountPayable = $scope.feeAmount;

            //$scope.AmountPayable = $scope.feeAmount;
            //$scope.AppCount = $scope.PaymentStudentList.length;
            //$scope.ChalanaNo = res.challanaNo;
            $scope.Paybtndisable = false;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "app/views/CCIC/Popups/ConfirmStudentDetails.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });



        }



        $scope.Confirm = function () {
            $scope.modalInstance.close();
            $scope.btndisable = true;
            var obj =
            {
                "TotalAmount": $scope.feeAmount,
                "ApplicationCount": $scope.PaymentStudentList.length,
                "AppData": $scope.PaymentStudentList,
                "AcademicYearID": $scope.AcademicYear,
                "ExamMonthYearID": $scope.ExamMonthYear,
                "FeePaymentTypeID": $scope.FeePaymentType,
                "UserName": $scope.UserName
            }


            var postMultiplePayments = CcicStudentRegistrationService.PostMultiplePaymentData(obj);
            postMultiplePayments.then(function (response) {
                // $scope.openModel();

                $scope.btndisable = false;
                //var res = JSON.parse(response);
                if (response.Table[0].StatusCode == "200") {
                    $scope.AmountPayable = response.Table[0].Amount;
                    $scope.AppCount = response.Table[0].ApplicationCount;
                    $scope.ChallanNumber = response.Table[0].ChallanNumber;
                    $scope.FeeType = response.Table[0].FeeType;
                    $scope.Paybtndisable = false;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "app/views/CCIC/Popups/ChalanDetails.html",
                        size: 'xlg',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                    });

                } else {
                    $scope.StatusMessage = "Server Error!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    $scope.btndisable = false;
                }
            },
                function (error) {
                    $scope.StatusMessage = "Server Error!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    $scope.btndisable = false;
                    console.log(error);

                });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };



        $scope.PayAmount = function () {

            $scope.noteChallan = false;
            $scope.secondClick = false;
            //var marchantid = "TSSBTET"; // live
            var marchantid = "TSSBTET"; // test

            var addInfo1 = $scope.UserName;
            var addInfo3 = $scope.FeeType;//PaymentType;
            var addInfo4 = "BULK";
            //var addInfo5 = "NA";//Semester;
            var addInfo6 = "NA";
            var addInfo7 = "NA";
            var amount = $scope.AmountPayable;
            if ($scope.FeePaymentType == 1) {
                addInfo5 = "REGULAR"
            }
            else if ($scope.FeePaymentType == 2) {
                addInfo5 = "BACKLOG"
            }
            else if ($scope.FeePaymentType == 3) {
                addInfo5 = "REGISTRATION"
            }
            

            var subMarchantid = "TSCCIC";
            $localStorage.CcicPaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "CcicDashboard.PreExamination.TesTingFeePayment"
            }
            $localStorage.CcicPaymentGatewayResponse = redirecturl;

            var location = window.location.origin;


            PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.ChallanNumber, amount, 0, "json");
            var proceedfinePayment = PaymentService.getSomeValue(location + "/Payment/BulkBillResponse", $scope.ChallanNumber);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                    //   var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                console.log(err);
            });
        }



        $scope.ChangeAcaYr = function (AcademicYearID) {
            $scope.AcademicYearID = AcademicYearID;
            $scope.GetExamMonthYearData(AcademicYearID);
        }

        $scope.ChangeExmmonthYr = function (ExamMonthYear) {
            $scope.ExamMonthYearID = ExamMonthYear;
        }

        $scope.ChangeFeeType = function (FeePaymentType) {
            $scope.FeePaymentTypeID = FeePaymentType;
        }





        $scope.verifyDates = function () {
            $scope.loading = true;
            var VerifyDate = CcicPreExaminationService.VerifyFeePaymentDate($scope.AcademicYearID, $scope.ExamMonthYearID);
            VerifyDate.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) {

                }
                if (Res[0].ResponseCode == '200') {
                    $scope.showPaymentDetails();
                } else if (Res[0].ResponseCode == '400') {
                    alert(Res[0].ResponseDescription)
                    $state.go("CcicDashboard.PreExamination.FeePayment")

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.getCcicCurrentAcademicYear = function () {
            var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
            getCcicCurrentAcademicYear.then(function (response) {

                $scope.GetCcicCurrentAcademicYear = response;

            },
                function (error) {
                    alert("error while loading CurrentAcademicYear");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetExamMonthYearData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            $scope.AcademicYearID = AcademicYearID;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYear = res.Table;
                }
                else {
                    $scope.GetExamMonthYear = [];
                }
                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }

        $scope.feePaymentType = function () {
            var LoadfeepaymentType = CcicPreExaminationService.GetFeePaymentType();
            LoadfeepaymentType.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.FeePaymentTypeData = response.Table;

                } else {
                    $scope.FeePaymentTypeData = [];
                }
            },
                function (error) {
                    alert("error while Data");
                    console.log(error);
                });

        }

        $scope.showPaymentDetails = function () {
            $scope.ExamPayment = null;
            $scope.loading = true;
            var getAdmissionsubmod = CcicPreExaminationService.getPayExamFee($scope.InstitutionID, $scope.AcademicYearID, $scope.ExamMonthYearID, $scope.FeePaymentTypeID, $scope.UserName);
            getAdmissionsubmod.then(function (Usersdata) {

                if (Usersdata.length > 0) {
                    $scope.isShowResults = true;
                    $scope.dataBackLog = false;

                    for (var i = 0; i < Usersdata.length; i++) {
                        Usersdata[i].isChecked = false;
                    }

                    $scope.ExamPayment = Usersdata;
                    $scope.loading = false;
                    $scope.NoData = false;
                }
                else {
                    $scope.NoData = true;
                    $scope.loading = false;
                    $scope.AcademicModules = [];
                    //alert("No Data Found");
                }

            }, function (err) {
                $scope.isShowResults = false;
            });


        }



    })
})