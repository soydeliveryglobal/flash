<template>
    <article id="payment">
		<section class="header">
			<h1>Completa tus datos</h1>
			<div>
				<p>Tarifa</p>
				<p>$U {{parseInt(tarifa)}}</p>
			</div>
		</section>
		<section class="clientType">
			<label>
				<span>Consumidor final</span>
				<input type="radio" name="tipo" id="" value="1" v-model="tipoPersona" :disabled="datosQuery.status">
			</label>
			<label>
				<span>Empresa</span>
				<input type="radio" name="tipo" id="" value="2" v-model="tipoPersona">
			</label>
		</section>
		<section>
			<label>
				<span>{{tipoPersona==1?'Nombre':'Razón social'}}</span>
				<input type="text" name="firstname" id="firstname" v-model="model.firstname" :disabled="datosQuery.status" >
				<small v-if="msjErrorNombre.length>0">{{msjErrorNombre[0]}}</small>
			</label>
			<label v-if="tipoPersona==1">
				<span>Apellido</span>
				<input type="text" name="lastname" id="lastname" v-model="model.lastname" >
				<small v-if="msjErrorApellido.length>0">{{msjErrorApellido[0]}}</small>
			</label>
			<label v-else>
				<span>RUT</span>
				<input type="text" name="rut" id="rut" v-model="model.rut" :disabled="datosQuery.status">
				<small v-if="msjErrorRut.length>0">{{msjErrorRut[0]}}</small>
			</label>
			<label>
				<span>Email</span>
				<input type="text" name="email" id="email" v-model="model.email" :disabled="datosQuery.status">
				<small v-if="msjErrorCorreo.length>0">{{msjErrorCorreo[0]}}</small>
			</label>
			<label>
				<span>Celular</span>
				<input type="text" name="phone" id="phone" v-model="model.phone" :disabled="datosQuery.status">
				<small v-if="msjErrorCelular.length>0">{{msjErrorCelular[0]}}</small>
			</label>
		</section>
		<button @click="modalPago" class="bPago">{{datosQuery.status? 'CONFIRMAR': 'PAGAR'}}</button>
		<modal v-if="pago" @cerrar="cerrarModal" >
			<div slot="contenido" id="contenido">
				<div v-show="!terminos">
					<embed src="terminos.pdf" type="application/pdf" />
					<label>
						<input type="checkbox" name="terminos" id="terminos" v-model="terminos">
						<span>He leído y acepto los términos y condiciones</span>
					</label>
				</div>
				<div v-show="terminos && !datosQuery.status">
						<ul>
							<li>
								<label for="email">Email</label>
								<input v-model="form.email" type="email" @blur="formatoEmail()" placeholder="Tu email" :disabled="pagando ? 'disabled': null"/>
							</li>
							<li>
								<label for="cardNumber">Número de tarjeta:</label>
								<div class="tarjeta">
									<input v-model="form.cardNumber" @keyup="guessingPaymentMethod()" @blur="guessingPaymentMethod()" type="text" placeholder="0000 0000 0000 0000" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off  :disabled="pagando ? 'disabled': null"/>
									{{form.cardNumber}}
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
							<li >
								<div></div>
								<button  @click="pagar()" class="bPago" style="width: 100%;" >Procesar pago</button>
							</li>
						</ul>
						<!-- <span v-if="error" class="error">{{error}}</span> -->
						<!-- <spinner-circular v-if="pagando"/> -->
				</div>
				<div v-show="terminos && datosQuery.status && !yaProceso">
					<h2>RESUMEN</h2>
					<ul>
						<li class="fondo">
							<p><strong>ORIGEN: </strong></p>
							<p>{{steps.find(x=> x.id==1).data.address}} <span>DETALLE: {{steps.find(x=> x.id==3).data.observacionOrigen}}</span></p>
						</li>
						<li>
							<p><strong>DESTINO:</strong></p>
							<p>{{steps.find(x=> x.id==2).data.address}} <span>DETALLE: {{steps.find(x=> x.id==3).data.observacionDestino}}</span></p>
						</li>
						<li class="fondo">
							<p><strong>TIPO:</strong></p>
							<p>{{steps.find(x=> x.id==3).data.deliveryType==1?"Express":"Programado"}}</p>
						</li>
						<li>
							<p><strong>FECHA:</strong></p>
							<p>{{steps.find(x=> x.id==3).data.serviceDate}}</p>
						</li>
						<li class="fondo">
							<p><strong >FRANJA HORARIA:</strong></p>
							<p>{{franjas.find(y=>y.NegocioFranjaId==steps.find(x=> x.id==3).data.schedule).NegocioFranjaDescripcion}}</p>
						</li>
						<li >
							<p><strong>TIPO DE VEHÍCULO:</strong></p>
							<p>{{vehiculos.find(y=>y.NegocioTipoVehiculoId==steps.find(x=> x.id==3).data.vehicleType).NegocioTipoVehiculoNombre}}</p>
						</li>
						<li class="fondo">
							<p><strong>TARIFA:</strong></p>
							<p>$U{{parseInt(tarifa)}}</p>
						</li>
						<br>

						<li class="fondo"></li>
						<li>
							<button @click="cerrarModal" class="bCancelar">Cancelar</button>
							<button @click="pagar()" class="bPago">Finalizar</button>
						</li>								
					</ul>
				</div>
			</div>
		</modal>
    </article>
</template>

<script>
import s_pagar from './p_pago/s_pagar'
// import a_test from './p_pago/a_test'
// *********************  STORE-VUEX ****************************** //
import {mapState} from 'vuex'
export default {
  name: 'Payment',
  data: () => ({
    step:null,
	model: {
		firstname: null,
		lastname: "",
		email: null,
		phone: null
	},
	dataValid:{},
	pago: false,
	terminos: false,
	cardNumber: null,
	paymentType: null,
	paymentMethodId: null,
	pagando: false,
	error: null,
	docNumber: null,
        form: {
            email: null,
            cardNumber: null,
            securityCode: null,
            cardExpirationMonth: null,
            cardExpirationYear: null,
            cardholderName: null,
            docType: 'CI',
            docNumber: null
		},
	tipoPersona: 1,
	yaProceso: false
  }),
	components:{
		modal: () => import('../components/modal')
	},
  computed:{
		...mapState({
			tarifa: state => state.tarifa,
			datosQuery: state => state.datosQuery,
			steps: state => state.steps,
			vehiculos: state => state.vehiculos,
			franjas: state => state.franjas

		}),
	
		msjErrorNombre(){
      const errors = []

			if (!this.dataValid.firstname.touch) return errors
			if(this.model.firstname==null || this.model.firstname.length < this.dataValid.firstname.min) errors.push('Ingrese un nombre')
			return errors
		},
		msjErrorApellido(){
      const errors = []
			if (!this.dataValid.lastname.touch) return errors
			if(this.model.lastname==null || this.model.lastname.length < this.dataValid.lastname.min) errors.push('Ingrese un apellido')
			return errors
		},
		msjErrorCorreo(){
      const errors = []
			if (!this.dataValid.email.touch) return errors
			if(this.model.email==null || this.model.email.length < this.dataValid.email.min) errors.push('Ingrese una direción de correo válida')

			return errors
    },
    msjErrorCelular(){
      const errors = []
			if (!this.dataValid.phone.touch) return errors
			if(this.model.phone==null || this.model.phone.length < this.dataValid.phone.min) errors.push('Ingrese un celular')

			return errors
	},
	msjErrorRut(){
      const errors = []
			if (!this.dataValid.rut.touch) return errors
			if(this.model.rut==null || this.model.rut.length < this.dataValid.rut.min) errors.push('Ingrese un rut')

			return errors
	},

	valid(){
		if(this.tipoPersona==1){
			console.log('tipo 1')
			return this.model.firstname != null &&
					this.model.lastname !=null && this.model.lastname !="" &&
					this.model.email !=null &&
					this.model.phone !=null &&
					this.msjErrorNombre.length==0&&
					this.msjErrorApellido.length==0&&
					this.msjErrorCorreo.length==0&&
					this.msjErrorCelular.length==0
		}
		else{
			console.log('tipo 2')
			return this.model.firstname != null &&
					this.model.rut !=null &&
					this.model.email !=null &&
					this.model.phone !=null &&
					this.msjErrorNombre.length==0&&
					this.msjErrorRut.length==0&&
					this.msjErrorCorreo.length==0&&
					this.msjErrorCelular.length==0
		}
	},
       bin () {
            return this.form.cardNumber && this.form.cardNumber.split('').map(digito => {
                return parseInt(digito) > 0 || digito === '0' ? digito: ''
            }).join('').substring(0,6)
        },

        thumbnai () {
            if (this.paymentType && this.paymentType.length > 0) {
                return this.paymentType[0].secure_thumbnail
            } else {
                return null
            }
        }
	},
	watch:{
		
		// async valid(){
		// 	if(this.valid){
		// 		const data = {
		// 			id: 4,
		// 			data: {...this.model}
		// 		}
		// 		await this.$store.dispatch('iniciarPago', data)
		// 	}
			
		// },
		tipoPersona(){
			this.model.firstname = null
			this.model.lastname = ""
			this.model.rut = null
			if (this.datosQuery.status) {
				this.model.firstname = this.datosQuery.Nombre_cliente
				this.model.rut = this.datosQuery.RUT
				this.model.email = this.datosQuery.email
				this.model.phone = this.datosQuery.Telefono_cliente
			}

		}
  },
	methods:{
		cerrarModal(){
			this.pago=false
			this.terminos = false
			this.yaProceso = false
		},
        guessingPaymentMethod() {
            if (this.bin && this.bin.length >= 6) {
                window.Mercadopago.getPaymentMethod({bin: this.bin}, (status, response) => {
                    if (status === 200) {
                        this.paymentType = response
                    } else {
                        this.paymentType = null
                    }
                })
            } else {
                this.paymentType = null
            }

            // Formateo
            this.form.cardNumber = this.form.cardNumber
                ? this.form.cardNumber.split('').map(digito => {
                    return parseInt(digito) > 0 || digito === '0' ? digito: ''
                }).join('').split('').map((numero, index) => {
                    return index > 3 && index % 4 === 0 ? ` ${numero}`: numero
                }).join('') : null
        },

        formatoEmail () {
            if (this.form.email) {
                const reg = /^((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)|(\s*))$/
                this.error = reg.test(this.form.email) ? null: 'Error en formato email'
            }
        },

        formatoDoc () {
            const numero = this.docNumber
                ? this.docNumber.split('').map(digito => {
                    return parseInt(digito) > 0 || digito === '0' ? digito: ''
                }).join(''): '0'
            if (parseInt(numero) > 0) {
                this.form.docNumber = parseInt(numero)
                this.docNumber = this.form.docNumber.toString().split('').reverse().map((numero, index) => {
                    return index === 1 ? `${numero}-`: index === 4 || index === 7 ? `${numero}.`: numero
                }).reverse().join('')
            } else {
                this.form.docNumber = 0
                this.docNumber = null
            }
        },

        formatoMes () {
            if (typeof this.form.cardExpirationMonth !== 'number') {
                this.form.cardExpirationMonth = 1 // sólo admite números
            } else if (this.form.cardExpirationMonth < 1) {
                this.form.cardExpirationMonth = 1 // a partir de enero
            } else if (this.form.cardExpirationMonth > 12) {
                this.form.cardExpirationMonth = 12 // sólo hasta diciembre
            }
        },

        formatoAño () {
            if (typeof this.form.cardExpirationYear !== 'number') {
                this.form.cardExpirationYear = 2019 // sólo admite números
            } else if (this.form.cardExpirationYear < 2019) {
                this.form.cardExpirationYear = 2019 // a partir de enero
            } else if (this.form.cardExpirationYear > 2070) {
                this.form.cardExpirationYear = 2070 // sólo hasta diciembre
            }
        },

        pagar () {
			this.pagando = true

			s_pagar (this)

			this.yaProceso = true
			this.cerrarModal()

			this.$store.dispatch('ir', 0)

			// const data = {
			// 		id: 4,
			// 		data: {...this.model}
			// 	}
			// 	await this.$store.dispatch('iniciarPago', data)
		},
		
		async modalPago(){
			// window.event.$emit('showSpinner', true)

			if(this.valid){
				const data = {
					id: 4,
					data: {...this.model}
				}
				let res = await this.$store.dispatch('validateData', data)

				if(res){
					if(this.datosQuery.status){
						this.pago=true
					}
					else{
						// this.form = a_test
						// this.docNumber = a_test.docNumber
						let script = document.createElement('script') 
						script.onload = () => {
							window.Mercadopago.setPublishableKey(process.env.MERCADO_PAGO_KEY)
							window.Mercadopago.getIdentificationTypes()
						}
						script.async = true 
						script.src = process.env.MERCADO_PAGO_URL
						document.head.appendChild(script)
						// this.form = a_test
						// this.docNumber = a_test.docNumber
						this.pago=true

					}
				}
				
				
			}
			else{
				window.event.$emit('touchData')
			}
			// window.event.$emit('showSpinner', false)

		}
  },
  beforeMount(){
		this.step = {...this.$store.getters.getStep(4)}
		this.dataValid = {...this.step.dataValid}
		this.model = {...this.step.data}
		this.deliveryType = this.Express?1:2
		
	},
	created(){
		window.event.$on('touchData', function(){
			if(!this.valid){
				if(this.tipoPersona==1){
					this.dataValid.firstname.touch = true 
					this.dataValid.lastname.touch  = true
					this.dataValid.email.touch  = true
					this.dataValid.phone.touch  = true
				}
				else{
					this.dataValid.firstname.touch = true 
					this.dataValid.rut.touch  = true
					this.dataValid.email.touch  = true
					this.dataValid.phone.touch  = true
				}
			}
			
		}.bind(this))
		if (this.datosQuery.status) {
			this.tipoPersona = 2
		} 
	},
	mounted(){
		this.yaProceso = false;
	}
}
</script>

<style>
	#payment section label{
		width: 33%;
		max-width: 600px;
		min-width: 260px;
		padding: 10px;
		text-align: left;
		position: relative;
		display: flex;
		flex-direction: column;
	}
	#payment section.clientType label{
		flex-direction: row;
	}
	#payment section {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		margin: 5px 0;
		padding: 20px 80px;

	}
	#payment select, #payment section:nth-of-type(3) input, ul input {
		height: 35px;
		/* border-radius: 25px; */
		border: none;
		border-bottom: 1px #dedede55 solid;
		margin-bottom: 10px;
	}
	#payment small{
		color: #cb3234;
		position:absolute;
		bottom: 5px;
	}
	#payment .header{
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		text-align: left;
	}
	#payment .header h1{
		margin: 0;
		width: 50%;
		font-size: 1.5em;
		font-family: 'SimplySans Bold';
		color: #ff7701;
	}
	#payment .header p{
		font-size: 1em;
		font-family: 'SimplySans Bold';
		
	}

	#payment .header div{
		width: 50%;
		display: flex;
		flex-direction: row;
		text-align: right;
		position: relative;
	}
	#payment .header div p:not(:last-of-type){
		width: 50%;
		margin: 0;
		margin-right: 5px;
	}
	#payment .header div p:last-of-type{
		text-align: left;
		padding: 10px;
		position: absolute;
		top: -10px;
		left: 52%;
		width: max-content;
		background-color:  #ff7701;
		color: #fff;
		border-radius: 10px;
		margin: 0;
	}
	#contenido{
		padding: 0 15px;
	}
	#contenido embed {
		width: 100%;
		height: 60vh;
		min-height: 300px;
		padding: 0;
	}
	#payment .bPago {
        border:none;
        height:  30px;
        border-radius: 30px;
        padding: 20px;
		width: 30%;
        background-color:  #ff7701;
        line-height: 0;
        color: #fff;
        font-weight: 800;
		margin-bottom: 15px;
		cursor: pointer;
    }

	#payment .bCancelar {
        border:none;
        height:  30px;
        border-radius: 30px;
        padding: 20px;
		max-width: 150px;
        background-color:  #505050;
        line-height: 0;
        color: #fff;
        font-weight: 800;
		margin-bottom: 15px;
		cursor: pointer;
    }

	ul {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 2em;
    }

    li {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 5px;
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
    }

    label {
        width: auto;
        text-align: left;
        margin: auto auto auto 0;
		Color: #505050;
		font-size: 1.2em;
		font-weight: 900;
    }

	input {
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
		padding: 0 10px
	}
	h2 {
		font-size: 1.8em;
		font-family: 'SimplySans Bold';
		text-align: center;
		margin: 10px 0 0 0;
		color: #ff7701;
	}

    .error {
        display: flex;
        margin: 1em auto;
        max-width: 600px;
        text-align: center;
        justify-content: center;
    }

    .tarjeta {
        display: flex;
        justify-content: left;
        width: 100%;
    }

    .tarjeta img {
        margin: auto auto auto 1em;
    }

    .fecha {
        background-color: #fff;
        border-radius: .5em;
        border: 3px solid #b5a897;
        margin: 0 auto 0 0;
    }

    .fecha input:nth-child(1) {
        text-align: right;
        border: none;
        padding-right: 0;
    }
	ul .bCancelar{
		max-width: max-content !important;
		justify-self: center;
	}
    .fecha input:nth-child(3) {
        text-align: left;
        padding-left: 1em;
        border: none;
    }

	.fondo{
		background-color: #dfdddd;
	}

    @media (max-width: 640px) {
        li {
            grid-template-columns: auto;
            grid-gap: .5em;
        }
		#payment .header h1{
			font-size: 1em;
		}
    }


	@media screen and (max-width: 970px) {
		#payment section{
			margin: 30px 0 0 0;
			padding: 10px 20px;
		}
		#payment section label{
			width: 30%;
			min-width: 240px;
		}
		#payment .header div p:last-of-type{
			padding: 6px;
			top: -6px;
		}
			#payment{
		overflow: auto;
	}
	}

</style>