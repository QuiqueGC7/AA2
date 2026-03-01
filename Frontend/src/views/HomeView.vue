<template>
  <div class="home">

    <!-- HERO -->
    <section class="hero">
      <h1>MiRestaurante</h1>
      <p>Cocina tradicional desde 1989</p>
      <router-link to="/products" class="btn">Ver la carta</router-link>
    </section>

    <!-- SOBRE NOSOTROS -->
    <section class="about">
      <h2>Sobre nosotros</h2>
      <p>
        Somos un restaurante familiar con más de 37 años de historia. Cocinamos
        con productos frescos de temporada y las recetas de siempre, porque creemos
        que la mejor cocina es la que sabe a casa.
      </p>
    </section>

    <hr class="divider" />

    <!-- HORARIO Y CONTACTO -->
    <section class="info">

      <div class="info-block">
        <h3>Horario</h3>
        <ul>
          <li><span>Lunes – Viernes</span><span>13:00–16:00 · 20:00–23:30</span></li>
          <li><span>Sábados</span><span>13:00–17:00 · 20:00–00:00</span></li>
          <li><span>Domingos</span><span>13:00–17:00</span></li>
          <li class="closed"><span>Martes</span><span>Cerrado</span></li>
        </ul>
      </div>

      <div class="info-block">
        <h3>Contacto</h3>
        <p>📍 Calle Mayor, 12 — Zaragoza</p>
        <p>📞 976 000 000</p>
        <p>✉️ reservas@mirestaurante.com</p>
      </div>

    </section>

  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Georgia, serif;
  color: #333;
}

/* Hero */
.hero {
  text-align: center;
  padding: 4rem 1rem;
  border-bottom: 1px solid #ddd;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
  color: #222;
}

.hero p {
  font-style: italic;
  color: #777;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-block;
  padding: 0.6rem 1.6rem;
  background: #8b4513;
  color: white;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.btn:hover { background: #6b3410; }

/* About */
.about {
  margin-bottom: 2.5rem;
}

.about h2 {
  font-size: 1.6rem;
  margin-bottom: 0.75rem;
  color: #222;
}

.about p {
  line-height: 1.8;
  color: #555;
}

/* Divider */
.divider {
  border: none;
  border-top: 1px solid #ddd;
  margin: 2.5rem 0;
}

/* Info */
.info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 600px) {
  .info { grid-template-columns: 1fr; }
}

.info-block h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #222;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.4rem;
}

.info-block ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-block ul li {
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0;
  font-size: 0.95rem;
  color: #555;
  border-bottom: 1px solid #f0f0f0;
}

.info-block ul li.closed span:last-child { color: #c0392b; }

.info-block p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: #555;
  font-family: Arial, sans-serif;
}
</style>