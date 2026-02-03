// js/auth.js
(async function () {
  const btn = document.getElementById("btnGoogle");
  const msg = document.getElementById("msg");

  const { data: session } = await sb.auth.getSession();
  if (session?.session) window.location.href = "./app.html";

  btn.addEventListener("click", async () => {
    msg.textContent = "Abriendo Google...";
    const redirectTo = window.location.origin + "/app.html";

    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo }
    });

    if (error) msg.textContent = "Error: " + error.message;
  });
})();
