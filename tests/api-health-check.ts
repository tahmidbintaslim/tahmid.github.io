/**
 * API Health Check Script
 * Run: npx tsx tests/api-health-check.ts
 */

import { spawn, ChildProcess } from 'child_process';

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
  { path: '/api/weather?lat=40.7128&lon=-74.0060', method: 'GET' }, // New York coordinates for testing
];

async function waitForServerReady(
  url: string,
  timeoutMs: number = 30000
): Promise<void> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok) {
        console.log('✅ Server is ready');
        return;
      }
    } catch {
      // Server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
  }
  throw new Error('Server did not start within timeout');
}

async function testEndpoint(endpoint: {
  path: string;
  method: string;
}): Promise<TestResult> {
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

  results.forEach((result) => {
    const icon = result.status === 'PASS' ? '✅' : '❌';
    console.log(
      `${icon} ${result.endpoint} - ${result.statusCode || result.error}`
    );
  });

  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.length - passed;
  console.log(`\n📊 Results: ${passed}/${results.length} passed`);

  return failed === 0;
}

async function main() {
  let serverProcess: ChildProcess | null = null;
  let success = false;

  try {
    console.log('🚀 Starting Next.js dev server...');
    serverProcess = spawn('pnpm', ['dev'], {
      cwd: process.cwd(),
      stdio: ['inherit', 'inherit', 'inherit'],
      shell: true, // Use shell for macOS compatibility
    });

    // Wait for server to be ready
    await waitForServerReady(`${BASE_URL}/api/csrf`);

    // Run tests
    success = await runTests();
  } catch (error) {
    console.error('❌ Error during testing:', error);
    success = false;
  } finally {
    if (serverProcess) {
      console.log('🛑 Stopping server...');
      serverProcess.kill('SIGTERM');
      // Wait a bit for graceful shutdown
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (!serverProcess.killed) {
        serverProcess.kill('SIGKILL');
      }
    }
  }

  process.exit(success ? 0 : 1);
}

main();
