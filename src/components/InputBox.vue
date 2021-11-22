<template>
    <div class="mb-3">
        <label :for='identifier' class="form-label">{{label}}</label>
        <input :type='type' class="form-control" :id='identifier' :value="value"
            @input="$emit('input', $event.target.value)" 
        />
    </div>
</template>

<script>
export default {
    name: 'InputBox',
    props: {
        identifier: String,
        label: String,
        type: String,
        value: String
    }
}
</script>