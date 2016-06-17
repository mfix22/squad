$('#login').click(function(){
  $.post("/u/login", {
    'username' : document.getElementById("exampleInputEmail1").value,
    'password' : document.getElementById("exampleInputPassword1").value
  }, function(data){
    alert(JSON.stringify(data, null, 4));
  });
})
