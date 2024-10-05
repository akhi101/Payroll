define([], function () {

    return {

        routes: {

            'index': {
                url: "/index",
                templateUrl: 'app/views/index.html',
                dependencies: ['controllers/IndexController', 'services/PreExamination/PreExaminationService', 'services/AdminServices/AdminService']
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

            'Dashboard.PayRollDashboard.PayRollGeneration': {
                url: "/PayRollGeneration",
                templateUrl: 'app/views/PayRoll/GeneratePayroll.html',
                dependencies: ['controllers/PayRoll/GeneratePayrollController', 'services/SystemAdministration/SystemUserService', 'services/PayRoll/PayRollService']
            },

        }
    }
})