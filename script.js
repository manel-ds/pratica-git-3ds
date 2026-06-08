  const btnMais = document.getElementById("receita");
  const modal = document.getElementById("modal");
  const confirmar = document.getElementById("confirmarReceita");
  const input = document.getElementById("valorReceita");

  btnMais.addEventListener("click", function() {
    modal.style.display = "flex"; // mostra a modal
  });

  confirmar.addEventListener("click", function(){
    const valor = parseFloat(input.value).toFixed(2); // Define até 2 casas decimais após a virgula

    if (valor > 0) {
    const divReceita = document.querySelector(".receita");
    divReceita.innerHTML = `<h3> Receita </h3><div style="font-weight:bold; font-size: 1.2rem; background-color: #00cec9;color:green;padding:4px">R$ ${valor}</div>`;
    receita = parseFloat(valor); // <-- Novo: armazena receita
    atualizarTotais();           // <-- Atualiza o saldo

    modal.style.display = "none"; // fecha a modal
    input.value = ""; // limpa campo
    }
  });


// Fechar modal clicando fora (opcional)
modal.addEventListener("click", function(e) {
  if (e.target.id === "modal") {
    modal.style.display = "none";
  }
});

  // Seleciona elementos
  const btnMaisGasto = document.getElementById("mais");
  const modalGasto = document.getElementById("modal-gasto");
  const confirmarGasto = document.getElementById("confirmarGasto");

  // Abrir modal de gasto
  btnMaisGasto.addEventListener("click", function() {
    modalGasto.style.display = "flex";
  });

  // Confirmar e adicionar gasto
  confirmarGasto.addEventListener("click", function() {
    const desc = document.getElementById("descricaoGasto").value;
    const data = document.getElementById("dataGasto").value;
    const valor = parseFloat(document.getElementById("valorGasto").value).toFixed(2);

    if (desc && data && !isNaN(valor)) {
      const ul = document.querySelector(".gastos");

      // Criar elemento <li>
      const li = document.createElement("li");
      li.innerHTML = `
        <div style="display:flex; justify-content:space-around; align-items:center; gap: 10px; border-bottom: 1px solid #ccc; padding: 0.2rem 0;">
          <div>
            <span style="font-weight: bold">${desc}</span><br>
            <small>${data}</small><br>
          </div> 
          <div>
            <span style="color:#d63031;">R$ ${valor}</span>
          </div>
          <div style="display:flex; gap:15px;">
            <i class="fa-solid fa-check" style="color:green; cursor:pointer; font-size:1.4rem" title="Confirmar"></i>
          </div>
          <div style="display:flex; gap:15px;">
            <i class="fa-solid fa-trash" style="color:red; cursor:pointer;" font-size:1.4rem title="Excluir"></i>
          </div>
        </div>
      `;

      // Adicionar eventos aos ícones
  

    ul.appendChild(li);

        // Adiciona ao array e pega índice
    gastos.push({ valor: parseFloat(valor), confirmado: false });
    const gastoIndex = gastos.length - 1;

    // Agora sim: adicionar eventos aos ícones
    const [btnConfirmar, btnExcluir] = li.querySelectorAll("i");

    btnConfirmar.addEventListener("click", function () {
    li.style.opacity = 0.5;
    btnConfirmar.style.pointerEvents = "none";
    gastos[gastoIndex].confirmado = true;
    atualizarTotais();
    });

    btnExcluir.addEventListener("click", function () {
    gastos.splice(gastoIndex, 1);
    li.remove();
    atualizarTotais();
    });



      // Fechar modal e limpar campos
      modalGasto.style.display = "none";
      document.getElementById("descricaoGasto").value = "";
      document.getElementById("dataGasto").value = "";
      document.getElementById("valorGasto").value = "";
    }
  });

  // Fechar modal clicando fora
  modalGasto.addEventListener("click", (e) => {
    if (e.target.id === "modal-gasto") {
      modalGasto.style.display = "none";
    }
  });

  let receita = 0;
let gastos = []; // lista de objetos: { valor, confirmado }

const campoPrevisto = document.getElementById("previsto");
const campoEfetivado = document.getElementById("efetivado");
const campoSaldo = document.getElementById("saldo");

// Atualiza todos os campos de rodapé
function atualizarTotais() {
  const totalPrevisto = gastos.reduce((soma, g) => soma + g.valor, 0);
  const totalEfetivado = gastos
    .filter(g => g.confirmado)
    .reduce((soma, g) => soma + g.valor, 0);

  campoPrevisto.value = `R$ ${totalPrevisto.toFixed(2)}`;
  campoEfetivado.value = `R$ ${totalEfetivado.toFixed(2)}`;
  campoSaldo.value = `R$ ${(receita - totalPrevisto).toFixed(2)}`;
}
