<template>
	<div id="app">
		<section class="menu" >
			<stepper :steps="steps"  />
		</section>
		<section class="router" :style="approved?'width:100%;':''">
			
			<figure class="logo">
				<img src="./assets/logo.jpeg" alt="">
			</figure>
			<h1 class="titulo">{{texto1(active.title)}} <span class="cuadro">{{text2}}</span> </h1>
			<!-- <h1 class="titleM">{{active.title}}</h1> -->
			<router-view/>
			<section class="grpNav" >
				<button class="atras " @click="back" v-if="active.id>1"><img src="@/assets/arrow_white.png" alt="arrow"> Volver </button>
				<button class="ir " @click="ir" v-if="active.id<4">Siguiente <img src="@/assets/arrow_white.png" alt="arrow">  </button>
			</section>
		</section>
		<modal-error v-if="msjError" @cerrar="msjError=false" id="msjError">
			<!-- msjError -->
			<div slot="contenido" style="padding:33px;">
				{{msjErrorDescripcion}}
				<!-- No existen franjas horarias para el negocio -->
			</div>
		</modal-error>
		<spinner :show="showSpinner"/>
	</div>
</template>
<script>
// *********************  STORE-VUEX ****************************** //
import {mapState} from 'vuex'
export default {
	components:{
	'stepper': ()=>import('./components/stepper'),
	'modalError': ()=>import('./components/modal'),
	'spinner': () =>import('./components/spinnerCircular')
},
	data:() => ({
		text1:'',
		text2:'',
		msjError: false,
		msjErrorDescripcion: '',
		showSpinner: false
	}),
	computed: {
		//************* MAPEO DE STORE ************
		...mapState({
			steps: state => state.steps,
			datosQuery: state => state.datosQuery
		}),
	
		active(){
		// let step = this.steps.find(x=>x.active)
			return this.steps.find(x=>x.active)
		},

		approved(){
			return this.$store.state.approved
		}
		//****** VALIDACIÓN DE FROMULARIOS *******
		// msjErrorLogin(){
		// 	const errors = []
		// 	if (!this.$v.model.login.$dirty) return errors
		// 	!this.$v.model.login.required && errors.push(requerido)
		// 	!this.$v.model.login.maxLength && errors.push(longitudMax)
		// 	return errors
		// },
		// msjErrorClave(){
		// 	const errors = []
		// 	if (!this.$v.model.clave.$dirty) return errors
		// 	!this.$v.model.clave.required && errors.push(requerido)
		// 	return errors
		// }
	},
	methods:{
		ir(){
		window.event.$emit('touchData')
				this.$store.dispatch('avanzar', this.active.id)

		},
		back(){
			this.$store.dispatch('ir', this.active.id-1)
		},
		texto1(texto){
			var espacio = " ";
			var separado = texto.split(espacio)
			if (separado.length>1){
				this.text2 = separado[separado.length-1]
				this.text1 = separado[0]+espacio+separado[1]+espacio
			}else {
				this.text2 = texto
				this.text1 = ''
			}
			return this.text1
		}
	},
	async mounted(){

		window.event.$on('showError', function(msj){
			this.msjError=true
			this.msjErrorDescripcion=msj
		}.bind(this))

		window.event.$on('showSpinner', function(show, e){
			console.log(show)
			console.log(e)
			this.showSpinner=show
		}.bind(this))

	},
}
</script>

<style>
@font-face {
font-family: "Karla";
src: url("./assets/Fuente/Karla-Regular.ttf") format("truetype");
/* url("./assets/Fuente/Karla-Bold.ttf") format("truetype") */
/* url("./assets/Fuente/Karla-BoldItalic.ttf") format("truetype") */
/* url("./assets/Fuente/Karla-Italic.ttf") format("truetype"); */
}
@font-face {
font-family: "SimplySans Bold";
src: url("./assets/Fuente/SimplySans-Bold.ttf") format("truetype");
}

#app {
font-family: "Karla", Helvetica, Arial;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
display: flex;
flex-flow: row nowrap;
height: 100vh;
width: 100vw;
}
.logo{
		width: 100%;
		margin: 0;
		padding: 10px;
	height: 100px;
	}
	.logo img {
		width: 50%;
		max-width: 250px;
		float: right;
	}

*{
box-sizing: border-box;
outline: none;
}

#nav {
padding: 30px;
}
body, html{
padding: 0;
margin: 0;
}

#nav a {
font-weight: bold;
color: #2c3e50;
}

#nav a.router-link-exact-active {
color: #42b983;
}
.menu{
height: 100%;
width: 30%;
background-color: #ff7701;
background-image: url('./assets/fondo_franja.png');
background-position: -55px bottom;
background-size: 80%;
background-repeat: no-repeat;
}

.router{
width: 70%;
height: 100%;
display: flex;
flex-flow: column nowrap;
align-items: flex-end;
background-image: url('./assets/fondo.png');
background-position: -15vw bottom;
background-size: 90%;
background-repeat: no-repeat;
position: relative;
}
.grpNav{
width: 100%;
height: 120px;
padding: 10px 20px;
display: flex;
justify-content: flex-end;
}
.grpNav button {
background-color: transparent;
display: flex;
align-items: center;
justify-content:center;
width: 100px;
padding: 10px;
margin: 10px 0 10px 10px;
height: 40px;
border: 2px solid #ff7701;
border-radius: 100px;
cursor: pointer;
font-family: "Karla", Helvetica, Arial;
font-weight: bold;
background-color: #ff7701;
color: #FFF;
}
.grpNav button img{
	width: 12px;
	height: 12px;
}
.grpNav .atras img{
	transform: rotateY(180deg);
	margin-right: 5px;
}
.grpNav .ir img{
	margin-left: 5px;
}
.router article {
width: 100%;
height: calc(100% - 100px - 120px);
	overflow-y: auto;

}
.titleM{
width: 100%;
color: #2c3e50;
font-size: 1em;
margin: 10px 0;
display: none;
}

.titulo {
	font-size: 1.8em;
	font-family: 'SimplySans Bold';
	text-align: right;
	margin: 10px 0 0 0;
	color: #505050;
}
#msjError aside {
	border: 2px #ff7701 solid !important;
}
.cuadro {
	color: #fff;
	background-color: #ff7701;
	padding: 0 10px;
	text-transform: capitalize;
}
@media screen and (max-width: 600px) {
.logo img {
		width: 100%;
		max-width: 250px;
		float: unset;
	}
.router{
		background-position: -40vw bottom;
		background-size: 150%;
		background-repeat: no-repeat;
}

}
@media screen and (max-width: 750px) {
.menu{
	width: 20%;
	min-width: 80px;
}
.grpNav{
	height: 70px;
	padding: 5px 20px;
	display: flex;
	justify-content: flex-end;
}
.router{
	width: 79%;
}
.router article {
	height: calc(100% - 210px - 70px);
}
.titleM{
	display: block;
}
}
</style>
