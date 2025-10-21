import { getUserData, saveDashboardState } from "./services/api";
import { useEffect, useId, useMemo, useState } from "react";
import logo from "./assets/logo.png";
import Login from "./Login";

type IconProps = { className?: string };

const HomeIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <path d='M3 9.5 12 3l9 6.5' />
    <path d='M5 10v10h6v-6h2v6h6V10' />
  </svg>
);

const SettingsIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <circle cx='12' cy='12' r='3' />
    <path d='M19.4 12a7.38 7.38 0 0 0-.14-1.5l2.1-1.64-2-3.46-2.5 1a7.29 7.29 0 0 0-2.6-1.5L14 2h-4l-.26 2.9a7.29 7.29 0 0 0-2.6 1.5l-2.5-1-2 3.46 2.1 1.64A7.38 7.38 0 0 0 4.6 12a7.38 7.38 0 0 0 .14 1.5l-2.1 1.64 2 3.46 2.5-1a7.29 7.29 0 0 0 2.6 1.5L10 22h4l.26-2.9a7.29 7.29 0 0 0 2.6-1.5l2.5 1 2-3.46-2.1-1.64a7.38 7.38 0 0 0 .14-1.5z' />
  </svg>
);

const ChatIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' />
  </svg>
);

const PowerIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <path d='M12 2v10' />
    <path d='M7 4.9a8 8 0 1 0 10 0' />
  </svg>
);

const EntryIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <path d='M4 19h16v-4' />
    <path d='M12 5v10' />
    <path d='m8 11 4 4 4-4' />
  </svg>
);

const ExitIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <path d='M4 5h16v4' />
    <path d='M12 19V9' />
    <path d='m16 13-4-4-4 4' />
  </svg>
);

const PayableIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <rect x='4' y='4' width='16' height='16' rx='2' />
    <path d='M8 9h8' />
    <path d='M8 13h5' />
    <circle cx='15.5' cy='13' r='1.5' />
  </svg>
);

const WeightIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <path d='M6 4h12l2 4H4z' />
    <path d='M5 8h14l-1.5 10.5a2 2 0 0 1-2 1.5H8.5a2 2 0 0 1-2-1.5z' />
    <path d='M10 12a2 2 0 1 0 4 0' />
  </svg>
);

const WaterIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <path d='M12 3s5 6 5 9a5 5 0 1 1-10 0c0-3 5-9 5-9z' />
  </svg>
);

const CycleIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <path d='M3 10a9 9 0 0 1 15.5-6.5L21 6' />
    <path d='M21 6V3h-3' />
    <path d='M21 14a9 9 0 0 1-15.5 6.5L3 18' />
    <path d='M3 18v3h3' />
  </svg>
);

const FireIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <path d='M12 2s2 3 2 5a2 2 0 1 1-4 0c0-2 2-5 2-5z' />
    <path d='M12 10a6 6 0 0 0-6 6 6 6 0 0 0 12 0c0-2.22-1.06-3.73-2.38-4.86' />
  </svg>
);

type IconComponent = (props: IconProps) => JSX.Element;
type NavItem = { id: string; label: string; icon: IconComponent };

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: HomeIcon },
  { id: "entrada", label: "Entrada", icon: EntryIcon },
  { id: "saida", label: "Saída", icon: ExitIcon },
  { id: "contas", label: "Contas a pagar", icon: PayableIcon },
  { id: "peso", label: "Peso", icon: WeightIcon },
  { id: "agua", label: "Água", icon: WaterIcon },
  { id: "ciclo", label: "Ciclo", icon: CycleIcon },
  { id: "calorias", label: "Calorias", icon: FireIcon },
  { id: "configuracoes", label: "Configurações", icon: SettingsIcon }
];

const statsCards = [
  { title: "Lorem ipsum", value: "$65,502", helper: "Lorem ipsum dolor sit amet" },
  { title: "Lorem ipsum", value: "$80,502", helper: "Lorem ipsum dolor sit amet" },
  { title: "Lorem ipsum", value: "$250,502", helper: "Lorem ipsum dolor sit amet" }
];

const areaLabels = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];

type ColorVariable = "--dashboard-accent" | "--dashboard-accent-soft";

type AreaSeries = {
  id: string;
  values: number[];
  colorVar: ColorVariable;
  stopOpacity: [number, number];
  strokeOpacity: number;
};

const dashboardAreaSeries: AreaSeries[] = [
  { id: "layer-base", values: [18, 28, 32, 36, 42, 58, 52, 40, 32, 22], colorVar: "--dashboard-accent-soft", stopOpacity: [0.45, 0.05], strokeOpacity: 0.25 },
  { id: "layer-mid", values: [12, 22, 28, 34, 48, 60, 54, 46, 34, 20], colorVar: "--dashboard-accent", stopOpacity: [0.5, 0.08], strokeOpacity: 0.35 },
  { id: "layer-top", values: [8, 18, 22, 30, 38, 52, 48, 38, 28, 16], colorVar: "--dashboard-accent", stopOpacity: [0.65, 0.12], strokeOpacity: 0.45 }
];

const financeAreaSeries: AreaSeries[] = [
  { id: "fin-base", values: [16, 24, 30, 36, 44, 56, 50, 42, 30, 24], colorVar: "--dashboard-accent-soft", stopOpacity: [0.45, 0.06], strokeOpacity: 0.25 },
  { id: "fin-mid", values: [10, 20, 28, 40, 48, 58, 52, 40, 28, 18], colorVar: "--dashboard-accent", stopOpacity: [0.55, 0.08], strokeOpacity: 0.35 },
  { id: "fin-top", values: [6, 16, 22, 32, 40, 48, 44, 34, 24, 14], colorVar: "--dashboard-accent", stopOpacity: [0.65, 0.15], strokeOpacity: 0.45 }
];

const waterHistoryLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const waterHistorySeries: AreaSeries[] = [
  { id: "water-morning", values: [18, 24, 26, 28, 30, 32, 28], colorVar: "--dashboard-accent-soft", stopOpacity: [0.35, 0.08], strokeOpacity: 0.28 },
  { id: "water-evening", values: [10, 16, 18, 22, 24, 30, 26], colorVar: "--dashboard-accent", stopOpacity: [0.45, 0.12], strokeOpacity: 0.38 }
];

const litersFormatter = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatLiters = (ml: number) => `${litersFormatter.format(ml / 1000)} L`;

type CalorieEntry = { id: string; description: string; amount: number; timestamp: string };

const isBrowser = typeof window !== "undefined";

type FinanceRecord = {
  id: string;
  amount: number;
  date: string;
  description: string;
};

type FinanceRecordMap = Record<string, FinanceRecord[]>;

type FinanceRecordInput = {
  amount: number;
  date: string;
  description: string;
};

type DashboardStateRow = {
  user_id: string;
  water_consumed: number;
  calorie_entries: CalorieEntry[];
  finance_records: FinanceRecordMap;
  selected_theme: string;
  selected_font: string;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const defaultDashboardState: Omit<DashboardStateRow, "user_id"> = {
  water_consumed: 0,
  calorie_entries: [],
  finance_records: {},
  selected_theme: "Neon Deep",
  selected_font: "Inter"
};

const buildAreaPath = (values: number[]) => {
  if (values.length === 0) return "";
  const segments = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100;
    const y = 100 - value;
    return `${x},${y}`;
  });
  return `M0,100 L${segments.join(" L ")} L100,100 Z`;
};

const formatCurrency = (amount: number) => currencyFormatter.format(amount);

const triggerCsvDownload = (filename: string, rows: string[][]) => {
  if (!isBrowser) return;
  const csv = rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(";")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

export default function App() {
  // Carregar dados do usuário ao logar
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const data = await getUserData(token);
        setWaterConsumed(data.water_consumed ?? defaultDashboardState.water_consumed);
        setCalorieEntries(Array.isArray(data.calorie_entries) ? data.calorie_entries : []);
        setFinanceRecords(data.finance_records ?? {});
        setSelectedTheme(data.selected_theme ?? defaultDashboardState.selected_theme);
        setSelectedFont(data.selected_font ?? defaultDashboardState.selected_font);
      } catch (err) {
        // Se erro, pode ser token expirado ou usuário não encontrado
        setToken(null);
      }
    })();
  }, [token]);
  // Salvar dados do painel sempre que houver alteração
  useEffect(() => {
    if (!token) return;
    const state = {
      water_consumed: waterConsumed,
      calorie_entries: calorieEntries,
      finance_records: financeRecords,
      selected_theme: selectedTheme,
      selected_font: selectedFont
    };
    saveDashboardState(token, state).catch(() => {});
  }, [token, waterConsumed, calorieEntries, financeRecords, selectedTheme, selectedFont]);
  const [token, setToken] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState(navItems[0].id);
  const [waterGoal] = useState(3000);
  const [waterConsumed, setWaterConsumed] = useState(defaultDashboardState.water_consumed);
  const [calorieGoal] = useState(2200);
  const [calorieEntries, setCalorieEntries] = useState<CalorieEntry[]>(defaultDashboardState.calorie_entries);
  const [showCalorieModal, setShowCalorieModal] = useState(false);
  const [financeRecords, setFinanceRecords] = useState<FinanceRecordMap>(defaultDashboardState.finance_records);
  const [selectedTheme, setSelectedTheme] = useState(defaultDashboardState.selected_theme);
  const [selectedFont, setSelectedFont] = useState(defaultDashboardState.selected_font);

  const calorieConsumed = useMemo(
    () => calorieEntries.reduce((total, entry) => total + entry.amount, 0),
    [calorieEntries]
  );
  const remainingCalories = Math.max(calorieGoal - calorieConsumed, 0);

  // userId pode ser extraído do token JWT se necessário


  useEffect(() => {
    applyThemeVariables(selectedTheme);
    applyFontPreference(selectedFont);
  }, [selectedTheme, selectedFont]);

  const handleNavigate = (id: string) => setActiveTab(id);

  // Funções de autenticação agora são feitas via Login.tsx e backend

  const handleResetFinance = useCallback(() => {
    setFinanceRecords({});
  }, []);

  const handleResetLayout = useCallback(() => {
    setSelectedTheme(defaultDashboardState.selected_theme);
    setSelectedFont(defaultDashboardState.selected_font);
  }, []);

  const handleResetAll = useCallback(() => {
    setWaterConsumed(defaultDashboardState.water_consumed);
    setCalorieEntries(defaultDashboardState.calorie_entries);
    setFinanceRecords(defaultDashboardState.finance_records);
    setSelectedTheme(defaultDashboardState.selected_theme);
    setSelectedFont(defaultDashboardState.selected_font);
  }, []);

  const currentItem = navItems.find(item => item.id === activeTab) ?? navItems[0];

  const handleAddCalories = (description: string, amount: number) => {
    const timestamp = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date());
    const entry: CalorieEntry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      description,
      amount,
      timestamp
    };
    setCalorieEntries(prev => [entry, ...prev]);
  };
  const handleResetCalories = () => {
    setCalorieEntries([]);
  };
  const handleCreateFinanceRecord = useCallback((sectionId: string, input: FinanceRecordInput) => {
    setFinanceRecords(prev => {
      const sectionRecords = prev[sectionId] ?? [];
      const newRecord: FinanceRecord = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        amount: input.amount,
        date: input.date,
        description: input.description
      };
      return {
        ...prev,
        [sectionId]: [newRecord, ...sectionRecords]
      };
    });
  }, []);

  const handleUpdateFinanceRecord = useCallback((sectionId: string, recordId: string, input: FinanceRecordInput) => {
    setFinanceRecords(prev => {
      const sectionRecords = prev[sectionId] ?? [];
      const index = sectionRecords.findIndex(record => record.id === recordId);
      if (index === -1) return prev;
      const updatedSection = [...sectionRecords];
      updatedSection[index] = { ...updatedSection[index], ...input };
      return {
        ...prev,
        [sectionId]: updatedSection
      };
    });
  }, []);

  const handleDeleteFinanceRecord = useCallback((sectionId: string, recordId: string) => {
    setFinanceRecords(prev => {
      const sectionRecords = prev[sectionId] ?? [];
      const filtered = sectionRecords.filter(record => record.id !== recordId);
      return {
        ...prev,
        [sectionId]: filtered
      };
    });
  }, []);

  const handleExportFinanceRecords = useCallback(
    (sectionId: string, filename: string) => {
      const sectionRecords = financeRecords[sectionId] ?? [];
      const rows: string[][] = [
        ["ID", "Valor", "Data", "Descri��o"],
        ...sectionRecords.map(record => [
          record.id,
          formatCurrency(record.amount),
          record.date ? new Date(record.date).toLocaleDateString("pt-BR") : "",
          record.description
        ])
      ];
      triggerCsvDownload(filename, rows);
    },
    [financeRecords]
  );

  const handleExportOverview = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    const rows: string[][] = [["Se��o", "Valor", "Data/Hor�rio", "Descri��o"]];

    Object.entries(financeRecords).forEach(([sectionId, sectionRecords]) => {
      const sectionLabel = navItems.find(item => item.id === sectionId)?.label ?? sectionId;
      if (sectionRecords.length === 0) {
        rows.push([sectionLabel, "-", "-", "Nenhum registro cadastrado"]);
      } else {
        sectionRecords.forEach(record => {
          rows.push([
            sectionLabel,
            formatCurrency(record.amount),
            record.date ? new Date(record.date).toLocaleDateString("pt-BR") : "",
            record.description || ""
          ]);
        });
      }
    });

    rows.push([
      "�gua",
      `${formatLiters(waterConsumed)} de ${formatLiters(waterGoal)}`,
      "",
      "Consumo acumulado x meta di�ria"
    ]);
    rows.push([
      "Calorias",
      `${calorieConsumed.toLocaleString("pt-BR")} / ${calorieGoal.toLocaleString("pt-BR")} kcal`,
      "",
      "Consumo acumulado x meta di�ria"
    ]);
    calorieEntries.forEach(entry => {
      rows.push([
        "Calorias (registro)",
        `${entry.amount.toLocaleString("pt-BR")} kcal`,
        entry.timestamp,
        entry.description
      ]);
    });

    triggerCsvDownload(`dashboard-resumo-${today}.csv`, rows);
  }, [financeRecords, waterConsumed, waterGoal, calorieConsumed, calorieGoal, calorieEntries]);

  const handleExportWaterSummary = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    const percent = waterGoal > 0 ? Math.min(100, (waterConsumed / waterGoal) * 100) : 0;
    const rows: string[][] = [
      ["Resumo", "Valor"],
      ["Meta di�ria", formatLiters(waterGoal)],
      ["Consumido", formatLiters(waterConsumed)],
      ["Percentual", `${percent.toFixed(1)}%`],
      [],
      ["Per�odo", ...waterHistoryLabels]
    ];

    waterHistorySeries.forEach(series => {
      const label =
        series.id === "water-morning"
          ? "Manh�"
          : series.id === "water-evening"
            ? "Noite"
            : series.id;
      rows.push([label, ...series.values.map(value => value.toString())]);
    });

    triggerCsvDownload(`agua-relatorio-${today}.csv`, rows);
  }, [waterConsumed, waterGoal]);

  const overviewCards = useMemo(
    () => [
      {
        id: "peso",
        title: "Peso atual",
        value: "0 kg",
        helper: "Cadastre seu peso para acompanhar a evolucao.",
        primaryAction: "Ver peso",
        icon: WeightIcon
      },
      {
        id: "ciclo",
        title: "Ciclo em andamento",
        value: "0 de 0 dias",
        helper: "Informe seu ciclo para acompanhar o progresso.",
        primaryAction: "Ver ciclo",
        icon: CycleIcon
      },
      {
        id: "calorias",
        title: "Calorias diárias",
        value: `${calorieConsumed.toLocaleString("pt-BR")} / ${calorieGoal.toLocaleString("pt-BR")} kcal`,
        helper: `${remainingCalories.toLocaleString("pt-BR")} kcal restantes para atingir a meta`,
        primaryAction: "Ver calorias",
        secondaryAction: "Registrar consumo",
        icon: FireIcon
      },
    ],
    [calorieConsumed, calorieGoal, remainingCalories]
  );

  if (!token) {
    // Exibe tela de login/cadastro do backend
    // @ts-ignore
    return <Login onLogin={setToken} />;
  }

  if (!isSyncReady) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-dashboard-background text-dashboard-text'>
        <span className='animate-pulse text-sm uppercase tracking-[0.4rem] text-dashboard-muted'>Carregando dados seguros...</span>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen bg-dashboard-background text-dashboard-text'>
      <aside className='flex w-24 flex-col items-center border-r border-dashboard-border bg-dashboard-sidebar/90 px-5 py-8'>
        <img
          className='h-16 w-16 object-contain drop-shadow-[0_0_18px_rgba(0,255,204,0.35)]'
          src={logo}
          alt='Painel Financeiro Logo'
        />
        <nav className='mt-10 flex flex-1 flex-col items-center gap-6'>
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={[
                  "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                  isActive
                    ? "bg-dashboard-accent/10 text-dashboard-accent shadow-lg shadow-dashboard-accent/20"
                    : "text-dashboard-muted hover:text-dashboard-accent"
                ].join(" ")}
                aria-label={item.label}
              >
                <item.icon className='h-5 w-5' />
              </button>
            );
          })}
        </nav>
        <button className='flex h-12 w-12 items-center justify-center rounded-xl border border-dashboard-border text-dashboard-muted transition hover:text-dashboard-accent' title='Sair'>
          <PowerIcon className='h-5 w-5' />
        </button>
      </aside>

      <div className='flex flex-1 flex-col'>
        <header className='flex items-center justify-between border-b border-dashboard-border bg-dashboard-header/80 px-10 py-6 backdrop-blur'>
          <div className='space-y-1 text-sm text-dashboard-muted'>
            <p className='uppercase tracking-[0.25rem] text-dashboard-accent/80'>Painel &gt; financeiro</p>
            <p className='text-lg font-medium text-dashboard-text'>Dr. David Breno</p>
          </div>
          <div className='flex items-center gap-6'>
            <div className='relative'>
              <input
                className='h-11 w-72 rounded-full border border-dashboard-border/70 bg-dashboard-background/60 px-5 pr-12 text-sm text-dashboard-text placeholder:text-dashboard-muted focus:border-dashboard-accent focus:outline-none focus:ring-1 focus:ring-dashboard-accent'
                placeholder='Search'
                type='search'
              />
              <svg
                className='absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dashboard-muted'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <circle cx='11' cy='11' r='7' />
                <path d='m20 20-2.5-2.5' />
              </svg>
            </div>
            <button className='flex h-11 w-11 items-center justify-center rounded-full border border-dashboard-border/60 bg-dashboard-background/40 text-dashboard-muted transition hover:text-dashboard-accent' title='Configurações'>
              <SettingsIcon className='h-5 w-5' />
            </button>
          </div>
        </header>

        <main className='flex-1 overflow-y-auto px-10 py-8'>
          {activeTab === "dashboard" ? (
            <div className='grid gap-8 lg:grid-cols-[360px,1fr]'>
            <section className='flex lg:h-full'>
              <WaterSummaryCard
                consumed={waterConsumed}
                goal={waterGoal}
                onAdd={value => setWaterConsumed(prev => Math.max(prev + value, 0))}
                onReset={() => setWaterConsumed(0)}
                fullHeight
              />
            </section>

            <section className='space-y-8'>
              <div className='grid gap-6 md:grid-cols-3'>
                {overviewCards.map(card => (
                  <div
                    key={card.id}
                    className='rounded-3xl border border-dashboard-border/60 bg-dashboard-surface/80 px-6 py-6 text-center shadow-card card-reflection'
                  >
                    <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-dashboard-accent/40 bg-dashboard-background/60 text-dashboard-accent'>
                      <card.icon className='h-7 w-7' />
                    </div>
                    <p className='text-sm uppercase tracking-[0.25rem] text-dashboard-muted'>{card.title}</p>
                    <p className='mt-3 text-2xl font-semibold text-dashboard-accent'>{card.value}</p>
                    <p className='mt-3 text-xs leading-relaxed text-dashboard-muted'>{card.helper}</p>
                    <div className='mt-6 flex flex-wrap justify-center gap-3'>
                      <button
                        onClick={() => handleNavigate(card.id)}
                        className='rounded-full border border-dashboard-border/70 px-4 py-2 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
                      >
                        {card.primaryAction}
                      </button>
                      {card.secondaryAction ? (
                        <button
                          onClick={() => {
                            handleNavigate("calorias");
                            setShowCalorieModal(true);
                          }}
                          className='rounded-full border border-dashboard-border/70 px-4 py-2 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
                        >
                          {card.secondaryAction}
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <WeeklyProgress />
            </section>

            <div className='lg:col-span-2 rounded-3xl border border-dashboard-border/60 bg-gradient-to-b from-dashboard-background/80 to-dashboard-surface/60 px-10 py-10 shadow-card card-reflection'>
              <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
                <div>
                  <h2 className='text-lg font-semibold text-dashboard-text'>Evolução mensal</h2>
                  <p className='text-sm text-dashboard-muted'>Comparativo dos últimos períodos</p>
                </div>
                <button className='rounded-full border border-dashboard-border/60 px-4 py-1.5 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'>
                  Exportar
                </button>
              </div>
              <StackedAreaChart labels={areaLabels} series={dashboardAreaSeries} />
              <div className='mt-6 flex flex-wrap items-center gap-3 text-xs text-dashboard-muted'>
                <span className='rounded-full border border-dashboard-border/70 bg-dashboard-background/60 px-4 py-1.5'>
                  Última atualização há 5 min
                </span>
                <span>Exportação automática ativa</span>
              </div>
            </div>
          </div>
          ) : activeTab === "configuracoes" ? (
            <SettingsPanel />
          ) : activeTab === "agua" ? (
            <WaterPanel consumed={waterConsumed} goal={waterGoal} onAdd={value => setWaterConsumed(prev => Math.max(prev + value, 0))} onReset={() => setWaterConsumed(0)} />
          ) : (
            <FinancePanel
              title={currentItem.label}
              sectionId={currentItem.id}
              records={financeRecords[currentItem.id] ?? []}
              onCreateRecord={handleCreateFinanceRecord}
              onUpdateRecord={handleUpdateFinanceRecord}
              onDeleteRecord={handleDeleteFinanceRecord}
              onExportRecords={handleExportFinanceRecords}
            />
          )}
        </main>
      </div>
    </div>
  );
}

const CalendarIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
    <rect x='3' y='5' width='18' height='16' rx='2' />
    <path d='M16 3v4' />
    <path d='M8 3v4' />
    <path d='M3 11h18' />
  </svg>
);

type FinancePanelProps = {
  title: string;
  sectionId: string;
  records: FinanceRecord[];
  onCreateRecord: (sectionId: string, input: FinanceRecordInput) => void;
  onUpdateRecord: (sectionId: string, recordId: string, input: FinanceRecordInput) => void;
  onDeleteRecord: (sectionId: string, recordId: string) => void;
  onExportRecords: (sectionId: string, filename: string) => void;
};

const FinancePanel = ({ title, sectionId, records, onCreateRecord, onUpdateRecord, onDeleteRecord, onExportRecords }: FinancePanelProps) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount === 0) {
      if (isBrowser) window.alert("Informe um valor numérico diferente de zero.");
      return;
    }
    if (!date) {
      if (isBrowser) window.alert("Selecione uma data para o registro.");
      return;
    }
    const payload: FinanceRecordInput = {
      amount: parsedAmount,
      date,
      description: description.trim()
    };
    if (editingId) {
      onUpdateRecord(sectionId, editingId, payload);
    } else {
      onCreateRecord(sectionId, payload);
    }
    setAmount("");
    setDate("");
    setDescription("");
    setEditingId(null);
  };

  const handleEdit = (record: FinanceRecord) => {
    setAmount(String(record.amount));
    setDate(record.date);
    setDescription(record.description);
    setEditingId(record.id);
  };

  const handleCancel = () => {
    setAmount("");
    setDate("");
    setDescription("");
    setEditingId(null);
  };

  const exportFilename = `registros-${sectionId}-${new Date().toISOString().slice(0, 10)}.csv`;

  return (
    <section className='space-y-10'>
      <header className='flex flex-col gap-2'>
        <span className='text-sm uppercase tracking-[0.3rem] text-dashboard-accent/80'>Painel financeiro</span>
        <h1 className='text-2xl font-semibold text-dashboard-text'>{title}</h1>
        <p className='text-sm text-dashboard-muted'>
          Resumo visual, cadastro e gerenciamento de registros relacionados a {title.toLowerCase()}.
        </p>
      </header>

      <div className='grid gap-8 lg:grid-cols-2'>
        <div className='rounded-3xl border border-dashboard-border/60 bg-dashboard-surface/70 p-8 shadow-card card-reflection'>
          <div className='mb-5 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-semibold text-dashboard-text'>Evolução mensal</h2>
              <p className='text-sm text-dashboard-muted'>Comparativo dos últimos períodos</p>
            </div>
            <button
              type='button'
              onClick={() => onExportRecords(sectionId, exportFilename)}
              className='rounded-full border border-dashboard-border/60 px-4 py-1.5 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
            >
              Exportar
            </button>
          </div>

          <div className='overflow-hidden rounded-2xl border border-dashboard-border/60 bg-gradient-to-b from-dashboard-background/80 to-dashboard-surface/60 p-6'>
            <StackedAreaChart labels={areaLabels} series={financeAreaSeries} />
          </div>
          <div className='mt-4 flex flex-wrap items-center gap-3 text-xs text-dashboard-muted'>
            <span className='rounded-full border border-dashboard-border/70 bg-dashboard-background/60 px-4 py-1.5'>
              Última atualização há 5 min
            </span>
            <span>Exportação automática ativa</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6 rounded-3xl border border-dashboard-border/60 bg-dashboard-surface/70 p-8 shadow-card card-reflection'>
          <div>
            <h2 className='text-lg font-semibold text-dashboard-text'>{editingId ? "Editar registro" : "Novo registro"}</h2>
            <p className='text-sm text-dashboard-muted'>
              {editingId ? "Atualize os dados e confirme para salvar as alterações." : "Preencha os campos abaixo para registrar ou atualizar valores."}
            </p>
          </div>

          <label className='space-y-2 text-sm'>
            <span className='text-dashboard-muted'>Valor</span>
            <input
              value={amount}
              onChange={event => setAmount(event.target.value)}
              className='h-12 rounded-2xl border border-dashboard-border/70 bg-dashboard-background/60 px-4 text-dashboard-text placeholder:text-dashboard-muted focus:border-dashboard-accent focus:outline-none focus:ring-1 focus:ring-dashboard-accent'
              placeholder='R$ 0,00'
              type='number'
              step='0.01'
            />
          </label>

          <label className='space-y-2 text-sm'>
            <span className='text-dashboard-muted'>Data</span>
            <input
              value={date}
              onChange={event => setDate(event.target.value)}
              className='h-12 rounded-2xl border border-dashboard-border/70 bg-dashboard-background/60 px-4 text-dashboard-text placeholder:text-dashboard-muted focus:border-dashboard-accent focus:outline-none focus:ring-1 focus:ring-dashboard-accent'
              type='date'
            />
          </label>

          <label className='space-y-2 text-sm'>
            <span className='text-dashboard-muted'>Descrição</span>
            <textarea
              value={description}
              onChange={event => setDescription(event.target.value)}
              className='min-h-[120px] rounded-2xl border border-dashboard-border/70 bg-dashboard-background/60 px-4 py-3 text-dashboard-text placeholder:text-dashboard-muted focus:border-dashboard-accent focus:outline-none focus:ring-1 focus:ring-dashboard-accent'
              placeholder='Detalhes adicionais sobre este registro'
            />
          </label>

          <div className='mt-2 flex flex-wrap gap-4'>
            <button type='submit' className='rounded-full border border-dashboard-border/70 px-6 py-2 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'>
              {editingId ? "Atualizar registro" : "Salvar registro"}
            </button>
            <button
              type='button'
              onClick={handleCancel}
              className='rounded-full border border-dashboard-border/70 px-6 py-2 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
            >
              {editingId ? "Cancelar edição" : "Limpar campos"}
            </button>
            <button
              type='button'
              onClick={() => onExportRecords(sectionId, exportFilename)}
              className='rounded-full border border-dashboard-border/70 px-6 py-2 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
            >
              Exportar registros
            </button>
          </div>
        </form>

        <div className='rounded-3xl border border-dashboard-border/60 bg-dashboard-surface/70 p-8 shadow-card card-reflection'>
          <div className='mb-5 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-semibold text-dashboard-text'>Registros salvos</h2>
              <p className='text-sm text-dashboard-muted'>
                Clique em editar para carregar os dados novamente no formulário ou em apagar para remover.
              </p>
            </div>
            <button
              type='button'
              onClick={() => onExportRecords(sectionId, exportFilename)}
              className='rounded-full border border-dashboard-border/60 px-4 py-1.5 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
            >
              Exportar lista
            </button>
          </div>

          {records.length === 0 ? (
            <p className='text-sm text-dashboard-muted'>Nenhum registro cadastrado para esta categoria.</p>
          ) : (
            <div className='space-y-3'>
              {records.map(record => (
                <div
                  key={record.id}
                  className='flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashboard-border/70 bg-dashboard-background/60 px-4 py-3 text-sm text-dashboard-muted'
                >
                  <div className='flex flex-col'>
                    <span className='text-dashboard-text'>{formatCurrency(record.amount)}</span>
                    <span>{record.date ? new Date(record.date).toLocaleDateString("pt-BR") : "-"}</span>
                    <span className='text-xs'>{record.description || "Sem descrição"}</span>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    <button
                      type='button'
                      onClick={() => handleEdit(record)}
                      className='rounded-full border border-dashboard-border/70 px-4 py-1.5 text-xs transition hover:border-dashboard-accent hover:text-dashboard-accent'
                    >
                      Editar
                    </button>
                    <button
                      type='button'
                      onClick={() => onDeleteRecord(sectionId, record.id)}
                      className='rounded-full border border-dashboard-border/70 px-4 py-1.5 text-xs transition hover:border-dashboard-accent hover:text-dashboard-accent'
                    >
                      Apagar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
type WaterSummaryCardProps = {
  consumed: number;
  goal: number;
  onAdd: (value: number) => void;
  onReset: () => void;
  variant?: "dashboard" | "panel";
  fullHeight?: boolean;
};

const WaterSummaryCard = ({ consumed, goal, onAdd, onReset, variant = "dashboard", fullHeight = false }: WaterSummaryCardProps) => {
  const percentRaw = goal > 0 ? (consumed / goal) * 100 : 0;
  const percentClamped = Math.min(100, Math.round(percentRaw));
  const progressDeg = Math.min(percentRaw, 100) * 3.6;
  const remaining = Math.max(goal - consumed, 0);
  const overGoal = consumed > goal;
  const quickAddOptions = variant === "panel" ? [250, 500, 750, 1000] : [250, 500];

  return (
    <div
      className={[
        "rounded-3xl border border-dashboard-border/70 bg-dashboard-surface/70 shadow-card card-reflection",
        variant === "panel" ? "px-10 py-12" : "px-8 py-10",
        fullHeight ? "flex w-full flex-col" : ""
      ].join(" ")}
    >
      <div className={["flex flex-col items-center gap-6 text-center", fullHeight ? "flex-1 justify-between" : ""].join(" ")}>
        <div className='relative h-56 w-56'>
          <div className='absolute inset-0 rounded-full bg-dashboard-accent/5 blur-lg' />
          <div
            className='absolute inset-0 rounded-full transition-all duration-500'
            style={{
              background: `conic-gradient(rgb(var(--dashboard-accent)) 0deg ${progressDeg}deg, rgba(2, 15, 25, 0.65) ${progressDeg}deg 360deg)`
            }}
          />
          <div className='absolute inset-2 rounded-full border border-dashboard-border/70 bg-dashboard-background/80 backdrop-blur'>
            <div className='flex h-full flex-col items-center justify-center gap-2'>
              <span className='text-sm uppercase tracking-[0.3rem] text-dashboard-muted'>Água diária</span>
              <span className='text-4xl font-semibold text-dashboard-accent'>{percentClamped}%</span>
              <span className='text-xs text-dashboard-muted'>
                {formatLiters(consumed)} / {formatLiters(goal)}
              </span>
              {overGoal && <span className='text-xs text-dashboard-accent/80'>Meta atingida e superada!</span>}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2 text-xs text-dashboard-muted'>
          <span>Faltam {formatLiters(remaining)} para a meta.</span>
          <span>Pequenos goles constantes mantêm o corpo hidratado.</span>
        </div>
        <div className='flex flex-wrap justify-center gap-3'>
          {quickAddOptions.map(amount => (
            <button
              key={amount}
              onClick={() => onAdd(amount)}
              className='rounded-full border border-dashboard-border/60 px-5 py-2 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
            >
              +{amount >= 1000 ? `${amount / 1000}L` : `${amount}ml`}
            </button>
          ))}
        </div>
        <button
          onClick={onReset}
          className='rounded-full border border-dashboard-border/70 px-6 py-2 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
        >
          Resetar dia
        </button>
      </div>
    </div>
  );
};

const WeeklyProgress = () => {
  const todayIndex = new Date().getDay(); // 0 domingo, 6 sábado
  const weekDays = [
    { label: "DOM", index: 0 },
    { label: "SEG", index: 1 },
    { label: "TER", index: 2 },
    { label: "QUA", index: 3 },
    { label: "QUI", index: 4 },
    { label: "SEX", index: 5 },
    { label: "SÁB", index: 6 }
  ];

  return (
    <div className='lg:col-span-2 rounded-3xl border border-dashboard-border/60 bg-dashboard-surface/70 px-10 py-6 shadow-card card-reflection'>
      <div className='mb-4 flex items-center justify-between text-sm text-dashboard-muted'>
        <span className='uppercase tracking-[0.3rem] text-dashboard-accent/80'>Rotina semanal</span>
        <span>
          Hoje:{" "}
          <span className='text-dashboard-accent'>
            {weekDays.find(day => day.index === todayIndex)?.label ?? "—"}
          </span>
        </span>
      </div>
      <div className='grid grid-cols-7 gap-3'>
        {weekDays.map(day => {
          const isActive = day.index === todayIndex;
          return (
            <div
              key={day.label}
              className={[
                "flex flex-col items-center rounded-2xl border px-3 py-4 transition",
                isActive
                  ? "border-dashboard-accent/70 bg-dashboard-accent/10 text-dashboard-accent shadow-lg shadow-dashboard-accent/20"
                  : "border-dashboard-border/60 bg-dashboard-background/60 text-dashboard-muted"
              ].join(" ")}
            >
              <span className='text-[11px] font-medium tracking-[0.3rem]'>{day.label}</span>
              <span className='mt-3 h-2 w-full rounded-full bg-dashboard-border/60'>
                <span
                  className={[
                    "block h-full rounded-full transition-all",
                    isActive ? "bg-dashboard-accent" : "bg-dashboard-accent/20"
                  ].join(" ")}
                />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type StackedAreaChartProps = { series: AreaSeries[]; labels: string[] };

const StackedAreaChart = ({ series, labels }: StackedAreaChartProps) => {
  const chartId = useId();

  const horizontalLines = useMemo(() => [20, 40, 60, 80], []);

  return (
    <div className='relative h-56 w-full text-dashboard-muted'>
      <svg className='h-full w-full' viewBox='0 0 100 100' preserveAspectRatio='none'>
        <defs>
          {series.map(layer => (
            <linearGradient key={layer.id} id={`${chartId}-${layer.id}`} x1='0%' y1='0%' x2='0%' y2='100%'>
              <stop offset='0%' stopColor={`rgb(var(${layer.colorVar}))`} stopOpacity={layer.stopOpacity[0]} />
              <stop offset='100%' stopColor={`rgb(var(${layer.colorVar}))`} stopOpacity={layer.stopOpacity[1]} />
            </linearGradient>
          ))}
        </defs>

        {labels.map((label, index) => {
          const x = (index / (labels.length - 1)) * 100;
          return (
            <line key={label} x1={x} y1={5} x2={x} y2={100} stroke='rgba(255,255,255,0.04)' strokeWidth='0.3' />
          );
        })}

        {horizontalLines.map((value) => (
          <line key={value} x1={0} y1={value} x2={100} y2={value} stroke='rgba(255,255,255,0.04)' strokeWidth='0.3' />
        ))}

        {series.map(layer => (
          <path
            key={layer.id}
            d={buildAreaPath(layer.values)}
            fill={`url(#${chartId}-${layer.id})`}
            stroke={`rgb(var(${layer.colorVar}))`}
            strokeOpacity={layer.strokeOpacity}
            strokeWidth={1.2}
          />
        ))}
      </svg>
      <div className='pointer-events-none absolute inset-x-4 bottom-2 flex justify-between text-[10px] uppercase tracking-[0.35rem] text-dashboard-muted/80'>
        {labels.map(label => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
};

type WaterPanelProps = {
  consumed: number;
  goal: number;
  onAdd: (value: number) => void;
  onReset: () => void;
};

const WaterPanel = ({ consumed, goal, onAdd, onReset }: WaterPanelProps) => {
  const [customAmount, setCustomAmount] = useState("");
  const percentRaw = goal > 0 ? (consumed / goal) * 100 : 0;
  const remaining = Math.max(goal - consumed, 0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = Number(customAmount);
    if (!Number.isFinite(value) || value <= 0) return;
    onAdd(Math.round(value));
    setCustomAmount("");
  };

  return (
    <section className='space-y-10'>
      <div className='grid gap-8 lg:grid-cols-[380px,1fr]'>
        <WaterSummaryCard consumed={consumed} goal={goal} onAdd={onAdd} onReset={onReset} variant='panel' />

        <div className='rounded-3xl border border-dashboard-border/60 bg-dashboard-surface/70 px-10 py-10 shadow-card card-reflection'>
          <h2 className='text-lg font-semibold text-dashboard-text'>Adicionar ingestão</h2>
          <p className='mt-2 text-sm text-dashboard-muted'>
            Use atalhos ou registre manualmente para manter o acompanhamento diário de hidratação.
          </p>

          <div className='mt-6 flex flex-wrap gap-3'>
            {[150, 250, 350, 500, 750, 1000].map(amount => (
              <button
                key={amount}
                onClick={() => onAdd(amount)}
                className='rounded-full border border-dashboard-border/60 px-4 py-2 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
              >
                +{amount}ml
              </button>
            ))}
          </div>

          <form className='mt-6 flex flex-wrap gap-3' onSubmit={handleSubmit}>
            <input
              value={customAmount}
              onChange={event => setCustomAmount(event.target.value)}
              type='number'
              min={50}
              step={50}
              placeholder='Quantidade em ml'
              className='h-12 min-w-[180px] flex-1 rounded-2xl border border-dashboard-border/70 bg-dashboard-background/60 px-4 text-dashboard-text placeholder:text-dashboard-muted focus:border-dashboard-accent focus:outline-none focus:ring-1 focus:ring-dashboard-accent'
            />
            <button
              type='submit'
              className='rounded-2xl border border-dashboard-border/70 px-6 py-2 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
            >
              Registrar
            </button>
          </form>

          <div className='mt-6 grid gap-2 text-sm text-dashboard-muted'>
            <span>
              <span className='text-dashboard-text'>Meta diária:</span> {formatLiters(goal)}
            </span>
            <span>
              <span className='text-dashboard-text'>Consumido:</span> {formatLiters(consumed)} ({percentRaw.toFixed(1)}%)
            </span>
            <span>
              <span className='text-dashboard-text'>Restante:</span> {formatLiters(remaining)}
            </span>
            <span>
              <span className='text-dashboard-text'>Sugestão:</span>{" "}
              Beba {formatLiters(Math.max(Math.round(remaining / 3), 0))} em cada intervalo restante.
            </span>
          </div>
        </div>
      </div>

      <div className='rounded-3xl border border-dashboard-border/60 bg-gradient-to-b from-dashboard-background/80 to-dashboard-surface/60 px-10 py-10 shadow-card card-reflection'>
        <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
          <div>
            <h2 className='text-lg font-semibold text-dashboard-text'>Histórico semanal</h2>
            <p className='text-sm text-dashboard-muted'>Ingestão média por período do dia (centenas de ml).</p>
          </div>
          <button className='rounded-full border border-dashboard-border/60 px-4 py-1.5 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'>
            Exportar relatório
          </button>
        </div>
        <StackedAreaChart labels={waterHistoryLabels} series={waterHistorySeries} />
      </div>
    </section>
  );
};

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const bigint = Number.parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r} ${g} ${b}`;
};

const themeOptions = [
  {
    name: "Neon Deep",
    primary: "#00ffcc",
    secondary: "#00b8d9",
    background: "#000910",
    surface: "#48606bff",
    sidebar: "#001422",
    header: "#001c2e",
    text: "#d9f3ff",
    muted: "#6bb0d4",
    border: "#113040"
  },
  {
    name: "Aurora Blue",
    primary: "#4fc3f7",
    secondary: "#0288d1",
    background: "#040d1f",
    surface: "#0b1a33",
    sidebar: "#041327",
    header: "#0a223b",
    text: "#d9e9ff",
    muted: "#7fb3ff",
    border: "#12345a"
  },
  {
    name: "Sunset Orange",
    primary: "#2b0125ff",
    secondary: "#ff9e80",
    background: "#1a0905",
    surface: "#31120c",
    sidebar: "#240d08",
    header: "#33160f",
    text: "#ffe9d9",
    muted: "#f5bfa6",
    border: "#552419"
  },
  {
    name: "Violet Pulse",
    primary: "#a855f7",
    secondary: "#7c3aed",
    background: "#11051f",
    surface: "#1d1036",
    sidebar: "#160b2a",
    header: "#241445",
    text: "#efe0ff",
    muted: "#b99dff",
    border: "#3a1f63"
  },
  {
    name: "Neon Rose",
    primary: "#ff2d95",
    secondary: "#ff5ed9",
    background: "#040006",
    surface: "#1a0414",
    sidebar: "#0d0010",
    header: "#140019",
    text: "#ffe6f8",
    muted: "#ff9bde",
    border: "#35102a"
  },
  {
    name: "Steel Gray",
    primary: "#4f4f4f",
    secondary: "#8f8f8f",
    background: "#f4f5f7",
    surface: "#dee1e5",
    sidebar: "#e9ecef",
    header: "#d4d7db",
    text: "#1f2429",
    muted: "#6f747a",
    border: "#babfc5"
  }
];

const fontOptions = ["Inter", "Roboto", "Poppins", "Space Grotesk"];

function applyThemeVariables(themeName: string) {
  if (!isBrowser) return;
  const theme = themeOptions.find(option => option.name === themeName) ?? themeOptions[0];
  const root = document.documentElement;
  root.style.setProperty("--dashboard-accent", hexToRgb(theme.primary));
  root.style.setProperty("--dashboard-accent-soft", hexToRgb(theme.secondary));
  root.style.setProperty("--dashboard-bg", hexToRgb(theme.background));
  root.style.setProperty("--dashboard-surface", hexToRgb(theme.surface));
  root.style.setProperty("--dashboard-sidebar", hexToRgb(theme.sidebar));
  root.style.setProperty("--dashboard-header", hexToRgb(theme.header));
  root.style.setProperty("--dashboard-text", hexToRgb(theme.text));
  root.style.setProperty("--dashboard-muted", hexToRgb(theme.muted));
  root.style.setProperty("--dashboard-border", hexToRgb(theme.border));
}

function applyFontPreference(font: string) {
  if (!isBrowser) return;
  document.documentElement.style.setProperty("--dashboard-font", `'${font}', sans-serif`);
}

type SettingsPanelProps = {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  selectedFont: string;
  onFontChange: (font: string) => void;
  onResetFinance: () => void;
  onResetLayout: () => void;
  onResetAll: () => void;
};

const SettingsPanel = ({
  selectedTheme,
  onThemeChange,
  selectedFont,
  onFontChange,
  onResetFinance,
  onResetLayout,
  onResetAll
}: SettingsPanelProps) => {
  return (
    <section className='space-y-10'>
      <header className='flex flex-col gap-2'>
        <span className='text-sm uppercase tracking-[0.3rem] text-dashboard-accent/80'>Preferências</span>
        <h1 className='text-2xl font-semibold text-dashboard-text'>Configurações do painel</h1>
        <p className='text-sm text-dashboard-muted'>
          Ajuste temas, tipografia e redefina rapidamente as informações do painel financeiro.
        </p>
      </header>

      <div className='grid gap-8 lg:grid-cols-2'>
        <div className='space-y-6 rounded-3xl border border-dashboard-border/60 bg-dashboard-surface/70 p-8 shadow-card card-reflection'>
          <h2 className='text-lg font-semibold text-dashboard-text'>Tema visual</h2>
          <p className='text-sm text-dashboard-muted'>Escolha uma paleta de cores para destacar o painel.</p>
          <div className='grid gap-4 md:grid-cols-2'>
            {themeOptions.map(option => {
              const isActive = selectedTheme === option.name;
              return (
                <button
                  key={option.name}
                  onClick={() => onThemeChange(option.name)}
                  className={[
                    "flex flex-col gap-3 rounded-2xl border px-4 py-4 text-left transition",
                    isActive
                      ? "border-dashboard-accent/70 bg-dashboard-accent/10 text-dashboard-accent"
                      : "border-dashboard-border/60 bg-dashboard-background/40 text-dashboard-muted hover:border-dashboard-accent/60 hover:text-dashboard-accent"
                  ].join(" ")}
                >
                  <span className='text-sm font-semibold uppercase tracking-[0.2rem]'>{option.name}</span>
                  <span className='flex items-center gap-3'>
                    <span className={`h-8 flex-1 rounded-full theme-primary-${option.name.replace(/\s+/g, "").toLowerCase()}`} />
                    <span className={`h-8 flex-1 rounded-full theme-secondary-${option.name.replace(/\s+/g, "").toLowerCase()}`} />
                  </span>
                  <span className='text-xs'>Aplicar automaticamente no próximo login</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className='space-y-6 rounded-3xl border border-dashboard-border/60 bg-dashboard-surface/70 p-8 shadow-card card-reflection'>
          <h2 className='text-lg font-semibold text-dashboard-text'>Tipografia</h2>
          <p className='text-sm text-dashboard-muted'>Selecione a família tipográfica que preferir.</p>
          <div className='flex flex-wrap gap-4'>
            {fontOptions.map(font => {
              const isActive = selectedFont === font;
              return (
                <button
                  key={font}
                  onClick={() => onFontChange(font)}
                  className={[
                    "rounded-full border px-5 py-2 text-sm transition",
                    isActive
                      ? "border-dashboard-accent/80 text-dashboard-accent"
                      : "border-dashboard-border/70 text-dashboard-muted hover:border-dashboard-accent hover:text-dashboard-accent"
                  ].join(" ")}
                >
                  {font}
                </button>
              );
            })}
          </div>
          <div className='rounded-2xl border border-dashboard-border/60 bg-dashboard-background/50 px-6 py-5 text-sm text-dashboard-muted'>
            Visualize abaixo como o texto ficaria com a fonte selecionada:
            <p className={`mt-4 text-lg text-dashboard-text font-${selectedFont.replace(/\s+/g, "").toLowerCase()}`}>
              "Painel Financeiro Dr. David Breno"
            </p>
          </div>
        </div>
      </div>

      <div className='rounded-3xl border border-dashboard-border/60 bg-dashboard-surface/70 p-8 shadow-card card-reflection'>
        <h2 className='text-lg font-semibold text-dashboard-text'>Redefinir painel</h2>
        <p className='text-sm text-dashboard-muted'>Zere dados, widgets ou preferências quando necessário.</p>
        <div className='mt-6 grid gap-4 md:grid-cols-3'>
          <button
            onClick={onResetFinance}
            className='rounded-2xl border border-dashboard-border/70 bg-dashboard-background/60 px-5 py-4 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
          >
            Resetar movimentações
          </button>
          <button
            onClick={onResetLayout}
            className='rounded-2xl border border-dashboard-border/70 bg-dashboard-background/60 px-5 py-4 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
          >
            Resetar configurações de layout
          </button>
          <button
            onClick={onResetAll}
            className='rounded-2xl border border-dashboard-border/70 bg-dashboard-background/60 px-5 py-4 text-sm text-dashboard-muted transition hover:border-dashboard-accent hover:text-dashboard-accent'
          >
            Resetar tudo
          </button>
        </div>
        <div className='mt-6 flex flex-wrap gap-4 text-xs text-dashboard-muted'>
          <label className='flex items-center gap-2'>
            <input className='h-4 w-4 rounded border border-dashboard-border/70 bg-dashboard-background/60 text-dashboard-accent focus:ring-dashboard-accent' type='checkbox' />
            Solicitar confirmação antes de apagar dados
          </label>
          <label className='flex items-center gap-2'>
            <input className='h-4 w-4 rounded border border-dashboard-border/70 bg-dashboard-background/60 text-dashboard-accent focus:ring-dashboard-accent' type='checkbox' />
            Enviar relatório por e-mail após reset
          </label>
        </div>
      </div>
    </section>
  );
};





