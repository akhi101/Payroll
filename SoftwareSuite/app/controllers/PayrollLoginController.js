define(['app'], function (app) {
    app.controller("PayrollLoginController", function ($scope, $http, $localStorage, $state, $window, AppSettings, SystemUserService, $crypto) {

        sessionStorage.loggedIn = "no";
        $scope.login = {
            UserName: "",
            password: ""
        }
        $scope.UserNamemessage = "";
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

        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.Login();
            }
        }
        $scope.LoadImg = false;
        $scope.loginToken = "";
        $scope.loginEKey = "";

        $scope.Login = function () {
            delete $localStorage.authorizationData;

            //  $scope.message = "Invalid UserName And Password";           
            if ($scope.Login.Captcha == undefined || $scope.Login.Captcha == "") {
                $scope.Login.Captcha = "";
                alert("Enter Captcha");
                return;
            };

            if ($scope.Login.UserName == undefined) {
                $scope.Login.UserName = ""
            };
            if ($scope.Login.UserPassword == undefined) {
                $scope.Login.UserPassword = ""
            };

            if ($scope.Login.UserName == "" && $scope.Login.UserPassword == "") {
                $scope.UserNamemessage = "* Enter user name";
                $scope.passwordmessage = "* Enter password";
                alert("Enter UserName And Password");
                return;
            }
            if ($scope.Login.UserName == "") {
                $scope.UserNamemessage = "* Enter user name";
                alert("Enter UserName");
                return;
            }
            else if ($scope.Login.UserPassword == "") {
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

                if ($scope.Login.UserPassword !== null && $scope.Login.UserName !== null) {

                    var data = $crypto.encrypt($scope.Login.UserPassword, $scope.loginEKey) + "$$@@$$" + $crypto.encrypt($scope.Login.UserName, $scope.loginEKey) + "$$@@$$" + $scope.loginEKey;
                    $http.post(AppSettings.WebApiUrl + 'api/SystemUser/GetUserLogin', data, {}).then(function (response) {
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
                            //console.log(response.data)
                            try {
                                $localStorage.authorizationData = {
                                    token: $localStorage.authToken,
                                    SysUserID: res.UserId,
                                    College_Code: res.CollegeCode,
                                    College_Name: res.CollegeName,
                                    SystemUserTypeId: res.UserTypeId,
                                    UserName: $scope.Login.UserName.toUpperCase(),
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
                            $state.go('Dashboard');
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
                        //AppSettings.UserName = $scope.login.UserName;
                        //AppSettings.MngtTypID = response.data.MngtTypID;
                        //AppSettings.SysUsrGrpID = response.data.SysUsrGrpID;
                        //AppSettings.SeqNo = response.data.SeqNo;
                        //AppSettings.DistrictIDs = response.data.DistrictIDs;
                        //AppSettings.ColCode = response.data.ColCode;
                        //AppSettings.College_Code = response.data.college_code;
                        //AppSettings.College_Name = response.data.college_name;
                        //AppSettings.SystemUserTypeId = response.data.systemusertypeid;
                        //AppSettings.BranchId = response.data.branchid;

                        $state.go('Dashboard');

                    });
                    $state.go('Dashboard');
                };
                $state.go('Dashboard');
            }
            $state.go('Dashboard');
        }
        $scope.ForgetPasswordChange = function () {
            $state.go('ForgetPassword');
        }


        $("#UserName").focus();
        $scope.ClearErrorText = function ($event) {
            $scope.UserNamemessage = "";
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