// js/app.js
let currentGroupId = null;

function $(q){ return document.querySelector(q); }
function $all(q){ return [...document.querySelectorAll(q)]; }

async function requireSession(){
  const { data } = await sb.auth.getSession();
  if (!data?.session) window.location.href = "./index.html";
  return data.session;
}

async function loadMyGroups(){
  // Si es master: verá todos los groups por policy; si no, solo los suyos.
  const { data: groups, error } = await sb.from("groups").select("id,name").order("name");
  if (error) throw error;

  const sel = $("#groupSelect");
  sel.innerHTML = "";
  groups.forEach(g=>{
    const opt = document.createElement("option");
    opt.value = g.id;
    opt.textContent = g.name;
    sel.appendChild(opt);
  });

  currentGroupId = groups[0]?.id ?? null;
  sel.value = currentGroupId ?? "";
  sel.addEventListener("change", ()=> {
    currentGroupId = sel.value;
    renderView($(".tab.active").dataset.view);
  });
}

function renderView(view){
  const el = $("#view");
  if (!currentGroupId){
    el.innerHTML = `<p class="muted">No tenés grupo asignado aún.</p>`;
    return;
  }

  if (view === "attendance"){
    el.innerHTML = `
      <h2>Asistencia</h2>
      <p class="muted small">Grupo: ${currentGroupId}</p>
      <button class="btn" id="addAttendance">Agregar asistencia</button>
      <div id="list" class="muted small" style="margin-top:10px;">(lista aquí)</div>
    `;
    $("#addAttendance").onclick = async ()=>{
      const activity_name = prompt("Actividad:");
      if (!activity_name) return;
      const activity_date = new Date().toISOString().slice(0,10);

      const { data: s } = await sb.auth.getSession();
      const created_by = s.session.user.id;

      const { error } = await sb.from("attendance").insert([{
        group_id: currentGroupId,
        activity_date,
        activity_name,
        attendees_count: 0,
        created_by
      }]);
      if (error) alert(error.message);
      else alert("Guardado.");
    };
    return;
  }

  el.innerHTML = `<h2>${view}</h2><p class="muted">Módulo en construcción.</p>`;
}

(async function init(){
  const session = await requireSession();
  $("#who").textContent = session.user.email ?? "";

  $("#logout").onclick = async ()=>{
    await sb.auth.signOut();
    window.location.href = "./index.html";
  };

  await loadMyGroups();

  $all(".tab").forEach(b=>{
    b.addEventListener("click", ()=>{
      $all(".tab").forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      renderView(b.dataset.view);
    });
  });

  renderView("attendance");
})();
