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
using System.IO;
using System.Web;
using System.Data;

using System.Collections.Generic;
using SoftwareSuite.Models;
using System.Timers;

namespace SoftwareSuite.Controllers.PayRoll
{
    public class PayRollController : ApiController
    {

        [HttpGet, ActionName("GetDesignationTypes")]
        public HttpResponseMessage GetDesignationTypes()
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_DesignationTypes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_DesignationTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("GetorEditDesignationData")]
        public string GetorEditDesignationData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@DesignationId", request["DesignationId"]);
                param[2] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Designations", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }


        [HttpPost, ActionName("AddorUpdateDesignations")]
        public string AddorUpdateDesignations([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@DesignationId", request["DesignationId"]);
                param[2] = new SqlParameter("@DesignationName", request["DesignationName"]);
                param[3] = new SqlParameter("@DesignationTypeId", request["DesignationTypeId"]);
                param[4] = new SqlParameter("@DesignationOrder", request["DesignationOrder"]);
                param[5] = new SqlParameter("@NoOfPost", request["NoOfPost"]);
                param[6] = new SqlParameter("@GONumber", request["GONumber"]);
                param[7] = new SqlParameter("@NoOfVacants", request["NoOfVacants"]);
                param[8] = new SqlParameter("@Active", request["Active"]);
                param[9] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_Designations", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }




        [HttpPost, ActionName("GetorEditDepartmentsData")]
        public string GetorEditDepartmentsData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@DepartmentId", request["DepartmentId"]);
                param[2] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Department", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }


        [HttpPost, ActionName("AddorUpdateDepartments")]
        public string AddorUpdateDepartments([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@DepartmentId", request["DepartmentId"]);
                param[2] = new SqlParameter("@DepartmentName", request["DepartmentName"]);
                param[3] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_Departments", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }




        [HttpPost, ActionName("GetorEditBankDetailsData")]
        public string GetorEditBankDetailsData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@BankId", request["BankId"]);
                param[2] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_BankDetails", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }


        [HttpPost, ActionName("AddorUpdateBankDetails")]
        public string AddorUpdateBankDetails([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[11];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@BankId", request["BankId"]);
                param[2] = new SqlParameter("@BankName", request["BankName"]);
                param[3] = new SqlParameter("@BankBranch", request["BankBranch"]);
                param[4] = new SqlParameter("@IFSCCode", request["IFSCCode"]);
                param[5] = new SqlParameter("@Address1", request["Address1"]);
                param[6] = new SqlParameter("@Address2", request["Address2"]);
                param[7] = new SqlParameter("@Address3", request["Address3"]);
                param[8] = new SqlParameter("@PinCode", request["PinCode"]);
                param[9] = new SqlParameter("@Active", request["Active"]);
                param[10] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_BankDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }







        [HttpPost, ActionName("GetorEditEmployeeDetailsData")]
        public string GetorEditEmployeeDetailsData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@EmployeeId", request["EmployeeId"]);
                param[2] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_EmployeeDetails", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }



        public class EmpDetails
        {
            public int DataTypeId { get; set; }
            public int EmployeeID { get; set; }
            public string EmployeeCode { get; set; }
            public string EmployeeName { get; set; }
            public int DesignationId { get; set; }
            public int DepartmentId { get; set; }
            public DateTime DOB { get; set; }
            public DateTime DOJ { get; set; }
            public DateTime DOR { get; set; }
            public DateTime DesignationName { get; set; }
            public DateTime DepartmentName { get; set; }
            public string Gender { get; set; }
            public string PHC { get; set; }
            public string Empstatus { get; set; }
            public string IncrementMonth { get; set; }
            public string ScaleType { get; set; }
            public string PanNO { get; set; }
            public string GPFNo { get; set; }
            public bool CPS_NPS { get; set; }
            public string CPSNo { get; set; }
            public int BankId { get; set; }
            public string AccountNumber { get; set; }
            public string CategoryCode { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }

        }




        [HttpPost, ActionName("AddorUpdateEmployeeDetails")]
        public HttpResponseMessage AddorUpdateEmployeeDetails([FromBody] EmpDetails data)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[23];
                param[0] = new SqlParameter("@DataTypeId", data.DataTypeId);
                param[1] = new SqlParameter("@EmployeeID", data.EmployeeID);
                param[2] = new SqlParameter("@EmployeeCode", data.EmployeeCode);
                param[3] = new SqlParameter("@EmployeeName", data.EmployeeName);
                param[4] = new SqlParameter("@DOB", data.DOB);
                param[5] = new SqlParameter("@DOJ", data.DOJ);
                param[6] = new SqlParameter("@DOR", data.DOR);
                param[7] = new SqlParameter("@DesignationId", data.DesignationId);
                param[8] = new SqlParameter("@DepartmentId", data.DepartmentId);
                param[9] = new SqlParameter("@Gender", data.Gender);
                param[10] = new SqlParameter("@PHC", data.PHC);
                param[11] = new SqlParameter("@Empstatus", data.Empstatus);
                param[12] = new SqlParameter("@IncrementMonth", data.IncrementMonth);
                param[13] = new SqlParameter("@ScaleType", data.ScaleType);
                param[14] = new SqlParameter("@PanNO", data.PanNO);
                param[15] = new SqlParameter("@GPFNo", data.GPFNo);
                param[16] = new SqlParameter("@CPS_NPS", data.CPS_NPS);
                param[17] = new SqlParameter("@CPSNo", data.CPSNo);
                param[18] = new SqlParameter("@BankId", data.BankId);
                param[19] = new SqlParameter("@AccountNumber", data.AccountNumber);
                param[20] = new SqlParameter("@CategoryCode", data.CategoryCode);
                param[21] = new SqlParameter("@Active", data.Active);
                param[22] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_EmployeeDetails", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_PinListForFeePayment", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("GetBankBranchbyId")]
        public string GetBankBranchbyId([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@BankId", request["BankId"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_BankBranch", param);
                return JsonConvert.SerializeObject(dt);

            }

            catch (Exception ex)
            {

                return ex.Message;

            }
        }



    };
};
