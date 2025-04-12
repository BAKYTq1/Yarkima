from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AnswerSerializer
from answer.models import Answer

class AnswerViewSet(viewsets.ModelViewSet):
    
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

# Create your views here.
