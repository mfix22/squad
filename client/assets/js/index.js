$('#login').click(function(){
  var u = document.getElementById("exampleInputEmail1").value
  var p = document.getElementById("exampleInputPassword1").value
  login(u,p, function(err, data){
    if (!err) {
      // alert(JSON.stringify(data.token, null, 4));
      $.post('/u', {'token' : data.token}, function(page){
        // $('body').html(data);
        document.open();
        document.write(page);
        document.close();
      });
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
