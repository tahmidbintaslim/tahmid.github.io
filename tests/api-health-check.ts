/**
 * API Health Check Script
 * Run: npx tsx tests/api-health-check.ts
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface TestResult {
  endpoint: string;
  status: 'PASS' | 'FAIL';
  statusCode?: number;
  error?: string;
}

const endpoints = [
  { path: '/api/csrf', method: 'GET' },
  { path: '/api/visitors', method: 'GET' },
  { path: '/api/blog', method: 'GET' },
  { path: '/api/news', method: 'GET' },
  { path: '/api/weather', method: 'GET' },
];

async function testEndpoint(endpoint: { path: string; method: string }): Promise<TestResult> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint.path}`, {
      method: endpoint.method,
    });
    
    return {
      endpoint: endpoint.path,
      status: response.ok ? 'PASS' : 'FAIL',
      statusCode: response.status,
    };
  } catch (error) {
    return {
      endpoint: endpoint.path,
      status: 'FAIL',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function runTests() {
  console.log('🔍 Testing API endpoints...\n');
  
  const results = await Promise.all(endpoints.map(testEndpoint));
  
  results.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${result.endpoint} - ${result.statusCode || result.error}`);
  });
  
  const passed = results.filter(r => r.status === 'PASS').length;
  console.log(`\n📊 Results: ${passed}/${results.length} passed`);
}

runTests();
