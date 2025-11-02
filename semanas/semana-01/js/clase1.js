const nombres = ['Charlie', 'Camila', 'Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais','Tais', 'Mateo', 'Maria', 'ALddrin', 'Cristian']

//primer paso: recorrer el arreglo

for (let index = 0; index < nombres.length; index++) {
    console.log(nombres[index]);
    if (nombres[index] === 'Maria') {
        console.log(`Se encontró a Maria en la posición ${index}`);
        break
    }
}