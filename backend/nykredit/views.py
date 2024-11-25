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

def postnummer_options(request):
    options = Lokation.objects.values('postnummer').distinct()
    return JsonResponse(list(options), safe=False)

# get all search criteria 
@api_view(['GET'])
def get_search_criteria(request):
    return JsonResponse(search_criteria, safe=False)

# simple_search2
@api_view(['GET'])
def simple_search2_view(request):
    # get filterdata (QueryDict) og lav om til dictionary
    filter_data = request.GET.dict()

    # Test: print modtagne søgekriterier
    print(f"Filters received: {filter_data}")

    # limit = antal ønskede resultater sendt frontend som key:value pair med key "antal_resultater" 
    limit = int(filter_data.pop('antal_resultater', 50))
    randomize = filter_data.pop('randomize', 'false').lower() == 'true'

    if randomize: 
        properties = Ejendomsdata.searchRandom(filter_data, limit)
    else:
        properties = Ejendomsdata.search(filter_data, limit)

    if properties:
        return Response({"response" : properties})

    # response hvis filter valgt men ingen ejendomme fundet
    response_message = f"GET request successful with filter {filter_data.values()} but no matching data"
    return Response({"response" : response_message})

# gem søgning
@api_view(['POST'])
def save_search_view(request):
    request_data = request.data
    
    # get method retrieves the value associated with the 'params' key 
    search_criteria = request_data.get('params')

    if not search_criteria:  
        return Response({"response": "No filters provided, search not saved"})
    
    #test
    print(f"søgning der skal gemmes: {search_criteria}")

    saved_search_object = searchSaved.create_saved_search(search_criteria)
    #test
    print(f"saved search object: {saved_search_object}")
    
    # return id from saved search
    response_data = {"search_id": saved_search_object.search_id}
    return Response(response_data)


# søgning på gemt filtrering 
@api_view(['GET'])
def search_saved_filters_view(request):
    
    search_id = request.GET.get('search_id')
    print(f"search_id LOL: {search_id}")

    if not search_id:
        return Response({"response":"ID parameter required"})
    
    # first() returns None if no match is found (or the first match found)
    saved_search_object = searchSaved.objects.filter(search_id=search_id).first()

    if not saved_search_object:
        return Response({"response": f"No saved filters found for search ID {search_id}"})

    # extract search criteria from the record
    search_criteria = saved_search_object.criteria

    print(f"search_id LOL: {search_criteria}")


    if not search_criteria:
        return Response({"response": "Saved filters for row with ID {search_id} are empty or invalid"})
    
    properties = Ejendomsdata.searchRandom(search_criteria)

    if properties:
        return Response({"response" : properties})
    else:            
        return Response({"response" : "no properties matching search criteria"})


