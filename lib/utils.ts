import { SolarCalculation } from './types';

/**
 * Calculate solar system requirements and ROI based on monthly electricity bill
 * @param monthlyBill - Average monthly electricity bill in INR
 * @returns Solar calculation results
 */
export function calculateSolarSystem(monthlyBill: number): SolarCalculation {
    // Average electricity rate in India: ₹7 per unit
    const avgElectricityRate = 7;

    // Calculate monthly consumption in units (kWh)
    const monthlyConsumption = monthlyBill / avgElectricityRate;

    // Daily consumption
    const dailyConsumption = monthlyConsumption / 30;

    // Required capacity (assuming 4 peak sun hours per day)
    // System capacity = Daily consumption / Peak sun hours
    const requiredCapacity = Math.ceil(dailyConsumption / 4);

    // System cost: ₹50,000 per kW (average)
    const costPerKW = 50000;
    const systemCost = requiredCapacity * costPerKW;

    // Calculate subsidy based on PM Surya Ghar Yojana
    let subsidy = 0;
    if (requiredCapacity <= 2) {
        subsidy = requiredCapacity * 30000;
    } else if (requiredCapacity <= 3) {
        subsidy = 60000 + (requiredCapacity - 2) * 18000;
    } else {
        subsidy = 78000; // Maximum subsidy
    }

    // Net cost after subsidy
    const netCost = systemCost - subsidy;

    // Monthly savings (assuming 90% bill reduction)
    const monthlySavings = monthlyBill * 0.9;

    // Annual savings
    const annualSavings = monthlySavings * 12;

    // ROI in years
    const roiYears = parseFloat((netCost / annualSavings).toFixed(1));

    return {
        monthlyBill,
        requiredCapacity,
        systemCost,
        subsidy,
        netCost,
        monthlySavings,
        annualSavings,
        roiYears,
    };
}

/**
 * Calculate EMI for solar loan
 * @param principal - Loan amount
 * @param annualRate - Annual interest rate (percentage)
 * @param tenureYears - Loan tenure in years
 * @returns Monthly EMI amount
 */
export function calculateEMI(
    principal: number,
    annualRate: number,
    tenureYears: number
): number {
    const monthlyRate = annualRate / 12 / 100;
    const tenureMonths = tenureYears * 12;

    if (monthlyRate === 0) {
        return principal / tenureMonths;
    }

    const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    return Math.round(emi);
}

/**
 * Format currency in Indian Rupee format
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format number in Indian numbering system
 * @param num - Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-IN').format(num);
}
