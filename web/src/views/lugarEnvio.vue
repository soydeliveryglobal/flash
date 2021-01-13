<template>
  <article id="origen">
    <MapaGoogle title="Destino" title2="Complemento" :coods="model" @latLng="latLng" @streetNumber="setStreetNumber" :showError="msjErrorDireccion.length>0" :errorMsg="msjErrorDireccion[0]" :showErrorConfirm="msjErrorConfirm.length>0" :errorMsgConfirm="msjErrorConfirm[0]" :numberStreet="model.streetNumberConfirmation?model.streetNumberConfirmation:''"/>
  </article>
</template>

<script>
// *********************  STORE-VUEX ****************************** //
import {mapState} from 'vuex'
export default {
  name: 'lugarEnvio',
  components: {
    MapaGoogle: () => import('@/components/mapa.vue')
  },
  data: () => ({
		step:null,
		model: {
      lat: null,
      lng: null,
      address: null,
      departamento: null,
      localidad: null,
      street: null,
      streetNumber: null,
      streetNumberConfirmation: ''
		},
		dataValid:{}
  }),
  computed:{
		...mapState({
			vehiculos: state => state.vehiculos,
			franjas: state => state.franjas,
			Express: state => state.Express
    }),
    msjErrorDireccion(){
			const errors = []
			if (!this.dataValid.coords.touch) return errors
			if(this.model.lat==null || this.model.lng==null) errors.push('Verifique la dirección de destino')
			return errors
    },
    msjErrorConfirm(){
			const errors = []
			if (!this.dataValid.streetNumberConfirmation.touch) return errors
			if(this.model.streetNumberConfirmation==null&&this.model.streetNumberConfirmation!='') errors.push('Confirme el número de puerta')
			return errors
    },
    valid(){
			return this.model.lat!=null&&this.model.lng!=null/*  && this.model.streetNumberConfirmation!=null &&this.model.streetNumberConfirmation!='' */
		}
  },
  watch:{
    'model.lat'(){
      this.validModel()
    },
    'model.lng'(){
        this.validModel()
    },
    'model.streetNumberConfirmation'(){
      console.log(this.model.streetNumberConfirmation)
        this.validModel()
    },
		async valid(){
      if(this.valid){
        const data = {
          id: 2,
          data: {...this.model}
        }
        await this.$store.dispatch('validateData', data)
      }
			
		}
	},
  methods:{
   latLng(position){
      this.model={...position,streetNumberConfirmation:this.model.streetNumberConfirmation}
    },
    async validModel(){
      
        if(this.valid){
          const data = {
            id: 2,
            data: {...this.model}
        }
        await this.$store.dispatch('validateData', data)
      }
    },
    setStreetNumber(streetNumber){
      this.model.streetNumberConfirmation = streetNumber
    }
  },
  beforeMount(){
    this.step = {...this.$store.getters.getStep(2)}
    this.dataValid = {...this.step.dataValid}
    this.model = {...this.step.data}

  },
  created(){
    window.event.$on('touchData', function(){
			if(!this.valid){
        this.dataValid.coords.touch = true 
        this.dataValid.streetNumberConfirmation.touch = true

			}
			
    }.bind(this))
        //Leer QueryString

  },

}
</script>

<style scoped>
	#origen{
		overflow: hidden;
	}
	#origen>>>label {
		Color: #ff7701;
		font-size: 1.2em;
		font-weight: 900;
	}
	#origen>>>input {
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
		padding: 0 10px
	}
</style>