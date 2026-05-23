"use client";

import { useState, Fragment } from "react";

// 1. Array de dados fictícios centralizado
const listaCves = [
    {
        id: "CVE-2026-12345",
        titulo: "Execução de Código Remoto (RCE) no Log4j",
        descricao: "Uma falha crítica de validação de entrada no componente Apache Log4j permite que um invasor remoto execute comandos arbitrários no servidor afetado enviando uma string maliciosa via cabeçalhos de requisição HTTP JNDI.",
        severidade: "Crítica",
        cvss: 9.8,
        epss: "88.4%",
        statusCisa: "Sim",
        ativoAfetado: "Servidor-Producao-01",
        statusCorrecao: "Pendente",
        dataDescoberta: "2026-05-10"
    },
    {
        id: "CVE-2026-67890",
        titulo: "Vazamento de Memória no Apache HTTP Server",
        descricao: "Uma falha de gerenciamento de memória no tratamento de requisições HTTP/2 pode permitir que um atacante cause negação de serviço (DoS) ou, sob certas condições, leia fragmentos da memória do processo do servidor.",
        severidade: "Alta",
        cvss: 7.5,
        epss: "42.1%",
        statusCisa: "Não",
        ativoAfetado: "Gateway-Pagamentos",
        statusCorrecao: "Em Execução",
        dataDescoberta: "2026-05-15"
    },
    {
        id: "CVE-2025-44332",
        titulo: "Cross-Site Scripting (XSS) no Painel Administrativo",
        descricao: "A higienização inadequada de inputs nos campos de perfil de usuário permite que operadores maliciosos injetem scripts JavaScript arbitrários que serão executados no navegador de outros administradores.",
        severidade: "Média",
        cvss: 6.1,
        epss: "12.5%",
        statusCisa: "Não",
        ativoAfetado: "Web-App-Client",
        statusCorrecao: "Corrigido",
        dataDescoberta: "2026-04-22"
    },
    {
        id: "CVE-2026-99112",
        titulo: "Negação de Serviço (DoS) via pacotes malformados",
        descricao: "O subsistema de rede do appliance de firewall falha ao processar pacotes TCP com flags customizadas. O envio sequencial destes pacotes corrompe a pilha de memória e força o reinício do dispositivo de borda.",
        severidade: "Alta",
        cvss: 8.2,
        epss: "65.0%",
        statusCisa: "Sim",
        ativoAfetado: "Firewall-Borda",
        statusCorrecao: "Pendente",
        dataDescoberta: "2026-05-19"
    },
    {
        id: "CVE-2026-00112",
        titulo: "Injeção de SQL em endpoint de autenticação",
        descricao: "O endpoint de login falha em parametrizar consultas enviadas ao banco de dados relacional. Isso permite o bypass completo do mecanismo de autenticação e a extração não autorizada de hashes de senhas da tabela de usuários.",
        severidade: "Crítica",
        cvss: 10.0,
        epss: "94.2%",
        statusCisa: "Sim",
        ativoAfetado: "API-Autenticacao",
        statusCorrecao: "Pendente",
        dataDescoberta: "2026-05-21"
    }
];

// 2. Cores das tags de severidade
const severidadeStyles = {
    "Crítica": "bg-rose-500/10 text-rose-400 ring-rose-500/20",
    "Alta": "bg-amber-600/10 text-amber-500 ring-amber-600/20",
    "Média": "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20",
    "Baixa": "bg-sky-500/10 text-sky-400 ring-sky-500/20",
};


export function DashboardList() {
    // Guardará o ID da linha que está aberta no momento (null = nenhuma aberta)
    const [expandedId, setExpandedId] = useState(null);

    // Função para abrir ou fechar a linha
    const toggleRow = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section>
            <h2 className="text-xl font-semibold text-white mb-4">Vulnerabilidades Recentes</h2>

            {/* Container da lista/tabela */}
            {/* O overflow-x-auto permite arrastar pro lado no celular se a tabela for grande */}
            <div className="overflow-x-auto rounded-lg border border-white/5 bg-gray-800/20">
                <table className="min-w-full divide-y divide-white/5 text-left text-sm text-gray-300">

                    {/* Cabeçalho da Tabela */}
                    <thead className="bg-gray-800/50 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        <tr>
                            <th className="px-6 py-4"></th>
                            <th className="px-6 py-4">CVE-ID</th>
                            <th className="px-6 py-4">Título</th>
                            <th className="px-6 py-4">Data de Descoberta</th>
                            <th className="px-6 py-4">Severidade</th>
                        </tr>
                    </thead>

                    {/* Corpo da Tabela */}
                    <tbody className="divide-y divide-white/5">
                        {listaCves.map((item) => {
                            const isExpanded = expandedId === item.id;

                            return (
                                <Fragment key={item.id}>

                                    <tr
                                        onClick={() => toggleRow(item.id)}
                                        className={`cursor-pointer transition-colors hover:bg-white/5 ${isExpanded ? "bg-white/5" : ""}`}
                                    >
                                        <td className="px-6 py-4 text-center text-gray-500">
                                            <span className={`inline-block transition-transform duration-200 ${isExpanded ? "rotate-90 text-indigo-400" : ""}`}>
                                                ▶
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-white">
                                            {item.id}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-white">
                                            {item.titulo}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4 text-gray-400">
                                            {item.dataDescoberta}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${severidadeStyles[item.severidade]}`}>
                                                {item.severidade}
                                            </span>
                                        </td>
                                    </tr>

                                    {/* LINHA DE DETALHES EXPANDIDOS (Só aparece se isExpanded for true) */}
                                    {isExpanded && (
                                        <tr className="bg-gray-900/30">
                                            <td colSpan="6" className="px-12 py-6 border-t border-white/5 animate-fade-in">

                                                {/* Container interno organizando as novas informações */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                                    {/* Bloco 1: Descrição Longa (Ocupa 2 colunas no grid interno) */}
                                                    <div className="md:col-span-2 space-y-2">
                                                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Descrição Completa</h4>
                                                        <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">{item.descricao}</p>
                                                    </div>

                                                    {/* Bloco 2: Cabeçalhos adicionais */}
                                                    <div className="space-y-2 border-l border-white/5 pl-6">
                                                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Dados de Ativos Afetados</h4>
                                                        <p className="text-sm text-white font-medium">{item.ativoAfetado}</p>
                                                        <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Status de Correção</h5>
                                                        <p className="text-xs text-gray-400">{item.statusCorrecao}</p>
                                                    </div>

                                                    {/* Bloco 3: Mais especificações técnicas */}
                                                    <div className="md:col-span-2 flex flex-wrap gap-x-12 gap-y-4 pt-4 border-t border-white/5">
                                                        <div>
                                                            <span className="block text-xs font-semibold text-gray-400 uppercase">CVSS:</span>
                                                            <span className="text-sm text-white">{item.cvss}</span>
                                                        </div>
                                                        <div>
                                                            <span className="block text-xs font-semibold text-gray-400 uppercase">EPSS:</span>
                                                            <span className="text-sm text-gray-300">{item.epss}</span>
                                                        </div>
                                                        <div>
                                                            <span className="block text-xs font-semibold text-gray-400 uppercase">Status Cisa:</span>
                                                            <span className="text-sm text-gray-400">{item.statusCisa}</span>
                                                        </div>
                                                    </div>

                                                </div>

                                            </td>
                                        </tr>
                                    )}

                                </Fragment>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </section>
    );
}