import { LineChart, Line } from "recharts";
import React from "react";

interface SparklineProps {
    data: { value: number }[];
    color: string;
}

export function Sparkline({ data, color }: SparklineProps) {
    return (
        <div style={{ width: 100, height: 32 }}>
            <LineChart width={100} height={32} data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
        </div>
    );
}