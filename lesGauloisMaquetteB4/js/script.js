

window.onload = function () {

    function previewImage(event){
       // Reference à l'origine de l'évenement
      var input = event.target;

      // Récupération d'un ou de champs file existants
      // et renseignés
      if (input.files && input.files[0]) {
        // Création d'un objet FileReader
        // fichier en lecture
        var reader = new FileReader();

        // Création d'un callback sur event onload
        reader.onload = (e) => {
          // Lecture de l'image en base64 
          // pour la charger dans imageData
          $("#previewImage").attr("src", e.target.result);
        }
        // Render de l'image en tant qu'URL
        // Format base64 pour affichage
        reader.readAsDataURL(input.files[0]);        
      }
    }


  // Mise en place des popover avec popper.js
  $(function () {

    $('#validatedCustomFile').change(function(event){
      previewImage(event);
    });

  })
      
};

	
