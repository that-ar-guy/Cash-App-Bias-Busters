from typing import Dict, Tuple
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import sys
import os

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

from interfaces.data_processor_interface import DataProcessorInterface


class DataProcessor(DataProcessorInterface):
    """
    DataProcessor is a class designed to handle preprocessing of a DataFrame,
    focusing on encoding categorical columns and managing their mappings.
    It provides methods to encode specified categorical columns, retrieve
    mappings for these encodings, and drop the original categorical columns
    from the DataFrame.
    """
    def __init__(self, inputs: pd.DataFrame):
        self.inputs = inputs
        self.categorical_columns = ["gender", "age_groups", "race", "state"]
        self.le_dict = {}  # Stores LabelEncoder objects for each column

    def encode_categorical_columns(self) -> pd.DataFrame:
        """
        Encodes each categorical column using LabelEncoder and stores the
        encoder in le_dict.
        """
        for col in self.categorical_columns:
            if col in self.inputs.columns:
                le = LabelEncoder()
                self.inputs[f"{col}_N"] = le.fit_transform(self.inputs[col])
                self.le_dict[col] = le
        return self.inputs

    def get_mappings(self) -> Dict[str, Dict[int, str]]:
        """
        Retrieves mappings from encoded values to original labels for each
        categorical column.
        """
        return {
            col: dict(zip(le.transform(le.classes_), le.classes_))
            for col, le in self.le_dict.items()
        }

    def drop_categorical_columns(self) -> pd.DataFrame:
        """
        Drops the original categorical columns and returns the
        updated DataFrame.
        """
        return self.inputs.drop(columns=self.categorical_columns,
                                errors="ignore")
