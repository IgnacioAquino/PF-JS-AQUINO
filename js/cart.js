// CART
const events = ()=>{
    const btn = document.querySelector('#checkout');
    btn.addEventListener('click', ()=>{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Muchas gracias por su compra!',
            showConfirmButton: false,
            timer: 1500
          });
        localStorage.removeItem('cart');
        location.reload(true);
        
        
        
}); 
}



const agregarCart = (cart)=> {
    let cartContainer = document.querySelector('#cart');
    let container = document.querySelector('#cartContainer');
    if (container)
    {
        container.parentNode.removeChild(container);
    }

    let div = document.createElement('div');
    div.setAttribute('id', 'cartContainer');
    div.innerHTML += `<h2>Carrito de compras</h2>`
    for (prodCart of cart)
    {
        div.innerHTML += `
            <div class="cart-item" id="lista">
            <h4 class="product">Producto: ${prodCart.name}</h4>
            <h3 class="precio">Precio: ${prodCart.precioLista}</h3>
            <h3 class="cantidad">Cantidad: ${prodCart.quantity}</h3>
            </div>

        `;
    }

    const total = cart.reduce((acc,item) => acc + item.precioLista * item.quantity, 0);

    div.innerHTML+= `
        <div class="cart-item">
        <h4 class="total">Total: $${total}</h4>
        </div>`;

        
    div.innerHTML+= `<button id="checkout">Finalizar Compra</button>`
    cartContainer.appendChild(div);
    events();

}

const shopCart = JSON.parse(localStorage.getItem('cart')) || [];
agregarCart(shopCart);