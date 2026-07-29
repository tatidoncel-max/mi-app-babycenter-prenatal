import { useState, useEffect } from "react";

// TODO: Reemplazar con imágenes reales de BabyCenter CDN
// TODO: Integrar con BabyCenter API para datos dinámicos
// TODO: Implementar autenticación de usuario real

const COLORS = {
  primary: "#e8607a",       // Rosa BabyCenter
  primaryDark: "#c94a63",
  primaryLight: "#fce8ec",
  secondary: "#4a90d9",     // Azul BabyCenter
  secondaryLight: "#e8f2fd",
  accent: "#f5a623",        // Naranja acento
  accentLight: "#fef6e8",
  teal: "#2bb5a0",
  tealLight: "#e6f7f5",
  text: "#333333",
  textLight: "#666666",
  textMuted: "#999999",
  white: "#ffffff",
  bg: "#f9f9f9",
  bgCard: "#ffffff",
  border: "#eeeeee",
  success: "#4caf50",
  purple: "#9b59b6",
  purpleLight: "#f3eef8",
};

const WEEKS_DATA = [
  { week: 4,  size: "Semilla de amapola", length: "0.4 cm", weight: "< 1g", trimester: 1, emoji: "🌱", color: COLORS.teal, desc: "El embrión se está implantando en el útero. Las células se dividen rápidamente formando las estructuras básicas del bebé." },
  { week: 6,  size: "Semilla de lentejas", length: "0.6 cm", weight: "< 1g", trimester: 1, emoji: "🫘", color: COLORS.teal, desc: "El corazón empieza a latir. Se forman los primeros rudimentos de los ojos, nariz y orejas." },
  { week: 8,  size: "Frambuesa", length: "1.6 cm", weight: "1g", trimester: 1, emoji: "🫐", color: COLORS.teal, desc: "Los brazos y piernas están tomando forma. El cerebro se desarrolla rápidamente y los dedos empiezan a diferenciarse." },
  { week: 10, size: "Aceituna", length: "3.1 cm", weight: "4g", trimester: 1, emoji: "🫒", color: COLORS.teal, desc: "Tu bebé ya tiene todos los órganos vitales. Los músculos empiezan a desarrollarse y puede hacer pequeños movimientos." },
  { week: 12, size: "Limón", length: "5.4 cm", weight: "14g", trimester: 1, emoji: "🍋", color: COLORS.teal, desc: "¡Fin del primer trimestre! Los dedos de manos y pies están completamente formados. El bebé puede abrir y cerrar los puños." },
  { week: 16, size: "Aguacate", length: "11.6 cm", weight: "100g", trimester: 2, emoji: "🥑", color: COLORS.secondary, desc: "El bebé puede escuchar tu voz. Sus piernas son más largas que los brazos y todos los articulaciones funcionan." },
  { week: 20, size: "Plátano", length: "16.4 cm", weight: "300g", trimester: 2, emoji: "🍌", color: COLORS.secondary, desc: "¡Mitad del embarazo! Es probable que puedas sentir los primeros movimientos. El bebé ya tiene cejas y pestañas." },
  { week: 24, size: "Mazorca de maíz", length: "30 cm", weight: "600g", trimester: 2, emoji: "🌽", color: COLORS.secondary, desc: "El bebé tiene proporciones más parecidas a las de un recién nacido. Sus pulmones se están desarrollando activamente." },
  { week: 28, size: "Berenjena", length: "37.6 cm", weight: "1kg", trimester: 3, emoji: "🍆", color: COLORS.primary, desc: "¡Inicio del tercer trimestre! El bebé puede abrir y cerrar los ojos. Su cerebro se está desarrollando rápidamente." },
  { week: 32, size: "Bok choy", length: "42.4 cm", weight: "1.7kg", trimester: 3, emoji: "🥬", color: COLORS.primary, desc: "El bebé practica la respiración. Sus huesos están endureciéndose aunque su cabeza sigue siendo suave y flexible." },
  { week: 36, size: "Melón cantalupo", length: "47.4 cm", weight: "2.6kg", trimester: 3, emoji: "🍈", color: COLORS.primary, desc: "El bebé está casi a término. Gana peso rápidamente y sus pulmones están casi maduros." },
  { week: 40, size: "Sandía pequeña", length: "51 cm", weight: "3.5kg", trimester: 3, emoji: "🍉", color: COLORS.primary, desc: "¡Fecha probable de parto! Tu bebé está completamente desarrollado y listo para conocer el mundo." },
];

const TIPS = [
  { category: "Nutrición", icon: "🥗", title: "Ácido fólico esencial", desc: "Toma 400-800 mcg diarios para prevenir defectos del tubo neural. Los vegetales de hoja verde son tu mejor aliado.", color: COLORS.teal },
  { category: "Ejercicio", icon: "🚶‍♀️", title: "Caminata diaria", desc: "30 minutos de caminata suave mejoran la circulación, reducen el dolor de espalda y preparan tu cuerpo para el parto.", color: COLORS.secondary },
  { category: "Bienestar", icon: "😴", title: "Descanso óptimo", desc: "Duerme de lado izquierdo para mejorar el flujo sanguíneo al bebé. Usa almohadas de apoyo entre las rodillas.", color: COLORS.purple },
  { category: "Salud", icon: "💊", title: "Vitaminas prenatales", desc: "Las vitaminas prenatales cubren hierro, calcio y DHA que son fundamentales para el desarrollo cerebral del bebé.", color: COLORS.accent },
  { category: "Preparación", icon: "🏥", title: "Plan de parto", desc: "Prepara tu plan de parto con preferencias sobre analgesia, acompañamiento y cuidado del recién nacido.", color: COLORS.primary },
  { category: "Mental", icon: "🧘‍♀️", title: "Mindfulness prenatal", desc: "La meditación y respiración consciente reducen la ansiedad y preparan tu mente para la maternidad.", color: COLORS.tealLight },
];

const FEATURES = [
  { icon: "📅", title: "Rastreador semana a semana", desc: "Sigue el desarrollo de tu bebé con información detallada cada semana del embarazo", color: COLORS.primary },
  { icon: "👶", title: "Desarrollo del bebé", desc: "Videos y animaciones interactivas que muestran cómo crece tu bebé dentro del útero", color: COLORS.secondary },
  { icon: "💬", title: "Comunidad de mamás", desc: "Conecta con miles de mamás en la misma etapa que tú. Comparte dudas y experiencias", color: COLORS.teal },
  { icon: "🩺", title: "Guía de síntomas", desc: "Base de datos médica con más de 500 síntomas del embarazo explicados por expertos", color: COLORS.accent },
  { icon: "📝", title: "Lista de nacimiento", desc: "Crea tu lista de compras personalizada para el bebé con recomendaciones de expertos", color: COLORS.purple },
  { icon: "⏰", title: "Contracciones", desc: "Cronometrador de contracciones para saber cuándo es el momento de ir al hospital", color: COLORS.primaryDark },
];

const NAVIGATION = ["Inicio", "Semanas", "Consejos", "Herramientas", "Comunidad"];

export default function App() {
  const [activeNav, setActiveNav] = useState("Inicio");
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(4);
  const [contractionStart, setContractionStart] = useState(null);
  const [contractions, setContractions] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [kickCount, setKickCount] = useState(0);
  const [kickSession, setKickSession] = useState(false);
  const [kickStart, setKickStart] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStartContraction = () => {
    setContractionStart(Date.now());
    setIsTimerRunning(true);
    setElapsed(0);
  };

  const handleStopContraction = () => {
    if (contractionStart) {
      const duration = Math.round((Date.now() - contractionStart) / 1000);
      const now = new Date();
      const last = contractions[contractions.length - 1];
      const interval = last ? Math.round((Date.now() - last.timestamp) / 1000) : null;
      setContractions(prev => [...prev, {
        duration,
        interval,
        time: now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        timestamp: Date.now(),
      }]);
    }
    setIsTimerRunning(false);
    setContractionStart(null);
  };

  const navigateTo = (section) => {
    setAnimating(true);
    setTimeout(() => {
      setActiveNav(section);
      setAnimating(false);
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
  };

  const currentWeekData = WEEKS_DATA[currentWeekIndex];

  const trimesterColors = {
    1: COLORS.teal,
    2: COLORS.secondary,
    3: COLORS.primary,
  };

  const tipCategories = ["Todos", ...new Set(TIPS.map(t => t.category))];
  const filteredTips = activeFilter === "Todos" ? TIPS : TIPS.filter(t => t.category === activeFilter);

  const styles = {
    app: {
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
      backgroundColor: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
      maxWidth: "480px",
      margin: "0 auto",
      position: "relative",
      overflowX: "hidden",
    },
    header: {
      backgroundColor: scrolled ? COLORS.white : COLORS.primary,
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "56px",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    },
    logoIcon: {
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      backgroundColor: scrolled ? COLORS.primary : COLORS.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      transition: "background-color 0.3s",
    },
    logoText: {
      fontSize: "17px",
      fontWeight: "700",
      color: scrolled ? COLORS.primary : COLORS.white,
      letterSpacing: "-0.3px",
      transition: "color 0.3s",
    },
    menuBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "8px",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      borderRadius: "8px",
    },
    menuLine: {
      width: "22px",
      height: "2px",
      backgroundColor: scrolled ? COLORS.primary : COLORS.white,
      borderRadius: "2px",
      transition: "background-color 0.3s",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 200,
      opacity: menuOpen ? 1 : 0,
      pointerEvents: menuOpen ? "all" : "none",
      transition: "opacity 0.25s ease",
    },
    drawer: {
      position: "fixed",
      top: 0,
      right: menuOpen ? "0" : "-280px",
      width: "280px",
      height: "100%",
      backgroundColor: COLORS.white,
      zIndex: 201,
      transition: "right 0.3s ease",
      boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
    },
    drawerHeader: {
      backgroundColor: COLORS.primary,
      padding: "40px 20px 20px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    drawerAvatar: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
    },
    drawerName: {
      color: COLORS.white,
      fontSize: "16px",
      fontWeight: "600",
    },
    drawerSub: {
      color: "rgba(255,255,255,0.8)",
      fontSize: "13px",
      marginTop: "2px",
    },
    drawerNav: {
      padding: "12px 0",
      flex: 1,
    },
    drawerNavItem: (isActive) => ({
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "14px 20px",
      cursor: "pointer",
      backgroundColor: isActive ? COLORS.primaryLight : "transparent",
      borderLeft: isActive ? `3px solid ${COLORS.primary}` : "3px solid transparent",
      transition: "background-color 0.2s",
    }),
    drawerNavIcon: {
      fontSize: "20px",
      width: "24px",
      textAlign: "center",
    },
    drawerNavText: (isActive) => ({
      fontSize: "15px",
      fontWeight: isActive ? "600" : "400",
      color: isActive ? COLORS.primary : COLORS.text,
    }),
    mainContent: {
      opacity: animating ? 0 : 1,
      transform: animating ? "translateY(8px)" : "translateY(0)",
      transition: "opacity 0.2s ease, transform 0.2s ease",
      paddingBottom: "80px",
    },
    bottomNav: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: "480px",
      backgroundColor: COLORS.white,
      borderTop: `1px solid ${COLORS.border}`,
      display: "flex",
      zIndex: 100,
      boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
    },
    bottomNavItem: (isActive) => ({
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px 4px",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      gap: "3px",
      position: "relative",
    }),
    bottomNavDot: (isActive) => ({
      position: "absolute",
      top: "6px",
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      backgroundColor: COLORS.primary,
      opacity: isActive ? 1 : 0,
      transition: "opacity 0.2s",
    }),
    bottomNavIcon: (isActive) => ({
      fontSize: "20px",
      filter: isActive ? "none" : "grayscale(100%) opacity(0.5)",
      transition: "filter 0.2s",
    }),
    bottomNavLabel: (isActive) => ({
      fontSize: "10px",
      fontWeight: isActive ? "600" : "400",
      color: isActive ? COLORS.primary : COLORS.textMuted,
      transition: "color 0.2s",
    }),
    // Hero section
    hero: {
      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
      padding: "28px 20px 32px",
      color: COLORS.white,
      position: "relative",
      overflow: "hidden",
    },
    heroBg: {
      position: "absolute",
      top: "-30px",
      right: "-30px",
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.08)",
    },
    heroBg2: {
      position: "absolute",
      bottom: "-50px",
      left: "-40px",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.05)",
    },
    heroGreeting: {
      fontSize: "13px",
      opacity: 0.85,
      marginBottom: "4px",
      letterSpacing: "0.3px",
    },
    heroTitle: {
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "20px",
      lineHeight: "1.3",
      position: "relative",
    },
    weekCard: {
      backgroundColor: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      position: "relative",
    },
    weekEmoji: {
      fontSize: "40px",
      minWidth: "50px",
      textAlign: "center",
    },
    weekInfo: {
      flex: 1,
    },
    weekLabel: {
      fontSize: "11px",
      opacity: 0.8,
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      marginBottom: "2px",
    },
    weekNumber: {
      fontSize: "26px",
      fontWeight: "800",
      lineHeight: "1",
      marginBottom: "4px",
    },
    weekSize: {
      fontSize: "13px",
      opacity: 0.9,
      fontWeight: "500",
    },
    weekStats: {
      display: "flex",
      gap: "12px",
      marginTop: "8px",
    },
    weekStat: {
      fontSize: "11px",
      opacity: 0.85,
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    progressBar: {
      marginTop: "16px",
      position: "relative",
    },
    progressLabel: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "11px",
      opacity: 0.8,
      marginBottom: "6px",
    },
    progressTrack: {
      height: "6px",
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: "3px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: COLORS.white,
      borderRadius: "3px",
      transition: "width 0.6s ease",
      width: `${((currentWeekData.week - 4) / 36) * 100}%`,
    },
    // Section
    section: {
      padding: "20px 16px 0",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "14px",
    },
    sectionTitle: {
      fontSize: "17px",
      fontWeight: "700",
      color: COLORS.text,
    },
    sectionLink: {
      fontSize: "13px",
      color: COLORS.primary,
      fontWeight: "600",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: 0,
    },
    // Feature cards
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
    },
    featureCard: (color) => ({
      backgroundColor: COLORS.white,
      borderRadius: "14px",
      padding: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      border: `1px solid ${COLORS.border}`,
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    }),
    featureIcon: (color) => ({
      width: "40px",
      height: "40px",
      borderRadius: "10px",
      backgroundColor: color + "15",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      marginBottom: "10px",
    }),
    featureTitle: {
      fontSize: "13px",
      fontWeight: "600",
      color: COLORS.text,
      marginBottom: "4px",
      lineHeight: "1.3",
    },
    featureDesc: {
      fontSize: "11px",
      color: COLORS.textMuted,
      lineHeight: "1.4",
    },
    // Tips
    tipCard: (color) => ({
      backgroundColor: COLORS.white,
      borderRadius: "14px",
      padding: "16px",
      marginBottom: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      border: `1px solid ${COLORS.border}`,
      display: "flex",
      gap: "14px",
      alignItems: "flex-start",
    }),
    tipIconWrap: (color) => ({
      width: "44px",
      height: "44px",
      minWidth: "44px",
      borderRadius: "12px",
      backgroundColor: color + "20",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
    }),
    tipCategory: (color) => ({
      fontSize: "10px",
      fontWeight: "600",
      color: color,
      textTransform: "uppercase",
      letterSpacing: "0.6px",
      marginBottom: "3px",
    }),
    tipTitle: {
      fontSize: "14px",
      fontWeight: "700",
      color: COLORS.text,
      marginBottom: "5px",
    },
    tipDesc: {
      fontSize: "12px",
      color: COLORS.textLight,
      lineHeight: "1.5",
    },
    // Week detail
    weekDetailBanner: (color) => ({
      background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
      padding: "28px 20px",
      color: COLORS.white,
      display: "flex",
      alignItems: "center",
      gap: "16px",
    }),
    weekDetailEmoji: {
      fontSize: "60px",
    },
    weekDetailTitle: {
      fontSize: "24px",
      fontWeight: "800",
      lineHeight: "1.1",
    },
    weekDetailSub: {
      fontSize: "14px",
      opacity: 0.9,
      marginTop: "4px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      margin: "16px",
    },
    infoBox: (color) => ({
      backgroundColor: color + "15",
      borderRadius: "12px",
      padding: "14px",
      textAlign: "center",
    }),
    infoBoxLabel: {
      fontSize: "11px",
      color: COLORS.textMuted,
      marginBottom: "4px",
    },
    infoBoxValue: (color) => ({
      fontSize: "18px",
      fontWeight: "700",
      color: color,
    }),
    descBox: {
      margin: "0 16px 16px",
      backgroundColor: COLORS.white,
      borderRadius: "14px",
      padding: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    descTitle: {
      fontSize: "15px",
      fontWeight: "700",
      color: COLORS.text,
      marginBottom: "8px",
    },
    descText: {
      fontSize: "13px",
      color: COLORS.textLight,
      lineHeight: "1.6",
    },
    // Contraction timer
    timerCard: {
      margin: "0 16px 16px",
      backgroundColor: COLORS.white,
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      textAlign: "center",
    },
    timerDisplay: {
      fontSize: "56px",
      fontWeight: "800",
      color: isTimerRunning ? COLORS.primary : COLORS.textMuted,
      fontVariantNumeric: "tabular-nums",
      letterSpacing: "-2px",
      transition: "color 0.3s",
      lineHeight: "1",
      margin: "16px 0",
    },
    timerBtn: {
      backgroundColor: isTimerRunning ? COLORS.primaryDark : COLORS.primary,
      color: COLORS.white,
      border: "none",
      borderRadius: "50px",
      padding: "14px 40px",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: `0 4px 15px ${COLORS.primary}40`,
      transition: "transform 0.15s, background-color 0.2s",
    },
    contractionList: {
      margin: "0 16px",
    },
    contractionItem: {
      backgroundColor: COLORS.white,
      borderRadius: "12px",
      padding: "12px 14px",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    },
    // Kick counter
    kickCard: {
      margin: "0 16px 16px",
      backgroundColor: COLORS.white,
      borderRadius: "16px",
      padding: "24px",
      textAlign: "center",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    },
    kickCount: {
      fontSize: "72px",
      fontWeight: "800",
      color: COLORS.secondary,
      lineHeight: "1",
      margin: "12px 0",
    },
    kickBtn: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      border: "none",
      backgroundColor: COLORS.secondary,
      color: COLORS.white,
      fontSize: "36px",
      cursor: "pointer",
      boxShadow: `0 6px 20px ${COLORS.secondary}50`,
      transition: "transform 0.1s, box-shadow 0.1s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "16px auto",
    },
    // Filter pills
    filterRow: {
      display: "flex",
      gap: "8px",
      overflowX: "auto",
      paddingBottom: "4px",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      marginBottom: "16px",
    },
    filterPill: (isActive) => ({
      padding: "6px 14px",
      borderRadius: "50px",
      fontSize: "12px",
      fontWeight: isActive ? "600" : "400",
      color: isActive ? COLORS.white : COLORS.textLight,
      backgroundColor: isActive ? COLORS.primary : COLORS.white,
      border: `1px solid ${isActive ? COLORS.primary : COLORS.border}`,
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "all 0.2s",
    }),
    // Week selector
    weekNav: {
      display: "flex",
      gap: "8px",
      overflowX: "auto",
      padding: "0 16px 16px",
      scrollbarWidth: "none",
    },
    weekPill: (isActive, color) => ({
      minWidth: "60px",
      padding: "8px 12px",
      borderRadius: "10px",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: isActive ? color : COLORS.white,
      border: `2px solid ${isActive ? color : COLORS.border}`,
      transition: "all 0.2s",
    }),
    weekPillNum: (isActive) => ({
      fontSize: "16px",
      fontWeight: "700",
      color: isActive ? COLORS.white : COLORS.text,
    }),
    weekPillLabel: (isActive) => ({
      fontSize: "9px",
      color: isActive ? "rgba(255,255,255,0.8)" : COLORS.textMuted,
      marginTop: "2px",
      textTransform: "uppercase",
    }),
    trimesterBadge: (t) => ({
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: "50px",
      fontSize: "11px",
      fontWeight: "600",
      backgroundColor: trimesterColors[t] + "20",
      color: trimesterColors[t],
      marginTop: "6px",
    }),
    // Community
    postCard: {
      backgroundColor: COLORS.white,
      borderRadius: "14px",
      padding: "16px",
      marginBottom: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    postHeader: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px",
    },
    postAvatar: (color) => ({
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      backgroundColor: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: COLORS.white,
      fontSize: "15px",
      fontWeight: "600",
    }),
    postName: {
      fontSize: "14px",
      fontWeight: "600",
      color: COLORS.text,
    },
    postTime: {
      fontSize: "11px",
      color: COLORS.textMuted,
    },
    postText: {
      fontSize: "13px",
      color: COLORS.textLight,
      lineHeight: "1.5",
      marginBottom: "12px",
    },
    postActions: {
      display: "flex",
      gap: "16px",
    },
    postAction: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "12px",
      color: COLORS.textMuted,
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: 0,
    },
    // Stats banner
    statsBanner: {
      background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.teal} 100%)`,
      margin: "16px",
      borderRadius: "16px",
      padding: "20px",
      display: "flex",
      justifyContent: "space-around",
      color: COLORS.white,
    },
    statItem: {
      textAlign: "center",
    },
    statNum: {
      fontSize: "22px",
      fontWeight: "800",
      lineHeight: "1",
    },
    statLabel: {
      fontSize: "11px",
      opacity: 0.85,
      marginTop: "4px",
    },
    // CTA Banner
    ctaBanner: {
      margin: "16px",
      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
      borderRadius: "16px",
      padding: "24px 20px",
      color: COLORS.white,
      textAlign: "center",
    },
    ctaTitle: {
      fontSize: "18px",
      fontWeight: "800",
      marginBottom: "8px",
    },
    ctaDesc: {
      fontSize: "13px",
      opacity: 0.9,
      marginBottom: "16px",
      lineHeight: "1.5",
    },
    ctaBtn: {
      backgroundColor: COLORS.white,
      color: COLORS.primary,
      border: "none",
      borderRadius: "50px",
      padding: "12px 28px",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
  };

  const navIcons = ["🏠", "📅", "💡", "🔧", "👥"];

  // COMMUNITY POSTS - TODO: reemplazar con datos reales de la API
  const posts = [
    { id: 1, name: "María García", week: 24, text: "¿Alguien más siente mucho movimiento del bebé por las noches? Mi niño parece que solo quiere jugar cuando me acuesto 😂 Semana 24 y ya me tiene bailando.", time: "Hace 12 min", color: COLORS.primary, likes: 23, comments: 8 },
    { id: 2, name: "Laura Martínez", week: 16, text: "¡Hoy tuve mi eco morfológica y todo está perfecto! La médico dice que tiene la naricita de su papá 💕 ¿Cuántas semanas tenían cuando hicieron la suya?", time: "Hace 45 min", color: COLORS.secondary, likes: 67, comments: 31 },
    { id: 3, name: "Ana Rodríguez", week: 32, text: "Tercer trimestre gang 🙋‍♀️ Los ardores son insoportables pero ya queda poco. ¿Algún remedio casero que les haya funcionado?", time: "Hace 2 horas", color: COLORS.teal, likes: 45, comments: 22 },
    { id: 4, name: "Sofía López", week: 8, text: "Primera visita al ginecólogo hoy. Vi el corazoncito latir en el ultrasonido y no pude evitar llorar de emoción. ¡Este bebé ya es lo mejor que me ha pasado! 🥹", time: "Hace 3 horas", color: COLORS.accent, likes: 89, comments: 14 },
  ];

  // RENDER SECTIONS
  const renderHome = () => (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroBg2} />
        {/* TODO: Obtener nombre real del usuario desde perfil */}
        <p style={styles.heroGreeting}>👋 ¡Hola, mamá!</p>
        <h1 style={styles.heroTitle}>Tu embarazo, semana a semana</h1>
        <div style={styles.weekCard}>
          <div style={styles.weekEmoji}>{currentWeekData.emoji}</div>
          <div style={styles.weekInfo}>
            <p style={styles.weekLabel}>Semana actual</p>
            <p style={styles.weekNumber}>Semana {currentWeekData.week}</p>
            <p style={styles.weekSize}>Tamaño: {currentWeekData.size}</p>
            <div style={styles.weekStats}>
              <span style={styles.weekStat}>📏 {currentWeekData.length}</span>
              <span style={styles.weekStat}>⚖️ {currentWeekData.weight}</span>
            </div>
          </div>
        </div>
        <div style={styles.progressBar}>
          <div style={styles.progressLabel}>
            <span>Semana 4</span>
            <span>{Math.round(((currentWeekData.week - 4) / 36) * 100)}% completado</span>
            <span>Semana 40</span>
          </div>
          <div style={styles.progressTrack}>
            <div style={styles.progressFill} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsBanner}>
        <div style={styles.statItem}>
          <div style={styles.statNum}>40M+</div>
          <div style={styles.statLabel}>Mamás activas</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNum}>25</div>
          <div style={styles.statLabel}>Años de confianza</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNum}>#1</div>
          <div style={styles.statLabel}>App de embarazo</div>
        </div>
      </div>

      {/* Features */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Herramientas para ti</h2>
          <button style={styles.sectionLink} onClick={() => navigateTo("Herramientas")}>Ver todo</button>
        </div>
        <div style={styles.featureGrid}>
          {FEATURES.slice(0, 4).map((f, i) => (
            <div
              key={i}
              style={styles.featureCard(f.color)}
              onClick={() => navigateTo(i === 2 ? "Comunidad" : i === 5 ? "Herramientas" : "Herramientas")}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
            >
              <div style={styles.featureIcon(f.color)}>{f.icon}</div>
              <p style={styles.featureTitle}>{f.title}</p>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div style={{ ...styles.section, paddingTop: "20px" }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Consejo del día</h2>
          <button style={styles.sectionLink} onClick={() => navigateTo("Consejos")}>Ver más</button>
        </div>
        <div style={styles.tipCard(TIPS[0].color)}>
          <div style={styles.tipIconWrap(TIPS[0].color)}>{TIPS[0].icon}</div>
          <div>
            <p style={styles.tipCategory(TIPS[0].color)}>{TIPS[0].category}</p>
            <p style={styles.tipTitle}>{TIPS[0].title}</p>
            <p style={styles.tipDesc}>{TIPS[0].desc}</p>
          </div>
        </div>
      </div>

      {/* Community preview */}
      <div style={{ ...styles.section, paddingTop: "20px" }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Comunidad</h2>
          <button style={styles.sectionLink} onClick={() => navigateTo("Comunidad")}>Ver todo</button>
        </div>
        {posts.slice(0, 2).map(post => (
          <div key={post.id} style={styles.postCard}>
            <div style={styles.postHeader}>
              <div style={styles.postAvatar(post.color)}>{post.name[0]}</div>
              <div>
                <p style={styles.postName}>{post.name}</p>
                <p style={styles.postTime}>Semana {post.week} • {post.time}</p>
              </div>
            </div>
            <p style={styles.postText}>{post.text}</p>
            <div style={styles.postActions}>
              <button style={styles.postAction}>❤️ {post.likes}</button>
              <button style={styles.postAction}>💬 {post.comments}</button>
              <button style={styles.postAction}>↗️ Compartir</button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={styles.ctaBanner}>
        <p style={styles.ctaTitle}>¿Lista para el gran día?</p>
        <p style={styles.ctaDesc}>Descarga BabyCenter y lleva el seguimiento completo de tu embarazo en un solo lugar</p>
        {/* TODO: Enlazar con tiendas de apps reales */}
        <button style={styles.ctaBtn}>Descargar gratis</button>
      </div>
    </div>
  );

  const renderWeeks = () => (
    <div>
      <div style={{ ...styles.hero, paddingBottom: "20px" }}>
        <div style={styles.heroBg} />
        <h2 style={{ ...styles.heroTitle, fontSize: "20px", marginBottom: "4px" }}>Desarrollo semana a semana</h2>
        <p style={{ ...styles.heroGreeting, marginBottom: 0 }}>Selecciona una semana para ver el desarrollo</p>
      </div>

      {/* Trimester labels */}
      <div style={{ display: "flex", gap: "8px", padding: "12px 16px 0" }}>
        {[1, 2, 3].map(t => (
          <div key={t} style={{ ...styles.trimesterBadge(t), cursor: "pointer" }}>
            Trimestre {t}
          </div>
        ))}
      </div>

      {/* Week pills */}
      <div style={styles.weekNav}>
        {WEEKS_DATA.map((w, i) => (
          <div
            key={w.week}
            style={styles.weekPill(i === currentWeekIndex, trimesterColors[w.trimester])}
            onClick={() => setCurrentWeekIndex(i)}
          >
            <div style={styles.weekPillNum(i === currentWeekIndex)}>{w.week}</div>
            <div style={styles.weekPillLabel(i === currentWeekIndex)}>SEM</div>
          </div>
        ))}
      </div>

      {/* Week detail */}
      <div style={styles.weekDetailBanner(trimesterColors[currentWeekData.trimester])}>
        <div style={styles.weekDetailEmoji}>{currentWeekData.emoji}</div>
        <div>
          <p style={{ fontSize: "12px", opacity: 0.85, marginBottom: "2px" }}>Trimestre {currentWeekData.trimester}</p>
          <p style={styles.weekDetailTitle}>Semana {currentWeekData.week}</p>
          <p style={styles.weekDetailSub}>Tu bebé es como una {currentWeekData.size.toLowerCase()}</p>
          <div style={styles.trimesterBadge(currentWeekData.trimester)}>
            {currentWeekData.trimester === 1 ? "Primer Trimestre" : currentWeekData.trimester === 2 ? "Segundo Trimestre" : "Tercer Trimestre"}
          </div>
        </div>
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoBox(trimesterColors[currentWeekData.trimester])}>
          <p style={styles.infoBoxLabel}>Longitud</p>
          <p style={styles.infoBoxValue(trimesterColors[currentWeekData.trimester])}>{currentWeekData.length}</p>
        </div>
        <div style={styles.infoBox(trimesterColors[currentWeekData.trimester])}>
          <p style={styles.infoBoxLabel}>Peso aprox.</p>
          <p style={styles.infoBoxValue(trimesterColors[currentWeekData.trimester])}>{currentWeekData.weight}</p>
        </div>
        <div style={styles.infoBox(COLORS.accent)}>
          <p style={styles.infoBoxLabel}>Tamaño</p>
          <p style={{ ...styles.infoBoxValue(COLORS.accent), fontSize: "13px" }}>{currentWeekData.size}</p>
        </div>
        <div style={styles.infoBox(COLORS.purple)}>
          <p style={styles.infoBoxLabel}>Semanas restantes</p>
          <p style={styles.infoBoxValue(COLORS.purple)}>{40 - currentWeekData.week}</p>
        </div>
      </div>

      <div style={styles.descBox}>
        <p style={styles.descTitle}>🔬 Desarrollo esta semana</p>
        <p style={styles.descText}>{currentWeekData.desc}</p>
      </div>

      {/* TODO: Agregar videos reales de desarrollo del bebé desde BabyCenter CDN */}
      <div style={{ margin: "0 16px 16px" }}>
        <div style={{
          backgroundColor: COLORS.secondaryLight,
          borderRadius: "14px",
          padding: "20px",
          textAlign: "center",
          border: `2px dashed ${COLORS.secondary}40`,
        }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎬</div>
          <p style={{ fontSize: "14px", fontWeight: "600", color: COLORS.secondary, marginBottom: "4px" }}>Video de desarrollo</p>
          <p style={{ fontSize: "12px", color: COLORS.textLight }}>
            {/* TODO: Enlazar con video real de BabyCenter para cada semana */}
            Video animado del desarrollo del bebé en la semana {currentWeekData.week}
          </p>
          <button style={{
            marginTop: "12px",
            backgroundColor: COLORS.secondary,
            color: COLORS.white,
            border: "none",
            borderRadius: "50px",
            padding: "10px 24px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}>
            Ver video
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      <div style={{ display: "flex", gap: "12px", margin: "0 16px 16px" }}>
        <button
          disabled={currentWeekIndex === 0}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "12px",
            border: `1px solid ${COLORS.border}`,
            backgroundColor: currentWeekIndex === 0 ? COLORS.bg : COLORS.white,
            color: currentWeekIndex === 0 ? COLORS.textMuted : COLORS.text,
            fontSize: "14px",
            fontWeight: "600",
            cursor: currentWeekIndex === 0 ? "not-allowed" : "pointer",
          }}
          onClick={() => setCurrentWeekIndex(i => Math.max(0, i - 1))}
        >
          ← Semana anterior
        </button>
        <button
          disabled={currentWeekIndex === WEEKS_DATA.length - 1}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "12px",
            border: `1px solid ${COLORS.primary}`,
            backgroundColor: currentWeekIndex === WEEKS_DATA.length - 1 ? COLORS.bg : COLORS.primaryLight,
            color: currentWeekIndex === WEEKS_DATA.length - 1 ? COLORS.textMuted : COLORS.primary,
            fontSize: "14px",
            fontWeight: "600",
            cursor: currentWeekIndex === WEEKS_DATA.length - 1 ? "not-allowed" : "pointer",
          }}
          onClick={() => setCurrentWeekIndex(i => Math.min(WEEKS_DATA.length - 1, i + 1))}
        >
          Semana siguiente →
        </button>
      </div>
    </div>
  );

  const renderTips = () => (
    <div>
      <div style={{ ...styles.hero, paddingBottom: "20px" }}>
        <div style={styles.heroBg} />
        <h2 style={{ ...styles.heroTitle, fontSize: "20px", marginBottom: "4px" }}>Consejos de expertos</h2>
        <p style={{ ...styles.heroGreeting, marginBottom: 0 }}>Información validada por médicos especialistas</p>
      </div>

      <div style={{ ...styles.section, paddingTop: "16px" }}>
        <div style={styles.filterRow}>
          {tipCategories.map(cat => (
            <button
              key={cat}
              style={styles.filterPill(activeFilter === cat)}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredTips.map((tip, i) => (
          <div key={i} style={styles.tipCard(tip.color)}>
            <div style={styles.tipIconWrap(tip.color)}>{tip.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={styles.tipCategory(tip.color)}>{tip.category}</p>
              <p style={styles.tipTitle}>{tip.title}</p>
              <p style={styles.tipDesc}>{tip.desc}</p>
            </div>
          </div>
        ))}

        {/* TODO: Cargar más consejos desde la API de BabyCenter */}
        <button style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: `1px solid ${COLORS.border}`,
          backgroundColor: COLORS.white,
          color: COLORS.primary,
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "8px",
        }}>
          Cargar más consejos
        </button>
      </div>
    </div>
  );

  const renderTools = () => (
    <div>
      <div style={{ ...styles.hero, paddingBottom: "20px" }}>
        <div style={styles.heroBg} />
        <h2 style={{ ...styles.heroTitle, fontSize: "20px", marginBottom: "4px" }}>Herramientas</h2>
        <p style={{ ...styles.heroGreeting, marginBottom: 0 }}>Todo lo que necesitas para tu embarazo</p>
      </div>

      {/* Contraction timer */}
      <div style={{ ...styles.section, paddingTop: "16px" }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>⏱️ Cronómetro de contracciones</h2>
        </div>
      </div>

      <div style={styles.timerCard}>
        <p style={{ fontSize: "13px", color: COLORS.textMuted, marginBottom: "4px" }}>
          {isTimerRunning ? "Contracción en curso..." : contractions.length === 0 ? "Pulsa cuando comience una contracción" : "Pulsa para iniciar la siguiente contracción"}
        </p>
        <div style={styles.timerDisplay}>{formatTime(elapsed)}</div>
        <button
          style={styles.timerBtn}
          onClick={isTimerRunning ? handleStopContraction : handleStartContraction}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {isTimerRunning ? "⏹ Detener" : "▶ Iniciar"}
        </button>
        {contractions.length > 0 && (
          <button
            style={{ marginTop: "10px", background: "none", border: "none", color: COLORS.textMuted, fontSize: "12px", cursor: "pointer" }}
            onClick={() => setContractions([])}
          >
            Reiniciar todo
          </button>
        )}
      </div>

      {contractions.length > 0 && (
        <div style={styles.contractionList}>
          <p style={{ fontSize: "13px", fontWeight: "600", color: COLORS.text, marginBottom: "8px", padding: "0 2px" }}>
            Historial ({contractions.length} contracciones)
          </p>
          {[...contractions].reverse().slice(0, 5).map((c, i) => (
            <div key={i} style={styles.contractionItem}>
              <div>
                <p style={{ fontSize: "13px", fontWeight: "600", color: COLORS.text }}>{c.time}</p>
                {c.interval && <p style={{ fontSize: "11px", color: COLORS.textMuted }}>Intervalo: {Math.floor(c.interval / 60)}m {c.interval % 60}s</p>}
              </div>
              <div style={{
                backgroundColor: c.duration < 30 ? COLORS.tealLight : c.duration < 60 ? COLORS.accentLight : COLORS.primaryLight,
                color: c.duration < 30 ? COLORS.teal : c.duration < 60 ? COLORS.accent : COLORS.primary,
                padding: "4px 10px",
                borderRadius: "50px",
                fontSize: "13px",
                fontWeight: "600",
              }}>
                {formatTime(c.duration)}
              </div>
            </div>
          ))}
          {contractions.length >= 3 && (
            <div style={{
              backgroundColor: COLORS.primaryLight,
              borderRadius: "12px",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "8px",
            }}>
              <p style={{ fontSize: "13px", color: COLORS.primary, fontWeight: "600" }}>
                💡 Consejo médico
              </p>
              <p style={{ fontSize: "12px", color: COLORS.primaryDark, marginTop: "4px", lineHeight: "1.5" }}>
                {/* TODO: Calcular regla 5-1-1 automáticamente */}
                Cuando las contracciones sean cada 5 minutos, duren 1 minuto y lleven 1 hora así, es momento de ir al hospital.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Kick counter */}
      <div style={{ ...styles.section, paddingTop: "20px" }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>👟 Contador de patadas</h2>
        </div>
      </div>

      <div style={styles.kickCard}>
        <p style={{ fontSize: "13px", color: COLORS.textMuted }}>
          {kickSession ? `Sesión activa • ${kickStart ? `Iniciada a las ${kickStart}` : ""}` : "Inicia una sesión de conteo"}
        </p>
        <div style={styles.kickCount}>{kickCount}</div>
        <p style={{ fontSize: "12px", color: COLORS.textMuted, marginBottom: "4px" }}>
          patadas registradas
        </p>
        <button
          style={styles.kickBtn}
          onClick={() => {
            if (!kickSession) {
              setKickSession(true);
              setKickCount(0);
              setKickStart(new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }));
            } else {
              setKickCount(c => c + 1);
            }
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(0.95)"; e.currentTarget.style.boxShadow = `0 3px 10px ${COLORS.secondary}40`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 6px 20px ${COLORS.secondary}50`; }}
        >
          👟
        </button>
        {kickSession && (
          <div>
            <p style={{ fontSize: "12px", color: kickCount >= 10 ? COLORS.success : COLORS.textLight, fontWeight: kickCount >= 10 ? "600" : "400" }}>
              {kickCount >= 10 ? "✅ ¡Meta alcanzada! 10 patadas registradas" : `${10 - kickCount} patadas para alcanzar la meta de 10`}
            </p>
            <button
              style={{ marginTop: "12px", background: "none", border: "none", color: COLORS.textMuted, fontSize: "12px", cursor: "pointer" }}
              onClick={() => { setKickSession(false); setKickCount(0); setKickStart(null); }}
            >
              Finalizar sesión
            </button>
          </div>
        )}
      </div>

      {/* All tools */}
      <div style={{ ...styles.section, paddingTop: "8px" }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Más herramientas</h2>
        </div>
        <div style={styles.featureGrid}>
          {FEATURES.map((f, i) => (
            <div
              key={i}
              style={styles.featureCard(f.color)}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
            >
              <div style={styles.featureIcon(f.color)}>{f.icon}</div>
              <p style={styles.featureTitle}>{f.title}</p>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div>
      <div style={{ ...styles.hero, paddingBottom: "20px" }}>
        <div style={styles.heroBg} />
        <h2 style={{ ...styles.heroTitle, fontSize: "20px", marginBottom: "4px" }}>Comunidad BabyCenter</h2>
        <p style={{ ...styles.heroGreeting, marginBottom: 0 }}>Más de 40 millones de mamás comparten experiencias</p>
      </div>

      {/* TODO: Implementar creación real de posts con backend */}
      <div style={{ margin: "16px" }}>
        <div style={{
          backgroundColor: COLORS.white,
          borderRadius: "14px",
          padding: "14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={styles.postAvatar(COLORS.primary)}>T</div>
          <div style={{
            flex: 1,
            backgroundColor: COLORS.bg,
            borderRadius: "50px",
            padding: "10px 16px",
            fontSize: "13px",
            color: COLORS.textMuted,
            cursor: "pointer",
          }}>
            ¿Qué quieres compartir hoy? ✨
          </div>
        </div>
      </div>

      {/* Filter */}
      <div style={{ padding: "0 16px" }}>
        <div style={styles.filterRow}>
          {["Todos", "Semana 24", "Primer trimestre", "Nutrición", "Síntomas"].map(f => (
            <button key={f} style={styles.filterPill(f === "Todos")} onClick={() => {}}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        {posts.map(post => (
          <div key={post.id} style={styles.postCard}>
            <div style={styles.postHeader}>
              <div style={styles.postAvatar(post.color)}>{post.name[0]}</div>
              <div>
                <p style={styles.postName}>{post.name}</p>
                <p style={styles.postTime}>Semana {post.week} • {post.time}</p>
              </div>
            </div>
            <p style={styles.postText}>{post.text}</p>
            <div style={styles.postActions}>
              <button style={styles.postAction}>❤️ {post.likes}</button>
              <button style={styles.postAction}>💬 {post.comments}</button>
              <button style={styles.postAction}>↗️ Compartir</button>
            </div>
          </div>
        ))}

        {/* TODO: Paginación real de posts desde API */}
        <button style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: `1px solid ${COLORS.border}`,
          backgroundColor: COLORS.white,
          color: COLORS.primary,
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "8px",
        }}>
          Ver más publicaciones
        </button>

        {/* Groups */}
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Grupos populares</h2>
        </div>
        {[
          { name: "Mamás de Junio 2025", members: "12.4K", emoji: "🌸" },
          { name: "Primer embarazo", members: "89.2K", emoji: "🍼" },
          { name: "Gemelos y mellizos", members: "8.7K", emoji: "👯" },
          { name: "Alimentación en el embarazo", members: "45.1K", emoji: "🥗" },
        ].map((g, i) => (
          <div key={i} style={{
            ...styles.postCard,
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "14px",
          }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px",
              backgroundColor: COLORS.primaryLight, display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: "22px",
            }}>
              {g.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: COLORS.text }}>{g.name}</p>
              <p style={{ fontSize: "12px", color: COLORS.textMuted }}>{g.members} miembros</p>
            </div>
            <button style={{
              backgroundColor: COLORS.primary,
              color: COLORS.white,
              border: "none",
              borderRadius: "50px",
              padding: "6px 16px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
            }}>
              Unirse
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeNav) {
      case "Inicio": return renderHome();
      case "Semanas": return renderWeeks();
      case "Consejos": return renderTips();
      case "Herramientas": return renderTools();
      case "Comunidad": return renderCommunity();
      default: return renderHome();
    }
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => navigateTo("Inicio")}>
          <div style={styles.logoIcon}>🌸</div>
          <span style={styles.logoText}>BabyCenter</span>
        </div>
        <button style={styles.menuBtn} onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
          <div style={styles.menuLine} />
          <div style={styles.menuLine} />
          <div style={styles.menuLine} />
        </button>
      </header>

      {/* Drawer overlay */}
      <div style={styles.overlay} onClick={() => setMenuOpen(false)} />

      {/* Drawer */}
      <div style={styles.drawer}>
        <div style={styles.drawerHeader}>
          <div style={styles.drawerAvatar}>🤰</div>
          <div>
            {/* TODO: Mostrar nombre real del usuario autenticado */}
            <p style={styles.drawerName}>Mi perfil</p>
            <p style={styles.drawerSub}>Semana {currentWeekData.week} • Trimestre {currentWeekData.trimester}</p>
          </div>
        </div>
        <nav style={styles.drawerNav}>
          {NAVIGATION.map((item, i) => (
            <div
              key={item}
              style={styles.drawerNavItem(activeNav === item)}
              onClick={() => navigateTo(item)}
            >
              <span style={styles.drawerNavIcon}>{navIcons[i]}</span>
              <span style={styles.drawerNavText(activeNav === item)}>{item}</span>
            </div>
          ))}
        </nav>
        <div style={{ padding: "16px", borderTop: `1px solid ${COLORS.border}` }}>
          <p style={{ fontSize: "12px", color: COLORS.textMuted, textAlign: "center" }}>
            BabyCenter © 2025 · La app #1 de embarazo
          </p>
        </div>
      </div>

      {/* Main content */}
      <main style={styles.mainContent}>
        {renderContent()}
      </main>

      {/* Bottom navigation */}
      <nav style={styles.bottomNav}>
        {NAVIGATION.map((item, i) => (
          <button
            key={item}
            style={styles.bottomNavItem(activeNav === item)}
            onClick={() => navigateTo(item)}
            aria-label={item}
          >
            <div style={styles.bottomNavDot(activeNav === item)} />
            <span style={styles.bottomNavIcon(activeNav === item)}>{navIcons[i]}</span>
            <span style={styles.bottomNavLabel(activeNav === item)}>{item}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}