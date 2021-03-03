$(function(){
    var $container=$('#app-body').find('.tv-shows');
    var template='<article class="tv-show">'+
    '<div class="left img-container">'+
        '<img src=":img:" alt=":img alt:">  '+   
    '</div>'+
    '<div class="right info">'+
        '<h1>:name:</h1>'+
        '<p>:summary:</p>'+
    '</div>'+
'</article>';  

    function renderShows(data){
        $container.find('.loader').remove();

        data.forEach(function (show){
            var article=template
            .replace(':name:',show.name)
            .replace(':img:',show.image.medium)
            .replace(':summary:',show.summary)
            .replace(':img alt:',show.name+" Logo")

            var $article=$(article);
            $container.append($article);
        })    
    }


    //submit search form
    $('#app-body').find('form').submit(function (ev){

        ev.preventDefault();
        var busqueda=$(this).find('input[type="text"]').val();
        //console.log('se ha buscado: '+busqueda);

        $container.find('.tv-show').remove();
        var $loader=$('<div class="loader">');
        $loader.appendTo($container);
        $.ajax({
            url:'http://api.tvmaze.com/search/shows',
            data:{q:busqueda},
            success:function(res,textStatus,xhr){

                $loader.remove();                                

                var shows= res.map(function(e){
                    return e.show;
                })
                renderShows(shows); 
            }
        });
    })  
              
    //request de shows

    if(!localStorage.data){

        $.ajax({
            url:'http://api.tvmaze.com/shows',
            success:function(data,textStatus,xhr){
                //console.log(data);            
                $container.find('.loader').remove();
                localStorage.data=JSON.stringify(data);
                renderShows(data);
            }
        }); 

        console.log('true');
    }else{
        console.log('else');
        renderShows(JSON.parse(localStorage.data))
    }


    /*
    --sin localStorage
    $.ajax({
        url:'http://api.tvmaze.com/shows',
        success:function(data,textStatus,xhr){
            //console.log(data);            
            $container.find('.loader').remove();
            localStorage.data=JSON.stringify(data);
            renderShows(data);
        }
    });  
    */        
})