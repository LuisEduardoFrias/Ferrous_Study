import { ChangeEvent } from 'react'
import { githubServiceApi } from '../services/github_service'
import { TSuggestion } from '../types/suggestion'

export default function Suggestions() {
   const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      const suggestion: TSuggestion = {
         name: formData.get('name') as string,
         email: formData.get('email') as string,
         subject: formData.get('subject') as string,
         message: formData.get('message') as string,
      };

      // Validaciones básicas
      if (!suggestion.name || !suggestion.email || !suggestion.subject || !suggestion.message) {
         alert('Por favor, completa todos los campos.');
         return;
      }

      if (!/\S+@\S+\.\S+/.test(suggestion.email)) {
         alert('Por favor, introduce un correo electrónico válido.');
         return;
      }

      try {
         const result = await githubServiceApi.sendEmail(suggestion);

         if (result) {
            event.target.reset();
            alert('¡Gracias por tu sugerencia! La hemos recibido correctamente.');
            return;
         }

         alert(`Error al enviar la sugerencia: 'Inténtalo de nuevo más tarde.`);

      } catch (error) {
         console.error('Error al enviar la sugerencia:', error);
         alert('Hubo un problema al enviar tu sugerencia. Por favor, inténtalo de nuevo.');
      }
   };

   return (
      <div className="flex justify-center pt-[20%]">
         <div className="bg-white p-8 rounded-lg shadow shadow-theme-3 max-w-md w-full">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Deja tu Sugerencia</h2>
            <p className="text-gray-600 text-center mb-8">
               ¡Nos encantaría escuchar tus ideas para mejorar nuestra página!
            </p>

            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                     Tu Nombre:
                  </label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     required
                     maxLength={100}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                     placeholder="Ej: Juan Pérez"
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                     Tu Correo Electrónico:
                  </label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     required
                     maxLength={100}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                     placeholder="Ej: tu.correo@ejemplo.com"
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
                     Asunto de la Sugerencia:
                  </label>
                  <input
                     type="text"
                     id="subject"
                     name="subject"
                     required
                     maxLength={200}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                     placeholder="Ej: Mejora en la navegación"
                  />
               </div>

               <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                     Tu Sugerencia:
                  </label>
                  <textarea
                     id="message"
                     name="message"
                     rows={6}
                     required
                     minLength={50}
                     maxLength={5000}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y"
                     placeholder="Escribe tu sugerencia aquí..."
                  ></textarea>
                  <p className="text-gray-600 text-xs mt-1">Mínimo 50 caracteres, máximo 5000 caracteres.</p>
               </div>

               <div className="flex items-center justify-between">
                  <button
                     type="submit"
                     className="bg-theme-4 hover:bg-theme-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  >
                     Enviar Sugerencia
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}