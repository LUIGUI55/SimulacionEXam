document.addEventListener('DOMContentLoaded', () => {
    // Chart Contexts
    const metricsCtx = document.getElementById('metricsChart').getContext('2d');
    const confusionCtx = document.getElementById('confusionChart').getContext('2d');
    const rocCtx = document.getElementById('rocChart').getContext('2d');
    const lossCtx = document.getElementById('lossChart').getContext('2d');

    let metricsChart, confusionChart, rocChart, lossChart;
    const generateBtn = document.getElementById('generateBtn');

    // --- 1. Metrics Bar Chart ---
    metricsChart = new Chart(metricsCtx, {
        type: 'bar',
        data: {
            labels: ['Accuracy', 'F1 Score', 'Precision', 'Recall'],
            datasets: [{
                label: 'Value',
                data: [0, 0, 0, 0],
                backgroundColor: ['rgba(99, 102, 241, 0.6)', 'rgba(16, 185, 129, 0.6)', 'rgba(245, 158, 11, 0.6)', 'rgba(239, 68, 68, 0.6)'],
                borderColor: ['rgba(99, 102, 241, 1)', 'rgba(16, 185, 129, 1)', 'rgba(245, 158, 11, 1)', 'rgba(239, 68, 68, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true, max: 1.0 } },
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // --- 2. Confusion Matrix (Using Bar Chart trick for visual simulation or Heatmap if plugin avail, but standard bar for simplicity here) ---
    // Actually, a simple way to visualize 2x2 without plugins is a stacked bar or just 4 bars labeled TN, FP, FN, TP
    confusionChart = new Chart(confusionCtx, {
        type: 'bar',
        data: {
            labels: ['True Negative', 'False Positive', 'False Negative', 'True Positive'],
            datasets: [{
                label: 'Count',
                data: [0, 0, 0, 0],
                backgroundColor: ['#10b981', '#ef4444', '#f59e0b', '#10b981']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // --- 3. ROC Curve (Line Chart) ---
    rocChart = new Chart(rocCtx, {
        type: 'line',
        data: {
            labels: [], // FPR values
            datasets: [{
                label: 'ROC Curve',
                data: [], // TPR values
                borderColor: '#6366f1',
                tension: 0.1,
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.1)'
            }, {
                label: 'Random Chance',
                data: [0, 1],
                borderColor: '#9ca3af',
                borderDash: [5, 5],
                pointRadius: 0
            }]
        },
        options: {
            scales: {
                x: { type: 'linear', position: 'bottom', title: { display: true, text: 'False Positive Rate' }, min: 0, max: 1 },
                y: { title: { display: true, text: 'True Positive Rate' }, min: 0, max: 1 }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // --- 4. Training Loss (Line Chart) ---
    lossChart = new Chart(lossCtx, {
        type: 'line',
        data: {
            labels: [], // Epochs
            datasets: [{
                label: 'Training Loss',
                data: [],
                borderColor: '#ef4444',
                tension: 0.3
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Epoch' } },
                y: { title: { display: true, text: 'Loss' }, beginAtZero: true }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    generateBtn.addEventListener('click', () => {
        const modelName = document.getElementById('modelSelect').value;
        updateAllCharts(modelName);
    });

    async function updateAllCharts(modelName) {
        try {
            const response = await fetch(`/api/metrics/?model=${encodeURIComponent(modelName)}`);
            const data = await response.json();

            // 1. Update Metrics
            metricsChart.data.datasets[0].data = [data.accuracy, data.f1_score, data.precision, data.recall];
            metricsChart.update();

            // 2. Update Confusion Matrix (Flatten 2x2)
            // [[TN, FP], [FN, TP]] -> [TN, FP, FN, TP]
            const cm = data.confusion_matrix;
            confusionChart.data.datasets[0].data = [cm[0][0], cm[0][1], cm[1][0], cm[1][1]];
            confusionChart.update();

            // 3. Update ROC
            // Chart.js Scatter/Line with linear scale expects points {x, y}
            const rocPoints = data.roc_curve.fpr.map((fpr, i) => ({ x: fpr, y: data.roc_curve.tpr[i] }));
            rocChart.data.datasets[0].data = rocPoints;
            // Update random chance line
            rocChart.data.datasets[1].data = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
            rocChart.update();

            // 4. Update Loss
            lossChart.data.labels = data.loss_curve.map((_, i) => i + 1);
            lossChart.data.datasets[0].data = data.loss_curve;
            lossChart.update();

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to load model metrics.');
        }
    }

    // Load initial data
    updateAllCharts(document.getElementById('modelSelect').value);
});
