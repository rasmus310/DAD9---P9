# fil indeholder alle gyldige søgekriterier
# søgekriterier der skal søges via foreign key relations skal mappes i search_criteria_mapping. 
    # key = hvad der sendes fra frontenden i get request 
    # value = det key der skal indgå i query
# søgekriterier der findes direkte i ejendomsdata skal angives i 

search_criteria_mapping = {
    'ejendomstype' : 'ejendomstype_kode__ejendomstype',
    'land' : 'land__land_navn',
    'by' : 'lokation__by_navn',
    'postnummer' : 'lokation__postnummer'
}

direct_search_criteria = ['forurenet','fk_brand','risikovurdering']