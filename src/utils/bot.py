from telegram.ext import Application, CommandHandler  
import logging
from telegram import Bot
import asyncio


bot_token = "7479740960:AAFZQeRzHgAErkZhekc9R_RWIuvnC7TQ7kQ"


application = Application.builder().token(bot_token).build()


logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)


async def start(update, context):
    print(update.effective_chat.id)  
    await context.bot.send_message(chat_id=update.effective_chat.id, text="Bienvenido al Bot de Go Travel!  tu nueva página web moderna y sencilla para reservar alojamientos en cualquier rincón del mundo. Con una interfaz intuitiva y un diseño moderno, GoTravel te permite encontrar y reservar fácilmente el lugar perfecto para tu próxima aventura.   ¿En que puedo ayudarte? ")  # Respond with a message

async def personas(update, context):
    print(update.effective_chat.id)  
    
    with open('personas/personas.txt', 'a') as archivo:
        archivo.write(str(update.effective_chat.id) + "\n")
    await context.bot.send_message(chat_id=update.effective_chat.id, text="AHORA ESTÁS EN LA LISTA!!")  # Respond with a message


start_handler = CommandHandler('start', start)
personas_handler = CommandHandler('personas', personas)


application.add_handler(start_handler)
application.add_handler(personas_handler)


application.run_polling()

async def enviarSinResponder():
    personasLista = []
    with open('personas/personas.txt', 'r') as archivo:
        for personaLinea in archivo:
            persona = personaLinea.strip()
            personasLista.append(persona)
    bot = Bot(bot_token)
    for chat_id in personasLista:
        await bot.send_message(chat_id=chat_id, text="ESTO ES UNA PRUEBA!")  # Send message

while True:
    h = input("Enviar mensaje: ")
    asyncio.run(enviarSinResponder())