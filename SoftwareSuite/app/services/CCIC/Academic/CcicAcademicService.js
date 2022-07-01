define(['app'], function (app) {
    app.service("CcicAcademicService", function (DataAccessService) {

        this.VerifyEnrollmentDate = function () {
            return DataAccessService.getDataWithPara('api/CcicAcademic/VerifyEnrollmentDate');
        };



    });
});