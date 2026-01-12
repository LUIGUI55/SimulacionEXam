class ModelEvaluator:
    """
    Mock evaluator to simulate ML model metrics.
    Replace with real sklearn logic when datasets are available.
    """
    
    @staticmethod
    def get_metrics(model_name):
        model_name = model_name.lower().strip()
        data = {
            'model': 'Unknown',
            'accuracy': 0.0, 'f1_score': 0.0, 'precision': 0.0, 'recall': 0.0,
            'confusion_matrix': [[0, 0], [0, 0]],
            'roc_curve': {'fpr': [], 'tpr': []},
            'loss_curve': []
        }
        
        if 'logistic' in model_name:
            data.update({
                'model': 'Logistic Regression',
                'accuracy': 0.85, 
                'f1_score': 0.83,
                'precision': 0.82,
                'recall': 0.84,
                'confusion_matrix': [[400, 50], [30, 350]], # TN, FP, FN, TP
                'roc_curve': {
                    'fpr': [0.0, 0.1, 0.2, 0.3, 0.5, 0.7, 0.9, 1.0],
                    'tpr': [0.0, 0.8, 0.85, 0.88, 0.90, 0.95, 0.98, 1.0]
                },
                'loss_curve': [0.9, 0.7, 0.5, 0.4, 0.35, 0.32, 0.31, 0.30, 0.29, 0.28]
            })
        elif 'svm' in model_name:
            data.update({
                'model': 'SVM',
                'accuracy': 0.88,
                'f1_score': 0.86,
                'precision': 0.87,
                'recall': 0.85,
                'confusion_matrix': [[420, 30], [25, 370]],
                'roc_curve': {
                    'fpr': [0.0, 0.05, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0],
                    'tpr': [0.0, 0.85, 0.9, 0.93, 0.96, 0.98, 0.99, 1.0]
                },
                'loss_curve': [1.2, 0.8, 0.6, 0.4, 0.25, 0.20, 0.18, 0.17, 0.16, 0.15]
            })
            
        return data
