<template>
    <article id="spinner" v-if="show">
        <svg
            width="65px"
            height="65px"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
            draggable="false"
            alt="Cargando..."
            :stroke="color">
            <circle
                stroke-width="6"
                fill="none"
                stroke-linecap="round"
                cx="33" cy="33" r="30">
            </circle>
        </svg>
    </article>
    
</template>

<script>
export default {
    name: 'spinner-circular',

    props: {
        color: {
            type: String,
            default: '#cb3234'
        },
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
    #spinner{
        position:absolute;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.6);
        z-index: 9999;
    }
    svg {
        position: relative;
        top: 50%;
        left: 0;
        animation: rotator 1.3s linear infinite;
    }

    circle {
        stroke-dasharray: 187;
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: dash 2s ease-in-out infinite;
    }

    @keyframes rotator {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        from {
            stroke-dashoffset: 188;
        }
        50% {
            stroke-dashoffset: 46.75;
            transform: rotate(0deg);
        }
        to {
            stroke-dashoffset: 188;
            transform: rotate(360deg);
        }
    }
</style>
