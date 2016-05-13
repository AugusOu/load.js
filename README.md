# load.js
Load your JavaScript,Images,Css.

```<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script src="loadjs.js"></script>
</head>

<body>
<script>
    $(function() {
        $('body').Loadjs(['bg1.jpg','css.css',"app.js'],
                {
                    'background': 'load.jpg',//load images
                    'color':"#fff"           //load textcolor
                }
         );
    });
</script>
</body>
