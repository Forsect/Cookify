using Cookify.API.Models.Repository;
using Cookify.API.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Models.Requests
{
    public class AddOrRemoveDailyMealRequest
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public Meal Meal{ get; set; }

        public bool IsValid => RequestsHelper.HasRequiredFields(this);
    }
}
