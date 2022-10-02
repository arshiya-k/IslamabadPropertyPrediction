from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/location_list', methods = ['GET'])
def getLocations():
    resp = jsonify({
        'locations': util.getLocationNames()
    })
    
    resp.headers.add('Access-Control-Allow-Origin', '*')

    return resp

@app.route('/predict_price', methods = ['GET','POST'])
def predictPrice():
    area = float(request.form['area'])
    location = request.form['location']
    bedrooms = int(request.form['bedrooms'])
    bathrooms = int(request.form['bathrooms'])

    resp = jsonify({
        'predicted_price': util.getEstimatedPrice(location, area, bedrooms, bathrooms)
    })

    resp.headers.add('Access-Control-Allow-Origin', '*')

    return resp


if __name__ == "__main__":
    print("STarting server")
    util.loadData()
    app.run()