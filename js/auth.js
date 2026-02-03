// js/auth.js
(async function () {
  const btn = document.getElementById("btnGoogle");
  const msg = document.getElementById("msg");

  const { data: session } = await sb.auth.getSession();
  if (session?.session) window.location.href = "./app.html";

  btn.addEventListener("click", async () => {
    msg.textContent = "Abriendo Google...";
    const redirectTo = new URL("app.html", window.location.href).toString();

    console.log("SUPABASE_URL =", SUPABASE_URL);
    console.log("redirectTo =", redirectTo);
    
    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo }
    });

    if (error) msg.textContent = "Error: " + error.message;
  });
})();
