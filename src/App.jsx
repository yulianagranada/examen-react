import { useState, useEffect, useMemo } from "react";
import { players } from "./data/players";
import SearchBar from "./components/SearchBar/searchbar.jsx";
import SearchHistory from "./components/SearchHistory/SearchHistory.jsx";
import PlayerTable from "./components/PlayerTable/PlayerTable.jsx";
import Pagination from "./components/Pagination/Pagination.jsx";
import StatsPanel from "./components/StatsPanel/StatsPanel.jsx";
import Modal from "./components/Modal/Modal.jsx";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle.jsx";

function App() {
  // -----------------------------
  // 🔍 BUSQUEDA + DEBOUNCE
  // -----------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // -----------------------------
  // 🕘 HISTORIAL
  // -----------------------------
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (debouncedSearch.trim().length > 2) {
      setSearchHistory((prev) => {
        const updated = [debouncedSearch, ...prev.filter((i) => i !== debouncedSearch)];
        const final = updated.slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(final));
        return final;
      });
    }
  }, [debouncedSearch]);

  // -----------------------------
  // ⭐ FAVORITOS
  // -----------------------------
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // -----------------------------
  // 🌙 MODO OSCURO
  // -----------------------------
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // -----------------------------
  // ↕️ ORDENAMIENTO
  // -----------------------------
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "none" });

  const handleSort = (column) => {
    setSortConfig((prev) => {
      if (prev.key === column) {
        if (prev.direction === "none") return { key: column, direction: "asc" };
        if (prev.direction === "asc") return { key: column, direction: "desc" };
        return { key: null, direction: "none" };
      }
      return { key: column, direction: "asc" };
    });
  };

  // -----------------------------
  // FILTRO DE BUSQUEDA
  // -----------------------------
  const filteredPlayers = useMemo(() => {
    let result = players.filter((p) =>
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    if (showOnlyFavorites) {
      result = result.filter((p) => favorites.includes(p.id));
    }

    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [debouncedSearch, showOnlyFavorites, favorites, sortConfig]);

  // -----------------------------
  // 📄 PAGINACIÓN
  // -----------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, itemsPerPage]);

  const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPlayers = filteredPlayers.slice(startIndex, startIndex + itemsPerPage);

  // -----------------------------
  // 🎨 COLOREO DE FILAS
  // -----------------------------
  const [rowColors, setRowColors] = useState("none");

  // -----------------------------
  // 🧠 ESTADÍSTICAS (useMemo)
  // -----------------------------
  const stats = useMemo(() => {
    const total = filteredPlayers.length;
    const avgAge =
      total > 0
        ? filteredPlayers.reduce((acc, p) => acc + p.age, 0) / total
        : 0;

    const topScorer = filteredPlayers.reduce(
      (max, p) => (p.goals > max.goals ? p : max),
      filteredPlayers[0] || { name: "N/A", goals: 0 }
    );

    const positions = {};
    filteredPlayers.forEach((p) => {
      positions[p.position] = (positions[p.position] || 0) + 1;
    });

    return { total, avgAge, topScorer, positions };
  }, [filteredPlayers]);

  // -----------------------------
  // 🔍 MODAL
  // -----------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const openModal = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <header className="app-header">
        <h1> Jugadores de Fútbol</h1>
  
        <p className="subtitle">
          Busca tus jugadores favoritos, analiza estadísticas y visualiza su rendimiento.
        </p>

        <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      </header>

      <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={() => setSearchTerm("")}
        resultsCount={filteredPlayers.length}
      />

      <button onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}>
        {showOnlyFavorites ? "Mostrar todos" : "Mostrar solo favoritos"}
      </button>

      <SearchHistory
        history={searchHistory}
        onSelectSearch={(term) => setSearchTerm(term)}
        onClearHistory={() => {
          setSearchHistory([]);
          localStorage.removeItem("searchHistory");
        }}
      />

      <div>
        <button onClick={() => setRowColors("pares")}>Pintar Pares</button>
        <button onClick={() => setRowColors("impares")}>Pintar Impares</button>
        <button onClick={() => setRowColors("none")}>Limpiar Colores</button>
      </div>

      <StatsPanel stats={stats} />

      <PlayerTable
        players={currentPlayers}
        onRowClick={openModal}
        onSort={handleSort}
        sortConfig={sortConfig}
        darkMode={darkMode}
        rowColors={rowColors}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        totalItems={filteredPlayers.length}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} player={selectedPlayer} />
    </div>
  );
}

export default App;

