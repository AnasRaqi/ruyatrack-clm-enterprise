export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const { type } = req.query;
      
      // Generate analytics data based on type
      switch (type) {
        case 'portfolio':
          res.status(200).json({
            success: true,
            data: {
              totalContracts: 3,
              totalValue: 555000,
              currency: 'SAR',
              activeContracts: 3,
              renewalRate: 94,
              averageContractValue: 185000,
              contractsByCategory: [
                { category: 'Software & Technology', count: 2, value: 330000 },
                { category: 'Cloud Services', count: 1, value: 225000 }
              ],
              monthlyTrend: [
                { month: 'Jan', contracts: 1, value: 180000 },
                { month: 'Feb', contracts: 2, value: 405000 },
                { month: 'Mar', contracts: 3, value: 555000 }
              ]
            }
          });
          break;
          
        case 'vendors':
          res.status(200).json({
            success: true,
            data: {
              totalVendors: 3,
              activeVendors: 3,
              averageRating: 4.37,
              topVendors: [
                { name: 'Amazon Web Services', rating: 4.8, contractValue: 225000 },
                { name: 'Microsoft Corporation', rating: 4.2, contractValue: 180000 },
                { name: 'Salesforce Inc.', rating: 4.1, contractValue: 150000 }
              ],
              performanceMetrics: {
                onTimeDelivery: 4.5,
                marketReputation: 4.7,
                qualityOfService: 4.2,
                costEffectiveness: 3.9
              }
            }
          });
          break;
          
        case 'financial':
          res.status(200).json({
            success: true,
            data: {
              totalSpend: 555000,
              currency: 'SAR',
              budgetUtilization: 78,
              costSavings: 45000,
              spendByCategory: [
                { category: 'Software Licenses', amount: 330000, percentage: 59.5 },
                { category: 'Cloud Services', amount: 225000, percentage: 40.5 }
              ],
              quarterlySpend: [
                { quarter: 'Q1 2024', amount: 555000, contracts: 3 }
              ]
            }
          });
          break;
          
        default:
          // Return comprehensive analytics
          res.status(200).json({
            success: true,
            data: {
              overview: {
                totalContracts: 3,
                totalValue: 555000,
                activeContracts: 3,
                activeVendors: 3,
                renewalRate: 94,
                averageContractValue: 185000
              },
              trends: {
                contractGrowth: 15.2,
                valueGrowth: 23.8,
                vendorSatisfaction: 4.37
              },
              upcomingRenewals: [
                { contract: 'Microsoft Office 365 Enterprise', vendor: 'Microsoft Corporation', renewalDate: '2024-12-31', value: 180000 },
                { contract: 'AWS Cloud Services', vendor: 'Amazon Web Services', renewalDate: '2025-01-31', value: 225000 }
              ],
              riskAnalysis: {
                highRisk: 0,
                mediumRisk: 1,
                lowRisk: 2
              }
            }
          });
      }
    } else {
      res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Analytics API Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

