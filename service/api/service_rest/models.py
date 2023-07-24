from django.db import models
from django.urls import reverse 

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveIntegerField (null=True, unique=True)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_list_technicians" , kwargs={"pk": self.id})


class Appointment(models.Model):
    date_time = models.DateTimeField()
    technician = models.ForeignKey(Technician, on_delete=models.PROTECT)
    vip = models.BooleanField(default=False)
    vin = models.CharField(max_length=200)
    reason = models.TextField()
    status = models.BooleanField(default=False)
    customer_name = models.CharField(max_length=200)

    def __str__(self):
        return self.customer_name    ## better string 

    def get_api_url(self):
        return reverse("api_list_appointments" , kwargs={"pk": self.id})

class AutomobileVO(models.Model):
    sold = models.BooleanField(default=False)
    vin = models.CharField(max_length=200) 
    


    


# Create your models here.
