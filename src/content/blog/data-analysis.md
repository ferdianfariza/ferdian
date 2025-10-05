---
title: 'A Beginner''s Guide to Data Analysis with Pandas'
description: 'A web-based order management system for python'
pubDate: 'Jun 19 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
---
Hello, everyone! In this post, we’re going to explore the fundamentals of **data analysis with Python**.  
We’ll use three of the most essential libraries in the data science ecosystem: **Pandas**, **NumPy**, and **Matplotlib**. By the end, you’ll be able to load, manipulate, and visualize datasets directly in a Jupyter Notebook inside Visual Studio Code.  


## Why Pandas, NumPy, and Matplotlib? 

- **NumPy**: Provides fast array operations and numerical computing.  
- **Pandas**: Built on top of NumPy, designed for working with tabular data (rows and columns).  
- **Matplotlib**: A powerful plotting library to visualize data with charts and graphs.  

Together, these three form the backbone of most Python data science projects.  


## Step 1: Setting Up the Environment  

Make sure Python and VS Code are installed. Then, install the required libraries:  

```bash
pip install numpy pandas matplotlib jupyter
```
Create a new file in VS Code and save it as analysis.ipynb. VS Code will render it as a Jupyter Notebook with runnable cells.

## Step 2: Create a simple dataset with Pandas
Open a new code cell and import Pandas. Then create a small DataFrame:

```python
import pandas as pd

data = {
    "Name": ["Alice", "Bob", "Charlie", "Diana", "Edward"],
    "Age": [25, 30, 35, 40, 29],
    "Salary": [50000, 60000, 70000, 80000, 55000]
}

df = pd.DataFrame(data)
df.head()
```
## Step 3: Basic analysis with NumPy and Pandas
Convert columns to NumPy arrays for numeric ops, and use Pandas methods for quick stats:
```python
import numpy as np

ages = df["Age"].to_numpy()
salaries = df["Salary"].to_numpy()

print("Average age:", np.mean(ages))
print("Max salary:", np.max(salaries))

# Pandas quick summary
df.describe()
```
df.describe() gives count, mean, std, min/max and quartiles — very handy for initial EDA.

## Step 4: Data cleaning examples (short)
Real datasets need cleaning. Examples:
```python
# drop rows with missing Salary
df_clean = df.dropna(subset=["Salary"])

# convert a column type
df_clean["Salary"] = df_clean["Salary"].astype(int)

# filter rows
df_filtered = df_clean[df_clean["Age"] >= 30]
```

## Step 5: Visualization with Matplotlib
Plot a bar chart and a scatter/line to understand distributions and relationships.
```python
import matplotlib.pyplot as plt

# Bar chart: Salary by Name
plt.figure(figsize=(8, 4))
plt.bar(df["Name"], df["Salary"])
plt.title("Salary Comparison")
plt.xlabel("Employee")
plt.ylabel("Salary")
plt.show()

# Scatter / line: Age vs Salary
plt.figure(figsize=(8, 4))
plt.plot(df["Age"], df["Salary"], marker="o")
plt.title("Age vs Salary")
plt.xlabel("Age")
plt.ylabel("Salary")
plt.grid(True)
plt.show()
```
Charts in the notebook show up inline — ideal for iterating quickly.

## Step 6: Combining everything: small analysis pipeline
```python
# 1. Load or create data (here we already have df)
# 2. Quick EDA
print(df.describe())

# 3. Feature engineering (example: salary per age)
df["Salary_per_Age"] = df["Salary"] / df["Age"]

# 4. Visualize the new metric
plt.figure(figsize=(8,4))
plt.bar(df["Name"], df["Salary_per_Age"])
plt.title("Salary per Age")
plt.xlabel("Employee")
plt.ylabel("Salary / Age")
plt.show()
```

This pattern is; load → clean → explore → visualize → iterate — is the core loop of data analysis.
