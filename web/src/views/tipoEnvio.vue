<template>
	<article id="delivery">
		
		<section>
			<label class="container" v-if="Express">
				<span>Express</span>
				<input type="radio" name="tipoEnvio" id="" value="1" v-model="model.deliveryType">
			</label>
			<label class="container">
				<span>Programado</span>
				<input type="radio" name="tipoEnvio" id="" value="2" v-model="model.deliveryType">
				<span class="checkmark"></span>
			</label>
		</section>
		<section>
			<label>
				<span>Elige el vehículo</span>
				<select name="vehiculo" id="vehiculo" v-model="model.vehicleType" @blur="dataValid.vehicleType.touch=true">
					<option :value="v.NegocioTipoVehiculoId" v-for="v in vehiculos" :key="v.NegocioTipoVehiculoId">{{v.NegocioTipoVehiculoNombre}}</option>
				</select>
				<small v-if="msjErrorVehiculo.length>0">{{msjErrorVehiculo[0]}}</small>
			</label>
			<label v-if="model.deliveryType==2">
				<span>Fecha de servicio</span>
				<input type="date" name="" id="" v-model="model.serviceDate" :min="minDate" @change="refreshSchedule">
				<small v-if="msjErrorFecha.length>0">{{msjErrorFecha[0]}}</small>
			</label>
			<label  v-if="model.deliveryType==2">
				<span>Franja horaria</span>
				<select v-if="franjas.length==0" >
					<option value="-1" selected>No hay Horarios Disponibles para esta fecha</option>

				</select>
				<select name="franja" id="franja" v-model="model.schedule" v-else>
					<option :value="f.NegocioFranjaId" v-for="(f,i) in franjas" :key="f.NegocioFranjaId" :selected="i==0">{{f.NegocioFranjaDescripcion}} </option>
				</select>
				<small v-if="msjErrorFranja.length>0">{{msjErrorFranja[0]}}</small>
			</label>
		</section>
		<section>
			<label>
				<span>Detalle Lugar de Origen</span>
				<strong>{{direccionOrigen.street}}, {{direccionOrigen.streetNumber}}</strong>
				<textarea id="observacionOrigen" rows="4"  v-model="model.observacionOrigen" placeholder="Nro.Puerta, Edificio, Apto, referencia, etc. "></textarea>
				<small v-if="msjErrorOrigen.length>0">{{msjErrorOrigen[0]}}</small>
			</label>
			<label >
				<span>Detalle Lugar de Destino</span>
				<strong >{{direccionDestino.street}}, {{direccionDestino.streetNumber}}</strong>
				<textarea id="observacionDestino" rows="4"  v-model="model.observacionDestino" placeholder="Nro.Puerta, Edificio, Apto, referencia, etc."></textarea>
				<small v-if="msjErrorDestino.length>0">{{msjErrorDestino[0]}}</small>
			</label>
		</section>
	</article>
</template>

<script>


// *********************  STORE-VUEX ****************************** //
import {mapState} from 'vuex'
export default {
	name: 'TipoEnvio',

	data: () => ({
		deliveryType: null,
		step:null,
		model: {
			deliveryType: null,
			vehicleType: null,
			schedule: null,
			serviceDate: null,
			observacionOrigen: null,
			observacionDestino: null
		},
		direccionOrigen: null,
		direccionDestino: null,
		dataValid:{}
	}),

	methods:{
		refreshSchedule(){
			console.log('fecha', this.$moment(this.model.serviceDate).format('YYYY-MM-DD'))
			this.$store.dispatch('getFranjas', this.$moment(this.model.serviceDate).format('YYYY-MM-DD'))
		}

	},

	computed:{
		...mapState({
			vehiculos: state => state.vehiculos,
			franjas: state => state.franjas,
			Express: state => state.Express
		}),
	
		msjErrorVehiculo(){
			const errors = []
			if (!this.dataValid.vehicleType.touch) return errors
			if(this.model.vehicleType==null || parseInt(this.model.vehicleType) < this.dataValid.vehicleType.min) errors.push('Seleccione una opción valida')
			return errors
		},
		msjErrorFecha(){
			const errors = []
			if (!this.dataValid.serviceDate.touch) return errors
			if(this.model.serviceDate==null || this.$moment(this.model.serviceDate) < this.$moment(this.dataValid.serviceDate.min)) errors.push('Seleccione una fecha valida')
			return errors
		},
		msjErrorFranja(){
			const errors = []
			if (!this.dataValid.schedule.touch) return errors
			if(this.model.schedule==null || parseInt(this.model.schedule) < this.dataValid.schedule.min) errors.push('Seleccione una opción valida')

			return errors
		},

		msjErrorOrigen(){
			const errors = []
			if (!this.dataValid.observacionOrigen.touch) return errors
			if(this.model.observacionOrigen==null&&this.model.observacionOrigen!='') errors.push('Especifique algún detalle del origen')
			return errors
		},

		msjErrorDestino(){
			const errors = []
			if (!this.dataValid.observacionDestino.touch) return errors
			if(this.model.observacionDestino==null&&this.model.observacionDestino!='') errors.push('Especifique algún detalle del destino')
			return errors
		},

		minDate(){
			return this.$moment().format('YYYY-MM-DD')
		},

		valid(){
			if(this.model.deliveryType==1){
				return this.model.vehicleType != null &&
						this.model.observacionDestino!=null&&
						this.model.observacionOrigen!=null&&
						this.msjErrorVehiculo.length==0 &&
						this.msjErrorDestino.length==0&&
						this.msjErrorOrigen.length==0
			}
			else{
				return this.model.vehicleType != null &&
					this.model.schedule !=null &&
					this.model.serviceDate !=null &&
					this.model.observacionDestino!=null&&
					this.model.observacionOrigen!=null&&
					this.msjErrorVehiculo.length==0&&
					this.msjErrorFecha.length==0&&
					this.msjErrorFranja.length==0&&
					this.msjErrorDestino.length==0&&
					this.msjErrorOrigen.length==0
			}
			
		},
		ready(){
			return this.franjas.length > 0 && this.vehiculos.length > 0
		}
	},
	watch:{
		'model.deliveryType'(){
			if(this.vehiculos.length>0)
				this.model.vehicleType = this.vehiculos[0].NegocioTipoVehiculoId
			if(this.franjas.length>0)
				this.model.schedule = this.franjas[0].NegocioFranjaId
			if(this.model.deliveryType==1){
				this.model.serviceDate = this.$moment().format('YYYY-MM-DD')
			}
		},


		// async valid(){
		// 	if(this.valid){
		// 		this.model.serviceDate = this.$moment(this.model.serviceDate).format('YYYY-MM-DD')
		// 		const data = {
		// 			id: 3,
		// 			data: {...this.model},
		// 		}
		// 		console.log(data)
		// 		await this.$store.dispatch('validateData', data)
		// 	}
			
		// },

		ready(){
			if(this.ready){
				if(!this.dataValid.vehicleType.touch)
					this.model.vehicleType = this.vehiculos[0].NegocioTipoVehiculoId
				if(!this.dataValid.schedule.touch && this.model.deliveryType==1)
					this.model.schedule = this.franjas[0].NegocioFranjaId
			}
		}
	},
	mounted(){
		this.model.deliveryType = this.model.deliveryType==2?this.Express?1:2:2

	},

	beforeMount(){
		this.step = {...this.$store.getters.getStep(3)}
		this.dataValid = {...this.step.dataValid}
		this.model = {...this.step.data}
		this.direccionOrigen = this.$store.state.steps.find(x=> x.id==1).data
		this.direccionDestino = this.$store.state.steps.find(x=> x.id==2).data
		
		
	},
	created(){
		window.event.$on('touchData', async function(){
			if(!this.valid){
				if(this.model.deliveryType==1){
					this.dataValid.serviceDate.touch = true 
				}
				else{
					this.dataValid.serviceDate.touch = true 
					this.dataValid.schedule.touch  = true
					this.dataValid.vehicleType.touch  = true
					this.dataValid.observacionOrigen.touch  = true
					this.dataValid.observacionDestino.touch  = true
				}
			}
			else{
				this.model.serviceDate = this.$moment(this.model.serviceDate).format('YYYY-MM-DD')
				const data = {
					id: 3,
					data: {...this.model},
				}
				console.log(data)
				await this.$store.dispatch('validateData', data)
			}
			
		}.bind(this))
	}

}
</script>

<style scoped>
	#delivery {
		display: flex;
		flex-flow: column nowrap;
	}
	#delivery figure{
		width: 100%;
		margin: 0;
		padding: 10px;
	}
	#delivery figure img {
		width: 50%;
		max-width: 250px;
		float: right;
	}
	#delivery section{
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		margin: 15px 0;

	}
	#delivery section label{
		width: 33%;
		max-width: 600px;
		min-width: 260px;
		padding: 10px;
		text-align: left;
		position: relative;
	}
	#delivery section:nth-of-type(3) label{
		width: 45%;
		max-width: 600px;
		min-width: 260px;
		padding: 10px;
		text-align: left;
		position: relative;
	}
	#delivery section:first-of-type label{
		width: max-content;
		min-width: unset;
	}
	#delivery section:nth-of-type(2) label,#delivery section:nth-of-type(3) label{
		display: flex;
		flex-direction: column;
	}
	#delivery select, #delivery section:nth-of-type(2) input {
		height: 35px;
		border-radius: 25px;
		border: none;
		border-bottom: 1px #dedede55 solid;
		margin-bottom: 10px;
		/* padding: 20px 80px; */
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
		padding: 0 10px
	}
	#delivery small{
		color: #cb3234;
		position:absolute;
		bottom: 5px;
	}

	#delivery strong{
		color:#2c3e50;
		text-transform: uppercase;
		font-size: 0.7em;
	}

	#delivery section label{
		Color: #ff7701;
		font-size: 1.2em;
		font-weight: 900;
	}

	#delivery textarea {
		border-radius: 5px;
		border: none;
		border-bottom: 1px #dedede55 solid;
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
		min-width: 260px;
		max-width: 600px;
		width: 100%;
	}

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	color: #31313155;
	opacity: 1; /* Firefox */
	}

	:-ms-input-placeholder { /* Internet Explorer 10-11 */
	color:  #31313155;
	}

	::-ms-input-placeholder { /* Microsoft Edge */
	color:  #31313155;
	}


	@media screen and (max-width: 750px) {
		#delivery section{
			margin: 30px 0;
			padding: 10px 10px;
		}
	}



	
</style>