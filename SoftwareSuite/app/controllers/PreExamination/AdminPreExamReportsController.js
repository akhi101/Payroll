define(['app'], function (app) {
    app.controller("AdminPreExamReportsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService, PreExaminationService, Excel, $timeout) {
        var $ctrl = this
        $ctrl.$onInit = () => {
            $scope.loading = false;
            

            var authData = $localStorage.authorizationData;
            $scope.userId = authData.SysUserID
            $scope.userTypeId = authData.SystemUserTypeId;

        }
        var data = {};
        //$scope.$emit('showLoading', data);
        var LoadExamTypeBysem = MarksEntryService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });

        var getSemesters = PreExaminationService.getAllSemester();
        getSemesters.then(function (res) {
            //var res = JSON.parse(res);
            $scope.GetSemesters = res.Table;
            $scope.isAllSelectedsem = true;
            var toggleStatus = $scope.isAllSelectedsem;
            angular.forEach($scope.GetSemesters, function (itm) { itm.selected = toggleStatus; });
            $scope.semarr = [];
            angular.forEach($scope.GetSemesters, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        var getExamMonthYears = PreExaminationService.GetExamMonthYear();
        getExamMonthYears.then(function (res) {
            var res = JSON.parse(res);
            $scope.GetExamMonthYears = res.Table;
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        
        var expanded = false;
        var expanded1 = false;
        $scope.showsemCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxessem");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.closesemCheckbox = function () {
            var checkboxes = document.getElementById("checkboxessem");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.toggleAllsem = function () {
            var toggleStatus = $scope.isAllSelectedsem;
            angular.forEach($scope.GetSemesters, function (itm) { itm.selected = toggleStatus; });
            $scope.semarr = [];
            angular.forEach($scope.GetSemesters, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
        }

        $scope.optionToggledsem = function () {
            $scope.isAllSelectedsem = $scope.GetSemesters.every(function (itm) { return itm.selected; })
            $scope.semarr = [];
            angular.forEach($scope.GetSemesters, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
        }



        $scope.showSEMCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxessem1");
            if (!expanded1) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                expanded1 = true;
            } else {
                checkboxes.style.display = "none";
                expanded1 = false;
            }
        }

        $scope.closeSEMCheckbox = function () {
            var checkboxes = document.getElementById("checkboxessem");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.toggleAllSEM = function () {
            var toggleStatus = $scope.isAllSelectedsem1;
            angular.forEach($scope.GetSemesters, function (itm1) { itm1.selected = toggleStatus; });
            $scope.semarr1 = [];
            angular.forEach($scope.GetSemesters, function (value1, key) {
                if (value1.selected === true) {
                    $scope.semarr1.push({ "semid": value1.semid })
                }
            });
        }

        $scope.optionToggledSEM = function () {
            $scope.isAllSelectedsem1 = $scope.GetSemesters.every(function (itm1) { return itm1.selected; })
            $scope.semarr1 = [];
            angular.forEach($scope.GetSemesters, function (value1, key) {
                if (value1.selected === true) {
                    $scope.semarr1.push({ "semid": value1.semid })
                }
            });
        }


        var expanded2 = false;
        $scope.ShowsemCheckboxes = function () {
            var checkboxes2 = document.getElementById("checkboxessem2");
            if (!expanded2) {
                checkboxes2.style.display = "block";
                checkboxes2.style.position = "absolute";
                checkboxes2.style.width = "92%";
                checkboxes2.style.backgroundColor = "white";
                checkboxes2.style['z-index'] = 99;
                expanded2 = true;
            } else {
                checkboxes2.style.display = "none";
                expanded2 = false;
            }
        }

        $scope.ClosesemCheckbox = function () {
            var checkboxes2 = document.getElementById("checkboxessem2");
            if (!expanded2) {
                checkboxes2.style.display = "block";
                checkboxes2.style.position = "absolute";
                checkboxes2.style.width = "92%";
                checkboxes2.style.backgroundColor = "white";
                expanded2 = true;
            } else {
                checkboxes2.style.display = "none";
                expanded2 = false;
            }
        }

        $scope.ToggleAllsem = function () {
            var toggleStatus = $scope.isAllSelectedsem2;
            angular.forEach($scope.GetSemesters, function (itm2) { itm2.selected = toggleStatus; });
            $scope.semarr2 = [];
            angular.forEach($scope.GetSemesters, function (value2, key) {
                if (value2.selected === true) {
                    $scope.semarr2.push({ "semid": value2.semid })
                }
            });
        }

        $scope.OptionToggledSEM = function () {
            $scope.isAllSelectedsem = $scope.GetSemesters.every(function (itm) { return itm.selected; })
            $scope.semarr = [];
            angular.forEach($scope.GetSemesters, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
        }

        $scope.GetFeepaymentReport = function () {
            $scope.loading = true;
            $scope.Noreports = false;
            $scope.reports = false;
            var AcademicYearsActive = PreExaminationService.GetAdminPreExamReports($scope.ExamMonthYearId, JSON.stringify($scope.semarr), $scope.StudentTypeId);
            AcademicYearsActive.then(function (response) {
                //var response = JSON.parse(response);
                //console.log(response);
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.reports = true;
                    $scope.Noreports = false;
                    $scope.getReports = response;
                    var OnRoll = 0
                    var Elgible = 0;
                    var St = 0;
                    var FeePaid = 0;
                    var Condonation = 0;
                    var FeeNotPaid = 0;
                    var Detained = 0;

                    for (var i = 0; i < response.length; i++) {
                        if (response[i].OnRoll != null)
                            OnRoll = OnRoll + response[i].OnRoll;
                        if (response[i].Elgible != null)
                            Elgible = Elgible + response[i].Elgible;

                        if (response[i].FeePaid != null)
                            FeePaid = FeePaid + response[i].FeePaid;

                        if (response[i].FeeNotPaid != null)
                            FeeNotPaid = FeeNotPaid + response[i].FeeNotPaid;

                        if (response[i].Condonation != null)
                            Condonation = Condonation + response[i].Condonation;
                        if (response[i].Detained != null)
                            Detained = Detained + response[i].Detained;


                    }
                    $scope.OnRoll = OnRoll;
                    $scope.Elgible = Elgible;
                    $scope.FeePaid = FeePaid;
                    $scope.FeeNotPaid = FeeNotPaid;
                    $scope.Condonation = Condonation;
                    $scope.Detained = Detained;                 
                  /*  $scope.$emit('hideLoading', data);*/

                } else {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                }

            },
                function (error) {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                    alert("error while loading data");
                });
        }


        $scope.getAdminFeedBackReports = function () {
            $scope.loading = true;
            $scope.Noreports = false;
            $scope.reports = false;
            var AcademicYearsActive = PreExaminationService.GetAdminFeedBackReports($scope.ExamMonthYearID, JSON.stringify($scope.semarr1), $scope.StudentTypeID);
            AcademicYearsActive.then(function (response) {
                //var response = JSON.parse(response);
                //console.log(response);
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.reports = true;
                    $scope.Noreports = false;
                    $scope.getReports = response;
                    var OnRoll = 0
                    var FeeEligible = 0;
                    //var St = 0;
                    var FeePaid = 0;
                    var Feedbacksubmitted = 0;
                    var Feedbacknotsubmitted = 0;
                    //var Condonation = 0;
                    //var FeeNotPaid = 0;
                    //var Detained = 0;

                    for (var i = 0; i < response.length; i++) {
                        if (response[i].OnRoll != null)
                            OnRoll = OnRoll + response[i].OnRoll;
                        if (response[i].FeeEligible != null)
                            FeeEligible = FeeEligible + response[i].FeeEligible;

                        if (response[i].FeePaid != null)
                            FeePaid = FeePaid + response[i].FeePaid;

                        if (response[i].Feedbacksubmitted != null)
                            Feedbacksubmitted = Feedbacksubmitted + response[i].Feedbacksubmitted;

                        if (response[i].Feedbacknotsubmitted != null)
                            Feedbacknotsubmitted = Feedbacknotsubmitted + response[i].Feedbacknotsubmitted;
                        //if (response[i].Detained != null)
                        //    Detained = Detained + response[i].Detained;


                    }
                    $scope.OnRoll = OnRoll;
                    $scope.FeeEligible = FeeEligible;
                    $scope.FeePaid = FeePaid;
                    $scope.Feedbacksubmitted = Feedbacksubmitted;
                    $scope.Feedbacknotsubmitted = Feedbacknotsubmitted;
                    //$scope.Detained = Detained;
                    /*  $scope.$emit('hideLoading', data);*/

                } else {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                }

            },
                function (error) {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                    alert("error while loading data");
                });
        }
    
       

        $scope.openDetails = function (data) {
           
            
          var CollegeCode = data.CollegeCode;
          localStorage.setItem('FeeExamMonthYear', $scope.ExamMonthYearId);
          //localStorage.setItem('FeeSemester', JSON.stringify($scope.semarr));
          localStorage.setItem('FeeSemester', data.semid);
          localStorage.setItem('CollegeCode', CollegeCode);
          localStorage.setItem('StudentTypeId', $scope.StudentTypeId)
            $state.go('Dashboard.PreExamination.PreExamReports')
        }

        $scope.FeeNotPaidExcelReport = function () {
            $scope.LoadImg = true;
            var FeeNotPaidExcelReport = PreExaminationService.FeeNotPaidExcelReport();
            FeeNotPaidExcelReport.then(function (res) {
                $scope.LoadImg = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No FeeNotPaid Excel Report Present")
                    }
                } else {
                    alert("No FeeNotPaid Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };
  

        $scope.DownloadExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'AdminReports');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "AdminFeepaymentReport.xls";
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
    })
})