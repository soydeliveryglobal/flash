<template>
  <section id="mapaG">
        <div class="grpDireccion">
            <label>
                <span>{{title}}</span>
                <GmapAutocomplete class="barramapa" @place_changed="setPlace" placeholder="Introduce Calle y Número de Puerta"  ref="direccion">
                </GmapAutocomplete>
                <small v-if="showError">{{errorMsg}}</small>
            </label>
            <label class="streetNUmber">
                <span>{{title2}}</span>
                <input type="text" placeholder="Edificio, Apto, Referencia, Manzana, etc." v-model="observation" @blur="emitObservation">   
                <small v-if="showErrorConfirm">{{errorMsgConfirm}}</small>
            </label>
        </div>
        

        <GmapMap
            id="mapalayer"
            :center="centerMap"
            :zoom="zoom"
            map-type-id="terrain"
            :options="{
                 streetViewControl: false,
            }"
        >
            
            <GmapMarker
                v-if="marker"
                label="★"
                :position="marker"
                :clickable="true"
                :draggable="true"
                @position_changed="movePlace"
                @click="center=marker"
                @dragend="changePoint"
            />
        </GmapMap>
  </section>
</template>

<script>
export default {
    name: 'mapaGoogle',
    props:{
        title:{
            required: true,
            type: String
        },
        showError: {
            required: true,
            type: Boolean
        },
        errorMsg:{
            required:false,
            type: String,
            default: ''
        },
        showErrorConfirm: {
            required: true,
            type: Boolean
        },
        errorMsgConfirm:{
            required:false,
            type: String,
            default: ''
        },
        coods: {
            required: true,
            type: Object,
            default:() => ({
                lat: null,
                lng: null,
                direccion: null
            })
        },
         title2:{
             required:true,
             type: String,
             default: ''
        },

    },
    data: () => ({
        marker: null,
        place: null,
        description: null,
        position: {
            lat: null,
            lng: null
        },
        address: null,
        observation: null,
        zoom: 12
    }),
    computed:{
        centerMap(){
            return {
                lat: this.coods.lat?this.coods.lat: -34.90328,
                lng: this.coods.lng?this.coods.lng: -56.18816
            }
        }
    },

    methods:{
        setDescription(description){
            this.description = description
        },
        setPlace(place){
            this.place = place
            this.usePlace()
        },
        usePlace(){
            if(this.place){

                if(this.place.address_components){
                    this.address = {
                        lat: this.place.geometry.location.lat(),
                        lng: this.place.geometry.location.lng(),
                        address: this.place.formatted_address,
                        departamento: this.place.address_components.find(x=>{
                            return x.types.find(y=>{
                                return y=="administrative_area_level_1"
                            })
                        })?this.place.address_components.find(x=>{
                            return x.types.find(y=>{
                                return y=="administrative_area_level_1"
                            })
                        }).long_name:"",
                        localidad: this.place.address_components.find(x=>{
                            return x.types.find(y=>{
                                return y=="locality"
                            })
                        })?this.place.address_components.find(x=>{
                            return x.types.find(y=>{
                                return y=="locality"
                            })
                        }).long_name:"",
                        street: this.place.address_components.find(x=>{
                            return x.types.find(y=>{
                                return y=="route"
                            })
                        })?this.place.address_components.find(x=>{
                            return x.types.find(y=>{
                                return y=="route"
                            })
                        }).long_name:"",
                        streetNumber: this.place.address_components.find(x=>{
                            return x.types.find(y=>{
                                return y=="street_number"
                            })
                        })?this.place.address_components.find(x=>{
                            return x.types.find(y=>{
                                return y=="street_number"
                            })
                        }).long_name:"",
                    }
                }
                if(this.address.streetNumber){
                    this.$emit('latLng', {...this.address})
                    this.marker={
                            lat: this.place.geometry.location.lat(),
                            lng: this.place.geometry.location.lng()
                    }
                    this.zoom = 18
                }
                //this.place = null
            }
        },
        movePlace: function(event) {
            this.position = {
                lat: event.lat(),
                lng: event.lng(),
            }
        },
        changePoint(){
            this.$emit('latLng', {...this.address,...this.position})
            //this.place = {...this.position}     
        },
        emitStreet(){
            this.$emit('streetNumber', this.streetNumber)
        },
      emitObservation(){
            this.$emit('observation', this.observation)
        }
    },
    mounted(){
		this.streetNumber = 'n/a'
		this.emitStreet()
        if(this.coods && this.coods.lat && this.coods.lng){
                let place = {
                    geometry:{
                        location:{
                            lat: null,
                            // () => ({
                            //     this.coods.lat
                            // }),
                            lng: null,
                            // {
                            //     return this.coods.lng
                            // }
                        }
                    }
                }
                let selft = this;
                place.geometry.location.lat = function(){
                    return selft.coods.lat
                }
                place.geometry.location.lng = function(){
                    return selft.coods.lng
                }
                this.setPlace(place)
                //document.querySelector('.pac-target-input').value = this.coods.direccion
        }
        console.log(this.numberStreet)
        this.numberStreet!=''?this.streetNumber=this.numberStreet:this.streetNumber=''
    }

}
</script>

<style>
    #mapaG{
        width: 100%;
        height: 100%;
        padding: 0 20px;
    }
    #mapaG input {
		height: 35px;
		border-radius: 25px;
		border: none;
		border-bottom: 1px #dedede55 solid;
		margin-bottom: 10px;
	}
	#mapaG small{
		color: #cb3234;
        margin-left: 20px;
	}
    #mapaG label{
        display: flex;
		flex-direction: column;
		width: 35%;
		max-width: 600px;
		min-width: 260px;
		padding: 10px 10px 10px 0;
		text-align: left;
		position: relative;
	}

    #mapaG .streetNUmber{
        margin-left: 10px;
    }

    #mapaG .grpDireccion {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        margin: 10px 0;
    }
    #mapaG .grpDireccion button {
        border:none;
        height:  30px;
        border-radius: 30px;
        padding: 20px;
        background-color: #ff9900;
        line-height: 0;
        color: #fff;
        font-weight: 800;
    }
    #mapaG #mapalayer{
        width: 100%;
        height: calc(100% - 85px);
    }
    #mapaG .barramapa{
        width: 100%;
    }

    

     @media screen and (max-width: 750px) {
        #mapaG #mapalayer{
            width: 100%;
            height: calc(100% - 150px);
        }
        #mapaG{
            padding: 0 10px;
        }
        
    }
     @media screen and (max-width: 700px) {
        #mapaG label{
            width: 100%;
            padding: 10px 0px;
        }
        #mapaG .streetNUmber{
        margin-left: 0px;
    }
        
    }
    
</style>