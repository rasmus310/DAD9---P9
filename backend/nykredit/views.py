from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ejendomsdata, Ejendomstype, Landekode, Lokation, searchSaved
import random
from django.db.models import Q
from django.http import JsonResponse
from .fieldmapping import search_criteria_mapping, direct_search_criteria
from .search_criteria_configurations import search_criteria

# Create your views here.
# apiEndponts to fetch options for filterComponents 
def ejendomstype_options(request):
    options = Ejendomstype.objects.values('ejendomstype_kode', 'ejendomstype').distinct()
    return JsonResponse(list(options), safe=False)

def landekode_options(request):
    options = Landekode.objects.values('land_id', 'land_navn').distinct()
    return JsonResponse(list(options), safe=False)

def forurenet_options(request):
    options = Ejendomsdata.objects.values('forurenet').distinct()
    return JsonResponse(list(options), safe=False)

def fk_brand_options(request):
    options = Ejendomsdata.objects.values('fk_brand').distinct()
    return JsonResponse(list(options), safe=False)

def risikovurdering_options(request):
    options = Ejendomsdata.objects.values('risikovurdering').distinct()
    return JsonResponse(list(options), safe=False)

def by_options(request):
    options = Lokation.objects.values('lokation_id', 'by_navn').distinct()
    return JsonResponse(list(options), safe=False)

# get all search criteria 
@api_view(['GET'])
def get_search_criteria(request):
    return JsonResponse(search_criteria, safe=False)

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
    filter_data = request.GET.dict()

    # Test: print modtagne søgekriterier
    print(f"Filters received: {filter_data}")

    # limit = antal ønskede resultater sendt frontend som key:value pair med key "antal_resultater" 
    limit = int(filter_data.pop('antal_resultater', 10))

    q = Q()
    fields = ['id', 'bfe_nr']

    """" BRUGES MED MAPPING FIL
    # Test: print søgekriterier efter mapping
    for key, value in filter_data.items():
        if key in search_criteria_mapping: 
            print(f"filter efter mapping: {search_criteria_mapping[key]} : {value}")
    
    if filter_data:
        # loop både key + value med items() method 
        # (fungerer nu kun med enkelt value for hvert kriterie - fx kun én valgt/sendt værdi for ejendomstype)
        for key, value in filter_data.items():
            #fields.append(key)
            # tilføj kriterie til eksisterende Q objekt ved at AND dem sammen
            # **{key: value} "udpakker" dictionary 
            # Hvis key er ejendomstype og value er parcelhus svarer **{key: value} til {ejendomstype = parcelhus}, som tilføjes Q objektet som kriterie for søgning
            if key in search_criteria_mapping:
               fields.append(search_criteria_mapping[key])
               q &= Q(**{search_criteria_mapping[key]: value})
            elif key in direct_search_criteria:
                fields.append(key)
                q &= Q(**{key: value})
            else:
                return Response({"response" : "Ugyldigt søgekriterie"})
    """

    if filter_data:
        # loop både key + value med items() method 
        for key, value in filter_data.items():
            fields.append(key)
            # tilføj kriterie til eksisterende Q objekt ved at AND dem sammen
            # **{key: value} "udpakker" dictionary 
            # Hvis key er ejendomstype og value er parcelhus svarer **{key: value} til {ejendomstype = parcelhus}, som tilføjes Q objektet som kriterie for søgning
            q &= Q(**{key: value})

        # find ejendomme i databasen: omdan matching_properties til list for at muliggøre random.sample()
        properties = list(Ejendomsdata.objects.filter(q).values(*fields))

        # hvis ejendomme er fundet / eksisterer
        if properties:
            # returner antal valgte søge resultater, hvis ikke der er færre resultater end ønsket 
            if len(properties) >= limit:
                # vælg antal random resultater
                random_selection = random.sample(properties, limit)
                return Response({"response" : random_selection})
            # hvis færre resultater end ønsket, returner alle fundne resultater
            else:
                return Response({"response" : properties})

    # response hvis filter valgt men ingen ejendomme fundet
    response_message = f"GET request successful with filter {filter_data.values()} but no matching data"
    return Response({"response" : response_message})

# gem søgening
@api_view(['POST'])
def save_search_view(request):
    search = request.data
    saved_search = searchSaved.create_saved_search(search)
    print(f"søgning der skal gemmes: {request.data}")
    print(f"saved search object: {saved_search}")
    params = saved_search.criteria.get('params', {})
    saved_param = list(params.keys())[0] if params else "No params found"
    # Return only the 'saved_param' in the response
    response_data = {"search_id": saved_search.search_id}
    return Response(response_data)


