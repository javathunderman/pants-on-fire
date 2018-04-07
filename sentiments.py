import requests
import json
def sentimentanalysis(biaslookup):
    raw_output = requests.post("http://text-processing.com/api/sentiment/", data={'text': biaslookup})
    cleanoutput = raw_output.json()
    label = (cleanoutput['label'])
    # extract(label)
    if(label == "pos"):
        finaloutput = ("Positive sentiment!")
    elif(label == "neg"):
        finaloutput = ("Negative sentiment!")
    elif(label=="neutral"):
        finaloutput = ("Neutral")
    else:
        finaloutput = ("Was not able to determine. ")
    return finaloutput
