restarProducto = e => {
    if(e.target.classList.contains('brr')){
       const restar = carrito[e.target.dataset.id];
       
        if (restar.cantidad === 0) {   
           //incorporando libreria
            Swal.fire({
                icon: 'error',
                title: 'Vacio',
                text: 'El carrito quedo vacio con este producto'
            })
            delete carrito[e.target.dataset.id];
        } else {
            restar.cantidad = carrito[e.target.dataset.id].cantidad - 1;
            //Spread que resta un producto
            carrito[restar.id] = {...restar};
        }
    }
    localStorage.setItem("carrito",JSON.stringify(carrito));
    mostrarCompra();
}

unPago =(ticket)=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Confirmar compra?',
            text: `un pago de $${ticket}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Comprar!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Exito!',
                    `Su pago de $${ticket} fue aceptado`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Error',
                    `su compra de $${ticket} fue cancelada`,
                    'error'
                )
            }
        localStorage.clear();
        agregados.innerHTML ="";
        cerrado.innerHTML ="";
        return ticket;
    }) 
}
tresPagos=(ticket)=>{
    let tresCuotas = (ticket / 3) * 1.10;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Confirmar compra?',
            text: `3 cuotas de $${Math.round(tresCuotas)}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Comprar!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Exito!',
                    `Su primer pago de $${Math.round(tresCuotas)} fue aceptado`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Error',
                    `su compra en 3 cuotas de $${Math.round(tresCuotas)} fue cancelada`,
                    'error'
                )
            }
        localStorage.clear();
        agregados.innerHTML ="";
        cerrado.innerHTML ="";
        return tresCuotas;
    }) 
}
seisPagos=(ticket)=>{
    let seisCuotas = (ticket / 6) * 1.15;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Confirmar compra?',
            text: `6 cuotas de $${Math.round(seisCuotas)}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Comprar!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Exito!',
                    `Su primer pago de $${Math.round(seisCuotas)} fue aceptado`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Error',
                    `su compra en 6 cuotas de $${siesCuotas} fue cancelada`,
                    'error'
                )
            }
        localStorage.clear();
        agregados.innerHTML ="";
        cerrado.innerHTML ="";
        return seisCuotas;
    }) 
}
docePagos=(ticket)=>{
    let doceCuotas = (ticket / 12) * 1.20;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Confirmar compra?',
            text: `12 cuotas de $${Math.round(doceCuotas)}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Comprar!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Exito!',
                    `Su primer pago de $${Math.round(doceCuotas)} fue aceptado`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Error',
                    `su compra en 12 cuotas de $${Math.round(doceCuotas)} fue cancelada`,
                    'error'
                )
            }
        localStorage.clear();
        agregados.innerHTML ="";
        cerrado.innerHTML ="";
        return doceCuotas;
    })
}