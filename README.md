# Challenge Broobe

# Tecnologias utilizadas:
REACT JS
HTML
CSS
JAVASCRIPT

# Descripcion del proyecto

- Se realizo un Login de usuarios con email y contraseña el cual se puede acceder publicamente. Em la misma pantalla se creo un link para registrar un nuevo usuario
https://challenge-broobe-ezepuglisi.vercel.app/login 

- Se realizo un registro de usuarios con nombre de usuario, email y contraseña. Una vez creado el usuario la misma aplicación te lleva hacia la pantalla de login para iniciar sesión. 
https://challenge-broobe-ezepuglisi.vercel.app/register

- Se realizo un listado de Issues en la ruta principal del proyecto. En caso de no estar autenticado, la app te lleva automaticamente hacia la pagina de login. En caso de no tener ningun issue, se notifica al usuario de ello y se lo invita a crear uno nuevo. Cada issue tiene un boton para editarlo y otro para eliminarlo. En el caso de eliminar, se abre un modal confirmando con el usuario esta acción.
https://challenge-broobe-ezepuglisi.vercel.app/

- Funcionalidad para crear un nuevo issue. La misma es un formulario con Nombre de issue, descripcion y prioridad. Se agrego un limite para el nombre de la issue y otro para la descripcion. No se puede acceder a esta pantalla sin estar logueado en la app.
https://challenge-broobe-ezepuglisi.vercel.app/createIssue

- Edicion de issues. Se creo una pantalla para editar un issue, la cual es similar a la de la creación, salvo que ya tiene los campos completados con los datos del issue. La misma cuenta con un boton para actulizar los datos del issue tanto en la base de datos como en la webapp. No se puede acceder a esta pantalla sin estar logueado en la app. Esta pantalla requiere de un id
https://challenge-broobe-ezepuglisi.vercel.app/createIssue/id

- Cuando uno esta logueado, tiene un menu en la parte superior con su email y un boton para poder desloguearse de la app. En el caso de realizar esto ultimo, automaticamente el usuario es redirigido al login.


