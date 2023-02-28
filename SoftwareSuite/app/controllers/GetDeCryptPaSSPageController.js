define(['app'], function (app) {
    app.controller("GetDeCryptPaSSPageController", function ($scope, SystemUserService, ForgetPasswordService, $crypto, $scope, $crypto) {
        const $ctrl = this;
        $ctrl.$onInit = () => {

        }

        var sessioneKey = SystemUserService.GetSessionEKey();
        sessioneKey.then(function (res) {
            $scope.LoginSessionEKey = res;
            sessionStorage.SessionEkey = res;

        });
        $scope.UserTypeID = 1;


        $scope.Submit = function () {

            var reqdata = $crypto.encrypt($scope.UserName, $scope.LoginSessionEKey) + "$$@@$$" + $scope.LoginSessionEKey;
            var getPromise = ForgetPasswordService.GetForgotPassword(reqdata);
            getPromise.then(function (data) {

                $scope.Password = data;
                alert($scope.Password);
                $scope.UserName = null;



            });
        }




    })
})