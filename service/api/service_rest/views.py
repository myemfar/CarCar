from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods

from . models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["sold", "vin"]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id", "id"]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ["date_time", "technician", "vip", "vin", "reason", "status", "customer"]
    encoders = {"technician": TechnicianListEncoder()}

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = ["date_time", "technician", "vip", "vin", "reason", "status", "customer"]
    encoders = {"technician": TechnicianListEncoder()}



@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()

        return JsonResponse(
            {"technicians": technicians}, 
            encoder=TechnicianListEncoder,
            safe=False,
        )

    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            print(content)
            return JsonResponse(
                technician, encoder=TechnicianListEncoder, safe=False
            )
        except:
            return JsonResponse(
                {"ERROR": "Cannot create technician"}, status=400
            )

@require_http_methods(["DELETE"])
def api_delete_technician(request, pk):
    try:
        technician = Technician.objects.get(id=pk)
        technician.delete()
        return JsonResponse(
            {"message": "Technician deleted successfully"}
        )
    except Technician.DoesNotExist:
        return JsonResponse(
            {"ERROR": "Technician does not exist"}, status = 404
        )

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()

        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.get(id = content["technician"])
        content["technician"] = technician

        try:
            vin = AutomobileVO.objects.get(vin = content["vin"])
            content["vip"] = True
        except AutomobileVO.DoesNotExist:
            content["vip"] = False

        appointment = Appointment.objects.create(**content)

        return JsonResponse(
            appointment, 
            encoder = AppointmentDetailEncoder,
            safe = False
        )

@require_http_methods(["GET", "DELETE"])
def api_detail_appointment(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment, 
            encoder=AppointmentDetailEncoder, safe = False
        )

    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                {"message": "Appointment deleted successfully"}
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"ERROR": "Appointment does not exist"}, status = 404
            )

@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.status = "canceled"
        appointment.save()

        return JsonResponse(
            appointment, 
            encoder=AppointmentDetailEncoder, safe = False
            )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"ERROR": "Appointment does not exist"}, status = 404
        )


@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.status = "finished"
        appointment.save()

        return JsonResponse(
            appointment, 
            encoder=AppointmentDetailEncoder, safe = False
            )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"ERROR": "Appointment does not exist"}, status = 404
        )
        



