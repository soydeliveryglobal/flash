<template>
  <article id="stepper">
        <template v-for="(step,i) in steps">
            <section :key="step.id" @click="ir(step)">
                <div class="title">
                    <h1 v-if="step.active">{{step.title}}</h1>
					<p v-if="step.active" v-html="step.subtitle"></p>
                </div>
                <div class="item">
                    <span class="line" :class="i==0?'nb':''"></span>
                    <span class=" name active" v-if="step.active"></span>
                    <span class="name">{{step.active?step.name:null}}</span>
                    <span class="line" :class="i==steps.length-1?'nb':''"></span>
                </div>
            </section>
        </template>
        <span class="version">{{version}}</span>
  </article>
</template>

<script>

export default {
    name: 'stepper',
    props:{
        steps: {
            type: Array,
            required: true
        }
    },
    data:() => ({

    }),
    methods:{
        ir(view){
            console.log(view.i)
            this.$store.dispatch('ir', view.id)
            // if(res)
            //     this.$router.push({name:view.view})
        }
    },
    computed:{
            version () {
            return process.env.VUE_APP_VERSION
        }
    }
}
</script>

<style scoped>
 #stepper{
     height: 100%;
     width: 100%;
     padding: 40px;
     /* position: relative; */
 }
 #stepper section{
     display: flex;
     flex-direction: row;
     align-items: center;
     height: calc(100% / 4);
     width: 100%;
     display: flex;
     flex-flow: row nowrap;
     justify-content: space-between;
 }

 #stepper section .title{
     width: 80%;
     text-align: right;
 }

 #stepper section .title h1 {
     color: #fff;
     text-transform: capitalize;
     margin-bottom: 5px
 }
  #stepper section .title p {
     color: #fff;
     font-size: .7em;
 }

 #stepper section .item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    height: 100%;
    align-items: center;
    position: relative;
    z-index: 10;
 }

#stepper .item .line{
     background-color: #fff;
     width: 3px;
     height: 45%;
 }

#stepper .line.nb{
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
 }
 #stepper .version{
     color: #fff;
     width: 100%;
     text-align: right;
 }
 #stepper .name.active{
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
 @media screen and (max-width: 750px) {
     .title{
        /* position: absolute;
        top: 75px;
        left: 20%; */
        display: none;
     }
    #stepper section .title h1 {
        color: #2c3e50;
    }
    #stepper section .item{
        width: 100%;
    }
    
}
</style>