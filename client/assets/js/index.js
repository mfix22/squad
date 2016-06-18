$('#login').click(function(){
  var u = document.getElementById("exampleInputEmail1").value
  var p = document.getElementById("exampleInputPassword1").value
  login(u,p, function(err, page){
    if (!err) {
      document.open();
      document.write(page);
      document.close();
    }
  });
})

function login(username, password, callback){
  $.post("/u/login", {
    'username' : username,
    'password' : password
  }, function(data){
    callback(data.err, data);
  });
}
