
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { MetricsDashboard } from './components/MetricsDashboard';
import { LogStream } from './components/LogStream';
import { InfrastructureStatus } from './components/InfrastructureStatus';
import { AiAnalysis } from './components/AiAnalysis';
import { mockLogService } from './services/mockLogService';
import { analyzeLogs } from './services/geminiService';
import type { Log, InfraStatus, Metrics } from './types';
import { Status } from './types';

const App: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [infraStatus, setInfraStatus] = useState<InfraStatus>({
    aws: Status.HEALTHY,
    kubernetes: Status.HEALTHY,
    sqlDatabase: Status.HEALTHY,
  });
  const [metrics, setMetrics] = useState<Metrics>({
    latencyData: [],
    completeness: 100,
    totalLogs: 0,
  });
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const logsRef = useRef(logs);
  logsRef.current = logs;

  useEffect(() => {
    const logGenerator = mockLogService.start((newLog, newLatency) => {
      setLogs(prevLogs => {
        const updatedLogs = [newLog, ...prevLogs];
        return updatedLogs.length > 200 ? updatedLogs.slice(0, 200) : updatedLogs;
      });

      setMetrics(prevMetrics => {
        const newLatencyData = [...prevMetrics.latencyData, { name: newLog.timestamp.toLocaleTimeString(), latency: newLatency }];
        return {
          ...prevMetrics,
          latencyData: newLatencyData.length > 30 ? newLatencyData.slice(-30) : newLatencyData,
          totalLogs: prevMetrics.totalLogs + 1,
          completeness: Math.max(98, prevMetrics.completeness - Math.random() * 0.01),
        };
      });

      // Simulate infrastructure status changes
      if (Math.random() < 0.01) {
        setInfraStatus(prev => ({ ...prev, aws: Status.DEGRADED }));
      } else if (Math.random() < 0.005) {
        setInfraStatus(prev => ({ ...prev, kubernetes: Status.UNHEALTHY }));
      } else if (Math.random() < 0.05) {
        // Self-healing
        setInfraStatus({ aws: Status.HEALTHY, kubernetes: Status.HEALTHY, sqlDatabase: Status.HEALTHY });
      }
    });

    return () => {
      mockLogService.stop(logGenerator);
    };
  }, []);

  const handleAnalyzeLogs = useCallback(async () => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysis('');
    try {
      // Analyze the most recent 50 logs for performance
      const logsToAnalyze = logsRef.current.slice(0, 50);
      if (logsToAnalyze.length === 0) {
        setAnalysis("No logs available to analyze yet.");
        return;
      }
      const result = await analyzeLogs(logsToAnalyze);
      setAnalysis(result);
    } catch (err) {
      console.error("Error analyzing logs:", err);
      setError("Failed to get analysis from AI. Please check the console for details.");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-screen-2xl">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <InfrastructureStatus status={infraStatus} />
            <MetricsDashboard metrics={metrics} />
          </div>
          <div className="lg:col-span-9 flex flex-col gap-6">
            <AiAnalysis onAnalyze={handleAnalyzeLogs} analysisResult={analysis} isLoading={isAnalyzing} error={error} />
            <LogStream logs={logs} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
