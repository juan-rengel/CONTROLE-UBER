import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [meta, setMeta] = useState(() => parseFloat(localStorage.getItem("meta")) || 0);
  const [ganhos, setGanhos] = useState(() => JSON.parse(localStorage.getItem("ganhos")) || []);
  const [gastos, setGastos] = useState(() => JSON.parse(localStorage.getItem("gastos")) || []);
  const [valorDia, setValorDia] = useState("");
  const [gastoDia, setGastoDia] = useState("");

  // Calcula totais
  const totalGanhos = ganhos.reduce((a, b) => a + b, 0);
  const totalGastos = gastos.reduce((a, b) => a + b, 0);
  const lucroLiquido = totalGanhos - totalGastos;
  const progresso = meta > 0 ? Math.min((lucroLiquido / meta) * 100, 100) : 0;

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("meta", meta);
    localStorage.setItem("ganhos", JSON.stringify(ganhos));
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [meta, ganhos, gastos]);

  const adicionarGanho = () => {
    const valor = parseFloat(valorDia);
    if (!isNaN(valor) && valor > 0) {
      setGanhos([...ganhos, valor]);
      setValorDia("");
    }
  };

  const adicionarGasto = () => {
    const valor = parseFloat(gastoDia);
    if (!isNaN(valor) && valor > 0) {
      setGastos([...gastos, valor]);
      setGastoDia("");
    }
  };

  const resetar = () => {
    if (window.confirm("Deseja limpar todos os dados?")) {
      setMeta(0);
      setGanhos([]);
      setGastos([]);
      localStorage.clear();
    }
  };

  return (
    <div className="container">
      <h1>🚗 Controle de Corridas</h1>

      <div className="card">
        <h3>Meta Mensal (R$)</h3>
        <input
          type="number"
          value={meta}
          onChange={(e) => setMeta(parseFloat(e.target.value) || 0)}
          placeholder="Ex: 5000"
        />
      </div>

      <div className="card">
        <h3>Adicionar Ganho Diário</h3>
        <input
          type="number"
          value={valorDia}
          onChange={(e) => setValorDia(e.target.value)}
          placeholder="Ex: 250"
        />
        <button onClick={adicionarGanho}>+ Adicionar</button>
      </div>

      <div className="card">
        <h3>Adicionar Gasto com Gasolina</h3>
        <input
          type="number"
          value={gastoDia}
          onChange={(e) => setGastoDia(e.target.value)}
          placeholder="Ex: 100"
        />
        <button onClick={adicionarGasto}>+ Adicionar</button>
      </div>

      <div className="resumo card">
        <h3>Resumo do Mês</h3>
        <p><b>Ganhos:</b> R$ {totalGanhos.toFixed(2)}</p>
        <p><b>Gastos:</b> R$ {totalGastos.toFixed(2)}</p>
        <p><b>Lucro Líquido:</b> R$ {lucroLiquido.toFixed(2)}</p>

        <div className="barra">
          <div className="progresso" style={{ width: `${progresso}%` }}></div>
        </div>
        <p>{progresso.toFixed(1)}% da meta</p>

        <button className="resetar" onClick={resetar}>🧹 Limpar Tudo</button>
      </div>
    </div>
  );
}

export default App;
