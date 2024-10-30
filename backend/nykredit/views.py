from django.shortcuts import render
from rest_framework import viewsets
from .serializers import NykreditSerializer
from .models import Nykredit


# Create your views here.

class NykreditView(viewsets.ModelViewSet):
    serializer_class = NykreditSerializer
    queryset = Nykredit.objects.all()
