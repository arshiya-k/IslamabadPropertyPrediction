import json
import pickle 
import numpy as np

locations = None
data_columns = None
model = None

def getEstimatedPrice(location, area, bedrooms, bathrooms):
    try:
        loc_index = data_columns.index(location.lower())
    except:
        loc_index = -1
    x_factors = np.zeros(len(data_columns))
    x_factors[0] = bathrooms
    x_factors[1] = bedrooms
    x_factors[2] = area
    if loc_index >= 0:
        x_factors[loc_index] = 1
    
    return round(model.predict([x_factors])[0], 2)

def loadData():
    global data_columns
    global locations
    global model

    with open("./information/columns.json", 'r') as file:
        data_columns = json.load(file)['data_columns']
        locations = data_columns[3:]
    
    if model is None:
        with open("./information/islamabad_home_prices_model.pickle", 'rb') as file:
            model = pickle.load(file)
    
    print("done")

def getLocationNames():
    return locations

def getDataColumns():
    return data_columns

if __name__ == '__main__':
    loadData()
    print(getLocationNames())
    print(getEstimatedPrice('Bani Gala', 1000, 2, 3))
    print(getEstimatedPrice('Bani Gala', 2000, 2, 2))
    print(getEstimatedPrice('Shah Allah Ditta', 1000, 2, 3))
    print(getEstimatedPrice('Shah Allah Ditta', 2000, 2, 3))
