 const message =new XMLHttpRequest();

 message.addEventListener('load', ()=>{
  console.log(message.response);
 });
 message.open('GET', 'https://supersimplebackend.dev/hello');
 message.send();

//  console.log(message.response);