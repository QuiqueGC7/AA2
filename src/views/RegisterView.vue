<template>
    <div class="register-container">
        <h1>Register</h1>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <label for="email">Email:</label>
                <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                />
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    required
                />
            </div>

            <div class="form-group">
                <label for="confirm-password">Confirm Password:</label>
                <input
                    id="confirm-password"
                    v-model="form.confirmPassword"
                    type="password"
                    required
                />
            </div>

            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'RegisterView',
    data() {
        return {
            form: {
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        handleRegister() {
            if (this.form.password !== this.form.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            console.log('Register:', this.form);
        }
    }
}
</script>