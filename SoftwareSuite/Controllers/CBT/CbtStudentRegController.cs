using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using RestSharp;
using System.Web.Http;
using System.Xml;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using System.IO;
using SoftwareSuite.Models.Database;
using SoftwareSuite.BLL;
using SoftwareSuite.Services;
using SoftwareSuite.Models.CBT;
using System.Text;
using Environment = Syntizen.Aadhaar.AUAKUA.Environment;
using System.Xml.Serialization;
using SoftwareSuite.Models.Security;
using SoftwareSuite.Controllers.Common;
using System.Net.Http.Headers;
using System.Timers;
using SoftwareSuite.Models;
using static SoftwareSuite.Controllers.TWSH.GenerateTwshOdc;
using static SoftwareSuite.Controllers.TWSH.GenerateTwshPrinterNr;
using static SoftwareSuite.Controllers.TWSH.GenerateTwshNR;
using DocumentFormat.OpenXml.Wordprocessing;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace SoftwareSuite.Controllers.CBT
{
   
    public class CbtStudentRegController : ApiController
    {



        [HttpGet, ActionName("GetCBTCourses")]
        public object GetCBTCourses()
        {
            try
            {
                var db = new CbtdbHandler();
                var res = db.ReturnData("SP_GET_Courses");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("getLanguages")]
        public HttpResponseMessage getLanguages(int CourseId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseId", CourseId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_Languages", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetGradeList")]
        public HttpResponseMessage GetGradeList(int CourseId, int language)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@CourseId", CourseId);
                param[1] = new SqlParameter("@LanguageId", language);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_Grades", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetCBTExamcentersAndDates")]
        public HttpResponseMessage GetCBTExamcentersAndDates(int CoursesType, int DistrictId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@CoursesType", CoursesType);
                param[1] = new SqlParameter("@DistrictId", DistrictId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_TWSH_ExaminationCenters_Dates", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetExaminationDistricts")]
        public HttpResponseMessage GetExaminationDistricts(int CourseId, int UserId, int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@CourseId", CourseId);
                param[1] = new SqlParameter("@UserId", UserId);
                param[2] = new SqlParameter("@GradeId", GradeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_ExaminationDistricts", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }



        [HttpGet, ActionName("GetOtpAadhaarKyc")]
        public HttpResponseMessage GetOtpAadhaarKyc(String AadhaarNo)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                byte[] bytes = Convert.FromBase64String(AadhaarNo);
                AadhaarNo = System.Text.Encoding.ASCII.GetString(bytes);
                var LicKey = ConfigurationManager.AppSettings["SLK"];
                var envKey = ConfigurationManager.AppSettings["AUA_ENV"].ToString();
                Environment env = 0;
                if (envKey == "PREPROD")
                {
                    env = Environment.PreProduction;
                }
                else if (envKey == "PRODUCTION")
                {
                    env = Environment.Production;
                }
                var res = AuaKuaHelper.GenerateOTP(AadhaarNo, "10", LicKey, env);
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }




        [HttpGet]
        public async Task<HttpResponseMessage> DoKyc(string AadhaarNumber, string Otp, string TxnId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                byte[] aadharbytes = Convert.FromBase64String(AadhaarNumber);
                var AadhaarNo = System.Text.Encoding.ASCII.GetString(aadharbytes);
                var LicKey = ConfigurationManager.AppSettings["SLK"];
                var envKey = ConfigurationManager.AppSettings["AUA_ENV"].ToString();
                Environment env = 0;
                if (envKey == "PREPROD")
                {
                    env = Syntizen.Aadhaar.AUAKUA.Environment.PreProduction;
                }
                else if (envKey == "PRODUCTION")
                {
                    env = Syntizen.Aadhaar.AUAKUA.Environment.Production;
                }

                if (!string.IsNullOrWhiteSpace(Otp) && !string.IsNullOrWhiteSpace(AadhaarNo) && !string.IsNullOrWhiteSpace(TxnId))
                {
                    var data = AuaKuaHelper.KYCWithOTP(AadhaarNo, Otp, TxnId, LicKey, env);
                    var dataObj = JsonConvert.DeserializeObject<KycReq>(data);
                    if (dataObj.Ret == "y" && dataObj.Err == "000")
                    {
                        var bytes = Convert.FromBase64String(dataObj.ResponseXml);
                        var resXml = System.Text.Encoding.UTF8.GetString(bytes);
                        using (var stream = StringUtilities.GenerateStreamFromString(resXml))
                        {
                            XmlSerializer serializer = new XmlSerializer(typeof(KycRes));
                            var kycRes = (KycRes)serializer.Deserialize(stream);
                            if (kycRes.Ret == "Y")
                            {
                                var dbHandler = new CbtdbHandler();
                                var param = new SqlParameter[16];
                                param[0] = new SqlParameter("@Name", kycRes.UidData.Poi.Name);
                                param[1] = new SqlParameter("@Gender", kycRes.UidData.Poi.Gender);
                                param[2] = new SqlParameter("@DateOfBirth", kycRes.UidData.Poi.Dob);
                                param[3] = new SqlParameter("@Co", kycRes.UidData.Poa.Co);
                                param[4] = new SqlParameter("@Country", kycRes.UidData.Poa.Dist);
                                param[5] = new SqlParameter("@District", kycRes.UidData.Poa.Dist);
                                param[6] = new SqlParameter("@House", kycRes.UidData.Poa.House);
                                param[7] = new SqlParameter("@LandMark", kycRes.UidData.Poa.Lm);
                                param[8] = new SqlParameter("@Loc", kycRes.UidData.Poa.Loc);
                                param[9] = new SqlParameter("@PinCode", kycRes.UidData.Poa.Pc);
                                param[10] = new SqlParameter("@PostOffice", kycRes.UidData.Poa.Po);
                                param[11] = new SqlParameter("@State", kycRes.UidData.Poa.State);
                                param[12] = new SqlParameter("@Street", kycRes.UidData.Poa.Street);
                                param[13] = new SqlParameter("@SubDist", kycRes.UidData.Poa.Subdist);
                                param[14] = new SqlParameter("@Vtc", kycRes.UidData.Poa.Vtc);
                                param[15] = new SqlParameter("@Aadhaar", AadhaarNo);
                                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_SET_StudentAadhaarDetails", param);

                                return Request.CreateResponse(HttpStatusCode.OK, true);
                            }
                            return Request.CreateResponse(HttpStatusCode.OK, false);
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);

            }
            return Request.CreateResponse(HttpStatusCode.OK, false);
        }




        [HttpGet, ActionName("GetPreviousExamData")]
        public HttpResponseMessage GetPreviousExamData(String HallticketNo, int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@HallticketNo", HallticketNo);
                param[1] = new SqlParameter("@GradeId", GradeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_PreviousData", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        public class SscDetails
        {
            public string RollNo { get; set; }
            public string Year { get; set; }
            public string Stream { get; set; }
            public string TENTH_HT_NO { get; set; }
            public string TENTH_YEAR { get; set; }
            public string STREAMS { get; set; }
        }

        [HttpPost, ActionName("TempGetSSCDetails")]
        public HttpResponseMessage TempGetSSCDetails([FromBody] SscDetails data)
        {
            var dbHandler = new CbtdbHandler();

            try
            {

                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@TENTH_HT_NO", data.TENTH_HT_NO);
                param[1] = new SqlParameter("@TENTH_YEAR", data.TENTH_YEAR);
                param[2] = new SqlParameter("@STREAMS", data.STREAMS);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Temp_SSCData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Temp_SSCData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetQualificationList")]
        public HttpResponseMessage GetQualificationList(int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@GradeId", GradeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_Qualifications", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }




    }


}
