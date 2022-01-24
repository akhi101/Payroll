define(['app'], function (app) {
    app.controller("CcicChangePasswordController", function ($scope, $state, $filter, $localStorage, $stateParams, $crypto, AppSettings, CcicChangePasswordService, MenuService, CcicSystemUserService) {

        var authData = $localStorage.authorizationData;

        $scope.userType = authData.SystemUserTypeID;
        $scope.UserName = authData.UserName;

        AppSettings.UserName = authData.UserName;
        AppSettings.LoggedUserId = authData.SysUserID;



      
        $scope.CcicChangePassword = {};
        $scope.shownewpassword = false;
        $scope.CcicCheckOldPassword = function () {
            if (($scope.OldPassword == undefined) || ($scope.OldPassword == "")) {
                alert("Enter Old Password");
                return false;
            }
            let reqdata = $crypto.encrypt($scope.OldPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(AppSettings.LoggedUserId.toString(), sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
            var getPromise = CcicChangePasswordService.GetCcicCheckOldPassword(reqdata);
            getPromise.then(function (data) {
                if (data == 0) {
                    alert("Invalid Old Password");
                    return;
                } else {
                    $scope.shownewpassword = true;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.CcicSaveChangePassword = function () {
            if (($scope.OldPassword == undefined) || ($scope.OldPassword == "")) {
                alert("Enter Old Password");
                return;
            }

            if (($scope.NewPassword == undefined) || ($scope.NewPassword == "")) {
                alert("Enter New Password");
                return;
            }
            if (($scope.ConfirmPassword == undefined) || ($scope.ConfirmPassword == "")) {
                alert("Enter Confirm Password");
                return;
            }
            if ($scope.NewPassword != $scope.ConfirmPassword) {
                alert("New Password and Confirm Password did not match.");
                return;
            }
            let reqdata = $crypto.encrypt($scope.NewPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt($scope.OldPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(AppSettings.CcicLoggedUserId.toString(), sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
            var getPromise = CcicChangePasswordService.GetCcicChangePassword(reqdata);
            getPromise.then(function (data) {
                if (data.ResponceCode == "200") {
                    alert(data.ResponceDescription);
                    RedirectToListPage();
                } else {
                    alert(data.ResponceDescription);
                    $scope.OldPassword = "";
                    $scope.NewPassword = "";
                    $scope.ConfirmPassword = "";
                }

            }, function (error) {
                alert(error);
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('CcicLogin');
        }
        $scope.logOut = function () {

            sessionStorage.loggedIn = "no";
            sessionStorage.clear();
            delete $localStorage.authorizationData;
            var logUser = CcicSystemUserService.PostCcicUserLogout($scope.UserName);
            logUser.then(function (response) {
                console.log(response);
            }, function (err) {
                alert(err);
            });
            var InsertLoginList = MenuService.GetUpdateLogoutInfo(AppSettings.LoggedUserId, $scope.UserName);
            InsertLoginList.then(function (Districtdata, status, headers, config, error) {
            }, function (error) {
                alert(error);
            });
            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""
            };
            $state.go('CcicLogin')
        }
    });
});

