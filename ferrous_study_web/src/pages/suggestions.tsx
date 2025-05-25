
export default function Suggestions() {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const formData = new FormData(event.target);
    
    const suggestion = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
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
      // Envía la sugerencia al backend (archivo `sendEmail.js` en este caso)
      const response = await fetch('/api/send-suggestion-email', { // Asume que tienes un endpoint API en esta ruta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(suggestion),
      });

      if (response.ok) {
        alert('¡Gracias por tu sugerencia! La hemos recibido correctamente.');
        event.target.reset(); // Limpia el formulario
      } else {
        const errorData = await response.json();
        alert(`Error al enviar la sugerencia: ${errorData.message || 'Inténtalo de nuevo más tarde.'}`);
      }
    } catch (error) {
      console.error('Error al enviar la sugerencia:', error);
      alert('Hubo un problema al enviar tu sugerencia. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
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
              maxLength="100"
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
              maxLength="100"
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
              maxLength="200"
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
              rows="6"
              required
              minLength="10"
              maxLength="1000"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y"
              placeholder="Escribe tu sugerencia aquí..."
            ></textarea>
            <p className="text-gray-600 text-xs mt-1">Mínimo 10 caracteres, máximo 1000 caracteres.</p>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Enviar Sugerencia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}