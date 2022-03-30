

using System;

using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using Newtonsoft.Json;

using SoftwareSuite.Models.Database;
using SoftwareSuite.Models.CCIC;
using System.Collections.Generic;
using System.Linq;
using SoftwareSuite.BLL;
using System.Threading.Tasks;
using System.Configuration;
using System.Xml;
using static SoftwareSuite.Controllers.PreExamination.PreExaminationController;
using RestSharp;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicPreExaminationController : ApiController
    {
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
        public HttpResponseMessage GetCcicCourseDurations()
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


        [HttpGet, ActionName("GetCcicAcademicYearBatch")]
        public string GetCcicAcademicYearBatch(int AcademicYearID)
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

        [HttpGet, ActionName("GetEnrollmentDates")]
        public string GetEnrollmentDates(int AcademicYearID)
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

        [HttpGet, ActionName("AddAcademicYearBatch")]
        public string AddAcademicYearBatch(int AcademicYearID, string CourseDuration, int Batch, DateTime AYBatchStartDate, DateTime AYBatchEndDate,string UserName)
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

        [HttpGet, ActionName("AddEnrollmentDates")]
        public string AddEnrollmentDates(int AcademicYearID, string CourseDuration, int Batch, DateTime EnrollementStartDate, DateTime EnrollementEndDate, string UserName)
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


        [HttpGet, ActionName("UpdateAcademicYearBatch")]
        public string UpdateAcademicYearBatch(int UpdateType,string UserName, int AcademicYearBatchID, bool Active,DateTime AYBatchStartDate, DateTime AYBatchEndDate)
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


        [HttpGet, ActionName("SetAcademicYearBatchStatus")]
        public string SetAcademicYearBatchStatus(int UpdateType, string UserName, int AcademicYearBatchID, bool Active)
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

        [HttpGet, ActionName("UpdateEnrollmentDates")]
        public string UpdateEnrollmentDates(int UpdateType, string UserName, int EnrollementDatesID, bool Active, DateTime EnrollementStartDate, DateTime EnrollementEndDate)
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



        [HttpGet, ActionName("SetEnrollmentDatesStatus")]
        public string SetEnrollmentDatesStatus(int UpdateType, string UserName, int EnrollementDatesID, bool Active)
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



        //[HttpPost, ActionName("GetSSCDetails")]
        //public async Task<HttpResponseMessage> GetSSCDetails([FromBody] SscDetails ReqData)
        //{

        //    var url = ConfigurationManager.AppSettings["SSC_API"].ToString();
        //    var urlwithparam = url + "?RollNo=" + ReqData.RollNo + "&Year=" + ReqData.Year + "&Stream=" + ReqData.Stream + "&channel=SBTT&password=S2T20";
        //    using (HttpClient client = new HttpClient())
        //    {
        //        try
        //        {
        //            HttpResponseMessage response = new HttpResponseMessage();
        //            var resMsg = await client.GetAsync(urlwithparam);
        //            var content = await resMsg.Content.ReadAsStringAsync();
        //            XmlDocument PIDResponseXML = new XmlDocument();
        //            PIDResponseXML.LoadXml(content);
        //            if (PIDResponseXML.InnerXml.Length != 22)
        //            {
        //                var ROLLNO = string.Empty;
        //                var NAME = string.Empty;
        //                var FNAME = string.Empty;
        //                var MNAME = string.Empty;
        //                var DOB = string.Empty;
        //                var SEX = string.Empty;
        //                var RESULT = string.Empty;
        //                try
        //                {
        //                    ROLLNO = PIDResponseXML["NewDataSet"]["Table"]["ROLLNO"].InnerText;
        //                    NAME = PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText;
        //                    FNAME = PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText;
        //                    MNAME = PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText;
        //                    DOB = PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText;
        //                    SEX = PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText;
        //                    RESULT = PIDResponseXML["NewDataSet"]["Table"]["RESULT"].InnerText;
        //                }
        //                catch (Exception ex)
        //                {
        //                    ROLLNO = PIDResponseXML["NewDataSet"]["Table"]["ROLLNO"].InnerText;
        //                    NAME = PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText;
        //                    FNAME = PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText;
        //                    MNAME = PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText;
        //                    DOB = PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText;
        //                    SEX = "-";
        //                    RESULT = PIDResponseXML["NewDataSet"]["Table"]["RESULT"].InnerText;
        //                }

        //                if (RESULT == "PASS")
        //                {
        //                    response = Request.CreateResponse(HttpStatusCode.OK);
        //                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"200\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
        //                    return response;
        //                }
        //                else
        //                {
        //                    response = Request.CreateResponse(HttpStatusCode.OK);
        //                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
        //                    return response;
        //                }
        //            }
        //            else
        //            {
        //                response = Request.CreateResponse(HttpStatusCode.OK);
        //                response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"No Data Found\" }"), System.Text.Encoding.UTF8, "application/json");
        //                return response;
        //            }

        //        }
        //        catch (Exception ex)
        //        {
        //            var response = Request.CreateResponse(HttpStatusCode.NotFound);
        //            response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex + "\" }"), System.Text.Encoding.UTF8, "application/json");
        //            return response;
        //        }

        //    }
        //}

        [HttpGet, ActionName("GetSSCDetails")]
        public string GetSSCDetails(string TENTH_HT_NO, string TENTH_YEAR, string STREAM)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@TENTH_HT_NO", TENTH_HT_NO);
                param[1] = new SqlParameter("@TENTH_YEAR", TENTH_YEAR);
                param[2] = new SqlParameter("@STREAM", STREAM);
               


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("TempSP_Get_SSCData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("TempSP_Get_SSCData", 0, ex.Message);
                return ex.Message;
            }

        }



    }
}
