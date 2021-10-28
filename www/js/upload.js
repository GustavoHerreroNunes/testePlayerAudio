var app = {

    //Referência para o bucket do Storage
    storage: firebase.storage(),

    //Array com os arquivos enviados
    filesSended: [],

    //Arquivos recebidos no html
    filesHTML: 0,

    //Arquivos enviados para o firebase
    filesFirebase: 0,

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

    //Envia os arquivos para o firebase
    uploadToFirebase: function(file, refSounds){
        var refFiel = refSounds.child(file.name);
    
        var uploadTask = refFiel.put(file);
        console.log("Antes do UploadTaks");

        uploadTask.on('state_changed',
            function(snapshot){
            console.log("Uploadtask");
                
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.info( (app.filesFirebase+1) + "º Upload em " + progress + " %");

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

                app.filesFirebase++;
                if(app.filesFirebase < app.filesHTML){
                    app.uploadToFirebase(app.filesSended[app.filesFirebase], refSounds);
                }
            }
        );
    },

    //Cria um objeto file e envia o arquivo para o storage
    upload: function(){
        try{
            console.log("AAAA");
    
            var filesSelector = document.getElementById("btnCarregar");

            console.log(filesSelector.files.length);

            app.filesHTML = filesSelector.files.length;
    
            for(var i = 0; i< app.filesHTML; i++){
                app.filesSended[i] = filesSelector.files[i];
    
                console.log(i + "º arquivo: " + app.filesSended[i].name);
            }

        }catch(error){
            console.log(error);
        }


        try{
            var refRoot = app.storage.ref().root;
            console.log("Referenciando o root");
    
            var refSounds = refRoot.child('sounds');
            console.log("Referenciando o \/sounds");

            app.uploadToFirebase(app.filesSended[app.filesFirebase], refSounds);


        }catch(error){
            console.log("Erro: " + error);
        }

    }
};

app.onDeviceReady();