define(['app'], function (app) {
    app.service("SystemUserService", function (DataAccessService) {
      
        this.GetSystemUserById = function (SysUserID) {
            var paramObject = { "SysUserID": SysUserID };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetSystemUserById', paramObject);
            return promise;
        }

        this.GetModulesbyRole = function (UserTypeId) {
            var paramObject = { "UserTypeId": UserTypeId };
            var promise = DataAccessService.getDataWithPara('SystemEntityRights/GetModulesbyRole', paramObject);
            return promise;
        }
        this.GetSubModulesbyRole = function (UserTypeId, moduleId) {
            var paramObject = { "UserTypeId": UserTypeId, "moduleId": moduleId };
            var promise = DataAccessService.getDataWithPara('SystemEntityRights/GetSubModulesbyRole', paramObject);
            return promise;
        }
        this.GetUserRightsById = function (SysModID, SysUsrGrpID) {
            //var data = DataAccessService.getDataAll('api/SystemUser/GetSystemUserList');
            //return data;
            var paramObject = { "SysModID": SysModID, "SysUsrGrpID": parseInt(SysUsrGrpID) };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetUsersRightsById', paramObject);
            return promise;
            // var data = DataAccessService.getDataAll('api/BasicSubCaste/GetBasicSubCasteList');
            //return data;
        }
        this.postUserLogin = function (userName) {
            var paramObject = { "UserName": userName };
            var promise = DataAccessService.postData('api/SystemUser/PostLoginLog', paramObject);
            return promise;
        }
        this.postUserLogout = function (userName) {
            var paramObject = { "UserName": userName };
            var promise = DataAccessService.postData('api/SystemUser/PostLogoutLog', paramObject);
            return promise;
        }
        this.GetUserLoginPermissions = function (username, password) {
            var paramObject = { "username": username, "password": password };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetUserLoginPermissions', paramObject);
            return promise;
        }
        this.GetSubModules = function (username, moduleid) {
            var paramObject = { "UserName": userName, "moduleid": moduleid };
            var promise = DataAccessService.getDataWithPara('api/SystemUser/GetSubModules', paramObject);
            return promise;
        }
        this.GetEKey = function () {
            var promise = DataAccessService.getDataAll('api/SystemUser/GetEKey');
            return promise;
        }

        this.GetSessionEKey = function () {
            var promise = DataAccessService.getDataAll('api/SystemUser/GetSessionEKey');
            return promise;
        }
      
        this.GetForgotPassword = function (reqdata) {
            var paramObject = reqdata;
            var promise = DataAccessService.postData('api/SystemUser/GetForgotPassword', paramObject);
            return promise;
        }

       
    });
});