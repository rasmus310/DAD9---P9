from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ejendomsdata
import random
from django.db.models import Q
from django.http import JsonResponse
from .models import Ejendomstype


# Create your views here.

def ejendomstype_options(request):
    # Get distinct values for the `ejendomstype` field
    options = Ejendomstype.objects.values_list('ejendomstype', flat=True).distinct()
    return JsonResponse(list(options), safe=False)

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
    # get filterdata (QueryDict) og lav om til dictionary
    # OBS brug QueryDict hvis man kan vælge flere værdier for hvet filter (fx to ejendomstyper)
    filter_data = request.GET.dict()

    # Test: print modtagne søgekriterier i ter
    print(f"Filters received: {filter_data}")

    q = Q()

    if filter_data:
        # flere søgekriterier samles i et dynamisk genereret Q object, som indeholder alle søgekriterier og valgte værdier 
        # loop både key + value med items() method 
        # (fungerer nu kun med enkelt value for hvert kriterie - fx kun én valgt/sendt værdi for ejendomstype)
        for key, value in filter_data.items():
            # tilføj kriterie til eksisterende Q objekt ved at AND dem sammen
            # **{key: value} "udpakker" dictionary 
            # Hvis key er ejendomstype og value er parcelhus svarer **{key: value} til {ejendomstype = parcelhus}, som tilføjes Q objektet som kriterie for søgning
            q &= Q(**{key: value}) 
            #q = q & Q(**{key: value}) 

        # find ejendomme i databasen
        matching_properties = Ejendomsdata.objects.filter(q)

        # hvis ejendomme er fundet / eksisterer
        if matching_properties.exists():
            property = random.choice(matching_properties)
            return Response({"response" : property.id})

    # response hvis filter valgt men ingen ejendomme fundet
    response_message = f"GET request successful with filter {filter_data.values()} but no matching data"
    return Response({"response" : response_message})



