import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


/**
 * Función para enviar un correo electrónico con la sugerencia.
 * @param {object} suggestion - Objeto que contiene los datos de la sugerencia (name, email, subject, message).
 */
export async function sendSuggestionEmail(suggestion) {
  const { name, email, subject, message } = suggestion;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Nueva Sugerencia desde FerousStudy!: ${subject}`,
    html: `
      <p><b>De:</b> ${name}</p>
      <p><b>Correo:</b> ${email}</p>
      <p><b>Asunto:</b> ${subject}</p>
      <hr>
      <p><b>Mensaje:</b></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log('Correo de sugerencia enviado exitosamente.');
    return { success: true, message: 'Sugerencia enviada correctamente.' };
  } catch (error) {
    console.error('Error al enviar el correo de sugerencia:', error);
    return { success: false, message: 'Error al enviar la sugerencia.' };
  }
}