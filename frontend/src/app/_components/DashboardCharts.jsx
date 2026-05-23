"use client";

import {
    ResponsiveContainer,
    LineChart, Line,
    BarChart, Bar,
    AreaChart, Area,
    Tooltip, XAxis
} from "recharts";

// Dados fictícios para os 3 gráficos
const dadosLinha = [
    { mes: "Jan", tempoMedioDias: 22 },
    { mes: "Fev", tempoMedioDias: 19 },
    { mes: "Mar", tempoMedioDias: 18 },
    { mes: "Abr", tempoMedioDias: 15 },
    { mes: "Mai", tempoMedioDias: 14 }
];

const dadosBarras = [
    { mes: "Jan", criticas: 5, altas: 20 },
    { mes: "Fev", criticas: 8, altas: 25 },
    { mes: "Mar", criticas: 15, altas: 30 },
    { mes: "Abr", criticas: 12, altas: 45 },
    { mes: "Mai", criticas: 10, altas: 38 }
];

const dadosArea = [
    { mes: "Jan", ativas: 95 },
    { mes: "Fev", ativas: 110 },
    { mes: "Mar", ativas: 135 },
    { mes: "Abr", ativas: 150 },
    { mes: "Mai", ativas: 142 }
];

export function DashboardCharts() {
    return (
        <section>
            <h2 className="text-xl font-semibold text-white mb-4">Visão Geral</h2>

            {/* Grid que se adapta: 1 coluna no celular, 3 em telas grandes */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                {/* CARD 1: Gráfico de Linha (Vendas) */}
                <div className="rounded-lg bg-gray-800/40 p-6 border border-white/5 flex flex-col justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-400">Tempo Médio de Correção</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <p className="text-3xl font-semibold text-white">
                                {/* Exibe o tempo médio do último mês cadastrado (ex: 14 dias em Maio) */}
                                {dadosLinha && dadosLinha[dadosLinha.length - 1]?.tempoMedioDias}
                            </p>
                            <span className="text-xs text-emerald-400 font-medium">dias úteis</span>
                        </div>
                    </div>
                    {/* Gráfico real de linha */}
                    <div className="mt-4 h-16 w-full">
                        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 100, height: 64 }}>
                            <LineChart data={dadosLinha}>
                                <XAxis dataKey="mes" hide />

                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                                    labelStyle={{ color: "#9ca3af" }}
                                />
                                <Line type="monotone" dataKey="tempoMedioDias" name="Tempo Medio" stroke="#6366f1" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CARD 2: Gráfico de Barras (Novos Clientes) */}
                <div className="rounded-lg bg-gray-800/40 p-6 border border-white/5 flex flex-col justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-400">Severidade por Mês</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <p className="text-3xl font-semibold text-white">
                                {/* Exibe o total de falhas do último mês (ex: 10 críticas + 38 altas de Maio = 48) */}
                                {dadosBarras && (dadosBarras[dadosBarras.length - 1]?.criticas + dadosBarras[dadosBarras.length - 1]?.altas)}
                            </p>
                            <span className="text-xs text-rose-400 font-medium">Críticas + Altas</span>
                        </div>
                    </div>
                    {/* Gráfico real de barras */}
                    <div className="mt-4 h-16 w-full">
                        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 100, height: 64 }}>
                            <BarChart data={dadosBarras} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="mes" hide />

                                <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }} />
                                <Bar dataKey="altas" name="Altas" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="criticas" name="Críticas" fill="#f43f5e" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CARD 3: Gráfico de Área Preenchida (Taxa de Conversão) */}
                <div className="rounded-lg bg-gray-800/40 p-6 border border-white/5 flex flex-col justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-400">Vulnerabilidades Ativas</p>
                        <p className="mt-2 text-3xl font-semibold text-white">
                            {/* Pega dinamicamente o último número de vulnerabilidades ativas */}
                            {dadosArea && dadosArea[dadosArea.length - 1]?.ativas}
                        </p>
                    </div>
                    {/* Gráfico real de área degradê */}
                    <div className="mt-4 h-16 w-full">
                        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 100, height: 64 }}>
                            <AreaChart data={dadosArea}>
                                <XAxis dataKey="mes" hide />

                                <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }} />
                                <Area type="monotone" dataKey="ativas" name="Ativas" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </section>
    );
}