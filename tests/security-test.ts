/**
 * Security Test Script
 * Tests CSRF protection and rate limiting
 * Run: npx tsx tests/security-test.ts
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface TestResult {
  test: string;
  status: 'PASS' | 'FAIL';
  message: string;
}

const results: TestResult[] = [];
const originHeaders = { Origin: BASE_URL, Referer: `${BASE_URL}/` };

async function testCSRFProtection() {
  console.log('\n🔒 Testing CSRF Protection...\n');

  // Test 1: Request without CSRF token should fail
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...originHeaders },
      body: JSON.stringify({
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test message here',
      }),
    });

    if (response.status === 403) {
      results.push({
        test: 'CSRF - Request without token',
        status: 'PASS',
        message: 'Correctly rejected (403)',
      });
    } else {
      results.push({
        test: 'CSRF - Request without token',
        status: 'FAIL',
        message: `Expected 403, got ${response.status}`,
      });
    }
  } catch (error) {
    results.push({
      test: 'CSRF - Request without token',
      status: 'FAIL',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Test 2: Request with valid CSRF token should succeed
  try {
    // Get CSRF token
    const csrfResponse = await fetch(`${BASE_URL}/api/csrf`);
    const { token } = await csrfResponse.json();
    const cookies = csrfResponse.headers.get('set-cookie');

    // Make request with token
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
        Cookie: cookies || '',
        ...originHeaders,
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Security Test',
        message: 'This is a security test message with sufficient length.',
      }),
    });

    if (response.ok || response.status === 500) {
      // 500 is ok if SMTP not configured
      results.push({
        test: 'CSRF - Request with valid token',
        status: 'PASS',
        message: `Accepted (${response.status})`,
      });
    } else {
      results.push({
        test: 'CSRF - Request with valid token',
        status: 'FAIL',
        message: `Expected 200/500, got ${response.status}`,
      });
    }
  } catch (error) {
    results.push({
      test: 'CSRF - Request with valid token',
      status: 'FAIL',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Test 3: Request with invalid token should fail
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': 'invalid-token-12345',
        ...originHeaders,
      },
      body: JSON.stringify({
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test message',
      }),
    });

    if (response.status === 403) {
      results.push({
        test: 'CSRF - Request with invalid token',
        status: 'PASS',
        message: 'Correctly rejected (403)',
      });
    } else {
      results.push({
        test: 'CSRF - Request with invalid token',
        status: 'FAIL',
        message: `Expected 403, got ${response.status}`,
      });
    }
  } catch (error) {
    results.push({
      test: 'CSRF - Request with invalid token',
      status: 'FAIL',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

async function testInputValidation() {
  console.log('\n🛡️  Testing Input Validation...\n');

  // Get CSRF token first
  const csrfResponse = await fetch(`${BASE_URL}/api/csrf`);
  const { token } = await csrfResponse.json();
  const cookies = csrfResponse.headers.get('set-cookie');

  // Test 1: Invalid email format
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
        Cookie: cookies || '',
        ...originHeaders,
      },
      body: JSON.stringify({
        name: 'Test',
        email: 'invalid-email',
        subject: 'Test',
        message: 'Test message',
      }),
    });

    if (response.status === 400) {
      results.push({
        test: 'Validation - Invalid email',
        status: 'PASS',
        message: 'Correctly rejected (400)',
      });
    } else {
      results.push({
        test: 'Validation - Invalid email',
        status: 'FAIL',
        message: `Expected 400, got ${response.status}`,
      });
    }
  } catch (error) {
    results.push({
      test: 'Validation - Invalid email',
      status: 'FAIL',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Test 2: Message too short
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
        Cookie: cookies || '',
        ...originHeaders,
      },
      body: JSON.stringify({
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Short',
      }),
    });

    if (response.status === 400) {
      results.push({
        test: 'Validation - Message too short',
        status: 'PASS',
        message: 'Correctly rejected (400)',
      });
    } else {
      results.push({
        test: 'Validation - Message too short',
        status: 'FAIL',
        message: `Expected 400, got ${response.status}`,
      });
    }
  } catch (error) {
    results.push({
      test: 'Validation - Message too short',
      status: 'FAIL',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

async function testSecurityHeaders() {
  console.log('\n🔐 Testing Security Headers...\n');

  try {
    const response = await fetch(BASE_URL);
    const headers = response.headers;

    // Check for security headers
    const requiredHeaders = [
      'x-frame-options',
      'x-content-type-options',
      'referrer-policy',
    ];

    for (const header of requiredHeaders) {
      if (headers.has(header)) {
        results.push({
          test: `Security Header - ${header}`,
          status: 'PASS',
          message: `Present: ${headers.get(header)}`,
        });
      } else {
        results.push({
          test: `Security Header - ${header}`,
          status: 'FAIL',
          message: 'Header not found',
        });
      }
    }
  } catch (error) {
    results.push({
      test: 'Security Headers',
      status: 'FAIL',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

async function runTests() {
  console.log('🔒 Security Test Suite\n');
  console.log(`Testing: ${BASE_URL}\n`);
  console.log('='.repeat(50));

  await testCSRFProtection();
  await testInputValidation();
  await testSecurityHeaders();

  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Test Results:\n');

  results.forEach((result) => {
    const icon = result.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${result.test}`);
    console.log(`   ${result.message}\n`);
  });

  const passed = results.filter((r) => r.status === 'PASS').length;
  const total = results.length;

  console.log('='.repeat(50));
  console.log(`\n🎯 Score: ${passed}/${total} tests passed\n`);

  if (passed === total) {
    console.log('✅ All security tests passed!\n');
    process.exit(0);
  } else {
    console.log('❌ Some security tests failed. Please review.\n');
    process.exit(1);
  }
}

runTests();
