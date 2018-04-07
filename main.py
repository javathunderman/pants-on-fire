import requests
import json
import sentiments
import sys
import detector_class
import logger
import bias_type.partisan
import bias_type.sensational

def main():
    biaslookup = sys.argv[1]
    finaloutput = sentiments.sentimentanalysis(biaslookup)
    print(finaloutput)
    result = bias_detector(biaslookup)
    logger.report(result, {'verbose': False})

def bias_detector(content):
    detector = detector_class.create()
    bias_type.partisan.define_bias_types(detector)
    bias_type.sensational.define_bias_types(detector)
    return detector.detect(content)

if __name__ == "__main__":
    main()
