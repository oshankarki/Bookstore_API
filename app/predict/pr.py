import pickle
import sys
import json
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler

class LinearRegression:
    def __init__(self, learning_rate=0.01, num_iterations=1000):
        self.learning_rate = learning_rate
        self.num_iterations = num_iterations
        self.weights = None
        self.bias = None
        self.mean = None
        self.std = None
    
    def fit(self, X, y):
        num_samples, num_features = X.shape
        
        # Standardize input features
        self.mean = np.mean(X, axis=0)
        self.std = np.std(X, axis=0)
        X = (X - self.mean) / self.std
        
        # Initialize weights and bias to zero
        self.weights = np.zeros(num_features)
        self.bias = 0
        
        # Gradient descent
        for i in range(self.num_iterations):
            # Calculate predicted values
            y_pred = np.dot(X, self.weights) + self.bias
            
            # Calculate gradients
            dw = (1/num_samples) * np.dot(X.T, (y_pred - y))
            db = (1/num_samples) * np.sum(y_pred - y)
            
            # Update weights and bias
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db
    
    def predict(self, X):
        # Standardize input features using mean and std from training data
        X = (X - self.mean) / self.std
        y_pred = np.dot(X, self.weights) + self.bias
        return y_pred


# Load the model
model_file_path = "/Users/oshankarki/Downloads/HousePrice/backend/app/predict/UpdatedModel.pkl"
with open(model_file_path, "rb") as model_file:
    model = pickle.load(model_file)

# Load input values as a dictionary
input_data = json.loads(sys.argv[1])
new_data = pd.DataFrame(input_data, index=[0])

# Convert categorical variables to numeric using label encoding
cat_cols = new_data.select_dtypes(include='object').columns.tolist()
le = LabelEncoder()
for col in cat_cols:
    new_data[col] = le.fit_transform(new_data[col])

# Predict sale price using the loaded model
predicted_price = model.predict(new_data)

# Print the predicted sale price
print(predicted_price[0])
