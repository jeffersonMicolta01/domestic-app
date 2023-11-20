// email.service.ts
import { Injectable } from '@angular/core';
// import emailjs from 'emailjs-com';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  enviarCorreo(templateParams: any) {
    // const templateParams = {
    //   names: 'James',
    //   notes: 'Check this out!',
    // };

    emailjs
      .send(
        'service_3fbwda7',
        'template_r17dyxb',
        templateParams,
        'npBSsTxkPZumqDtW6'
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        // Puedes realizar acciones adicionales después de enviar con éxito el correo.
      })
      .catch((err) => {
        console.log('FAILED...', err);
        // Puedes manejar el error de manera apropiada, como mostrar un mensaje al usuario.
      });
  }
}
