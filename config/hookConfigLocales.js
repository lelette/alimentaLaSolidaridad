/*
*	Este archivo estara dedicado a la modificacion de variables de configuracion.
*/


// aumentamos el tiempo de carga de todos los hooks, en especial el de orm que 
// tarda por la migracion

module.exports.hookTimeout = 2000000000;
