define(['app'], function (app) {
    app.service("AdminService", function (DataAccessService) {

        this.GetUserTypes = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getUserTypes');
            return promise;
        }

        this.GetUsers = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetUsers');
            return promise;
        }

        this.GetAllUsers = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetAllUsers');
            return promise;
        }

       

        this.GetWebSiteVisiterCount = function () {
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetWebSiteVisiterCount');
            return promise;
        }
        
        
       
        this.getNotifications = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getNotifications');
            return promise;
        }

        

        this.getUserType = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getUserType');
            return promise;
        }

        
        this.GetNotificationByUser = function (usertypeid) {
            var paramObj = { "usertypeid": usertypeid };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetNotificationByUser', paramObj);
            return promise;
        }
        
        this.GetModulesbyRole = function (usertypeid) {
            var paramObj = { "usertypeid": usertypeid };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetModulesbyRole', paramObj);
            return promise;
        }

        this.GetAllModulesbyRole = function (usertypeid) {
            var paramObj = { "usertypeid": usertypeid };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetAllModulesbyRole', paramObj);
            return promise;
        }

        this.GetNotificationsActiveByUser = function (UserTypeId) {
            var paramObj = { "UserTypeId": UserTypeId };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetNotificationsActiveByUser', paramObj);
            return promise;
        }

        this.GetSubModulesbyRole = function (usertypeid, moduleid) {
            var paramObj = { "usertypeid": usertypeid, "moduleid": moduleid };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetSubModulesbyRole', paramObj);
            return promise;
        }


        this.SetSubModuleInactive = function (usertypeid,moduleId,SubModuleId,IsActive) {
            var paramObj = {
                "usertypeid": usertypeid, "moduleId": moduleId,"SubModuleId":SubModuleId,"IsActive":IsActive 
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/SetSubModuleInactive', paramObj);
            return promise;
        }

        this.SetModuleInactive = function (usertypeid, moduleId, IsActive) {
            var paramObj = {
                "usertypeid": usertypeid, "moduleId": moduleId, "IsActive": IsActive
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/SetModuleInactive', paramObj);
            return promise;
        }

        
        

        this.NotificationInactive = function (Id) {
            var paramObj = { "Id": Id };
            var promise = DataAccessService.getDataWithPara('api/AdminService/NotificationInactive', paramObj);
            return promise;
        }

        this.PostNotification = function (NotificationData) {           
            var paramObj = { "Json": NotificationData };
            var promise = DataAccessService.postData('api/AdminService/PostNotification', paramObj);
            return promise;
        };


        this.getUserIdStatus = function (UserName) {
            var paramObj = { "UserName": UserName };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetUserIdStatus', paramObj);
            return promise;
        }

        this.getCircularsList = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/getCirculars');
            return promise;
        }

    })
})