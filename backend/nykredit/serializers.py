from rest_framework import serializers
from .models import Nykredit

class NykreditSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Nykredit
        fields = ('id', 'title', 'description', 'completed')