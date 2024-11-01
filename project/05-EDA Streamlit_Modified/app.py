import streamlit as st

import os
import streamlit as st
import pandas as pd

# Function to load a default dataset
def load_default_dataset(dataset_name):
    file_path = os.path.join('datasets', dataset_name)
    return pd.read_csv(file_path)

# Sidebar option for using default datasets or uploading a custom one
st.sidebar.title("Selecciona el dataset")
use_default = st.sidebar.checkbox("Usar un dataset predeterminado", value=True)

if use_default:
    # List available datasets in the 'datasets' directory
    dataset_options = [
        '01_entrada_salidas_aereopuertos_ascii.csv',
        '02_automobile.csv',
        '03_breast-cancer.csv',
        '04_diabetes.csv',
        '05_german-credit.csv',
        '06_glaucoma-m.csv',
        '07_iris.csv',
        '08_pima-indians-diabetes.csv',
        '09_titanic.csv',
        '10_us-arrests.csv',
        '11_Zoo.csv'
    ]
    dataset_choice = st.sidebar.selectbox("Seleccione un dataset predeterminado", dataset_options)
    data = load_default_dataset(dataset_choice)
else:
    uploaded_file = st.sidebar.file_uploader("Sube tu archivo CSV", type="csv")
    if uploaded_file:
        data = pd.read_csv(uploaded_file)
    else:
        st.write("Por favor, sube un archivo CSV o selecciona usar datos predeterminados.")

# Display dataset if loaded
if 'data' in locals():
    st.write("Vista previa de los datos:")
    st.write(data.head())

from multiapp import MultiApp
from apps import eda
from apps import models

st.set_page_config("Data Explorer & Modeller")

app = MultiApp()

app.add_app("Data Explorer", eda.app)
app.add_app("Machine Learning Modelling", models.app)
app.run()
