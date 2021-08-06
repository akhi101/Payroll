define(['app'], function (app) {
    app.controller("IndexController", function ($scope, $timeout, $state, $stateParams, AppSettings, PreExaminationService, AdminService) {

        $scope.OpenPage = function () {
            $state.reload();
            $state.go('index.ContactUs', null, { 'reload': true });
            $scope.LoginUrl = ""

            //$timeout(function () {
            //    $state.transitionTo('index.ContactUs');
            //})
        }
        var location = window.location.origin;

     
        $scope.LoginUrl = location + "/index.html#!/index/WebsiteLogin";

        $scope.ContactusUrl = location + "/index.html#!/index/ContactUs";

   

        $scope.GoToCourses = function () {
           
            setTimeout(function () {
               
                $('html, body').animate({
                    scrollTop: $("#divName").offset().top
                }, 1500)
               
            }, 100);
            $state.go('index')
        
            //window.scrollBy({
            //    top: 1150, // could be negative value
            //    left: 0,
            //    behavior: 'smooth'
            //});
        }

        $("#courses").on('click touchstart', function () {
            
            $('.nav-menus-wrapper-close-button').click();
           
            setTimeout(function () {

                $('html, body').animate({
                    scrollTop: $("#divName").offset().top
                    
                }, 1500)

            }, 100);
            $state.go('index')

        });

        $("#LoginUrl").on('click touchstart', function () {

            $('.nav-menus-wrapper-close-button').click();
            setTimeout(function () {

                $state.go('index.WebsiteLogin')

            }, 100);
            $state.go('index')
         

        });

       


        $(".MobileSidebar").on('click touchstart', function () {
         
            $('.nav-menus-wrapper-close-button').click();
            var myId = this.id
         
          
            if (myId == 'index.Courses1') {
                localStorage.setItem('CourseType', 1)
                $state.go('index.Courses');
            } else if (myId == 'index.Courses2') {
                localStorage.setItem('CourseType', 2)
                $state.go('index.Courses');
            } else {
                $state.go(myId);
            }

        });

        $scope.OpenLogin = function () {
            $timeout(function () {
                $state.transitionTo('index.WebsiteLogin');
            })
        }
        //
        $scope.OpenCourse = function () {
          
            $state.go('index.Courses');
        }

        $scope.OpenTwshCourse = function () {
          
            $state.go('index.TwshCourses');
        }
        

        var getcircular = AdminService.getCircularsList();
        getcircular.then(function (res) {
            var response = JSON.parse(res)
            if (response.Table.length > 0) {
                $scope.Circulars = response.Table;


            } else {
                $scope.loading = false;
                $scope.data = false;
                $scope.error = true;
            }
        },
            function (error) {

                console.log(error);
                $scope.loading = false;
                $scope.data = false;
                $scope.error = true;
            });

        $scope.OpenModule = function (Module) {
          
            //$localStorage.selectedModule = {
            //    Id: Module.SysModID,
            //    ModuleRouteName: Module.ModuleRouteName
            //}
            $state.go(Module);
        }

        $scope.SiteViews = 0;
        $scope.websiteCounts = function () {

            var GetWebSiteVisiterCount = AdminService.GetWebSiteVisiterCount();
            GetWebSiteVisiterCount.then(function (response) {


                $scope.SiteViews = response.Table[0].WebsiteVisitedCount;
            },
                function (error) {
                 
                    var err = JSON.parse(error);
                });
        }

              
        var getNotifications = AdminService.GetNotificationByUser(1017);
        getNotifications.then(function (response) {
           

            $scope.Notifications = response;
            $scope.websiteCounts();
        },
                function (error) {

                    alert("error while loading Notification");
                    //alert("error while loading Notification");

                    var err = JSON.parse(error);
                });



        var StudentCounts = PreExaminationService.GetStudentServicesCounts();
        StudentCounts.then(function (response) {

            if (response.Table.length > 0) {
                var res = response.Table[0]
                $scope.BonafiedCount = res.BonafiedCount;
                $scope.DDCCount = res.DDCCount;
                $scope.DMMCount = res.DMMCount;
                $scope.InterimCount = res.InterimCount;
                $scope.MigrationCount = res.MigrationCount;
                $scope.NameCorrectionCount = res.NameCorrectionCount;
                $scope.TranscriptsCount = res.TranscriptsCount;
                $scope.TransferCount = res.TransferCount;

            } else {
                $scope.BonafiedCount = 0;
                $scope.DDCCount = 0;
                $scope.DMMCount = 0;
                $scope.InterimCount = 0;
                $scope.MigrationCount = 0;
                $scope.NameCorrectionCount = 0;
                $scope.TranscriptsCount = 0;
                $scope.TransferCount = 0;
                $scope.loading = false;
                $scope.reports = false;
                $scope.Noreports = true;
            }

        },
        function (error) {
            $scope.BonafiedCount = 0;
            $scope.DDCCount = 0;
            $scope.DMMCount = 0;
            $scope.InterimCount = 0;
            $scope.MigrationCount = 0;
            $scope.NameCorrectionCount = 0;
            $scope.TranscriptsCount = 0;
            $scope.TransferCount = 0;
            $scope.loading = false;
            $scope.reports = false;
            $scope.Noreports = true;          
        });

    });
});
