using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace PayRoll.Models
{
    public class VerifySmsInfo
    {
        public string CandidateMobile { get; set; }
        public string CandidateName { get; set; }
        public string MobileOTP { get; set; }
    }
}
