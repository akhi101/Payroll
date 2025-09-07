define(['app'], function (app) {
    app.controller("EmployeeDashboardController", function ($scope, $stateParams, $localStorage, $state, AppSettings, SystemUserService, AdminService) {
        $scope.$on('showLoading', function (evt, data) {
            $('.overlayCss').css('display', 'block');
        });

        $scope.$on('hideLoading', function (evt, data) {
            $('.overlayCss').css('display', 'none');
        });
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.Payroll');
        } else {
            $scope.userName = authData.UserName;
            $scope.userType = authData.SystemUserTypeId;
            $scope.UserId = authData.SysUserID;
            var getNotifications = AdminService.GetNotificationByUser($scope.userType);
            getNotifications.then(function (response) {

                $scope.Notification = response;
            },
                function (error) {
                    alert("error while loading Notification");
                    var err = JSON.parse(error);
                });

           
            $scope.College_Name = authData.College_Name == "" || authData.College_Name == null ? "" : authData.College_Name;
            var UserTypeId = parseInt($scope.userType);
            var UserRightsdata = SystemUserService.GetModulesbyRole(UserTypeId);
            UserRightsdata.then(function (Usersdata, status, headers, config, error) {
                UserRights = Usersdata;
                var modulesList = [];
                var moduleroutename = "";
                if (Usersdata.length > 0) {
                    for (var i = 0; i < Usersdata.length; i++) {
                        //  if (moduleroutename != Usersdata[i].ModuleRouteName) {
                        var obj = {};
                        obj.SysModName = Usersdata[i].ModuleName;
                        obj.SysModID = Usersdata[i].Id;
                        obj.ModuleRouteName = Usersdata[i].ModuleRouteName;
                        obj.ModuleImageClass = Usersdata[i].Class;
                        modulesList.push(obj);
                        //    moduleroutename = UsersRightsdata[i].ModuleRouteName;
                        //   }
                    }
                    $scope.modulesList = modulesList;
                } else {
                    $scope.modulesList = [];
                }

                AppSettings.UserRights = UserRights;


            }, function (error) {
                $scope.modulesList = [];
            });


            var getNotifications = AdminService.GetNotificationByUser($scope.userType);
            getNotifications.then(function (response) {
                $scope.Notification = response;
                if (response.Table !== undefined) {
                    $scope.getNotification = response.Table[0].Notification;
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });



            $scope.SeatArrangGen = function () {
                var link = document.createElement("a");
                link.download = "test.pdf";
                link.target = "_blank";
                var c = authData.ColCode;
                link.href = "http://bie.telangana.gov.in/tsbieweb/pdf/" + c + "_SPREG.PDF";
                link.click();

            }
            $scope.SeatArrangVoc = function () {
                var link = document.createElement("a");
                link.download = "test.pdf";
                link.target = "_blank";
                var c = authData.ColCode;
                link.href = "http://bie.telangana.gov.in/tsbieweb/pdf/" + c + "_SPVOC.PDF";
                link.click();

            }





            $scope.ChangePassword = function () {
                $state.go('Dashboard.ChangePassword');
            }
            $scope.$on('onBeforeUnload', function (e, confirmation) {
                confirmation.message = "If you refresh or close browser, your session will expire and all data will be lost";
                e.preventDefault();
            });


            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            var moduleroutename = "";

            $scope.adminuser = false;

            $scope.OpenModule = function (Module) {
                $localStorage.selectedModule = {
                    Id: Module.SysModID,
                    ModuleRouteName: Module.ModuleRouteName
                }
                $state.go("Dashboard." + Module.ModuleRouteName);
            }


            $scope.logOut = function () {
                sessionStorage.loggedIn = "no";
                delete $localStorage.authorizationData;

                $scope.authentication = {
                    isAuth: false,
                    UserId: 0,
                    userName: ""
                };
                $state.go('index.Payroll')
            }

        }


    });
});