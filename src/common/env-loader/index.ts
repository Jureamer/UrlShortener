import dotenv from 'dotenv'

// Load .env file if process.env.KUBERNETES_SERVICE_HOST is undefined (not in K8S)
if (!process.env.KUBERNETES_SERVICE_HOST) {
    console.log(`path: ${process.cwd()}`)
    dotenv.config({ path: `${process.cwd()}/.env` })
}
