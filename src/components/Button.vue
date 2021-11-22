<template>
    <button class="btn text-uppercase btn-outline-success" :class="btnStyle" type='submit'>
        {{buttonText}}
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        buttonText: String,
        btnStyle: String
    }
}
</script>