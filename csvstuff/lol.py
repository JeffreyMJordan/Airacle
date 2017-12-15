import pandas as pd 
import csv 


jan = "/Users/christine/Desktop/FlightDelayPredictor/csvstuff/lol.py"
a = pd.read_csv(jan, low_memory=False)

columns = ['ORIGIN_AIRPORT_ID', 'ORIGIN']

airlines = a[columns]

airlines = airlines.drop_duplicates(keep='first')

airlines.shape



