document.getElementById('pv-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get input values
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const roofArea = parseFloat(document.getElementById('roof-area').value);
    const roofAngle = parseFloat(document.getElementById('roof-angle').value);
    const energyConsumption = parseFloat(document.getElementById('energy-consumption').value);
    const panelEfficiency = parseFloat(document.getElementById('panel-efficiency').value) / 100;
    const inverterEfficiency = parseFloat(document.getElementById('inverter-efficiency').value) / 100;
    const panelDegradation = parseFloat(document.getElementById('panel-degradation').value) / 100;
    const shadingFactor = parseFloat(document.getElementById('shading-factor').value) / 100;

    // Perform calculations
    const results = calculatePVSystem(latitude, longitude, roofArea, roofAngle, energyConsumption, panelEfficiency, inverterEfficiency, panelDegradation, shadingFactor);

    // Display results
    document.getElementById('system-size').textContent = results.systemSize.toFixed(2);
    document.getElementById('energy-production').textContent = results.annualEnergyProduction.toFixed(0);
    document.getElementById('panel-count').textContent = results.numberOfPanels;
    document.getElementById('estimated-cost').textContent = results.estimatedCost.toFixed(2);
    document.getElementById('payback-period').textContent = results.paybackPeriod.toFixed(1);
    document.getElementById('co2-savings').textContent = results.co2Savings.toFixed(0);

    // Create chart
    createProductionChart(results.monthlyProduction);

    document.getElementById('results').classList.remove('hidden');
});

function createProductionChart(monthlyProduction) {
    const ctx = document.getElementById('production-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Monthly Energy Production (kWh)',
                data: monthlyProduction,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Energy Production (kWh)'
                    }
                }
            }
        }
    });
}