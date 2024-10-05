define(['app'], function (app) {
    app.service("PreExaminationService", function (DataAccessService) {
        this.GetHomePageSlidesActive = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetHomePageSlidesActive');
        };

        this.GetStudentServicesCounts = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetStudentServicesCounts');
        };
       


    });
});