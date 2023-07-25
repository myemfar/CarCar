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
        "id",
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
        "id",
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
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
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
        return JsonResponse({"error": "404 employee not found reeeee"}, status = 404)


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
        customer = Customer.objects.get(id=customer_id)
        customer.delete()
        return JsonResponse({"success": "customer deleted"})
    except Customer.DoesNotExist:
        return JsonResponse({"error": "404 customer not found reeeee"}, status = 404)

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            autoid = content["automobile"]
            car = AutomobileVO.objects.get(id=autoid)
            content["automobile"] = car
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {
                    "404 car not found": "sale api post requires existing car ID"
                },
                status = 404,
            )
        try:
            custid = content["customer"]
            customer = Customer.objects.get(id=custid)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {
                    "404 customer not found": "sale api post requires existing customer ID"
                },
                status = 404,
            )
        try:
            salesid = content["salesperson"]
            salesperson = Salesperson.objects.get(id=salesid)
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {
                    "404 salesperson not found": "sale api post requires existing salesperson ID"
                },
                status = 404,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_sale(request, sale_id):
    try:
        sale = Sale.objects.get(id=sale_id)
        sale.delete()
        return JsonResponse({"success": "sale deleted"})
    except Sale.DoesNotExist:
        return JsonResponse({"error": "404 sale not found reeeee"}, status = 404)
