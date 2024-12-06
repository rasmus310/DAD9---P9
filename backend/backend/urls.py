"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from nykredit import views
#from nykredit.views import simple_search2_view, ejendomstype_options, landekode_options, save_search_view, postnummer_options, search_saved_filters_view, forurenet_options, fk_brand_options, risikovurdering_options, by_options, get_search_criteria
from nykredit.views import *
router = routers.DefaultRouter()
#router.register(r'nykredit', views.simple_search_view, 'nykredit')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('save_search/', save_search_view, name='save_search_view'),
    path('search/', simple_search2_view, name='simple_search2_view'),
    path('search_id/', search_saved_filters_view, name='search_saved_filters_view'),
    path('get_search_criteria/', get_search_criteria, name='get_search_criteria'),
    path('api/ejendomstype-options/', ejendomstype_options, name='ejendomstype_options'),
    path('api/landekode-options/', landekode_options, name='landekode_options'),
    path('api/forurenet-options/', forurenet_options, name='forurenet_options'),
    path('api/fk_brand-options/', fk_brand_options, name='fk_brand_options'),
    path('api/risikovurdering-options/', risikovurdering_options, name='risikovurdering_options'),
    path('api/by-options/', by_options, name='by_options'),
    path('api/postnummer-options/', postnummer_options, name='postnummer_options'),
    path('api/postdistrikt-options/', postdistrikt_options, name='postdistrikt_options'),
]
