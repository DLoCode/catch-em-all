let a=function(){let f=[];function a(a){'object'==typeof a&&'name'in a&&'detailsUrl'in a?f.push(a):console.log('incorrect pokemon')}function b(){return f}function c(a){d(a).then(function(){e(a)})}function d(a){return fetch(a.detailsUrl).then(function(a){return a.json()}).then(function(b){a.imageUrl=b.sprites.front_default,a.height=b.height,a.types=b.types}).catch(function(a){console.error(a)})}function e(a){$('#pokemon-name').empty(),$('#pokemon-height').empty(),$('#pokemon-image').empty(),$('#pokemon-types').empty();let b=$('<h5>'+a.name+'</h5>'),c=$('<p>height: '+a.height+'</p>'),d=$('<img src="'+a.imageUrl+'"alt='+a.name+'>'),e=[];a.types.forEach(function(a){e.push(a.type.name)});let f=$('<p>types: '+e.toString()+'</p>');$('#pokemon-name').html(b),$('#pokemon-height').append(c),$('#pokemon-image').append(d),$('#pokemon-types').append(f),$('#modal').modal('show')}return{add:a,getAll:b,addListItem:function(d){let e=document.querySelector('.list-group'),b=document.createElement('li');b.classList.add('group-list-item','col-sm-6');let a=document.createElement('button');a.innerText=d.name,a.classList.add('btn','btn-primary','btn-block','poke-button'),a.setAttribute('data-target','#exampleModal'),a.setAttribute('data-toggle','modal'),b.appendChild(a),e.appendChild(b),a.addEventListener('click',function(){c(d)})},showDetails:c,loadList:function(){return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150').then(function(a){return a.json()}).then(function(b){b.results.forEach(function(b){a({name:b.name,detailsUrl:b.url})})}).catch(function(a){console.error(a)})},loadDetails:d,showModal:e}}();a.loadList().then(function(){a.getAll().forEach(function(b){a.addListItem(b)})})
