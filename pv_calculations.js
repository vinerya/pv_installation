function calculatePVSystem(latitude, longitude, roofArea, roofAngle, energyConsumption, panelEfficiency, inverterEfficiency, panelDegradation, shadingFactor) {
    // Constants
    const PANEL_POWER = 0.4; // 400W panel
    const PANEL_AREA = 1.7; // m²
    const SOLAR_CONSTANT = 1361; // W/m²
    const ATMOSPHERE_EFFECT = 0.7; // Atmosphere reduces solar radiation
    const ELECTRICITY_PRICE = 0.12; // $/kWh
    const SYSTEM_COST_PER_WATT = 2.5; // $/W
    const CO2_PER_KWH = 0.4; // kg CO2 per kWh

    // Calculate system size
    const maxPanels = Math.floor(roofArea / PANEL_AREA);
    const systemSize = Math.min(maxPanels * PANEL_POWER / 1000, energyConsumption / (365 * 4)); // kW

    // Calculate solar insolation
    const solarInsolation = calculateSolarInsolation(latitude, longitude, roofAngle);

    // Calculate energy production
    const dailyEnergyProduction = systemSize * solarInsolation * panelEfficiency * inverterEfficiency * (1 - shadingFactor);
    const annualEnergyProduction = dailyEnergyProduction * 365;

    // Calculate monthly production
    const monthlyProduction = calculateMonthlyProduction(latitude, longitude, roofAngle, systemSize, panelEfficiency, inverterEfficiency, shadingFactor);

    // Other calculations
    const numberOfPanels = Math.ceil(systemSize * 1000 / PANEL_POWER);
    const estimatedCost = systemSize * 1000 * SYSTEM_COST_PER_WATT;
    const annualSavings = annualEnergyProduction * ELECTRICITY_PRICE;
    const paybackPeriod = estimatedCost / annualSavings;
    const co2Savings = annualEnergyProduction * CO2_PER_KWH;

    return {
        systemSize,
        annualEnergyProduction,
        numberOfPanels,
        estimatedCost,
        paybackPeriod,
        co2Savings,
        monthlyProduction
    };
}

function calculateSolarInsolation(latitude, longitude, roofAngle) {
    // This is a simplified calculation. In a real-world scenario, you would use more complex models or APIs for accurate data.
    const latitudeRadians = latitude * Math.PI / 180;
    const declinationAngle = 23.45 * Math.PI / 180; // Assuming average declination
    const elevationAngle = Math.PI / 2 - latitudeRadians + declinationAngle;
    const roofAngleRadians = roofAngle * Math.PI / 180;

    const insolation = SOLAR_CONSTANT * ATMOSPHERE_EFFECT * Math.sin(elevationAngle) * Math.cos(roofAngleRadians - elevationAngle);
    return Math.max(0, insolation); // Ensure non-negative value
}

function calculateMonthlyProduction(latitude, longitude, roofAngle, systemSize, panelEfficiency, inverterEfficiency, shadingFactor) {
    // This is a simplified calculation. In a real-world scenario, you would use historical weather data or APIs for more accurate estimates.
    const baseProduction = systemSize * panelEfficiency * inverterEfficiency * (1 - shadingFactor) * 30; // kWh per month
    const seasonalVariation = [0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7]; // Northern hemisphere approximation
    
    return seasonalVariation.map(factor => baseProduction * factor);
}

// You can add more sophisticated calculations and helper functions here as needed