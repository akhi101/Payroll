

using System;

using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using Newtonsoft.Json;

using SoftwareSuite.Models.Database;

using RestSharp;
using System.Threading.Tasks;
using System.Configuration;
using System.Xml;
using System.Collections.Generic;
using System.IO;
using SoftwareSuite.Controllers.ExternalServices;
using System.Web;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicPreExaminationController : ApiController
    {

        public class PaymentDetails
        {
            public int AcademicYearId { get; set; }
            public int ExamMonthYearId { get; set; }
            public int CourseId { get; set; }
            public int StudentType { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public DateTime LateFeeDate { get; set; }
            public DateTime TatkalDate { get; set; }
            public DateTime PremiumTatkalDate { get; set; }
            public double Fee { get; set; }
            public double LateFee { get; set; }
            public double TatkalFee { get; set; }
            public double PremiumTatkalFee { get; set; }
            public double CertificateFee { get; set; }


        }

        [HttpGet, ActionName("GetCcicAcademicYears")]
        public HttpResponseMessage GetCcicAcademicYears()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_AcademicYears";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_AcademicYears", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCcicCurrentAcademicYear")]
        public HttpResponseMessage GetCcicCurrentAcademicYear()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_CurrentAcademicYear";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_CurrentAcademicYear", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCourseDurations")]
        public HttpResponseMessage GetCourseDurations()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_CourseDurations";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_CourseDurations", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetRegularExamCourseDurations")]
        public HttpResponseMessage GetRegularExamCourseDurations()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_RegularExamCourseDurations";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_RegularExamCourseDurations", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCcicCourseDurations")]
        public string GetCcicCourseDurations(int BatchID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@BatchID", BatchID);

                var dt = dbHandler.ReturnDataSet("SP_Get_BatchCourseDurations", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetBatches")]
        public HttpResponseMessage GetBatches()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_Batches";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_Batches", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetAffiliatedCourses")]
        public HttpResponseMessage GetAffiliatedCourses()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_AffiliatedCourses";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_AffiliatedCourses", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetExaminationCenters")]
        public HttpResponseMessage GetExaminationCenters()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_ExaminationCenters";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_ExaminationCenters", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet, ActionName("GetStudentType")]
        public HttpResponseMessage GetStudentType()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_StudentType";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_StudentType", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetAffiliatedInstitutions")]
        public HttpResponseMessage GetAffiliatedInstitutions()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_AffiliatedInsttitutions";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_AffiliatedInsttitutions", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetCurrentBatch")]
        public string GetCurrentBatch(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataSet("SP_Get_CurrentBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetCcicCourseDurationBatches")]
        public string GetCcicCourseDurationBatches(int CourseDurationID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseDurationID", CourseDurationID);

                var dt = dbHandler.ReturnDataSet("SP_Get_CourseDurationBatches", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetCcicAcademicYearCurrentBatch")]
        public string GetCcicAcademicYearCurrentBatch(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AcademicYearCurrentBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetInsEnrollmentReportCoursesCount")]
        public string GetInsEnrollmentReportCoursesCount(int InstitutionID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_EnrollmentReportCoursesCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetInsRegisterReportCoursesCount")]
        public string GetInsRegisterReportCoursesCount(int InstitutionID, int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);
                param[1] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[2] = new SqlParameter("@Batch", Batch);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_RegisterReportCoursesCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetInsVerificationReportCoursesCount")]
        public string GetInsVerificationReportCoursesCount(int InstitutionID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_VerificationReportCoursesCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpGet, ActionName("GetAdminEnrollmentReportInsCount")]
        public HttpResponseMessage GetAdminEnrollmentReportInsCount()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_Admin_EnrollmentReportInsCount";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_Admin_EnrollmentReportInsCount", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetAdminRegisterReportCount")]
        public string GetAdminRegisterReportCount(int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Batch", Batch);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Admin_RegisterReportInsCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetRegisterCoursesCount")]
        public string GetRegisterCoursesCount(int InstitutionID, int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Batch", Batch);
                param[2] = new SqlParameter("@InstitutionID", InstitutionID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_RegisterReportCoursesCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdminRegisterCoursesCount")]
        public string GetAdminRegisterCoursesCount(int InstitutionID, int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);
                param[1] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[2] = new SqlParameter("@Batch", Batch);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_RegisterReportCoursesCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdminRegisterReportData")]
        public string GetAdminRegisterReportData(int InstitutionID, int CourseID, int ReportTypeID, int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);
                param[1] = new SqlParameter("@CourseID", CourseID);
                param[2] = new SqlParameter("@ReportTypeID", ReportTypeID);
                param[3] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[4] = new SqlParameter("@Batch", Batch);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_RegisterReportData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdminVerificationReportInsCount")]
        public HttpResponseMessage GetAdminVerificationReportInsCount()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_VerificationReportInsCount";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_VerificationReportInsCount", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetExamMonthYears")]
        public string GetExamMonthYears(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataSet("SP_Get_ExamMonthYears", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAYBatchExamMonthYear")]
        public string GetAYBatchExamMonthYear(int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Batch", Batch);


                var dt = dbHandler.ReturnDataSet("SP_Get_AYBatchExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetHolidaysForTimeTable")]
        public HttpResponseMessage GetHolidaysForTimeTable(string StartDate, int NofDates)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StartDate", StartDate);
                param[1] = new SqlParameter("@NofDates", NofDates);
                var dt = dbHandler.ReturnDataSet("SP_Get_HolidayDatesForTimeTable", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr(" SP_Get_HolidayDatesForTimeTable", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }
        }



        public class ExamMonthYearInfo
        {
            public int AcademicYearID { get; set; }
            public int RegularExamCourseDurationID { get; set; }
            public string ExamMonthYearName { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("AddExamMonthYear")]
        public string AddExamMonthYear([FromBody] ExamMonthYearInfo data)
        {
            var dbHandler = new ccicdbHandler();
            try
            {
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[1] = new SqlParameter("@RegularExamCourseDurationID", data.RegularExamCourseDurationID);
                param[2] = new SqlParameter("@ExamMonthYearName", data.ExamMonthYearName);
                param[3] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_ExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_ExamMonthYear", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetCcicAcademicYearBatches")]
        public string GetCcicAcademicYearBatches(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AcademicYearBatches", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetEnrollementDates")]
        public string GetEnrollementDates(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_EnrollementDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("VerifyEnrollmentDate")]
        public HttpResponseMessage VerifyEnrollmentDate()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Verify_EnrollmentDate";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Verify_EnrollmentDate", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCcicCoursesByInstitution")]
        public string GetCcicCoursesByInstitution(int InstitutionID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AffiliatedCoursesByInstitution", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetCcicCourseQualifications")]
        public string GetCcicCourseQualifications(int CourseID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseID", CourseID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_CourseQualifications", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetCcicCourseExperience")]
        public string GetCcicCourseExperience(int CourseQualificationsID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseQualificationsID", CourseQualificationsID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_CourseExperience", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("AddAcademicYear")]
        public string AddAcademicYear(int AcademicStartYear, string AcademicYear, DateTime AcademicYearStartDate, DateTime AcademicYearEndDate, bool CurrentAcademicYear, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicStartYear", AcademicStartYear);
                param[1] = new SqlParameter("@AcademicYear", AcademicYear);
                param[2] = new SqlParameter("@AcademicYearStartDate", AcademicYearStartDate);
                param[3] = new SqlParameter("@AcademicYearEndDate", AcademicYearEndDate);
                param[4] = new SqlParameter("@CurrentAcademicYear", CurrentAcademicYear);
                param[5] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_AcademicYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_AcademicYear", 0, ex.Message);
                return ex.Message;
            }

        }


        //[HttpPost, ActionName("AddStudentDetails")]
        //public string AddStudentDetails([FromBody] JsonObject data)
        //{
        //    try
        //    {
        //        var dbHandler = new ccicdbHandler();
        //        var param = new SqlParameter[32];
        //        param[0] = new SqlParameter("@ApplicationNumber", data["ApplicationNumber"]);
        //        param[1] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
        //        param[2] = new SqlParameter("@CourseID", data["CourseID"]);
        //        param[3] = new SqlParameter("@CourseQualificationID", data["CourseQualificationID"]);
        //        param[4] = new SqlParameter("@CourseExperienceID", data["CourseExperienceID"]);
        //        param[5] = new SqlParameter("@SSC", data["SSC"]);
        //        param[6] = new SqlParameter("@SSCHallticketNumber", data["SSCHallticketNumber"]);
        //        param[7] = new SqlParameter("@SSCPassedYear", data["SSCPassedYear"]);
        //        param[8] = new SqlParameter("@SSCPassedType", data["SSCPassedType"]);
        //        param[9] = new SqlParameter("@StudentName", data["StudentName"]);
        //        param[10] = new SqlParameter("@FatherName", data["FatherName"]);
        //        param[11] = new SqlParameter("@MotherName", data["MotherName"]);
        //        param[12] = new SqlParameter("@DateofBirth", data["DateofBirth"]);
        //        param[13] = new SqlParameter("@SSCDateofBirth", data["SSCDateofBirth"]);
        //        param[14] = new SqlParameter("@Gender", data["Gender"]);
        //        param[15] = new SqlParameter("@AadharNumber", data["AadharNumber"]);
        //        param[16] = new SqlParameter("@HouseNumber", data["HouseNumber"]);
        //        param[17] = new SqlParameter("@Street", data["Street"]);
        //        param[18] = new SqlParameter("@Landmark", data["Landmark"]);
        //        param[19] = new SqlParameter("@Village", data["Village"]);
        //        param[20] = new SqlParameter("@Pincode", data["Pincode"]);
        //        param[21] = new SqlParameter("@District", data["District"]);
        //        param[22] = new SqlParameter("@AddressState", data["AddressState"]);
        //        param[23] = new SqlParameter("@StudentMobile", data["StudentMobile"]);
        //        param[24] = new SqlParameter("@StudentEmail", data["StudentEmail"]);
        //        param[25] = new SqlParameter("@SSCValidated", data["SSCValidated"]);
        //        param[26] = new SqlParameter("@UserName", data["UserName"]);
        //        param[27] = new SqlParameter("@StudentPhoto", data["StudentPhoto"]);
        //        param[28] = new SqlParameter("@StudentSign", data["StudentSign"]);
        //        param[29] = new SqlParameter("@SSCCertificate", data["SSCCertificate"]);
        //        param[30] = new SqlParameter("@QualificationCertificate", data["QualificationCertificate"]);
        //        param[31] = new SqlParameter("@ExperienceCertificate", data["ExperienceCertificate"]);


        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentDetails", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("SP_Add_StudentDetails", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}
        public class filelist
        {
            public int fileindex { get; set; }
            public string file { get; set; }
        }


        public class CertificateReqAtt
        {
            public string ApplicationNumber { get; set; }

            public int InstitutionID { get; set; }
            public int CourseID { get; set; }
            public int CourseQualificationID { get; set; }
            public int CourseExperienceID { get; set; }
            public int SSC { get; set; }
            public string SSCHallticketNumber { get; set; }
            public int SSCPassedYear { get; set; }
            public string SSCPassedType { get; set; }
            public string StudentName { get; set; }
            public string FatherName { get; set; }
            public string MotherName { get; set; }
            public DateTime DateofBirth { get; set; }
            public string SSCDateofBirth { get; set; }
            public string Gender { get; set; }
            public string AadharNumber { get; set; }
            public string HouseNumber { get; set; }
            public string Street { get; set; }
            public string Landmark { get; set; }
            public string Village { get; set; }
            public int Pincode { get; set; }
            public string District { get; set; }
            public string AddressState { get; set; }
            public string StudentMobile { get; set; }
            public string StudentEmail { get; set; }
            public bool SSCValidated { get; set; }

            public string UserName { get; set; }
            public string StudentPhoto { get; set; }
            public string StudentSign { get; set; }
            public string SSCCertificate { get; set; }
            public string QualificationCertificate { get; set; }
            public string ExperienceCertificate { get; set; }
            public List<filelist> filedata { get; set; }


        }
        private string GetWebAppRoot()
        {
            var env = ConfigurationManager.AppSettings["SMS_ENV"].ToString();
            string host = (HttpContext.Current.Request.Url.IsDefaultPort) ?
               HttpContext.Current.Request.Url.Host :
               HttpContext.Current.Request.Url.Authority;
            if (env == "PROD")
            {
                host = String.Format("{0}://{1}", HttpContext.Current.Request.Url.Scheme, host);
                return host + "/";
            }
            else if (env == "DEV")
            {

                host = String.Format("{0}://{1}", HttpContext.Current.Request.Url.Scheme, host);
                return host + HttpContext.Current.Request.ApplicationPath;
            }
            return host + "/";
        }


        public class UpdateCertificateReqAtt
        {
            public string ApplicationNumber { get; set; }

            public int InstitutionID { get; set; }
            public int CourseID { get; set; }
            public int CourseQualificationID { get; set; }
            public int CourseExperienceID { get; set; }
            public int SSC { get; set; }
            public string SSCHallticketNumber { get; set; }
            public int SSCPassedYear { get; set; }
            public string SSCPassedType { get; set; }
            public string StudentName { get; set; }
            public string FatherName { get; set; }
            public string MotherName { get; set; }
            public DateTime DateofBirth { get; set; }
            public string SSCDateofBirth { get; set; }
            public string Gender { get; set; }
            public string AadharNumber { get; set; }
            public string HouseNumber { get; set; }
            public string Street { get; set; }
            public string Landmark { get; set; }
            public string Village { get; set; }
            public int Pincode { get; set; }
            public string District { get; set; }
            public string AddressState { get; set; }
            public string StudentMobile { get; set; }
            public string StudentEmail { get; set; }
            public bool SSCValidated { get; set; }

            public string UserName { get; set; }
            public string StudentPhoto { get; set; }
            public string StudentSign { get; set; }
            public string SSCCertificate { get; set; }
            public string QualificationCertificate { get; set; }
            public string ExperienceCertificate { get; set; }
            public List<filelist> filedata { get; set; }


        }

        [HttpPost, ActionName("AddStudentDetails")]
        public string AddStudentDetails([FromBody] CertificateReqAtt CertificateReqAtt)
        {
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\CCICStaticfiles\";
                var path = string.Empty;
                string relativePath = string.Empty;
                var StudentPhotopath = string.Empty;
                var StudentSignpath = string.Empty;
                var StudentSscCertpath = string.Empty;
                var StudentQualCertpath = string.Empty;
                var StudentExpCertpath = string.Empty;
                if (CertificateReqAtt.StudentPhoto != "")
                {
                    var StdPhoto = "StudentPhoto" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdPhoto);
                    byte[] Bytes = Convert.FromBase64String(CertificateReqAtt.StudentPhoto);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentPhotopath = relativePath;
                }
                else
                {
                    StudentPhotopath = "";
                }

                if (CertificateReqAtt.StudentSign != "")
                {
                    var StdSign = "StudentSign" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdSign);
                    byte[] Bytes = Convert.FromBase64String(CertificateReqAtt.StudentSign);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentSignpath = relativePath;
                }
                else
                {
                    StudentSignpath = "";
                }

                if (CertificateReqAtt.SSCCertificate != "")
                {
                    var StdSscCert = "SSCCertificate" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdSscCert);
                    byte[] Bytes = Convert.FromBase64String(CertificateReqAtt.SSCCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentSscCertpath = relativePath;
                }
                else
                {
                    StudentSscCertpath = "";
                }


                if (CertificateReqAtt.QualificationCertificate != "")
                {
                    var StdQuaCert = "QualificationCertificate" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdQuaCert);
                    byte[] Bytes = Convert.FromBase64String(CertificateReqAtt.QualificationCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentQualCertpath = relativePath;
                }
                else
                {
                    StudentQualCertpath = "";
                }


                if (CertificateReqAtt.ExperienceCertificate != "")
                {
                    var StdExpCert = "ExperienceCertificate" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdExpCert);
                    byte[] Bytes = Convert.FromBase64String(CertificateReqAtt.ExperienceCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentExpCertpath = relativePath;
                }
                else
                {
                    StudentExpCertpath = "";
                }

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[32];
                param[0] = new SqlParameter("@ApplicationNumber", CertificateReqAtt.ApplicationNumber);
                param[1] = new SqlParameter("@InstitutionID", CertificateReqAtt.InstitutionID);
                param[2] = new SqlParameter("@CourseID", CertificateReqAtt.CourseID);
                param[3] = new SqlParameter("@CourseQualificationID", CertificateReqAtt.CourseQualificationID);
                param[4] = new SqlParameter("@CourseExperienceID", CertificateReqAtt.CourseExperienceID);
                param[5] = new SqlParameter("@SSC", CertificateReqAtt.SSC);
                param[6] = new SqlParameter("@SSCHallticketNumber", CertificateReqAtt.SSCHallticketNumber);
                param[7] = new SqlParameter("@SSCPassedYear", CertificateReqAtt.SSCPassedYear);
                param[8] = new SqlParameter("@SSCPassedType", CertificateReqAtt.SSCPassedType);
                param[9] = new SqlParameter("@StudentName", CertificateReqAtt.StudentName);
                param[10] = new SqlParameter("@FatherName", CertificateReqAtt.FatherName);
                param[11] = new SqlParameter("@MotherName", CertificateReqAtt.MotherName);
                param[12] = new SqlParameter("@DateofBirth", CertificateReqAtt.DateofBirth);
                param[13] = new SqlParameter("@SSCDateofBirth", CertificateReqAtt.SSCDateofBirth);
                param[14] = new SqlParameter("@Gender", CertificateReqAtt.Gender);
                param[15] = new SqlParameter("@AadharNumber", CertificateReqAtt.AadharNumber);
                param[16] = new SqlParameter("@HouseNumber", CertificateReqAtt.HouseNumber);
                param[17] = new SqlParameter("@Street", CertificateReqAtt.Street);
                param[18] = new SqlParameter("@Landmark", CertificateReqAtt.Landmark);
                param[19] = new SqlParameter("@Village", CertificateReqAtt.Village);
                param[20] = new SqlParameter("@Pincode", CertificateReqAtt.Pincode);
                param[21] = new SqlParameter("@District", CertificateReqAtt.District);
                param[22] = new SqlParameter("@AddressState", CertificateReqAtt.AddressState);
                param[23] = new SqlParameter("@StudentMobile", CertificateReqAtt.StudentMobile);
                param[24] = new SqlParameter("@StudentEmail", CertificateReqAtt.StudentEmail);
                param[25] = new SqlParameter("@SSCValidated", CertificateReqAtt.SSCValidated);
                param[26] = new SqlParameter("@UserName", CertificateReqAtt.UserName);
                param[27] = new SqlParameter("@StudentPhoto", StudentPhotopath);
                param[28] = new SqlParameter("@StudentSign", StudentSignpath);
                param[29] = new SqlParameter("@SSCCertificate", StudentSscCertpath);
                param[30] = new SqlParameter("@QualificationCertificate", StudentQualCertpath);
                param[31] = new SqlParameter("@ExperienceCertificate", StudentExpCertpath);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_StudentDetails", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("UpdateStudentDetails")]
        public string UpdateStudentDetails([FromBody] UpdateCertificateReqAtt UpdateCertificateReqAtt)
        {
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\CCICStaticfiles\";
                var path = string.Empty;
                string relativePath = string.Empty;
                var StudentPhotopath = string.Empty;
                var StudentSignpath = string.Empty;
                var StudentSscCertpath = string.Empty;
                var StudentQualCertpath = string.Empty;
                var StudentExpCertpath = string.Empty;
                if (UpdateCertificateReqAtt.StudentPhoto != "")
                {
                    var StdPhoto = "StudentPhoto" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdPhoto);
                    byte[] Bytes = Convert.FromBase64String(UpdateCertificateReqAtt.StudentPhoto);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentPhotopath = relativePath;
                }
                else
                {
                    StudentPhotopath = "";
                }

                if (UpdateCertificateReqAtt.StudentSign != "")
                {
                    var StdSign = "StudentSign" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdSign);
                    byte[] Bytes = Convert.FromBase64String(UpdateCertificateReqAtt.StudentSign);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentSignpath = relativePath;
                }
                else
                {
                    StudentSignpath = "";
                }

                if (UpdateCertificateReqAtt.SSCCertificate != "")
                {
                    var StdSscCert = "SSCCertificate" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdSscCert);
                    byte[] Bytes = Convert.FromBase64String(UpdateCertificateReqAtt.SSCCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentSscCertpath = relativePath;
                }
                else
                {
                    StudentSscCertpath = "";
                }


                if (UpdateCertificateReqAtt.QualificationCertificate != "")
                {
                    var StdQuaCert = "QualificationCertificate" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdQuaCert);
                    byte[] Bytes = Convert.FromBase64String(UpdateCertificateReqAtt.QualificationCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentQualCertpath = relativePath;
                }
                else
                {
                    StudentQualCertpath = "";
                }


                if (UpdateCertificateReqAtt.ExperienceCertificate != "")
                {
                    var StdExpCert = "ExperienceCertificate" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdExpCert);
                    byte[] Bytes = Convert.FromBase64String(UpdateCertificateReqAtt.ExperienceCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentExpCertpath = relativePath;
                }
                else
                {
                    StudentExpCertpath = "";
                }

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[32];
                param[0] = new SqlParameter("@ApplicationNumber", UpdateCertificateReqAtt.ApplicationNumber);
                param[1] = new SqlParameter("@InstitutionID", UpdateCertificateReqAtt.InstitutionID);
                param[2] = new SqlParameter("@CourseID", UpdateCertificateReqAtt.CourseID);
                param[3] = new SqlParameter("@CourseQualificationID", UpdateCertificateReqAtt.CourseQualificationID);
                param[4] = new SqlParameter("@CourseExperienceID", UpdateCertificateReqAtt.CourseExperienceID);
                param[5] = new SqlParameter("@SSC", UpdateCertificateReqAtt.SSC);
                param[6] = new SqlParameter("@SSCHallticketNumber", UpdateCertificateReqAtt.SSCHallticketNumber);
                param[7] = new SqlParameter("@SSCPassedYear", UpdateCertificateReqAtt.SSCPassedYear);
                param[8] = new SqlParameter("@SSCPassedType", UpdateCertificateReqAtt.SSCPassedType);
                param[9] = new SqlParameter("@StudentName", UpdateCertificateReqAtt.StudentName);
                param[10] = new SqlParameter("@FatherName", UpdateCertificateReqAtt.FatherName);
                param[11] = new SqlParameter("@MotherName", UpdateCertificateReqAtt.MotherName);
                param[12] = new SqlParameter("@DateofBirth", UpdateCertificateReqAtt.DateofBirth);
                param[13] = new SqlParameter("@SSCDateofBirth", UpdateCertificateReqAtt.SSCDateofBirth);
                param[14] = new SqlParameter("@Gender", UpdateCertificateReqAtt.Gender);
                param[15] = new SqlParameter("@AadharNumber", UpdateCertificateReqAtt.AadharNumber);
                param[16] = new SqlParameter("@HouseNumber", UpdateCertificateReqAtt.HouseNumber);
                param[17] = new SqlParameter("@Street", UpdateCertificateReqAtt.Street);
                param[18] = new SqlParameter("@Landmark", UpdateCertificateReqAtt.Landmark);
                param[19] = new SqlParameter("@Village", UpdateCertificateReqAtt.Village);
                param[20] = new SqlParameter("@Pincode", UpdateCertificateReqAtt.Pincode);
                param[21] = new SqlParameter("@District", UpdateCertificateReqAtt.District);
                param[22] = new SqlParameter("@AddressState", UpdateCertificateReqAtt.AddressState);
                param[23] = new SqlParameter("@StudentMobile", UpdateCertificateReqAtt.StudentMobile);
                param[24] = new SqlParameter("@StudentEmail", UpdateCertificateReqAtt.StudentEmail);
                param[25] = new SqlParameter("@SSCValidated", UpdateCertificateReqAtt.SSCValidated);
                param[26] = new SqlParameter("@UserName", UpdateCertificateReqAtt.UserName);
                param[27] = new SqlParameter("@StudentPhoto", StudentPhotopath);
                param[28] = new SqlParameter("@StudentSign", StudentSignpath);
                param[29] = new SqlParameter("@SSCCertificate", StudentSscCertpath);
                param[30] = new SqlParameter("@QualificationCertificate", StudentQualCertpath);
                param[31] = new SqlParameter("@ExperienceCertificate", StudentExpCertpath);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_StudentDetails", 0, ex.Message);
                return ex.Message;
            }

        }
        //public class filelist
        //{
        //    public int fileindex { get; set; }
        //    public string file { get; set; }
        //}


        //public class CertificateReqAtt
        //{
        //  public string ApplicationNumber { get; set; }

        //    public int InstitutionID { get; set; }
        //    public int CourseID { get; set; }
        //    public int CourseQualificationID { get; set; }
        //    public int CourseExperienceID { get; set; }
        //    public int SSC { get; set; }
        //    public string SSCHallticketNumber { get; set; }
        //    public int SSCPassedYear { get; set; }
        //    public string SSCPassedType { get; set; }
        //    public string StudentName { get; set; }
        //    public string FatherName { get; set; }
        //    public string MotherName { get; set; }
        //    public DateFormat DateofBirth { get; set; }
        //    public string SSCDateofBirth { get; set; }
        //    public string Gender { get; set; }
        //    public int AadharNumber { get; set; }
        //    public string HouseNumber { get; set; }
        //    public string Street { get; set; }
        //    public string Landmark { get; set; }
        //    public string Village { get; set; }
        //    public int Pincode { get; set; }
        //    public string District { get; set; }
        //    public string AddressState { get; set; }
        //    public string StudentMobile { get; set; }
        //    public string StudentEmail { get; set; }
        //    public bool SSCValidated { get; set; }

        //    public string UserName { get; set; }
        //    public string StudentPhoto { get; set; }
        //    public string StudentSign { get; set; }
        //    public string SSCCertificate { get; set; }
        //    public string QualificationCertificate { get; set; }
        //    public string ExperienceCertificate { get; set; }
        //    public List<filelist> filedata { get; set; }


        //}
        //[HttpPost, ActionName("AddStudentDetails")]
        //public string AddStudentDetails([FromBody] CertificateReqAtt CertificateReqAtt)
        //{
        //    try
        //    {
        //        var fileDat = new List<filelist>();
        //        int size = CertificateReqAtt.filedata.Count;
        //        var file = string.Empty;
        //        for (int i = 0; i < size; i++)
        //        {
        //            var filename = CertificateReqAtt.ApplicationNumber + "_" + Guid.NewGuid() + ".jpg";
        //            var path = ConfigurationManager.AppSettings["certFolderPath"];
        //            bool folderExists = Directory.Exists(path);
        //            if (!folderExists)
        //                Directory.CreateDirectory(path);
        //            string imgPath = Path.Combine(path, filename);
        //            byte[] imageBytes = Convert.FromBase64String(CertificateReqAtt.filedata[i].file);
        //            File.WriteAllBytes(imgPath, imageBytes);
        //            file += filename + ',';
        //        }
        //        var dbHandler = new ccicdbHandler();
        //        var param = new SqlParameter[32];
        //        param[0] = new SqlParameter("@ApplicationNumber", CertificateReqAtt.ApplicationNumber);
        //        param[1] = new SqlParameter("@InstitutionID", CertificateReqAtt.InstitutionID);
        //        param[2] = new SqlParameter("@CourseID", CertificateReqAtt.CourseID);
        //        param[3] = new SqlParameter("@CourseQualificationID", CertificateReqAtt.CourseQualificationID);
        //        param[4] = new SqlParameter("@CourseExperienceID", CertificateReqAtt.CourseExperienceID);
        //        param[5] = new SqlParameter("@SSC", CertificateReqAtt.SSC);
        //        param[6] = new SqlParameter("@SSCHallticketNumber", CertificateReqAtt.SSCHallticketNumber);
        //        param[7] = new SqlParameter("@SSCPassedYear", CertificateReqAtt.SSCPassedYear);
        //        param[8] = new SqlParameter("@SSCPassedType", CertificateReqAtt.SSCPassedType);
        //        param[9] = new SqlParameter("@StudentName", CertificateReqAtt.StudentName);
        //        param[10] = new SqlParameter("@FatherName", CertificateReqAtt.FatherName);
        //        param[11] = new SqlParameter("@MotherName", CertificateReqAtt.MotherName);
        //        param[12] = new SqlParameter("@DateofBirth", CertificateReqAtt.DateofBirth);
        //        param[13] = new SqlParameter("@SSCDateofBirth", CertificateReqAtt.SSCDateofBirth);
        //        param[14] = new SqlParameter("@Gender", CertificateReqAtt.Gender);
        //        param[15] = new SqlParameter("@AadharNumber", CertificateReqAtt.AadharNumber);
        //        param[16] = new SqlParameter("@HouseNumber", CertificateReqAtt.HouseNumber);
        //        param[17] = new SqlParameter("@Street", CertificateReqAtt.Street);
        //        param[18] = new SqlParameter("@Landmark", CertificateReqAtt.Landmark);
        //        param[19] = new SqlParameter("@Village", CertificateReqAtt.Village);
        //        param[20] = new SqlParameter("@Pincode", CertificateReqAtt.Pincode);
        //        param[21] = new SqlParameter("@District", CertificateReqAtt.District);
        //        param[22] = new SqlParameter("@AddressState", CertificateReqAtt.AddressState);
        //        param[23] = new SqlParameter("@StudentMobile", CertificateReqAtt.StudentMobile);
        //        param[24] = new SqlParameter("@StudentEmail", CertificateReqAtt.StudentEmail);
        //        param[25] = new SqlParameter("@SSCValidated", CertificateReqAtt.SSCValidated);
        //        param[26] = new SqlParameter("@UserName", CertificateReqAtt.UserName);
        //        param[27] = new SqlParameter("@StudentPhoto", CertificateReqAtt.StudentPhoto);
        //        param[28] = new SqlParameter("@StudentSign", CertificateReqAtt.StudentSign);
        //        param[29] = new SqlParameter("@SSCCertificate", CertificateReqAtt.SSCCertificate);
        //        param[30] = new SqlParameter("@QualificationCertificate", CertificateReqAtt.QualificationCertificate);
        //        param[31] = new SqlParameter("@ExperienceCertificate", CertificateReqAtt.ExperienceCertificate);


        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentDetails", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("SP_Add_StudntDetails", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}

        [HttpPost, ActionName("GetViewStudentDetails")]
        public string GetViewStudentDetails([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ApplicationNumber", data["ApplicationNumber"]);
                param[1] = new SqlParameter("@StudentID", data["StudentID"]);
                


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_ViewStudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_ViewStudentDetails", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("GetStudentDetails")]
        public string GetStudentDetails([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ApplicationNumber", data["ApplicationNumber"]);
                param[1] = new SqlParameter("@StudentID", data["StudentID"]);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_StudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_StudentDetails", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("SetApplicationApprovalStatus")]
        public string SetApplicationApprovalStatus([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@StudentID", data["StudentId"]);
                param[1] = new SqlParameter("@UpdatedBy", data["UpdatedBy"]);
                param[2] = new SqlParameter("@ApplicationStatus", data["ApplicationStatus"]);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_ApplicationApprovalStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Set_ApplicationApprovalStatus", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("GetInstitutionEnrollmentReportData")]
        public string GetInstitutionEnrollmentReportData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
                param[1] = new SqlParameter("@CourseID", data["CourseID"]);
                param[2] = new SqlParameter("@ReportTypeID", data["ReportTypeID"]);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_EnrollmentReportData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Ins_EnrollmentReportData", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("GetInstitutionRegisterReportData")]
        public string GetInstitutionRegisterReportData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
                param[1] = new SqlParameter("@CourseID", data["CourseID"]);
                param[2] = new SqlParameter("@ReportTypeID", data["ReportTypeID"]);
                param[3] = new SqlParameter("@AcademicYearID", data["AcademicYearID"]);
                param[4] = new SqlParameter("@Batch", data["Batch"]);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_RegisterReportData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Ins_RegisterReportData", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("GetInstitutionVerificationReportData")]
        public string GetInstitutionVerificationReportData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
                param[1] = new SqlParameter("@CourseID", data["CourseID"]);
                param[2] = new SqlParameter("@ReportTypeID", data["ReportTypeID"]);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_VerificationReportData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_VerificationReportData", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("SubmitStdDetails")]
        public string SubmitStdDetails([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ApplicationNumber", data["ApplicationNumber"]);
                param[1] = new SqlParameter("@StudentID", data["StudentID"]);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_ApplicationSubmit", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Set_ApplicationSubmit", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("UpdateAcademicYear")]
        public string UpdateAcademicYear(int AcademicYearID,  DateTime AcademicYearStartDate, DateTime AcademicYearEndDate, bool CurrentAcademicYear, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);      
                param[1] = new SqlParameter("@AcademicYearStartDate", AcademicYearStartDate);
                param[2] = new SqlParameter("@AcademicYearEndDate", AcademicYearEndDate);
                param[3] = new SqlParameter("@CurrentAcademicYear", CurrentAcademicYear);
                param[4] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_AcademicYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_AcademicYear", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("AddAcademicYearCurrentBatch")]
        public string AddAcademicYearCurrentBatch(int AcademicYearID,int Batch,bool CurrentBatch,string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Batch", Batch);
                param[2] = new SqlParameter("@CurrentBatch", CurrentBatch);
                param[3] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_AcademicYearCurrentBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_AcademicYearCurrentBatch", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("AddAYCourseDurationBatches")]
        public string AddAYCourseDurationBatches(int AcademicYearID, string CourseDuration, int Batch,DateTime AYBatchStartDate,DateTime AYBatchEndDate, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@CourseDuration", CourseDuration);
                param[2] = new SqlParameter("@Batch", Batch);
                param[3] = new SqlParameter("@AYBatchStartDate", AYBatchStartDate);
                param[4] = new SqlParameter("@AYBatchEndDate", AYBatchEndDate);
                param[5] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_AcademicYearBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_AcademicYearBatch", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("AddEnrollementDates")]
        public string AddEnrollementDates(int AcademicYearID, string CourseDuration, int Batch, DateTime EnrollementStartDate, DateTime EnrollementEndDate, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@CourseDuration", CourseDuration);
                param[2] = new SqlParameter("@Batch", Batch);
                param[3] = new SqlParameter("@EnrollementStartDate", EnrollementStartDate);
                param[4] = new SqlParameter("@EnrollementEndDate", EnrollementEndDate);
                param[5] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_EnrollementDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_EnrollementDates", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("UpdateAcademicYearCurrentBatch")]
        public string UpdateAcademicYearCurrentBatch(int AcademicYearCurrentBatchID,bool CurrentBatch, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearCurrentBatchID", AcademicYearCurrentBatchID);
                param[1] = new SqlParameter("@CurrentBatch", CurrentBatch);
                param[2] = new SqlParameter("@UserName", UserName);
            

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_AcademicYearCurrentBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_AcademicYearCurrentBatch", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("SetAYCourseDurationBatchStatus")]
        public string SetAYCourseDurationBatchStatus(int UpdateType, string UserName, int AcademicYearBatchID, bool Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@AcademicYearBatchID", AcademicYearBatchID);
                param[3] = new SqlParameter("@Active", Active);
                
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_AcademicYearBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_AcademicYearBatch", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("SetExamMonthYearStatus")]
        public string SetExamMonthYearStatus(int UpdateType, string UserName, int ExamMonthYearID, bool Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[3] = new SqlParameter("@Active", Active);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_ExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_ExamMonthYear", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("UpdateAYCourseDurationBatchDates")]
        public string UpdateAYCourseDurationBatchDates(int UpdateType, string UserName, int AcademicYearBatchID, bool Active, DateTime AYBatchStartDate, DateTime AYBatchEndDate)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@AcademicYearBatchID", AcademicYearBatchID);
                param[3] = new SqlParameter("@Active", Active);
                param[4] = new SqlParameter("@AYBatchStartDate", AYBatchStartDate);
                param[5] = new SqlParameter("@AYBatchEndDate", AYBatchEndDate);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_AcademicYearBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_AcademicYearBatch", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("UpdateExamMonthYear")]
        public string UpdateExamMonthYear(string UserName, int ExamMonthYearID, string ExamMonthYearName, int ExamMonthYearSequence)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UserName", UserName);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@ExamMonthYearName", ExamMonthYearName);
                param[3] = new SqlParameter("@ExamMonthYearSequence", ExamMonthYearSequence);
               

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_ExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_ExamMonthYear", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("UpdateEnrollementDates")]
        public string UpdateEnrollementDates(int UpdateType, string UserName, int EnrollementDatesID, bool Active, DateTime EnrollementStartDate, DateTime EnrollementEndDate)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@EnrollementDatesID", EnrollementDatesID);
                param[3] = new SqlParameter("@Active", Active);
                param[4] = new SqlParameter("@EnrollementStartDate", EnrollementStartDate);
                param[5] = new SqlParameter("@EnrollementEndDate", EnrollementEndDate);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_EnrollementDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_EnrollementDates", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("SetEnrollementDatesStatus")]
        public string SetEnrollementDatesStatus(int UpdateType, string UserName, int EnrollementDatesID, bool Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@EnrollementDatesID", EnrollementDatesID);
                param[3] = new SqlParameter("@Active", Active);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_EnrollementDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_EnrollementDates", 0, ex.Message);
                return ex.Message;
            }

        }





        //[HttpGet, ActionName("GetSSCDetails")]
        //public string GetSSCDetails(string TENTH_HT_NO, string TENTH_YEAR, string STREAM)
        //{
        //    try
        //    {
        //        var dbHandler = new ccicdbHandler();
        //        var param = new SqlParameter[3];
        //        param[0] = new SqlParameter("@TENTH_HT_NO", TENTH_HT_NO);
        //        param[1] = new SqlParameter("@TENTH_YEAR", TENTH_YEAR);
        //        param[2] = new SqlParameter("@STREAM", STREAM);



        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("TempSP_Get_SSCData", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("TempSP_Get_SSCData", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}
        public class SscDetails
        {
            public string RollNo { get; set; }
            public string Year { get; set; }
            public string Stream { get; set; }
        }

        [HttpPost, ActionName("GetSSCDetails")]
        public async Task<HttpResponseMessage> GetSSCDetails([FromBody] SscDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["SSC_API"].ToString();
            var urlwithparam = url + "?RollNo=" + ReqData.RollNo + "&Year=" + ReqData.Year + "&Stream=" + ReqData.Stream + "&channel=SBTT&password=S2T20";
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = new HttpResponseMessage();
                    var resMsg = await client.GetAsync(urlwithparam);
                    var content = await resMsg.Content.ReadAsStringAsync();
                    XmlDocument PIDResponseXML = new XmlDocument();
                    PIDResponseXML.LoadXml(content);
                    if (PIDResponseXML.InnerXml.Length != 22)
                    {
                        var ROLLNO = string.Empty;
                        var NAME = string.Empty;
                        var FNAME = string.Empty;
                        var MNAME = string.Empty;
                        var DOB = string.Empty;
                        var SEX = string.Empty;
                        var RESULT = string.Empty;
                        try
                        {
                            ROLLNO = PIDResponseXML["NewDataSet"]["Table"]["ROLLNO"].InnerText;
                            NAME = PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText;
                            FNAME = PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText;
                            MNAME = PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText;
                            DOB = PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText;
                            SEX = PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText;
                            RESULT = PIDResponseXML["NewDataSet"]["Table"]["RESULT"].InnerText;
                        }
                        catch (Exception ex)
                        {
                            ROLLNO = PIDResponseXML["NewDataSet"]["Table"]["ROLLNO"].InnerText;
                            NAME = PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText;
                            FNAME = PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText;
                            MNAME = PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText;
                            DOB = PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText;
                            SEX = "-";
                            RESULT = PIDResponseXML["NewDataSet"]["Table"]["RESULT"].InnerText;
                        }

                        if (RESULT == "PASS")
                        {
                            response = Request.CreateResponse(HttpStatusCode.OK);
                            response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"200\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
                            return response;
                        }
                        else
                        {
                            response = Request.CreateResponse(HttpStatusCode.OK);
                            response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
                            return response;
                        }
                    }
                    else
                    {
                        response = Request.CreateResponse(HttpStatusCode.OK);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"No Data Found\" }"), System.Text.Encoding.UTF8, "application/json");
                        return response;
                    }

                }
                catch (Exception ex)
                {
                    var response = Request.CreateResponse(HttpStatusCode.NotFound);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex + "\" }"), System.Text.Encoding.UTF8, "application/json");
                    return response;
                }

            }
        }


        [HttpPost, ActionName("GetAdminExamCentersList")]
        public HttpResponseMessage GetAdminExamCentersList([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", request["AcademicYearID"]);
                param[1] = new SqlParameter("@CourseIds", request["CourseIds"]);
                param[2] = new SqlParameter("@ExamMonthYearID", request["ExamMonthYearID"]);
               
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_InstitutionVsExamCenter", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_InstitutionVsExamCenter", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("SetAdminExamCentersList")]
        public HttpResponseMessage SetAdminExamCentersList([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Json", request["Json"]);
                param[1] = new SqlParameter("@ExamMonthYearID", request["ExamMonthYearID"]);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_InstitutionVsExamCenter", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Set_InstitutionVsExamCenter", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        public class NRData
        {
            public int StudentTypeID { get; set; }
            public int ExamMonthYearID { get; set; }
            public int CourseDurationID { get; set; }
            public int AcademicYearID { get; set; }
            public int BatchID { get; set; }
            public string UserName { get; set; }

        }

        [HttpPost, ActionName("AddNRDataforFeePayment")]
        public string AddNRDataforFeePayment([FromBody] NRData data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@StudentTypeID", data.StudentTypeID);
                param[1] = new SqlParameter("@ExamMonthYearID", data.ExamMonthYearID);
                param[2] = new SqlParameter("@CourseDurationID", data.CourseDurationID);
                param[3] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[4] = new SqlParameter("@BatchID", data.BatchID);
                param[5] = new SqlParameter("@UserName", data.UserName);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_FeePaymentNRData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_FeePaymentNRData", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetFeePaymentNRData")]
        public string GetFeePaymentNRData(int ExamMonthYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_FeePaymentNRData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetFeePaymentDates")]
        public string GetFeePaymentDates([FromBody] FeePaymentDatesInfo data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[2] = new SqlParameter("@FeePaymentDateID", data.FeePaymentDateID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_FeePaymentDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_FeePaymentDates", 0, ex.Message);
                return ex.Message;
            }

        }

        public class FeePaymentDatesInfo
        {
            public int DataType { get; set; }
            public int FeePaymentDateID { get; set; }
            public int AcademicYearID { get; set; }
            public int ExamMonthYearID { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime LastDatewithoutFine { get; set; }
            public DateTime LastDatewithFine { get; set; }
            public DateTime TatkalEndDate { get; set; }
            public DateTime PremiumTatkalEndDate { get; set; }
            public int ExaminationFee { get; set; }
            public int LateFee { get; set; }
            public int TatkalFee { get; set; }
            public int PremiumTatkalFee { get; set; }
            public int CertificateFee { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }
        }



        [HttpPost, ActionName("AddorUpdateFeePaymentDates")]
        public string AddorUpdateFeePaymentDates([FromBody] FeePaymentDatesInfo data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[16];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@FeePaymentDateID", data.FeePaymentDateID);
                param[2] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[3] = new SqlParameter("@ExamMonthYearID", data.ExamMonthYearID);
                param[4] = new SqlParameter("@StartDate", data.StartDate);
                param[5] = new SqlParameter("@LastDatewithoutFine", data.LastDatewithoutFine);
                param[6] = new SqlParameter("@LastDatewithFine", data.LastDatewithFine);
                param[7] = new SqlParameter("@TatkalEndDate", data.TatkalEndDate);
                param[8] = new SqlParameter("@PremiumTatkalEndDate", data.PremiumTatkalEndDate);
                param[9] = new SqlParameter("@ExaminationFee", data.ExaminationFee);
                param[10] = new SqlParameter("@LateFee", data.LateFee);
                param[11] = new SqlParameter("@TatkalFee", data.TatkalFee);
                param[12] = new SqlParameter("@PremiumTatkalFee", data.PremiumTatkalFee);
                param[13] = new SqlParameter("@CertificateFee", data.CertificateFee);
                param[14] = new SqlParameter("@Active", data.Active);
                param[15] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_FeePaymentDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_Update_FeePaymentDates", 0, ex.Message);
                return ex.Message;
            }

        }
    }

}
