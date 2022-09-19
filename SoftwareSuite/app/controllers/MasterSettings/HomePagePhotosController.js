define(['app'], function (app) {
    app.controller("HomePagePhotosController", function ($scope, $http, $localStorage, $state, AppSettings, AdminService, SystemUserService, MasterSettingsService) {


        $scope.UploadSignature = function () {
            if ($scope.ApplicationLetter == null || $scope.ApplicationLetter == "" || $scope.ApplicationLetter == undefined) {
                alert('Please Upload Photo')
                return;
            }
            var Sign = MasterSettingsService.UploadHomePageSlides($scope.FileName,$scope.ApplicationLetter);
            Sign.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                } else {
                    alert("Something Went Wrong");
                }
            },
                function (error) {
                    alert("error while Data");
                    console.log(error);
                });
        }

        $scope.UploadApplication = function () {
            var input = document.getElementById("ApplicationLetter");
            var fileSize = input.files[0].size;

            //if (fileSize <= 3000000 && fileSize >= 700000) {
            if (input.files && input.files[0]) {
                $scope.FileName = input.files[0].name
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {
                    $('#ViewApplicationLetter').attr('src', e.target.result);

                    var canvas = document.createElement("canvas");
                    var imageElement = document.createElement("img");

                    imageElement.setAttribute = $('<img>', {
                        src: e.target.result
                    });
                    var context = canvas.getContext("2d");
                    imageElement.setAttribute.one("load", function () {
                        canvas.width = this.width;
                        canvas.height = this.height;
                        context.drawImage(this, 0, 0);

                        var base64Image1 = canvas.toDataURL("image/png");
                        $scope.ApplicationLetter1 = base64Image1;
                        var base64Img = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                        $scope.ApplicationLetter = base64Img;


                    });


                }
                reader.onerror = function (e) {
                    console.error("File could not be read! Code " + e.target.error.code);
                };

            }
            //} else if (fileSize <= 700000) {
            //    alert("file size should not be less than 700KB");
            //    $('#Aadhar').val('');
            //    return;
            //} else if (fileSize >= 3000000) {
            //    alert("file size should not be greater than 3MB");
            //    $('#Aadhar').val('');
            //    return;
            //} else {
            //    alert("file size should be between 1MB and 3MB");
            //    $('#Aadhar').val('');
            //    return;
            //}
        }


    })
})