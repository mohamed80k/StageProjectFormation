import json

config =  {"email": "bidoudan.mohamed@gmail.com",
 "password": "stibits@Med",
 "formation_link": "https://classroom.udacity.com/nanodegrees/nd063/syllabus/core-curriculum" ,
 "email_sender": "ennabouchmohamed@gmail.com",
   "password_sender": "pkqdnqazdainszny"}
    

with open('config.json', 'w') as f:
    json.dump(config, f)