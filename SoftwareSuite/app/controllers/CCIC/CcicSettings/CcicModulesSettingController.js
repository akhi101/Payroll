define(['app'], function (app) {
    app.controller("CcicModulesSettingController", function ($scope, $http, $localStorage, $state, AppSettings, CcicAdminService, CcicSystemUserService, CcicSettingsService) {
        const $ctrl = this

        //$ctrl.$onInit = () => {
        //    $scope.UserTypeID = $localStorage.moduleData.UserTypeID
        //    $scope.ModuleID = $localStorage.moduleData.ModuleID
        //    $scope.getSubModules()
        //    $scope.getUserSubModules()
        //}

        var authData = $localStorage.authorizationData;
        $scope.UserTypeID = authData.UserTypeID
        $ctrl.$onInit = () => {
            $scope.result = false;

            $scope.getUserModules();
        }
        var GetAllCcicModules = CcicSettingsService.GetAllCcicModules();
        GetAllCcicModules.then(function (response) {
            if (response.Table.length > 0) {
                $scope.modules = response.Table;
            }
        },
            function (error) {
                alert("error while loading Modules");
               var err = JSON.parse(error);

            });

        var GetCcicModuleColours = CcicSettingsService.GetCcicModuleColours();
        GetCcicModuleColours.then(function (response) {
            if (response.Table.length > 0) {
                $scope.ModuleCardColours = response.Table;
            }
        },
            function (error) {

                var err = JSON.parse(error);

            });


        var GetAllCcicModules = CcicSettingsService.GetAllCcicModules();
        GetAllCcicModules.then(function (response) {
            if (response.Table.length > 0) {
                $scope.GetAllCcicModules = response.Table;
            }
        },
            function (error) {
                alert("error while loading Modules");
                var err = JSON.parse(error);

            });
        $scope.getUserModules = function () {
            var GetAllCcicUserModules = CcicSettingsService.GetAllCcicUserModules();
            GetAllCcicUserModules.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.GetAllCcicUserModules = response.Table;
                }
            },
                function (error) {
                    alert("error while loading Modules");
                    var err = JSON.parse(error);

                });

        }
        var GetCcicModules = CcicSettingsService.GetCcicModules();
        GetCcicModules.then(function (response) {
            if (response.Table.length > 0) {
                $scope.GetCcicModules = response.Table;
            }
        },
            function (error) {
                alert("error while loading Modules");
                var err = JSON.parse(error);

            });




        $scope.GetAllModulesbyRoles = function () {
            var getModues = CcicAdminService.GetAllCcicModulesbyRole($scope.UserTypeID);
            getModues.then(function (response) {
                if (response.length > 0) {
                    $scope.modules = response;
                    $scope.result = true;
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                    $scope.result = false;
                });
        };

        $scope.Switchmodule = function (ModuleID, Active) {

            $scope.UserTypeID = authData.UserTypeID
            $scope.UserTypeID = authData.UserTypeID

            if (Active == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }

            var SetModues = CcicAdminService.SetCcicModuleInactive($scope.UserTypeID, ModuleID, Active);
            SetModues.then(function (response) {
                alert(response[0].Message);
                $scope.GetAllModulesbyRoles();
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        };

        $scope.AddCcicModule = function () {
            var SetModues = CcicSettingsService.AddCcicModule($scope.ModuleName, $scope.ModuleCardColourID, $scope.ModuleRouteName);
            SetModues.then(function (response) {
                alert(response[0].Message);
                $scope.GetAllCcicModules();
                alert('Module Added Succesfully')
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }

        $scope.InactiveUserModule = function (ModuleID, Active, UserTypeID) {
            if (IsActive == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }

            var SetModues = CcicSettingsService.CcicUserModuleInactive(ModuleID, Active, UserTypeID);
            SetModues.then(function (response) {
                alert('Status Changed Successfully')
                $scope.getUserModules();
            },
                function (error) {
                    var err = JSON.parse(error);
                })
        };

        $scope.AddCcicUserModule = function () {
            var SetModues = CcicSettingsService.AddCcicUserModule($scope.UserTypeID, $scope.ModuleID);
            SetModues.then(function (response) {
                if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                } else {
                    alert('User Module Added Successfully')
                    $scope.getUserModules();
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }




        var GetCcicUserTypes = CcicAdminService.GetCcicUserTypes();
        GetCcicUserTypes.then(function (response) {

            $scope.UserTypes = response.Table
        },
            function (error) {
                var err = JSON.parse(error);
            });

        $scope.GetAllCcicModules = function () {
            var GetAllCcicModules = CcicAdminService.GetAllCcicModules;
            GetAllCcicModules.then(function (response) {
                if (response.length > 0) {
                    $scope.modules = response;
                    $scope.result = true;
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                    $scope.result = false;
                });
        }

        $scope.OpenCcicSubmodules = function (ModuleID) {
            $localStorage.moduleData = {
                UserTypeID: $scope.UserTypeID,
                ModuleID: ModuleID
            }
            $state.go("CcicDashboard.Settings.CcicSubModuleSettings");
        }


        $scope.AddSubModule = function () {
            var AddModules = MasterSettingsService.AddSubModules($scope.ModuleId, $scope.ColourId, $scope.SubModule, $scope.SubModuleRouteName);
            AddModules.then(function (response) {
                alert('Sub Module Changed Successfully')
                $scope.getSubModules()
                var getModues = MasterSettingsService.getAllSubModules();
                getModues.then(function (response) {
                    if (response.Table.length > 0) {
                        //     console.log(response);
                        $scope.getAllSubModules = response.Table;
                        // $scope.result = true;
                    }
                },
                    function (error) {
                        alert("error while loading Modules");
                        var err = JSON.parse(error);

                    });
                $scope.getUserSubModules()

                //$scope.getUserSubModules()
            },
                function (error) {
                    alert("error while loading Modules");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                })
        }


        $scope.getSubModules = function () {
            var getModues = AdminService.GetSubModulesbyRole($scope.usertypeId, $scope.ModuleId);;
            getModues.then(function (response) {
                console.log(response)
                $scope.SubModules = response;
            },
                function (error) {
                    alert("error while loading Modules");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }
        var GetCcicSubModules = CcicSettingsService.GetCcicSubModules();
        GetCcicSubModules.then(function (response) {
            if (response.Table.length > 0) {
                console.log(response);
                $scope.GetCcicSubModules = response.Table;
                // $scope.result = true;
            }
        },
            function (error) {
                alert("error while loading Modules");
                var err = JSON.parse(error);

            });

        var GetCcicModuleColours = CcicSettingsService.GetCcicModuleColours();
        GetCcicModuleColours.then(function (response) {
            if (response.Table.length > 0) {
                console.log(response);
                $scope.GetCcicModuleColours = response.Table;
                // $scope.result = true;
            }
        },
            function (error) {
                alert("error while loading Modules");
                var err = JSON.parse(error);

            });

        var GetCcicModules = CcicSettingsService.GetCcicModules();
        GetCcicModules.then(function (response) {
            if (response.Table.length > 0) {
                //     console.log(response);
                $scope.GetCcicModules = response.Table;
                // $scope.result = true;
            }
        },
            function (error) {
                alert("error while loading Modules");
                var err = JSON.parse(error);

            });

        var GetAllCcicSubModules = CcicSettingsService.GetAllCcicSubModules();
        GetAllCcicSubModules.then(function (response) {
            if (response.Table.length > 0) {
                //     console.log(response);
                $scope.GetAllCcicSubModules = response.Table;
                // $scope.result = true;
            }
        },
            function (error) {
                alert("error while loading Modules");
                var err = JSON.parse(error);

            });
        $scope.getUserSubModules = function () {
            var getModues = CcicSettingsService.getAllUserSubModules();
            getModues.then(function (response) {
                if (response.Table.length > 0) {
                    //     console.log(response);
                    $scope.getAllUserSubModules = response.Table;
                    // $scope.result = true;
                }
            },
                function (error) {
                    alert("error while loading Modules");
                    var err = JSON.parse(error);

                });
        }

        $scope.ChangeModules = function (ModuleId) {
            var SetModues = CcicSettingsService.GetSubmodulesByModule(ModuleId);
            SetModues.then(function (response) {
                if (response.length > 0) {
                    $scope.GetSubModulesByModule = response;
                } else {
                    alert('No Sub-Modules Found')
                }

            },
                function (error) {
                    alert("error while loading SubModules");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                })
        }

        $scope.SubModuleInactive = function (ModuleId, IsActive, UserTypeId) {
            //alert(IsActive)
            if (IsActive == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }

            var SetModues = CcicSettingsService.UserSubModuleInactive(ModuleId, Active, UserTypeId);
            SetModues.then(function (response) {
                alert('Status Changed Successfully')
                $scope.getUserSubModules()

            },
                function (error) {
                    alert("error while loading Modules");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                })
        };



        var GetCcicUserTypes = CcicAdminService.GetCcicUserTypes();
        GetCcicUserTypes.then(function (response) {
            // $scope.ActiveSemesters = response.Table;

            $scope.UserTypes = response.Table
        },
            function (error) {
                alert("error while loading User Types");
                var err = JSON.parse(error);
                console.log(err.Message);
            });


        $scope.AddUserSubModule = function (userTypeId, ModuleId, SubModuleId) {


            //alert($scope.userTypeId)
            var SetSubModues = MasterSettingsService.AddUserSubModule(userTypeId, ModuleId, SubModuleId);
            SetSubModues.then(function (response) {
                if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                } else {
                    // console.log(response);
                    alert('User Sub Module Added Succesfully')
                    $scope.getUserSubModules()
                }


            },
                function (error) {
                    alert("error while loading Modules");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                })
        }




        $scope.SwitchSubmodule = function (SubModuleId, IsActive) {
            //alert(SubModuleId);
            //alert(IsActive)
            if (IsActive == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }
            //console.log(usertypeId, ModuleId, SubModuleId, Active)
            var SetModues = AdminService.SetSubModuleInactive($scope.usertypeId, $scope.ModuleId, SubModuleId, Active);
            SetModues.then(function (response) {
                console.log(response)
                // $scope.SubModules = response;
                alert(response[0].Message);
                $scope.getSubModules();
            },
                function (error) {
                    alert("error while loading Modules");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                })
        };


    })
})