import os
import sys
from app.repositories.interfaces import FileRepository

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.append(project_root)

from ml_model.repository.multiple_models import evaluate_multiple_models


class EvaluateModelsUseCase:
    """
    Use case class for evaluating multiple models for fairness.
    """

    def __init__(self, file_repo: FileRepository, model_files):
        """
        Initializes the use case with the model files and dataset path.

        Args:
            model_files (list): List of file paths to the serialized model (.pkl) files.
            csv_file_path (str): Path to the dataset CSV file.
        """
        self.model_files = model_files
        self.file_repo = file_repo

    def execute(self):
        """
        Executes the evaluation logic using the repository function.

        Returns:
            dict: A dictionary containing model file names and their respective MetricFrame objects.
        """
        # self.file_repo.import_csv_to_db()
        print("working till here")
        self.file_repo.save_data_to_csv()
        output = evaluate_multiple_models(self.model_files)
        self.file_repo.delete_csv_data()

        return output
