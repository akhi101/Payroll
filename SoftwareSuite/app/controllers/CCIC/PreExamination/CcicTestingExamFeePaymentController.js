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
                $scope.PIN = [];
                $scope.PaymentStudentList = PaymentStudentList;
                for (i = 0; i < $scope.PaymentStudentList.length; i++) {
                    FeeAmount += parseInt($scope.PaymentStudentList[i].FeeAmount)
                    var obj = {
                        PIN: $scope.PaymentStudentList[i].PIN,
                    }
                    $scope.PIN.push(obj)
                }


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
                        return ele.Id != value;
                    });
                }
                PaymentStudentList = arrayRemove(PaymentStudentList, data.FeePaymentDataID, data.StudentID, data.PIN, data.FeeAmount);
                var FeeAmount = 0;
                $scope.PaymentStudentList = PaymentStudentList;
                for (i = 0; i < $scope.PaymentStudentList.length; i++) {
                    FeeAmount += parseInt($scope.PaymentStudentList[i].FeeAmount)
                    var obj = {
                        PIN: $scope.PaymentStudentList[i].PIN,
                    }
                    $scope.PIN.push(obj)
                }
                $scope.feeAmount = FeeAmount;
                if ($scope.PaymentStudentList.length > 0) {
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
            for (i = 0; i < $scope.PaymentStudentList.length; i++) {
                FeeAmount += parseInt($scope.PaymentStudentList[i].FeeAmount)
                var obj = {
                    PIN: $scope.PaymentStudentList[i].PIN,
                }
                $scope.PIN.push(obj)
            }
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
                alert('Plese select PIN/s');
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

        //$scope.PayAmount = function () {
        //    //$scope.noteChallan = false;
        //    //$scope.secondClick = false;
        //    //var marchantid = "TSSBTET"; // live
        //    var marchantid = "TSSBTET"; // test
        //    var addInfo1 = $scope.UserName;
        //    var addInfo3 = "NA";
        //    var addInfo4 = "NA";//$scope.loadedScheme.Scheme;
        //    //if ($scope.Student.id == 1) {
        //    var addInfo5 = $scope.FeeType;
        //    //}
        //    //var addInfo5 = $scope.current_schemeid;//Semester;
        //    var addInfo6 = "Bulk"//$scope.Examtype;
        //    var addInfo7 = "NA";
        //    var amount = $scope.AmountPayable.toFixed(2) == null || $scope.AmountPayable.toFixed(2) == "" ? $scope.AmountPayable.toFixed(2) : $scope.AmountPayable.toFixed(2);
        //    var subMarchantid = "TSCCIC";
        //    $localStorage.PaymentGatewayResponse = {};
        //    redirecturl = {
        //        redirecturl: "CcicDashboard.PreExamination.FeePayment"
        //    }
        //    $localStorage.PaymentGatewayResponse = redirecturl;
        //    //$localStorage.assessment.redirecturl = 'Dashboard.AssessmentDashboard.Assessment.TheorySubjectList';
        //    //localhost:65321/Payment/BulkBillResponse
        //    //'sbtet.telangana.gov.in/API/Payment/BulkBillResponse'
        //    var location = window.location.origin;
        //    CcicPreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount, $scope.Student.id, JSON.stringify(PaymentStudent));

        //    var proceedfinePayment = PaymentService.getHashValue(location + "/Payment/BulkBillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount);
        //    proceedfinePayment.then(function (resp) {
        //        if (resp != "" && resp != undefined) {
        //            // var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg="
        //            var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
        //            //var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg=KALYANTEST|429|NA|2|NA|NA|NA|INR|NA|R|kalyantest|NA|NA|F|8850062965|test-developer@candere.com|187|NA|NA|NA|NA|http://127.0.0.1/candere_repo/scheme/billdesk/response|9F4E06C08698DA6338428E2A36141826468E8E31C83F3B814F831AE6D6D27CFD";
        //            //   var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
        //            window.location.replace(req);
        //        }
        //    }, function (err) {
        //        $scope.noteChallan = false;
        //        $scope.secondClick = true;
        //        console.log(err);
        //    });
        //}


        $scope.PayAmount = function () {
            //if ($scope.Student.id == 2) {
            //    if ($scope.UpdatedContactDetail == null || $scope.UpdatedContactDetail == "" || $scope.UpdatedContactDetail == undefined) {
            //        alert("Please update the mobile number before you proceed.");
            //        return;
            //    }
            //}

            var College_Code = "admin";
            $scope.noteChallan = false;
            $scope.secondClick = false;
            //var marchantid = "TSSBTET"; // live
            var marchantid = "TSSBTET"; // test
            //try {
            //    College_Code = authData.College_Code == null ? "admin" : authData.College_Code;
            //} catch (err) {
            //}
            var addInfo1 = $scope.UserName;
            var addInfo3 = "NA";
            var addInfo4 = "NA"//$scope.loadedScheme.Scheme;t
            var addInfo5 = $scope.FeeType;//Semester;
            var addInfo6 = "SINGLE"//PaymentType;
            var addInfo7 = "NA";
            var amount = "";
            //if ($scope.Student.id == 1) {
            //    addInfo5 = "REGULAR";
            //    amount = $scope.AmountDB.toFixed(2) == null || $scope.AmountDB.toFixed(2) == "" ? $scope.studentTotalFee.toFixed(2) : $scope.AmountDB.toFixed(2);

            //}
            //else if ($scope.Student.id == 2) {
            //    amount = $scope.FinalAmountDB.toFixed(2);
            //    addInfo5 = "BACKLOG";
            //    addInfo4 = $scope.Sems;
            //}
            //else if ($scope.Student.id == 999) {
            //    var addInfo3 = $scope.Studentpin;
            //    var addInfo4 = $scope.getUserData.CurrentSemester == null || $scope.getUserData.CurrentSemester == "" ? "NA" : $scope.getUserData.CurrentSemester;//previous sem;
            //    var addInfo5 = "PROMOTIONAL";
            //    var addInfo7 = $scope.getUserData.Scheme == null || $scope.getUserData.Scheme == "" ? "NA" : $scope.getUserData.Scheme;//Scheme;;
            //    var amount = $scope.AmountDB.toFixed(2) == null || $scope.AmountDB.toFixed(2) == "" ? $scope.studentTotalFee.toFixed(2) : $scope.AmountDB.toFixed(2);
            //    amount = $scope.FinalAmountDB.toFixed(2);
            //}
            var subMarchantid = "TSCCIC";
            $localStorage.PaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "index.DiplomaFeePayment"
            }
            $localStorage.PaymentGatewayResponse = redirecturl;

            var location = window.location.origin;


            PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount, 0, "json");
            var proceedfinePayment = PaymentService.getSomeValue(location + "/Payment/BulkBillResponse", $scope.challan);
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