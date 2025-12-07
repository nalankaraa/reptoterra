(function($) {

  "use strict";

  var initPreloader = function() {
    $(document).ready(function($) {
    var Body = $('body');
        Body.addClass('preloader-site');
    });
    $(window).load(function() {
        $('.preloader-wrapper').fadeOut();
        $('body').removeClass('preloader-site');
    });
  }

  // init Chocolat light box
	var initChocolat = function() {
		Chocolat(document.querySelectorAll('.image-link'), {
		  imageSize: 'contain',
		  loop: true,
		})
	}

  var initSwiper = function() {

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var bestselling_swiper = new Swiper(".bestselling-swiper", {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 500,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
      }
    });

    var testimonial_swiper = new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var products_swiper = new Swiper(".products-carousel", {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 500,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },

      }
    });

  }

  var initProductQty = function(){

    $('.product-qty').each(function(){

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          if(quantity>0){
            $el_product.find('#quantity').val(quantity - 1);
          }
      });

    });

  }

  // init jarallax parallax
  var initJarallax = function() {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  // document ready
  $(document).ready(function() {
    
    initPreloader();
    initSwiper();
    initProductQty();
    initJarallax();
    initChocolat();

        // product single page
        var thumb_slider = new Swiper(".product-thumbnail-slider", {
          spaceBetween: 8,
          slidesPerView: 3,
          freeMode: true,
          watchSlidesProgress: true,
        });
    
        var large_slider = new Swiper(".product-large-slider", {
          spaceBetween: 10,
          slidesPerView: 1,
          effect: 'fade',
          thumbs: {
            swiper: thumb_slider,
          },
        });

    window.addEventListener("load", (event) => {
      //isotope
      $('.isotope-container').isotope({
        // options
        itemSelector: '.item',
        layoutMode: 'masonry'
      });


      var $grid = $('.entry-container').isotope({
        itemSelector: '.entry-item',
        layoutMode: 'masonry'
      });


      // Initialize Isotope
      var $container = $('.isotope-container').isotope({
        // options
        itemSelector: '.item',
        layoutMode: 'masonry'
      });

      $(document).ready(function () {
        //active button
        $('.filter-button').click(function () {
          $('.filter-button').removeClass('active');
          $(this).addClass('active');
        });
      });

      // Filter items on button click
      $('.filter-button').click(function () {
        var filterValue = $(this).attr('data-filter');
        if (filterValue === '*') {
          // Show all items
          $container.isotope({ filter: '*' });
        } else {
          // Show filtered items
          $container.isotope({ filter: filterValue });
        }
      });

    });

  }); // End of a document

})(jQuery);

// =========================================
// SEPETE EKLEME İŞLEMİ (Event Delegation)
// =========================================
document.addEventListener("click", function (e) {
    // Tıklanan elementin .add-to-cart butonu olup olmadığını kontrol et
    const btn = e.target.closest(".add-to-cart");
    if (!btn) return;

    e.preventDefault();

    // Ürün objesini oluştur
    let product = {
        name: btn.dataset.name,
        price: Number(btn.dataset.price),
        img: btn.dataset.img, // HTML'de data-img="..." olduğundan emin ol
        qty: 1
    };

    // LocalStorage'dan sepeti çek, yoksa boş dizi oluştur
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ürün zaten var mı kontrol et
    let exists = cart.find(item => item.name === product.name);
    if (exists) {
        exists.qty++; // Varsa adedi artır
    } else {
        cart.push(product); // Yoksa yeni ekle
    }

    // Güncel sepeti kaydet ve paneli yenile
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartSidebar();
    
    // (Opsiyonel) Sepet açılsın istersen burayı açabilirsin:
    // var myOffcanvas = document.getElementById('offcanvasCart');
    // var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
    // bsOffcanvas.show();
});

// =========================================
// SEPET PANELİNİ GÜNCELLEME (RENDER)
// =========================================
function loadCartSidebar() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-items");
    let totalBtn = document.getElementById("cart-total");
    let totalAmount = 0;

    // Eğer HTML'de cart-items bulunamazsa kodu durdur (Hata vermesin)
    if (!container) return;

    // Listeyi temizle
    container.innerHTML = "";

    // Sepet boşsa mesaj göster
    if (cart.length === 0) {
        container.innerHTML = '<div class="text-center mt-4 text-muted">Sepetiniz boş.</div>';
    }

    // Ürünleri döngüyle ekle
    cart.forEach((item, index) => {
        let itemTotal = item.qty * item.price;
        totalAmount += itemTotal;

        container.innerHTML += `
            <div class="card mb-3">
                <div class="card-body d-flex align-items-center">
                    <img src="${item.img}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;" onerror="this.src='https://via.placeholder.com/60'"/>
                    
                    <div class="ms-3 flex-grow-1">
                        <h6 class="m-0">${item.name}</h6>
                        <small class="text-muted">${item.price} ₺</small>

                        <div class="d-flex align-items-center mt-2">
                            <button class="btn btn-sm btn-outline-secondary px-2" onclick="updateQty(${index}, -1)">-</button>
                            <span class="mx-2 fw-bold" style="min-width:20px; text-align:center;">${item.qty}</span>
                            <button class="btn btn-sm btn-outline-secondary px-2" onclick="updateQty(${index}, 1)">+</button>
                        </div>
                    </div>

                    <button class="btn btn-sm btn-danger ms-2" onclick="removeItem(${index})">
                        <i class="bi bi-trash"></i> Sil
                    </button>
                </div>
            </div>
        `;
    });

    // Toplam Tutarı Güncelle
    if (totalBtn) {
        totalBtn.innerText = totalAmount; // Sadece rakamı yazıyoruz, "₺" simgesi HTML'de span'in dışında kalsın
    }
}

// =========================================
// ADET GÜNCELLEME
// =========================================
function updateQty(i, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart[i]) {
        cart[i].qty += change;
        
        // Adet 1'den az olamaz
        if (cart[i].qty < 1) cart[i].qty = 1;
        
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCartSidebar();
    }
}

// =========================================
// ÜRÜN SİLME
// =========================================
function removeItem(i) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cart.splice(i, 1); // İlgili indexten 1 tane sil
    
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartSidebar();
}

// =========================================
// SAYFA YÜKLENİNCE ÇALIŞTIR
// =========================================
window.addEventListener("DOMContentLoaded", loadCartSidebar);
