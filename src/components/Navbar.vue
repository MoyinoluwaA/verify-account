<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand fs-2 fw-bold" href="#">Veri<span class="text-danger">A</span></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav ms-auto mt-3 mb-2 my-lg-0">
                    <li class="nav-item">
                        <span v-if='home' to='/' class="text-danger fw-bold pb-2 border-danger border-bottom" @click="handleLogOut">Log Out</span>
                        <router-link v-if='login' to='/'>Sign Up</router-link>
                        <router-link v-if='signup' to='/login'>Log In</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            home: false,
            login: false,
            signup: true
        }
    },
    watch: {
        $route: function() {
            if (this.$route.path === '/home') {
                this.home = true
                this.signup = false
                this.login = false
            } else if ((this.$route.path === '/login')) {
                this.login = true
                this.home = false
                this.signup = false
            } else {
                this.signup = true
                this.login = false
                this.home = false
            }
        }
    },
    methods: {
        handleLogOut() {
            localStorage.removeItem('veria-user')
            this.$router.push('/') 
        }
    }
}
</script>