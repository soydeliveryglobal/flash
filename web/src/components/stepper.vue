<template>
  <article id="stepper" v-if="!approved">
    <template v-for="(step, i) in steps">
      <section :key="step.id" @click="ir(step)">
        <!-- {{step.ilustracion}} -->
        <img
          v-show="step.active"
          :src="require(`../assets/ilustraciones/${step.ilustracion}.png`)"
          :class="step.ilustracion"
        />
        <div class="title">
          <h1 v-if="step.active">{{ step.title }}</h1>
          <p v-if="step.active" v-html="step.subtitle"></p>
        </div>
        <div class="item">
          <span class="line" :class="i == 0 ? 'nb' : ''"></span>
          <span class="name active" v-if="step.active"></span>
          <span class="name">{{ step.active ? step.name : null }}</span>
          <span class="line" :class="i == steps.length - 1 ? 'nb' : ''"></span>
        </div>
      </section>
    </template>
    <span class="version">{{ version }}</span>
  </article>

  <!-- SI YA ESTA APROBADO -->
  <article id="stepper" v-else>
    <template v-for="(step, i) in steps">
      <section :key="i">
        <img
          v-if="i == 0"
          src="@/assets/ilustraciones/Ilustracion_chocan_los_cinco.png"
          class="stepper_finalStep"
        />
        <div class="title"></div>
      </section>
    </template>
    <span class="version">{{ version }}</span>
  </article>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "stepper",
  props: {
    steps: {
      type: Array,
      required: true,
    },
  },
  data: () => ({}),
  methods: {
    ir(view) {
      console.log(view.i);
      this.$store.dispatch("ir", view.id);
      // if(res)
      //     this.$router.push({name:view.view})
    },
  },
  computed: {
    //************* MAPEO DE STORE ************
    ...mapState({
      steps: (state) => state.steps,
      datosQuery: (state) => state.datosQuery,
      approved: (state) => state.approved,
    }),
    version() {
      return process.env.VUE_APP_VERSION;
    },
  },
};
</script>

<style scoped>
#stepper {
  height: 100%;
  width: 100%;
  padding: 40px;
  /* position: relative; */
}
#stepper section {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: calc(100% / 4);
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

#stepper section .title {
  width: 80%;
  text-align: right;
}

#stepper section .title h1 {
  color: #fff;
  text-transform: capitalize;
  margin-bottom: 5px;
}
#stepper section .title p {
  color: #fff;
  font-size: 0.7em;
}

#stepper section .item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  height: 100%;
  align-items: center;
  position: relative;
  z-index: 10;
}

#stepper .item .line {
  background-color: #fff;
  width: 3px;
  height: 45%;
}

#stepper .line.nb {
  background-color: transparent;
}
#stepper .name {
  background-color: #fff;
  padding: 10px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  position: relative;
  line-height: 12px;
  color: #ff9900;
  font-weight: 800;
  z-index: 2;
  display: grid;
  place-content: center;
}
#stepper .version {
  color: #fff;
  width: 100%;
  text-align: right;
}
#stepper .name.active {
  background-color: #fffa;
  padding: 10px;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  display: block;
  position: absolute;
  top: calc(50% - 22.5px);
  left: calc(50% - 22.5px);
  z-index: 1;
}
.Ilustracion_chica_con_caja,
.Ilustración_chico_con_celular,
.Ilustración_siluetas-blancas_camión-y-moto,
.Ilustración_siluetas-blancas_tarjetas,
.stepper_finalStep {
  position: absolute;
}
.Ilustracion_chica_con_caja,
.Ilustración_chico_con_celular,
.stepper_finalStep {
  bottom: 0;
  left: -30px;
}
.Ilustración_siluetas-blancas_camión-y-moto {
  top: 35%;
  width: 300px;
}
.Ilustración_siluetas-blancas_tarjetas {
  top: 60%;
  width: 170px;
  left: calc(50% - 85px);
}
.stepper_finalStep {
  bottom: 0;
}

@media screen and (max-width: 750px) {
  .title {
    /* position: absolute;
        top: 75px;
        left: 20%; */
    display: none;
  }

  #stepper {
    height: 90%;
  }

  #stepper section .title h1 {
    color: #2c3e50;
  }
  #stepper section .item {
    width: 100%;
  }
  .Ilustracion_chica_con_caja,
  .Ilustración_chico_con_celular,
  .Ilustración_siluetas-blancas_camión-y-moto,
  .Ilustración_siluetas-blancas_tarjetas,
  .stepper_finalStep {
    display: none;
  }
}

/* ------------RESPONSIVE ILUSTRACIONES------------ */
@media screen and (max-width: 1360px) {
  .Ilustración_siluetas-blancas_camión-y-moto {
    width: 270px;
  }
}
@media screen and (max-width: 1265px) {
  .Ilustracion_chica_con_caja {
    width: 316px;
  }
  .Ilustración_chico_con_celular {
    width: 360px;
  }
  .Ilustración_siluetas-blancas_camión-y-moto {
    width: 240px;
  }
  .stepper_finalStep {
    width: 500px;
  }
}
@media screen and (max-width: 1130px) {
  .Ilustración_siluetas-blancas_camión-y-moto {
    width: 210px;
  }
  .stepper_finalStep {
    width: 450px;
  }
}

@media screen and (max-width: 1061px) {
  .Ilustracion_chica_con_caja {
    width: 250px;
  }
  .Ilustración_chico_con_celular {
    width: 300px;
  }
  .Ilustración_siluetas-blancas_camión-y-moto {
    width: 180px;
    left: 20px;
  }
  .Ilustración_siluetas-blancas_tarjetas {
    width: 140px;
    left: calc(50% - 70px);
  }
  .stepper_finalStep {
    width: 400px;
  }
}
@media screen and (max-width: 980px) {
    .stepper_finalStep {
    width: 350px;
  }
}

@media screen and (max-width: 900px) {
  .Ilustracion_chica_con_caja {
    width: 220px;
  }
  .Ilustración_chico_con_celular {
    width: 275px;
  }
  .Ilustración_siluetas-blancas_camión-y-moto {
    width: 150px;
  }
  .Ilustración_siluetas-blancas_tarjetas {
    width: 120px;
    left: calc(50% - 60px);
  }
  .stepper_finalStep {
    width: 250px;
  }
}
</style>