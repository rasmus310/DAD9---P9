from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ejendomsdata
import random
from django.db.models import Q

# Create your views here.

# simple_search
@api_view(['GET'])
def simple_search_view(request):
    filter_value = request.GET.get('filter')

    # check om filter er valgt
    if filter_value == "":
        response_message = "GET request successful with no filter."
        return Response({"response" : response_message})

    # find ejendomme i databasen
    matching_properties = Ejendomsdata.objects.filter(ejendomstype_kode = filter_value)

    # hvis ejendomme er fundet / eksisterer
    if matching_properties.exists():
        property = random.choice(matching_properties)
        return Response({"response" : property.id})

    # response hvis filter valgt men ingen ejendomme funder
    response_message = f"GET request successful with filter {filter_value} but no matching data"
    return Response({"response" : response_message})





# simple_search2
@api_view(['GET'])
def simple_search2_view(request):
    # get filter 
    filter_value = request.GET.dict()

    print(f"Filters received: {filter_value}")

    q = Q()

    if filter_value:

        # loop både key + value med items() method 
        for key, value in filter_value.items():
            # Update the Q object with the criteria
            # Note: Assuming that value is a single value, adjust if it's a list
            q &= Q(**{key: value})  # Combine the current condition with the existing Q object

        # find ejendomme i databasen
        matching_properties = Ejendomsdata.objects.filter(q)

        # hvis ejendomme er fundet / eksisterer
        if matching_properties.exists():
            property = random.choice(matching_properties)
            return Response({"response" : property.id})

    # response hvis filter valgt men ingen ejendomme funder
    response_message = f"GET request successful with filter {filter_value.values()} but no matching data"
    return Response({"response" : response_message})

"""""
    # extract key og value som kriterie og valgt værdi
    criteria = filter_value.keys()
    value = filter_value.values()

   # check om filter er valgt
    if filter_value == "":
        response_message = "GET request successful with no filter."
        return Response({"response" : response_message})

    # find ejendomme i databasen
    matching_properties = Ejendomsdata.objects.filter(ejendomstype_kode = filter_value)

    # hvis ejendomme er fundet / eksisterer
    if matching_properties.exists():
        property = random.choice(matching_properties)
        return Response({"response" : property.id})


    # response hvis filter valgt men ingen ejendomme funder
    response_message = f"GET request successful with filter {filter_value} but no matching data"
    return Response({"response" : response_message})

"""

