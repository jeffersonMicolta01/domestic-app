import { Component, OnInit } from '@angular/core';

// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';


// import Swiper and modules styles

Swiper.use([Navigation, Pagination, Scrollbar]);


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})

export class SupplierComponent implements OnInit{


  suplierName: {
    name1: 'Yackson Sanchez';
    name2: 'Michael Smith Torres';
    name3: 'Carlos López';
    name4: 'Javiar Perez';
  } | undefined

  
  ngOnInit(){
    const mySwiper = new  Swiper('.card__content',{
      loop: true,
      spaceBetween: 32,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        600:{
          slidesPerView: 2
        },
        968: {
          slidesPerView: 3
        }
      }
    })
  }

  

}
