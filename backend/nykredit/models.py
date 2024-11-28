# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.db.models import JSONField
from django.db.models import Q

# model to save search criteria
class searchSaved(models.Model):
    search_id = models.AutoField(primary_key=True)
    criteria = models.JSONField()
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta: 
        db_table = 'search_saved'
    def __str__(self):
        return f"SavedSearch(search_id={self.search_id}, criteria={self.criteria}, date_created={self.date_created})"
    
    # class method to create and save a new instance of the class
    @classmethod
    def create_saved_search(cls, search_criteria): 
        # cls refers to the class itslef (not an instance of the class). Enabling the creation of a new object
        search_to_save = cls(criteria = search_criteria) 
        search_to_save.save() 
        return search_to_save 

class Ejendomsdata(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    ejendomstype_kode = models.ForeignKey('Ejendomstype', models.DO_NOTHING, db_column='ejendomstype_kode', blank=True, null=True)
    fk_brand = models.BigIntegerField(db_column='FK_BRAND', blank=True, null=True)  # Field name made lowercase.
    adresse = models.TextField(blank=True, null=True)
    land = models.ForeignKey('Landekode', models.DO_NOTHING, blank=True, null=True)
    lejet_grund_mark = models.TextField(db_column='LEJET_GRUND_MARK', blank=True, null=True)  # Field name made lowercase.
    forurenet = models.TextField(blank=True, null=True)
    bfe_nr = models.BigIntegerField(db_column='BFE_NR', blank=True, null=True)  # Field name made lowercase.
    risikovurdering = models.TextField(blank=True, null=True)
    lokation = models.ForeignKey('Lokation', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ejendomsdata'
    
    # classmethod to filter and retrieve properties based on the given criteria 
    @classmethod
    def search(cls, filter_data, limit=50): 

        q = Q() # initialize Q object for filtering
        fields = ['id', 'bfe_nr'] # default fields/columns to be retrieved 

        if filter_data:
            # iterate both keys and values int the filter_data using the items() method
            for key, value in filter_data.items():
                fields.append(key) # add key to the list of fields to retrieve 
                # add criteria to the Q object by combining them with AND operation
                # **{key: value} unpacks dictionary into key-value arguments 
                # Example: If key="ejendomstype" and value ="parcelhus", **{key: value} becomes {ejendomstype = parcelhus}
                q &= Q(**{key: value})

            # query the database for properties matching the criteria 
            # .value(*fields) specifies the returned fileds. 
            # [:limit] limits the number of returned rows
            properties = Ejendomsdata.objects.filter(q).values(*fields)[:limit]

            return properties
    
    # classmethod to filter and retrieve a random selection of properties based on the given criteria 
    @classmethod
    def searchRandom(cls, filter_data, limit=10): 

        q = Q()
        fields = ['id', 'bfe_nr']

        if filter_data:
            for key, value in filter_data.items():
                fields.append(key)
                q &= Q(**{key: value})

            # query the database for properties matching the criteria and randomize the result using order_by(?)
            properties = Ejendomsdata.objects.filter(q).values(*fields).order_by('?')[:limit]

            return properties
    
    # class method to create query based on given the criteria. 
    # Returns the search criteria as a Q object and a list fields
    @classmethod
    def create_query(cls, filter_data):
        q = Q() # initialize Q object for filtering
        fields = ['id', 'bfe_nr'] # default fields/columns to be retrieved 

        if filter_data:
            # iterate through both keys and values in the filter_data using the items() method
            for key, value in filter_data.items():
                fields.append(key) # add key to the list of fields to retrieve 
                # add criteria to the Q object by combining them with AND operation
                # **{key: value} unpacks dictionary into key-value arguments 
                # Example: If key="ejendomstype" and value ="parcelhus", **{key: value} becomes {ejendomstype = parcelhus}
                q &= Q(**{key: value})

        return q, fields  # return the Q object and the list of fields
        

# For ejendomstype dropdown
class Ejendomstype(models.Model):
    ejendomstype_kode = models.BigIntegerField(primary_key=True)
    ejendomstype = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ejendomstype'


class Landekode(models.Model):
    land_id = models.BigIntegerField(primary_key=True)
    land_navn = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'landekode'


class Lokation(models.Model):
    postnummer = models.BigIntegerField(blank=True, null=True)
    postdistrikt = models.TextField(blank=True, null=True)
    by_navn = models.TextField(blank=True, null=True)
    lokation_id = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'lokation'

class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'

