define(['app'], function (app) {
    app.service("CcicAdminService", function (DataAccessService) {
        this.getRecentNews = function () {

            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/getRecentNews');
            return promise;
        }


        this.GetCcicRecentNewsByUser = function (UserTypeID) {
            var paramObj = { "UserTypeID": UserTypeID };
            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetCcicRecentNewsByUser', paramObj);
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


    });
});