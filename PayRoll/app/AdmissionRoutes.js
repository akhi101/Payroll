define([], function () {

    return {

        routes: {

            'index': {
                url: "/index",
                templateUrl: 'app/views/index.html',
                dependencies: ['controllers/IndexController', 'services/PreExamination/PreExaminationService', 'services/AdminServices/AdminService']
            },

            'index.PayrollLogin': {
                url: "/PayrollLogin",
                templateUrl: 'app/views/PayrollLogin.html',
                dependencies: ['controllers/PayrollLoginController', 'services/SystemAdministration/SystemUserService', 'services/PreExamination/PreExaminationService', 'services/AdminServices/AdminService']
            },

            'index.Payroll': {
                url: "/Payroll",
                templateUrl: 'app/views/PayRoll/PayrollEmployeeLogin.html',
                dependencies: ['controllers/PayRoll/PayrollEmployeeLoginController', 'services/SystemAdministration/SystemUserService',  'services/PayRoll/PayRollService', 'services/PreExamination/PreExaminationService', 'services/AdminServices/AdminService']
            },

            

            'login': {
                url: "/login",
                templateUrl: 'app/views/login.html',
                dependencies: ['controllers/loginController', 'services/SystemAdministration/SystemUserService']
            },

            'index.WebsiteLogin': {
                url: "/WebsiteLogin",
                templateUrl: 'app/views/WebsiteLogin.html',
                dependencies: ['controllers/WebsiteLoginController', 'services/SystemAdministration/SystemUserService']
            },

            'Dashboard': {
                url: "/Dashboard",
                templateUrl: 'app/views/Dashboard.html',
                dependencies: ['controllers/DashboardController', 'services/SystemAdministration/SystemUserService', 'services/MenuService', 'services/AdminServices/AdminService']
            },

            'EmployeeDashboard': {
                url: "/EmployeeDashboard",
                templateUrl: 'app/views/PayRoll/EmployeeDashboard.html',
                dependencies: ['controllers/PayRoll/EmployeeDashboardController', 'services/SystemAdministration/SystemUserService', 'services/MenuService', 'services/AdminServices/AdminService']
            },

            'Dashboard.PayRollMasters': {
                url: "/PayRollMasters",
                templateUrl: 'app/views/PayRoll/PayRollMasters.html',
                dependencies: ['controllers/PayRoll/PayRollMastersController', 'services/SystemAdministration/SystemUserService']
            },

            'Dashboard.PayRollMasters.Designation': {
                url: "/Designation",
                templateUrl: 'app/views/PayRoll/Designation.html',
                dependencies: ['controllers/PayRoll/DesignationController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollMasters.Departments': {
                url: "/Departments",
                templateUrl: 'app/views/PayRoll/Department.html',
                dependencies: ['controllers/PayRoll/DepartmentController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollMasters.BankDetails': {
                url: "/BankDetails",
                templateUrl: 'app/views/PayRoll/BankDetails.html',
                dependencies: ['controllers/PayRoll/BankDetailsController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollMasters.EmployeeDetails': {
                url: "/EmployeeDetails",
                templateUrl: 'app/views/PayRoll/EmployeeDetails.html',
                dependencies: ['controllers/PayRoll/EmployeeDetailsController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollMasters.SalaryDetails': {
                url: "/SalaryDetails",
                templateUrl: 'app/views/PayRoll/SalaryDetails.html',
                dependencies: ['controllers/PayRoll/SalaryDetailsController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollMasters.FinancialYearSettings': {
                url: "/FinancialYearSettings",
                templateUrl: 'app/views/PayRoll/FinancialYearSettings.html',
                dependencies: ['controllers/PayRoll/FinancialYearSettingsController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollDashboard': {
                url: "/PayRollDashboard",
                templateUrl: 'app/views/PayRoll/PayRollDashboard.html',
                dependencies: ['controllers/PayRoll/PayRollDashboardController', 'services/SystemAdministration/SystemUserService']
            },

            'Dashboard.PayRollDashboard.MonthlySalaryDetails': {
                url: "/MonthlySalaryDetails",
                templateUrl: 'app/views/PayRoll/MonthlySalaryDetails.html',
                dependencies: ['controllers/PayRoll/MonthlySalaryDetailsController', 'services/SystemAdministration/SystemUserService', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollDashboard.OverAllDeductions': {
                url: "/OverAllDeductions",
                templateUrl: 'app/views/PayRoll/OverAllDeductions.html',
                dependencies: ['controllers/PayRoll/OverAllDeductionsController', 'services/SystemAdministration/SystemUserService', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollMasters.SalaryDetails': {
                url: "/SalaryDetails",
                templateUrl: 'app/views/PayRoll/EmployeeSalaryDetails.html',
                dependencies: ['controllers/PayRoll/EmployeeSalaryDetailsController', 'services/PayRoll/PayRollService']
            },
            
            'Dashboard.PayRollDashboard.CommonAllowances': {
                url: "/CommonAllowances",
                templateUrl: 'app/views/PayRoll/CommonAllowances.html',
                dependencies: ['controllers/PayRoll/CommonAllowancesController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollDashboard.SalaryDeductions': {
                url: "/SalaryDeductions",
                templateUrl: 'app/views/PayRoll/SalaryDeductions.html',
                dependencies: ['controllers/PayRoll/SalaryDeductionsController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollDashboard.EmployeePayslip': {
                url: "/EmployeePayslip",
                templateUrl: 'app/views/PayrollMobile/EmployeePayslip.html',
                dependencies: ['controllers/PayrollMobile/EmployeePayslipController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollDashboard.MobilePensionerConsolidated': {
                url: "/MobilePensionerConsolidated",
                templateUrl: 'app/views/PayrollMobile/MobilePensionerConsolidated.html',
                dependencies: ['controllers/PayrollMobile/MobilePensionerConsolidatedController', 'services/PayRoll/PayRollService']
            },


            'Dashboard.PayRollDashboard.MobilePensionerPayslip': {
                url: "/MobilePensionerPayslip",
                templateUrl: 'app/views/PayrollMobile/MobilePensionerPayslip.html',
                dependencies: ['controllers/PayrollMobile/MobilePensionerPayslipController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.PayRollDashboard.EmployeeConsolidated': {
                url: "/EmployeeConsolidated",
                templateUrl: 'app/views/PayrollMobile/EmployeeConsolidated.html',
                dependencies: ['controllers/PayrollMobile/EmployeeConsolidatedController', 'services/PayRoll/PayRollService']
            },
            //'Dashboard.PayRollDashboard.SalaryDeductions': {
            //    url: "/SalaryDeductions",
            //    templateUrl: 'app/views/PayRoll/SalaryDeductions.html',
            //    dependencies: ['controllers/PayRoll/SalaryDeductionsController', 'services/PayRoll/PayRollService']
            //},

            'Dashboard.PayRollDashboard.PayRollGeneration': {
                url: "/PayRollGeneration",
                templateUrl: 'app/views/PayRoll/GeneratePayroll.html',
                dependencies: ['controllers/PayRoll/GeneratePayrollController', 'services/SystemAdministration/SystemUserService', 'services/PayRoll/PayRollService']
            },


            //Pensioners Routes

            'Dashboard.Pensioners': {
                url: "/Pensioners",
                templateUrl: 'app/views/PayRoll/Pensioners.html',
                dependencies: ['controllers/PayRoll/PensionersController', 'services/SystemAdministration/SystemUserService']
            },

            'Dashboard.Pensioners.PensionersDetails': {
                url: "/PensionersDetails",
                templateUrl: 'app/views/PayRoll/PensionerDetails.html',
                dependencies: ['controllers/PayRoll/PensionerDetailsController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.Pensioners.PensionerAllowances': {
                url: "/PensionerAllowances",
                templateUrl: 'app/views/PayRoll/PensionerAllowances.html',
                dependencies: ['controllers/PayRoll/PensionerAllowancesController', 'services/PayRoll/PayRollService']
            },

            //'Dashboard.Pensioners.PensionerDeductions': {
            //    url: "/PensionerDeductions",
            //    templateUrl: 'app/views/PayRoll/PensionerDeductions.html',
            //    dependencies: ['controllers/PayRoll/PensionerDeductionsController', 'services/PayRoll/PayRollService']
            //},

            'Dashboard.Pensioners.PensionerGeneration': {
                url: "/PensionerGeneration",
                templateUrl: 'app/views/PayRoll/PensionerGeneration.html',
                dependencies: ['controllers/PayRoll/PensionerGenerationController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.Pensioners.PensionDetails': {
                url: "/PensionDetails",
                templateUrl: 'app/views/PayRoll/PensionDetails.html',
                dependencies: ['controllers/PayRoll/PensionDetailsController', 'services/PayRoll/PayRollService']
            },

            'Dashboard.Pensioners.MonthlyPensionDetails': {
                url: "/MonthlyPensionDetails",
                templateUrl: 'app/views/PayRoll/MonthlyPensionDetails.html',
                dependencies: ['controllers/PayRoll/MonthlyPensionDetailsController', 'services/PayRoll/PayRollService']
            },
        }
    }
})