//--------------------------lista las categorias
function leercate() {


    //db.collection('categoria').orderBy("id_cate", "asc").onSnapshot((querySnapshot) => {
    db.collection("categoria").get().then((querySnapshot) => {
        document.getElementById('prueba').innerHTML = '';

        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);

            //document.getElementById('prueba').innerHTML += `
            ///${doc.data().id_cate} - ${doc.data().nombre}<br>
            //`
            document.getElementById('prueba').innerHTML += `
            <tr>
            <td>${doc.data().id_cate}</td>
            <td>${doc.data().nombre}</td>
            <td>
            <img src="img/editar.png" width="20" onclick="editarca('${doc.data().nombre}', '${doc.id}');" title="Editar" data-toggle="modal" data-target="#acategoria" alt=""> 
            
            <img src="img/borrar.png" width="20" title="Borrar" onclick="eliminar('categoria', '${doc.id}');" alt="">
            </td>
        </tr>
    
    `


        });
    });

}