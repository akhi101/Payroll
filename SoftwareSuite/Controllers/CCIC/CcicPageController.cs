using Newtonsoft.Json;
using SoftwareSuite.Models.Database;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicPageController
    {

        [HttpPost, ActionName("AddCcicModule")]
        public string AddCcicModule(string ModuleName, string ModuleRouteName, string ModuleCardClassName, int ModuleOrder, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ModuleName", ModuleName);
                param[1] = new SqlParameter("@ModuleRouteName", ModuleRouteName);
                param[2] = new SqlParameter("@ModuleCardClassName", ModuleCardClassName);
                param[3] = new SqlParameter("@ModuleOrder", ModuleOrder);
                param[4] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_AddModule", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("AddCcicUserModule")]
        public string AddCcicUserModule(int UserModuleID,int UserTypeID, int ModuleID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserModuleID", UserModuleID);
                param[1] = new SqlParameter("@UserTypeID", UserTypeID);
                param[2] = new SqlParameter("@ModuleID", ModuleID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_AddUserModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpPost, ActionName("AddCcicSubModules")]
        public string AddCcicSubModules(int SubModuleID, string SubModuleName, string SubModuleRouteName, int ModuleCardColourID, int SubModuleOrder)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@SubModuleID", SubModuleID);            
                param[1] = new SqlParameter("@SubModuleName", SubModuleName);
                param[2] = new SqlParameter("@SubModuleRouteName", SubModuleRouteName);
                param[3] = new SqlParameter("@ModuleCardColourID", ModuleCardColourID);
                param[2] = new SqlParameter("@SubModuleOrder", SubModuleOrder);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_AddSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AddCcicUserSubModule")]
        public string AddCcicUserSubModule(int UserSubModuleID,int UserTypeID, int ModuleID, int SubModuleID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UserSubModuleID", UserSubModuleID);
                param[1] = new SqlParameter("@UserTypeID", UserTypeID);
                param[2] = new SqlParameter("@ModuleID", ModuleID);
                param[3] = new SqlParameter("@SubModuleID", SubModuleID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_AddUserSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("CcicUserModuleInactive")]
        public string CcicUserModuleInactive(int ModuleID, int UserModuleID, int UserTypeID, int Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ModuleID", ModuleID);
                param[1] = new SqlParameter("@UserModuleID", UserModuleID);
                param[2] = new SqlParameter("@UserTypeID", UserTypeID);
                param[3] = new SqlParameter("@Active", Active);
           
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_UserModuleInactive", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("CcicUserSubModuleInactive")]
        public string CcicUserSubModuleInactive(int UserSubModuleID, int UserTypeID, int ModuleID, int SubModuleID, int Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@UserSubModuleID", UserSubModuleID);
                param[1] = new SqlParameter("@UserTypeID", UserTypeID);
                param[2] = new SqlParameter("@ModuleID", ModuleID);
                param[3] = new SqlParameter("@SubModuleID", SubModuleID);
                param[4] = new SqlParameter("@Active", Active);
             
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_UserSubModuleInactive", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetCcicSubmodulesByModule")]
        public string GetCcicSubmodulesByModule(int ModuleID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ModuleID", ModuleID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GetSubModuleByModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetCcicModules")]
        public string GetCcicModules()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_Get_Modules";
                var res = dbHandler.ReturnDataWithStoredProcedure(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_Get_Modules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("getCcicSubModules")]
        public string getCcicSubModules()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GetSubModules";
                var res = dbHandler.ReturnDataWithStoredProcedure(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GetSubModules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetAllCcicModules")]
        public string GetAllCcicModules()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_Get_AllModules";
                var res = dbHandler.ReturnDataWithStoredProcedure(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_Get_AllModules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetAllCcicUserModules")]
        public string GetAllCcicUserModules()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_AllUserModules";
                var res = dbHandler.ReturnDataWithStoredProcedure(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_AllUserModules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("getAllCcicSubModules")]
        public string getAllCcicSubModules()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_GetAllSubModules";
                var res = dbHandler.ReturnDataWithStoredProcedure(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_GetAllSubModules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("getCcicAllUserSubModules")]
        public string getCcicAllUserSubModules()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_GetAllUserSubModules";
                var res = dbHandler.ReturnDataWithStoredProcedure(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_GetAllUserSubModules", 0, ex.Message);
                throw ex;
            }
        }


      
    }
}
