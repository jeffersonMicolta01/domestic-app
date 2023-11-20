import { Component, inject } from '@angular/core';
import Swiper from 'swiper';
import { PopupService } from '../services/popup.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-service-option',
  templateUrl: './service-option.component.html',
  styleUrls: ['./service-option.component.css'],
})
export class ServiceOptionComponent {
  user$!: Observable<User | null>;

  // private readonly authSvc = inject(AuthService);
  showPopup = false;

  selectedService: any;

  formattedCardNumber: string = '';
  formattedExpiryDate: string = '';

  serviceOptions = [
    { id: 1, name: 'Corte de Cabello', price: 15000 },
    { id: 2, name: 'Corte de Cabello + Barba', price: 30000 },
    { id: 3, name: 'Corte Completo', price: 40000 },
  ];

  constructor(
    private popupService: PopupService,
    private emailService: EmailService,
    private authService: AuthService
  ) {}

  showForm() {
    console.log('Mostrar formulario emergente');
    this.popupService.showPopup(); // Muestra el formulario emergente
  }

  hideForm() {
    console.log('Ocultar formulario emergente');
    this.popupService.hidePopup();
  }

  selectService(service: any) {
    this.selectedService = service;
  }

  ngOnInit() {
    const mySwiper = new Swiper('.card__content', {
      loop: true,
      spaceBetween: 32,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        968: {
          slidesPerView: 3,
        },
      },
    });

    this.popupService.showPopup$.subscribe((showPopup) => {
      console.log('showPopup: ', showPopup);
      this.showPopup = showPopup;
    });
  }

  card_number!: string;
  expireDate!: string;
  cvv_code!: string;
  serviceAddress!: string;
  phoneNumber!: string;


  finalizarPago() {
    // Obtener los valores del formulario

    const user_email = this.authService.getUserEmail();

    this.serviceAddress = (
      document.getElementById('serviceAddress') as HTMLInputElement
    )?.value;

    this.phoneNumber = (
      document.getElementById('phoneNumber') as HTMLInputElement
    )?.value;

    this.card_number = (
      document.getElementById('cardNumber') as HTMLInputElement
    )?.value;
    this.formattedCardNumber = this.formatCardNumber(this.card_number);
    this.expireDate = (
      document.getElementById('expiryDate') as HTMLInputElement
    )?.value;
    this.cvv_code = (document.getElementById('cvv') as HTMLInputElement)?.value;
    this.formattedExpiryDate = this.formatExpiryDate(this.expireDate);

    // Definir expresiones regulares
    // const cardNumberRegex = /^[0-9]{16}$/;
    // const expiryDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    // const cvvRegex = /^[0-9]{3}$/;

    const truncatedCardNumber = '**** **** **** ' + this.card_number.slice(-4);
    const truncatedExpireDate = '**/**'; // Trunca la fecha de expiración a '**/**'
    const truncatedCvv = '***'; // Trunca el código CVV a '***'

    // Validar los campos utilizando las expresiones regulares
    // if (!cardNumberRegex.test(this.card_number)) {
    //   console.log('Número de tarjeta no válido');
    //   return;
    // }

    // if (!expiryDateRegex.test(this.expireDate)) {
    //   console.log('Fecha de caducidad no válida');
    //   return;
    // }

    // if (!cvvRegex.test(this.cvv_code)) {
    //   console.log('CVV no válido');
    //   return;
    // }
    // Construir el objeto templateParams
    const templateParams = {
      selected_service: this.selectedService?.name,
      selected_price: this.selectedService?.price,
      address: this.serviceAddress,
      phone_number: this.phoneNumber,
      user_email: user_email ? user_email : 'correo_default@dominio.com',
      card_number: truncatedCardNumber,
      expiry_date: truncatedExpireDate,
      cvv: truncatedCvv,
    };

    // Llamar a la función enviarCorreo() del servicio de correo electrónico
    this.emailService.enviarCorreo(templateParams);
    this.hideForm();
  }

  formatCardNumber(cardNumber: string): string {
    // Eliminar caracteres no numéricos y dividir en bloques de 4 dígitos
    const numericOnly = cardNumber.replace(/\D/g, '');
    const blocks = numericOnly.match(/.{1,4}/g);

    // Unir los bloques con espacios en blanco
    return blocks ? blocks.join(' ') : '';
  }

  formatExpiryDate(expiryDate: string): string {
    // Eliminar caracteres no numéricos y dividir en mes y año
    const numericOnly = expiryDate.replace(/\D/g, '');
    const month = numericOnly.slice(0, 2);
    const year = numericOnly.slice(2);

    // Unir mes y año con una barra diagonal
    return `${month}/${year}`;
  }
}
