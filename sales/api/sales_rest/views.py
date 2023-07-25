from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder,
        "salesperson": SalespersonEncoder,
        "customer": CustomerEncoder,
    }

@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        person = Salesperson.objects.create(**content)
        return JsonResponse(
            person,
            encoder=SalespersonEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_salesperson(request, employee_id):
    try:
        salesperson = Salesperson.objects.get(id=employee_id)
        salesperson.delete()
        return JsonResponse({"success": "salesperson deleted"})
    except Salesperson.DoesNotExist:
        return JsonResponse({"error": "404 employee not found reeeee"})


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        person = Customer.objects.create(**content)
        return JsonResponse(
            person,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_customer(request, customer_id):
    try:
        customer = Salesperson.objects.get(id=customer_id)
        customer.delete()
        return JsonResponse({"success": "customer deleted"})
    except Salesperson.DoesNotExist:
        return JsonResponse({"error": "404 customer not found reeeee"})
