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
              var code;
        //  function createCaptcha() {
        //clear the contents of captcha div first 
        $scope.createCaptcha = function () {
            $scope.newCapchaCode = "";
            document.getElementById('captcha').innerHTML = "";
            var charsArray =
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
            var lengthOtp = 6;
            var captcha = [];
            for (var i = 0; i < lengthOtp; i++) {
                //below code will not allow Repetition of Characters
                var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
                if (captcha.indexOf(charsArray[index]) == -1)
                    captcha.push(charsArray[index]);
                else i--;
            }
            var canv = document.createElement("canvas");
            canv.id = "captcha";
            canv.width = 150;
            canv.height = 50;
            var ctx = canv.getContext("2d");
            ctx.font = "25px Georgia";
            ctx.strokeText(captcha.join(""), 0, 30);
            //storing captcha so that can validate you can save it somewhere else according to your specific requirements
            $scope.newCapchaCode = captcha.join("");
            document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
        }
        //function validateCaptcha() {
        //    event.preventDefault();
        //    debugger

        //}


        $scope.validateRecaptcha = function (token) {
            $http.post(AppSettings.WebApiUrl + 'api/SystemUser/ValidateReCaptcha?encodedResponse=' + token, {}).then(
                function (response) {
                    if (response.data) {

                    } else {
                        //  return;
                    }
                },
                function () {
                    // return;
                });

        }
        $window.validateRecaptcha = $scope.validateRecaptcha;


        $scope.validateMobile = function () {
            var mobilePattern = /^[6-9]\d{9}$/; // Strict Indian format: 10 digits, starts with 6-9
            var value = $scope.Login.Mobile || '';

            if (mobilePattern.test(value)) {
                $scope.correctMobile = true;
                $scope.incorrectMobile = false;
            } else {
                $scope.correctMobile = false;
                $scope.incorrectMobile = true;
            }
        };

        $scope.SendSmsData = true;
        $scope.VerifySmsData = false;

        $scope.SendSms = function () {
            //if ($scope.StudentPhoneNumber != null && $scope.StudentPhoneNumber != undefined && $scope.StudentPhoneNumber.length == '10') {
            //    if ($scope.OldSudent) {
            //        var Pin = $scope.PinNumber;
            //    } else {
            //        var Pin = $scope.userData.Pin;
            //    }
            if ($scope.Login.Mobile == "" || $scope.Login.Mobile == undefined || $scope.Login.Mobile == null) {
                alert("Please enter Mobile Number");
                return;
            }
            $scope.Otp = true;
            $scope.NoOtp = false;

            $scope.loader = true;
            $scope.disablesmsButton = true;
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
                        $scope.loader = false;
                        $scope.disablesmsButton = false;
                    } else {
                        alert(detail.description);
                        $scope.SendSmsData = true;
                        $scope.VerifySmsData = false;
                        $scope.Otp = false;
                        $scope.NoOtp = true;
                        $scope.loader = false;
                        $scope.disablesmsButton = false;
                    }
                }, function (error) {
                    alert('error occured while sending OTP');
                    $scope.SendSmsData = true;
                    $scope.VerifySmsData = false;
                    $scope.Otp = false;
                    $scope.NoOtp = true;
                    $scope.loader = false;
                    $scope.disablesmsButton = false;
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
                    $scope.loader1 = true;
                    $scope.disableLogin = true;
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
                            $scope.loader1 = false;
                            $scope.disableLogin = false;
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

                            res = response.data.data.SystemUser1[0];
                            $localStorage.authorizationData = {
                                token: $localStorage.authToken,
                                SystemUserTypeId: res.UserTypeID,
                                SysUserID: res.EmployeeID,
                                EmployeeCode: res.EmployeeCode,
                                UserName: res.EmployeeName,
                                Mobile: $scope.Login.Mobile.toUpperCase(),
                            };
                            //console.log(response.data)
                            try {
                                $localStorage.authorizationData = {
                                    token: $localStorage.authToken,
                                    SystemUserTypeId: res.UserTypeID,
                                    SysUserID: res.EmployeeID,
                                    EmployeeCode: res.EmployeeCode,
                                    UserName: res.EmployeeName,
                                    Mobile: $scope.Login.Mobile.toUpperCase(),
                                };
                                $scope.loader1 = false;
                                $scope.disableLogin = false;
                                $state.go('EmployeeDashboard');
                            } catch (err) {

                            }
                            //   $state.go('Dashboard');
                        }


                        $state.go('EmployeeDashboard');
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