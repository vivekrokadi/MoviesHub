import { Client, Account } from 'appwrite'

const client = new Client()
.setEndpoint(import.meta.env.VITE_APP_WRITE_ENDPOINT)
.setProject(import.meta.env.VITE_APP_WRITE_PROJECT_ID)

export const account = new Account(client)