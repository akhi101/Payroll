define(['app'], function (app) {
    app.controller("CcicForgetPasswordController", function ($scope, $state, $filter, $stateParams, AppSettings, $crypto, CcicForgetPasswordService) {
        $scope.CcicForgetPassword = {};
        $scope.ShowLoading = false;
        $scope.CcicSavePreDetails = function () {
            $scope.Smsbtndisable = true;
            if (($scope.CcicForgetPassword.UserName == undefined) || ($scope.CcicForgetPassword.UserName == "")) {
                alert("Enter Username");
                return false;
            }

            if (($scope.CcicForgetPassword.UserMobile == undefined) || ($scope.CcicForgetPassword.UserMobile == "")) {
                alert("Enter Mobile Number");
                return false;
            }
            if (($scope.CcicForgetPassword.UserMobile.length < 10) || ($scope.CcicForgetPassword.UserMobile.length > 10)) {
                alert("Invalid Mobile Number");
                return false;
            }
            $scope.UserID = 0;
            $scope.ShowLoading = true;
            let reqdata = $crypto.encrypt($scope.CcicForgetPassword.UserName, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt($scope.CcicForgetPassword.UserMobile, sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
            var getPromise = CcicForgetPasswordService.GetCcicForgetPassword(reqdata);
            getPromise.then(function (data) {
                try {
                    var res = JSON.parse(data);

                } catch (ex) {
                }
                if (res.status == "200") {
                    $scope.Smsbtndisable = false;
                    $scope.ShowLoading = false;

                    var Message = "Dear Sir//Madam, Your Login Credentials: UserName=" + $scope.CcicForgetPassword.UserName + ", UserPassword= " + data[0].UserPassword + " SBTETTS";
                    //var Urlstring = "?User=sbtetts&Passwd=sbtet@1972&Sid=SBTETS&Mobilenumber=91" + data[0].CellNo + "&Message=" + Message + "&Mtype=N&DR`=Y";
                    //  var FinalURL= AppSettings.SMSApiUrl + Urlstring;

                    alert("Login Credentials sent to the registered mobile number. Please check.");
                    RedirectToListPage();
                } else {
                    alert(res.statusdesc);
                    $scope.Smsbtndisable = false;
                    $scope.ShowLoading = false;
                    $scope.RollEditDisable = false;
                }

            }, function (error) {
                $scope.Smsbtndisable = false;
                $scope.ShowLoading = false;
                $scope.RollEditDisable = false;
                try {
                    var res = JSON.parse(error);

                } catch (ex) {
                }
                alert(res.statusdesc);

            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('CcicLogin');
        }
    });
});
