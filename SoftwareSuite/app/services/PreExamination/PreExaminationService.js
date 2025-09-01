define(['app'], function (app) {
    app.service("PreExaminationService", function (DataAccessService) {
        this.GetHomePageSlidesActive = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetHomePageSlidesActive');
        };

        this.GetStudentServicesCounts = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetStudentServicesCounts');
        };
       
        this.GenerateOtpForMobileNoUpdate = function (Pin, Phone) {
            var param = { "Pin": Pin, "Phone": Phone }
            return DataAccessService.getDataWithPara('api/PreExamination/GenerateOtpForMobileNoUpdate', param);
        };

        this.UpdateUserdata = function (Pin, StudentPhoneNumber, OTP) {
            var param = {
                "Pin": Pin,
                "StudentPhoneNumber": StudentPhoneNumber,
                "OTP": OTP
            }
            return DataAccessService.getDataWithPara('api/PreExamination/UpdateUserdata', param);
        };

    });
});