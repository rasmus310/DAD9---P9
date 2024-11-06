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
from nykredit.views import simple_search_view, simple_search2_view, ejendomstype_options, landekode_options

router = routers.DefaultRouter()
#router.register(r'nykredit', views.simple_search_view, 'nykredit')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('simple_search/', simple_search_view, name='simple_search_view'),
    path('simple_search2/', simple_search2_view, name='simple_search2_view'),
    path('api/ejendomstype-options/', ejendomstype_options, name='ejendomstype_options'),
    path('api/landekode-options/', landekode_options, name='landekode_options'),
    
]
