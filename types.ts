
export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export interface Log {
  id: string;
  timestamp: Date;
  level: LogLevel;
  service: string;
  message: string;
}

export enum Status {
  HEALTHY = 'Healthy',
  DEGRADED = 'Degraded',
  UNHEALTHY = 'Unhealthy',
}

export interface InfraStatus {
  aws: Status;
  kubernetes: Status;
  sqlDatabase: Status;
}

export interface LatencyDataPoint {
    name: string;
    latency: number;
}

export interface Metrics {
  latencyData: LatencyDataPoint[];
  completeness: number;
  totalLogs: number;
}
