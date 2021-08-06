define(['app'], function (app) {
    app.controller("DetailedExpenditureController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout,Excel , PreExaminationService) {
        $scope.hideTrue = false;
        var loadHallticket = PreExaminationService.GetExamMonthYear();
        loadHallticket.then(function (response) {
            var response = JSON.parse(response)
            if (response.Table.length > 0) {
                $scope.GetExamMonthYear = [];
                $scope.GetExamMonthYear = response.Table;
            } else {
                $scope.GetExamMonthYear = [];
                alert("No Exam Month Year found");
            }
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);
            });

        var LoadExamTypeBysem = PreExaminationService.getStudentType();

        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentTypes = response.Table;
            } else {
                $scope.StudentTypes = [];
                alert("No Exam Types found.");
            }
        },
        function (error) {
            alert("error while loading Exam Types");
            console.log(error);
        });

        var LoadAcademicYears = PreExaminationService.GetAcademicYears();
        LoadAcademicYears.then(function (response) {
            if (response.Table.length > 0) {
                $scope.GetAcademicYears = response.Table;
            } else {
                $scope.GetAcademicYears = [];
                alert("No Exam Types found.");
            }
        },
        function (error) {
            alert("error while loading Exam Types");
            console.log(error);
        });

        $scope.ChangeData = function () {
            $scope.hideTrue = false;
        }

        $scope.GetDetails = function () {
            $scope.hideTrue = false;
            $scope.LoadImg = true;
            $scope.NoResult = false;          
            var loadDates = PreExaminationService.GetDcBillsAbstract($scope.monthyear, $scope.AcademicYear, $scope.ExaminationType);
            loadDates.then(function (res) {
                try { var response = JSON.parse(res); } catch (err) { }
                if (response.Table6.length > 0 || response.Table8.length > 0 || response.Table2.length > 0 || response.Table3.length > 0) {                
                    $scope.PracticalExpenditureReport = response.Table6; 
                    $scope.PracticalStudentCount = response.Table5
                    if (response.Table5.length > 0) {
                        $scope.PracticalExpenditureReport = _.map($scope.PracticalExpenditureReport, function (item) {
                            return _.extend(item, _.findWhere($scope.PracticalStudentCount, { ExamCenterCode: item.ExamCenterCode, SubjectCode: item.SubjectCode }));
                        });
                    }
                    $scope.EventExpenditureReport = response.Table8;
                    $scope.TheoryExpenditureReport = response.Table2;
                    $scope.SeatingReport = response.Table3;
                    if (response.Table3.length >0) {
                        $scope.EventExpenditureReport = _.map($scope.EventExpenditureReport, function (item) {
                            return _.extend(item, _.findWhere($scope.SeatingReport, { ExamCenterCode: item.ExamCenterCode }));
                        });
                    }
                   
                    $scope.LoadImg = false;
                    $scope.NoResult = false;
                    $scope.hideTrue = true;
                } else {
                    $scope.TheoryExpenditureReport = [];
                    $scope.EventExpenditureReport = [];
                    $scope.PracticalExpenditureReport = [];
                    alert("Data not found");
                    $scope.LoadImg = false;
                    $scope.NoResult = true;    
                }
            },
            function (error) {
                alert("Data not found");
                console.log(error);
                $scope.LoadImg = false;
                $scope.NoResult = true;   
            });

        }

        

        $scope.DownloadtoExcel = function (tableid) {
            var Mnthyrlbl = "";
            var Studlbl = "";
            $scope.GetExamMonthYear.forEach(function (item) {
                if ($scope.monthyear == item.Id) {
                    Mnthyrlbl = item.ExamYearMonth;
                }
            });
            $scope.StudentTypes.forEach(function (item1) {
                if ($scope.ExaminationType == item1.id) {
                    Studlbl = item1.type;
                }
            });        
            var exportHref = Excel.tableToExcel(tableid, Mnthyrlbl + '_' + Studlbl+'_'+'Theory_Expenditure');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();            
                a.download = Mnthyrlbl + '_' + Studlbl + '_' +"Theory_Expenditure.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

        $scope.DownloadtoExcel1 = function (tableid) {
            var Mnthyrlbl = "";
            var Studlbl = "";
            $scope.GetExamMonthYear.forEach(function (item) {
                if ($scope.monthyear == item.Id) {
                    Mnthyrlbl = item.ExamYearMonth;
                }
            });
            $scope.StudentTypes.forEach(function (item1) {
                if ($scope.ExaminationType == item1.id) {
                    Studlbl = item1.type;
                }
            }); 
            var exportHref = Excel.tableToExcel(tableid, Mnthyrlbl + '_' + Studlbl + '_' +'Practical_Expenditure');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = Mnthyrlbl + '_' + Studlbl + '_' +"Practical_Expenditure.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

        $scope.DownloadtoExcel2 = function (tableid) {
            var Mnthyrlbl = "";
            var Studlbl = "";
            $scope.GetExamMonthYear.forEach(function (item) {
                if ($scope.monthyear == item.Id) {
                    Mnthyrlbl = item.ExamYearMonth;
                }
            });
            $scope.StudentTypes.forEach(function (item1) {
                if ($scope.ExaminationType == item1.id) {
                    Studlbl = item1.type;
                }
            }); 
            var exportHref = Excel.tableToExcel(tableid, Mnthyrlbl + '_' + Studlbl + '_' +'Event_Expenditure');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = Mnthyrlbl + '_' + Studlbl + '_' +"Event_Expenditure.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }
    })

    app.factory('Excel', function ($window) {
        //alert("hello");
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId);
                ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });
})