define(['app'], function (app) {
    app.controller("CcicExamFeePaymentController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, CcicPreExaminationService, $uibModal, PaymentService) {
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
        $scope.allItemsSelectedthing = false;
        var PaymentStudentList = [];
        var PaymentStudent = [];

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getCcicCurrentAcademicYear();
            $scope.feePaymentType();
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

        $scope.selectEntity = function (data) {
            $scope.allItemsSelectedthing = false;
            if (data != null) {
              
                if (!PaymentStudentList.includes(data.PIN)) {
                    dataPay = {};
                    dataPay.PIN = data.PIN;
                    dataPay.ExaminationFee = data.ExaminationFee;
                    dataPay.StudentName = data.StudentName;
                    dataPay.StudentMobile = data.StudentMobile;
                    dataPay.UserName = authData.UserName;
                    dataPay.FeePaymentTypeID = $scope.FeePaymentTypeID;
                    dataPay.FeePaymentTypeName = $scope.FeePaymentTypeName;
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.PIN);
                    console.log(PaymentStudentList)
                }
                else if (PaymentStudentList.includes(data.PIN)) {
                    PaymentStudentList.remByVal(data.PIN);
                    PaymentStudent.remElementByVal(data.PIN);
                    if (PaymentStudentList.length == 0) {
                        $scope.allItemsSelectedthing = false;
                    }
                }

            }

        };

        //$scope.selectAll = function () {
        //    $scope.allItemsSelectedthing = true;
        //    if ($scope.isAllchecked == true) {

        //        $scope.isAllchecked = false;


        //        for (var i = 0; i < $scope.ExamPayment.length; i++) {
        //            $scope.ExamPayment[i].isChecked = false;
        //        }
        //        PaymentStudent = [];
        //        PaymentStudentList = [];
        //    }
        //    else if ($scope.isAllchecked == false) {

        //        for (var i = 0; i < $scope.ExamPayment.length; i++) {
        //            if ($scope.ExamPayment[i].IsFeedbackSubmitted === 1) {
        //                dataPay = {};

        //                dataPay.PIN = $scope.ExamPayment[i].PIN;
        //                dataPay.ExaminationFee = $scope.ExamPayment[i].ExaminationFee;
        //                dataPay.StudentMobile = $scope.ExamPayment[i].StudentMobile;
        //                dataPay.UserName = authData.UserName;
        //                dataPay.FeePaymentTypeID = $scope.FeePaymentTypeID;
        //                dataPay.FeePaymentTypeName = $scope.FeePaymentTypeName;
        //                dataPay.StudentName = $scope.ExamPayment[i].StudentName;
        //                dataPay.ExamFee = $scope.ExamPayment[i].ExamFee;
        //                PaymentStudent.push(dataPay);
        //                PaymentStudentList.push($scope.ExamPayment[i].PIN);

        //                $scope.ExamPayment[i].isChecked = true;
        //                $scope.isAllchecked = true;
        //            } else if ($scope.ExamPayment[i].IsFeedbackSubmitted === 0) {
        //                $scope.ExamPayment[i].isChecked = false;
        //                //alert("Please Submit All Students Feedback to Pay Fee")
        //                //return;
        //            }

        //        }


        //        //for (var i = 0; i < $scope.ExamPayment.length; i++) {

        //        //}


        //        $scope.PaymentStudentList = PaymentStudentList;

        //    };

        //}

        $scope.payNow = function () {
            if (PaymentStudentList.length > 0) {
                sum = 0;
                for (var i = 0; i < PaymentStudent.length; i++) {
                    sum += PaymentStudent[i].ExaminationFee;
                }
                $scope.sum = sum;

                console.log(PaymentStudentList);
                console.log(JSON.stringify(PaymentStudent));

                //$scope.total = PaymentStudentList.length;
                //$scope.PaymentStudent = PaymentStudent;


                var getChallanDetails = PreExaminationService.getChanllanForExamFee(JSON.stringify(PaymentStudent).toString(), $scope.ExamMonthYearId);
                getChallanDetails.then(function (Usersdata) {
                    $scope.userJsonData = JSON.parse(Usersdata);
                    if ($scope.userJsonData.Table.length > 0) {
                        $scope.challan = $scope.userJsonData.Table[0].ChalanaNumber;
                        $scope.PaymentStudent = $scope.userJsonData.Table;
                        $scope.AmountDB = $scope.userJsonData.Table1[0].TotalAmount;
                        $scope.total = $scope.userJsonData.Table.length;
                        if (PaymentStudentList.length > 0) {
                            $scope.modalInstance = $uibModal.open({
                                templateUrl: "/app/views/TotalExampaymentPopup.html",
                                size: 'xlg',
                                scope: $scope,
                                windowClass: 'modal-fit-att',
                                //backdrop: 'static',
                            });
                        }
                        else {
                            $scope.noPaymentelected = false;
                        }

                    }
                    else {
                        alert("Some thing Went Wrong");
                    }
                }, function (err) {
                    $scope.isShowResults = false;
                    console.log(err);
                });
            }
            else
                alert("Select any student to pay");
        }



        $scope.verifyDates = function () {
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
            var getAdmissionsubmod = CcicPreExaminationService.getPayExamFee($scope.InstitutionID, $scope.AcademicYearID, $scope.ExamMonthYearID, $scope.FeePaymentTypeID, $scope.UserName);
            getAdmissionsubmod.then(function (Usersdata) {
                console.log(Usersdata)

                if (Usersdata.length > 0) {
                    $scope.isShowResults = true;
                    $scope.dataBackLog = false;

                    for (var i = 0; i < Usersdata.length; i++) {
                        Usersdata[i].isChecked = false;
                    }

                    $scope.ExamPayment = Usersdata;
                }
                else {
                    $scope.NoData = true;
                    $scope.AcademicModules = [];
                    //alert("No Data Found");
                }

            }, function (err) {
                $scope.isShowResults = false;
            });

        
    }

       

    })
})