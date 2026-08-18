export const getRiskAssessment = (heatIndex) => {
  if (heatIndex < 30) {
    return { riskLevel: 'LOW', recommendedAction: 'Continue routine monitoring' };
  } else if (heatIndex >= 30 && heatIndex <= 39) {
    return { riskLevel: 'MODERATE', recommendedAction: 'Increase monitoring and issue precautionary advisory' };
  } else if (heatIndex >= 40 && heatIndex <= 44) {
    return { riskLevel: 'HIGH', recommendedAction: 'Prepare response teams and public advisory' };
  } else {
    return { riskLevel: 'CRITICAL', recommendedAction: 'Activate heatwave response measures' };
  }
};