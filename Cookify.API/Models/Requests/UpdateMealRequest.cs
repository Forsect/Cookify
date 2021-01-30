using Cookify.API.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Models.Requests
{
    public class UpdateMealRequest
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public List<string> Ingredients { get; set; }
        public string Recipe { get; set; }
        public string AdditionalInfo { get; set; }

        public bool IsValid => RequestsHelper.HasRequiredFields(this);
    }
}
