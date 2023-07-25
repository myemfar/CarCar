from django.urls import path
from .views import api_list_technicians, api_list_appointments, api_detail_appointment
from .views import api_delete_technician
from .views import api_cancel_appointment, api_finish_appointment

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_delete_technician, name="api_delete_technician"), 
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", api_detail_appointment, name="api_detail_appointment"),
    path("appointments/<int:pk>/cancel/", api_cancel_appointment, name="api_cancel_appointment"),
    path("appointments/<int:pk>/finish/", api_finish_appointment, name="api_finish_appointment"),
]

