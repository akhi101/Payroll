define(['app'], function (app) {
    app.controller("FacultyMappingReportController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, Excel, $timeout, $uibModal, AcademicService, PreExaminationService) {
        var authData = $localStorage.authorizationData;
        //console.log(authData)
        var ccode = "";
        $scope.UserTypeId = authData.SystemUserTypeId
        if ($scope.UserTypeId == 1) {
            $scope.CollegeCode = 'Admin'
            ccode = 'Admin'
        } else if ($scope.UserTypeId == 1010) {
            $scope.CollegeCode = 'ASIT'
            ccode = 'Admin'
        }
        else if ($scope.UserTypeId == 5) {
            $scope.CollegeCode = 'Helpdesk'
            ccode = 'Admin'
        }else if ($scope.UserTypeId == 1000) {
            $scope.CollegeCode = 'SECRETARY'
            ccode = 'Admin'
        } else if ($scope.UserTypeId == 1009) {
            $scope.CollegeCode = 'COE'
            ccode = 'Admin'
        } else if ($scope.UserTypeId == 1014) {
            $scope.CollegeCode = 'DS_Academic'
            ccode = 'Admin'
        
    } else if ($scope.UserTypeId == 1002) {
        $scope.CollegeCode = 'DS_PostExam'
        ccode = 'Admin'
    } else {
            $scope.CollegeCode = authData.College_Code
            ccode = authData.College_Code
            $scope.CollegeCode = ccode;
        }

        if ($scope.UserTypeId == 2) {


            $scope.Submit = function () {
                $scope.loading = true;
                var getReport = AcademicService.getAdminSyllabusReports($scope.Scheme, $scope.Shift, $scope.CollegeCode);
                getReport.then(function (response) {
                    if (response.Table.length > 0) {
                        //  $scope.FacultyMappingReport = response.Table;
                        $scope.loading = false;
                        $scope.FacultyMappingReport1 = response.Table1;
                        $scope.data1 = true;
                        $scope.data = false;
                        console.log(response)
                        $scope.Noresult = false;
                    } else {
                        $scope.loading = false;
                        $scope.Noresult = true;
                        $scope.data1 = false;
                        $scope.data = false;
                    }
                },
                    function (error) {
                        $scope.loading = false;
                        $scope.Noresult = true;
                        $scope.data1 = false;
                        $scope.data = false;
                        alert("error while loading Report");
                        var err = JSON.parse(error);
                        $scope.result = false;
                        console.log(err.Message);
                    });
            }
        }


        $scope.Submit = function () {
            $scope.loading = true;
            var getReport = AcademicService.getAdminSyllabusReports($scope.Scheme, $scope.Shift, $scope.CollegeCode);
            getReport.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    $scope.FacultyMappingReport = response.Table;
                    $scope.data = true;
                    $scope.Noresult = false;
                    console.log(response)

                } else {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.data1 = false;
                    $scope.data = false;
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.data = false;
                    $scope.Noresult = true;
                    alert("error while loading Report");
                    var err = JSON.parse(error);
                    $scope.result = false;
                    console.log(err.Message);
                });
        }

        $scope.Shifts = [{ "Id": 1, "Shift": 'Shift 1' },
        { "Id": 2, "Shift": 'Shift 2' }]

        var getScheme = AcademicService.getScheme();
        getScheme.then(function (response) {
            $scope.GetSemester = response.Table;

        },
            function (error) {
                alert("error while loading Report");

            });

        $scope.GetFactultyMappingExcel = function () {

            $scope.reload = true;

            var loadData1 = PreExaminationService.GetFactultyMappingExcel($scope.Scheme, $scope.Shift, $scope.CollegeCode)
            loadData1.then(function (res) {
              
                var data = JSON.parse(res)
                if (data[0].file) {
                    $scope.Result = true;
                    var location = data[0].file;
                    window.location.href = location;
                    $scope.reload = false;
                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.reload = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.reload = false;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                $scope.reload = false;
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

        $scope.openDetails = function (CollegeCode) {
            $scope.CollegeCode = CollegeCode
            $scope.loading = true;
            var getReport = AcademicService.getAdminSyllabusReports($scope.Scheme, $scope.Shift, CollegeCode);
            getReport.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    //  $scope.FacultyMappingReport = response.Table;
                    $scope.FacultyMappingReport1 = response.Table1;
                    $scope.Noresult = false;
                    $scope.data1 = true;
                    $scope.data = false;
                    console.log(response)

                } else {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.data1 = false;
                    $scope.data = false;
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.data1 = false;
                    $scope.data = false;
                    alert("error while loading Report");
                    var err = JSON.parse(error);
                    $scope.result = false;
                    console.log(err.Message);
                });
        }

        $scope.goBack = function () {
            $scope.Submit()
            $scope.data1 = false;
            $scope.data = true;
        }

        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "MappingReport.xls";
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