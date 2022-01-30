define(['app'], function (app) {
    app.service("CcicAdminService", function (DataAccessService) {


        this.getCcicRecentNews = function () {

            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/getCcicRecentNews');
            return promise;
        }


        this.GetCcicUserTypes = function () {
            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/getCcicUserTypes');
            return promise;

        }

        this.getAllCcicRecentNews = function () {

                var promise = DataAccessService.getDataWithPara('api/CcicAdminService/getAllCcicRecentNews');
                return promise;
            }

        this.CcicRecentNewsInactive = function (RecentNewsID) {
                var paramObj = { "RecentNewsID": RecentNewsID };
                var promise = DataAccessService.getDataWithPara('api/CcicAdminService/CcicRecentNewsInactive', paramObj);
                return promise;
        }

        this.SetCcicModuleInactive = function (UserTypeID, ModuleID, Active) {
            var paramObj = {
                "UserTypeID": UserTypeID, "ModuleID": ModuleID, "Active": Active
            };
            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/SetCcicModuleInactive', paramObj);
            return promise;
        }

        this.PostCcicRecentNews = function (RecentNewsText, FromDate, ToDate, UserName) {
            var paramObj = { "RecentNewsText": RecentNewsText, "FromDate": FromDate, "ToDate": ToDate, "UserName": UserName };
            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/PostCcicRecentNews', paramObj);
                return promise;
            }


           


        this.GetCcicModulesbyRole = function (UserTypeID) {
                var paramObj = { "UserTypeID": UserTypeID };
                var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetCcicModulesbyRole', paramObj);
                return promise;
            }

        this.GetCcicSubModulesbyRole = function (UserTypeID, ModuleID) {
                var paramObj = { "UserTypeID": UserTypeID, "ModuleID": ModuleID };
                var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetCcicSubModulesbyRole', paramObj);
                return promise;
            }

        this.GetAllModulesbyRole = function (UserTypeID) {
                var paramObj = { "UserTypeID": UserTypeID };
                var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetAllModulesbyRole', paramObj);
                return promise;
            }

        
    });
});