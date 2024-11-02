// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollTrigger.normalizeScroll(true)

// create the smooth scroller FIRST!
let smoother = ScrollSmoother.create({
  smooth: 2,
  effects: true,
  smoothTouch: 0.2,  
});


let swiperCards = new Swiper("#swiper_cards", {
    slidesPerView: "auto",
    spaceBetween: 10,
    speed:1000,
    grabCursor: true,
    mousewheel: true,
    freeMode: true,
    
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },
    
    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
    },
});  


// Seleccionar el elemento que contiene el contenido a refrescar
let reloadContent = document.getElementById("smooth-wrapper");

// Variables para guardar el estado del gesto de scroll
let startY = 0; // La posición inicial del dedo al tocar la pantalla
let deltaY = 0; // La distancia recorrida por el dedo al moverse
let threshold = 150; // El umbral de distancia para activar el refrescar

// Función para manejar el evento touchstart
function handleTouchStart(e) {
    // Solo se considera el primer dedo que toca la pantalla
    if (e.touches.length === 1) startY = e.touches[0].clientY;
}

// Función para manejar el evento touchmove
function handleTouchMove(e) {
    // Solo se considera el primer dedo que se mueve en la pantalla
    if (e.touches.length === 1) {
        // Calcular la distancia recorrida por el dedo
        deltaY = e.touches[0].clientY - startY;
        
        // Si la distancia es positiva y el contenido está en el límite superior del scroll
        if (deltaY > 0 && window.pageYOffset === 0) {
            // Prevenir el comportamiento por defecto del navegador (refrescar)
            e.preventDefault();
            reloadContent.style.transform = "translateY(" + deltaY + "px)";
        }
    }
}

// Función para manejar el evento touchend
function handleTouchEnd(e) {
    // Si se estaba tocando la pantalla y se suelta el dedo
    if (window.pageYOffset <= 0) {
        // Restablecer la posición del contenido y el indicador con una transición suave
        reloadContent.style.transition = "transform 0.3s ease-out";
        reloadContent.style.transform = "translateY(0)";
        
        setTimeout(() =>{reloadContent.style.transition = "none"}, 300);
            
        // Si la distancia superaba el umbral, indicar que se está refrescando y cambiar el texto del indicador
        if (deltaY >= threshold) location.reload();
    }
}

// Añadir los listeners para los eventos touchstart, touchmove y touchend
document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchmove", handleTouchMove);
document.addEventListener("touchend", handleTouchEnd);
 



 
let staggerCards;
let bordersWraper;
let anchorMarkers;

if (window.matchMedia('(max-width: 700px)').matches) {
    staggerCards = 0.23;
    bordersWraper = 15;
    anchorMarkers = "20% top";
    
    let fadeIntro_mobile = document.querySelector(".Offcanvas_container.canvas_mobile");
    let tlIntro = gsap.timeline()
    
    tlIntro.to(fadeIntro_mobile, {y: 0, opacity: 1, duration: 0.8, ease:Power2.easeOut})
          .to("#introSec h1", {opacity: 1}, 0.4)
    
    ScrollTrigger.create({
        trigger: "#introSec > div:first-child",
        start: "top 20%",
        // markers: {startColor: "purple", endColor: "black", fontSize: "12px"},
        animation: tlIntro,
    })
   
} else{
    staggerCards = 0.1;
    bordersWraper = 25;
    anchorMarkers = "top top";
    
    let canvasIntro = document.querySelectorAll(".Offcanvas_container.canvas_desk > a");
    canvasIntro.forEach(canvas =>{
        let position;
        (canvas.id == "Offcanvas_left") ? position = -100 : position = 100;
        
        gsap.from(canvas, { 
            xPercent: position,
            scrollTrigger: {
                // trigger: canvas,
                // start: "top 55%",
                // end: "bottom bottom",
                trigger: "#introSec > div:first-child",
                start: "55% 50%",
                end: "bottom top",
                scrub: 1.2,
            }
        });
    });
    
    gsap.to("#introSec h1", {
        opacity: 1,
        scrollTrigger: {
            // trigger: "#introSec h1",
            // start: "top 30%",
            trigger: "#introSec > div:first-child",
            start: "bottom 30%",
            toggleActions: "restart none none reverse"
        }
    })
}





toVideos_btn.addEventListener("click", ()=>{
    smoother.scrollTo("#quotes_slide", true, anchorMarkers);
});

let mEffect_header = document.getElementById("mEffect_header");
let scrollPos = window.scrollY;

window.addEventListener("scroll", () =>{
    let currentScroll = window.scrollY; 
 
    if (currentScroll > scrollPos){
        mEffect_header.classList.add("disable");
    }else if (currentScroll <= scrollPos){
        mEffect_header.classList.remove("disable");
    }
    
    scrollPos = currentScroll;
});


let galleryRow = document.querySelectorAll("#scroll_gallery > div");
galleryRow.forEach((row, index) =>{
    
    let elems = row.querySelectorAll("p, img");
    let arr;
    
    (index % 2 == 0) ? arr = [...elems] : arr = [...elems].reverse() ;
    
    gsap.to(arr, { 
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.17,
        scrollTrigger: {
            trigger: row,
            start: "50% 100%",
            // markers: {startColor: "green", endColor: "black", fontSize: "12px"},
        }
    });
})






// Video cards animation
let video_row = document.getElementById("video_row");
let video_cards = document.querySelectorAll("#video_row > .video_card");
let txt_videoCards = document.querySelector("#video_row > div:last-child");



let tlcards = gsap.timeline()
// tlcards.to(video_cards, {ease: Power0.easeNone, stagger: staggerCards, x: -window.innerWidth})
tlcards.fromTo(video_cards,{x: "110%"}, {stagger: staggerCards, ease: Power0.easeNone, x: -window.innerWidth})

      .to(video_cards[0], {rotation: -7, yPercent: -10}, 0)
      .to(video_cards[1], {rotation: 7}, staggerCards)
      .to(video_cards[2], {yPercent: 10}, staggerCards * 2)
      .to(video_cards[3], {rotation: -7}, staggerCards * 3)
      .to(video_cards[4], {rotation: 7}, staggerCards * 4)
      .to(video_cards[5], {yPercent: 10}, staggerCards * 5)
      .to(video_cards[6], {rotation: -7}, staggerCards * 6)
      .to(video_cards[7], {rotation: 7, yPercent: 10}, staggerCards * 7)
      .fromTo(txt_videoCards, {x: "110%"}, {ease: Power0.easeNone, x: -((window.innerWidth/2) - (txt_videoCards.offsetWidth/2) - bordersWraper - 5), duration: 0.25 }, staggerCards * 8.5)
       

ScrollTrigger.create({
    trigger: video_row,
    start: "0% 70%",
    end: `+=${window.innerHeight * 1.8}`,
    scrub: 1.1,
    animation: tlcards,
})
    
gsap.to(video_row, {
    scrollTrigger: {
        trigger: video_row,
        start: "center center", 
        end: `+=${window.innerHeight * 1.4} center`,
        scrub: 1.2,
        pin: true,
    }
}); 







// const columns = document.querySelectorAll("#scroll_gallery > div");
// const columns_container = document.getElementById("scroll_gallery");

// const setScrollTrigger = (timeline) =>{
//     ease: Power0.easeNone
//     ScrollTrigger.create({
//         trigger: columns_container,
//         start: "50% center",
//         end: `+=${window.innerHeight * 1.7} center`,
//         scrub: 1.5,
//         animation: timeline,
//     });  
// }

// columns.forEach((column, index) =>{
//     let top_pos;
//     let bottom_pos;
    
//     if(index == 0 || index == 2){
//         top_pos = "20%";
//         bottom_pos = "auto";
        
//         let tlcolumnsEnds = gsap.timeline()
//         tlcolumnsEnds.to(column, {top: top_pos})
//         tlcolumnsEnds.to(column, {duration: 0, bottom: bottom_pos})
//         setScrollTrigger(tlcolumnsEnds);
    
//     } else{
//         top_pos = "auto";
//         bottom_pos = "20%";
        
//         let tlcolumnCenter = gsap.timeline()
//         tlcolumnCenter.to(column, {duration: 0, bottom: bottom_pos})
//         tlcolumnCenter.to(column, {top: top_pos})
//         setScrollTrigger(tlcolumnCenter);
//     }
// });

// gsap.to(columns_container, {
//     scrollTrigger: {
//         trigger: columns_container,
//         start: "50% center",
//         end: `+=${window.innerHeight * 1.7} center`,
//         scrub: 1.2,
//         pin: true
//     }
// }); 





let gradientPin = document.querySelectorAll(".gradientSec");
gradientPin.forEach(gradient =>{
    gsap.to(gradient, {
        scale: 1,
        scrollTrigger: {
          trigger: gradient,
          start: "50% center",
          end: "bottom center",
          scrub: 1.2,
          pin: true,
        }
    }); 
    
});






const quotesSlide = new Swiper('#quotes_slide', {
    touchEventsTarget: '#quotes_slide',
    autoplay: {
        delay: 5000,
        disableOnInteraction: false, 
    },
    
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    
    speed: 800,
    loop: true,
    effect: 'slide',
});


// Litebox 
let ourStory_video = new LiteBoxPro({
    dom_element: '#ourStory_video',
});

let videoGallery = new LiteBoxPro({
    dom_element: '.videoGall',
    
    line_width: 3,
    arrows: {
        default: {
            img_width: "65px",
            img_height: "65px",
            position_left: {
                left: "60px",
            },
            position_right: {
                right: "60px"
            }
        },
        
    	mobile: {
    	    hide: false,
    		img_width: "33px",
    		img_height: "53px",
    		
            position_left: {
                left: "55px",
            },
            position_right: {
                right: "55px"
            }
    	}
    },
    
    pager: {
        default: {
            hide: false,
            click_width: "12",
            click_height: "32"
        },
    },
});

let galleryContainer = document.querySelector(".lbxp > div:nth-child(2)");
galleryContainer.addEventListener("click", (e) =>{
    if(e.target != galleryContainer.childNodes[0]) document.querySelector(".lbxp > div").click()
});

//Pagination settings
const setPager = () =>{
    document.querySelectorAll(".lbxp > div:nth-child(3) svg circle").forEach(pager =>{
        let computedStyle = window.getComputedStyle(pager);
        let opacity = computedStyle.fillOpacity;
        
        (opacity == 1) ? pager.parentNode.classList.add("pagerActive") : pager.parentNode.classList.remove("pagerActive");
    })
}

const galleryBox = document.querySelector('.lbxp > div:nth-child(2)');

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes') setPager();
  });
});

const config = { childList: true, subtree: true, attributes: true };
observer.observe(galleryBox, config);


ScrollTrigger.sort();
window.addEventListener("resize", () => {
    gsap.killTweensOf(video_cards);
    gsap.killTweensOf(txt_videoCards);

    // Crea las animaciones nuevamente
    let tlcards = gsap.timeline();
    tlcards.fromTo(video_cards,{x: "110%"}, {stagger: staggerCards, ease: Power0.easeNone, x: -window.innerWidth})
    // tlcards.to(video_cards, {ease: Power0.easeNone, stagger: staggerCards, x: -window.innerWidth})
      .to(video_cards[0], {rotation: -7, yPercent: -10}, 0)
      .to(video_cards[1], {rotation: 7}, staggerCards)
      .to(video_cards[2], {yPercent: 10}, staggerCards * 2)
      .to(video_cards[3], {rotation: -7}, staggerCards * 3)
      .to(video_cards[4], {rotation: 7}, staggerCards * 4)
      .to(video_cards[5], {yPercent: 10}, staggerCards * 5)
      .to(video_cards[6], {rotation: -7}, staggerCards * 6)
      .to(video_cards[7], {rotation: 7, yPercent: 10}, staggerCards * 7)
      .fromTo(txt_videoCards,{x: "110%"}, {ease: Power0.easeNone, x: -((window.innerWidth/2) - (txt_videoCards.offsetWidth/2) - bordersWraper - 5), duration: 0.25 }, staggerCards * 8.5)

    // Asocia las animaciones con un nuevo objeto ScrollTrigger
    ScrollTrigger.create({
      trigger: video_row,
      start: "0% 70%",
      end: `+=${window.innerHeight * 1.8}`,
      scrub: 1.1,
      animation: tlcards,
    });
      
    ScrollTrigger.refresh();
});
   