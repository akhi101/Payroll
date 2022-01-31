define(['app'], function (app) {
    app.service("CcicSettingsService", function (DataAccessService) {

        this.GetCcicModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/GetCcicModules');
            return promise;
        }


        this.GetCcicSubModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/GetCcicSubModules');
            return promise;
        }

        this.GetCcicModuleColours = function () {
            var promise = DataAccessService.getDataWithPara('api/CCIC/GetCcicModuleColours');
            return promise;
        }

        this.GetAllCcicModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/GetAllCcicModules');
            return promise;
        }

        this.GetAllCcicUserModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/GetAllCcicUserModules');
            return promise;
        }

        this.GetAllCcicSubModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/GetAllCcicSubModules');
            return promise;
        }

        this.GetAllCcicUserSubModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/GetAllCcicUserSubModules');
            return promise;
        }

        this.CcicUserSubModuleInactive = function (UserSubModuleID, UserTypeID, ModuleID, SubModuleID, Active) {
            var paramObject = {
                "UserSubModuleID": UserSubModuleID, "Active": Active, "UserTypeID": UserTypeID, "ModuleID": ModuleID, "SubModuleID": SubModuleID
            };
            return DataAccessService.postData('CcicPage/CcicUserSubModuleInactive', paramObject);
        }

        this.GetCcicSubmodulesByModule = function (ModuleID) {
            var paramObject = {
                "ModuleID": ModuleID
            };
            return DataAccessService.postData('CcicPage/GetCcicSubmodulesByModule', paramObject);
        }

   


        this.UserModuleInactive = function (ModuleID, UserModuleID, UserTypeID, Active) {
            var paramObject = {
                "ModuleID": ModuleID, "UserModuleID": UserModuleID, "UserTypeID": UserTypeID, "Active": Active
            };
            return DataAccessService.postData('CcicPage/UserModuleInactive', paramObject);
        }

  

        this.AddCcicModule = function (ModuleName, ModuleOrder, ModuleCardColourID, ModuleRouteName, UserName) {
            var paramObject = {
                "ModuleName": ModuleName, "ModuleRouteName": ModuleRouteName, "ModuleCardColourID": ModuleCardColourID, "ModuleOrder": ModuleOrder, "UserName": UserName
            };
            return DataAccessService.postData('CcicPage/AddCcicModule', paramObject);
        }

        this.AddCcicUserModule = function (UserTypeID, ModuleID) {
            var paramObject = {
                 "UserTypeID": UserTypeID, "ModuleID": ModuleID
            };
            return DataAccessService.postData('CcicPage/AddCcicUserModule', paramObject);
        }

        this.AddCcicSubModules = function (SubModuleID, SubModuleName, SubModuleRouteName, ModuleCardColourID, SubModuleOrder) {
            var paramObject = {
                "SubModuleID": SubModuleID, "SubModuleName": SubModuleName, "SubModuleRouteName": SubModuleRouteName, "ModuleCardColourID": ModuleCardColourID, "SubModuleOrder": SubModuleOrder
            };
            return DataAccessService.postData('CcicPage/AddCcicSubModules', paramObject);
        }


        this.AddCcicUserSubModule = function (UserSubModuleID, UserTypeID, ModuleID, SubModuleID) {
            var paramObject = {
                "UserSubModuleID": UserSubModuleID, "UserTypeID": UserTypeID, "ModuleID": ModuleID, "SubModuleID": SubModuleID
            };
            return DataAccessService.postData('CcicPage/AddCcicUserSubModule', paramObject);
        }


    })
})