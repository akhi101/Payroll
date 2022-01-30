define(['app'], function (app) {
    app.service("CcicSettingsService", function (DataAccessService) {

        this.getCcicModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/GetCcicModules');
            return promise;
        }


        this.getSubModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/getSubModules');
            return promise;
        }

        this.getCcicModuleColours = function () {
            var promise = DataAccessService.getDataWithPara('api/CCIC/GetCcicModuleColors');
            return promise;
        }

        this.getAllModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/getAllModules');
            return promise;
        }

        this.getAllUserModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/getAllUserModules');
            return promise;
        }

        this.getCcicAllSubModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/getCcicAllSubModules');
            return promise;
        }

        this.getCcicAllUserSubModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/getAllUserSubModules');
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

  

        this.AddModule = function (ModuleName, ModuleOrder, ModuleCardColourID, ModuleRouteName, UserName) {
            var paramObject = {
                "ModuleName": ModuleName, "ModuleRouteName": ModuleRouteName, "ModuleCardClassName": ModuleCardClassName, "ModuleOrder": ModuleOrder, "UserName": UserName
            };
            return DataAccessService.postData('CcicPage/AddModule', paramObject);
        }

        this.AddUserModule = function (UserTypeID, ModuleID) {
            var paramObject = {
                 "UserTypeID": UserTypeID, "ModuleID": ModuleID
            };
            return DataAccessService.postData('CcicPage/AddUserModule', paramObject);
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