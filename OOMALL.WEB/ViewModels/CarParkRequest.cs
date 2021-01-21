using System;

namespace OOMALL.WEB.ViewModels
{
    public class CarParkRequest
    {
        public Guid ParkingSpaceId { get; set; }
        public Guid CarCategoryId { get; set; }
        public string PlateNumber { get; set; }
    }
}
