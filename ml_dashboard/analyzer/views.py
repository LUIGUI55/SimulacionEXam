from django.shortcuts import render
from django.http import JsonResponse
from .ml_logic import ModelEvaluator

def index(request):
    """Renders the main dashboard page."""
    return render(request, 'analyzer/index.html')

def get_model_metrics(request):
    """API Endpoint to get metrics for a selected model."""
    model_name = request.GET.get('model', 'Logistic Regression')
    metrics = ModelEvaluator.get_metrics(model_name)
    return JsonResponse(metrics)
