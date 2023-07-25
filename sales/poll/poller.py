import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO
from django.http import JsonResponse

def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            url = "http://project-beta-inventory-api-1:8000/api/automobiles/"
            response = requests.get(url)
            content = json.loads(response.content)
            currentvins = []
            for automobile in content["autos"]:
                AutomobileVO.objects.update_or_create(
                    vin=automobile["vin"],
                    sold=automobile["sold"],
                )
                currentvins.append(automobile["vin"])
            # why did i not remember exclude 4 hours ago
            AutomobileVO.objects.exclude(vin__in=currentvins).delete()

            #           //second attempt, but we can still get prettier//
            # oldVO = AutomobileVO.objects.all()
            # for automobilevo in oldVO.values():
            #     vovins.append(automobilevo["vin"])
            # s = set(currentvins)
            # vinstodelete = [x for x in vovins if x not in s]
            # if vinstodelete:
            #     print(f"{vinstodelete} has been removed from inventory")
                # for deletevin in vinstodelete:
                #     removed = AutomobileVO.objects.get(vin=deletevin)
                #     removed.delete()

            #           //following code was original attempt to cull VO list, but wanted to try for lower complexity//

            # for automobilevo in newVO.values():
            #     delete = True
            #     for automobile in content["autos"]:
            #         if automobile["vin"] == automobilevo["vin"]:
            #             delete = False
            #     if delete:
            #         vinfind = automobilevo["vin"]
            #         print(f"deleting {vinfind}")
            #         vodelete = AutomobileVO.objects.get(vin=vinfind)
            #         vodelete.delete()
            # Write your polling logic, here
            # Do not copy entire file
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
