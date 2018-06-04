hljs.initHighlightingOnLoad();

var listOptions = {
  valueNames: ['name', 'lang', 'code']
};

var snippetList = new List('repo', listOptions);

 snippetList.on('updated', function (list) {
   var items = document.querySelectorAll('.snippet');
   items.forEach(function(item){
     item.style.opacity = 0;
   });
   setTimeout(function(){
     items.forEach(function(item){
       item.style.opacity = 1;
     });
   },150);
 });