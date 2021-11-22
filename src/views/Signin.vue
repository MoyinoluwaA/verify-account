<template>

    <div class="container px-5 px-sm-0">
        <div class='row align-items-center pt-5'>
            <div class="col-md-6 mb-4 mb-md-0">
                <h1 class="fw-bold">Log <span class="text-danger">In</span></h1>
                <p class="mt-4 fw-bolder">Account verification made easy wih Veri<span class="text-danger">A</span></p>
            </div>
            <div class="col-md-5 offset-md-1">
				<form @submit.prevent='handleSubmit'>
					<InputBox
						identifier='email'
						label='Email'
						type='email'
						v-model='formData.email'
					/>
					<InputBox
						identifier='password'
						label='Password'
						type='password'
						v-model='formData.password'
					/>
					<span id="msg" class="text-danger"></span>
					<div class="mt-4">
						<Button buttonText='log in' />
					</div>
				</form>
            </div>
        </div>
    </div>

</template>

<script>
import InputBox from '../components/InputBox.vue' 
import Button from '../components/Button.vue'
import axios from 'axios'
import { baseUrl } from '../helpers/variables'

export default {
	name: 'SignIn',
	components: {
		InputBox,
        Button
	},
	data() {
		return {
			formData: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
        async handleSubmit() {
            const messageTag = document.querySelector('#msg')
            try {
                const {email, password} = this.formData

                if (!(email && password)) {
                    messageTag.innerText = 'All fields are required'

                } else {
                    const response = await axios.post(`${ baseUrl }/api/users/login`, this.formData)
        
                    if (response.status === 200) {
                        localStorage.setItem('veria-user', JSON.stringify(response.data.data))
                        this.$router.push('/home') 
                    } 
                }
            }
            catch (err) {
                if (err.response.status === 401) {
                    messageTag.innerText = err.response.data.message
                } else {
                    messageTag.innerText = 'Error occured while logging in'
                }
            }
        }
    }
}
</script>