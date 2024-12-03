
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

class EjendomdataModelTests(TestCase):
    # set up data for the test
    # create tables for unmanaged models 
    def setUp(self):
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE `ejendomstype` (
                    `ejendomstype_kode` bigint NOT NULL,
                    `ejendomstype` text,
                    PRIMARY KEY (`ejendomstype_kode`)
                )
            """)
            cursor.execute("""
                CREATE TABLE `landekode` (
                    `land_id` bigint NOT NULL,
                    `land_navn` text,
                    PRIMARY KEY (`land_id`)
                )
            """)
            cursor.execute("""
                CREATE TABLE `lokation` (
                    `postnummer` bigint DEFAULT NULL,
                    `postdistrikt` text,
                    `by_navn` text,
                    `lokation_id` int NOT NULL AUTO_INCREMENT,
                    PRIMARY KEY (`lokation_id`)
                )
            """)
            cursor.execute("""
                CREATE TABLE `ejendomsdata` (
                    `ID` bigint NOT NULL AUTO_INCREMENT,
                    `ejendomstype_kode` bigint DEFAULT NULL,
                    `FK_BRAND` bigint DEFAULT NULL,
                    `adresse` text,
                    `land_id` bigint DEFAULT NULL,
                    `LEJET_GRUND_MARK` text,
                    `forurenet` text,
                    `BFE_NR` bigint DEFAULT NULL,
                    `risikovurdering` text,
                    `lokation_id` int DEFAULT NULL,
                    PRIMARY KEY (`ID`),
                    KEY `fk_ejendomstype` (`ejendomstype_kode`),
                    KEY `fk_landekode` (`land_id`),
                    KEY `fk_lokation_id` (`lokation_id`),
                    CONSTRAINT `fk_ejendomstype` FOREIGN KEY (`ejendomstype_kode`) REFERENCES `ejendomstype` (`ejendomstype_kode`),
                    CONSTRAINT `fk_landekode` FOREIGN KEY (`land_id`) REFERENCES `landekode` (`land_id`),
                    CONSTRAINT `fk_lokation_id` FOREIGN KEY (`lokation_id`) REFERENCES `lokation` (`lokation_id`)
                )
            """)
        #create sample of objects for the test. These will be added to the tables created in the test-database created by django 
        Ejendomstype.objects.create(ejendomstype_kode=1, ejendomstype='parcelhus')
        Ejendomstype.objects.create(ejendomstype_kode=3, ejendomstype='ejerlejlighed')
        Landekode.objects.create(land_id=1, land_navn='Danmark')
        Landekode.objects.create(land_id=2, land_navn='Polen')
        Lokation.objects.create(postnummer=5700, postdistrikt='Svendborg', by_navn='Svendborg')
        Ejendomsdata.objects.create(forurenet='J', fk_brand=1, risikovurdering='Høj')
        Ejendomsdata.objects.create(forurenet='N', fk_brand=2, risikovurdering='Lav')

    def test_search_single_criteria(self):
        filter_data = {'ejendomstype': 'parcelhus'}
        results = Ejendomsdata.search(filter_data)
        self.assertGreater(len(results), 0)
        for result in results:
            self.assertEqual(result['ejendomstype'], 'parcelhus')

