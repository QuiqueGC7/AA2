<template>
    <div class="admin-dashboard">
        <header class="dashboard-header">
            <h1>Admin Dashboard</h1>
            <p class="subtitle">Welcome back, Admin</p>
        </header>
        
        <div class="dashboard-grid">
            <div class="card">
                <h3>Total Users</h3>
                <p class="stat">1,234</p>
            </div>
            <div class="card">
                <h3>Active Sessions</h3>
                <p class="stat">56</p>
            </div>
            <div class="card">
                <h3>Revenue</h3>
                <p class="stat">$12,450</p>
            </div>
            <div class="card">
                <h3>Growth</h3>
                <p class="stat">+23%</p>
            </div>
        </div>

        <div class="dashboard-content">
            <section class="recent-activity">
                <h2>Recent Activity</h2>
                <ul>
                    <li>User registration: john@example.com</li>
                    <li>System backup completed</li>
                    <li>New order from customer #542</li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminDashboard',
    data() {
        return {
            // Add reactive data here
        }
    },
    methods: {
        // Add methods here
    }
}
</script>
