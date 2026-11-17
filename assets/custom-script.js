// My Account Tabbing JS

document.querySelectorAll(".account-menu li").forEach(function(tab){
tab.addEventListener("click",function(){
document.querySelectorAll(".account-menu li").forEach(function(item){
item.classList.remove("active");
});


if (window.innerWidth <= 768) {
  var tab_sidebar =   document.querySelector(".account-sidebar");
  tab_sidebar.classList.remove('active');
}

this.classList.add("active");
let tabID = this.getAttribute("data-tab");
document.querySelectorAll(".tab-content").forEach(function(content){
content.classList.remove("active");
});
document.getElementById(tabID).classList.add("active");
});

});

const toggleBtn = document.querySelector(".account-toggle-btn");
const sidebar = document.querySelector(".account-sidebar");

if(toggleBtn && sidebar){
document.querySelector(".account-toggle-btn").addEventListener("click", function(){
document.querySelector(".account-sidebar").classList.toggle("active");
});
}


// end



// document.addEventListener("DOMContentLoaded", function () {
//   const modal = document.getElementById("requestModal");
//   const openBtns = document.querySelectorAll("#openModal");

//   if (!modal || !openBtns.length) return;

//   function openModal() {
//     modal.classList.add("active");
//     document.body.classList.add("modal-open");
//   }

//   function closeModal() {
//     modal.classList.remove("active");
//     document.body.classList.remove("modal-open");
//   }

//   openBtns.forEach(btn => {
//     btn.addEventListener("click", function (e) {
//       e.preventDefault();
//       openModal();
//     });
//   });

//   modal.querySelector(".modal-close").onclick = closeModal;
//   modal.querySelector(".modal-overlay").onclick = closeModal;
// });


// document.addEventListener("DOMContentLoaded", function () {

//     const quoteBtn = document.querySelector(".request-product");

//     if (quoteBtn) {

//         quoteBtn.addEventListener("click", function () {

//             // variant id
//             const variantInput =
//                 document.querySelector(".product-variant-id");

//             const variantId =
//                 variantInput ? variantInput.value : '';

//             // product title
//             const productTitle =
//                 document.querySelector("h1.product__title")?.innerText || '';

//             // quantity
//             const qtyInput =
//                 document.querySelector('input[name="quantity"]');

//             const quantity =
//                 qtyInput ? qtyInput.value : 1;

//             // textarea
//             const quoteDescription =
//                 document.querySelector('textarea[name="quote_description"]');

//             // product search input
//             const productSearch =
//                 document.querySelector('#productSearch');

//             // auto fill textarea
//             if (quoteDescription) {

//                 quoteDescription.value =
//  `${quantity} x ${productTitle}`;

//             }

//             // auto fill product field
//             if (productSearch) {

//                 productSearch.value = productTitle;

//                 // optional
//                 productSearch.setAttribute(
//                     'data-variant-id',
//                     variantId
//                 );
//             }

//             // OPEN POPUP
//             const popup = document.querySelector(".requestModalForm");

//             if (popup) {

//                 popup.classList.add("modal-open");

//                 // if using display none
//                 popup.style.display = "modal-close";
//             }

//         });

//     }

// });

document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("requestModal");
  const openBtns = document.querySelectorAll("#openModal123");
  const form = modal.querySelector(".request-quote-form");

  if (!modal || !openBtns.length) return;

  function closeModal() {

    modal.classList.remove("active");
    document.body.classList.remove("modal-open");

    if (form) {

      form.querySelectorAll(".error").forEach(el => el.remove());

      form.querySelectorAll(".input-error").forEach(el =>
        el.classList.remove("input-error")
      );

      form.reset();

      form.querySelectorAll(".shipping_input").forEach(input => {
        input.disabled = false;
      });
    }
  }

  openBtns.forEach(btn => {

    btn.addEventListener("click", function (e) {

      e.preventDefault();

      // =========================
      // PRODUCT AUTO SELECT
      // =========================

      const variantInput =
        document.querySelector(".product-variant-id");

      const variantId =
        variantInput ? variantInput.value : '';

      const productTitle =
        document.querySelector("h1.product__title")?.innerText || '';

      const qtyInput =
        document.querySelector('input[name="quantity"]');

      const quantity =
        qtyInput ? qtyInput.value : 1;

      const quoteDescription =
        document.querySelector('textarea[name="quote_description"]');

      const productSearch =
        document.querySelector('#productSearch');

      // textarea fill
      if (quoteDescription) {

        quoteDescription.value =
          `${quantity}  ${productTitle}`;
      }

      // product input fill
      if (productSearch) {

        productSearch.value = productTitle;

        productSearch.setAttribute(
          'data-variant-id',
          variantId
        );
      }

      // =========================
      // OPEN MODAL
      // =========================

      modal.classList.add("active");
      document.body.classList.add("modal-open");

    });

  });

  modal.querySelector(".modal-close").onclick = closeModal;
  modal.querySelector(".modal-overlay").onclick = closeModal;

});


document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("requestModal");
  const openBtns = document.querySelectorAll("#openModal");
  const form = modal.querySelector(".request-quote-form");

  
      if (!modal || !openBtns.length) return;

    function closeModal() {
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");

      if (form) {
        //  Remove error messages
        form.querySelectorAll(".error").forEach(el => el.remove());

        //  Remove red border class
        form.querySelectorAll(".input-error").forEach(el =>
          el.classList.remove("input-error")
        );

        //  Reset all fields
        form.reset();

        //  Enable shipping fields again (important if disabled earlier)
        form.querySelectorAll(".shipping_input").forEach(input => {
          input.disabled = false;
        });
      }
    }

    openBtns.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
      
        modal.classList.add("active");
        document.body.classList.add("modal-open");
      });
    });

  modal.querySelector(".modal-close").onclick = closeModal;
  modal.querySelector(".modal-overlay").onclick = closeModal;


  const icon = document.querySelector(".tooltip-icon");
  const tooltip = document.querySelector(".tooltip-box");

  if (icon && tooltip) {

    icon.addEventListener("click", function(e){
      e.stopPropagation();
      tooltip.classList.toggle("active");
    });

    tooltip.addEventListener("click", function(e){
      e.stopPropagation();
    });

    document.body.addEventListener("click", function(){
      tooltip.classList.remove("active");
    });

  }



 // change password js
  const changeEmail = document.getElementById("changeEmail");
  const emailBox = document.querySelector(".change-email-box");

  if(changeEmail){

  changeEmail.addEventListener("change", function(){

  if(this.checked){
  emailBox.style.display = "block";
  }else{
  emailBox.style.display = "none";
  }
  });
  }

// Change password
const changePassword = document.getElementById("changePassword");
const passwordBox = document.querySelector(".change-password-box");
const newPassword = document.getElementById("newPassword");
const strengthText = document.getElementById("strengthText");
const strengthBox = document.getElementById("passwordStrengthBox");

if(changePassword){

changePassword.addEventListener("change", function(){

if(this.checked){
passwordBox.style.display = "block";
}else{
passwordBox.style.display = "none";
}

});
}
if(newPassword){
newPassword.addEventListener("input", function(){

let value = this.value.length;

strengthBox.classList.remove("very-weak","weak","medium","strong");

if(value < 4){
strengthText.innerText = "Very Weak";
strengthBox.classList.add("very-weak");
}
else if(value < 6){
strengthText.innerText = "Weak";
strengthBox.classList.add("weak");
}
else if(value < 10){
strengthText.innerText = "Medium";
strengthBox.classList.add("medium");
}
else{
strengthText.innerText = "Strong";
strengthBox.classList.add("strong");
}

});
}


  
// document.addEventListener("click", function(e){

//   let btn = e.target.closest('button[name="add"]');

//   if(btn){
//     e.preventDefault();
//     e.stopImmediatePropagation();

//     let form = btn.closest("form");

//     if(form){

//       let formData = new FormData(form);
//       let variantId = formData.get('id');
//       let quantity = formData.get('quantity') || 1;
//       let customer_gp = formData.get('custom_price');


//       fetch('https://allinone.shopifydevelopmentcompany.com/api/cs-create-custom-draft-order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           variant_id: variantId,
//           quantity: quantity,
//           customer_gp: customer_gp,
//         })
//       })
//       .then(res => res.json())
//       .then(data => {
//         if(data.url){
//           window.location.href = data.url;
//         }
//       });

//     }
//   }

// }, true);

});


// Product Confirmation

// document.addEventListener("DOMContentLoaded", function() {

//   const modal = document.getElementById("hazmatModal");
//   const btn = document.getElementById("openModalBtn");
//   const closeBtn = document.querySelector(".hazmat-close");

//   btn.addEventListener("click", function() {
//     modal.style.display = "block";
//   });

//   closeBtn.addEventListener("click", function() {
//     modal.style.display = "none";
//   });

//   window.addEventListener("click", function(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   });

// });


// // Interest Modal
// document.addEventListener("DOMContentLoaded", function() {

//   const modal = document.getElementById("refrigerantModal");
//   const btn = document.getElementById("openRefrigerantModal");
//   const closeBtn = document.querySelector(".refrig-close");

//   btn.addEventListener("click", function() {
//     modal.style.display = "block";
//   });

//   closeBtn.addEventListener("click", function() {
//     modal.style.display = "none";
//   });

//   window.addEventListener("click", function(e) {
//     if (e.target == modal) {
//       modal.style.display = "none";
//     }
//   });

// });


// Order Table JS
document.querySelectorAll(".custom-table th").forEach((th,index)=>{
  th.addEventListener("click",function(){

    let table = th.closest("table");
    let tbody = table.querySelector("tbody");
    let rows = Array.from(tbody.querySelectorAll("tr"));

    let column = th.cellIndex;
    let asc = th.classList.toggle("asc");

    rows.sort((a,b)=>{
      let x = a.cells[column].innerText.toLowerCase();
      let y = b.cells[column].innerText.toLowerCase();
      return asc ? x.localeCompare(y) : y.localeCompare(x);
    });

    rows.forEach(row=>tbody.appendChild(row));

    table.querySelectorAll("th").forEach(h=>{
      h.querySelector(".sort-icon").innerHTML="⇅";
    });

    th.querySelector(".sort-icon").innerHTML = asc ? "▲" : "▼";

  });

});



