from django.db import models
from django.urls import reverse 

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveIntegerField (null=True, unique=True)

    

    def get_api_url(self):
        return reverse("api_list_technicians" , kwargs={"pk": self.id})


class Appointment(models.Model):
    date_time = models.DateTimeField()
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)
    vip = models.BooleanField(default=False)
    vin = models.CharField(max_length=200)
    reason = models.TextField()
    status = models.CharField(max_length=200, default="PENDING")
    customer = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.customer} {self.vin}"    ## better string 

    def get_api_url(self):
        return reverse("api_list_appointments" , kwargs={"pk": self.id})

class AutomobileVO(models.Model):
    sold = models.BooleanField(default=False)
    vin = models.CharField(max_length=200) 
    


    


# Create your models here.
