//login//
var provider = new firebase.auth.GoogleAuthProvider();


$('#login').click(function(){
	firebase.auth()
	.signInWithPopup(provider)
	.then(function(result) {
		console.log(result.user);
		guardaDatos(result.user);
		$('#login').hide();
		$('#root').append("<img src='"+result.user.photoURL+"''/>")

	});	
});	


//Función para guardar automáticamente
function guardaDatos(user){
	var usuario = {
		uid:user.uid,
		nombre:user.displayName,
		email:user.email,
		foto:user.photoURL
	}

	firebase.database().ref("mail")
	.set(usuario)
};

//aquí estoy leyendo de la BD

firebase.database().ref("mail")
.on("child_added",function(s){
	var user = s.val();
	$("#root").append("<img src='"+user.foto+"' alt="" />")
});


//Escribir en la base de datos

$('#guardar').click(function(){
	firebase.database().ref("mail")
	.set({
		nombre:"Tabatha",
		edad:"2",
		sexo:"femenina"
	})
});