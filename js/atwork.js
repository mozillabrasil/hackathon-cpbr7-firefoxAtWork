//Capturar Data
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;

//Carregar Relógio
function startTime()
{
//Mostrar Relógio
var today=new Date();
var h=today.getHours();
var m=today.getMinutes();
var s=today.getSeconds();
// adicionar zero na frente de números menores que<10
m=checkTime(m);
s=checkTime(s);
document.getElementById('horaAtual').innerHTML=h+":"+m+"<span>s"+s+"</span>";
t=setTimeout(function(){startTime()},500);
}

function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}

//Localiza Variaveis
var coords = "";

/**Localização atual**/
var x=document.getElementById("localiza");
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }
function showPosition(position)
  {
	  coords = position.coords.latitude + "," + position.coords.longitude;	
  }


//Alternar entre at work e outwork
function alternarCondicao(atOut){
	if(atOut == "out"){
		$("#estado").val("0");
		
		$("#slideAt").show();
		$("#slideAt").css("opacity","1");
		$("#slideAt").css("left","0");
		$("#slideAt").css("z-index","99");
		$("#slideOut").css("z-index","100");
		$("#slideOut").animate(
		{opacity:0,left:200},
		250,
		function(){
			
			$("#slideOut").hide();
		});
		$("header.cabecalho_superior").css("background-color","#4387da");
		$(".content .data_hora").css("color","#4387da");
	
	}else if(atOut == "at"){
		$("#estado").val("1");
		$("#slideOut").show();
		$("#slideOut").css("opacity","1");
		$("#slideOut").css("left","0");
		$("#slideOut").css("z-index","99");
		$("#slideAt").css("z-index","100");
		$("#slideAt").animate(
		{opacity:0,left:200},
		250,
		function(){
			
			$("#slideAt").hide();
		});
		
		$("header.cabecalho_superior").css("background-color","#44d9b6");
		$(".content .data_hora").css("color","#44d9b6");
	}
}


getLocation(); //Pega localização



 
/**
Enviar os dados do Client
*/
function enviarDados(){
	var url = "";
	var work = $("#estado").val();
	console.debug(work);
	console.debug("oi?");
	if(work == "0"){
		var usuario = "1";
		//data entrada
		var data_entrada = $("#dataAtual").html();
			data_entrada = data_entrada.split("/");
			data_entrada = data_entrada[2]+"-"+data_entrada[1]+"-"+data_entrada[0];
		var hora_entrada = $("#horaAtual").html();
			hora_entrada = hora_entrada.split("<span>")[0];
		var segu_entrada = $("#horaAtual span").html();
			segu_entrada = segu_entrada.substr(1, 3);
		var data_hora = data_entrada + " " + hora_entrada + ":" + segu_entrada;	
		console.debug(data_hora);
		
		var geo_entrada = coords;
		console.debug(geo_entrada);
		
		var id_maquina = "2025";
		
		var projeto = $("#projeto").val();
		
		url = "../dados/dados.php?acao=1&tabela=pontos&usuario="+usuario+"&data_entrada="+data_hora+"&geo_entrada="+geo_entrada+"&id_maquina="+id_maquina+"&projeto="+projeto;
	}else{
		var usuario = "1";
		var id = $("#id").val();
		//data entrada
		var data_saida = $("#dataAtual").html();
			data_saida = data_saida.split("/");
			data_saida = data_saida[2]+"-"+data_saida[1]+"-"+data_saida[0];
		var hora_saida = $("#horaAtual").html();
			hora_saida = hora_saida.split("<span>")[0];
		var segu_saida = $("#horaAtual span").html();
			segu_saida = segu_saida.replace("s","");
		var data_hora = data_saida + " " + hora_saida + ":" + segu_saida;	
		console.debug(data_hora);
		
		var geo_saida = coords;
		console.debug(geo_entrada);
		
		var projeto = $("#projeto").val();
		
		var id_maquina = "2025";
		url = "../dados/dados.php?acao=2&tabela=pontos&usuario="+usuario+"&data_saida="+data_hora+"&geo_saida="+geo_saida+"&id_maquina="+id_maquina+"&id="+id+"&projeto="+projeto;
	}
	console.debug(url);
	gravar(url);
}

function gravar(url){
		$.ajax({
	        url: url,
	        cache: false,
	        type: "GET",
	        beforeSend: function () {
	        },
	        error: function (retorno) {
	            alert("bugou:"+retorno.erro);
	        },
	        success: function (retorno) {
	        	capturar("../dados/dados.php?acao=4&id_usuario="+"1"+"&tabela=pontos");
	        }
		});
}
function capturar(url){
	console.debug(url);
	$.ajax({
        url: url,
        cache: false,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
        },
        error: function (retorno) {
            alert("bugou:"+retorno.erro);
        },
        success: function (retorno) {
        	if(retorno){
	        	if(retorno[0].data_saida == "0000-00-00 00:00:00"){
		        	$("#id").val(retorno[0].id);
		        	console.debug("ID:"+retorno[0].id);
		        	var hora_entrada = retorno[0].data_entrada;
		        		hora_entrada = hora_entrada.split(" ");
		        		hora_entrada = hora_entrada[1];
		        	$("#ult").html(hora_entrada);
			        alternarCondicao("out");
			        console.debug($("#estado").val());
	        	}else{
		        	alternarCondicao("at");
		        	var hora_saida = retorno[0].data_saida;
		        		hora_saida = hora_saida.split(" ");
		        		hora_saida = hora_saida[1];
		        	$("#ult").html(hora_saida);
	        	}
        	}
		}
	});
}



function abrirTela(slugTela){
	$("#content").load(slugTela+".html");
}


abrirTela("principal");