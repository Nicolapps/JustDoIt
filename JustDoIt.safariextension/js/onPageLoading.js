
if (window.top === window) { // If the page is not an iframe

    var domain = document.domain.replace(/^.*\.(\w+\.\w+)$/, "$1"); // e.g. : 9gag.com

    // Send domain to global.html
    safari.self.tab.dispatchMessage('checkIfBlocked', domain);

    // When a page is blocked
    safari.self.addEventListener('message', function(message){
        var html =  '<head>'+
                        '<title>Just Do It</title>'+
                        '<link rel="stylesheet" href="'+safari.extension.baseURI+'css/blocked.css" type="text/css">'+
                    '</head>'+
                    '<body class="blocked">'+
                        '<div class="blocked">'+
                            '<h1>Just Do It !</h1>'+
                            '<a href="https://www.youtube.com/watch?v=n2lTxIk_Dr0">'+
                                '<img src="'+safari.extension.baseURI+'img/justdoit.gif" alt="Just Do It !">'+
                            '</a>'+
                        '</div>'+
                    '</body>';

        document.getElementsByTagName('html')['0'].innerHTML = html;
    }, false);

}
