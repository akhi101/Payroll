define(['app'], function (app) {
    app.controller("PayrollEmployeeLoginController", function ($scope, $http, $localStorage, $state, $window, AppSettings, PayRollService, SystemUserService, PreExaminationService, $crypto) {

        sessionStorage.loggedIn = "no";
        $scope.login = {
            Mobile: "",
            password: ""
        }
        $scope.Mobilemessage = "";
        $scope.passwordmessage = "";
        $scope.message = "";

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.loginEKey = res;
            sessionStorage.Ekey = res;

        });
        $scope.SendSmsData = true;
        $scope.VerifySmsData = false;

        $scope.SendSms = function () {
            //if ($scope.StudentPhoneNumber != null && $scope.StudentPhoneNumber != undefined && $scope.StudentPhoneNumber.length == '10') {
            //    if ($scope.OldSudent) {
            //        var Pin = $scope.PinNumber;
            //    } else {
            //        var Pin = $scope.userData.Pin;
            //    }
                $scope.Otp = true;
            $scope.NoOtp = false;
            var GenerateOtpForMobile = PayRollService.GenerateOtpForMobileNoUpdate('Pin', $scope.Login.Mobile)
                GenerateOtpForMobile.then(function (response) {
                    try {
                        var detail = JSON.parse(response);
                    } catch (err) { }
                    if (detail.status == '200') {
                        alert(detail.description);
                        $scope.SendSmsData = false;
                        $scope.VerifySmsData = true;
                        $scope.Otp = true;
                        $scope.NoOtp = false;
                    } else {
                        alert(detail.description);
                        $scope.SendSmsData = true;
                        $scope.VerifySmsData = false;
                        $scope.Otp = false;
                        $scope.NoOtp = true;
                    }
                }, function (error) {
                    alert('error occured while sending OTP');
                    $scope.SendSmsData = true;
                    $scope.VerifySmsData = false;
                    $scope.Otp = false;
                    $scope.NoOtp = true;
                })

            //} else if ($scope.StudentPhoneNumber == null || $scope.StudentPhoneNumber == undefined) {
            //    alert("Please Enter Mobile Number");
            //} else if ($scope.StudentPhoneNumber.length != '10') {
            //    alert('Enter valid Mobile number');
            //} else {
            //    alert("Please Enter Mobile Number");
            //}
        }

        $scope.VerifySms = function () {
            if ($scope.Login.Otp == null || $scope.Login.Otp == "" || $scope.Login.Otp == undefined) {
                alert('Please Enter OTP.');
                return;
            }
            if ($scope.Login.Otp.length != '6') {
                alert('Please Enter valid OTP.');
                return;
            }
           
            var UpdateUserdata = PreExaminationService.UpdateUserdata('Pin', $scope.Login.Mobile, $scope.Login.Otp)
            UpdateUserdata.then(function (response) {

                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res.Table[0].StatusCode == '200') {
                    alert(res.Table[0].StatusDescription);
                    $state.go('Dashboard');
                    $scope.phonenoupdated = true;
                    $scope.Verified = true;
                } else {
                    alert(res.Table[0].StatusDescription);
                    $scope.phonenoupdated = false;
                    $scope.Verified = false;
                }
            }, function (error) {
                alert('error occured while updating Mobile number.');
                $scope.phonenoupdated = false;
                $scope.Verified = false;
            });


        }

        $scope.Login = function () {
            delete $localStorage.authorizationData;

            //  $scope.message = "Invalid Mobile And Password";           
            //if ($scope.Login.Captcha == undefined || $scope.Login.Captcha == "") {
            //    $scope.Login.Captcha = "";
            //    alert("Enter Captcha");
            //    return;
            //};

            if ($scope.Login.Mobile == undefined) {
                $scope.Login.Mobile = ""
            };
            if ($scope.Login.Otp == undefined) {
                $scope.Login.Otp = ""
            };

            if ($scope.Login.Mobile == "" && $scope.Login.Otp == "") {
                $scope.Mobilemessage = "* Enter user name";
                $scope.passwordmessage = "* Enter password";
                alert("Enter Mobile And Password");
                return;
            }
            if ($scope.Login.Mobile == "") {
                $scope.Mobilemessage = "* Enter user name";
                alert("Enter Mobile");
                return;
            }
            else if ($scope.Login.Otp == "") {
                $scope.passwordmessage = "* Enter password";
                alert("Enter Password");
                return;
            }
            else {
                if ($scope.Login.Captcha == $scope.newCapchaCode) {
                    // alert("Valid Captcha");
                } else {
                    alert("Invalid Captcha. try Again");
                    $scope.Login.Captcha = "";
                    $scope.createCaptcha();
                    return;
                }

                if ($scope.Login.Otp !== null && $scope.Login.Mobile !== null) {

                    var data = $crypto.encrypt($scope.Login.Otp, $scope.loginEKey) + "$$@@$$" + $crypto.encrypt($scope.Login.Mobile, $scope.loginEKey) + "$$@@$$" + $scope.loginEKey;
                    $http.post(AppSettings.WebApiUrl + 'api/SystemUser/GetEmployeeLogin', data, {}).then(function (response) {
                        //console.log(response)
                        $scope.LoadImg = true;
                        var UserRights = [];
                        sessionStorage.loggedIn = "yes";
                        $localStorage.authToken = response.data.token + "$$@@$$" + $scope.loginEKey;
                        var status = response.data.data.UserAuth[0].ResponceCode;
                        if (status != "200") {
                            alert(response.data.data.UserAuth[0].RespoceDescription);
                            return;
                        } else {
                            // $http.post(AppSettings.WebApiUrl + 'api/SystemUser/ValidateReCaptcha?encodedResponse ='+$scope.reCaptchaToken, {}).then(
                            //     function (response) {
                            //         if (response) {

                            //         } else{
                            //             return;
                            //         }
                            //     },
                            //     function () {
                            //         return;
                            //     });

                            res = response.data.data.SystemUser[0];
                            $localStorage.authorizationData = {
                                token: $localStorage.authToken,
                                SysUserID: res.UserId,
                                College_Code: res.CollegeCode,
                                College_Name: res.CollegeName,
                                UserName: res.UserName,
                                SystemUserTypeId: res.UserTypeId,
                                Mobile: $scope.Login.Mobile.toUpperCase(),
                                CollegeID: res.CollegeId,
                                BranchCode: res.BranchCode,
                                BranchId: res.BranchId,

                                CollegeCatName: "",
                                Clg_Type: "",
                                SectionId: "",
                                SchemeId: "",
                                SemesterId: "",
                                //BranchCode: "",
                                AcademicId: "",
                                percentage: "",
                                //TypeFlag: response.data.TypeFlag,
                                //MngtTypID: response.data.MngtTypID,
                                //SysUsrGrpID: response.data.SysUsrGrpID,
                                //SeqNo: response.data.SeqNo,



                            };
                            //console.log(response.data)
                            try {
                                $localStorage.authorizationData = {
                                    token: $localStorage.authToken,
                                    SysUserID: res.UserId,
                                    College_Code: res.CollegeCode,
                                    College_Name: res.CollegeName,
                                    UserName: res.UserName,
                                    SystemUserTypeId: res.UserTypeId,
                                    Mobile: $scope.Login.Mobile.toUpperCase(),
                                    CollegeID: res.CollegeId,
                                    BranchCode: res.BranchCode,
                                    BranchId: res.BranchId,

                                    CollegeCatName: "",
                                    Clg_Type: "",
                                    SectionId: "",
                                    SchemeId: "",
                                    SemesterId: "",
                                    //BranchCode: "",
                                    AcademicId: "",
                                    percentage: "",
                                    //TypeFlag: response.data.TypeFlag,
                                    //MngtTypID: response.data.MngtTypID,
                                    //SysUsrGrpID: response.data.SysUsrGrpID,
                                    //SeqNo: response.data.SeqNo,



                                };
                                $state.go('Dashboard');
                            } catch (err) {

                            }
                            //   $state.go('Dashboard');
                        }

                        //AppSettings.ExportToExcelUrl = response.data.ExportToExcelUrl;
                        //AppSettings.ExportToWordUrl = response.data.ExportToWordUrl;
                        //AppSettings.ExportToPdfUrl = response.data.ExportToPdfUrl;
                        //AppSettings.LoggedUserId = response.data.SysUserID;
                        //AppSettings.LoginName = response.data.LoginName;
                        //AppSettings.CollegeID = response.data.CollegeID;
                        //AppSettings.SysUsrGrpID = response.data.SysUsrGrpID;
                        //AppSettings.PrevAdmNo = response.data.PrevAdmNo;
                        //AppSettings.AcdYrID = response.data.AcdYrID;
                        //AppSettings.TypeFlag = response.data.TypeFlag;
                        //AppSettings.UserRights = UserRights;
                        //AppSettings.Mobile = $scope.login.Mobile;
                        //AppSettings.MngtTypID = response.data.MngtTypID;
                        //AppSettings.SysUsrGrpID = response.data.SysUsrGrpID;
                        //AppSettings.SeqNo = response.data.SeqNo;
                        //AppSettings.DistrictIDs = response.data.DistrictIDs;
                        //AppSettings.ColCode = response.data.ColCode;
                        //AppSettings.College_Code = response.data.college_code;
                        //AppSettings.College_Name = response.data.college_name;
                        //AppSettings.SystemUserTypeId = response.data.systemusertypeid;
                        //AppSettings.BranchId = response.data.branchid;

                        //  $state.go('Dashboard');

                        //   });
                        $state.go('Dashboard');
                    }, function (error) {
                        // alert('error occured while updating Mobile number.');
                        $scope.phonenoupdated = false;
                        $scope.Verified = false;
                    })
                    //  $state.go('Dashboard');
                }
                //  $state.go('Dashboard');
            }
        }

        $scope.ForgetPasswordChange = function () {
            $state.go('ForgetPassword');
        }


        $("#Mobile").focus();
        $scope.ClearErrorText = function ($event) {
            $scope.Mobilemessage = "";
            $scope.passwordmessage = "";
            $scope.message = "";
        };
        $scope.$on('onUnload', function (e) {
            delete $localStorage.authorizationData;
            sessionStorage.loggedIn = "no";
        });
        $scope.Loginboclogin = function () {
            $state.go('login');
        }
    });

});