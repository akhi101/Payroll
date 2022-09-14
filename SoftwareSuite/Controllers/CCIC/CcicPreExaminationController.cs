

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

        [HttpGet, ActionName("GetCcicCourseDurations")]
        public string GetCcicCourseDurations(int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Batch", Batch);

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

        [HttpGet, ActionName("GetStudentFeeDates")]
        public HttpResponseMessage GetStudentFeeDates()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_FeePaymentDates";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_FeePaymentDates", 0, ex.Message);
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
        public string GetCcicCourseDurationBatches(string CourseDuration)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseDuration", CourseDuration);

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
        public string GetInsRegisterReportCoursesCount(int InstitutionID,int AcademicYearID,int Batch)
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

        [HttpGet, ActionName("GetInstitutionVerificationReportCount")]
        public string GetInstitutionVerificationReportCount(int InstitutionID)
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
        public string GetRegisterCoursesCount(int InstitutionID,int AcademicYearID, int Batch)
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
        public string GetAdminRegisterReportData(int InstitutionID, int CourseID,int ReportTypeID,int AcademicYearID, int Batch)
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

        [HttpGet, ActionName("GetAdminVerificationReportCount")]
        public HttpResponseMessage GetAdminVerificationReportCount()
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
        public string GetAYBatchExamMonthYear(int AcademicYearID,int Batch)
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






        [HttpGet, ActionName("AddExamMonthYear")]
        public string AddExamMonthYear(int AcademicYearID,int Batch,string ExamMonthYearName,string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Batch", Batch);
                param[2] = new SqlParameter("@ExamMonthYearName", ExamMonthYearName);
                param[3] = new SqlParameter("@UserName", UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_ExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
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
        public string AddAcademicYear(int AcademicStartYear, string AcademicYear, DateTime AcademicYearStartDate, DateTime AcademicYearEndDate,bool CurrentAcademicYear, string UserName)
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


        [HttpPost, ActionName("AddStudentDetails")]
        public string AddStudentDetails([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[32];
                param[0] = new SqlParameter("@ApplicationNumber",data["ApplicationNumber"]);
                param[1] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
                param[2] = new SqlParameter("@CourseID", data["CourseID"]);
                param[3] = new SqlParameter("@CourseQualificationID", data["CourseQualificationID"]);
                param[4] = new SqlParameter("@CourseExperienceID", data["CourseExperienceID"]);
                param[5] = new SqlParameter("@SSC", data["SSC"]);
                param[6] = new SqlParameter("@SSCHallticketNumber", data["SSCHallticketNumber"]);
                param[7] = new SqlParameter("@SSCPassedYear", data["SSCPassedYear"]);
                param[8] = new SqlParameter("@SSCPassedType", data["SSCPassedType"]);
                param[9] = new SqlParameter("@StudentName", data["StudentName"]);
                param[10] = new SqlParameter("@FatherName", data["FatherName"]);
                param[11] = new SqlParameter("@MotherName", data["MotherName"]);
                param[12] = new SqlParameter("@DateofBirth", data["DateofBirth"]);
                param[13] = new SqlParameter("@SSCDateofBirth", data["SSCDateofBirth"]);
                param[14] = new SqlParameter("@Gender", data["Gender"]);
                param[15] = new SqlParameter("@AadharNumber", data["AadharNumber"]);
                param[16] = new SqlParameter("@HouseNumber", data["HouseNumber"]);
                param[17] = new SqlParameter("@Street", data["Street"]);
                param[18] = new SqlParameter("@Landmark", data["Landmark"]);
                param[19] = new SqlParameter("@Village", data["Village"]);
                param[20] = new SqlParameter("@Pincode", data["Pincode"]);
                param[21] = new SqlParameter("@District", data["District"]);
                param[22] = new SqlParameter("@AddressState", data["AddressState"]);
                param[23] = new SqlParameter("@StudentMobile", data["StudentMobile"]);
                param[24] = new SqlParameter("@StudentEmail", data["StudentEmail"]);
                param[25] = new SqlParameter("@SSCValidated", data["SSCValidated"]);
                param[26] = new SqlParameter("@UserName", data["UserName"]);
                param[27] = new SqlParameter("@StudentPhoto", data["StudentPhoto"]);
                param[28] = new SqlParameter("@StudentSign", data["StudentSign"]);
                param[29] = new SqlParameter("@SSCCertificate", data["SSCCertificate"]);
                param[30] = new SqlParameter("@QualificationCertificate", data["QualificationCertificate"]);
                param[31] = new SqlParameter("@ExperienceCertificate", data["ExperienceCertificate"]);
                

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_StudntDetails", 0, ex.Message);
                return ex.Message;
            }

        }

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


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_EnrollmentReportData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Ins_EnrollmentReportData", 0, ex.Message);
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

        [HttpPost, ActionName("SetStudentFeePayments")]
        public string SetStudentFeePayments([FromBody] PaymentDetails request)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[14];
                param[0] = new SqlParameter("@AcademicYearId", request.AcademicYearId);
                param[1] = new SqlParameter("@ExamMonthYearId", request.ExamMonthYearId);
                param[2] = new SqlParameter("@CourseId", request.CourseId);
                param[3] = new SqlParameter("@StudentType", request.StudentType);
                param[4] = new SqlParameter("@StartDate", request.StartDate);
                param[5] = new SqlParameter("@EndDate", request.EndDate);
                param[6] = new SqlParameter("@LateFeeDate", request.LateFeeDate);
                param[7] = new SqlParameter("@TatkalDate", request.TatkalDate);
                param[8] = new SqlParameter("@PremiumTatkalDate", request.PremiumTatkalDate);
                param[9] = new SqlParameter("@Fee", request.Fee);
                param[10] = new SqlParameter("@LateFee", request.LateFee);
                param[11] = new SqlParameter("@TatkalFee", request.TatkalFee);
                param[12] = new SqlParameter("@PremiumTatkalFee", request.PremiumTatkalFee);
                param[13] = new SqlParameter("@CertificateFee", request.CertificateFee);               
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_FeePaymentDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
