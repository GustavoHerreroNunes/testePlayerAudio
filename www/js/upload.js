var app = {

    //Referência para o bucket do Storage
    storage: firebase.storage(),

    //Construtor do app
    initialize: function(){
        console.info("Iniciando...");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    //Quando todas as estruturas cordova tiverem inicializado
    onDeviceReady: function(){
        console.info("Device Ready");
        document.getElementById("btnUpload").addEventListener('click', app.upload);
    },

    //Cria um objeto file e envia o arquivo para o storage
    upload: function(){
        try{
            console.log("AAAA");
            var filesSended = [];
    
            filesSelector = document.getElementById("btnCarregar");

            console.log(filesSelector.files.length);
    
            for(var i = 0; i< filesSelector.files.length; i++){
                filesSended[i] = filesSelector.files[i];
    
                console.log(i + "º arquivo: " + filesSended[i].name);
            }

        }catch(error){
            console.log(error);
        }


        try{
            var refRoot = app.storage.ref().root;
            console.log("Referenciando o root");
    
            var refSouds = refRoot.child('sounds');
            console.log("Referenciando o \/sounds");

            var i = 0;

            // Enviando arquivo para o storage
            do{
                var refFiel = refSouds.child(filesSended[i].name);
    
                var uploadTask = refFiel.put(filesSended[i]);
                console.log("AAA");
    
                uploadTask.on('state_changed',
                    function(snapshot){
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.info( (i+1) + "º Upload em " + progress + " %");
        
                        switch(snapshot.state){
                            case 'paused':
                                console.info("Upload pausado");
                                break;
                            case 'running':
                                console.info("Upload rodando");
                                break;
                        }
                    },
                    function(error){
                        switch(error.code){
                            case 'storage/unauthorized':
                                console.info("Usuário não autorizado");
                                break;
                            case 'storage/canceled':
                                console.info("Upload cancelado");
                                break;
                        }
                    },
                    function(){
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                            console.log("Upload concluído!");
                            console.log("URL para download: " + downloadURL);
                        });

                        i++;
                    }
                );
                
            }while(i < filesSended.length);


        }catch(error){
            console.log("Erro: " + error);
        }

    }
};

app.onDeviceReady();