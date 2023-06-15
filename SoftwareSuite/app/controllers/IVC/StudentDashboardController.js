define(['app'], function (app) {
    app.controller("StudentDashboardController", function ($scope, $localStorage, AppSettings, $state, $uibModal, PreExaminationService) {

        const $ctrl = this;
        $ctrl.$onInit = () => {
         
            $scope.ViewOmr = false;
            $scope.ViewResults = false;
            $scope.omr = false;
            $scope.Results = false;
            //$scope.SubmitButton = true;
            $scope.FeePayment = true;
            $scope.Tabs = true;
            $scope.PhoneNo = true;
            $scope.Class = true;
            $scope.CASTECATEGORYFOUND = false;
            $scope.CASTECERTNUMBERFOUND = false;
            $scope.EWSNUMBERFOUND = false;
            $scope.AADHARFOUND = false;
           
            $scope.ThirdCard = true;
            $scope.PreviewDisable = true;
            $scope.StudentPhoto1 = false;
            $scope.StudentSign1 = false;

            $scope.Assistance_Urdu = "false";
        



            $scope.Handicaped = "false";
            $scope.NCC = "false";
            $scope.Sports = "false";
            $scope.CAP = "false";
            $scope.PMCares = "false";
            $scope.AppearforBiology = "false";
            $scope.FeePaymentStatus = '1';
            $scope.personaltab = true;
            $scope.nextbutton = true;
            $scope.communicationtab = true;
            $scope.categorytab = true;
            $scope.specialcategorytab = true;
            $scope.studydetailstab = true;
            $scope.photosigntab = true;
            $scope.previewtab = true;
            $scope.halltickettab = true;
            $scope.submitbutton = true;
            $scope.printbutton = false;
            $scope.modifybutton = true;
            $scope.submitlabel = true;
            $scope.feetab = true;

        }

        $scope.class0 = "active";
        $scope.class1 = "";
        $scope.class2 = "";
        $scope.class3 = "";
        $scope.class4 = "";
        $scope.class5 = "";
        $scope.class6 = "";
        $scope.class7 = "";
        $scope.class8 = "";
        $scope.class9 = "";

        $scope.BackTab = function (Type) {
            if (Type == 0) {
                $scope.class0 = "active";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            }
            else if (Type == 1) {
                $scope.class0 = "";
                $scope.class1 = "active";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 2) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "active";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 3) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "active";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 4) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "active";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 5) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "active";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 6) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "active";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
                $scope.omr = false;
                $scope.Results = false;
            } else if (Type == 7) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "active";
                $scope.class8 = "";
                $scope.class9 = "";
                $scope.omr = false;
                $scope.Results = false;

            }
            else if (Type == 8) {
                if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus === 1 && $scope.PhotoStatus == 1) {
                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "active";
                    $scope.class9 = "";
                    $scope.omr = false;
                    $scope.Results = false;
                } else {
                    alert("Please Fill All Details for Preview")
                }

            }
            else if (Type == 9) {
                if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus === 1 && $scope.PhotoStatus == 1 && $scope.PreviewStatus == 1 && $scope.FeePaymentStatus == 1) {
                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "active";
                    $scope.omr = false;
                    $scope.Results = false;
                }
                else if ($scope.FeePaymentStatus == 0) {
                    alert("Please Pay the Registration Fee")
                }
                else {
                    alert('Please Submit the Application')
                }
            }

            else if (Type == 10) {
                if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus === 1 && $scope.PhotoStatus == 1 && $scope.PreviewStatus == 1 && $scope.FeePaymentStatus == 1) {
                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "";
                    $scope.class10 = "active";
                    $scope.omr = true;
                    $scope.Results = false;

                }
                else if ($scope.FeePaymentStatus == 0) {
                    alert("Please Pay the Registration Fee")
                }
                else {
                    alert('Please Submit the Application')
                }
            }

            else if (Type == 11) {
                if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus === 1 && $scope.PhotoStatus == 1 && $scope.PreviewStatus == 1 && $scope.FeePaymentStatus == 1) {
                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "";
                    $scope.class10 = "";
                    $scope.class11 = "active";
                    $scope.Results = true;
                    $scope.omr = false;

                }
                else if ($scope.FeePaymentStatus == 0) {
                    alert("Please Pay the Registration Fee")
                }
                else {
                    alert('Please Submit the Application')
                }
            }

        }

        $scope.NextTab = function (Type) {
            if (Type == 0) {
                $scope.class0 = "";
                $scope.class1 = "active";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";

            } else if (Type == 'PersonalDetails') {

                $scope.savePersonalDetails();
            } else if (Type == 'CommunicationDetails') {

                $scope.saveCommunicationDetails();


            } else if (Type == 'CategoryDetails') {

                $scope.saveCategoryDetails();

            } else if (Type == 'SpecialCategoryDetails') {
                $scope.saveSpecialCategoryDetails();
            } else if (Type == 'StudyDetails') {
                $scope.saveStudyDetails();

            } else if (Type == 'PhotoSignatureDetails') {
                $scope.savePhotoSignatureDetails();

            } else if (Type == 7) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "active";

            }

        }

    })
})