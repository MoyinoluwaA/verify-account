<template>

    <div class="container px-5 px-sm-0">
        <div class='row align-items-center pt-5'>
            <div class="col-md-6 mb-4 mb-md-0">
                <h1 class="fw-bold">Sign <span class="text-danger">up</span></h1>
                <p class="mt-4  fw-bolder">Verify accounts made seamless wih Veri<span class="text-danger">A</span></p>
            </div>
            <div class="col-md-5 offset-md-1">
                <form @submit.prevent='handleSubmit'>
                    <InputBox
                        identifier='firstname'
                        label='Firstname'
                        type='text'
                        v-model='formData.first_name'
                    />
                    <InputBox
                        identifier='lastname'
                        label='Lastname'
                        type='text'
                        v-model='formData.last_name'
                    />
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
                    <span id='msg'></span>
                    <div class="mt-4">
                        <Button buttonText='register' />
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
	name: 'SignUp',
	components: {
		InputBox,
        Button
	},
    data() {
        return {
            formData: {
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async handleSubmit() {
            const messageTag = document.querySelector('#msg')
            try {
                const {first_name, last_name, email, password} = this.formData

                if (!(first_name && last_name && email && password)) {
                    messageTag.innerText = 'All fields are required'
                    messageTag.className = 'text-danger'

                } else {
                    const response = await axios.post(`${ baseUrl }/api/users/register`, this.formData)
        
                    if (response.status === 201) {
                        this.resetForm()
                        messageTag.className = 'text-success'
                        messageTag.innerText = 'Go to email to verify account'
                    } 
                }
            }
            catch (err) {
                messageTag.className = 'text-danger'
                if (err.response.status === 400) {
                    messageTag.innerText = 'User already exists. Log In'
                } else {
                    messageTag.innerText = 'Error registering user'
                }
            }
        },
        resetForm() {
            this.formData.first_name = ''
            this.formData.last_name = ''
            this.formData.email = ''
            this.formData.password = ''
        }
    }
}
</script>