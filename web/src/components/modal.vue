<template>
    <div>
        <aside>
            <div class="pophead">
                <button @click="cerrar" class="cerrar"
                    aria-label="Cerrar ventana de Loguin">
                    <i class="material-icons">
                        close
                    </i> 
                </button>
            </div>
            <div class="modal__contenido">
                <slot name="contenido" />
            </div>
            
        </aside>
        <div class="cortina" @click="cerrar"/>
    </div>
</template>

<script>
export default {
    name: 'modal',

    data: () => ({
        ventana: null,
        titulo: null
    }),

    created () {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    },

    methods: {
        cerrar () {
            this.$emit('cerrar')
        },
    }
}
</script>

<style scoped>
    aside {
        position: fixed;
        width: max-content;
        max-width: 90%;
        min-height: max-content;
        max-height: 80%;
        margin: 5% auto;
        z-index: 100;
        background-color: #fff;
        top: 0;
        left: 0;
        right: 0;
        border-radius: 8px;
        animation: aparece .3s ease;
        overflow: auto;
    }
    .modal__contenido::-webkit-scrollbar {
        width: 11px;
    }
    .modal__contenido::-webkit-scrollbar-track {
        background: #fff;
    }
    .modal__contenido::-webkit-scrollbar-thumb {
        background-color: #fff;
        border-radius: 6px;
        border: 3px solid #fff;
    }

    @keyframes aparece {
        from {
            opacity: 0;
            transform: scale(.9,.9);
        }
    }

    .pophead {
        position: sticky;
        display: flex;
        justify-content: flex-end;
        top: 0;
        background-color:
        #fff;
        z-index: 22;
        overscroll-behavior: contain;
    }

    .cerrar {
        display: flex;
        padding: .5em;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        background-color: transparent;
		border: none;
    }

    .cerrar i {
        color: #f90;
    }

    .modal__contenido {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .cortina {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.6);
        z-index: 50;
        animation: desvanece .3s ease;

    }
</style>
