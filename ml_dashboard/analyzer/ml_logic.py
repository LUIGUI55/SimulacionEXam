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
                'accuracy': 0.986, 
                'f1_score': 0.99, # Estimated from high accuracy
                'precision': 0.99,
                'recall': 0.99,
                'confusion_matrix': [[256, 7], [6, 728]], # Real TN, FP, FN, TP from evaluation
                'roc_curve': {
                    'fpr': [0.0, 0.01, 0.05, 0.1, 0.5, 1.0], # Simulated high performance curve
                    'tpr': [0.0, 0.95, 0.98, 0.99, 1.0, 1.0]
                },
                'loss_curve': [0.8, 0.4, 0.2, 0.1, 0.05, 0.02, 0.01] # Simulated convergence
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
