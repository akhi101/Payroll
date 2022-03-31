using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using SoftwareSuite.Models.Database;
using Newtonsoft.Json;
using RestSharp;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicPageController : BaseController
    {

        [HttpGet, ActionName("AddCcicModule")]
        public string AddCcicModule(string ModuleName, string ModuleRouteName, int ModuleCardColourID,string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ModuleName", ModuleName);
                param[1] = new SqlParameter("@ModuleRouteName", ModuleRouteName);
                param[2] = new SqlParameter("@ModuleCardColourID", ModuleCardColourID);
                param[3] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Module", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("UpdateCcicModule")]
        public string UpdateCcicModule(int UpdateType, string UserName, int ModuleID,string ModuleName, bool Active,string ModuleRouteName, int ModuleCardColourID,int ModuleOrder)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2]= new SqlParameter("@ModuleID", ModuleID);
                param[3] = new SqlParameter("@ModuleName", ModuleName);
                param[4] = new SqlParameter("@Active", Active);
                param[5] = new SqlParameter("@ModuleRouteName", ModuleRouteName);
                param[6] = new SqlParameter("@ModuleCardColourID", ModuleCardColourID);
                param[7] = new SqlParameter("@ModuleOrder", ModuleOrder);              
                
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_Modules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("UpdateCcicSubModule")]
        public string UpdateCcicSubModule(int UpdateType, string UserName, int SubModuleID, string SubModuleName, bool Active, string SubModuleRouteName, int ModuleCardColourID, int SubModuleOrder,int ModuleID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@SubModuleID", SubModuleID);
                param[3] = new SqlParameter("@SubModuleName", SubModuleName);
                param[4] = new SqlParameter("@Active", Active);
                param[5] = new SqlParameter("@SubModuleRouteName", SubModuleRouteName);
                param[6] = new SqlParameter("@ModuleCardColourID", ModuleCardColourID);
                param[7] = new SqlParameter("@SubModuleOrder", SubModuleOrder);
                param[8] = new SqlParameter("@ModuleID", ModuleID);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_SubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("AddCcicUserModule")]
        public string AddCcicUserModule(int UserTypeID, int ModuleID, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
               
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);
                param[2] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_UserModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("AddCcicSubModules")]
        public string AddCcicSubModules(int ModuleID,string SubModuleName, string SubModuleRouteName, int ModuleCardColourID, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ModuleID", ModuleID);
                param[1] = new SqlParameter("@SubModuleName", SubModuleName);            
                param[2] = new SqlParameter("@SubModuleRouteName", SubModuleRouteName);
                param[3] = new SqlParameter("@ModuleCardColourID", ModuleCardColourID);
                param[4] = new SqlParameter("@UserName", UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_SubModule", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("AddCcicUserSubModules")]
        public string AddCcicUserSubModules(int UserTypeID, int ModuleID, int SubModuleID,string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);
                param[2] = new SqlParameter("@SubModuleID", SubModuleID);
                param[3] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_UserSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetCcicModuleInactive")]
        public string SetCcicModuleInactive(int UpdateType, string UserName, int ModuleID,string ModuleName,bool Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@ModuleID", ModuleID);
                param[3] = new SqlParameter("@ModuleName", ModuleName);
                param[4] = new SqlParameter("@Active", Active);
                

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_Modules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("SetCcicSubModuleInactive")]
        public string SetCcicSubModuleInactive(int UpdateType, string UserName, int SubModuleID, string SubModuleName, bool Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@SubModuleID", SubModuleID);
                param[3] = new SqlParameter("@SubModuleName", SubModuleName);
                param[4] = new SqlParameter("@Active", Active);
                


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_SubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetCcicUserModuleInactive")]
        public string SetCcicUserModuleInactive(int UserModuleID, bool Active, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserModuleID", UserModuleID);
                param[1] = new SqlParameter("@Active", Active);
                param[2] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Inactive_UserModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetCcicUserSubModuleInactive")]
        public string SetCcicUserSubModuleInactive(int UserSubModuleID, bool Active, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserSubModuleID", UserSubModuleID);
                param[1] = new SqlParameter("@Active", Active);
                param[2] = new SqlParameter("@UserName", UserName);
                
                
             
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Inactive_UserSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }




        [HttpGet, ActionName("GetAllCcicModules")]
        public string GetAllCcicModules()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_Modules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Modules", 0, ex.Message);
                throw ex;
            }
        }


        [HttpGet, ActionName("GetAllCcicSubModules")]
        public string GetAllCcicSubModules()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Temp_Get_AllSubModules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Temp_Get_AllSubModules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetCcicUserModules")]
        public string GetCcicUserModules(int UserTypeID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AllUserModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



   



        [HttpGet, ActionName("GetCcicSubModules")]
        public string GetCcicSubModules(int ModuleID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ModuleID", ModuleID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_SubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetCcicUserSubModules")]
        public string GetCcicUserSubModules(int UserTypeID,int ModuleID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AllUserSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }




    }
}
