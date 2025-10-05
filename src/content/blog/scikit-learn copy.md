---
title: 'An First Machine Learning Model'
description: 'A web-based order management system'
pubDate: 'Jul 08 2025'
heroImage: '../../assets/blog-placeholder-3.jpg'
---
Hello, everyone! In this post, we're going to dive into the world of machine learning with **Scikit-learn**, one of the most popular and powerful libraries for data science in Python. We'll walk through how to set up a project in **Visual Studio Code (VS Code)** and build a simple machine learning model.


### Why Use Scikit-learn and VS Code?

Before we get our hands dirty, let's talk about why this combination is so effective.

**Scikit-learn** is a free software machine learning library for Python. It provides a wide range of algorithms for classification, regression, clustering, and more, all with a consistent and easy-to-use interface. This makes it the go-to tool for both beginners and experts.

**Visual Studio Code**, on the other hand, is a versatile code editor. Its **Jupyter Notebook** integration is a game-changer for data science projects. Using a notebook file (`.ipynb`) allows you to write and run code in cells, display the output (including plots and tables) right below the code, and add markdown text to explain your process. This makes your work reproducible and easy to share.



### Step 1: Setting Up Your Environment

First, make sure you have Python and VS Code installed.

1.  **Install the Python Extension**: Open VS Code, go to the Extensions view (Ctrl+Shift+X), and search for "Python". Install the official extension from Microsoft.
2.  **Install Scikit-learn**: Open a new terminal in VS Code (Ctrl+`). You'll need to install the necessary libraries. We'll also install **NumPy** and **Pandas**, which are essential for handling data. Run the following command:

    ```bash
    pip install scikit-learn numpy pandas jupyter
    ```
    The `jupyter` package is needed for the notebook functionality.



### Step 2: Creating Your Notebook

Now, let's create our project file.

1.  Create a new file in VS Code and save it with a `.ipynb` extension, for example, `first_model.ipynb`.
2.  VS Code will automatically recognize it as a Jupyter Notebook. You'll see a series of cells where you can write code or markdown.



### Step 3: Building a Simple Model

We'll use a classic dataset included with Scikit-learn: the **Iris dataset**. It contains measurements of different types of iris flowers, and we'll build a model to classify them.

1.  **Import the Libraries**: In the first code cell, import the libraries we'll need.

    ```python
    import pandas as pd
    from sklearn.datasets import load_iris
    from sklearn.model_selection import train_test_split
    from sklearn.tree import DecisionTreeClassifier
    from sklearn.metrics import accuracy_score
    ```

2.  **Load and Prepare the Data**: In the next cell, we'll load the data and convert it into a Pandas DataFrame to make it easier to work with.

    ```python
    # Load the Iris dataset
    iris = load_iris()

    # Create a DataFrame for the features (X) and a Series for the target (y)
    X = pd.DataFrame(iris.data, columns=iris.feature_names)
    y = pd.Series(iris.target)

    # Display the first 5 rows of the data
    print("Features:")
    print(X.head())

    print("\nTarget (0=setosa, 1=versicolor, 2=virginica):")
    print(y.head())
    ```
    This step is crucial for understanding your data before you train a model.

3.  **Split the Data**: Before training, we must split our data into training and testing sets. The training set is used to "teach" the model, while the testing set is used to evaluate its performance on unseen data.

    ```python
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    print(f"Training set size: {X_train.shape[0]} samples")
    print(f"Testing set size: {X_test.shape[0]} samples")
    ```

4.  **Train the Model**: We'll use a **Decision Tree Classifier**, a simple yet powerful model. We'll create an instance of the model and then `fit` it to our training data.

    ```python
    # Initialize the model
    model = DecisionTreeClassifier(random_state=42)

    # Train the model
    model.fit(X_train, y_train)
    print("Model training complete!")
    ```

5.  **Evaluate the Model**: Finally, we'll use the trained model to make predictions on the test set and evaluate how well it performed using the **accuracy score**.

    ```python
    # Make predictions on the test set
    y_pred = model.predict(X_test)

    # Calculate the accuracy of the model
    accuracy = accuracy_score(y_test, y_pred)
    print(f"The accuracy of our model is: {accuracy:.2f}")
    ```


### The Final Verdict: Is It Worth It?

Absolutely. Learning how to use Scikit-learn in a Jupyter Notebook environment is a fundamental skill for anyone interested in data science or machine learning. It provides a structured, clear, and reproducible way to experiment with different models and algorithms. This approach makes it easier to track your progress, share your findings with others, and ultimately, build more effective machine learning solutions.

The combination of VS Code and Scikit-learn is a powerful duo that makes the learning curve for machine learning much smoother.

Are you ready to build your first model? What other types of models would you like to explore?