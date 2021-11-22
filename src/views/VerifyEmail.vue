<template>

    <div class="text-center pt-5 mt-5">
        <p v-if='loading' class="mt-5 pt-5">Wait while your account is being verified...</p>
        <p v-if='success' class="fs-3 fw-bolder mt-5 pt-5">
            Your account has been verified. Click <router-link to='/login'>here</router-link> to log in
        </p>
        <p v-if='error' class="fs-3 fw-bolder mt-5 pt-5">
            Create an account by clicking <router-link to='/'>here</router-link>
        </p>
    </div>

</template>

<script>
import axios from 'axios'
import { baseUrl } from '../helpers/variables'

export default {
    name: 'VerifyEmail',
    data() {
        return {
            loading: true,
            error: false,
            success: false
        }
    },
    mounted() {
        const path = this.$route.path
        try {
            axios.patch(`${baseUrl}/api${path}`)
            .then((response) => {
                if (response.status === 200) {
                    this.loading = false
                    this.success = true
                }
            })
            .catch((err) => {
                if (err.response.status === 404 || err.response.status === 500) {
                    this.error = true
                    this.loading = false
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}
</script>