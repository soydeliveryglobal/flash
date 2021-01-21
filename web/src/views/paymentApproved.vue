<template>
  <article>
  <CheckMark />
      <p class="paymentApproved__Thx">¡Gracias {{steps.find(x=> x.id==4).data.firstname}} {{steps.find(x=> x.id==4).data.lastname}}!</p>
      <p class="">Tu pedido ya fue coordinado para la franja horaria de <strong>{{franjas.find(y=>y.NegocioFranjaId==steps.find(x=> x.id==3).data.schedule).NegocioFranjaDescripcion.slice(2)}}.</strong> </p>
      <p class="">Te seguimos contando acerca de tu pedido por <strong>WhatsApp</strong> al número <strong>{{steps.find(x=> x.id==4).data.phone}}</strong> </p>
      <!-- <p class="">Tiempo estimado de entrega  <strong>15:15</strong> </p> -->
      <p class=""> <strong>Direccion envio:</strong> {{steps.find(x=> x.id==1).data.address}} ({{steps.find(x=> x.id==1).data.observacionOrigen}})</p>
      <p class=""> <strong>Direccion retiro:</strong> {{steps.find(x=> x.id==2).data.address}} ({{steps.find(x=> x.id==2).data.observacionDestino}}) </p>
      <p class=""> <strong>Vehículo:</strong> {{vehiculos.find(y=>y.NegocioTipoVehiculoId==steps.find(x=> x.id==3).data.vehicleType).NegocioTipoVehiculoNombre}}</p>

     

  </article>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'paymentApproved',
  components: {
	CheckMark:()=> import('@/components/loaders/animatedCheckMark.vue')
  },
	data: () => ({
    name:'sebastian',
    lastname:"labadie"
  }),
  computed:{
    ...mapState({
			tarifa: state => state.tarifa,
			datosQuery: state => state.datosQuery,
			steps: state => state.steps,
			vehiculos: state => state.vehiculos,
			franjas: state => state.franjas

		}),
  }
}
</script>

<style>
.paymentApproved__Thx{
  color:#ff9900;
  font-weight: 900;
  font-size: 26px;
  font-family: 'SimplySans Bold';
}
</style>