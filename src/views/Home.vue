<template>
	<div class="container mt-5 px-5 px-sm-0">
		<h1 class="text-center text-danger">Account Verification made easy!</h1>
		<p class="text-center">Fill in the account number and select a bank. It's that easy.</p>
		<div class="col-sm-8 col-md-6 mx-auto mt-5">
			<form @submit.prevent='handleSubmit'>
				<InputBox
					identifier='account_number'
					label='Account Number'
					type='number'
					v-model='formData.account_number'
				/>
				<label class="mb-2">Select Bank</label>
				<select name='bank' class='form-select mb-3' v-model='formData.bank_code'>
					<option v-for="bank in banks" :key='bank.id' :value='bank.code'>{{ bank.name }}</option>
				</select>
				<span id="msg"></span>
				<p v-if='account'>The Account belongs to {{ account.account_name }}</p>
				<div class="mt-4">
					<Button buttonText='verify account' />
				</div>
			</form>
		</div>
	</div>

</template>

<script>
import InputBox from '../components/InputBox.vue' 
import Button from '../components/Button.vue'
import axios from 'axios'
import { baseUrl } from '../helpers/variables'

export default {
	name: "Home",
	data() {
		return {
			banks: [],
			formData: {
				account_number: '',
				bank_code: ''
			},
			account: null
		}
	},
	components: {
		InputBox,
		Button
	},
	mounted () {
		axios
		.get('https://api.paystack.co/bank')
		.then(response => {
			this.banks = response.data.data
		})
	},
	methods: {
		async handleSubmit() {
            const messageTag = document.querySelector('#msg')

            try {
                const {account_number, bank_code} = this.formData

                if (!(account_number && bank_code)) {
					messageTag.className = 'text-danger'
                    messageTag.innerText = 'All fields are required'

                } else {
					const { token } = JSON.parse(localStorage.getItem('veria-user'))

                    const response = await axios.post(`${ baseUrl }/api/verify-account`, this.formData, {
						headers: {
							'x-access-token': token
						}
					})
					
                    if (response.status === 200) {
						this.account = response.data.data
						messageTag.className = 'text-success'
                        messageTag.innerText = 'Account is verified'
                    } 
                }
            }
            catch (err) {
				messageTag.className = 'text-danger'
                if (err.response.status === 422) {
                    messageTag.innerText = 'Account could not be resolved'
                } else {
                    messageTag.innerText = 'Error verifying account'
                }
            }
        }
	}
}
</script>