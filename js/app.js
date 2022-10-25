const Products = [];
const cart = JSON.parse (localStorage.getItem('cart')) || [];

// BUTTON AGREGAR CARRITO

const events = ()=>
{
    let buttons = document.querySelectorAll('button')
    for (const button of buttons)
    {
        button.addEventListener('click', ()=> {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto agregado al carrito!',
                showConfirmButton: false,
                timer: 1500
              })
           const prod = cart.find(product => product.id == button.id);
           if(prod){
            
            prod.quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            
           } else{
            let prod = Products.find(product => product.id == button.id);
            if(prod){
                let newProduct = {
                            id: prod.id,
                            name: prod.name,
                            descripcion: prod.descripcion,
                            img: prod.img,
                            precioLista: prod.precioLista,
                            quantity: 1
                        }
                cart.push (newProduct);
                localStorage.setItem('cart', JSON.stringify(cart));
            }
           }
           agregarCart(cart);
           localStorage.setItem('cart', JSON.stringify(cart));
        })
    } 
}



const cargaProd = (Products)=>
{
    let container = document.querySelector('#container');
    for (const product of Products)
    {
        let div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.innerHTML= `
        <img src="${product.img}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>Precio:</p>
        <h3>$${product.precioLista}</h3>
        <p>${product.descripcion}</p>
        <button id="${product.id}">AGREGAR AL CARRITO</button>
        `;
        container.appendChild(div);
    }
            events();
}

    


// CARGA PRODUCTOS

const cargaData = async ()=> {
    try{
        const response = await fetch('products.json');
        const data = await response.json();
        cargaProd(data);
        Products.push(...data);
    }
    catch{(e);
        console.log(e);
    }
    
}

cargaData ();



