from django.urls import path
from .views import api_list_salespeople, api_delete_salesperson, api_delete_customer, api_list_customers

urlpatterns = [
    path('salespeople/', api_list_salespeople, name='api_list_salespeople'),
    path('salespeople/<int:employee_id>/', api_delete_salesperson, name='api_delete_salesperson'),
    path('customers/', api_list_customers, name='api_list_customers'),
    path('customers/<int:customer_id>/', api_delete_customer, name='api_delete_customer'),
]
