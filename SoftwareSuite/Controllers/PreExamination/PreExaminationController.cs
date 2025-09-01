extern alias itextalias;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;
using SoftwareSuite.Models.Database;
using System.IO;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace SoftwareSuite.Controllers.PreExamination
{
    //[Authorize(Users = "Admin")]
    //[Authorize]
    public class PreExaminationController : ApiController
    {

        public static T? GetValueOrNull<T>(string valueAsString) where T : struct
        {
            if (string.IsNullOrEmpty(valueAsString))
                return null;
            return (T)Convert.ChangeType(valueAsString, typeof(T));
        }

        [HttpGet, ActionName("testqr")]
        public void testqr()
        {
            var url = string.Format("http://chart.apis.google.com/chart?cht=qr&chs={1}x{2}&chl={0}", "dsa", "152", "152");
            WebResponse response = default(WebResponse);
            Stream remoteStream = default(Stream);
            StreamReader readStream = default(StreamReader);
            WebRequest request = WebRequest.Create(url);
            response = request.GetResponse();
            remoteStream = response.GetResponseStream();
            readStream = new StreamReader(remoteStream);
            System.Drawing.Image img = System.Drawing.Image.FromStream(remoteStream);

            System.Drawing.Bitmap bImage = (System.Drawing.Bitmap)img; // Your Bitmap Image
            System.IO.MemoryStream ms = new MemoryStream();
            bImage.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
            byte[] byteImage = ms.ToArray();
            var SigBase64 = Convert.ToBase64String(byteImage);
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


      
        [HttpGet, ActionName("GetStudentServicesCounts")]
        public HttpResponseMessage GetStudentServicesCounts()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec SBP_SS_StudentServicesCounts";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBP_SS_StudentServicesCounts", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("getWebsiteFeedbackReport")]
        public HttpResponseMessage getWebsiteFeedbackReport()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GET_WebsiteFeedback";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_GET_WebsiteFeedback", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GenerateOtpForMobileNoUpdate")]
        public string GenerateOtpForMobileNoUpdate(string Pin, string Phone)
        {
            string otpMsg = "OTP for updating mobile no {0}, valid for 10 min. Secretary, SBTET TS.";
            DataSet dt = new DataSet();
            string Message = string.Empty;
            string resp = string.Empty;
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@PhoneNumber", Phone);
                dt = dbHandler.ReturnDataWithStoredProcedure("usp_SOS_GET_OTP_MobileUpdate", param);

                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() != "200")
                {
                    return "{\"status\":\"400\",\"description\" : \"" + dt.Tables[0].Rows[0]["StatusDescription"].ToString() + "\"}";
                }
                Message = string.Format(otpMsg, dt.Tables[1].Rows[0]["Otp"]);
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (Phone != null || Phone != string.Empty)
                {
                    string urlParameters = "?mobile=" + Phone + "&message=" + Message + "&templateid=1007161786863825790";
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    resp = "OTP sent to the mobile number :" + Phone.ToString().Substring(0, 2) + "xxxxx" + Phone.ToString().Substring(7);
                    return "{\"status\":\"200\",\"description\" : \"" + resp + "\"}";

                }
                else
                {
                    resp = "Mobile number not valid";
                    return "{\"status\":\"400\",\"description\" : \"" + resp + "\"}";


                }

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("usp_SOS_GET_OTP_MobileUpdate", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("UpdateUserdata")]
        public string UpdateUserdata(string Pin, string StudentPhoneNumber, string OTP)
        {
            try
            {
                //var base64EncodedBytes = System.Convert.FromBase64String(OTP);
                //var password=  System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@StudentPhoneNumber", StudentPhoneNumber);
                param[2] = new SqlParameter("@Otp", OTP);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_UpdateStudentPhone", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

    }

}
