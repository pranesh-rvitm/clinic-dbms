"""  Importing the Dependencies """

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn import metrics
import sys

"""Data Collection & Analysis"""



# loading the data from csv file to a Pandas DataFrame
insurance_dataset = pd.read_csv('dis.csv')

"""Data Analysis"""
def func1():
 # distribution of age value
 sns.set()
 plt.figure(figsize=(7,7))
 sns.displot(insurance_dataset['age'])
 plt.title('Age Distribution')
 plt.savefig('./public/graphs/my_plot1.png')

 # Gender column
 plt.figure(figsize=(7,7))
 sns.countplot(x='sex', data=insurance_dataset)
 plt.title('Sex Distribution')
 plt.savefig('./public/graphs/my_plot2.png')

 insurance_dataset['sex'].value_counts()
 # bmi distribution
 plt.figure(figsize=(6,6))
 sns.distplot(insurance_dataset['bmi'])
 plt.title('BMI Distribution')
 plt.savefig('./public/graphs/my_plot4.png')

 # distribution of charges value
 plt.figure(figsize=(7,7))
 sns.distplot(insurance_dataset['charges'])
 plt.title('Charges Distribution')
 plt.savefig('./public/graphs/my_plot3.png')

 # Disease column
 plt.figure(figsize=(6,6))
 sns.countplot(x='Diseases', data=insurance_dataset)
 plt.title('Diseases')
 plt.savefig('./public/graphs/my_plot5.png')
 
 
#function call if argument is 1
if(int(sys.argv[2])==0):
 func1() 

"""Data Pre-Processing

Encoding the categorical features
"""

# encoding sex column
insurance_dataset.replace({'sex':{'male':0,'female':1}}, inplace=True)

3 # encoding 'smoker' column
insurance_dataset.replace({'smoker':{'yes':0,'no':1}}, inplace=True)

# encoding 'region' column
insurance_dataset.replace({'region':{'southeast':0,'southwest':1,'northeast':2,'northwest':3}}, inplace=True)

# encoding 'diseases' column
insurance_dataset.replace({'Diseases':{'Asthma':0,'Cancer':1,'covid-19':2,'Diabetes':3,'Diarrhea':4,'Tuberculosis':5}}, inplace=True)


"""Splitting the Features and Target"""

X = insurance_dataset.drop(columns='charges', axis=1)
Y = insurance_dataset['charges']



"""Splitting the data into Training data & Testing Data"""

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=2)


"""Model Training Linear Regression"""


# loading the Linear Regression model
regressor = LinearRegression()
regressor.fit(X_train, Y_train)

"""Model Evaluation"""

# prediction on training data
training_data_prediction =regressor.predict(X_train)

# R squared value
r2_train = metrics.r2_score(Y_train, training_data_prediction)

# prediction on test data
test_data_prediction =regressor.predict(X_test)

# R squared value
r2_test = metrics.r2_score(Y_test, test_data_prediction)

"""Building a Predictive System"""
def func2():
    input_data = (int(sys.argv[1]),1,25.74,0,1,0,int(sys.argv[3]))
    # changing input_data to a numpy array
    input_data_as_numpy_array = np.asarray(input_data)
    # reshape the array
    input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)
    prediction = regressor.predict(input_data_reshaped)
    # print(prediction)
    if prediction[0]<0:
       prediction[0]*=-1
    print('The approximate cost is rupees ', prediction[0]*9.5)
    return prediction[0]


if(int(sys.argv[2])==1):
 func2()
