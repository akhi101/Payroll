define(['app'], function (app) {
    app.controller("CcicMarksEntryPageController", function ($scope, $http, $state, $localStorage, CcicAssessmentService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var InstitutionID = authData.InstitutionID;
        var tmpdata1 = $localStorage.TempData1;

        



        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }

   
        $scope.loadPinAndMarks = function () {

            var subjectPinList = CcicAssessmentService.getCcicSubjectPinList(tmpdata1.AcademicYearID, tmpdata1.CourseID, tmpdata1.InstitutionID);
            subjectPinList.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch { error}
                if (res.length > 0) {
                    //   console.log(response);
                    $scope.subjectDetailsView = true;
                    //var marksIdList = response
                    $scope.studentsNotFound = false;
                    $scope.LoadImgForPinList = false;
                    $scope.pinWise = res;
                    //NEMarksList = res;
                    //PinIdlist = res.map((obj) => { return { id: obj.id } });
                    //markslist = res.map((obj) => { if (obj.marks != null) { return { id: obj.id, marks: obj.marks } } });
                    //markslist = markslist.filter(function (element) { return element !== undefined; });
                    //Induslist = res.map((obj) => { if (obj.IndustryName != null) { return { id: obj.id, IndustryName: obj.IndustryName } } });
                    //Induslist = Induslist.filter(function (element) { return element !== undefined; });
                    //$scope.SubjectName = res[0].SubjectName;
                    //$scope.MaxMarks = res[0].maxmarks;
                    //res.forEach(function (stud) {
                    //    if (stud.marks != null) {
                    //        previewlist.push(stud);
                    //    }

                    //});

                    //if (previewlist.length == $scope.pinWise.length) {
                    //    issaved = true;
                    //    $scope.subbtn = true;
                    //}
                } else {
                    alert('No Pins available for the selected inputs.')
                    if (!angular.isUndefined(res) && res.length > 0) {
                        alert(res[0].ResponceDescription);
                    }
                }
            }, function (error) {
                $scope.pinWise = [];
                $scope.subjectDetailsView = false;
                $scope.studentsNotFound = true;
                $scope.LoadImgForPinList = false;
                let err = JSON.parse(error)
                console.log(err);

            });

        }

        
        //$scope.editMarks = function (data) {
        //    let pin = data.pin;
        //    subid = $localStorage.assessment.selectSubjectDetails.subid;

        //    var editmarksentered = MarksEntryService.editMarksEntry($scope.College_Code, branchCode, semId, examId, subid, pin, $scope.ExamMonthYear);
        //    editmarksentered.then(function (res) {
        //        console.log(res);
        //        $scope.loadPinAndMarks();
        //    }, function (err) {
        //        console.log(err);
        //        alert("error occured while editing the marks");
        //    });

        //}

       

        //var tempId = [];

        //var tempId1 = [];

        //$scope.addData = function (id, marks) {
        //    return {
        //        id: id,
        //        marks: marks,
        //    };
        //},

        //    $scope.addIndusData = function (id, IndustryName) {
        //        return {
        //            id: id,
        //            IndustryName: IndustryName,
        //        };
        //    },


        //    $scope.AddMarksById = function (data) {
        //        var isvalied = false;
        //        if (data.marks.length > $scope.MaxMarks.length) {
        //            alert("Marks Entered character length should not exceed maximum marks length.");
        //            $('#' + data.id).val('');
        //            return;
        //        }
        //        if (data.marks > $scope.MaxMarks) {
        //            alert("Marks Entered should not be greater than maximum marks.");
        //            $('#' + data.id).val('');
        //            if (markslist.length > 0) {
        //                markslist.map((obj) => {
        //                    if (obj.id == data.id) {
        //                        obj.marks = '';
        //                    }
        //                });
        //            }
        //            return;
        //        }
        //        if (data.marks.includes(".")) {
        //            alert('Entered marks are not valid');
        //            $('#' + data.id).val('');
        //            return;
        //        }
        //        data.marks = data.marks.trim();
        //        if (data.marks != null && data.marks != "") {
        //            if (isNaN(data.marks)) {
        //                if (data.marks.toUpperCase() == 'AB' || data.marks.toUpperCase() == 'MP' || data.marks.toUpperCase() == 'DC' || data.marks.toUpperCase() == 'TC' || data.marks.toUpperCase() == 'DT') {
        //                    isvalied = true;
        //                } else {
        //                    isvalied = false;
        //                }

        //            } else {
        //                isvalied = true;
        //            }
        //        }
        //        if (data.marks != null && data.marks != "" && isvalied) {
        //            if (markslist.length > 0) {
        //                markslist.map((obj) => {
        //                    if (obj.id == data.id) {
        //                        obj.marks = data.marks;
        //                        tempId.push(data.id);
        //                    }
        //                    if (obj.id != data.id && !tempId.includes(data.id)) {
        //                        var marksdata = $scope.addData(data.id, data.marks);
        //                        tempId.push(data.id);
        //                        markslist.push(marksdata);

        //                    }
        //                });

        //            } else if (markslist.length == 0) {
        //                var marksdata = $scope.addData(data.id, data.marks);
        //                markslist.push(marksdata);

        //            }
        //        }

        //    },



        //    $scope.AddIndustryNameId = function (data) {
        //        data.IndustryName = data.IndustryName.trim();
        //        if (data.IndustryName != null && data.IndustryName != "") {
        //            if (Induslist.length > 0) {
        //                Induslist.map((obj) => {
        //                    if (obj.id == data.id) {
        //                        obj.IndustryName = data.IndustryName;
        //                        tempId1.push(data.id);
        //                    }
        //                    if (obj.id != data.id && !tempId1.includes(data.id)) {
        //                        var Indusdata = $scope.addIndusData(data.id, data.IndustryName);
        //                        tempId1.push(data.id);
        //                        Induslist.push(Indusdata);

        //                    }
        //                });

        //            } else if (Induslist.length == 0) {
        //                var Indusdata = $scope.addIndusData(data.id, data.IndustryName);
        //                Induslist.push(Indusdata);

        //            }
        //        }

        //    },


        //    $scope.save = function () {
        //        if (semId == 6 && $scope.SchemeId == 5 && $scope.examTypeId == 4 || semId == 6 && $scope.SchemeId == 5 && $scope.examTypeId == 18) {
        //            var outArr = [];
        //            PinIdlist.forEach(function (value) {
        //                var existing = Induslist.filter(function (v, i) {
        //                    return (v.id == value.id);
        //                });
        //                var existing2 = markslist.filter(function (v, i) {
        //                    return (v.id == value.id);
        //                });
        //                if (existing.length && existing2.length) {
        //                    value.marks = existing2[0].marks;
        //                    value.IndustryName = existing[0].IndustryName;
        //                    outArr.push(value)
        //                } else if (existing2.length) {
        //                    value.marks = existing2[0].marks;
        //                    value.IndustryName = "";
        //                    outArr.push(value)
        //                } else if (existing.length) {
        //                    value.marks = "";
        //                    value.IndustryName = existing[0].IndustryName;
        //                    outArr.push(value)
        //                } else {
        //                    value.marks = "";
        //                    value.IndustryName = "";
        //                    outArr.push(value);
        //                }
        //            });
        //            outArr = outArr.filter(i => !(i.marks == "" && i.IndustryName == ""));
        //            markslist = outArr;
        //        }

        //        issaved = true;
        //        if (markslist != [] && markslist != '') {
        //            var postmarks = MarksEntryService.PostStudentMarks(examId, $scope.SchemeId, markslist, StudentTypeId);
        //            postmarks.then(function (response) {
        //                //   console.log(response);
        //                alert('Marks are Saved Successfully');
        //                $scope.loadPinAndMarks();
        //            }, function (error) {
        //                console.log(error);
        //                // alert(error);
        //            });
        //        } else {
        //            alert('No valid data Present');
        //            $scope.loadPinAndMarks();
        //        }

        //    }
        //$scope.back = function () {
        //    $state.go("Dashboard.AssessmentDashboard.Assessment.PracticalSubjectList");
        //}

        //$scope.submit = function () {
        //    var conf = confirm("Are you sure you want to submit the marks");
        //    if (conf) {
        //        subid = $localStorage.assessment.selectSubjectDetails.subid;
        //        let collegeCode = authData.College_Code;

        //        var submitMarks = MarksEntryService.SubmitMarksEntered(collegeCode, branchCode, AcademicId, semId, examId, subid, $scope.ExamMonthYear);
        //        submitMarks.then(function (response) {
        //            //   console.log(response);
        //            alert('Marks are Submited Successfully');
        //            $scope.loadPinAndMarks();
        //        }, function (error) {
        //            console.log(error);
        //        });
        //    }

        //},


        //    $scope.printMarksEntered = function () {
        //        if (issaved == false) {
        //            alert('Save the marks before You Print');
        //            return;
        //        }
        //        var divName = "idtoDivPrint";
        //        var $markstable = document.createElement("div");
        //        $markstable.innerHTML = '';
        //        $markstable.className = "table";

        //        var parsent = new DOMParser();
        //        var bl = parsent.parseFromString('<div id="divtitle">STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA</div>', "text/html");


        //        var parse = new DOMParser();
        //        var al = parse.parseFromString('<div id="divtop" ><span id="text-left"><label class="label-pad">College : </label>' + collegeName + '</span><span id="text-right"><label class="label-pad">Branch :</label>' + branchName + "(" + BranchCode + ")" + ' </span> </div>', "text/html");
        //        var parser = new DOMParser();
        //        var el = parser.parseFromString('<div id="divtoadd" ><span id="text-left"><label class="label-pad">Scheme : </label>' + $scope.loadedScheme.Scheme + '</span><span id="text-center"><label class="label-pad sem-pad"> Semester :</label>' + semName + "     " + '</span><span id="text-right"><label class="label-pad">Subject Code :</label>' + SubjectCode + '</span></div>', "text/html");
        //        var divToPrint = document.getElementById(divName);
        //        var temp = document.body.innerHTML;
        //        $("#markslist").hide();
        //        var domClone = divToPrint.cloneNode(true);
        //        var $printSection = document.getElementById("printSection");
        //        if (!$printSection) {
        //            var $printSection = document.createElement("div");
        //            $printSection.id = "printSection";
        //            //var $ele1 = document.createElement("div");
        //            //$ele1.className = "sbtet_img";             
        //            var divToPrintheads = bl.getElementById("divtitle");
        //            var divToPrintheaded = al.getElementById("divtop");
        //            var divToPrinthead = el.getElementById("divtoadd");
        //            $markstable.appendChild(divToPrintheads);
        //            $markstable.appendChild(divToPrintheaded);
        //            $markstable.appendChild(divToPrinthead);


        //            document.body.appendChild($printSection);

        //            var $ele1 = document.createElement("div");
        //            $ele1.className = "row";

        //            var $ele2 = document.createElement("div");
        //            $ele2.className = "col-lg-2 col-md-12";

        //            var $ele3 = document.createElement("div");
        //            $ele3.className = "col-lg-10 col-md-12";

        //            //var $titlelogo = document.createElement("div");               
        //            //$titlelogo.className = "sbtet_img";

        //            // var $img = document.createElement("img");
        //            // $img.src = "../../../contents/img/big-logo.png";
        //            // $img.className = "image";

        //            //var $titlelabel = document.createElement("div");
        //            //$titlelabel.className = "logo-name";

        //            //var $title = document.createElement("h2");
        //            //$title.innerHTML = "STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA";
        //            //$titlelabel.className = "title-label";

        //            //$titlelabel.appendChild($title);
        //            //  $titlelogo.appendChild($img);

        //            // $ele2.appendChild($titlelogo);
        //            //$ele3.appendChild($titlelabel);

        //            //  $ele1.appendChild($ele2);
        //            $ele1.appendChild($ele3);

        //            $printSection.appendChild($ele1);

        //            $printSection.appendChild($ele1);
        //            $printSection.appendChild($markstable);

        //        }
        //        $printSection.appendChild(domClone);
        //        // console.log($printSection.innerHTML);
        //        window.print();
        //        document.body.removeChild($printSection);
        //        $("#markslist").show();
        //        $scope.showcollegedetail = false;

        //    }



        //$scope.logOut = function () {
        //    $scope.$emit("logout", authData.userName);
        //    sessionStorage.loggedIn = "no";
        //    delete $localStorage.authorizationData;

        //    $scope.authentication = {
        //        isAuth: false,
        //        UserId: 0,
        //        userName: ""
        //    };
        //    $state.go('login')
        //}


    });
});