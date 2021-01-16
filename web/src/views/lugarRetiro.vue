<template>
  <article id="retiro">
      <!-- {{valid}} -->
	<!-- {{ model.observacionOrigen }} -->
<!-- 	<checkMark> </checkMark>	 -->
    <MapaGoogle title="Origen" title2="Complemento" :coods="model" @latLng="latLng" @observation="setObservation" @streetNumber="setStreetNumber" :showError="msjErrorDireccion.length>0" :errorMsg="msjErrorDireccion[0]" :showErrorConfirm="msjErrorConfirm.length>0" :errorMsgConfirm="msjErrorConfirm[0]" :numberStreet="model.streetNumberConfirmation?model.streetNumberConfirmation:''"/>
  </article>
</template>

<script>
// *********************  STORE-VUEX ****************************** //
import {mapState} from 'vuex'
export default {
  name: 'lugarRetiro',
  components: {
	MapaGoogle: () => import('@/components/mapa.vue'),
	/* checkMark:()=> import('@/components/loaders/animatedCheckMark.vue') */
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
			streetNumberConfirmation: '',
			observacionOrigen: "",
		},
		dataValid:{}
	}),
  computed:{
		...mapState({
			token: state => state.token,
			datosQuery: state => state.datosQuery
		}),
    msjErrorDireccion(){
			const errors = []
			if (!this.dataValid.coords.touch) return errors
			if(this.model.lat==null || this.model.lng==null) errors.push('Verifique la dirección de origen')
			return errors
    },
    msjErrorConfirm(){
			const errors = []
			if (!this.dataValid.streetNumberConfirmation.touch) return errors
			if(this.model.streetNumberConfirmation==null&&this.model.streetNumberConfirmation!='') errors.push('Confirme el número de puerta')
			return errors
    },
    valid(){
			return this.model.lat!=null&&this.model.lng!=null && this.model.streetNumberConfirmation!=null  && this.model.streetNumberConfirmation!='' 
		}
  },
  watch:{
		
    'model.lat'(){
        this.validModel()
    },
    'model.lng'(){
        this.validModel()
	},
	'model.observacionOrigen'(){
        this.validModel()
    },
    'model.streetNumberConfirmation'(){
        this.validModel()
    },

	},
  methods:{
    latLng(position){
      this.model={...position,streetNumberConfirmation:this.model.streetNumberConfirmation,observacionOrigen:this.model.observacionOrigen}
    },
    async validModel(){
        // window.event.$emit('showSpinner', true)

        if(this.valid){
          const data = {
            id: 1,
            data: {...this.model}
		}
		console.log('diske model',data)
		await this.$store.dispatch('validateData', data)
        // window.event.$emit('showSpinner', false)
		
      }
    },
    setStreetNumber(streetNumber){
      this.model.streetNumberConfirmation = streetNumber
	},
	setObservation(observation){
      this.model.observacionOrigen = observation
    }
  },
  beforeMount(){
    this.step = {...this.$store.getters.getStep(1)}
    this.dataValid = {...this.step.dataValid}
    this.model = {...this.step.data}
	console.log('mount: ',this.$store.getters.getStep(1))
  },
  created(){
    window.event.$on('touchData', function(){
			if(!this.valid){
				this.dataValid.coords.touch = true
				this.dataValid.streetNumberConfirmation.touch = true
				this.dataValid.observacionOrigen.touch = true
			}
			
		}.bind(this))
  },
	async mounted(){
		
		//Leer QueryString
		if(this.datosQuery.status){
			this.$router.push({ path: '/', query: {...this.datosQuery}})
			// this.$route.query = {...this.datosQuery}
		}
		let datos=this.$route.query

		if ( datos.Negocio_Cliente && 
			datos.ApiId && 
			datos.ApiKey && 
			datos.Nombre_Cliente && 
			datos.RUT && 
			datos.email && 
			datos.Telefono_cliente,
			datos.mercadopago) {
			//?Negocio_Cliente=24&ApiId=52189964&ApiKey=ZBVpOqHHTkQSVSdeRIKXZj6W2glkEgQo&Nombre_cliente=SoyDelivery&RUT=0&email=emiliano.campon%40gmail.com&Telefono_cliente=093310823&mercadopago=n
			datos.status = true
			this.$store.commit('setDatosQuery', datos)
		}
		else{
			let datos2 = {
				ApiId: 26591905,//52189964,
				ApiKey: '8IZpbJXXwiFpFNdgR2Bf1My9LDBWlJwX',//'ZBVpOqHHTkQSVSdeRIKXZj6W2glkEgQo',
				status: false
			}
			this.$store.commit('setDatosQuery', datos2)
		}
		if(this.token==null){
			await this.$store.dispatch('getToken')
		}

	}

}
</script>

<style scoped>
	#retiro{
		overflow: hidden;
	}
	#retiro>>>label {
		Color: #ff7701;
		font-size: 1.2em;
		font-weight: 900;
	}
	#retiro>>>input {
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
		padding: 0 10px
	}
</style>