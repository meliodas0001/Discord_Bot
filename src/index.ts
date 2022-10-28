import "dotenv/config"
import { Client, Collection } from 'discord.js'
import path from 'path'
import fs from 'fs'

const client = new Client({ intents: 32767 }); 

client.commands = new Collection()

import "./utils/SlashBuilder"

const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`The command at ${filePath} is missing "data" or "execute" property`)
    }
}


const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".ts"))

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}


client.login(process.env.TOKEN)