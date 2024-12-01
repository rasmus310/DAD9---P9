
from django.test import TestCase
from django.urls import reverse 
from .models import *
from django.db import connection
# Create your tests here.
class ejendomstype_options_view_test(TestCase):
    # set up data for the test
    def setUp(self):
        # create table for ejendomstype since it is an unmanaged model     
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE `ejendomstype` (
                    `ejendomstype_kode` bigint NOT NULL,
                    `ejendomstype` text,
                    PRIMARY KEY (`ejendomstype_kode`)
                )
            """)
        #create sample of objects for the test. These will be added to the tables created in the test-database created by django 
        Ejendomstype.objects.create(ejendomstype_kode=1, ejendomstype='parcelhus')
        Ejendomstype.objects.create(ejendomstype_kode=3, ejendomstype='ejerlejlighed')
        # the expected data returned from the view 
        self.expected_ejendomstype_options = [{'ejendomstype_kode':1, 'ejendomstype':'parcelhus'}, {'ejendomstype_kode':3, 'ejendomstype':'ejerlejlighed'}]
    
    def test_ejendomstype_options_view_returns_expected_data(self):
        # reverse function returns the url of the provided view
        url = reverse('ejendomstype_options')
        # send get rewuest to the url and save the response 
        response = self.client.get(url)
        # assert the response status code
        self.assertEqual(response.status_code, 200)
        # assert if the actual json response is equal to the expected 
        self.assertEqual(response.json(), self.expected_ejendomstype_options)
    
    def test_ejendomstype_options_view_no_data(self):
        # Clear the table to simulate no data scenario
        Ejendomstype.objects.all().delete()
        # Reverse function gets the URL for the view
        url = reverse('ejendomstype_options')
        # Send GET request to the view
        response = self.client.get(url)
        # Assert the status code
        self.assertEqual(response.status_code, 200)
        # Assert the returned json is an empty list
        self.assertEqual(response.json(), [])

    def test_ejendomstype_options_view_duplicate_data(self):
        # add duplicate data
        Ejendomstype.objects.create(ejendomstype_kode=1, ejendomstype='parcelhus')
        Ejendomstype.objects.create(ejendomstype_kode=1, ejendomstype='parcelhus')
        
        # Reverse function gets the URL for the view
        url = reverse('ejendomstype_options')
        
        # Send GET request to the view
        response = self.client.get(url)
        
        # Assert the status code is 200 (successful response)
        self.assertEqual(response.status_code, 200)
        
        # Assert the returned JSON matches the expected data (no duplicates)
        self.assertEqual(response.json(), self.expected_ejendomstype_options)  
