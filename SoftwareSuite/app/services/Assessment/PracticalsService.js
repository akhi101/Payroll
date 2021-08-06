define(['app'], function (app) {
    app.service("PracticalsService", function (DataAccessService) {     
        this.getSemSubjects = function (semid, branchCode, loadedScheme, subType, examTypeid, collegecode, StudentTypeId, AcademicYearId) {
            var paramObject = {
                "semid": semid, "branchCode": branchCode, "loadedScheme": loadedScheme, "subType": subType, "examTypeid": examTypeid, "collegecode": collegecode,
                "studenttypeid": StudentTypeId, "AcademicYearId": AcademicYearId
            };
            return DataAccessService.getDataWithPara('Assessment/getSemSubjects', paramObject);

        }
    });
});