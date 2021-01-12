<template>
  <modal closeInCurtain header>
      <section v-if="!termino">
          <embed src="terminos.pdf" type="application/pdf" width="100%" height="1000px"/>
      </section>
      <section v-else>
              <div>
        <ul>
            <li>
                <label for="email">Email</label>
                <input v-model="form.email" type="email" @blur="formatoEmail()" placeholder="Tu email" :disabled="pagando ? 'disabled': null"/>
            </li>
            <li>
                <label for="cardNumber">Número de tarjeta:</label>
                <div class="tarjeta">
                    <input v-model="form.cardNumber" @keyup="guessingPaymentMethod()" @blur="guessingPaymentMethod()" type="text" placeholder="0000 0000 0000 0000" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off  :disabled="pagando ? 'disabled': null"/>
                    <img v-if="thumbnai" :src="thumbnai"/>
                </div>
            </li>
            <li>
                <label for="securityCode">Código de seguridad:</label>
                <input v-model="form.securityCode" type="text" placeholder="000" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off  :disabled="pagando ? 'disabled': null"/>
            </li>
            <li>
                <label for="cardExpirationMonth">Expira:</label>
                <div class="fecha">
                    <input v-model.number="form.cardExpirationMonth" @blur="formatoMes()" type="number" min="1" max="12" placeholder="Mes" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off  :disabled="pagando ? 'disabled': null"/>
                    <span>/</span>
                    <input v-model.number="form.cardExpirationYear"  @blur="formatoAño()" type="number" min="2019" max="2050" placeholder="Año" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off  :disabled="pagando ? 'disabled': null"/>
                </div>
            </li>
            <li>
                <label for="cardholderName">Nombre del titular de la tarjeta:</label>
                <input v-model="form.cardholderName" type="text" placeholder="Nombre"  :disabled="pagando ? 'disabled': null"/>
            </li>
            <li>
                <label for="docType">Tipo de documento:</label>
                <select v-model="form.docType" data-checkout="docType" :disabled="pagando ? 'disabled': null"></select>
            </li>
            <li>
                <label for="docNumber">Número de documento:</label>
                <input v-model="docNumber" @blur="formatoDoc" type="text" placeholder="Nº de documento"  :disabled="pagando ? 'disabled': null"/>
            </li>
        </ul>

        <span v-if="error" class="error">{{error}}</span>
        <br/>
        <spinner-circular v-if="pagando"/>
        <button v-else @click="pagar()" class="accion">Pagar</button>
    </div>
      </section>
  </modal>
</template>

<script>
export default {
    name: 'pago',
    data: () => ({

    }),
    components: {
        modal: () => import('../../components/modal'),
    }


}
</script>

<style scoped>

</style>