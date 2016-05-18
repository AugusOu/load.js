# load.js
Load your JavaScript,Images,Css.

# Usage
```
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script src="loadjs.js"></script>
</head>

<body>
<script>
    $(function() {
        $('body').Loadjs(['bg1.jpg','css.css',"app.js'],
                {
                    'background': '#fff',//or imagesurl,load background-images
                    'color':"#696969",//load text-color
                    'icon':'http://auguss.top/importemt/icon.png',//or color
                    'bordercolor':'#ccc'
                }
         );
    });
</script>
</body>
```
