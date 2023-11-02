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
using System.Data;
using SoftwareSuite.Models;
using static SoftwareSuite.Controllers.Assessment.AssessmentController;
using System.Timers;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicAssessmentController : ApiController
    {


        public class EntryDatesInfo
        {
            public int DataType { get; set; }
            public int EntryDateID { get; set; }
            public int AcademicYearID { get; set; }
            public int ExamMonthYearID { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("AddorUpdateorInActiveAssesmentEntryDates")]
        public string AddorUpdateorInActiveAssesmentEntryDates([FromBody] EntryDatesInfo data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@EntryDateID", data.EntryDateID);
                param[2] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[3] = new SqlParameter("@ExamMonthYearID", data.ExamMonthYearID);
                param[4] = new SqlParameter("@StartDate", data.StartDate);
                param[5] = new SqlParameter("@EndDate", data.EndDate);
                param[6] = new SqlParameter("@Active", data.Active);
                param[7] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_AssesmentEntryDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_Update_AssesmentEntryDates", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetAssesmentEntryDates")]
        public string GetAssesmentEntryDates(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AssesmentEntryDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
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

        [HttpGet, ActionName("VerifyAssesmentEntryDate")]
        public string VerifyAssesmentEntryDate(int AcademicYearID,int ExamMonthYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Verify_AssessmentEntryDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetExamTypes")]
        public HttpResponseMessage GetExamTypes()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_ExamTypes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_ExamTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


    }

}
